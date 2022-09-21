let prev = $(".prev-btn");
let next = $(".next-btn");
let machine = $(".machine");
let oldValue = 0;
let newValue;
let imgArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

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
    arrayRotate(imgArray);
    $("#debug-left").text(imgArray[0]);
    $("#debug-center").text(imgArray[1]);
    $("#debug-right").text(imgArray[2]);
});

prev.click(function(){
    oldValue = machine.rotationInfo().deg;
    newValue = oldValue - 60;
    machine.css({ 'transform': 'rotate('+ newValue +'deg)'}, 1000);
    arrayRotate(imgArray, true);
    $("#debug-left").text(imgArray[0]);
    $("#debug-center").text(imgArray[1]);
    $("#debug-right").text(imgArray[2]);
});

$(".holder-right").click(function(){
    oldValue = machine.rotationInfo().deg;
    newValue = oldValue + 60;
    machine.css({ 'transform': 'rotate('+ newValue +'deg)'}, 1000);
    arrayRotate(imgArray);
    $("#debug-left").text(imgArray[0]);
    $("#debug-center").text(imgArray[1]);
    $("#debug-right").text(imgArray[2]);
});

function arrayRotate(arr, reverse){
    if(reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}