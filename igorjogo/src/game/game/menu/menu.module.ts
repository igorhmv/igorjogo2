import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { BrowserModule } from '@angular/platform-browser';


/*
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MenuModule { }
*/

@NgModule({
  declarations: [MenuComponent],
  imports: [BrowserModule],
  bootstrap: [MenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [MenuComponent]
})


export class MenuModule {




}

