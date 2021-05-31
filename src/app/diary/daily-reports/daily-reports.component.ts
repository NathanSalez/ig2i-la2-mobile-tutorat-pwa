import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyReportResponse } from 'src/app/models/daily-report-response.model';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.css'],
})
export class DailyReportsComponent implements OnInit {
  isLoaded = false;
  diaryId: string;
  dailyReportResponses: DailyReportResponse[];
  dailyReportsViews: Map<number, DailyReportsView> = new Map();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private diaryService: DiaryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.diaryId = params.get('id');
      this.diaryService
        .getDailyReports(this.diaryId)
        .subscribe((response: DailyReportResponse[]) => {
          this.dailyReportResponses = response;
          this.loadData();
        });
    });
  }

  private loadData(): void {
    const dailyWeeks = this.getRangeOfWeekDays();

    let i = 1;
    if (dailyWeeks != null) {
      dailyWeeks.forEach((day) => {
        const reportForTheDay = this.findReportForDate(day);

        if (reportForTheDay && reportForTheDay.length > 0) {
          const fieldsMap: Map<string, EntryView> = new Map();
          reportForTheDay[0].entryList.forEach((entryElt) => {
            fieldsMap.set(entryElt.field.title, {
              name: entryElt.field.title,
              value: entryElt.value,
              unit: entryElt.field.unit,
            });
          });
          this.dailyReportsViews.set(i, {
            dailyReportId: reportForTheDay[0].idDailyReport,
            date: day,
            fieldsMap,
          });
        } else {
          this.dailyReportsViews.set(i, {
            dailyReportId: reportForTheDay[0].idDailyReport,
            date: day,
            fieldsMap: null,
          });
        }
        i++;
      });
    }

    this.isLoaded = true;
  }

  private findReportForDate(dateToCompare: Date) {
    return this.dailyReportResponses.filter((report) => {
      const date: Date = new Date(report.date);
      return (
        date.getDate() === dateToCompare.getDate() &&
        date.getMonth() === dateToCompare.getMonth() &&
        date.getFullYear() === dateToCompare.getFullYear()
      );
    });
  }

  editReport(): void {
    this.router.navigate([`/daily-reports/${this.diaryId}/create`], {
      relativeTo: this.route,
    });
  }

  getRangeOfWeekDays(): Date[] {
    const weekDays: Date[] = [];
    const currentDate: Date = new Date();
    const monday: Date = this.getMondayOfTheWeek(currentDate);

    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(monday.getDate() + i - 1);
      weekDays.push(date);
    }
    return weekDays;
  }

  getMondayOfTheWeek(date: Date): Date {
    date = new Date(date);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  getDayFromDate(date: Date): any {
    return date.getDate();
  }

  getMonthFromDate(date: Date): any {
    return date.getMonth();
  }

  getYearFromDate(date: Date): any {
    return date.getFullYear();
  }

  getDayAsString(date: number): any {
    let result: string;
    switch (date) {
      case 1:
        result = 'Lundi';
        break;
      case 2:
        result = 'Mardi';
        break;
      case 3:
        result = 'Mercredi';
        break;
      case 4:
        result = 'Jeudi';
        break;
      case 5:
        result = 'Vendredi';
        break;
      case 6:
        result = 'Samedi';
        break;
      case 7:
        result = 'Dimanche';
        break;
    }
    return result;
  }

  canDisplayBorder(date: number): boolean {
    return date > 1;
  }

  getViewFromMap(dailyView: any): DailyReportsView {
    return dailyView as DailyReportsView;
  }

  getEntryViewFromMap(sth: any): EntryView {
    return sth as EntryView;
  }
}

class DailyReportsView {
  date: Date;
  dailyReportId: string;
  //<fieldname, {value, unit}>
  fieldsMap: Map<string, EntryView>;
}

class EntryView {
  name: string;
  value: string;
  unit: string;
}
