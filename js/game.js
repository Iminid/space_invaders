
$(document).ready(function() {
    $('#v-header container').show();
    $('#mycanvas').hide(); //Hide the canvas
    $('#result').hide();
    $('h1').fadeIn(5000);
    $('.myname').fadeIn(5000);
    $('#logo').slideDown(3000);
    
    $('.myname').animate({
        top: '-=50',
    }, 2000, function(){
        
    });
    $('#logo').hover(function(){
       $(this).toggleClass('rot'); 
    });

    //Demarrer le jeu//
    $('#button').click(function(){
        let author = $('#inputRegex').val();
        univers.play();
        if (/[< !?./,;:=+%ù£``$^¨>.{1,24}$]/.test(author) || author === ""){
            $('#check').text('Choisissez un autre Pseudo !!!');
        }else{
            game.start();
            $('header').fadeOut(1000);
            $('#mycanvas').show(500);
                $('#button-r').click(function(){
                    $('#result').hide();
                    //$('#all-result').show();
                });
        }
    });
    
});

var univers = document.getElementById('univers');
var blind = document.getElementById('blind');
var musica = document.getElementById('musica');

const KEYS = {
    RIGHT: 68,
    LEFT: 81,
    SPACE: 32,
    PAUSE: 80,
    ENTER: 13,
};

let game = {/* <== Objet*/
    velocity: 6,
    ctx: null,
    ship: null,
    rocket: [],
    aliens: [],
    explosion : null,
    shoot: [],
    rows: 3,
    cols: 8,
    score: 0,
    width: 1200,
    height: 800,
    sounds: {
        explosion: null,
        launch: null,
    },
    sprites: {
        background: null,
        rocket: null,
        ship: null,
        alien: null,
        explosion: null
    },
    //timer: 0,
    minutes: 0,
    seconds: 0,
    milisec: 0,
    startTime: false,
    //zero: 0,
    paused: false,
    startAliens: true,
    stopChrono: 0,

    
    
    pauseGame(){
        game.paused = !game.paused;
        if (!game.paused) game.run();
        
    },
    
    
    gameChrono(){
        //game.pauseGame();
        if (this.startTime === true){
            this.startChrono();
        }
    },
    //Chrono
    startChrono(){
        
        if (!this.paused){
            this.milisec++;
        if (this.milisec >= 100){
            this.seconds++;
            this.milisec = 0;
        }
        if (this.seconds >=60){
            this.minutes++;
            this.seconds = 0;
        }else if (this.seconds > 10){
            
        }
        }
        
        
    },

    init() {
        // Initialisation
        this.ctx = document.getElementById('mycanvas').getContext('2d');
        this.setEvent();
        this.setTextFont();
    },
    //Events
    setEvent(){
        window.addEventListener('keydown', e => {
            if (e.keyCode === KEYS.SPACE){
                this.rocket.start();
                //this.startTime = true;
            }else if (e.keyCode === KEYS.LEFT || e.keyCode ===KEYS.RIGHT){
                this.ship.startmove(e.keyCode);
                //this.startTime = true;
            }else if (e.keyCode === KEYS.PAUSE){
                game.paused = true;
                console.log('Pause');
                $('#pause').fadeIn(1000);
            }else if(e.keyCode === KEYS.ENTER){
                game.paused = false;
                console.log('Unpaused');
                $('#pause').fadeOut(1000);
                this.run();
            }
        });
        window.addEventListener('keyup', e => {
            this.ship.stop();
        });
        
        
    },
    //Text decoration
    setTextFont(){
        this.ctx.fillStyle = '#ffc433';
        this.ctx.font = '30px amatic_scregular';
    },
    
    preload(callback) {
        // Preload
        let loaded = 0;
        let required = Object.keys(this.sprites).length;
        required += Object.keys(this.sounds).length;
        
        let onLoad = () => {
                ++loaded;
                
                if (loaded >= required){
                    callback ();
                }
            };
        this.preloadAudio(onLoad);
        this.preloadSprites(onLoad);
    },
    //Audio preload
    preloadAudio(onLoad){
        for(let key in this.sounds){
            this.sounds[key] = new Audio('sounds/' + key + '.wav');
            this.sounds[key].addEventListener('canplaythrough', onLoad, {once: true} );
        }
    },
    //Sprites preload
    preloadSprites(onLoad){
        for(let key in this.sprites){
            this.sprites[key] = new Image();
            this.sprites[key].src = 'img/' + key + '.png';
            this.sprites[key].addEventListener('load', onLoad );
        }
    },

    
    //Push Aliens
    create(){
        for (let row = 0; row < this.rows; row++){
            for (let col = 0; col < this.cols; col++){
                this.aliens.push({
                    on: true,
                    
                    width: 60,
                    height: 60,
                    
                    x: 110 * col + 175,
                    y: 90 * row + 30
                });
            }
        }
    },
    
    
    //Update
    update(){
        this.ship.move();
        this.rocket.move();
        this.rocket.collideWorldBounds();
        this.ship.collideWorldBounds();
        this.collision();
        this.moveAliens();
        /*this.infrocket();*/
        this.collisionShip();
        this.collideBottom();
        /*this.moveRocket();*/
        //this.timer();
        //this.chrono();
        this.gameChrono();
        //this.inputRegex();
        
    },
    
   
    
    collideBottom(){
        /*let height = 90;
        let dy = 60;
        /*let x = this.aliens.x + this.aliens.dx;*/
        let y = aliens.y + aliens.dy;
        
        let alienTop = y;
        let alienBottom = alienTop + 60;
        let worldBottom = -game.height;
        
        if(alienBottom > worldBottom){
            console.log('Bottom Hit');
           this.alien.y = 800;
        }
        
        
    },
    
    //Collision alien - rocket
    collision(){
        for (let alien of this.aliens){
            if(alien.on){ 
               if (this.rocket.col(alien)){
                this.rocket.boumRocket(alien);
                this.addScore();
                this.sounds.explosion.play();
                /*game.explosion.start();*/
                console.log('Hit');

                }  
            } 
        }
    },
    //Game Over function
    gameOver(){
        univers.pause();
        this.startTime = false;
        $('#check2').text('Les aliens passent et envahissent votre planète !!!');
        $('#result').show();
                $('#mycanvas').hide();
                game.paused = true;
        
                let author = $('#inputRegex').val();
                finalChrono = this.minutes + ':' + this.seconds + ':' + this.milisec;   
                   
                $('#playerName').text('Pseudo : ' + author);
                $('#playerScore').text('Score : ' + this.score * 10);
                $('#playerChrono').text('Chrono : ' + finalChrono);   
            
        
                $.ajax({
                url : "insert.php",
                type : "post",
                data: {"pseudo" : author, "score" : game.score * 10, "chrono": finalChrono}, 
                success: function(response){
                    
                    
                    /*$.ajax({
        url: 'database.php',
        type: 'GET',
        data: {
            'pseudo': author, 'score': game.score, 'chrono': finalChrono
        },
        success: function (response){
            console.log('Ca marche');
            /*document.getElementById('pseudoResult').innerHTML = ;
            document.getElementById('scoreResult').innerHTML = game.score; 
            document.getElementById('timeResult').innerHTML = finalChrono; */
        
            
            /*for (var i = 0; i < response.length; i++){
                
                var result = '';
                result += response[i].pseudo;
                document.getElementById('pseudoResult').innerHTML += "<br>"+result;
                
                result = '';
                result += response[i].score;
                document.getElementById('scoreResult').innerHTML += "<br>"+result;
                
                result = '';
                result += response[i].chrono;
                document.getElementById('timeResult').innerHTML += "<br>"+result;
            } 
        },
        error: function(){
            console.log('Error Ajax');
        }
    });*/
           blind.play(); 
        },
    });
    },
    //Collision aliens - ship
    collisionShip(){
        for (let alien of this.aliens){
            if(alien.on){ 
               if (this.ship.col(alien)){
                /*this.rocket.boumRocket(alien);*/  //Ajouter un son
                //this.sounds.explosion.play();
                /*game.explosion.start();*/
                //this.endgame('Vous avez perdu !!!' + this.score*10);
                this.gameOver();
                }  
            } 
        }
    },
    
    // Win condition
    addScore(){
        ++this.score;
        if(this.score >= this.aliens.length){
            //this.endgame('Vous avez gagné !!!');
            //End game
            $('#check2').hide();
            $('#check3').text('Vous avez reussi à sauver votre planète !!!');
            this.gameOver();
        }
    },
    
    
    
    
    //Run function
    run() {
         //Run
        if (game.paused == false){
            window.requestAnimationFrame(() => {
            this.update();
            this.render();
            this.run();
            //this.timer();
        });
        }
        
        
    },
    //Images rendering
    render(){
         //Render
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(this.sprites.rocket, this.rocket.frame * this.rocket.width, 0, this.rocket.width, this.rocket.height, this.rocket.x, this.rocket.y, this.rocket.width, this.rocket.height );
        this.ctx.drawImage(this.sprites.ship, this.ship.x, this.ship.y);
        this.ctx.drawImage(this.sprites.explosion, this.explosion.frame * this.explosion.width, 0, this.explosion.width, this.explosion.height, this.explosion.x, this.explosion.y, this.explosion.width, this.explosion.height);
        this.renderAliens();
        this.ctx.fillText('Score: ' + this.score * 10, 30, 30);
        this.ctx.fillText('Timer: ' + this.minutes + ':' /*+ this.zero*/ + this.seconds + ':' + this.milisec , 1050, 30);
        
    },
    
    //Draw aliens
    renderAliens(){
        for (let alien of this.aliens){
            if (alien.on){
                this.ctx.drawImage(this.sprites.alien, alien.x, alien.y, 60, 60);
                }
        }
    },
    //Move aliens
    moveAliens(){
        this.startTime = true;
            aliens = this.aliens;
        for (let i = 0; i < aliens.length; i++){
            if(this.startAliens === true){
                //aliens[i].y = aliens[i].y  + 0.2 ;
                aliens[i].y = aliens[i].y  + 0.5 ;

                
            } 
      }     
    },
     
     
    //Start function
    start: function(){  /* <== Methode*/
        this.init();
        this.preload(() => {
            this.create();
            this.run();
        });

    },
    endgame(message){
        this.running = false;
        alert(message);
        window.location.reload();
    }
    
};

//Ship
game.ship = {
    x: 560, 
    y: 690/*670*/,
    velocity: 6,
    dx: 0,
    width: 93,
    height: 56,
    rocket: game.rocket,
    
    startmove(dir){
        if (dir === KEYS.LEFT){
            this.dx = -this.velocity;
        }else if (dir === KEYS.RIGHT){
            this.dx = this.velocity;
        }
             
        
    },

    
    stop(){
        this.dx = 0;  
    },
    move(){
       //if (this.dx){
                this.x += this.dx;
                game.rocket.x = this.x + 17/*35*/;
            
                /*if(game.rocket.x = this.x + 35){
                    game.rocket.x;
                }*/
                
                /*if (this.x += this.dx){
                    game.rocket.x = this.x + 35;
                }else if(game.rocket.y < this.dy){
                    game.rocket.x = !this.x;
                }*/
                
                /*if(game.rocket.y > this.y){
                    game.rocket.x;
                }*/
                /*if (game.rocket.start) {
                game.rocket.x = game.rocket.x + 35;
            }*/
                
            //}  
    },
    
    col(element){
        let x = this.x + this.dx;
        let y = this.y + this.dy;
        
        if (this.x + this.width > element.x && 
         this.x < element.x + element.width &&
         this.y + this.height > element.y &&
        this.y < element.y + element.height){
            return true;
        }
       return false;
    },    
    
    collideWorldBounds() {
        let x = this.x + this.dx;
        

        let shipLeft = x;
        let shipRight = shipLeft + this.width;
       

        let worldLeft = 0;
        let worldRight = game.width;
        

        if (shipLeft < worldLeft) {
            this.x = 0;
            console.log('HIT LEFT');
        }else if (shipRight > worldRight){
            this.x = 1107;
            console.log('HIT RIGHT');
        }
    }
};

//Rocket
game.rocket = {
    x: 600,
    y: 680,
    width: 64/*12*/,
    height: 64/*49*/,
    velocity: 3,
    dy : 0,
    active : true,
    frame: 0,
    start(){
        this.dy = this.velocity;
        rocket = game.rocket;
        this.x = game.ship.x + 20;
        
    //this.rocket.push({x: game.ship.x +20, y: game.ship.y +20});
        //this.x = game.ship.x + 40;
        
        //for (let i = 0; i <rocket.length; i++){
            //rocket[i].y = rocket[i].y;
            //this[i].y = this[i].velocity;
        //}
        //game.this.rocket.push(this.rocket);
        
        /*for (let i = 0; i < game.rocket.length; i++){
            this.rocket[i].push({x: game.ship.x +20, y: game.ship.y +20});
            
        }*/
        
        /*var rocket = new this.Rocket(game.rocket.x, game.rocket.y, 1, 1000);
    this.rockets.push(rocket);*/
        
        this.animate();
        console.log('Fire');
        game.sounds.launch.play();
    },
    
    animate(){
         setInterval(() => {
            ++this.frame;
            if (this.frame > /*15*/60){
                this.frame = 0;
            }
        }, 100);
    },
    
    
    move(){
        //if (this.dy){
            //rocket = game.rocket;
            //this.y -= this.dy;
            //++this.y;
            //for (let i = 0; i < game.rocket.length; i++){
               /*rocket[i].y -= rocket[i].dy;*/
                //++this.y;
        //}
            
        //}
        
        /*if (this.dy){
            for (let i = 0; i <rocket.length; i++){
            /*rocket[i].y = rocket[i].y - 2;
            this[i].y = this[i].velocity;
        }
        }*/
        /*rocket = game.rocket;
        for (let rocket = 0; rocket < 10; rocket++){
                this.y -= this.dy;
            
        }
        
        /*var qte = [];
        for(var i = 0; i < game.rocket.length; i ++){
            if(rocket[i].dy){
                this.y -= this.dy;
                qte++;
            }
            this.y -= this.dy;
        }
        
       return qte;*/
        this.x = this.x;
        this.y -= this.dy;
        
        
        
        
              
    },
    col(element){
        let x = this.x + this.dx;
        let y = this.y + this.dy;
        
        if (this.x + this.width > element.x && 
         this.x < element.x + element.width &&
         this.y + this.height > element.y &&
        this.y < element.y + element.height){
            return true;
        }
       return false;
        
    },
    boumRocket(alien){
        this.dy *= -1;
        alien.on = false;
        game.explosion.start(); 
    },
    collideWorldBounds(){
        let x = this.x + this.dx;
        let y = this.y + this.dy;
        
        let rocketTop = y;
        let rocketBottom = rocketTop + this.height;
        
        let worldLeft = 0;
        let worldRight = game.width;
        let worldTop = 0;
        let worldBottom = game.height;
        
        if (rocketTop < worldTop){
            console.log('Collision Top');
            game.gameOver();
            /*this.y = 0;*/
            /*this.dy = -this.velocity;*/
            rocket.active = false;
            
        }else if(rocketBottom > worldBottom){
            console.log('Collision Bottom');
            game.gameOver();
        }
    },
};
//Explosions
game.explosion = {
    /*x: 100,
    y: 200,*/
    width: 59,
    height: 59,
    frame: 0,
    active: false,
    start(){
        setInterval(() => {
            ++this.frame;
            if (this.frame >= 30){
                this.frame.active = true;
            }
        }, 50);
    }
};





