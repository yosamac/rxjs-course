import { fromEvent, Observable } from "rxjs";
import { map, debounceTime , pluck, mergeAll} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

import { GithubUser, GithubUsersResp } from "../interfaces/github-users.interface";

const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');

body.append(textInput, orderList);

// Helpers

const showUsers = (users:any) => {
    console.log(users);
    orderList.innerHTML = '';

    const userList = users.map(user => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = user.avatar_url;

        const anchor = document.createElement('a');
        anchor.href = user.html_url;
        anchor.text = 'View Page';
        anchor.target = '_blank';

        li.append(img);
        li.append(user.login + ' ');
        li.append(anchor);
        orderList.append(li);
    });
}

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');

input$.pipe(
    debounceTime(500),
    pluck('target', 'value'),
    map(text => ajax.getJSON(
        `https://api.github.com/search/users?q=${text}`
    )),
    mergeAll(),
    pluck('items')
).subscribe(showUsers)