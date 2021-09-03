import {  interval, timer } from 'rxjs';

const observer = { 
    next: (val) => console.log('next:', val),
    complete: () => console.log('completed')
}

const todayIn5 = new Date();

todayIn5.setSeconds(todayIn5.getSeconds() + 5);

const interval$ = interval(1000);
const timer$ = timer(todayIn5);

console.log('Start')
// interval$.subscribe(observer)
timer$.subscribe(observer)
console.log('End')