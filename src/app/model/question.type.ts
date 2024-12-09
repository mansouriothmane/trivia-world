export enum QType {
  MULTIPLE = 'multiple',
  BOOLEAN = 'boolean',
}

export enum QDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type Question = {
  type: QType;
  difficulty: QDifficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
};

export type QuestionQuery = {
  amount: number;
  category?: number;
  difficulty?: QDifficulty;
  type?: QType;
};
