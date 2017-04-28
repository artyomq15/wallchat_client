'use strict';

var img = document.getElementById("left_news");
var isVisible = false;
var startPoint={};
var nowPoint;
var ldelay;
document.addEventListener('touchstart', function(event) {
event.preventDefault();
event.stopPropagation();
startPoint.x=event.changedTouches[0].pageX;
startPoint.y=event.changedTouches[0].pageY;
ldelay=new Date(); 
}, false);
/*Ловим движение пальцем*/
document.addEventListener('touchmove', function(event) {
event.preventDefault();
event.stopPropagation();
var otk={};
nowPoint=event.changedTouches[0];
otk.x=nowPoint.pageX-startPoint.x;
/*Обработайте данные*/
console.log(otk.x);


/*Для примера*/
if(Math.abs(otk.x)>100){
    if(otk.x<0 && isVisible==true){
        img.style.background = '#fff';
        isVisible = false;
        img.style.left = 100+'%';

             
    }
    if(otk.x>0 && isVisible==false){
        img.style.background = '#fff'; 
        isVisible = true; 
        img.style.left = 0;
    }
    startPoint={x:nowPoint.pageX,y:nowPoint.pageY};


} 
else{
    if(otk.x<0 && isVisible==true){
        img.style.left = otk.x+'%'; 
         
    }
    if(otk.x>0 && isVisible == false){
        img.style.left =-100 + otk.x+'%'; 
    }
}
}, false);
/*Ловим отпускание пальца*/
document.addEventListener('touchend', function(event) {
var pdelay=new Date(); 
nowPoint=event.changedTouches[0];
var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
if ((xAbs > 20 || yAbs > 20) && (pdelay.getTime()-ldelay.getTime())<200) {
if (xAbs > yAbs) {
if (nowPoint.pageX < startPoint.x){/*СВАЙП ВЛЕВО*/}
else{/*СВАЙП ВПРАВО*/}
}
else {
if (nowPoint.pageY < startPoint.y){/*СВАЙП ВВЕРХ*/}
else{/*СВАЙП ВНИЗ*/}
}
}
}, false);

