/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CovidBookComponent } from './covidBook.component';

describe('CovidBookComponent', () => {
  let component: CovidBookComponent;
  let fixture: ComponentFixture<CovidBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
