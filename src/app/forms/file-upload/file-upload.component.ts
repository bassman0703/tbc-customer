import { Component} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tb-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  private onChange!: (file: any) => void;
  hovered = false;
  file!: File | string;
  displayFile!: string | File;

  constructor() { }

  writeValue(obj: string | File): void {
    this.file = obj;
    this.displayFile = typeof obj === 'string' ? obj : '';
    if (obj && obj instanceof File) {
      this.fileDisplayPrep(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  fileDrop(fileList: FileList, uploadForm: HTMLFormElement): void {
    if (fileList && fileList.length) {
      if (fileList.length > 1) {
        // display an error
      } else {
        this.onFileSelected(fileList[0]);
      }
    }
  }

  onHover(hovered: boolean): void {
    this.hovered =  hovered;
  }

  onFileSelected(event: any): void {
    let file = event instanceof File ? event : event.target.files[0];

    this.writeValue(file);
    this.onChange(file);
  }

  fileDisplayPrep(file: File): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.displayFile = reader.result as string;
    });

    reader.readAsDataURL(file);
  }

  deleteFile(inputRef: HTMLInputElement): void {
    this.displayFile = '';
    this.writeValue('');
    this.onChange('');
    inputRef.value = '';
  }
}
