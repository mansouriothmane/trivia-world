import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categoryService = inject(CategoryService);
  categoryList = signal<Array<Category>>([]);

  ngOnInit(): void {
    this.categoryService
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
    this.categoryService.setCategory(category);
  };
}
