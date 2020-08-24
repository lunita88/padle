// BraMi prokomentarisala :D

var kanvas = document.getElementById("tabla");
var tabla = kanvas.getContext("2d");
var leviscore = 0;
var desniscore = 0;
function reket(x,y,width,height) { //reket sablon
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.modifikatorBrz = 0;

 this.odbijanjeLopte = function(lopta) {
        var lijeviZidR = this.x;
        var desniZidR = this.x + this.width;
        var reketGoreZ = this.y;
        var reketDoleZ = this.y + this.height;
        if( lopta.x >= lijeviZidR 
            && lopta.x <= desniZidR 
            && lopta.y >= reketGoreZ
            && lopta.y <= reketDoleZ) {
                
                console.log("desni zid je "+ desniZidR);
                console.log("reket dole je "+ reketDoleZ);
            return true;
            
        }
        return false;
    };
    this.pokretReketa = function(keyCode) {
        var sledeciY = this.y;
        if( keyCode == 40) {
            sledeciY += 5;
            this.modifikatorBrz = 1.5;
        }
        else if (keyCode == 38) {
            sledeciY += -5;
            this.modifikatorBrz = 1.5;
        } 
        else {
            this.modifikatorBrz = 0;
        }
        sledeciY = sledeciY < 0 ? 0 : sledeciY;
        sledeciY = sledeciY + this.height > 480 ? 480 - this.height : sledeciY;
        this.y = sledeciY;
   
    };
}
//novi objekti
var igrac = new reket(5, 200,25, 100 ); //novi objekti
var komp = new reket(610, 200,25,100);
var lopta = {x:320, y:240, radius:7, xBrzina:2, yBrzina:0,

//odbacivanje lopte
            povratakX: function() {
                this.xBrzina *= -1;
            },
            povratakY: function() {
                this.yBrzina *= -1;
        },
        reset: function() {
            this.x = 320;
            this.y = 240;
            this.xBrzina = 2;
            this.yBrzina = 0;
        },
        skocnost: function() {
            return lopta.yBrzina != 0;
        },
        modifikovanaXbrzina: function(modifikacija) {
           modifikacija = this.xBrzina < 0 ? modifikacija * -1 : modifikacija;
           var sledecaVrednost = this.xBrzina + modifikacija;
           sledecaVrednost = Math.abs(sledecaVrednost) > 9 ? 9 : sledecaVrednost;
           this.xBrzina = sledecaVrednost;
        },
        modifikovanaYbrzina: function(modifikacija){
            modifikacija = this.yBrzina < 0 ? modifikacija * -1 : modifikacija;
            this.yBrzina += modifikacija;
        }
        
    };


function tik() {
    tokIgre();
    nacrtaj();
    window.setTimeout("tik()", 1000/60);
}
function tokIgre() {
    document.getElementById("desno").innerText = desniscore;
    document.getElementById("levo").innerText = leviscore;
    
    lopta.x += lopta.xBrzina;
    lopta.y += lopta.yBrzina;
    if(lopta.x < 0 ) {
        
        leviscore++;
        console.log("score desno je " + leviscore);
        
        lopta.reset();
    }
    else if(lopta.x > 640 ) {
        
         desniscore++;
         console.log("score levi je" + desniscore);
         
         score;
         lopta.reset();
     }
   
    if(lopta.y <= 0 || lopta.y >= 480) {
        
        lopta.povratakY();
    }

    var sudarSaIgracem = igrac.odbijanjeLopte(lopta);
    var sudarSaKomp = komp.odbijanjeLopte(lopta);

    if(sudarSaIgracem || sudarSaKomp) {
       lopta.povratakX();  
       lopta.modifikovanaXbrzina(0.25);
    var ubrzanje = sudarSaIgracem ? igrac.modifikatorBrz : komp.modifikatorBrz;
    lopta.modifikovanaYbrzina(ubrzanje);
}
for(var keyCode in drziDugme) {
    igrac.pokretReketa(keyCode);
}
var sredinaReketaKomp = komp.y + (komp.height / 2);
if( sredinaReketaKomp < lopta.y) {
    komp.pokretReketa(40);
}
if( sredinaReketaKomp > lopta.y) {
    komp.pokretReketa(38);
}
}
function nacrtaj() {
    tabla.fillStyle = "black";
    tabla.fillRect(0,0,640,480);
    nacrtajReket(igrac);
    nacrtajReket(komp);
    nacrtajLoptu(lopta);
    nacrtajMrezu();
}
function nacrtajReket(reket) {
    tabla.fillStyle = "#b3ffff";
    tabla.fillRect(reket.x, reket.y, reket.width, reket.height);
    //tabla.shadowBlur = 40;
    //tabla.shadowColor = "#ffcccc";
}
function nacrtajLoptu(lopta) {
    tabla.beginPath();
    tabla.arc(lopta.x, lopta.y,lopta.radius,0,2 * Math.PI, false);
    tabla.fillStyle = "yellow";
    tabla.fill();
   //tabla.shadowBlur = 40;
   // tabla.shadowColor = "white";
} 
function nacrtajMrezu() {
    for(let i = 0; i <= kanvas.height; i+= 15) {
        tabla.fillStyle = "white";
        tabla.fillRect(kanvas.width/2 -1, 0 + i, 5,10);
    
    }
}
var drziDugme = {};
window.addEventListener("keydown", function(keyInfo) { drziDugme[event.keyCode] = true;},
false);
window.addEventListener("keyup", function(keyInfo) {delete drziDugme[event.keyCode];}, false);

tik();
