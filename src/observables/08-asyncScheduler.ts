import { asyncScheduler } from 'rxjs';

// setTimeout(() => { }, 3000);
// setInterval(() => { }, 3000);

const greeting = () => console.log('Hello world');
const greeting2 = (name) => console.log('Hello', name);

// asyncScheduler.schedule(greeting2, 2000)
// asyncScheduler.schedule(greeting2, 2000, 'Yosnier')
const subs =  asyncScheduler.schedule(function(state) {
    console.log('State', state);

    this.schedule(state + 1, 1000)

}, 3000, 0)


// setTimeout(() => {
//     subs.unsubscribe()
// }, 6000)

asyncScheduler.schedule(() => subs.unsubscribe(), 6000)