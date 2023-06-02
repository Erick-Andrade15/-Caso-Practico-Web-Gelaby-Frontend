import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title: string = 'Iniciar sesión';

  formData!: FormGroup;
  email: any;
  password: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onClickSubmit(data: any) {
    this.email = data.email;
    this.password = data.password;
    //Login
    console.log('Login page: ' + this.email);
    console.log('Login page: ' + this.password);
    this.authService.login(this.email, this.password).subscribe((data) => {
      console.log('Is Login Success: ' + data);
      if (data) this.router.navigate(['/home']);
    });
  }
}
