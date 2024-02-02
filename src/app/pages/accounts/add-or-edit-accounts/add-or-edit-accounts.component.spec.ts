import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditAccountsComponent } from './add-or-edit-accounts.component';

describe('AddOrEditAccountsComponent', () => {
  let component: AddOrEditAccountsComponent;
  let fixture: ComponentFixture<AddOrEditAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
