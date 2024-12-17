import { Component, Input, input } from '@angular/core';
import { QDifficulty } from '../../model/question.type';

@Component({
  selector: 'app-difficulty',
  imports: [],
  templateUrl: './difficulty.component.html',
  styleUrl: './difficulty.component.scss',
})
export class DifficultyComponent {
  @Input() onClickDifficulty!: (difficulty: QDifficulty | null) => void;

  difficultyItems = [
    {
      name: 'Easy',
      value: QDifficulty.EASY,
    },
    {
      name: 'Medium',
      value: QDifficulty.MEDIUM,
    },
    {
      name: 'Hard',
      value: QDifficulty.HARD,
    },
  ];
}
