import { Component, Input } from '@angular/core';
import { NavController, Platform, NavParams, ViewController} from 'ionic-angular';
import { MonsterService } from './monsters.service';

@Component({
  templateUrl: 'modal.html',
  providers: [MonsterService]
})

export class ModalContentPage {
  monster: any;
  monsters: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private monsterService: MonsterService
  ) {

    this.monsters = this.monsterService.getMonsters();

    var m_id = 0;
    if(this.params.get('monsterId')) {
      m_id = this.params.get('monsterId');
    }

    this.monster = this.monsters[m_id];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
