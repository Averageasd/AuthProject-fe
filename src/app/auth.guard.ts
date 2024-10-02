import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { first, firstValueFrom } from 'rxjs';
import { AuthenticatedResponse } from './interfaces/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // get token from local storage
    const token = localStorage.getItem('jwt');

    // if token is there and not expired return true
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log('no need to refresh');
      return true;
    }
    const isRefreshSuccess = await this.tryRefreshingToken(token!);
    // otherwise, navigate back to login
    if (!isRefreshSuccess){
      this.router.navigate(['login']);
    }

    console.log("refreshed? ", isRefreshSuccess);
    return isRefreshSuccess;
  }

  async tryRefreshingToken(token: string): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
      return false;
    }

    // object that contains token and access token
    const tokens = JSON.stringify({
      accessToken: token,
      refreshToken: refreshToken,
    });

    let refreshSuccess: boolean = false;
    let newTokens: AuthenticatedResponse = { token: '', refreshToken: '' };
    const getRefreshTokenObservable = this.http.post<AuthenticatedResponse>(
      'https://localhost:7226/api/token/refresh',
      tokens,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
    try {
      newTokens = await firstValueFrom(getRefreshTokenObservable);
      refreshSuccess = true;
    } catch (err) {
      return false;
    }

    localStorage.setItem('jwt', newTokens.token);
    localStorage.setItem('refreshToken', newTokens.refreshToken);
    return refreshSuccess;
  }
}
