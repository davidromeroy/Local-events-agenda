import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalEventDetailsPage } from './local-event-details';

@NgModule({
  declarations: [
    LocalEventDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalEventDetailsPage),
  ],
})
export class LocalEventDetailsPageModule {}
