import { Component, inject, Input, input, OnInit, signal } from '@angular/core';
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

  @Input() onClickCategory!: (category: Category | null) => void;

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
}
