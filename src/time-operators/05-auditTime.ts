import { fromEvent, interval, sample } from 'rxjs';
import { auditTime, tap, map } from 'rxjs/operators';

const interval$ = interval(5000);
const click$ = fromEvent<PointerEvent>(document, 'click');

click$.pipe(
    map(({ x }) => ({ x })),
    tap(val => console.log('tap: ',val)),
    auditTime(5000)
).subscribe(console.log)