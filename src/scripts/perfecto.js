var img = document.querySelector('img[src="music/PERFECTO.png"]');
img.style.filter = "hue-rotate(147deg)";
img.style.opacity = "0";

var isRunning = false;
var timer_color, timer_color2;
var o = 0;

function perfecto() {

    if (isRunning) {
        clearInterval(timer_color);
        clearInterval(timer_color2);
    }
    isRunning = true;

    var img = document.querySelector('img[src="music/PERFECTO.png"]');
    var hue = Math.floor(Math.random() * 361); 
    img.style.filter = "hue-rotate("+hue+"deg)";
    o = 0.01;

    timer_color = setInterval(function() {
        if (o >= 1){
            clearInterval(timer_color);
            secondInterval();
        } else {
            img.style.opacity = o;
            o += 0.05;
        }
    }, 10);
}

function secondInterval() {
    timer_color2 = setInterval(function() {
        if (o <= 0){
            clearInterval(timer_color2);
            isRunning = false;
        } else {
            img.style.opacity = o;
            o -= 0.01;
        }
    }, 10);
}