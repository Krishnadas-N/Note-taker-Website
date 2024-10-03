import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovableLogoComponent } from './movable-logo.component';

describe('MovableLogoComponent', () => {
  let component: MovableLogoComponent;
  let fixture: ComponentFixture<MovableLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovableLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovableLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
