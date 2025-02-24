
import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from 'express';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authService= inject(AuthService);
  // private readonly router = inject(Router);
  isloading:boolean = false;
  msError:string=''



  register:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-z]\w{7,}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators:this.confirmPassword})


  submitForm():void{
   if(this.register.valid){
    this.isloading=true;
    this.authService.sendRegisterForm(this.register.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message === 'success'){
          this.isloading=false;
          // this.router.navigate(['/login'])
          
        }
      },
      error:(err:HttpErrorResponse)=>{
        this.isloading=false;
        console.log(err)
        this.msError= err.error.message;


      }
       
      
    })
   }
  }

  confirmPassword(group:AbstractControl){
    const password= group.get('password')?.value;
    const rePassword= group.get('rePassword')?.value;
    return password===rePassword ? null :{ misMatch: true}

  }
}
