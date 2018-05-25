import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  username: String;
  password: String;
  constructor(
    private validateService:ValidateService,
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }
  ngOnInit() {}
  handleRegisterSubmit(e) {
    e.preventDefault();
    const { name, email, username, password } = this;
    const newUser = {
      name, email, username, password
    }
    if(!this.validateService.validateNotEmpty(newUser)) {
      this.flashMessage.show("bad data: missing field", {cssClass: "alert-danger"})
    }
    if (!this.validateService.validateIsEmail(email)) {
      this.flashMessage.show("bad data: email", {cssClass: "alert-danger"})
    }
    this.authService.registerUser(newUser).subscribe(data => {
      if (data.msg) {
        this.router.navigate(['/login'])
        this.flashMessage.show("You've successfully registered and can now log in", {cssClass: "alert-success"})
      }
      else {
        this.router.navigate(['/register'])
        this.flashMessage.show("Problem with registration", {cssClass: "alert-danger"})
      }
    })
  }

}
