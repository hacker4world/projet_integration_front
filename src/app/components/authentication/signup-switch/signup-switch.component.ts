import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'signup-switch',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './signup-switch.component.html',
  styleUrl: './signup-switch.component.css',
})
export class SignupSwitchComponent {
  @Input('signupMode') public signupMode: string = '';
  @Output() signupModeChange = new EventEmitter<string>();

  public changeMode(mode: string): void {
    this.signupModeChange.emit(mode);
  }
}
