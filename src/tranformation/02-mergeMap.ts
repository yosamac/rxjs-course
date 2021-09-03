import { fromEvent, interval, of } from 'rxjs';
import { mergeMap, take, map, takeUntil } from 'rxjs/operators';

const letters$ = of('a','b','c');

letters$.pipe(
    mergeMap((char => interval(1000).pipe(
        map(i => char + i),
        take(3),
    )))
)
// .subscribe({
//     next: val => console.log(val),
//     complete: () => console.log('Completed')
// });

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');
const interval$ = interval();

mousedown$.pipe(
    mergeMap(() => interval$.pipe(
        takeUntil(mouseup$)
    ))
) 
.subscribe(console.log)