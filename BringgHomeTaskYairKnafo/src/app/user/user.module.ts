import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JsonProperty, JsonObject} from 'json2typescript';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})

@JsonObject
export class UserModule {
  @JsonProperty('_id', String)
  id: string="";
  @JsonProperty('name', String)
  name: string ="";
  @JsonProperty('isActive', Boolean)
  isActive: boolean = false;
  @JsonProperty('picture', String)
  picture: string="";
  @JsonProperty('age', Number)
  age: Number = 0;
  @JsonProperty('email', String)
  email: string="";
  @JsonProperty('latitude', Number)
  latitude: number = 0;
  @JsonProperty('longitude', Number)
  longitude: number = 0;

}
