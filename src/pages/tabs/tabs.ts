import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = 'LocalEventsPage';
  tab2Root = 'LocalEventDetailsPage';
  // tab3Root = 'PagesPeoplePage';
  // tab4Root = 'PagesPlanetsPage';

  constructor() {}

}
