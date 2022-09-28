let prev = $(".prev-btn");
let next = $(".next-btn");
let machine = $(".machine");
let machineRotation = 0;
let imgArray = ['A', 'B', 'C', 'D', 'E', 'F'];


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