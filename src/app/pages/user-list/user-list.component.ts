import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUserResponse } from '../../interfaces/iuser-response.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  arrUsers: IUser[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  usersService = inject(UsersService);

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    try {
      const response: IUserResponse = await this.usersService.getAll(this.currentPage);
      this.arrUsers = response.results;
      this.totalPages = response.total_pages;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    if (id) {
      let borrado = confirm('Deseas Borrar el usuario cuyo ID es: ' + id);
      if (borrado) {
        try {
          await this.usersService.delete(id);
          this.arrUsers = this.arrUsers.filter(user => user.id !== Number (id));
          alert('Usuario borrado correctamente');
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  async nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      await this.loadUsers();
    }
  }

  async previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.loadUsers();
    }
  }
}



