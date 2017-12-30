import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModule } from '../user/user.module';

@Component({
  selector: 'app-add-user-bringg',
  templateUrl: './add-user-bringg.component.html',
  styleUrls: ['./add-user-bringg.component.css']
})
export class AddUserBringgComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  rForm: FormGroup;
  @Output() notify: EventEmitter<UserModule> = new EventEmitter<UserModule>();
  ngOnInit() {
    this.initForm();
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

   private addUser(user: UserModule): void {
   this.notify.emit(user);
   this.rForm.reset();
   }

}
