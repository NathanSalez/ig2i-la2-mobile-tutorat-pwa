import { Component, OnInit } from '@angular/core';
import {Diary} from '../../models/diary.model';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Router} from '@angular/router';
import {DiaryService} from '../diary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  diaries: Diary[] = [];

  constructor(private authService: AuthenticationService, private router: Router, private diaryService: DiaryService) { }

  ngOnInit(): void {
    if (!this.authService.isLogged())
    {
      this.router.navigate(['login']);
    }
    this.getDiaries();
  }

  getDiaries(): void
  {
    this.diaryService.getDiaries().subscribe(res => {
      this.diaries = res;
    });
  }

  disconnect(): void
  {
    this.authService.disconnect().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
