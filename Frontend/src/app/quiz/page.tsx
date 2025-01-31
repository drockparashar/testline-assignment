'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '../store';
import { Timer, AlertCircle, ChevronRight, Brain } from 'lucide-react';

export default function QuizPage() {
  const router = useRouter();
  const {
    quizData,
    currentQuestion,
    answers,
    mistakes,
    timeRemaining,
    setAnswer,
    nextQuestion,
    previousQuestion,
    updateTime,
  } = useQuizStore();

  useEffect(() => {
    if (!quizData) {
      router.push('/');
      return;
    }

    if (timeRemaining <= 0) {
      router.push('/results');
      return;
    }

    const timer = setInterval(() => {
      updateTime(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizData, timeRemaining, router, updateTime]);

  useEffect(() => {
    if (quizData && mistakes >= quizData.max_mistake_count) {
      router.push('/results');
    }
  }, [mistakes, quizData, router]);

  if (!quizData) return null;

  const currentQuestionData = quizData.questions[currentQuestion];
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const handleOptionSelect = (optionId: number, isCorrect: boolean) => {
    setAnswer(currentQuestionData.id, optionId, isCorrect);
    setTimeout(() => {
      if (currentQuestion < quizData.questions_count - 1) {
        nextQuestion();
      } else {
        router.push('/results');
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-3xl mx-auto pt-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 backdrop-blur-lg bg-opacity-90">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {quizData.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg">
              <Timer className="w-5 h-5 text-indigo-600" />
              <span className="font-mono text-lg font-semibold text-indigo-600">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-purple-50 rounded-lg font-medium">
                  Question {currentQuestion + 1}/{quizData.questions_count}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span>Mistakes: {mistakes}/{quizData.max_mistake_count}</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full h-3 transition-all duration-300 ease-out"
                style={{ width: `${((currentQuestion + 1) / quizData.questions_count) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 backdrop-blur-lg bg-opacity-90">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestionData.description}
          </h2>
          
          <div className="space-y-4">
            {currentQuestionData.options.map((option: any) => {
              const isAnswered = answers[currentQuestionData.id] === option.id;
              let className = "w-full p-5 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between ";
              
              if (isAnswered) {
                className += option.is_correct 
                  ? "border-green-500 bg-green-50 text-green-700" 
                  : "border-red-500 bg-red-50 text-red-700";
              } else {
                className += "border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => !isAnswered && handleOptionSelect(option.id, option.is_correct)}
                  disabled={isAnswered}
                  className={className}
                >
                  <span className="flex-1">{option.description}</span>
                  {!isAnswered && (
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}