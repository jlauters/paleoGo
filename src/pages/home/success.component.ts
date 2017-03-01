import { Component, Input, ElementRef, ViewChild, NgZone} from '@angular/core';
import { App, NavController, Platform, NavParams, ViewController} from 'ionic-angular';
import { MonsterService } from './monsters.service';

import { HomePage } from '../home/home';

@Component({
  templateUrl: 'success.html',
  providers: [MonsterService]
})

export class SuccessPage {
  
  monster: any;
  monsters: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public appCtrl: App,
    private monsterService: MonsterService
  ) {

    this.monsters = this.monsterService.getMonsters();

    var m_id = 0;
    if(this.params.get('monsterId')) {
      m_id = this.params.get('monsterId');
    }

    for(var i = 0; i < this.monsters.length; i++) {
      if(this.monsters[i].id === m_id) {
        this.monster = this.monsters[i];
      }
    }
  }

  home() {
    this.appCtrl.getRootNav().push(HomePage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
