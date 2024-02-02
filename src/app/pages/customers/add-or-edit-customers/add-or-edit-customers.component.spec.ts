import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCustomersComponent } from './add-or-edit-customers.component';

describe('AddOrEditCustomersComponent', () => {
  let component: AddOrEditCustomersComponent;
  let fixture: ComponentFixture<AddOrEditCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditCustomersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
