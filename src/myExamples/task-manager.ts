import { from, interval, Subject, timer } from 'rxjs';
import { tap, map, mergeMap, concatMap, first, filter, repeat, share, takeUntil, zip, mergeAll } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

type Task = {
    id:number,
    name: string,
    frequency: number,
    requests: string[],
    isDone: boolean;
    result?: string[] 
    state?: string;
}

const subject = new Subject();


setTimeout(() => {
    subject.next('')
}, 60000)

const getData = (task: Task) => {

    return { 
        ...task, 
        result: task.requests.join('|'), 
        isDone: true
    }
}

const tasks$ = from([
    {id: 1, name:'task-1', frequency: 5000, requests: ['Request-1', 'Request-2', 'Request-3'], isDone: false},
    {id: 2, name:'task-2', frequency: 10000, requests: ['Request-4', 'Request-5', 'Request-6'], isDone: false},
    {id: 3, name:'task-3', frequency: 15000, requests: ['Request-7', 'Request-8', 'Request-9'], isDone: false}
])

tasks$.pipe(
    mergeMap((task) => timer(task.frequency).pipe(
        map(() => getData(task)),
        tap(val => console.log('tap: ',val)),
        first(task => task.isDone),
    )),
    share(),
    repeat(),
    takeUntil(subject)



).subscribe({
    next: (val) => console.log('next:', val),
    complete:() => console.log('Complete')
})