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
import { SpecimenDetailPage } from '../pages/home/specimen-detail.component';
import { PrivacyPage } from '../pages/privacy/privacy';
import { SuccessPage } from '../pages/home/success.component';
//import { MonsterService } from '../pages/home/monsters.service';

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
    ModalBugBox,
    SpecimenDetailPage,
    PrivacyPage,
    SuccessPage
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
    ModalBugBox,
    SpecimenDetailPage,
    PrivacyPage,
    SuccessPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
