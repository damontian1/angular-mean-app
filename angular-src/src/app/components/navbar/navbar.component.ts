import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  handleLogoutClick(e) {
    e.preventDefault();
    this.authService.logOut();
    this.flashMessage.show("Successfully logged out", {cssClass: "alert-success"})
    this.router.navigate(["/login"]);
  }

}
