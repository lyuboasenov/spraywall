import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListGymsPage } from './list-gyms.page';

describe('ListGymsPage', () => {
  let component: ListGymsPage;
  let fixture: ComponentFixture<ListGymsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ListGymsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
