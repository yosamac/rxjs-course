import { Observable, Observer, Subject, subscribeOn } from 'rxjs'

const observer: Observer<any> = {
    next:(val) => console.log(`Next: ${val}`),
    error:(err) => console.warn(`Error: ${err}`),
    complete:() => console.info('complete')
}


const interval$ = new Observable(subscriber => {
    setInterval(
        () => subscriber.next(Math.random()), 1000
    )
});

/**
 * 1 - Multiple casting
 * 2 - Is an Observable too
 * 3-  Next, error and complete
 */
const subject$ = new Subject()
const subscription = interval$.subscribe(subject$);

// const subs1 = interval$.subscribe(rnd => console.log('Subs1', rnd))
// const subs2 = interval$.subscribe(rnd => console.log('Subs2', rnd))

const subs1 = subject$.subscribe(rnd => console.log('Subs1', rnd))
const subs2 = subject$.subscribe(rnd => console.log('Subs2', rnd))
// const subs2 = interval$.subscribe(rnd => console.log('Subs2', rnd))


setTimeout(() => {
    subject$.next(10);
    subject$.complete();
    subscription.unsubscribe()
}, 3500)


