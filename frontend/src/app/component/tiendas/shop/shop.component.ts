import { Component, inject, Input, OnInit } from '@angular/core';
import { Tiendas } from '../../../common/Tiendas';
import { NgStyle } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PromocionesService } from '../../../service/promociones.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  @Input({required: true}) tienda!:Tiendas;

  private readonly promocionesService: PromocionesService = inject(PromocionesService);
  promociones: any[] = [];
  constructor() { 

  }

  ngOnInit(): void {
    this.loadPromociones();
  }


  loadPromociones(): void {
    this.promocionesService.getPromotionsByShop(this.tienda.ID_Establecimiento).subscribe(
      (response: any) => {
        this.promociones = response;
      },
      (error: any) => {
        console.error('Error al cargar las promociones', error);
      }
    );
  }
}
