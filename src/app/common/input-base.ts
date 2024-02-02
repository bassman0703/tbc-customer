import {
    Attribute,
    ChangeDetectorRef,
    Directive,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Self,
} from '@angular/core';
import { FormGroupDirective, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgControl, RequiredValidator } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DefaultValueAccessor } from './default-value-accessor';

@Directive()
export class InputBase implements OnInit, OnDestroy {
    autofilled = false;

    public get disabled() {
        return this.valueAccessor.disabled;
    }

    @Input()
    public set disabled(value: boolean) {
        // @ts-ignore
        this.valueAccessor.setDisabledState(value);
    }

    public get value() {
        return this.valueAccessor.value;
    }

    public get required() {
        return !!this.requiredValidator?.required;
    }

    protected unsubscribe$ = new Subject();

    constructor(
        @Attribute('optional') public optional: boolean,
        @Optional() protected parentFormGroup: FormGroupDirective,
        @Optional() public ngControl: NgControl,
        @Optional() @Self() public requiredValidator: RequiredValidator,
        @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
        @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
        private cd: ChangeDetectorRef,
        private valueAccessor: DefaultValueAccessor,
    ) {
        this.optional = this.optional != undefined;
        if (ngControl) {
            ngControl.valueAccessor = this.valueAccessor;
        }
    }

    ngOnInit(): void {
        if (this.parentFormGroup) {
            this.parentFormGroup.ngSubmit.pipe(takeUntil(this.unsubscribe$)).subscribe((_) => {
                if (!this.disabled) {
                    this.ngControl.control?.markAsTouched();
                    this.cd.detectChanges();
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }

    public updateAndNotify(value: any) {
        this.valueAccessor.updateAndNotify(value);
    }

    public blur() {
        this.valueAccessor.touch();
        (this.ngControl.control as any).markAsDirty();
        (this.ngControl.control as any).updateValueAndValidity();
    }
}
