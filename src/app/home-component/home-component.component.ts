import { JwtHelperService } from '@auth0/angular-jwt';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent {
  // we are not authenicated
  constructor(private jwtHelperService: JwtHelperService) {}
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelperService.isTokenExpired(token)) {
      return true;
    }
    return false;
  };

  // remove token from local storage
  logOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem("refreshToken");
  };
}
