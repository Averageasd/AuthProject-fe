import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponentComponent } from './customers/customers.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponentComponent,
    LoginComponentComponent,
    HomeComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5297"],
        disallowedRoutes: []
      }
    })

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
