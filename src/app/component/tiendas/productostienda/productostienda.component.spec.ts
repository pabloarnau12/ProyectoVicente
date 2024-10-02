import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductostiendaComponent } from './productostienda.component';

describe('ProductostiendaComponent', () => {
  let component: ProductostiendaComponent;
  let fixture: ComponentFixture<ProductostiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductostiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductostiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
