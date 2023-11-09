import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {QuizService} from "../../shared/services/quiz/quiz.service";
import {CategoryService} from "../../shared/services/category/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() playerName: string = '';

  searchValue = '';
  categories: any[] = [];
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    },
    error => {
      console.error('Error fetching quizzes', error);
    });
  }

  navigateToQuizWithId(id: number): void {
    this.router.navigate(['/quiz', id, this.playerName]);
  }
  handleInput(event: Event): void {
    this.searchValue = (event.target as HTMLInputElement).value;
  }

}
