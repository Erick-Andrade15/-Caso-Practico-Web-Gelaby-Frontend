import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TeachersDetailsModel } from 'src/app/models/teachers-details.model';
import { TeachersDetailsService } from 'src/app/services/teachers-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teachers-details',
  templateUrl: './teachers-details.component.html',
  providers: [DatePipe],
  styleUrls: ['./teachers-details.component.css']
})
export class TeachersDetailsComponent {
  title: string = 'Detalles de Docentes';
  TeacherDetails: TeachersDetailsModel[] = [];

  constructor(private apiService: TeachersDetailsService,private datePipe: DatePipe) {
    this.getTeacherDetails();
  }

  getTeacherDetails(): void {
    this.apiService.getTeacherDetails().subscribe(
      (response) => {
        this.TeacherDetails = response;
      },
      (error) => {
        console.error('Error al obtener los detalles de los docentes:', error);
      }
    );
  }

  deleteTeacherDetail(id: TeachersDetailsModel['teacher_detail_id']) {
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
        this.apiService.deleteTeacherDetail(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de detalles de docentes
            this.TeacherDetails = this.TeacherDetails.filter(
              (detail) => detail.teacher_detail_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Detalle de docente eliminado exitosamente!',
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
              text: 'Ocurrió un error al eliminar el detalle de docente!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }

}
