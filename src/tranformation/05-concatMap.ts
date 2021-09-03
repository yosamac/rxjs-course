import { fromEvent, interval } from 'rxjs';
import { concatMap, switchMap, take } from 'rxjs/operators';

const clicks$ = fromEvent(document, 'click');
const interval$ = interval(1000).pipe(take(3));

clicks$.pipe(
    // switchMap(() => interval$),
    concatMap(() => interval$)
).subscribe(console.log)