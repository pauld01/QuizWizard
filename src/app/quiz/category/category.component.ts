import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../../shared/services/category/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() playerName: string = '';
  categories: any[] = [];
  searchValue: string = '';
  filteredCategories: any[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
        this.categories = data;
        this.filteredCategories = data;
      },
      error => {
        console.error('Error fetching quizzes', error);
      });
  }

  ngOnChanges() {
    this.filterCategories();
  }

  // filterCategories() {
  //   this.filteredCategories = this.searchValue ? this.categories.filter(
  //     (category) => category.language.toLowerCase().includes(this.searchValue.toLowerCase())
  //   ) : this.categories;
  // }

  filterCategories() {
    this.filteredCategories = this.searchValue ? this.categories.filter(
      (category) => category.label.toLowerCase().includes(this.searchValue.toLowerCase())
    ) : this.categories;
  }

  navigateToQuizWithId(id: number, categoryLabel: string): void {
    this.router.navigate(['/quiz', id, this.playerName], { queryParams: { categoryLabel }});
  }

  resetFilter() {
    this.searchValue = '';
    this.filteredCategories = this.categories;
  }
}
