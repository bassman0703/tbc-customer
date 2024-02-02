import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {concatMap, map, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class BaseService {

  http = inject(HttpClient)

  baseUrl = environment.API_URL

  get<REQ, RES>( url: string, parameters?: REQ): Observable<RES> {
    const options = {
      params: this.getHttpParams(parameters),
    };
    return this.http.get<RES>(`${this.baseUrl}${url}`, {
      ...options,
      observe: 'response',
    })
      .pipe(
        map((res) => {
          if (res.body) return res.body;
          throw Error('Something get wrong')
        })
      );
  }

  public post<T>(url: string, options?: any): Observable<any> {
    return this.http.post<T>(`${this.baseUrl}${url}`, options, { observe: 'response' }).pipe(
      concatMap((res) => {
        if (res.ok) {
          if (!res.body && res.status === 200) {
            return of(true);
          }
          return of(res.body);
        } else {
          throw res.body;
        }
      })
    );
  }

  public put<T>(url: string, options?: any): Observable<any> {
    return this.http.put<T>(`${this.baseUrl}${url}`, options, { observe: 'response' }).pipe(
      concatMap((res) => {
        if (res.ok) {
          if (!res.body && res.status === 200) {
            return of(true);
          }
          return of(res.body);
        } else {
          throw res.body;
        }
      })
    );
  }

  public delete<T>(url: string, parameters?: any, body = {}): Observable<any> {
    const options = {
      params: this.getHttpParams(parameters),
    };
    return this.http
      .delete<T>(`${this.baseUrl}${url}`, {
        observe: 'response',
        ...options,
        body: body,
      })
      .pipe(
        concatMap((res) => {
          if (res.ok) {
            if (!res.body && res.status === 200) {
              return of(true);
            }
            return of(res.body);
          } else {
            throw res.body;
          }
        })
      );
  }

  private getHttpParams(parameters: any) {
    let httpParams = new HttpParams();

    function encodeValue(value: string) {
      if (value && value.toString() === '[object Object]') {
        return JSON.stringify(value);
      } else {
        return value;
      }
    }

    for (const key in parameters) {
      if (!parameters.hasOwnProperty(key)) {
        continue;
      }
      const val = parameters[key];
      if (val != null && val != 'undefined') {
        if (Array.isArray(val)) {
          val.forEach((element: any) => {
            httpParams = httpParams.append(key, encodeValue(element));
          });
        } else {
          httpParams = httpParams.append(key, encodeValue(val));
        }
      }
    }
    return httpParams;
  }
}
