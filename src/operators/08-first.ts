import { fromEvent } from 'rxjs';
import { first, tap, map } from 'rxjs/operators';

const click$ = fromEvent<PointerEvent>(document, 'click');

click$.pipe(
    tap(val => console.log('tap:', val)),
    map(({clientX, clientY }) => ({ clientX, clientY})),
    first(({clientX, clientY}) => clientY >= 150)
).subscribe({
    next: (val) => console.log('next: ', val),
    complete: () => console.log('Completed')
});
