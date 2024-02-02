import { Component, Input } from '@angular/core';
import {DefaultValueAccessor, InputBase} from "../../common";

let nextUniqueId = 0;

@Component({
    selector: 'tb-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [DefaultValueAccessor],
})
export class InputComponent extends InputBase {
    @Input() label: string | undefined;
    @Input() type = 'text';
    @Input() placeholder = 'ჩაწერე';
    @Input() prefix = '';
    @Input() prefixIcon: string | null = "";
    @Input() suffix: any = '';
    @Input() suffixIcon: string | null = null;
    @Input() mask = null;
    @Input() size: 'default' | 'large' | 'small' = 'default';
    @Input() autoFocus = false;
    @Input() readonly = false;
    @Input() min: number | null = null;
    @Input() max: number | null = null;
    @Input() errorMessage: string | null = null;

    private uniqueId = `wa-input-${++nextUniqueId}`;
    @Input() id: string = this.uniqueId;

    public get inputId(): string {
        return `${this.id || this.uniqueId}`;
    }
}
