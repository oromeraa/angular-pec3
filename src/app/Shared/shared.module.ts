import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InputDateComponent } from './Components/form-controls/input-date/input-date.component';
import { InputEmailComponent } from './Components/form-controls/input-email/input-email.component';
import { InputPasswordComponent } from './Components/form-controls/input-password/input-password.component';
import { InputTextComponent } from './Components/form-controls/input-text/input-text.component';

@NgModule({
  declarations: [
    InputTextComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputDateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatError,
  ],
  exports: [
    InputTextComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputDateComponent,
  ],
  providers: [provideNativeDateAdapter()],
})
export class SharedModule {}
