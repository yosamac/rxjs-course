import { fromEvent, interval } from 'rxjs';
import { skip, takeUntil, tap } from 'rxjs/operators';

const button = document.createElement('button');
button.innerHTML = 'Stop timer';

document.querySelector('body').append(button);

const clickBtn$ = fromEvent<PointerEvent>(button, 'click').pipe(
    tap(() => console.log(' before skip')),
    skip(1),
    tap(() => console.log(' After skip'))
)
const counter$ = interval(1000)

counter$.pipe(
    takeUntil(clickBtn$)
).subscribe({
    next: (val) => console.log('next: ', val),
    complete: () => console.log('Completed')
});
