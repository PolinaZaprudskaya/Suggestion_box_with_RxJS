import { Component, OnInit } from '@angular/core';
import {User, IUserResponse} from './user.class';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppService} from './app.service';
import {switchMap, debounceTime, tap, finalize, filter} from 'rxjs/operators';
import {Observable} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.sass' ]
})
export class AppComponent implements OnInit {
  filteredUsers: User[] = [];
  usersForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: null
    })
    this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        filter(name => name.length >= 3),
        debounceTime(3000),
        switchMap(value => this.appService.search({name: value}, 1)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(users => this.filteredUsers = users.results);
  }

  displayFn(user: User) {
    if (user) { return user.name; }
  }

}
