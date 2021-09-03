import { Observable, Observer } from 'rxjs'

const observer: Observer<any> = {
    next:(val) => console.log(`Next: ${val}`),
    error:(err) => console.warn(`Error: ${err}`),
    complete:() => console.info('complete')
}

const interval$ = new Observable<number>( subs => {
    // Create counter 1,2,3,4,5...
    let count = 0;
    const interval = setInterval(() => {
        count++
        subs.next(count);
        console.log(count)
    }, 1000)

    setTimeout(() => {
        subs.complete();
    }, 2500)

    return () => {
        clearInterval(interval);
        console.log('Interval destroy')
    }
})


const subs1 = interval$.subscribe((val) => console.log('Num', val))
const subs2 = interval$.subscribe((val) => console.log('Num', val))
const subs3 = interval$.subscribe((val) => console.log('Num', val))

subs1.add(subs2);
subs1.add(subs3);


setTimeout(() => {
    subs1.unsubscribe();
    // subs2.unsubscribe();
    // subs3.unsubscribe();

    console.log('Timeout completed')
}, 3000)




