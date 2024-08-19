import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
    {path:"", pathMatch: 'full', redirectTo: 'home'},
    {path: "home", component:HomeComponent},
    {path: "dashboard", component: DashboardComponent, children: [
        {path:"", pathMatch: 'full', redirectTo: 'usuarios'},
        {path:"usuarios", component: UserListComponent},
        {path:"usuario/:id", component: UserViewComponent},
        {path:"nuevo-usuario", component: FormComponent},
        {path:"actualizar-usuario/:id", component: FormComponent}

    ]},
    {path:"**", redirectTo: 'home'}
];
