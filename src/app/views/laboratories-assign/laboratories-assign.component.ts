import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LaboratoriesAssignModel } from 'src/app/models/laboratories-assign.model';
import { LaboratoriesAssignService } from 'src/app/services/laboratories-assign.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laboratories-assign',
  templateUrl: './laboratories-assign.component.html',
  styleUrls: ['./laboratories-assign.component.css'],
  providers: [DatePipe],
})
export class LaboratoriesAssignComponent {
  title: string = 'Asignacion de Laboratorios';
  LaboratoriesAssign: LaboratoriesAssignModel[] = [];

  constructor(
    private apiService: LaboratoriesAssignService,
    private datePipe: DatePipe
  ) {
    this.getLaboratoriesAssign();
  }

  getLaboratoriesAssign(): void {
    this.apiService.getLaboratoriesAssign().subscribe(
      (response) => {
        this.LaboratoriesAssign = response;
      },
      (error) => {
        console.error(
          'Error al obtener los detalles de los estados de laboratorio:',
          error
        );
      }
    );
  }

  deleteLaboratoryAssign(id: LaboratoriesAssignModel['lab_assign_id']) {
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
        this.apiService.deleteLaboratoryAssign(id).subscribe(
          () => {
            // Eliminar el elemento del arreglo de laboratories-assign
            this.LaboratoriesAssign = this.LaboratoriesAssign.filter(
              (assign) => assign.lab_assign_id !== id
            );
            // Mostrar una alerta de éxito después de eliminar
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Laboratorio asignado eliminado exitosamente!',
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
              text: 'Ocurrió un error al eliminar el laboratorio asignado!',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        );
      }
    });
  }
  
}
