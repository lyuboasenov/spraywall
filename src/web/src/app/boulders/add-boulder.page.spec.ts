import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AddBoulderPage } from './add-boulder.page';

describe('AddBoulderPage', () => {
  let component: AddBoulderPage;
  let fixture: ComponentFixture<AddBoulderPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoulderPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBoulderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
