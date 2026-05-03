import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login.component';

import { MatButtonModule } from '@angular/material/button';
import {
  MatCardActions,
  MatCardContent,
  MatCardModule,
  MatCardTitle,
} from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatError,
    SharedModule,
  ],
})
export class AuthModule {}
