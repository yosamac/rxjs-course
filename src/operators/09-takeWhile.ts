import { fromEvent } from 'rxjs';
import { first, tap, map, takeWhile } from 'rxjs/operators';

const click$ = fromEvent<PointerEvent>(document, 'click');

click$.pipe(
    tap(val => console.log('tap:', val)),
    map(({x, y }) => ({ x, y})),
    takeWhile(({ y }) => y <= 150, true)
).subscribe({
    next: (val) => console.log('next: ', val),
    complete: () => console.log('Completed')
});
