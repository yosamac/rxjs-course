import { combineLatest, concat, fromEvent, interval, merge } from "rxjs";
import { pluck, take } from "rxjs/operators";

// const keyup$ = fromEvent(document, 'keyup');
// const click$ = fromEvent(document, 'click');

// combineLatest(
//     keyup$.pipe(pluck('type')),
//     click$.pipe(pluck('type'))
// ).subscribe(console.log)

const input1 = document.createElement('input')
const input2 = document.createElement('input')

input1.placeholder = 'email@gmail.com'
input2.placeholder = '*********'

document.querySelector('body').append(input1, input2)

// Helper
const getInputStreams = (elem: HTMLElement) => {
    return fromEvent<KeyboardEvent>(elem, 'keyup').pipe(
        pluck('target', 'value')
    )
}

combineLatest(
    getInputStreams(input1),
    getInputStreams(input2)
).subscribe(console.log)