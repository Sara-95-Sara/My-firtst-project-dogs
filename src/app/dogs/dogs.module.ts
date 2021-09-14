import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogsRoutingModule } from './dogs-routing.module';
import { CreatedogComponent } from './createdog/createdog.component';
import { DogsListComponent } from './dogs-list/dogs-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CreatedogComponent, DogsListComponent],
  imports: [
    CommonModule,
    DogsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class DogsModule { }
