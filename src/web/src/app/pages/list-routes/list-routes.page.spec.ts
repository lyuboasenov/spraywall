import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRoutesPage } from './list-routes.page';

describe('ListRoutesPage', () => {
  let component: ListRoutesPage;
  let fixture: ComponentFixture<ListRoutesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListRoutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
