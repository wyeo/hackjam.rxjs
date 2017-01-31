// Implement interval as a static method ot Observable
// interval should provide a way to unsubscribe

Observable.interval = function(period) {}

Observable.interval(1000)
  .subscribe((value) => {
    console.log(value);
  });
