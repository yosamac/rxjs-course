import { fromEvent } from "rxjs";
import { map, tap } from "rxjs/operators";

const text = document.createElement('div');

text.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque elementum mauris, et lobortis nisl pellentesque facilisis. Phasellus justo nunc, ornare vitae commodo eget, vulputate non eros. Quisque at risus tincidunt lacus tempor sollicitudin id ac massa. Maecenas eros tellus, viverra id porta at, tincidunt vel tellus. In hac habitasse platea dictumst. In placerat euismod lectus vitae faucibus. Nam bibendum mauris eget blandit tristique.
<br/><br/>
Morbi quis accumsan nisi. Fusce tristique ultrices fringilla. Sed scelerisque imperdiet ex, vel convallis nisl aliquet eu. Nulla facilisi. Cras ante ante, porta sit amet pellentesque malesuada, tincidunt sit amet dui. Nulla pellentesque erat lorem, at sagittis ligula placerat in. Quisque leo eros, finibus sed vulputate quis, suscipit et nunc. Aliquam odio odio, dignissim vel elit at, posuere vulputate metus. Sed ornare odio at justo sollicitudin, eget convallis est lobortis. Etiam eget rutrum leo. Mauris consectetur, mauris eget sagittis commodo, nunc sem varius nulla, sit amet rhoncus nisl dui eu nisi. Donec suscipit dolor ut tortor convallis congue. Duis sed erat sit amet lacus suscipit accumsan. Etiam vitae dui pretium turpis tristique fermentum.
<br/><br/>
Sed ultricies, erat non commodo blandit, nibh felis pretium est, vitae congue felis nisl ac ipsum. Aliquam lorem enim, vestibulum in accumsan a, fermentum consequat nunc. Vivamus iaculis vulputate nunc, at lobortis neque tristique sit amet. Etiam tempus mattis suscipit. Ut varius molestie maximus. Etiam elementum tincidunt lacinia. Curabitur augue libero, suscipit vitae sapien vitae, tempor ultrices diam. In tellus elit, commodo placerat tristique non, fermentum at magna. Etiam tincidunt tincidunt quam, ac congue nisi tincidunt non. In ut rhoncus urna. Maecenas fermentum vitae dolor ut venenatis. Vivamus tellus nunc, sodales et elit eget, imperdiet vestibulum justo. Donec commodo nisi felis, ac tristique felis consequat in. Donec non volutpat augue. Suspendisse pellentesque, libero at rutrum tempor, nibh urna blandit est, vel sodales erat metus sed sapien.
<br/><br/>
Praesent hendrerit fermentum felis non pretium. In ultrices bibendum ex, sed luctus elit semper et. In hac habitasse platea dictumst. Suspendisse suscipit maximus ligula rutrum pulvinar. Aenean aliquam nisl hendrerit pretium feugiat. Suspendisse pulvinar porttitor consequat. Phasellus semper rhoncus nisi aliquet faucibus. Nullam a facilisis ante, eu mollis quam.
<br/><br/>
Cras sit amet mattis orci. In id odio ultrices, pharetra magna ut, laoreet lacus. Mauris iaculis facilisis ante id semper. Fusce tincidunt ut lorem eu viverra. Vestibulum facilisis sapien sit amet urna pulvinar tempus. Nam volutpat sapien ut elit ornare dictum. Duis egestas sit amet nunc quis consequat. Ut rhoncus id felis et imperdiet.
`

const body = document.querySelector('body');

body.append(text);

const progressBar = document.createElement('div');
progressBar.setAttribute('class', 'progress-bar')

body.append(progressBar);

// function to calc scroll percentage

const calcScrollPercentage = (event) => {
    const {
        scrollHeight,
        scrollTop,
        clientHeight,
    } = event.target.documentElement;

    return (scrollTop / (scrollHeight - clientHeight ) * 100)
} 

// Streams
const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
    map(calcScrollPercentage),
    tap({
        next: val => console.log(val),
        complete: () => console.log('Completed')
    })
);

progress$.subscribe( percentage => {
    progressBar.style.width = `${percentage}%`  
})


