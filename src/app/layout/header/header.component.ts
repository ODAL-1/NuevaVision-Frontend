import { Component, inject } from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { User } from "../../interfaces/user.interface";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  isHidden: boolean = false;
  isLogin: boolean = false;
  hiddenRoutes: string[] = [];
  user: any | undefined;

  toTitleCase(str: any) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word: any) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  doLogout() {
    this.authService.doLogout();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHidden =
          this.hiddenRoutes.length > 0 && this.hiddenRoutes.includes(event.url);
        this.isLogin = event.url == "/auth";
      }
    });

    this.authService.user$.subscribe((user) => {
      this.user = user || {};
    });
  }
}
