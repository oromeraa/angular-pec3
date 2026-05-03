import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileUser: UserDTO;

  name: FormControl;
  surname_1: FormControl;
  surname_2: FormControl;
  alias: FormControl;
  birth_date: FormControl;
  email: FormControl;
  password: FormControl;

  profileForm: FormGroup;
  isValidForm: boolean | null;

  private userId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.profileUser = new UserDTO('', '', '', '', new Date(), '', '');

    this.isValidForm = null;

    this.name = new FormControl(this.profileUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_1 = new FormControl(this.profileUser.surname_1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_2 = new FormControl(this.profileUser.surname_2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.alias = new FormControl(this.profileUser.alias, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.birth_date = new FormControl(
      formatDate(this.profileUser.birth_date, 'yyyy-MM-dd', 'en'),
      [Validators.required],
    );

    this.email = new FormControl(this.profileUser.email, [
      Validators.required,
      Validators.email,
    ]);

    this.password = new FormControl(this.profileUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      alias: this.alias,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password,
    });

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    this.store.select('user').subscribe((userState) => {
      if (userState.user) {
        this.profileUser = userState.user;

        this.profileForm.patchValue({
          name: this.profileUser.name,
          surname_1: this.profileUser.surname_1,
          surname_2: this.profileUser.surname_2,
          alias: this.profileUser.alias,
          birth_date: formatDate(
            this.profileUser.birth_date,
            'yyyy-MM-dd',
            'en',
          ),
          email: this.profileUser.email,
          //password: this.profileUser.password,
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.store.dispatch(UserAction.getUserById({ userId: this.userId }));
    }
  }

  updateUser(): void {
    this.isValidForm = false;

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isValidForm = true;
    this.profileUser = this.profileForm.value;

    if (this.userId) {
      this.store.dispatch(
        UserAction.updateUser({ userId: this.userId, user: this.profileUser }),
      );
    }
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
