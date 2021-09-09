import { concat, from, interval, Subject, timer, merge,of, Observable, asyncScheduler } from 'rxjs';
import { tap, map, mergeMap, concatMap, first, filter, take, repeat, delay, share, takeUntil, timeInterval, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { validateLocaleAndSetLanguage } from 'typescript';

type Task = {
    id:number,
    name: string,
    frequency: number,
    requests: string[],
    isDone: boolean;
    result?: object 
    state?: string;
    iterations: number;
    startTime?: Date;
    endTime?: Date;
    duration?: number;
    dueTime?: number
}

const subject = new Subject();

setTimeout(() => {
    subject.next('')
}, 60000)

const today  = new Date();
const polling = [
    {id: 1, name:'task-1', frequency: 60000,  requests: ['Request-1', 'Request-2', 'Request-3'], isDone: false, iterations:0},//, dueTime: today.setSeconds(today.getSeconds() + 5) },
    {id: 3, name:'task-3', frequency: 5000, requests: ['Request-7', 'Request-8', 'Request-9'], isDone: false, iterations:0},//, dueTime: today.setSeconds(today.getSeconds() + 2) },
    {id: 2, name:'task-2', frequency: 10000, requests: ['Request-4', 'Request-5', 'Request-6'], isDone: false, iterations:0}//, dueTime: today.setSeconds(today.getSeconds() + 10) },
]

const todo =  polling;
const doing = [];
const done = [];

const GITHUB_API_URL = 'https://api.github.com/users';
const GITHUB_USER = 'yosamac';


const getRequest = ( url: string ) => ajax.getJSON<any>(url);

const getData = (task: Task): Observable<Task> => {

    return getRequest(`${GITHUB_API_URL}/${GITHUB_USER}`).pipe(
        map(res => {
            const endTime = new Date()
            const result = { 
                ...task,
                result: res,
                endTime,
                duration: endTime.getTime() - task.startTime.getTime(),
            }
            return result
        })
    );
}

const tasks$ = from(todo);


tasks$.pipe(
    mergeMap((task) => interval(task.frequency).pipe(
        switchMap((timesCount) => {

            return getData({
                ...task, 
                iterations: timesCount + 1,
                startTime: new Date()
            })
        }),
        //first(),
        // tap(resp => {
        //     // task.frequency = resp.endTime.setMilliseconds(resp.frequency as number);
        //     console.log('tap Polling Before:', polling)
        //     done.push(task);
        //     polling.shift();
        //     console.log('tap Polling After:', polling)
            
        // })
        //timeInterval()
        // tap(val => console.log('tap: ',val)),  
        // first(task => task.isDone),
    )),
    share(),
    
    takeUntil(subject)
).subscribe({ 
    next: (task) => {
        done.push(task);
        const newTask: Task = {
            ...task,
            endTime: null,
            startTime: null,
            result: {},
            iterations: task.iterations + 1,
        }
        newTask.frequency = task.endTime.setSeconds(
            task.endTime.getSeconds() + (Number(task.frequency)/ 1000)
        );
        todo.push(newTask)
        console.log(polling)
        console.log('next:', task);
    },
    complete:() => console.log('Complete')
})


// const subs = todo.map(task => {
//     const newTask: Task = {
//         ...task,
//         endTime: undefined,
//         startTime: undefined, 
//         result: undefined,
//     };

//     return asyncScheduler.schedule(function(task: Task ) {
//         task.iterations += 1;
//         task.startTime = new Date();
//         getData(task).pipe(
//             tap(result => {
//                 //console.log('tap:', task);
//                 task.endTime = new Date();
//                 task.duration = task.endTime.getTime() - task.startTime!.getTime();
//                 task.result = result.result;
//                 //console.log(subs.length)
//             }),
//         ).subscribe();
//         task.result = {};
//         this.schedule(task, task.frequency)
//     }, task.frequency, task)
// })

// subs.map( subsription => {
//     asyncScheduler.schedule(() => subsription.unsubscribe(), 60000)
// })


