import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { QuizService } from '../shared/services/quiz.service'; // Import QuizService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playerName = '';
  isPlayerNameConfirmed = false;
  searchValue = '';
  quizzes: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.authService.isUserConnected();
    this.playerName = this.authService.user?.username || '';

    // Fetch the quizzes from the QuizService
    this.quizService.getQuizzes().subscribe(data => {
      this.quizzes = data;
    },
    error => {
      console.error('Error fetching quizzes', error);
    });
  }

  get isPlayerNameFill() {
    return this.playerName.trim().length === 0;
  }

  confirmPseudo(): void {
    this.isPlayerNameConfirmed = true;
    this.quizService.playerName = this.playerName;
  }

  navigateToQuizWithId(id: number): void {
    this.router.navigate(['/quiz', id, this.playerName]);
  }
  handleInput(event: Event): void {
    this.searchValue = (event.target as HTMLInputElement).value;
  }


}

