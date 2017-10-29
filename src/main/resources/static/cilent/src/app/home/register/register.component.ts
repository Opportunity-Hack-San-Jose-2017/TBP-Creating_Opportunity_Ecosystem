import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	user = { firstname: '', lastname: '', email: '', password: '', conPass:'', accept: ''}

  register(val) {console.log(val)}
}
