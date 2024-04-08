import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRouteDetailsPage } from './add-route-details.page';

describe('AddRouteDetailsPage', () => {
  let component: AddRouteDetailsPage;
  let fixture: ComponentFixture<AddRouteDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddRouteDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
