import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewRouteDetailsPage } from './view-route-details.page';

describe('ViewRouteDetailsPage', () => {
  let component: ViewRouteDetailsPage;
  let fixture: ComponentFixture<ViewRouteDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewRouteDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
