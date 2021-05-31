import { Injectable } from '@angular/core';
import { Diary } from '../models/diary.model';
import { Observable, of } from 'rxjs';
import { Field } from '../models/field.model';
import { DailyReportResponse } from '../models/daily-report-response.model';
import {DailyReport} from '../models/daily-report.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {Topic} from '../models/topic.model';
import {Record} from '../models/record.model';
import {DataRecord} from '../models/data-record.model';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private baseUrl = 'http://dourlens-monchy.fr:8091/';

  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  getTopics(): Observable<Topic[]> {
    const params = new HttpHeaders();
    params.append('token', this.authService.getToken());
    return this.http.get<Topic[]>(this.baseUrl + 'v1/topics', {headers: params});
  }

  createTopic(topicName: string): Observable<any> {
    const params = new HttpHeaders();
    params.append('token', this.authService.getToken());
    const body = {name: topicName};
    return this.http.post(this.baseUrl + 'v1/topics', body, {headers: params});
  }

  getTopicById(idTopic: number): Observable<Topic> {
    const params = new HttpHeaders();
    params.append('token', this.authService.getToken());
    return this.http.get<Topic>(this.baseUrl + 'v1/topics/' + idTopic, {headers: params});
  }

  getDiary(): Observable<Diary> {
    const diary = {
      id: '1',
      title: 'Diary Title Test',
      fields: [
        {
          id: '1',
          title: 'Field Title Test 1',
          unit: undefined,
          type: undefined,
        } as Field,
        {
          id: '2',
          title: 'Field Title Test 2',
          unit: undefined,
          type: undefined,
        } as Field,
      ],
    } as Diary;
    return of(diary);
  }

  saveDiary(): Observable<any> {
    return of({
      statusCode: 200,
    });
  }

  getDiaries(): Observable<Diary[]> {
    const diary = {
      id: '1',
      title: 'Diary Title Test 1',
      fields: [
        {
          id: '1',
          title: 'Field Title Test 1',
          unit: undefined,
          type: undefined,
        } as Field,
        {
          id: '2',
          title: 'Field Title Test 1',
          unit: undefined,
          type: undefined,
        } as Field,
      ],
    } as Diary;

    const diary2 = {
      id: '2',
      title: 'Diary Title Test 2',
      fields: [
        {
          id: '3',
          title: 'Field Title Test 1',
          content: undefined,
          unit: undefined,
          type: undefined,
        } as Field,
        {
          id: '4',
          title: 'Field Title Test 1',
          content: undefined,
          unit: undefined,
          type: undefined,
        } as Field,
      ],
    } as Diary;

    const diaries = [diary, diary2];
    return of(diaries);
  }

  getDailyReports(id: string): Observable<DailyReportResponse[]> {
    return this.http.get<DailyReportResponse[]>(
      `${this.baseUrl}/dailyReportsByDiaryId/${id}`
    );
  }
}
