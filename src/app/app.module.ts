import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PacketsComponent } from './components/packets/packets.component';
import { AppRoutingModule } from './app-routing.module';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainComponent } from './layout/main/main.component';
import { AppContainerComponent } from './layout/app-container/app-container.component';
import { CardConfigComponent } from './components/card-config/card-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacketConfigComponent } from './components/packet-config/packet-config.component';
import { HttpClientModule } from '@angular/common/http';
import { Zippy } from './components/zippy/zippy.component';
import { CardsComponent } from './components/cards/cards.component';


@NgModule({
  declarations: [
    AppComponent,
    PacketsComponent,
    GenericTableComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    AppContainerComponent,
    CardConfigComponent,
    PacketConfigComponent,
    Zippy,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
