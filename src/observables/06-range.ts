import { asyncScheduler, of, range } from 'rxjs';

// const source$ = of(1,2,3,4,5);
const source$ = range(1,10, asyncScheduler);

console.log('Start')
source$.subscribe(console.log)
console.log('End')