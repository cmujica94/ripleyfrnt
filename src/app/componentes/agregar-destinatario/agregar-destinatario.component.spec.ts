import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDestinatarioComponent } from './agregar-destinatario.component';

describe('AgregarDestinatarioComponent', () => {
  let component: AgregarDestinatarioComponent;
  let fixture: ComponentFixture<AgregarDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDestinatarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
