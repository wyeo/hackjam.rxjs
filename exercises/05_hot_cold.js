console.clear();

const interval$ = Rx
  .Observable
  .interval(1000).take(10).map(x => x+1);

setTimeout(() => {
  interval$.subscribe(x => console.log(x))
}, 4500);

interval$.subscribe(x => console.log(x))

// TODO: Fix this code so that both subscribers log
// the same events at the same time.
