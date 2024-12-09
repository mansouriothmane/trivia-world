import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Question, QuestionQuery } from '../model/question.type';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  api_url = 'https://opentdb.com/api.php';
  http = inject(HttpClient);

  getQuestions(query: QuestionQuery) {
    const params = new URLSearchParams();
    params.append('amount', query.amount.toString());
    if (query.category) {
      params.append('category', query.category.toString());
    }
    if (query.difficulty) {
      params.append('difficulty', query.difficulty.toString());
    }
    if (query.type) {
      params.append('type', query.type.toString());
    }

    return this.http.get<{ results: Array<Question> }>(
      `${this.api_url}?${params.toString()}`
    );
  }
}
