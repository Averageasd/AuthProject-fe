import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersComponentComponent } from './customers.component';

describe('CustomersComponentComponent', () => {
  let component: CustomersComponentComponent;
  let fixture: ComponentFixture<CustomersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
