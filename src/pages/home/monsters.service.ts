import { Injectable } from '@angular/core';

import { Monster } from './monsters';
import { MONSTERS } from './mock-monsters';

@Injectable()
export class MonsterService {

  getMonsters(): Monster[] {
    return MONSTERS
  }

  catchMonster(monsterID) {

     let lookup = {};
     let monsters = this.getMonsters();
     
     // array object lookup
     for(var i = 0; i < monsters.length; i++) {
       lookup[monsters[i].id] = monsters[i];
     }

     let monster = lookup[monsterID];
     monster.found = true;
  }
}
