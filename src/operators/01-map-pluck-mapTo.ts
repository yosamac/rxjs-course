import { fromEvent, range } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';

// range(1,5).pipe(
//     map(val => val * 10)
// ).subscribe(console.log)

const keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup');
const keyupCode$ = keyUp$.pipe(
    map(event => event.code)
)

const keyupPluck$ = keyUp$.pipe(
    pluck('target', 'baseURI')
)
const keyupMapto$ = keyUp$.pipe(
    mapTo('Key pressed')
)

keyupCode$.subscribe(val => console.log('map:', val))
keyupPluck$.subscribe(val => console.log('pluck:', val))
keyupMapto$.subscribe(val => console.log('mapTo:', val))

