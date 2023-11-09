import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {QuizService} from "../../shared/services/quiz.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @Input() categories: any[] = [];
  @Input() playerName: string = '';

  searchValue = '';

  constructor(
    private router: Router
  ) { }

  navigateToQuizWithId(id: number): void {
    this.router.navigate(['/quiz', id, this.playerName]);
  }
  handleInput(event: Event): void {
    this.searchValue = (event.target as HTMLInputElement).value;
  }

}
