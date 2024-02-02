import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
    declarations: [InputComponent],
    imports: [CommonModule, NzFormModule, NzInputModule, FormsModule, NzIconModule],
    exports: [InputComponent],
})
export class InputModule {}
