import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string = environment.apiUrl + environment.endpoints.categories;
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http
      .get<Category[]>(this.url)
      .pipe(map((c) => [{ id: 0, name: 'Todos' }, ...c]));
  }
}
