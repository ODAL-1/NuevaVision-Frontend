import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-authentication",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./authentication.component.html",
  styleUrl: "./authentication.component.scss",
})
export class AuthenticationComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm: FormGroup = this.fb.group({
    identifier: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  doLogin() {
    if (this.loginForm.valid) {
      this.authService.doLogin(
        this.loginForm!.get("identifier")!.value,
        this.loginForm!.get("password")!.value
      );
    }
  }
}
