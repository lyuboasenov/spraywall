import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListWallsPage } from './list-walls.page';

describe('ListWallsPage', () => {
  let component: ListWallsPage;
  let fixture: ComponentFixture<ListWallsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListWallsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
