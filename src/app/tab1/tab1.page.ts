import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/compu.jpg',
      titulo: 'Bienvenido',
      desc: 'Sistema de monitoreo'
    },
    {
      img: '/assets/Ima2_preview_rev_1.png',
      titulo: '¿Que es IIOT?',
      desc: 'Es el conjunto de sensores, instrumentos y dispositivos autónomos conectados a través de Internet a aplicaciones industriales.'
    },
  ];

  constructor( private navCtrl: NavController) {}

  onClick(){
    this.navCtrl.navigateBack('tabs/tab2');
  }
}