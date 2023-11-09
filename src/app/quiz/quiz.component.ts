import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../shared/services/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  nameCategory: string = '';
  isQuizFinished: boolean = false;
  playerName: string = '';
  quizContent: any[] = [];
  idQuiz: number = 0;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizService.playerName = params['playerName'];
      this.playerName = params['playerName'];
      this.idQuiz = +params['idQuiz'];
      this.nameCategory = params['categoryLabel'];
      this.fetchQuizContent();
    });
  }

  fetchQuizContent(): void {
    this.quizService.getQuizContent(this.idQuiz).subscribe(
      questions => {
        this.quizContent = questions;
      },
      error => {
        console.error('Error fetching quiz content', error);
      }
    );
  }

  goToResultPage(): void {
    this.isQuizFinished = true;
    this.quizService.checkAnswers();
    this.router.navigate(['/result'], { queryParams: { playerName: this.quizService.playerName } });
  }
}
