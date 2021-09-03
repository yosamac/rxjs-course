import { range, from, fromEvent} from 'rxjs';
import { filter, pluck, map } from 'rxjs/operators';

// range(1,10).pipe(
//     filter(val => val % 2 === 1)
// ).subscribe(console.log)

range(20,10).pipe(
    filter((val, i) => {
        console.log('index:', i)
        return val % 2 === 1
    })
).subscribe(console.log)

interface Person {
    name: string;
    type: string;
}

const person: Person[] = [
    {type: 'hero', name: 'Batman'},
    {type: 'hero', name: 'Robin'},
    {type: 'villano', name: 'Joker'},
]

from(person).pipe(
    filter(({ type })=> type === 'hero')
).subscribe(console.log)


const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
    map(ev => ev.code),
    filter(key => key === 'Enter')
)

keyup$.subscribe(console.log)

