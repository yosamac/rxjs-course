import { range } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const numbers = range(1,5).pipe(
    tap(x => console.log('Before:', x)),
    map(val => val * 10),
    tap({
        next: val => console.log('After:', val),
        complete: () => console.log('Completed')
    })
);

numbers.subscribe(val => console.log('subs:', val))
