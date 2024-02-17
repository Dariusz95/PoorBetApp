import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.scss',
})
export class ButtonComponent {
  public buttonText = '';

  @Input()
  set text(name: string) {
    this.buttonText = name.toUpperCase();
  }
  get name(): string {
    return this.buttonText;
  }

  @Input() color: string = '0068B4';
  @Output() btnClick = new EventEmitter();
  @Input() isDisabled = false;

  constructor() {}

  onClick() {
    this.btnClick.emit();
  }
}
