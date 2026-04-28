import { Component, inject } from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-side-bar",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.scss",
})
export class SideBarComponent {
  private router = inject(Router);
  isHidden: boolean = false;
  hiddenRoutes: string[] = ["/auth"];

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHidden =
          this.hiddenRoutes.length > 0 && this.hiddenRoutes.includes(event.url);
      }
    });
  }
}
