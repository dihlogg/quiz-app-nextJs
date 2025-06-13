'use client';

interface QuizStartProps {
  onStart: () => void;
}

export default function QuizStart({ onStart }: QuizStartProps) {
  return (
    <div className="text-center">
      <button
        onClick={onStart}
        className="bg-[#C40094] text-white text-2xl px-14 py-3 rounded border-2 border-white hover:bg-[#221A34] cursor-pointer transition-colors duration-200"
      >
        Start Quiz
      </button>
    </div>
  );
}