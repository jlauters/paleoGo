import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { CreditsPage } from '../pages/credits/credits';
import { ProfilePage } from '../pages/profile/profile';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  private rootPage: any;
  private pages: any[];

  constructor(private platform: Platform, private menu: MenuController) {

    this.menu = menu;
    this.pages = [
      { title: 'Find Specimens', component: HomePage},
      { title: 'Settings', component: SettingsPage},
      { title: 'My Account', component: ProfilePage},
      { title: 'About', component: AboutPage},
      { title: 'Credits', component: CreditsPage}
    ];   
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.menu.close()
    this.nav.push(page.component);
  }
}
