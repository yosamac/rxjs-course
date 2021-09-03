import { asyncScheduler, debounceTime, distinctUntilChanged, fromEvent, pluck, throttleTime } from 'rxjs';

const click$ = fromEvent(document, 'click');

click$.pipe(
    throttleTime(3000)
)
//.subscribe(console.log);

// Example 2
const input = document.createElement('input');
document.querySelector('body').append(input);

const input$ = fromEvent(input, 'keyup');

input$.pipe(
    throttleTime(1000, asyncScheduler, {
        leading: false,
        trailing: true
    }),
    pluck('target', 'value'),
    distinctUntilChanged(),
)
.subscribe(console.log)