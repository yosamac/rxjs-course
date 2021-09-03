import { fromEvent, interval } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

const clicks$ = fromEvent(document, 'click');
const interval$ = interval(1000);

clicks$.pipe(
    mergeMap(() => interval$),
    //switchMap(() => interval$)
).subscribe(console.log)