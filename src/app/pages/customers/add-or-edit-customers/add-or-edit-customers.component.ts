import {Component, inject} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NZ_MODAL_DATA, NzModalFooterDirective, NzModalRef} from "ng-zorro-antd/modal";
import {User} from "../../../models";
import {finalize, Observable} from "rxjs";
import {UserService} from "../../../services";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzFormDirective} from "ng-zorro-antd/form";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzSelectModule} from "ng-zorro-antd/select";
import {genders} from "../../../data";
import {SelectModule} from "../../../forms/select";
import {InputModule} from "../../../forms/input";
import {FilUploadModule} from "../../../forms/file-upload";

@Component({
  selector: 'app-add-or-edit-customers',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzRowDirective,
    NzInputDirective,
    NzFormDirective,
    NzColDirective,
    NzButtonComponent,
    NzModalFooterDirective,
    NzDividerComponent,
    NzSelectModule,
    FormsModule,
    SelectModule,
    InputModule,
    FilUploadModule
  ],
  templateUrl: './add-or-edit-customers.component.html',
  styleUrl: './add-or-edit-customers.component.scss'
})
export class AddOrEditCustomersComponent {
  modal = inject(NzModalRef);
  userService = inject(UserService);
  nzModalData: {
    customer: Observable<User>
  } = inject(NZ_MODAL_DATA)?.customer?.subscribe((res: User) => {
    console.log(res)
    this.form.patchValue({
      ...res
    })
  })


  imageData: string | null = null;

  isLoading = false;


  form: FormGroup = new FormGroup({
    clientNumber: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    personalNumber: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    legalCountry: new FormControl(null),
    legalCity: new FormControl(null),
    legalAddress: new FormControl(null),
    actualCountry: new FormControl(null),
    actualCity: new FormControl(null ),
    actualAddress: new FormControl(null),
    avatar: new FormControl(null),
  })
  genders$ = genders;


  onFileSelected(event: any) {
    const file = event.target.avatar[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    console.log(this.form)
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.userService
        .update(this.form.value.id, this.form.value)
        .pipe(finalize(() => {
          this.isLoading = false;
        })).subscribe(() => this.modal.triggerOk());
    } else {
      this.userService
        .create(this.form.value)
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe(() => this.modal.triggerOk());
    }
  }

}
