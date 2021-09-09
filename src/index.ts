import {  Observable, asyncScheduler, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

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

const polling = [
    {id: 1, name:'task-1', frequency: 5000,  requests: [of('Request-1'), of('Request-2'), of('Request-3')], iterations:0},//, dueTime: today.setSeconds(today.getSeconds() + 5) },
    {id: 2, name:'task-2', frequency: 10000, requests: [of('Request-4'), of('Request-5'), of('Request-6')], iterations:0},//, dueTime: today.setSeconds(today.getSeconds() + 10) },
    {id: 3, name:'task-3', frequency: 60000, requests: [of('Request-7'), of('Request-8'), of('Request-9')], iterations:0},//, dueTime: today.setSeconds(today.getSeconds() + 2) },
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

const subs = todo.map(task => {
    const newTask: Task = {
        ...task,
        endTime: undefined,
        startTime: undefined, 
        result: undefined,
    };

    return asyncScheduler.schedule(function(task: Task ) {
        task.iterations += 1;
        task.startTime = new Date();
        getData(task).pipe(
            tap(result => {
                console.log('tap:', task);
                task.endTime = new Date();
                task.duration = task.endTime.getTime() - task.startTime!.getTime();
                task.result = result.result;
                //console.log(subs.length)
            }),
        ).subscribe();
        task.result = {};
        this.schedule(task, task.frequency)
    }, task.frequency, task)
})

subs.map( subsription => {
    asyncScheduler.schedule(() => subsription.unsubscribe(), 60000)
})