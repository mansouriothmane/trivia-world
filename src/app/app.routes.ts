import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'start',
    loadComponent: () =>
      import('./pages/quiz/quiz.component').then((m) => m.QuizComponent),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./components/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
  },
  {
    path: 'questions',
    loadComponent: () =>
      import('./components/questions/questions.component').then(
        (m) => m.QuestionsComponent
      ),
  },
];
