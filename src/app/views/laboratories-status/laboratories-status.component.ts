import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LaboratoriesStatusModel } from 'src/app/models/laboratories-status.model';
import { LaboratoriesStatusService } from 'src/app/services/laboratories-status.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laboratories-status',
  templateUrl: './laboratories-status.component.html',
  styleUrls: ['./laboratories-status.component.css'],
  providers: [DatePipe],
})
export class LaboratoriesStatusComponent {
  title: string = 'Estado Laboratorios';
  LaboratoriesStatus: LaboratoriesStatusModel[] = [];

  constructor(
    private apiService: LaboratoriesStatusService,
    private datePipe: DatePipe
  ) {
    this.getLaboratoriesStatus();
  }

  getLaboratoriesStatus(): void {
    this.apiService.getLaboratoryStatuses().subscribe(
      (response) => {
        this.LaboratoriesStatus = response;
      },
      (error) => {
        console.error(
          'Error al obtener los detalles de los estados de laboratorio:',
          error
        );
      }
    );
  }

  deleteLaboratoryStatus(id: LaboratoriesStatusModel['lab_status_id']) {
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
        this.apiService.deleteLaboratoryStatus(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de detalles de estado de laboratorio
            this.LaboratoriesStatus = this.LaboratoriesStatus.filter(
              (detail) => detail.lab_status_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Detalle de estado de laboratorio eliminado exitosamente!',
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
              text: 'Ocurrió un error al eliminar el detalle de estado de laboratorio!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }
}
