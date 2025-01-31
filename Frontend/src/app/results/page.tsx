'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '../store';
import { Trophy, Target, XCircle, Brain, ArrowRight, Percent } from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const { quizData, score, answers, mistakes, resetQuiz } = useQuizStore();

  useEffect(() => {
    if (!quizData) {
      router.push('/');
    }
  }, [quizData, router]);

  if (!quizData) return null;

  const totalQuestions = quizData.questions_count;
  const answeredQuestions = Object.keys(answers).length;
  const correctAnswers = Math.floor((score + answeredQuestions) / 4);
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const handleReturnHome = () => {
    resetQuiz();
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-3xl mx-auto mt-16 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-block p-3 bg-indigo-50 rounded-2xl mb-4">
            <Trophy className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Quiz Complete!
          </h1>
          <p className="text-gray-600 text-lg">
            Here's how you performed on the quiz
          </p>
        </div>

        {/* Results Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90">
          {/* Score Section */}
          <div className="text-center mb-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
            <h2 className="text-3xl font-bold text-indigo-600 mb-2">
              {score} points
            </h2>
            <p className="text-gray-600">Final Score</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 rounded-xl bg-blue-50">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Total Questions</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">{totalQuestions}</p>
            </div>

            <div className="p-4 rounded-xl bg-green-50">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-800">Correct Answers</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
            </div>

            <div className="p-4 rounded-xl bg-red-50">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-gray-800">Mistakes</h3>
              </div>
              <p className="text-2xl font-bold text-red-600">{mistakes}</p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50">
              <div className="flex items-center gap-3 mb-2">
                <Percent className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-800">Accuracy</h3>
              </div>
              <p className="text-2xl font-bold text-purple-600">{accuracy.toFixed(1)}%</p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleReturnHome}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>Try Another Quiz</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Motivational Message */}
        <p className="text-center text-gray-500 text-sm">
          {accuracy >= 80 
            ? "Excellent work! You've mastered this quiz!" 
            : accuracy >= 60 
              ? "Good job! Keep practicing to improve your score!" 
              : "Don't give up! Practice makes perfect!"}
        </p>
      </div>
    </main>
  );
}