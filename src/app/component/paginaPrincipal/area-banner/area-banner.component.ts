import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-area-banner',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './area-banner.component.html',
  styleUrl: './area-banner.component.css'
})
export class AreaBannerComponent {

}
