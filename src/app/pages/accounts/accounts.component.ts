import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {AsyncPipe, CommonModule, DatePipe} from "@angular/common";
import {HeaderComponent} from "../../shared/header/header.component";
import {
  NzTableModule, NzTableQueryParams,
} from "ng-zorro-antd/table";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";
import {map, Observable, switchMap, tap} from "rxjs";
import {Account, PaginationResponse,} from "../../models";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {AddOrEditCustomersComponent} from "../customers/add-or-edit-customers/add-or-edit-customers.component";
import {NzEmptyComponent} from "ng-zorro-antd/empty";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {columns} from "./accounts-columns";
import {AccountService} from "../../services/account.service";
import {AddOrEditAccountsComponent} from "./add-or-edit-accounts/add-or-edit-accounts.component";
import {accountStatus, accountType, currency} from "../../data";
import {SelectModule} from "../../forms/select";


@Component({
  selector: 'app-accounts',
  standalone: true,
  templateUrl: 'accounts.component.html',
  imports: [
    CommonModule,
    AsyncPipe,
    RouterModule,
    NzTableModule,
    NzDividerComponent,
    HeaderComponent,
    NzPaginationComponent,
    AddOrEditCustomersComponent,
    FormsModule,
    NzInputModule,
    NzEmptyComponent,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    ReactiveFormsModule,
    NzSpaceComponent,
    NzSpaceItemDirective,
    SelectModule
  ],
  providers: [NzModalService, DatePipe],
  styleUrl: 'accounts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AccountsComponent {
  modal: NzModalService = inject(NzModalService)
  accountService: AccountService = inject(AccountService)
  route: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  datepipe: DatePipe = inject(DatePipe)
  accountType$ = accountType;
  currency$ = currency;
  accountStatus$ = accountStatus

  page = 1
  pageSize = 10
  total = 0
  sortBy = 'createdAt';
  order: 'ASC' | 'DESC' = 'DESC';
  search: string | null = null;
  searchQuery: any = null;

  advancedFilter = false;

  columns = columns

  searchForm: FormGroup = new FormGroup({
    accountNumber: new FormControl(null),
    clientNumber: new FormControl(null),
    accountType: new FormControl(null),
    currency: new FormControl(null),
    accountStatus: new FormControl(null),
  })

  accounts$: Observable<PaginationResponse<Account>> = this.route.queryParams.pipe(
    tap((route) => {
      this.page = route['page'] || this.page;
      this.pageSize = route['pageSize'] || this.pageSize;
      this.sortBy = route['orderBy'] || this.sortBy;
      this.order = route['order'] || this.order;
      this.searchQuery = route['searchQuery'] || this.searchQuery;
    }),
    switchMap((params) => {
      return this.accountService
        .getAccounts(params).pipe(
          map((res: PaginationResponse<Account>) => {
            return {
              ...res,
              data: res.data.map((item: Account) => ({
                ...item,
                createdAt: this.datepipe.transform(item.createdAt, 'dd/MM/yyyy HH:mm'),
              })) as Account[]
            }
          }),
          tap(
            (res) => {
              this.total = res.total || 0;
            }
          )
        )
    })
  )


  paginationChange(
    params: NzTableQueryParams
  ) {
    const {pageSize, pageIndex, sort} = params;
    const currentSort = sort.find(item => item.value !== null);
    if (currentSort) {
      this.sortBy = (currentSort && currentSort.key);
      this.order = (currentSort && currentSort.value) === 'ascend' ? 'ASC' : 'DESC';
    }
    this.routeChange({
      page: pageIndex,
      pageSize: pageSize,
      sortBy: this.sortBy,
      order: this.order
    })
  }

  filter(value: any) {
    if (value) {
      this.searchQuery = value;
    } else {
      this.searchQuery = null;
    }
    this.routeChange({
      searchQuery: this.searchQuery,
      page: 1
    })
  }

  advancedSearch() {
    if (this.searchForm.value) {
      this.routeChange({...this.searchForm.value, page: 1})
    }
  }

  resetSearch() {
    this.searchForm.reset();
    this.routeChange({...this.searchForm.value, page: 1})
  }

  add(id?: number) {
    this.modal.create({
      nzTitle: 'დამატება/რედაქტირება',
      nzContent: AddOrEditAccountsComponent,
      nzWidth: '750px',
      nzData: {
        account: id && this.getAccountById(id)
      },
      nzOnOk: () => {
        this.router.navigate(['/accounts']).then()
      }
    });
  }

  getAccountById(id: number): Observable<Account> {
    return this.accountService.getAccountById(id)
  }

  delete(id: number){
    this.accountService.deleteAccount(id).subscribe(res=> {
      this.router.navigate(['/accounts']).then()
    })

  }
  routeChange(params: any) {
    this.router.navigate(['.'], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        ...params
      },
      queryParamsHandling: 'merge',
      relativeTo: this.route
    }).then()
  }
}
