import { AfterViewInit, Component } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { LaboratoriesAssignModel } from 'src/app/models/laboratories-assign.model';
import { LaboratoriesAssignService } from 'src/app/services/laboratories-assign.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar-laboratories',
  templateUrl: './calendar-laboratories.component.html',
  styleUrls: ['./calendar-laboratories.component.css'],
})
export class CalendarLaboratoriesComponent {
  LaboratoriesAssign: LaboratoriesAssignModel[] = [];
  title: string = 'Celendario de Laboratorios';

  constructor(private apiService: LaboratoriesAssignService) {
    this.getLaboratoriesAssign();
  }

  getLaboratoriesAssign(): void {
    this.apiService.getLaboratoriesAssign().subscribe(
      (response) => {
        this.LaboratoriesAssign = response;
        this.renderCalendar(); // Llama al método renderCalendar() después de cargar los datos
      },
      (error) => {
        console.error(
          'Error al obtener los detalles de los estados de laboratorio:',
          error
        );
      }
    );
  }

  renderCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, listPlugin, timeGridPlugin],
        events: this.getEvents(),
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        initialView: 'dayGridMonth',
        selectable: true,
        eventClick(info: any) {
          const event = info.event;
          const title = event.title;
          const description = event.extendedProps['description'];

          Swal.fire({
            title: title,
            html: `
              <strong>Descripción:</strong> ${description}<br>
              <strong>Fecha de inicio:</strong> ${event.start}<br>
            `,
            icon: 'info',
            confirmButtonText: 'OK',
          });
        },

        // Otras opciones de configuración del calendario
      });

      calendar.render();
    }
  }

  getEvents() {
    const events = this.LaboratoriesAssign.map((laboratoryAssign) => {
      const description = laboratoryAssign.lab_assign_description;
      const start = laboratoryAssign.lab_assign_date;
      const end = laboratoryAssign.lab_assign_date;
      const labName = laboratoryAssign.laboratory?.lab_name || '';
      const teacherName = laboratoryAssign.teacher?.teacher_first_name
        ? laboratoryAssign.teacher.teacher_first_name +
          ' ' +
          laboratoryAssign.teacher.teacher_last_name
        : '';

      // Formatea la descripción del evento con el nombre del laboratorio y el profesor
      const title = `Laboratorio: ${labName}\nProfesor: ${teacherName}`;

      return {
        title: title,
        start: start,
        end: end,
        extendedProps: {
          description: description,
        },
      };
    });

    console.log(events); // Verifica los eventos generados

    return events;
  }
}
