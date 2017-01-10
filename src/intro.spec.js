import { expect } from 'chai';
import sinon from 'sinon';
import { Observable } from './intro';

// an observable is a function that accepts a producer in parameter and has a subscribe method
// a producer is  a function that throws/produces values and accepts an observer
// an observer is just an object that has 3 functions : next, error, complete
// and listen the value emitted  by the producer

describe('What is an Observable', () => {
  it('An Observable is a function', () => {
    expect(typeof Observable).equal('function');
  });

  it('An Observable is a function that takes another function as parameter', () => {
    const producer = function(){}
    const spy = sinon.spy(Observable.prototype, 'constructor');
    const constructor = Observable.prototype.constructor;
    const inst = new constructor(producer);
    expect(typeof spy.args[0][0]).equal('function');
  });
});
