import { CommonService } from './common.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'firstblog';
  allUsers: Object;
  isEdit = false;
  user = {
    name: '',
    email: '',
    phone: '',
    password: '',
    id: '',
  };

  constructor(private svc: CommonService) {}

  ngOnInit() {
    this.getUsers();
  }

  createUser(data) {
    this.svc.createUser(data).subscribe((response) => {
      console.log('User has been added');
      this.getUsers();
    });
  }

  getUsers() {
    this.svc.getUsers().subscribe((response) => {
      this.allUsers = response;
    });
  }

  updateUser() {
    this.svc.updateUser(this.user).subscribe((response) => {
      console.log('User has been updated');
      this.getUsers();
      this.isEdit = false;
      this.user = {
        name: '',
        email: '',
        phone: '',
        password: '',
        id: '',
      };
    });
  }
  editUser(user) {
    this.user = user;
    this.isEdit = true;
  }

  deleteUser(user) {
    this.svc.deleteUser(user).subscribe((response) => {
      console.log('User has been deleted');
      this.getUsers();
    });
  }
}
