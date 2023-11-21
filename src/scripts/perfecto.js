var img = document.querySelector('img[src="music/PERFECTO.png"]');

img.style.opacity = "0";

async function perfecto() {
    var img = document.querySelector('img[src="music/PERFECTO.png"]');
    var o = 0;
    var timer = setInterval(function() {
        if (o >= 1){
            clearInterval(timer);
        } else {
            img.style.opacity = o;
            o += 0.05;
        }
    }, 10);
    var timer2 = setInterval(function() {
        if (o <= 0){
            clearInterval(timer2);
        } else {
            img.style.opacity = o;
            o -= 0.01;
        }
    }, 10);
}