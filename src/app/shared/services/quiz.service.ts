import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:3000';
  quizContent: any[] = [];
  playerAnswers: {questionId: number; answer: string}[] = [];
  score = 0;
  isQuizFinished = false;
  playerName: string = '';

  constructor(private http: HttpClient) { }
  

  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/quiz');
  }
  checkAnswers(): number {
    this.score = 0;
    for (let i = 0; i < this.playerAnswers.length; i++) {
      const question = this.quizContent.find((q) => q.id === this.playerAnswers[i].questionId);
      if (!question) continue;
      for (let j = 0; j < question.answers.length; j++) {
        const currentAnswer = question.answers[j];
        if (currentAnswer.isCorrect && this.playerAnswers[i].answer === currentAnswer.answerLabel) {
          this.score += 1;
          break;
        }
      }
    }
    this.isQuizFinished = true;
    return this.score;
  }

  addAnswer(answer: string, questionId: number) {
    const isAnswered = this.playerAnswers.find((a) => a.questionId === questionId);
    if (isAnswered) {
      isAnswered.answer = answer;
      return;
    }
    this.playerAnswers.push({questionId, answer});
  }

  _getQuizContent() {
    this.http.get('http://localhost:3000/questions').subscribe((questions: any) => {
      for (const question of questions) {
        this.http.get(`http://localhost:3000/answers?questionId=${question.id}`).subscribe((answers: any) => {
          this.quizContent.push({
              id: question.id,
              question: question.questionLabel,
              answers
          });
        });
      }
    });
  }
  getQuizContent(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/questions?idQuiz=${id}`).pipe(
      switchMap((questions) => {
        if (questions.length === 0) {
          throw new Error('No questions found for the given quiz ID.');
        }
        const answerRequests = questions.map(question =>
          this.http.get(`${this.apiUrl}/answers?questionId=${question.id}`).pipe(
            map(answers => ({
              id: question.id,
              question: question.questionLabel,
              answers: answers
            }))
          )
        );
        return forkJoin(answerRequests);
      })
    );
  }


  resetQuiz() {
    this.quizContent = [];
    this.playerAnswers = [];
    this.score = 0;
    this.isQuizFinished = false;
  }
}
