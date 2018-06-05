console.log('(cc) Pavol Hejný');

function generateNoise(element) {
    if (!!!document.createElement('canvas').getContext) {
        return false;
    }
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        x,
        y,
        xp,
        yp,
        r,
        g,
        b;

    canvas.width = 150;
    canvas.height = 150;

    for (x = 0; x < canvas.width; x++) {
        for (y = 0; y < canvas.height; y++) {
            xp = x / canvas.width;
            yp = y / canvas.height;

            r = Math.random() > 0.5;

            r = r ? 0.06 : 0.12;
            //r = r ? 0.1 : 0.2;
            r = Math.floor(r * 255);
            g = r;
            b = r;

            ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
            ctx.fillRect(x, y, 1, 1);
        }
    }
    element.style.backgroundImage =
        'url(' + canvas.toDataURL('image/png') + ')';
}


for( const element of document.getElementsByClassName('generated-noise')){
    generateNoise(element);
}




const selectableElements = document.getElementsByClassName('selectable');
for( const element of selectableElements){

    element.addEventListener('mouseenter',()=>{
        for( const element of selectableElements){
            element.classList.remove('selected');
        }
        element.classList.add('selected');
    })
}
/*
$(function(){

    //$('.card').draggable();
})
*/