import { Component } from '@angular/core';
import { CareerModel } from 'src/app/models/career.model';
import { CareersService } from 'src/app/services/careers.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent {
  title: string = 'Carreras';
  Careers: CareerModel[] = [];

  constructor(private apiService: CareersService) {
    this.getCareers();
  }

  getCareers(): void {
    this.apiService.getCareers().subscribe(
      (response) => {
        this.Careers = response;
        // console.log(response);
      },
      (error) => {
        console.error('Error al obtener las carreras:', error);
      }
    );
  }

  deleteCareer(id: CareerModel['career_id']) {
    // Muestra una alerta de confirmación antes de eliminar
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el elemento seleccionado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó la eliminación
        this.apiService.deleteCareer(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de careers
            this.Careers = this.Careers.filter(
              (career) => career.career_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Carrera eliminada exitosamente!',
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
              text: 'Ocurrió un error al eliminar la carrera!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }
}
