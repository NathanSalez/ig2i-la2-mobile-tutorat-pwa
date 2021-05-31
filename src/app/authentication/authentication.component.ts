import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  hide = true;
  email?: string;
  password?: string;
  badCredentials = false;
  registered = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isLogged()) {
      this.router.navigate(['diary']);
    }
  }

  login(): void {
    if (this.email && this.password) {
      this.authenticationService.login(this.email, this.password).subscribe(() => {
        this.router.navigate(['diary']);
        this.badCredentials = !this.authenticationService.isLogged();
      });
    }
  }

  createUser(): void {
    if (this.email && this.password) {
      this.authenticationService.createUser(this.email, this.password).subscribe(() => {
        this.registered = true;
      });
    }
  }

  ping(): void {
    this.authenticationService.ping();
  }
}
