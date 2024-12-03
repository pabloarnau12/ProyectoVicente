import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AreaBannerComponent } from '../area-banner/area-banner.component';
import { InformacionHomeComponent } from '../informacion-home/informacion-home.component';
import { BestsellersComponent } from '../bestsellers/bestsellers.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { FooterComponent } from '../footer/footer.component';
import { PopularcategoriesComponent } from "../popularcategories/popularcategories.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AreaBannerComponent, InformacionHomeComponent, BestsellersComponent, AboutUsComponent, FooterComponent, PopularcategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
