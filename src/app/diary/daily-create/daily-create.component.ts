import {Component, OnInit} from '@angular/core';
import {Diary} from '../../models/diary.model';
import {DiaryService} from '../diary.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DailyReport} from '../../models/daily-report.model';
import {Entry} from '../../models/entry.model';

@Component({
  selector: 'app-daily-create',
  templateUrl: './daily-create.component.html',
  styleUrls: ['./daily-create.component.css']
})
export class DailyCreateComponent implements OnInit {

  dailyReport: DailyReport;
  diary: Diary;
  idDiary: string;
  constructor(private diaryService: DiaryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDiary();
    this.dailyReport = {
      entryList: [],
      date: new Date()
    } as DailyReport;
    this.route.paramMap.subscribe(params => {
      this.idDiary = params.get('id');
    });
  }

  getDiary(): void {
    this.diaryService.getDiary().subscribe(res => {
      this.diary = res;
    });
  }

  create(): void {
    if (this.diary.fields) {
      this.diary.fields.forEach((diaryField) => {
        const entry: Entry = {
          idField: diaryField.id,
          value: diaryField.content,
        } as Entry;
        this.dailyReport.entryList.push(entry);
      });
      console.log(this.dailyReport.entryList[0]);
      // this.diaryService.create(this.dailyReport);
      this.dailyReport.entryList = [];
    }
  }
}
