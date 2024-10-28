import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  username: string = '';
  newPassword: string = '';

  constructor(private navCtrl: NavController, private toastController: ToastController) {}

  async updatePassword() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (!this.username || !this.newPassword) {
      this.showToast('Por favor, ingresa tu usuario y nueva contraseña.');
      return;
    }

    if (this.newPassword.length < 6) {
      this.showToast('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (this.username === storedUser.username) {
      storedUser.password = this.newPassword;
      localStorage.setItem('user', JSON.stringify(storedUser));
      this.showToast('Contraseña actualizada con éxito');
      this.navCtrl.navigateRoot('/home');
    } else {
      this.showToast('Usuario no encontrado');
    }
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
