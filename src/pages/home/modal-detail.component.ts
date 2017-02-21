import { Component, Input, ElementRef, ViewChild, NgZone} from '@angular/core';
import { NavController, Platform, NavParams, ViewController} from 'ionic-angular';
import { MonsterService } from './monsters.service';

@Component({
  templateUrl: 'modal.html',
  providers: [MonsterService]
})

export class ModalContentPage {

  @ViewChild('theCanvas') theCanvas: ElementRef;

  private ctx: CanvasRenderingContext2D;
  
  private canvasWidth: number = 900;
  private canvasHeight: number = 500;

  private rects = Array();

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

  // Pass two objects ( coords{x:0, y:0, h:10, w:10} )
  // Return if collided or not
  public detectCollisions(obj_1, obj_2) {

    console.log("in Detect Collisions");
    var collide = false;

    var left = obj_1.x, right = obj_1.x + obj_1.w;
    var top  = obj_1.y, bottom = obj_1.y + obj_1.h;
       
    if(right >= obj_2.x && left <= obj_2.x && bottom >= obj_2.y && top <= obj_2.y) {
 
      console.log( "COLLISION!!!");
      collide = true;
    }    

    return collide;

  }

  public ngAfterViewInit(): void {

    // canvas context
    var ctx = this.theCanvas.nativeElement.getContext("2d");
    var rects = this.rects;
    var self = this;

    // init canvas
    ctx.canvas.width = ( window.innerWidth * 0.9 );
    ctx.canvas.height = ( window.innerHeight * 0.75 );

    // starting position for hammer ( height is right, could be more centered )
    var hammer_x = ( (ctx.canvas.height * 0.75) / 2 );
    var hammer_y = ( (ctx.canvas.width * 0.5) / 2  ); 

    // Starting position for our monster
    var monster_img = new Image();
    monster_img.src = this.monster.icon;
    ctx.drawImage(monster_img, 120, 10, monster_img.width, monster_img.height);

    rects.push({x: 120, y: 10, w: monster_img.width, h: monster_img.height});

    // Get Mouse Position on click
    ctx.canvas.addEventListener('mousedown', function(e) {
      console.log('in mousedown event listener');

      var rect = ctx.canvas.getBoundingClientRect();
      var mouse_x = (e.clientX - rect.left);
      var mouse_y = (e.clientY - rect.top);

      var collided = false;
      for (var i = 0, len = rects.length; i < len; i++) {

        collided = self.detectCollisions(rects[i], {x:mouse_x, y:mouse_y, h:0, w:0});
        console.log("index: " + i + " clicked: " + collided);
        
      }

    })

    ctx.canvas.addEventListener('mouseup', function(e) {
      console.log('in mouseup event listener');

      var rect = ctx.canvas.getBoundingClientRect();
      var mouse_x = (e.clientX - rect.left);
      var mouse_y = (e.clientY - rect.top);

      // TODO: Set hammer x,y here      
      hammer_y = mouse_y;
      hammer_x = mouse_x;

    })

    var paintCanvas = function() {

     var interval = setInterval(function() {

      var breakout = false;
      var mon_x = 50, mon_y = 10;
      var direction = 'inc';
      var ydir = 'inc';

      return function() {
        rects = Array()
        ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(monster_img, mon_x, mon_y);

        rects.push({x: mon_x, y: mon_y, w: monster_img.width, h: monster_img.height});

        //var hammer = new Image();
        //hammer.onload = function() {
          rects.push({x: hammer_x, y: hammer_y, h: 40, w: 40});
          ctx.drawImage(hammer, hammer_x, hammer_y, 40, 40);

          if(rects)  {

            var collided = self.detectCollisions(rects[0],rects[1]);  
            if(collided) {
              console.log("OMG!! you hit it");

              breakout = true;
            }

          }
        //}
        //hammer.src = "assets/hammer.svg";

        // movement logic 
        if (mon_x >= ( ctx.canvas.width * 0.75)) { direction = 'dec'; }
        if (mon_x <= ( ctx.canvas.width * 0.25)) { direction = 'inc'; }

        if (mon_y >= 30) { ydir = 'dec'; }
        if (mon_y <= 10) { ydir = 'inc'; }

        // monster <-- --> movement
        if ('inc' == direction) { mon_x += 1; }
        else { mon_x -= 1; }
        
        // monster ^ v movement
        if('inc' == ydir) { mon_y += 1; }
        else { mon_y -= 1; }

        if (mon_x > ctx.canvas.width) { mon_x = 50; }


        if(breakout) { 
          clearInterval(interval);
          self.monsterService.catchMonster(this.monster.id); 

        }
      };

    }(), 1000/40);

    }

    // Prevent flicker by loading hammer once.
    var hammer = new Image();
    hammer.onload = function() {
      paintCanvas();
    }
    hammer.src = "assets/hammer.svg";
  }

  private getWidth(): string {
    return this.canvasWidth.toString() + "px";
  }

  private getHeight(): string {
    return this.canvasHeight.toString() + "px";
  }

  onDrag() {
    console.log('Hammer was dragged');
  }

  // For Dev Testing
  onTap(elm) {
    
    // throws and rotates hammer
    var hammer = document.getElementById(elm);
    hammer.className += " rotate";
    hammer.className += " throw";

    // Simple
    this.monsterService.catchMonster(this.monster.id); 

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
