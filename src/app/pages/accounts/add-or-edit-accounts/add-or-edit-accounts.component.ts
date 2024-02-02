import {Component, inject} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzFormDirective} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SelectModule} from "../../../forms/select";
import {Account, CustomersDropdown} from "../../../models";
import {accountType} from "../../../data/account-type";
import {accountStatus} from "../../../data/account-status";
import {NZ_MODAL_DATA, NzModalFooterDirective, NzModalRef} from "ng-zorro-antd/modal";
import {UserService} from "../../../services";
import {finalize, Observable} from "rxjs";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {AccountService} from "../../../services/account.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {InputModule} from "../../../forms/input";

@Component({
  selector: 'app-add-or-edit-accounts',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzDividerComponent,
    NzFormDirective,
    NzInputDirective,
    NzRowDirective,
    ReactiveFormsModule,
    SelectModule,
    NzCheckboxComponent,
    NzModalFooterDirective,
    NgForOf,
    AsyncPipe,
    NzSelectComponent,
    NzOptionComponent,
    InputModule,

  ],
  templateUrl: './add-or-edit-accounts.component.html',
  styleUrl: './add-or-edit-accounts.component.scss'
})
export class AddOrEditAccountsComponent{
  modal = inject(NzModalRef);
  userService = inject(UserService);
  accountService = inject(AccountService);
  nzModalData: {
    account: Observable<Account>
  } = inject(NZ_MODAL_DATA)?.account?.subscribe((res: Account) => {
    console.log(res)
    this.form.patchValue({
      ...res
    })
  })

  customers$: Observable<CustomersDropdown[]> = this.userService.getCustomersDropdown();

  currencies = ['USD','GEL','EUR']

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    accountNumber: new FormControl(null, [Validators.required]),
    clientNumber: new FormControl(null, [Validators.required]),
    accountType: new FormControl(null, [Validators.required]),
    accountStatus: new FormControl(null, [Validators.required]),
    userId: new FormControl(null),
    user: new FormControl(null, [Validators.required]),
    currencies: new FormControl([]),
  });
  accountType = accountType;
  accountStatus = accountStatus;

  isLoading = false;

  submit(): void {
    console.log(this.form)
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.accountService
        .update(this.form.value.id, this.form.value)
        .pipe(finalize(() => {
          this.isLoading = false;
        })).subscribe(() => this.modal.triggerOk());
    } else {
      this.accountService
        .create(this.form.value)
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe(() => this.modal.triggerOk());
    }
  }

  selectUser($event: any) {
    this.form.get('user')?.setValue($event)
  }
}
