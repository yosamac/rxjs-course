import { Observable, Observer } from 'rxjs'

const observer: Observer<any> = {
    next:(val) => console.log(`Next: ${val}`),
    error:(err) => console.warn(`Error: ${err}`),
    complete:() => console.info('complete')
}

// const obs$ = Observable.create();
const obs$ = new Observable<string>(subs => {
    subs.next('hola')
    subs.next('mundo')
    subs.next('Hello')
    subs.next('word')
    
    
    const a = undefined;
    a.name = 'Yosnier';
    subs.complete()
    
    subs.next('hello world no showed')
})

// obs$.subscribe(
//     val => console.log(`Next: ${val}`),
//     err => console.warn(`Error: ${err}`),
//     () => console.info('complete')
// );

obs$.subscribe(observer);






