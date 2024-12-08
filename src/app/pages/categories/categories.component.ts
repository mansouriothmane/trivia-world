import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../model/category.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categoriesService = inject(CategoriesService);
  categoryList = signal<Array<Category>>([]);

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((response) => {
        this.categoryList.set(response.trivia_categories);
      });
  }

  onClickCategory = (category: Category) => {
    this.categoriesService.setCategory(category);
  };
}
