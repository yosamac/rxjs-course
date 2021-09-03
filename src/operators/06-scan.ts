import { from } from 'rxjs';
import { reduce, scan,  tap, map } from 'rxjs/operators';

const numbers = [1,2,3,4,5];

const totalReducer = (acc, cur) => acc + cur;

const total = numbers.reduce(totalReducer, 0);

console.log(total);

// reduce
from(numbers).pipe(
    reduce(totalReducer)
).subscribe({
    next:(val) => console.log(val),
    complete:() => console.log('Completed')
})

// scan
from(numbers).pipe(
    scan(totalReducer)
).subscribe({
    next:(val) => console.log(val),
    complete:() => console.log('Completed')
});


// Redux
interface User {
    id?: string
    authenticated?: boolean,
    token?: string
    age?: number
}

const users: User [] = [
    {id: 'yos', authenticated: false, token: null},
    {id: 'yos', authenticated: true, token: 'ABC' },
    {id: 'yos', authenticated: true, token: 'ABC123'}
]

const state$ = from(users).pipe(
    scan<User, User>( (acc:any, cur) => {
        return { ...acc, ...cur }
    }, { age: 35 }),  
);

const id$ = state$.pipe(
    map(state => state.id)
)
