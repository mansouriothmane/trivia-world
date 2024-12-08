import { inject, Injectable } from '@angular/core';
import { Category } from '../model/category.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  http = inject(HttpClient);
  api_url = 'https://opentdb.com/api_category.php';

  getCategories() {
    return this.http.get<{ trivia_categories: Array<Category> }>(this.api_url);
  }
}
