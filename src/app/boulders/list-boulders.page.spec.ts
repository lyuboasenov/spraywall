import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ListBouldersPage } from './list-boulders.page';

describe('ListBouldersPage', () => {
  let component: ListBouldersPage;
  let fixture: ComponentFixture<ListBouldersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBouldersPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ListBouldersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
