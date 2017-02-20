# Higher order observables

## 0. Getting started
```bash
git clone https://github.com/hackages/hackjam.rxjs
git checkout higher-order-observable
npm run start
# Start Hacking!
```
You can also download this project as a zip file but make sure to select the right branch before-hand

Also, pair-programming is mandatory ;)

## 1. What we need you to build
Here's the simple thing we want you to build

![gif timer](http://i.imgur.com/hzft2S7.gif "gif timer")

Simple, right? Its just a timer with 3 buttons.

## 2. Requirements
### 3. Features
- Start will launch the timer
- Pause will stop the timer
- If you press start after pressing pause it should resume the timer
- Stop will reset the timer to 0
- Timer should start with 0

### 3. Programming constraint
Here's the thing, though. We want you to build it using observables and functionnal programming.
Theres a few requirements that you'll need to follow:
- No global variables
- Only one subscribe
- No if/else/switch

## 4. Hints
- Creating an observable interval
```javascript
const interval$ = Rx.Observable.interval(1000)
// creates an observable that emits a value every second
// Output => 0 -> infinite and beyond
```
- Differences between scan and reduce
```javascript
// Lets say we have an array of numbers and we want to sum
// Every values from that array

const values = [1, 2, 3, 4];
const myObservable$ = Rx.Observable.from(values);

// Using reduce
myObservable$
    .reduce((accumulator, nextValue) => accumulator + nextValue)
    .subscribe(total => console.log(total))
// Output => 10
// reduce will iterate through every values and give you the
// total only when it reaches the end of the array

// Using scan
myObservable$
    .scan((accumulator, nextValue) => accumulator + nextValue)
    .subscribe(total => console.log(total))
// Output => 1, 3, 6, 10  
// Scan will send a value down the pipe for every value of the array
```
- How to create an observable from a button click
```html
<button id="myButton">Im a button</div>
```
```javascript
const myButton = document.getElementById('myButton');
const clickEvents$ = Rx.Observable.fromEvent(myButton, 'click');
```
- Returning an observable from an observable
```javascript
// Lets say we have a click event observable
// and an interval observable
const clickEvents$ = Rx.Observable.fromEvent(myButton, 'click');
const values$ = Rx.Observable.from([1, 2, 3, 4]);
clickEvent$
    .mapTo(values$)
    .switch()
    .subscribe(v => console.log(v));
    
// See what we're doing here?
// we map every click to the observable values$ then we use switch
// to say "hey, Im gonna send informations down the pipe using 
// the observable you just gave me"
// this is called an higher order observable, an observable that returns an observable
```
There's actually a shortcut we can use to avoid chaining switch and map called [switchMapTo](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMapTo)
```javascript
clickEvent$
    .switchMapTo(values$)
    .subscribe(v => console.log(v));
```