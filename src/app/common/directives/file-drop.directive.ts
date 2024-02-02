import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[fileDrop]'
})
export class FileDropDirective {
    @Output() filesDropped = new EventEmitter<FileList>();
    @Output() filesHovered = new EventEmitter();

    constructor() {
    }

    @HostListener('drop', ['$event'])
    onDrop($event: any) {
        $event.preventDefault();

        let transfer = $event.dataTransfer;
        this.filesDropped.emit(transfer.files);
        this.filesHovered.emit(false);
    }

    @HostListener('dragover', ['$event'])
    onDragOver($event: any) {
        $event.preventDefault();

        this.filesHovered.emit(true);
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave($event: any) {
        $event.preventDefault();

        this.filesHovered.emit(false);
    }

}
