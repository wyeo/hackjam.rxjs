import {expect} from "chai";
import sinon from "sinon";
<<<<<<< HEAD
import { Observable } from "./intro";

// an observable is a function that accepts a producer in parameter and has a subscribe method
// a producer is  a function that throws/produces values and accepts an observer
=======

// Import our modules
import { Observable } from "./intro";

// Observable
// an observable is a function that accepts a producer in parameter and has a subscribe method
// Producer
// A producer is  a function that throws/produces values and accepts an observer
// Observer
>>>>>>> refacto
// an observer is just an object that has 3 functions: next, error, complete
// and listen to the value emitted  by the producer

describe('What is an Observable', () => {

  it('An Observable is a function', () => {
    expect(typeof Observable).equal('function');
  });

  it('An observer is a object that has 3 functions: next, error, complete', () => {
    const observer = {
      next(val){},
      error(err){},
      complete(){},
    };
<<<<<<< HEAD
=======

>>>>>>> refacto
    expect(typeof observer.next).equal('function');
    expect(typeof observer.error).equal('function');
    expect(typeof observer.complete).equal('function');
  });

  it('A Producer is a function that takes an observer as parameter and throws/produces values', () => {
<<<<<<< HEAD
    const nextSpy = sinon.spy();
    const errorSpy = sinon.spy();
    const completeSpy = sinon.spy();

    const observer = {
      next: nextSpy,
      error: errorSpy,
      complete: completeSpy
    };

    const nextValue = 10;
    const errorValue = 'an error';
    const producer = function (observer) {
=======
    const next = sinon.spy();
    const error = sinon.spy();
    const complete = sinon.spy();
    const observer = {
      next,
      error,
      complete,
    };
    const nextValue = 10;
    const errorValue = 'an error';
    const producer = (observer) => {
>>>>>>> refacto
      observer.next(10);
      observer.error(errorValue);
      observer.complete();
    };
<<<<<<< HEAD

    producer(observer);
    expect(nextSpy.getCall(0).args[0]).equals(nextValue);
    expect(errorSpy.getCall(0).args[0]).equals(errorValue);
    expect(completeSpy.calledOnce);
  });

  it('An Observable is a function that takes producer as parameter', () => {
    const producer = function () {};

=======
    producer(observer);
    expect(next.getCall(0).args[0]).equals(nextValue);
    expect(error.getCall(0).args[0]).equals(errorValue);
    expect(complete.calledOnce);
  });

  it('An Observable is a function that takes producer as parameter', () => {
    const producer = () =>{};
>>>>>>> refacto
    const spy = sinon.spy(Observable.prototype, 'constructor');
    const constructor = Observable.prototype.constructor;
    const inst = new constructor(producer);
    expect(typeof spy.args[0][0]).equal('function');
  });

  it('An Observable is a function that has a subscribe method', () => {
<<<<<<< HEAD
    const producer = function () {};

=======
    const producer = () =>{};
>>>>>>> refacto
    const observable = new Observable(producer);
    expect(typeof observable.subscribe).equal('function');
  });

  it('The subscribe method of an Observable takes a observer as parameter', () => {
<<<<<<< HEAD
    const producer = function(){};

=======
    const producer = () =>{};
>>>>>>> refacto
    const observable = new Observable(producer);
    const observer = {
      next(val){},
      error(err){},
      complete(){},
    };

    const spy = sinon.spy(observable, 'subscribe');
    spy.withArgs(observer);

    observable.subscribe(observer);

    expect(spy.withArgs(observer).calledOnce)
  });

  it('The subscribe method of an Observable call the producer with the observer as parameter', () => {
    const nextValue = 10;
    const errorValue = 'an error';
<<<<<<< HEAD
    const nextSpy = sinon.spy();
    const errorSpy = sinon.spy();
    const completeSpy = sinon.spy();
    const observer = {
      next: nextSpy,
      error: errorSpy,
      complete: completeSpy
=======
    const next = sinon.spy();
    const error = sinon.spy();
    const complete = sinon.spy();
    const observer = {
      next,
      error,
      complete,
>>>>>>> refacto
    };
    const producer = function (observer) {
      observer.next(10);
      observer.error(errorValue);
      observer.complete();
    };
    const observable = new Observable(producer);

    const spy = sinon.spy(observable, 'subscribe');
    spy.withArgs(observer);
    observable.subscribe(observer);
    expect(spy.withArgs(observer).calledOnce);

    expect(nextSpy.getCall(0).args[0]).equals(nextValue);
    expect(errorSpy.getCall(0).args[0]).equals(errorValue);
    expect(completeSpy.calledOnce);
  });
});
