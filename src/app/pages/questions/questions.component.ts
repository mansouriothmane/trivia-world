import { Component, inject, OnInit, signal } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { QType, Question } from '../../model/question.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-questions',
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit {
  questionService = inject(QuestionService);
  questionList = signal<Array<Question>>([]);

  ngOnInit(): void {
    this.questionService
      .getQuestions({ amount: 10 })
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      )
      .subscribe((response) => this.questionList.set(response.results));
  }

  shuffledAnswers(question: Question) {
    switch (question.type) {
      case QType.BOOLEAN:
        return ['False', 'True'];
      case QType.MULTIPLE:
        const answers = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        return answers.sort(() => Math.random() - 0.5);
    }
  }

  generate_input_id(question_index: number, answer_index: number) {
    return `q-${question_index}_a-${answer_index}`;
  }
}
