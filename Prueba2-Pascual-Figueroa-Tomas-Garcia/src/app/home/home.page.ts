import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  password: string = '';

  constructor(private router: Router, public navCtrl: NavController, private toastController: ToastController) {}

  async login() {
    // Validar que los campos no estén vacíos
    if (!this.usuario || !this.password) {
      this.showToast('Por favor, completa todos los campos.');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (this.usuario === storedUser.username && this.password === storedUser.password) {
      this.router.navigate(['/principal'], { queryParams: { nombre: this.usuario } });
      localStorage.setItem('ingresado', 'true');
      this.navCtrl.navigateRoot('/principal');
    } else {
      console.log('Invalid credentials');
      this.showToast('Credenciales inválidas. Por favor, verifica tu usuario y contraseña.');
    }
  }

  goToRecuperar() {
    console.log('click');
    this.router.navigate(['/recuperar']);
  }

  goToRegister() {
    console.log('click');
    this.router.navigate(['/register']);
  }

  // Método para mostrar mensajes de toast
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
