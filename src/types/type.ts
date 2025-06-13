export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  questionId: string;
}

export interface Answer {
  questionId: string;
  questionText: string;
  options: Option[];
}

export interface QuizResponse {
  id: string;
  startTime: string;
  status: string;
  answers: Answer[];
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}