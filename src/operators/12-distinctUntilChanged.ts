import { of, from } from 'rxjs';
import { take, tap, distinct, distinctUntilChanged, distinctUntilKeyChanged} from 'rxjs/operators';

const numbers$ = of(1,2,3,4,5,'1',3,4,5,2,4,5);

numbers$.pipe(
    // tap(val => console.log('tap:', val)),
    // distinct(),
    distinctUntilChanged()
).subscribe({
    next: (val) => console.log('next: ', val),
    complete: () => console.log('Completed')
});

interface Person {
    name: string;
    type: string;
}

const person: Person[] = [
    {type: 'hero', name: 'Batman'},
    {type: 'hero', name: 'Batman'},
    {type: 'villano', name: 'Joker'},
    {type: 'hero', name: 'Batman'},
    {type: 'hero', name: 'Robin'},
    {type: 'hero', name: 'Batman'},
    {type: 'hero', name: 'Robin'},
    {type: 'hero', name: 'Batman'},
    {type: 'villano', name: 'Joker'},
    {type: 'villano', name: 'Joker'},
    {type: 'hero', name: 'Robin'},
]

from(person).pipe(
    // distinct(p => p.name),
    // distinctUntilChanged((prior, cur) =>prior.name == cur.name),
    distinctUntilKeyChanged('name')
)
.subscribe(console.log);