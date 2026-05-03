import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
})
export class InputDateComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() errorMessage?: string;
}
