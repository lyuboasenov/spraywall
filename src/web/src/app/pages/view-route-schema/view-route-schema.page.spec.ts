import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewRouteSchemaPage } from './view-route-schema.page';

describe('ViewRouteSchemaPage', () => {
  let component: ViewRouteSchemaPage;
  let fixture: ComponentFixture<ViewRouteSchemaPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ViewRouteSchemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
