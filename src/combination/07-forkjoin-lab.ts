import { catchError, forkJoin, of } from "rxjs";
import { ajax } from "rxjs/ajax";

const GITHUB_API_URL = 'https://api.github.com/users';
const GITHUB_USER = 'yosamac';

forkJoin({
    user: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
    repos: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/repos`),
    gist: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gistsss`).pipe(
        catchError(err => of([]))
    ),
}).pipe(
    catchError(err => of(err.message))
)
.subscribe(console.log);