import { Component, Input, input } from '@angular/core';
import { QuestionAnswer } from '../../model/question.type';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  answers = input.required<Array<QuestionAnswer>>();

  @Input() restartQuiz!: () => void;

  computeScore = () => {
    let score = 0;
    this.answers().forEach((answer) => {
      if (answer.question.correct_answer === answer.answer) {
        score += 1;
      }
    });
    return (score / this.answers().length) * 100;
  };
}
