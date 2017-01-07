import {expect} from "chai";
import {Observable} from "../src/rxjs";

describe('Rxjs', () => {

  describe('Operators', () => {

    xdescribe('of :', () => {

      it('should emitting a sequence of numbers', (done) => {
        const source$ = Observable.of(1, 2, 3, 4, 5);
        let result = [];
        const actual = [1, 2, 3, 4, 5];
        const subscribe = source$
          .subscribe(
            val => result = [...result, val],
            () => {
            },
            () => {
              expect(actual).deep.equals(result);
              done();
            }
          );
      });
      it('should emitting an object, array, and function', (done) => {
        const source$ = Observable.of({name: 'Brian'}, [1, 2, 3], function hello() {
          return 'Hello'
        });
        let result = [];
        const actual = [{name: 'Brian'}, [1, 2, 3], function hello() {
          return 'Hello'
        }];
        const subscribe = source$
          .subscribe(
            val => result = [...result, val],
            () => {
            },
            () => {
              expect(actual.length).equals(result.length);
              expect(actual[0]).deep.equal(result[0]);
              expect(actual[1]).deep.equal(result[1]);
              expect(actual[2]()).deep.equal(result[2]());
              done();
            }
          );
      });
    });
    xdescribe('fromArray :', () => {

      it('should converts an array to an Observable', (done) => {
        const source$ = Observable.fromArray([1, 2, 3, 4, 5]);
        let result = [];
        const actual = [1, 2, 3, 4, 5];
        const subscribe = source
          .subscribe(
            val => result = [...result, val],
            () => {
            },
            () => {
              expect(actual).deep.equals(result);
              done();
            }
          );
      });
    });
    xdescribe('fromPromise :', () => {

      it('should converts an promise to an Observable', (done) => {
        const actual = 'Hello World!';
        const promise = new Promise(resolve => resolve(actual));
        const source = Observable.fromPromise(promise);
        let result;
        const subscribe = source
          .subscribe(
            val => {
              result = val;
            },
            (err) => {
              console.log('error', err);
            },
            () => {
              expect(actual).equals(result);
              done();
            }
          );
      });
    });
    describe('from :', () => {

      xit('should converts an array to an Observable', (done) => {
        const source$ = Observable.from([1, 2, 3, 4, 5]);
        let result = [];
        const actual = [1, 2, 3, 4, 5];
        const subscribe = source$
          .subscribe(
            val => {
              console.log('value', val);
              result = [...result, val];
            },
            (err) => {
              console.log('error', err);
            },
            () => {
              expect(actual).deep.equals(result);
              done();
            }
          );
      });

      xit('should converts an promise to an Observable', (done) => {
        const actual = 'Hello World!';
        const promise = new Promise(resolve => resolve(actual));
        const source$ = Observable.from(promise);
        let result;
        const subscribe = source$
          .subscribe(
            val => {
              result = val;
            },
            () => {
              console.log('error');
            },
            () => {
              expect(actual).equals(result);
              done();
            }
          );
      });

      it('should converts a string to an Observable', (done) => {
        const actual = ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd'];
        const value = actual.join('');
        const source$ = Observable.from(value);
        let result = [];
        const subscribe = source$
          .subscribe(
            val => {
              result = [...result, val];
            },
            (err) => {
              console.log('error');
            },
            () => {
              expect(actual.length).equals(result.length);
              done();
            }
          );
      });

      it('should converts a colllection to an Observable', (done) => {
        const map = new Map();
        map.set(1, 'Hi');
        map.set(2, 'Bye');
        const source$ = Observable.from(map);
        const actual = [[1, 'Hi'], [2, 'Bye']];
        let result = [];
        const subscribe = source$
          .subscribe(
            val => {
              result = [...result, val];
            },
            (err) => {
              console.log('error');
            },
            () => {
              expect(actual.length).equals(result.length);
              expect(actual[0]).deep.equal(result[0]);
              expect(actual[1]).deep.equal(result[1]);
              done();
            }
          );
      });


    });
  });
});
