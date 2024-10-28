import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  password: string = '';
  userType: string = '';
  selectedUserType: string = '';

  constructor(private navCtrl: NavController, private toastController: ToastController) {}

  register() {
    if (!this.username || !this.password || !this.userType) {
      this.showToast('Por favor, completa todos los campos.');
      return;
    }

    if (this.password.length < 6) {
      this.showToast('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const user = {
      username: this.username,
      password: this.password,
      userType: this.userType
    };

    localStorage.setItem('user', JSON.stringify(user));
    
    if (this.userType === 'Profesor') {
      this.navCtrl.navigateRoot('/principal');
    } else if (this.userType === 'Estudiante') {
      this.navCtrl.navigateRoot('/principal-estudiantes');
    }

    this.username = '';
    this.password = '';
    this.userType = '';
    this.selectedUserType = ''; 
  }

  selectUserType(type: string) {
    this.userType = type;
    this.selectedUserType = type; 
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'dark',
      position: 'top',
    });
    toast.present();
  }
}
