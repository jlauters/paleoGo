import {Component, Input} from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { SpecimenDetailPage } from './specimen-detail.component'
import { MonsterService } from './monsters.service';

@Component({
  templateUrl: `bugbox.html`,
  providers: [MonsterService]
})

export class ModalBugBox {
  monsters: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private monsterService: MonsterService
  ) {

    this.monsters = this.monsterService.getMonsters();
  }

  specimenDetail() {
    this.navCtrl.push(SpecimenDetailPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
