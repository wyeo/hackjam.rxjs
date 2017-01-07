// a observable is a function that accepte  an producer in parameter and have a subscribe method
// a producer is  a function that throws/produce values and accept an observer
// a observer is just an object that have 3 function : next, error, complete
//  and listen the value emitted  by the producer
export function Observable(producer) {
  this._producer = producer;
  this.subscribe = (next, error, complete) => {
    const observer = (typeof next !== 'function')
      ? next
      : {next, error, complete};
    return this._producer(observer);
  }
}

/**
 * Static creation operators : of
 * Emits the arguments you provide, then completes.
 *
 * @param args
 * @returns {Observable}
 */
Observable.of = (...args) => {
  const producer = (observer) => {
    for (let el of args) {
      observer.next(el)
    }
    observer.complete();
  };
  return new Observable(producer);
};

/**
 * Static creation operators : fromArray
 * Converts an array to an Observable.
 *
 * /!\ doesn't exist in Rxjs, so use from operators see below
 * @see {@link https://www.learnrxjs.io/operators/creation/from.html } for examples.
 *
 * @param args {Array}
 * @returns {Observable}
 */

Observable.fromArray = (args = []) => {
  const producer = (observer) => {
    try {
      for (let el of args) {
        observer.next(el)
      }
      observer.complete()
    } catch (error) {
      observer.error(error);
      observer.complete();
    }
  };
  return new Observable(producer);
};

/**
 * Static creation operators : fromPromise
 * Converts an promise to an Observable.
 *
 * @see {@link https://www.learnrxjs.io/operators/creation/frompromise.html } for examples.
 *
 * @param promise {Promise}
 * @returns {Observable}
 */
Observable.fromPromise = (promise = {}) => {
  return new Observable((observer) => {
    if (typeof promise.then !== 'function') {
      observer.error(' The function provided in argument should be a Promise');
      observer.complete();
      return;
    }

    promise.then((data) => {
      observer.next(data);
      observer.complete();
    }).catch((err) => {
      observer.error('Error in the resolution of the promise');
      observer.complete();
    })
  });
};

/**
 * Static creation operators : from
 * Converts almost anything to an Observable
 *
 * @see {@link https://www.learnrxjs.io/operators/creation/from.html } for examples.
 *
 * @param input
 * @returns {Observable}
 */
Observable.from = (input) => {
  return new Observable((observer) => {

    if (typeof input.then === 'function') {
      return Observable.fromPromise(input).subscribe(observer);
    }

    return Observable.fromArray(input).subscribe(observer);
  });
};

/**
 * Transformation operators : map
 * Apply a projection to each value and emits that projection in the returned observable
 *
 * @see {@link https://www.learnrxjs.io/operators/transformation/map.html } for examples.

 * @param projection
 * @param thisArgs: an optional argument to define what this is in the project function
 * @returns {Observable}
 */

Observable.prototype.map = Observable.map = function (projection, thisArgs) {
  const observable = thisArgs || this;
  return new Observable((observer) => {
    observable
      .subscribe((data) => {
        observer.next(projection(data));
      }, (err) => {
        observer.error(err);
      }, () => {
        observer.complete();
      });
  });
};

/**
 * Filtering operators : filter
 * only emits a value from the source if it passes a criterion function.
 *
 * @see {@link https://www.learnrxjs.io/operators/filtering/filter.html } for examples.

 * @param predicate
 * @param thisArgs: an optional argument to define what this is in the project function
 * @returns {Observable}
 */
Observable.prototype.filter = Observable.filter = function (predicate, thisArgs) {
  const observable = thisArgs || this;
  return new Observable((observer) => {
    observable
      .subscribe((data) => {
        const res = predicate(data);
        if (res) {
          observer.next(data);
        }
      }, (err) => {
        observer.error(err);
      }, () => {
        observer.complete();
      });
  });
};

/**
 * Transformation operators : mapTo
 * Maps every value to the same value every time
 *
 * @see {@link https://www.learnrxjs.io/operators/transformation/mapto.html } for examples.
 *
 * @param constant
 * @returns {Observable}
 */
Observable.prototype.mapTo = function (constant) {
  return this
    .map((e) => constant);
};

/**
 * Transformation operators : do
 * Transparently perform actions or side-effects, such as logging.
 *
 * @see {@link https://www.learnrxjs.io/operators/utility/do.html } for examples.
 *
 * @param next
 * @param error
 * @param complete
 * @returns {Observable}
 */
Observable.prototype.do = function (next = (() => {
}), error = (() => {
}), complete = (() => {
})) {
  return new Observable((observer) => {
    this
      .subscribe((data) => {
        next(data);
        observer.next(data);
      }, (err) => {
        error(err);
        observer.error(err);
      }, () => {
        complete();
        observer.complete();
      });
  });
};