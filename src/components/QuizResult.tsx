'use client';

import { Question } from '@/types/type';

interface QuizResultProps {
  score: number;
  questions: Question[];
  userAnswers: (string | null)[];
  elapsedTime: string;
  onRetry: () => void;
  onNewQuiz: () => void;
}

export default function QuizResult({
  score,
  questions,
  userAnswers,
  elapsedTime,
  onRetry,
  onNewQuiz,
}: QuizResultProps) {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl font-bold">{score >= 5 ? 'Completed' : 'Failure'}</h1>
      <p className="mb-2 text-lg">You got {score} out of {questions.length} correct</p>
      <p className="mb-6 text-lg text-yellow-300">⏱️ Time taken: {elapsedTime}</p>

      <div className="mb-6 space-y-3 text-left">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === q.correctAnswer;
          return (
            <div
              key={index}
              className={`border-2 px-4 py-2 rounded ${
                isCorrect ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'
              }`}
            >
              <p className="mb-1">{index + 1}. {q.question}</p>
              <p className="font-semibold">
                Your Answer: {userAnswer ?? 'No answer selected'}
              </p>
              {!isCorrect && (
                <p className="text-sm text-green-400">Correct Answer: {q.correctAnswer}</p>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={onRetry}
        className="bg-[#C40094] text-white px-4 py-2 rounded hover:bg-purple-600 mr-10"
      >
        Retry Quiz
      </button>
      <button
        onClick={onNewQuiz}
        className="bg-[#C40094] text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        New Quiz
      </button>
    </div>
  );
}