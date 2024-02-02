import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'htmlSanitizer'})
export class HtmlSanitizerPipe {

  constructor(private sanitizer:DomSanitizer) {}

  transform(html: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}