import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './app-button.component';

describe('AppButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the event when #onButtonClicked is called', () => {
    const emitSpy = spyOn(component.btnClick, 'emit');
  
    component.onClick();
  
    expect(emitSpy).toHaveBeenCalled();
  });
});
