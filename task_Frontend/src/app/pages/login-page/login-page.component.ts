import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLoginButtonClicked(email: string, password: string) {
    // this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
    //   if (res.status === 200) {
    //     // we have logged in successfully
    //     this.router.navigate(['/lists']);
    //   }
    //   console.log(res);
      
    // });
  }

}
