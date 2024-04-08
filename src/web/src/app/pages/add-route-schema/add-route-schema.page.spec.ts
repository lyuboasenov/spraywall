import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRouteSchemaPage } from './add-route-schema.page';

describe('AddRouteSchemaPage', () => {
  let component: AddRouteSchemaPage;
  let fixture: ComponentFixture<AddRouteSchemaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddRouteSchemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
