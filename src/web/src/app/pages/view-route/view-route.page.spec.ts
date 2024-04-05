import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewRoutePage } from './view-route.page';

describe('ViewRoutePage', () => {
  let component: ViewRoutePage;
  let fixture: ComponentFixture<ViewRoutePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
