let prev = $(".prev-btn");
let next = $(".next-btn");
let machine = $(".machine");
let oldValue = 0;
let newValue;

$.fn.rotationInfo = function() {
    var el = $(this),
        tr = el.css("-webkit-transform") || el.css("-moz-transform") || el.css("-ms-transform") || el.css("-o-transform") || '',
        info = {rad: 0, deg: 0};
    if (tr = tr.match('matrix\\((.*)\\)')) {
        tr = tr[1].split(',');
        if(typeof tr[0] != 'undefined' && typeof tr[1] != 'undefined') {
            info.rad = Math.atan2(tr[1], tr[0]);
            info.deg = parseFloat((info.rad * 180 / Math.PI).toFixed(1));
        }
    }
    return info;
};

next.click(function(){
    oldValue = machine.rotationInfo().deg;
    newValue = oldValue + 60;
    machine.css({ 'transform': 'rotate('+ newValue +'deg)'}, 1000);
    console.log("rotated: " + newValue);
});

prev.click(function(){
    oldValue = machine.rotationInfo().deg;
    newValue = oldValue - 60;
    machine.css({ 'transform': 'rotate('+ newValue +'deg)'}, 1000);
    console.log("rotated: " + newValue);
});