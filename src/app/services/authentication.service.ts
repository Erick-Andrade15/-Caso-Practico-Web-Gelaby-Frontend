import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: boolean = false;

  login(email: string, password: string) {
    console.log(email);
    console.log(password);
    this.isUserLoggedIn = email == 'admin@hotmail.com' && password == 'admin';
    if (this.isUserLoggedIn) {
      localStorage.setItem('isUserLoggedIn', 'true');
      // Alerta de inicio de sesión exitoso
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido!',
        showConfirmButton: false,
        timer: 1000
      });
    } else {
      localStorage.setItem('isUserLoggedIn', 'false');
      // Alerta de error de inicio de sesión
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Credenciales inválidas',
        showConfirmButton: false,
        timer: 1000
      });
    }

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap((val) => {
        console.log('Is User Authentication is successful: ' + val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
  }

  constructor() {}
}
