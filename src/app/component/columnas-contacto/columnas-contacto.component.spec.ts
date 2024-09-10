import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnasContactoComponent } from './columnas-contacto.component';

describe('ColumnasContactoComponent', () => {
  let component: ColumnasContactoComponent;
  let fixture: ComponentFixture<ColumnasContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnasContactoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColumnasContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
