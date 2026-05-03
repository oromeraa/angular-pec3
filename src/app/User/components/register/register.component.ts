import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerUser: UserDTO;

  name: FormControl;
  surname_1: FormControl;
  surname_2: FormControl;
  alias: FormControl;
  birth_date: FormControl;
  email: FormControl;
  password: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.registerUser = new UserDTO('', '', '', '', new Date(), '', '');

    this.isValidForm = null;

    this.name = new FormControl(this.registerUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_1 = new FormControl(this.registerUser.surname_1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_2 = new FormControl(this.registerUser.surname_2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.alias = new FormControl(this.registerUser.alias, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.birth_date = new FormControl(
      formatDate(this.registerUser.birth_date, 'yyyy-MM-dd', 'en'),
      [Validators.required],
    );

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.email,
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.registerForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      alias: this.alias,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password,
    });
  }

  register(): void {
    this.isValidForm = false;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;

    const user: UserDTO = {
      name: this.registerUser.name,
      surname_1: this.registerUser.surname_1,
      surname_2: this.registerUser.surname_2,
      alias: this.registerUser.alias,
      birth_date: this.registerUser.birth_date,
      email: this.registerUser.email,
      password: this.registerUser.password,
    };

    this.store.dispatch(UserAction.register({ user }));
  }

  toHomePage(): void {
    this.router.navigateByUrl('home');
  }

  getErrorMessage(control: FormControl): string {
    switch (control) {
      case this.name:
        return this.getNameErrorMessage();
      case this.surname_1:
        return this.getSurnameErrorMessage();
      case this.surname_2:
        return this.getSurname2ErrorMessage();
      case this.alias:
        return this.getAliasErrorMessage();
      case this.birth_date:
        return this.getBirthDateErrorMessage();
      case this.email:
        return this.getEmailErrorMessage();
      case this.password:
        return this.getPasswordErrorMessage();
      default:
        return '';
    }
  }

  getNameErrorMessage(): string {
    if (this.name.hasError('required')) {
      return 'Name is required';
    }
    if (this.name.hasError('minlength')) {
      return 'Name must be greater than 5 characters';
    }
    if (this.name.hasError('maxlength')) {
      return 'Name can be max 25 characters long';
    }
    return '';
  }

  getSurnameErrorMessage(): string {
    if (this.surname_1.hasError('required')) {
      return 'First surname is required';
    }
    if (this.surname_1.hasError('minlength')) {
      return 'First surname must be greater than 5 characters';
    }
    if (this.surname_1.hasError('maxlength')) {
      return 'First surname can be max 25 characters long';
    }
    return '';
  }

  getSurname2ErrorMessage(): string {
    if (this.surname_2.hasError('minlength')) {
      return 'Second surname must be greater than 5 characters';
    }
    if (this.surname_2.hasError('maxlength')) {
      return 'Second surname can be max 25 characters long';
    }
    return '';
  }

  getAliasErrorMessage(): string {
    if (this.alias.hasError('required')) {
      return 'Alias is required';
    }
    if (this.alias.hasError('minlength')) {
      return 'Alias must be greater than 5 characters';
    }
    if (this.alias.hasError('maxlength')) {
      return 'Alias can be max 25 characters long';
    }
    return '';
  }

  getBirthDateErrorMessage(): string {
    if (this.birth_date.hasError('required')) {
      return 'Birth date is required';
    }
    return '';
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }
    if (this.email.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }
    if (this.password.hasError('minlength')) {
      return 'Password must be greater than 8 characters';
    }
    return '';
  }
}
