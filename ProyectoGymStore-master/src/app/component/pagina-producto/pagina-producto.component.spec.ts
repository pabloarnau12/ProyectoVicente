import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaProductoComponent } from './pagina-producto.component';

describe('PaginaProductoComponent', () => {
  let component: PaginaProductoComponent;
  let fixture: ComponentFixture<PaginaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
