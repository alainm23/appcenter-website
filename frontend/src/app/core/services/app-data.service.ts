import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private http: HttpClient = inject(HttpClient);

  private apiUrl = environment.baseUrl;

  getRecentlyUpdated(): Observable<any[]> {
    return this.http.get(this.apiUrl + '/api/apps/recently-updated').pipe(
      map(({ data }: any) => {
        return data;
      })
    );
  }

  getAppsBanner(): Observable<any[]> {
    return this.http.get(this.apiUrl + '/api/apps/banner').pipe(
      map(({ data }: any) => {
        return data;
      })
    );
  }

  getAppDetail(id: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/apps/app/${id}`).pipe(
      map(({ data }: any) => {
        return data;
      })
    );
  }

  getAppsByDeveloper(name: string) {
    return this.http.get(this.apiUrl + `/api/apps/developer/${name}`).pipe(
      map(({ data }: any) => {
        return data;
      })
    );
  }

  searchApps(query: string) {
    return this.http.get(this.apiUrl + `/api/apps/search?query=${query}`).pipe(
      map(({ data }: any) => {
        return data;
      })
    );
  }

  filterAppsByCategory(key: string) {
    return this.http.get(this.apiUrl + `/api/apps/category/${key}`).pipe(
      map(({ data }: any) => {
        return data;
      })
    );
  }
}
