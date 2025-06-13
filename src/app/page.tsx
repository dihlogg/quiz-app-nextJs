'use client';

import { API_ENDPOINTS } from '@/services/apiService';
import { Answer, Question, QuizResponse } from '@/types/type';
import { useState } from 'react';
import QuizStart from '@/components/QuizStart';
import QuizHeader from '@/components/QuizHeader';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [quizId, setQuizId] = useState<string | null>(null);

  const getElapsedTime = () => {
    if (!startTime) return '';
    const now = new Date();
    const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}m ${seconds}s`;
  };

  const startQuiz = async () => {
    setQuizStarted(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuestions([]);
    setUserAnswers([]);
    setQuizId(null);
    setStartTime(null);

    try {
      const response = await fetch(API_ENDPOINTS.POST_NEW_QUIZ, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: QuizResponse = await response.json();

      const formattedQuestions: Question[] = data.answers.map((answer: Answer) => ({
        question: answer.questionText,
        options: answer.options.map((opt) => opt.text),
        correctAnswer: answer.options.find((opt) => opt.isCorrect)?.text || '',
      }));

      setQuizId(data.id);
      setQuestions(formattedQuestions);
      setUserAnswers(Array(formattedQuestions.length).fill(null));
      setStartTime(new Date());
      setQuizStarted(true);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleAnswer = (selected: string) => {
    setSelectedAnswer(selected);

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selected;
    setUserAnswers(updatedAnswers);

    if (selected === questions[currentQuestion]?.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = async () => {
    if (!quizId) {
      console.error('Quiz ID is missing. Cannot retry.');
      return;
    }

    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuizStarted(true);
    setSelectedAnswer(null);
    setStartTime(new Date());

    try {
      const response = await fetch(`${API_ENDPOINTS.POST_RETRY_QUIZ}/${quizId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: QuizResponse = await response.json();
      const formattedQuestions: Question[] = data.answers.map((answer: Answer) => ({
        question: answer.questionText,
        options: answer.options.map((opt) => opt.text),
        correctAnswer: answer.options.find((opt) => opt.isCorrect)?.text || '',
      }));
      setQuestions(formattedQuestions);
      setUserAnswers(Array(formattedQuestions.length).fill(null));
    } catch (error) {
      console.error('Error retrying quiz:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#09001D] flex items-center justify-center p-4">
      {!quizStarted ? (
        <QuizStart onStart={startQuiz} />
      ) : (
        <div className="bg-[#09001D] text-white p-6 rounded-lg shadow-lg w-full max-w-md border-4 border-[#C40094]">
          <QuizHeader score={score} totalQuestions={questions.length} />
          {showResult ? (
            <QuizResult
              score={score}
              questions={questions}
              userAnswers={userAnswers}
              elapsedTime={getElapsedTime()}
              onRetry={resetQuiz}
              onNewQuiz={startQuiz}
            />
          ) : (
            <QuizQuestion
              question={questions[currentQuestion]}
              currentQuestionIndex={currentQuestion}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswer}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          )}
        </div>
      )}
    </div>
  );
}