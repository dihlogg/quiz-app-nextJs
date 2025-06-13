'use client';

interface QuizHeaderProps {
  score: number;
  totalQuestions: number;
}

export default function QuizHeader({ score, totalQuestions }: QuizHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4 border-b-2 border-[#C40094] pb-2">
      <p className="text-xl font-bold">Quiz App</p>
      <button className="bg-[#C40094] text-white px-3 py-1 rounded">
        Score: {score}/{totalQuestions || 0}
      </button>
    </div>
  );
}