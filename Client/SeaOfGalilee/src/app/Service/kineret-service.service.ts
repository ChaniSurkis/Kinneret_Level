import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KineretServiceService {
  private apiUrlGetAll = 'https://localhost:7108/Kinneret/data/raw';
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    this.http.get<any>(this.apiUrlGetAll).subscribe(data => {
      console.log("API:", data.result.records);
    });
    return this.http.get<any>(this.apiUrlGetAll);
  }

  getByRange(fromYear: number, fromMonth: number, fromDay: number, toYear: number, toMonth: number, toDay: number): Observable<any> {
    const apiUrlGet = `https://localhost:7108/Kinneret/data` +
      `?fromYear=${fromYear}&fromMonth=${fromMonth}&fromDay=${fromDay}` +
      `&toYear=${toYear}&toMonth=${toMonth}&toDay=${toDay}`;

    this.http.get<any>(apiUrlGet).subscribe(data => {
      console.log("API range:", data);
    });
    return this.http.get<any>(apiUrlGet);

  }
}
