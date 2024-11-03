import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@Component({
  selector: 'app-principal-estudiantes',
  templateUrl: './principal-estudiantes.page.html',
  styleUrls: ['./principal-estudiantes.page.scss'],
})
export class PrincipalEstudiantesPage implements OnInit {
  username: string = '';
  isSupported = false;
  barcodes: Barcode[] = [];

  scanResult = '';

  constructor(
    private alertController: AlertController, 
    private navCtrl: NavController,
    private modalController: ModalController
  ) { }

  async startScan() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
      formats: [],
      LensFacing: LensFacing.Back
    }
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();

  if(data){
    this.scanResult = data?.barcode?.displayValue;
  }
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';
    this.checkBarcodeSupport();

    // if(this.platform.is('capacitor')) {
    //   BarcodeScanner.isSupported().then();
    //   BarcodeScanner.checkPermissions().then();
    //   BarcodeScanner.removeAllListeners().then();
    // }
  }

  async checkBarcodeSupport() {
    const result = await BarcodeScanner.isSupported();
    this.isSupported = result.supported;
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.showPermissionAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async showPermissionAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso Denegado',
      message: 'Para usar la cámara, debes dar los permisos correspondientes.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  logout() {
    localStorage.setItem('ingresado', 'false');
    this.navCtrl.navigateRoot('/home'); 
  }
}