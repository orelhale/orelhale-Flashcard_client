import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacketsComponent } from './components/packets/packets.component';
import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';

const routes: Routes = [
  { path: '', redirectTo: 'packet', pathMatch: 'full' },
  { path: 'packet', component: PacketsComponent },
  { path: 'packet/:id', component: CardsComponent },
  { path: 'test', component: AppComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
