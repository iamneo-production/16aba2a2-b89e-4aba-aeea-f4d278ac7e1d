import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  template: ` <p>Home</p> `,
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllMusic();
  }
  ngOnDestroy() {}
}
