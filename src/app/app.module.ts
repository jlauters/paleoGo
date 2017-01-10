import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { CreditsPage } from '../pages/credits/credits';
import { ModalContentPage } from '../pages/home/modal-detail.component';
import { ModalBugBox } from '../pages/home/modal-bugbox.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    CreditsPage,
    ProfilePage,
    AboutPage,
    SettingsPage,
    ModalContentPage,
    ModalBugBox
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    CreditsPage,
    ProfilePage,
    AboutPage,
    SettingsPage,
    ModalContentPage,
    ModalBugBox
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
