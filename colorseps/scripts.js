let prev = $(".prev-btn");
let next = $(".next-btn");
let machine = $(".machine");
let machineRotation = 0;
let imgArray = ['A', 'B', 'C', 'D', 'E', 'F'];

/*
$.fn.rotationInfo = function() {
    var el = $(this),
        tr = el.css("rotate") || el.css("-webkit-transform") || el.css("-moz-transform") || el.css("-ms-transform") || el.css("-o-transform"),
        info = {rad: 0, deg: 0};
    if (tr = tr.match('matrix\\((.*)\\)')) {
        tr = tr[1].split(',');
        if(typeof tr[0] != 'undefined' && typeof tr[1] != 'undefined') {
            info.rad = Math.atan2(tr[1], tr[0]);
            info.deg = parseFloat((info.rad * 180 / Math.PI).toFixed(1));
        }
    }
    return info;
};*/

next.click(function(){
    machineRotation += 60;
    machine.css({'transform': 'rotate(' + machineRotation + 'deg)'});
    arrayRotate(imgArray);
    $("#debug-left").text(imgArray[0]);
    $("#debug-center").text(imgArray[1]);
    $("#debug-right").text(imgArray[2]);
    console.log(machineRotation);
});

prev.click(function(){
    machineRotation -= 60;
    machine.css({'transform': 'rotate(' + machineRotation + 'deg)'});
    arrayRotate(imgArray, true);
    $("#debug-left").text(imgArray[0]);
    $("#debug-center").text(imgArray[1]);
    $("#debug-right").text(imgArray[2]);
    console.log(machineRotation);
});

function arrayRotate(arr, reverse){
    if(reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}