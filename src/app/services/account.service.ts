import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import {Account, PaginationResponse} from "../models";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  getAccounts(request: any): Observable<PaginationResponse<Account> >{
    return this.get<any, PaginationResponse<Account>>(`accounts`, request)
  }

  getAccountById(id: number):Observable<Account>{
    return this.get(`accounts/${id}`)
  }

  deleteAccount(accountId: number) {
    return this.delete(`accounts/${accountId}`)
  }

  create(postData: any): Observable<any> {
    return this.post(`accounts`, postData)
  }

  update(id: number, params: any): Observable<any> {
    return this.put(`accounts/${id}`, params)
  }

}
