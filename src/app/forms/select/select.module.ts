import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';

@NgModule({
    declarations: [SelectComponent],
    imports: [CommonModule, NzFormModule, NzIconModule, NzSelectModule, FormsModule, NzToolTipModule],
    exports: [SelectComponent],
})
export class SelectModule {
}
