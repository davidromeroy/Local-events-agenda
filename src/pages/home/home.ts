import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToLocalEvents() {
    this.navCtrl.push('LocalEventsPage');
  }

  goToTabsPage() {
    this.navCtrl.push('TabsPage');
  }

}
