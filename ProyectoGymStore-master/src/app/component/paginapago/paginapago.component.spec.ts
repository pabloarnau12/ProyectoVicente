import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginapagoComponent } from './paginapago.component';

describe('PaginapagoComponent', () => {
  let component: PaginapagoComponent;
  let fixture: ComponentFixture<PaginapagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginapagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginapagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
