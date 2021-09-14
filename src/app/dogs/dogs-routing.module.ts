import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogsListComponent } from './dogs-list/dogs-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'dogsList', pathMatch: 'full'},
  {path: 'dogsList', component: DogsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DogsRoutingModule { }
