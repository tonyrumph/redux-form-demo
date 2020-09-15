import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITitle } from './state/application-state';

@Injectable({
    providedIn: 'root'
})
export class TitlesService {
    private titlesUrl = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private http: HttpClient) {}

    fetchTitles(): Observable<ITitle[]> {
        return this.http.get<ITitle[]>(this.titlesUrl);
    }
}