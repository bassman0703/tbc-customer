import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlSanitizerPipe } from './html-sanitizer.pipe';

@NgModule({
    declarations: [HtmlSanitizerPipe],
    imports: [CommonModule],
    exports: [HtmlSanitizerPipe],
})
export class HtmlSanitizerPipeModule {}
