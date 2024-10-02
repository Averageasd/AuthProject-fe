import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponentComponent } from './customers/customers.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AuthGuard } from './auth.guard';
import { HomeComponentComponent } from './home-component/home-component.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'login', component: LoginComponentComponent },

  // protected route determine if user can active toekn
  { path: 'customers', component: CustomersComponentComponent, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
