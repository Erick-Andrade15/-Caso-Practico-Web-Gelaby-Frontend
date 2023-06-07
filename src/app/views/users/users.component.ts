import { Component } from '@angular/core';
import { UsersModel } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  title: string = 'Usuarios';
  Users: UsersModel[] = [];

  constructor(private apiService: UsersService) {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getUsers().subscribe(
      (response) => {
        this.Users = response;
        //console.log("AAAAAAAHHHHHHHHH");
        //console.log(response);
      },
      (error) => {
        console.error('Error al obtener los temas:', error);
      }
    );
  }

  deleteUser(id: UsersModel['user_id']) {
    // Muestra una alerta de confirmación antes de eliminar
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario seleccionado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó la eliminación
        this.apiService.deleteUser(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de usuarios
            this.Users = this.Users.filter(
              (user) => user.user_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Usuario eliminado exitosamente!',
              showConfirmButton: false,
              timer: 1000,
            });
          },
          (error) => {
            console.error(error);
            // Mostrar una alerta de error en caso de fallo en la eliminación
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al eliminar el usuario!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }
  


}
