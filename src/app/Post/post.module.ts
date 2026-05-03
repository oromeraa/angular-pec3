import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatCardActions,
  MatCardContent,
  MatCardModule,
  MatCardTitle,
} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';
import { PostCardComponent } from '../Shared/Components/post-card/post-card.component';
import { FormatDatePipe } from '../Shared/Pipes/format-date.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

@NgModule({
  declarations: [
    PostsListComponent,
    PostFormComponent,
    HomeComponent,
    FormatDatePipe,
    DashboardComponent,
    PostCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCardContent,
    MatCardActions,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatError,
    MatDatepickerModule,
    MatSelectModule,
    BaseChartDirective,
    MatChipsModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class PostModule {}
