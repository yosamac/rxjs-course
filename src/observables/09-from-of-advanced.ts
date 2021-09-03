import { from, of } from 'rxjs';

// of = get arguments and emits a sequences
// from = it could be work with array, promises, iterable and observable

const observer = {
    next: (val) => console.log(val),
    complete: () => console.log('Completed')
}

const sources$ = from([1,2,3,4,5])
const sources1$ = of([1,2,3,4,5])
const sources2$ = from('Yosnier');
const sources3$ = from(fetch('https://api.github.com/users/yosamac'))

const myGenerator = function*() {
    yield 1
    yield 2
    yield 3
    yield 4
    yield 5
}

const iterable = myGenerator();

for (let i of iterable){
    console.log('With for loop:', i);
}

from(iterable).subscribe(observer)

sources$.subscribe(observer)
sources1$.subscribe(observer)
sources2$.subscribe(observer)

// sources3$.subscribe(async res => {
//     const dataResp = await res.json();
//     console.log(dataResp);
    
// })
