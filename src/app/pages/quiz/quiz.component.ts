import { DifficultyComponent } from './../../components/difficulty/difficulty.component';
import { Component, signal } from '@angular/core';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { ScoreComponent } from '../../components/score/score.component';
import { Category } from '../../model/category.type';
import {
  QDifficulty,
  Question,
  QuestionAnswer,
  QuestionQuery,
} from '../../model/question.type';

@Component({
  selector: 'app-quiz',
  imports: [
    CategoriesComponent,
    DifficultyComponent,
    QuestionsComponent,
    ScoreComponent,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  step = signal<number>(0);
  questionsQuery = signal<QuestionQuery>({
    amount: 10,
  });
  questionAnswers = signal<Array<QuestionAnswer>>([]);

  saveAnswers(answers: Array<QuestionAnswer>) {
    this.questionAnswers.set(answers);
  }

  nextStep() {
    this.step.update((value) => value + 1);
  }

  handleCategory(category: Category | null) {
    if (category) {
      this.questionsQuery.update((query) => ({
        ...query,
        category: category.id,
      }));
    }
    this.nextStep();
  }

  handleDifficulty(difficulty: QDifficulty | null) {
    if (difficulty) {
      this.questionsQuery.update((query) => ({
        ...query,
        difficulty: difficulty,
      }));
    }
    this.nextStep();
  }

  restartQuiz() {
    this.step.set(0);
  }
}
