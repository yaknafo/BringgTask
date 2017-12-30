import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {DataService} from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AddUserBringgComponent } from './add-user-bringg/add-user-bringg.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserBringgComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjV1s3pzQyaCi6rF4la34wAPDuOFP_N8I'
    }),
    AgmJsMarkerClustererModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
