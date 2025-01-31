'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from './store';
import { ArrowRight, Brain, Timer, Trophy, XCircle } from 'lucide-react';
import type { QuizData } from './types';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setQuizData, startQuiz } = useQuizStore();

  const handleStartQuiz = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/quiz-data');
      const data: QuizData = await response.json();
      setQuizData(data);
      startQuiz();
      router.push('/quiz');
    } catch (err) {
      setError('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto mt-16 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-block p-2 bg-indigo-50 rounded-2xl mb-4">
            <Brain className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Challenge Your Knowledge
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Put your skills to the test with our interactive quiz experience
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90">
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
              <Timer className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Time Challenge</h3>
              <p className="text-gray-600 text-sm">Complete all questions within the given time limit</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
              <Trophy className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Score Points</h3>
              <p className="text-gray-600 text-sm">+4 points for correct answers, -1 for incorrect ones</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50">
              <Brain className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Test Knowledge</h3>
              <p className="text-gray-600 text-sm">Challenge yourself with diverse topics</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg mb-6">
              <XCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={handleStartQuiz}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Loading Quiz...' : 'Start Quiz Now'}</span>
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm">
          Ready to begin? Click the button above to start your quiz journey!
        </p>
      </div>
    </main>
  );
}