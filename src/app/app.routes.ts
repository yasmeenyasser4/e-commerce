import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"", component:AuthLayoutComponent , children:[
        {path:"login", component:LoginComponent,title:"login"},
        {path:"register",component:RegisterComponent,title:"register"}
    ]},
    {path:"", component:BlankLayoutComponent , children:[
        {path:"home",loadComponent:()=>import("./pages/home/home.component").then((c)=>c.HomeComponent),title:"Home"},
        {path:"cart",loadComponent:()=>import("./pages/cart/cart.component").then((c)=>c.CartComponent),title:"Cart"},
        {path:"brands",loadComponent:()=>import("./pages/brands/brands.component").then((c)=>c.BrandsComponent),title:"Brands"},
        {path:"categories",loadComponent:()=>import("./pages/categories/categories.component").then((c)=>c.CategoriesComponent),title:"Categories"},
        {path:"product", loadComponent:()=>import("./pages/products/products.component").then((c)=>c.ProductsComponent),title:"Product"},
        {path:"checkout",loadComponent:()=>import("./pages/checkout/checkout.component").then((c)=>c.CheckoutComponent),title:"checkout"}
    ]},
    {path:"**",component:NotfoundComponent,title:"NotFound"}
];
