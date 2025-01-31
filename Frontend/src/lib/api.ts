// lib/api.ts
export async function fetchQuizData() {
    try {
      const response = await fetch('http://localhost:5000/quiz-data');
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      throw error;
    }
  }
  
 