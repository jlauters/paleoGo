import { Component, Input, ElementRef, ViewChild, NgZone} from '@angular/core';
import { App, NavController, Platform, NavParams, ViewController} from 'ionic-angular';
import { MonsterService } from './monsters.service';
import { SuccessPage } from'./success.component';

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
    private params: NavParams,
    public viewCtrl: ViewController,
    public appCtrl: App,
    private monsterService: MonsterService
  ) {

    this.monsters = this.monsterService.getMonsters();

    var m_id = 0;
    if(params.get('monsterId')) {
      m_id = params.get('monsterId');
    }

    for(var i = 0; i < this.monsters.length; i++) {
      if (this.monsters[i].id === m_id) {
        this.monster = this.monsters[i];
      }
    }  

  }

  // Pass two objects ( coords{x:0, y:0, h:10, w:10} )
  // Return if collided or not
  public detectCollisions(obj_1, obj_2) {

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
    var isDragging = false;

    // init canvas
    ctx.canvas.width = ( window.innerWidth * 0.9 );
    ctx.canvas.height = ( window.innerHeight * 0.75 );
    
    var hammer = {
      x: 140,
      y: 445.5,
      h: 40,
      w: 40,
      speed: 2,
    
      ox: 140,
      oy: 445.5,
      dx: 140,
      dy: 445.5,

      vector: {
        len: 0,
        normX: 0,
        normY: 0,
        normProof: 0,
        dotProd: 0
      }
    };

    var monster_img = new Image();
    monster_img.src = this.monster.icon;

    var monster = {
      x: 120,
      y: 10,
      img: monster_img
    };

    // Starting position for our monster
    ctx.drawImage(monster.img, monster.x, monster.y, monster.img.width, monster.img.height);
    rects.push({x: monster.x, y: monster.y, w: monster.img.width, h: monster.img.height});

    // Get Mouse Position on click
    ctx.canvas.addEventListener('mousedown', function(e) {
      console.log('in mousedown event listener');

      var rect = ctx.canvas.getBoundingClientRect();
      var mouse_x = (e.clientX - rect.left);
      var mouse_y = (e.clientY - rect.top);

      var collided = false;
      collided = self.detectCollisions(rects[1], {x: mouse_x, y: mouse_y, h:0, w:0});

      if(collided) {
         isDragging = true;
         hammer.ox = hammer.x;
         hammer.oy = hammer.y;
      }
    })

    ctx.canvas.addEventListener('mousemove', function(e) {
      if(isDragging) {

        var rect = ctx.canvas.getBoundingClientRect();
        var mouse_x = (e.clientX - rect.left);
        var mouse_y = (e.clientY - rect.top);

        hammer.x = mouse_x;
        hammer.y = mouse_y;

      }
    })


    ctx.canvas.addEventListener('mouseup', function(e) {
      console.log('in mouseup event listener');
   
      isDragging = false;

      var rect = ctx.canvas.getBoundingClientRect();
      var mouse_x = (e.clientX - rect.left);
      var mouse_y = (e.clientY - rect.top);
      
      // Set destination coords
      hammer.dx = mouse_x;
      hammer.dy = mouse_y;
    
      hammer.speed = 2;

      // Get "drag" vector
      hammer.vector = doVector(hammer.ox, hammer.oy, hammer.dx, hammer.dy);

    })

    var doVector = function(ox, oy, dx, dy) {
      var diffX = (dx - ox);
      var diffY = -1 * (dy - oy);

      var length = Math.sqrt(diffX*diffX + diffY*diffY);
      var normX = diffX/length;
      var normY = diffY/length;

      var normProof = (normX*normX + normY*normY);
      var dotProd = (ox*dx) + (oy*dy);

      return {
        len: length,
        normX: normX,
        normY: normY,
        normProof: normProof,
        dotProd: dotProd
      }
    }

    // Check if Hammer and Canvas boundary collide
    var checkBoundary = function(hammer) {

      console.log('in checkBoundary');

      // Right Side
      if(hammer.x >= ( ctx.canvas.width - hammer.w )) {
        console.log('hammer hit right side');
        hammer.x = ( ctx.canvas.width - hammer.w );
        hammer.vector.normX = -hammer.vector.normX;
      } else if(hammer.x <= hammer.w) {
        // Left Side

        console.log('hammer hit left side');

        hammer.x = hammer.w;
        hammer.vector.normX = -hammer.vector.normX;
      } else if(hammer.y >= ( ctx.canvas.height - hammer.h )) {
        // Bottom Side

        console.log('hammer hit bottom side');

        hammer.y = ( ctx.canvas.height - hammer.h );
        hammer.vector.normY = -hammer.vector.normY
      } else if(hammer.y <= hammer.h) {
        // Top Side


        // -- RESET Hammer
        console.log('hammer went out the top');

        hammer.x = 140;
        hammer.y = 445.5;
        hammer.speed = 0;


     }

    }

    // Add elements to our canvas every iteration
    var paintCanvas = function() {

     var interval = setInterval(function() {

      var breakout = false;
      var direction = 'inc';
      var ydir = 'inc';

      return function() {
        rects = Array()
        ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

        // paint monster
        ctx.drawImage(monster.img, monster.x, monster.y);
        rects.push({x: monster.x, y: monster.y, w: monster.img.width, h: monster.img.height});

        if(hammer.speed) {
          hammer.x += hammer.vector.normX * hammer.speed;
          hammer.y += -1 * (hammer.vector.normY * hammer.speed);
        }

        checkBoundary(hammer);

        // paint hammer
        ctx.drawImage(hammer_img, hammer.x, hammer.y, hammer.h, hammer.w);
        rects.push({x: hammer.x, y: hammer.y, h: hammer.h, w: hammer.w});

        if(rects.length > 1)  {

          var collided = self.detectCollisions(rects[0],rects[1]);  
          if(collided) {
            breakout = true;
          }

        }

        // movement logic 
        if (monster.x >= ( ctx.canvas.width * 0.75)) { direction = 'dec'; }
        if (monster.x <= ( ctx.canvas.width * 0.25)) { direction = 'inc'; }

        if (monster.y >= 30) { ydir = 'dec'; }
        if (monster.y <= 10) { ydir = 'inc'; }

        // monster <-- --> movement
        if ('inc' == direction) { monster.x += 1; }
        else { monster.x -= 1; }
        
        // monster ^ v movement
        if('inc' == ydir) { monster.y += 1; }
        else { monster.y -= 1; }

        if (monster.x > ctx.canvas.width) { monster.x = 50; }


        if(breakout) { 
          clearInterval(interval);
          self.monsterService.catchMonster(self.monster.id); 

          // TODO: Show Catch Success screen content
          // Then on Dismiss do the rootNav push

          self.appCtrl.getRootNav().push(SuccessPage, {"monsterId": self.monster.id});
        }
      };

    }(), 1000/40);

    }

    // Prevent flicker by loading hammer once.
    var hammer_img = new Image();
    hammer_img.onload = function() {
      paintCanvas();
    }
    hammer_img.src = "assets/hammer.svg";
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
    //var hammer = document.getElementById(elm);
    //hammer.className += " rotate";
    //hammer.className += " throw";

    // Simple
    this.monsterService.catchMonster(this.monster.id); 

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
