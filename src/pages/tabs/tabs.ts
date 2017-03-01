import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { AboutPage } from '../about/about';
import { CreditsPage } from '../credits/credits';
import { PrivacyPage } from '../privacy/privacy';

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TabsPage Page');
  }

  find() { this.navCtrl.push(HomePage); }
  account() { this.navCtrl.push(ProfilePage); }
  settings() { this.navCtrl.push(SettingsPage); }
  about() { this.navCtrl.push(AboutPage); }
  credits() { this.navCtrl.push(CreditsPage); }
  privacy() { this.navCtrl.push(PrivacyPage); }
}
