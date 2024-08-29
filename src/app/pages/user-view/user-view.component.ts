import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
user: IUser | null = null;
userService = inject(UsersService);
activatedRoute = inject(ActivatedRoute);
router = inject(Router);


ngOnInit() {
  this.activatedRoute.params.subscribe(async (params: any) => {
    let id = params.id
    this.user = await this.userService.getById(id)
  })
}


async deleteUser(id: string | undefined) {
  if (!id) {
    console.error('El ID de usuario no es válido');
    return;
  }
  
  if (confirm(`¿Estás seguro de que deseas eliminar al usuario con ID ${id}?`)) {
    try {
      await this.userService.delete(id);
      alert('Usuario eliminado correctamente');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error eliminando el usuario:', error);
    }
  }
}

}
