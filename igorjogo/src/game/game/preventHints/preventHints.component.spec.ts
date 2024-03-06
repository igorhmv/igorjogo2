/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PreventHintsComponent } from './preventHints.component';

describe('PreventHintsComponent', () => {
  let component: PreventHintsComponent;
  let fixture: ComponentFixture<PreventHintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventHintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
