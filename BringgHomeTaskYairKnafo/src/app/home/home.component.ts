import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserModule } from '../user/user.module';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgmCoreModule, LatLngBoundsLiteral } from '@agm/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  bringgUsers: Array<UserModule> = [];
  addingUser: boolean;
  rForm: FormGroup;
  userFocus: UserModule;
  zoom: number;
  bounds: LatLngBoundsLiteral;

  ngOnInit(): void {
    this.userFocus = new UserModule();
    this.initUsers();
    this.initForm();
  }

  private convertJsonToUserArray(jsonString: string): void {
    const jsonConvert = new JsonConvert();
    try {
      this.bringgUsers.push(jsonConvert.deserialize(jsonString, UserModule));
    } catch (e) {
      console.log(e);
    }

  }

  private initForm(): void {
    this.rForm = this.fb.group({
      'id': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(23)])],
      'name': [null, Validators.required],
      'age': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
      'latitude': [null, Validators.compose([Validators.required, Validators.minLength(-90.000001), Validators.maxLength(90)])],
      'longitude': [null, Validators.compose([Validators.required, Validators.minLength(-180.000001), Validators.maxLength(180)])],
      'isActive': ''
    });

  }

  private initUsers() {
    this.dataService.getJSON().subscribe(data => {
      const jsonData = data.json();
      for (let i = 0; i < jsonData.length; i++) {
        this.convertJsonToUserArray(jsonData[i]);
      }
      this.setBounds();
      this.sortByName();

    });
  }

  public sortByName(): void {
    this.bringgUsers.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
  }

  public sortByAge(): void {

    this.bringgUsers.sort((a, b) => {
      return a.age < b.age ? -1 : 1;
    });
  }

  public removeUser(user: UserModule): void {
    const indexOfUser = this.bringgUsers.indexOf(user);
    this.bringgUsers.splice(indexOfUser, 1);
  }

  public showUserFromCreate() {
    this.addingUser = !this.addingUser;
  }

  private addUserToList(user: UserModule): void {
    this.bringgUsers.push(user);
    this.rForm.reset();
    this.sortByAge();
  }

  private foucesMapOnUser(index: number): void {
    this.userFocus = this.bringgUsers[index];
    this.zoom = 7;
  }


  private setBounds(): void {
    const mostEast = this.bringgUsers.reduce((acc, v) => (acc.longitude < v.longitude) ? v : acc);
    const mostWest = this.bringgUsers.reduce((acc, v) => (acc.longitude > v.longitude) ? v : acc);
    const mostNorth = this.bringgUsers.reduce((acc, v) => (acc.latitude < v.latitude) ? v : acc);
    const mostSouth = this.bringgUsers.reduce((acc, v) => (acc.latitude > v.latitude) ? v : acc);
    this.bounds = {
      east: mostEast.longitude,
      north: mostNorth.latitude,
      south: mostSouth.latitude,
      west: mostWest.longitude
    };
  }


}
