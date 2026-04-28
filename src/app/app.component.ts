import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./layout/header/header.component";
import { SideBarComponent } from "./layout/side-bar/side-bar.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, SideBarComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "NuevaVision";
}
