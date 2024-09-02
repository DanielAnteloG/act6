import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
userService = inject(UsersService);
activatedRoute = inject(ActivatedRoute);
router = inject(Router);
errorForm: any[] = [];
tipo: string = 'Insertar';
userForm: FormGroup;




constructor() {
  this.userForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required,
      Validators.minLength(3)]),
    apellidos: new FormControl(null, [Validators.required,
      Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required,
      Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    imagen: new FormControl(null, [Validators.required,
      Validators.minLength(3)]),
  
  }, [])
}

checkControl(formControlName: string, validador: string) {
  return this.userForm.get(formControlName)?.hasError(validador) && this.userForm.get(formControlName)?.touched;
}


ngOnInit() {
  this.activatedRoute.params.subscribe(async (params: any) => {
    if (params.id) {
      this.tipo = 'Actualizar'
      const user: IUser = await this.userService.getById(params.id)
      

     
      this.userForm = new FormGroup({
        _id: new FormControl(user._id, []),
        nombre: new FormControl(user.first_name, [Validators.required,
          Validators.minLength(3)]),
        apellidos: new FormControl(user.last_name, [Validators.required,
          Validators.minLength(3)]),
        email: new FormControl(user.email, [Validators.required,
          Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
        imagen: new FormControl(user.image, [Validators.required,
          Validators.minLength(3)]),
      }, []);
    }
  })
}




async getDataForm() {
  
  if (this.userForm.value._id) {
    
    try {
      const response: IUser = await this.userService.update(this.userForm.value._id, this.userForm.value)
      if (response._id) {
        alert('Usuario actualizado');
        this.router.navigate(['/dashboard'])
      }
    } catch ({ error }: any) {
      this.errorForm = error
      console.log(this.errorForm)
    }


  } else {
    
    try {
      const response: IUser = await this.userService.insert(this.userForm.value)
      if (response && response.id) {
        alert('Usuario insertado')
        this.router.navigate(['/dashboard'])
      }
    } catch ({ error }: any) {
      this.errorForm = error
      console.log(this.errorForm)
    }
  }




}



}
