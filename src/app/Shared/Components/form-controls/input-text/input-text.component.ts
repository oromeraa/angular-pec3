import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
})
export class InputTextComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() errorMessage?: string;

  get showError(): boolean {
    return !!this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get computedErrorMessage(): string | null {
    if (!this.control) return null;
    if (this.control.hasError('required')) return `El campo "${this.label}" es obligatorio`;
    if (this.control.hasError('minlength')) {
      return `Mínimo ${this.control.getError('minlength').requiredLength} caracteres`;
    }
    if (this.control.hasError('maxlength')) {
      return `Máximo ${this.control.getError('maxlength').requiredLength} caracteres`;
    }
    return this.errorMessage || null;
  }
}
