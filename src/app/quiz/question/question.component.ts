import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../shared/services/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  startDate: Date = new Date();
  idQuiz!: number;

  quizContent: any[] = [];
  playerName: any;

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
  
      // Fetch the quiz content
      this.quizService.getQuizContent(this.idQuiz).subscribe(
        questions => {
          this.quizContent = questions;
          this.quizService.quizContent = questions; // Store the quiz content in the service
        },
        error => {
          console.error('Error fetching quiz content', error);
          // Handle error scenarios appropriately
        }
      );
    });
  }

  fetchQuizContent(): void {
    this.quizService.getQuizContent(this.idQuiz).subscribe(
      content => {
        this.quizContent = content;
      },
      error => {
        console.error('Error fetching quiz content', error);
        // Handle the error state, possibly navigate back or show a message
      }
    );
  }
}
