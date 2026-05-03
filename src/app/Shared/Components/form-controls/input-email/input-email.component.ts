import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
})
export class InputEmailComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() errorMessage?: string;

  get showError(): boolean {
    return !!this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
