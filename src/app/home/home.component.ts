import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { QuizService } from '../shared/services/quiz/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playerName = '';
  isPlayerNameConfirmed = false;
  searchValue = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.authService.isUserConnected();
    this.playerName = this.authService.user?.username || '';
  }

  get isPlayerNameFill() {
    return this.playerName.trim().length === 0;
  }

  confirmPseudo(): void {
    this.isPlayerNameConfirmed = true;
    this.quizService.playerName = this.playerName;
  }
}

