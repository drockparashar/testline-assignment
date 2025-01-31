// app/types.ts
export interface Option {
    id: number;
    description: string;
    is_correct: boolean;
    question_id: number;
  }
  
  export interface Question {
    id: number;
    description: string;
    options: Option[];
    detailed_solution: string;
  }
  
  export interface QuizData {
    id: number;
    title: string;
    duration: number;
    questions: Question[];
    questions_count: number;
    correct_answer_marks: string;
    negative_marks: string;
    max_mistake_count: number;
  }