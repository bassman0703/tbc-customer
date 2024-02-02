import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FileUploadComponent } from './file-upload.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {HtmlSanitizerPipeModule} from "../../common/html-sanitizer";
import {FileDropDirective} from "../../common/directives/file-drop.directive";

@NgModule({
  declarations: [FileUploadComponent, FileDropDirective],
    imports: [CommonModule, NzFormModule, FormsModule, NzToolTipModule, NzIconModule, HtmlSanitizerPipeModule],
    exports: [FileUploadComponent],
})
export class FilUploadModule {}
