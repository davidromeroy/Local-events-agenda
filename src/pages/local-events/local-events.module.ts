import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalEventsPage } from './local-events';

@NgModule({
  declarations: [
    LocalEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalEventsPage),
  ],
})
export class LocalEventsPageModule {}
