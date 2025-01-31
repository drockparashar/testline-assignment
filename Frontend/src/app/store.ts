// app/store.ts
import { create } from 'zustand';

interface QuizState {
  currentQuestion: number;
  score: number;
  answers: Record<number, number>;
  mistakes: number;
  timeRemaining: number;
  isComplete: boolean;
  quizData: QuizData | null;
}

interface QuizActions {
  setAnswer: (questionId: number, optionId: number, isCorrect: boolean) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setQuizData: (data: QuizData) => void;
  startQuiz: () => void;
  updateTime: (time: number) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState & QuizActions>((set) => ({
  currentQuestion: 0,
  score: 0,
  answers: {},
  mistakes: 0,
  timeRemaining: 0,
  isComplete: false,
  quizData: null,
  setAnswer: (questionId, optionId, isCorrect) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionId },
      score: state.score + (isCorrect ? 4 : -1),
      mistakes: state.mistakes + (isCorrect ? 0 : 1),
    })),
  nextQuestion: () =>
    set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  previousQuestion: () =>
    set((state) => ({ currentQuestion: state.currentQuestion - 1 })),
  setQuizData: (data) =>
    set({ quizData: data, timeRemaining: data.duration * 60 }),
  startQuiz: () =>
    set({ currentQuestion: 0, score: 0, answers: {}, mistakes: 0, isComplete: false }),
  updateTime: (time) => set({ timeRemaining: time }),
  resetQuiz: () =>
    set({
      currentQuestion: 0,
      score: 0,
      answers: {},
      mistakes: 0,
      timeRemaining: 0,
      isComplete: false,
      quizData: null,
    }),
}));
