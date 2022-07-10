import { Component, OnInit } from '@angular/core';
import { NgModule } from  '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  
  }

  doRegister(){
    let user:User={
      email:this.email,
      password:this.password
    }

    this.apiService.createUser(user).subscribe({
      next: (res) => {
        alert("User created!");
      },
      error: (err) => {
        alert("Error saving data!");
      }
    });
  }

}

