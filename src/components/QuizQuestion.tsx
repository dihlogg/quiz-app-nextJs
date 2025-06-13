'use client';

import { Question } from '@/types/type';

interface QuizQuestionProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  onNext: () => void;
}

export default function QuizQuestion({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onNext,
}: QuizQuestionProps) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        {currentQuestionIndex + 1}. {question?.question}
      </h2>
      <div className="mb-8 space-y-6">
        {question?.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`w-full bg-[#09001D] text-white px-4 py-2 rounded border-2 border-[#221A34] hover:bg-[#221A34] cursor-pointer transition-colors duration-200 hover:text-white ${
              selectedAnswer === option
                ? option === question?.correctAnswer
                  ? 'border-green-500'
                  : 'border-red-500'
                : ''
            } ${
              selectedAnswer && option === question?.correctAnswer && selectedAnswer !== option
                ? 'border-green-500'
                : ''
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm">
          {currentQuestionIndex + 1} of {totalQuestions} Questions
        </p>
        <button
          onClick={onNext}
          className={`bg-[#C40094] text-white px-8 py-2 rounded cursor-pointer transition-colors duration-200 ${
            !selectedAnswer ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#950170]'
          }`}
          disabled={!selectedAnswer}
        >
          Next
        </button>
      </div>
    </div>
  );
}