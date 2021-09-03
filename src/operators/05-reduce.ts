import { range, interval } from 'rxjs';
import { reduce, take, tap } from 'rxjs/operators';

const numbers = [1,2,3,4,5];

const totalReducer = (acc, current) => acc + current;

const total = numbers.reduce(totalReducer, 0);

console.log(total);

interval(500).pipe(
    take(6),
    tap(console.log),
    reduce(totalReducer)
).subscribe({
    next:(val) => console.log(val),
    complete:() => console.log('Completed')
})