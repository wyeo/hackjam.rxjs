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