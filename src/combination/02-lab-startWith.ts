import { startWith } from "rxjs";
import { ajax } from "rxjs/ajax";

//References
const loadingDiv = document.createElement('div');
loadingDiv.classList.add('loading');
loadingDiv.innerHTML = 'Loading...';

const body = document.querySelector('body');

const url = 'https://reqres.in/api/users/2?delay=3'


// Streams

ajax.getJSON(url).pipe(
    startWith(true)
).subscribe(resp => {
    if (resp === true){
        body.append(loadingDiv)
    } else {
        document.querySelector('.loading').remove();
    }

    console.log(resp)
})