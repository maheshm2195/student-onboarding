import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Category } from '../models/category';

@Injectable()
export class CategoryService {
    //URL for CRUD operations
    // categoryUrl = "http://localhost:3000/categories";
    categoryUrl = "https://json-server-student-onboarding.herokuapp.com/categories";
    //Create constructor to get Http instance
    constructor(private http: Http) {
    }
    //Fetch all categories
    getAllCategories(): Observable<Category[]> {
        return this.http.get(this.categoryUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    //Fetch category by id
    getCategoryById(categoryId: string): Observable<Category> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });

        return this.http.get(this.categoryUrl + "/" + categoryId)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    
    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
} 