import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() categories: any[] = [];
  @Input() playerName: string = '';
  searchValue: string = '';
  filteredCategories: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredCategories = this.categories;
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

  navigateToQuizWithId(id: number): void {
    this.router.navigate(['/quiz', id, this.playerName]);
  }

  resetFilter() {
    this.searchValue = '';
    this.filteredCategories = this.categories;
  }
}