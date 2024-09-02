import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    nombre: new FormControl(null, []),
    apellidos: new FormControl(null, []),
    email: new FormControl(null, []),
    imagen: new FormControl(null, []),
  
  }, [])
}

ngOnInit() {
  this.activatedRoute.params.subscribe(async (params: any) => {
    if (params.id) {
      this.tipo = 'Actualizar'
      const user: IUser = await this.userService.getById(params.id)
      

      //opcion 2 inicializando de nuevo los campos del formulario me permite por ejemplo poner otros validadores
      this.userForm = new FormGroup({
        _id: new FormControl(user._id, []),
        nombre: new FormControl(user.first_name, []),
        apellidos: new FormControl(user.last_name, []),
        email: new FormControl(user.email, []),
        imagen: new FormControl(user.image, []),
      }, [])


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
      if (response._id) {
        this.router.navigate(['/dashboard'])
      }
    } catch ({ error }: any) {
      this.errorForm = error
      console.log(this.errorForm)
    }
  }




}



}
