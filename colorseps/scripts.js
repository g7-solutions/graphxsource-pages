let prev = $(".prev-btn");
let next = $(".next-btn");
let machine = $(".machine");
let slider = $(".slider");
let machineRotation = 0;
let imgArray = ['A', 'B', 'C', 'D', 'E', 'F'];

next.click(function () {
    $(".reveal-box").fadeTo(200, 0, function () {
        machineRotation += 120;
        machine.css({ 'transform': 'rotate(' + machineRotation + 'deg)' });
        arrayRotate(imgArray);
    }).fadeTo(500, 1);
});

prev.click(function () {
    $(".reveal-box").fadeTo(200, 0, function () {
        machineRotation -= 120;
        machine.css({ 'transform': 'rotate(' + machineRotation + 'deg)' });
        arrayRotate(imgArray, true);
    }).fadeTo(500, 1);
});

function arrayRotate(arr, reverse) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}

slider.on("input", function(){
    if(this.value <= 100){
        $(".reveal-box img:nth-child(4)").css({'clip-path': 'polygon(0 100%, 100% 100%, 100% ' + this.value + '%, 0%' + this.value + '%)'});
    }else if(this.value >= 100 && this.value <= 200){
        $(".reveal-box img:nth-child(3)").css({'clip-path': 'polygon(0 100%, 100% 100%, 100% ' + (this.value - 100) + '%, 0%' + (this.value - 100) + '%)'});
    }else if(this.value >= 200 && this.value <= 300){
        $(".reveal-box img:nth-child(2)").css({'clip-path': 'polygon(0 100%, 100% 100%, 100% ' + (this.value - 200) + '%, 0%' + (this.value - 200) + '%)'});
    }else if(this.value >= 301){
        $(".reveal-box img:nth-child(1)").css({'clip-path': 'polygon(0 100%, 100% 100%, 100% ' + (this.value - 300) + '%, 0%' + (this.value - 300) + '%)'});
    }
});