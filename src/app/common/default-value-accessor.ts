import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export class ValueAccessor implements ControlValueAccessor {
    public disabled = false;

    private _value: any;
    public get value(): any {
        return this._value;
    }

    private onChange = (value: any) => {};
    private onTouched = () => {};
    private = () => {};

    public updateAndNotify(value: any): void {
        this.writeValue(value);
        this.notifyValueChange();
    }

    private notifyValueChange() {
        if (this.onChange) {
            this.onChange(this._value);
        }
    }

    public touch() {
        this.onTouched();
    }

    public writeValue(value: any): void {
        this._value = value;
    }

    public registerOnChange(fn: () => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}

@Injectable()
export class DefaultValueAccessor extends ValueAccessor {
    constructor(private cd: ChangeDetectorRef) {
        super();
    }

    public override writeValue(value: any): void {
        super.writeValue(value);
        this.cd.detectChanges();
    }
}
