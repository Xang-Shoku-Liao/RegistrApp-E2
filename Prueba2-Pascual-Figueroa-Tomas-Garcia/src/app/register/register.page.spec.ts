import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
class RegisterPage {
  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) {}

  register() {
    const user = {
      username: this.username,
      password: this.password
    };

    localStorage.setItem('user', JSON.stringify(user));

    this.navCtrl.navigateForward('/login');
  }
}