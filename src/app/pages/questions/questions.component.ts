import { Component, inject, OnInit, signal } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { QType, Question, QuestionAnswer } from '../../model/question.type';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  imports: [FormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit {
  questionService = inject(QuestionService);
  questionList = signal<Array<Question>>([]);
  questionIndex = signal<number>(0);
  questionAnswers = signal<Array<QuestionAnswer>>([]);
  selectedAnswer = signal('');
  isRunningQuiz = signal(true);
  isLastQuestion = signal(false);
  randomNumber = signal(Math.random());

  categoryId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.categoryId = Number(params.get('id'));
    });
    this.questionService
      .getQuestions({ amount: 10, category: this.categoryId! })
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      )
      .subscribe((response) => {
        this.questionList.set(response.results);
      });
  }

  nextQuestion() {
    this.questionIndex.update((i) => i + 1);
    if (this.questionIndex() === this.questionList().length - 1) {
      this.isLastQuestion.set(true);
    }
    this.randomNumber.set(Math.random());
  }

  submitAnswer() {
    const questionAnswer = {
      question: this.questionList().at(this.questionIndex())!,
      answer: this.selectedAnswer(),
    };
    this.questionAnswers.update((value) => [...value, questionAnswer]);
    // Clear selected answer
    this.selectedAnswer.set('');
    console.log(this.questionAnswers());
    if (this.questionIndex() < this.questionList().length - 1) {
      this.nextQuestion();
    }
  }

  endQuiz() {
    this.submitAnswer();
    this.isRunningQuiz.set(false);
  }

  getScore() {
    let score = 0;
    this.questionAnswers().forEach((value) => {
      if (value.question.correct_answer === value.answer) {
        score += 1;
      }
    });
    return (score / this.questionList().length) * 100;
  }

  shuffledAnswers(question: Question) {
    switch (question.type) {
      case QType.BOOLEAN:
        return ['False', 'True'];
      case QType.MULTIPLE:
        const answers = [...question.incorrect_answers];
        answers.splice(
          ((answers.length + 1) * this.randomNumber()) | 0,
          0,
          question.correct_answer
        );
        return answers;
    }
  }

  generate_input_id(question_index: number, answer_index: number) {
    return `q${question_index}-a${answer_index}`;
  }

  takeAnotherQuiz() {
    this.router.navigate(['/categories']);
  }
}
