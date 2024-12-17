import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { QuestionService } from '../../services/question.service';
import {
  QType,
  Question,
  QuestionAnswer,
  QuestionQuery,
} from '../../model/question.type';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';

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
  isLastQuestion = signal(false);
  randomNumber = signal(Math.random());

  query = input.required<QuestionQuery>();

  @Input() showResult!: () => void;
  @Output() saveAnswersEvent = new EventEmitter<Array<QuestionAnswer>>();

  saveAnswers = () => {
    console.log(this.questionAnswers());
    this.saveAnswersEvent.emit(this.questionAnswers());
  };

  ngOnInit(): void {
    this.questionService
      .getQuestions(this.query())
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
    // Send answers to parent component
    this.saveAnswers();
    this.showResult();
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
}
