import {Component, Input} from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { MonsterService } from './monsters.service';

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Catch: {{monster.name}}
    </ion-title>
    <ion-buttons end>
      <button ion-button (click)="dismiss()"><ion-icon name="close"></ion-icon><span class="btn-text">Cancel</span></button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item>
      <ion-avatar item-left>
        <img src="{{monster.icon}}">
      </ion-avatar>
      <h2>{{monster.name}}</h2>
      <p>{{monster.difficulty}}</p>
      <button ion-button (click)="catchMonster({{monster.id}})">Catch Monster</button>
    </ion-item>
  </ion-list>
</ion-content>
`
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

    

    this.monster = this.monsters[this.params.get('monsterId')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  catchMonster(monsterID) {
    
  }
}
