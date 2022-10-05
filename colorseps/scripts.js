let prev = $(".prev-btn");
let next = $(".next-btn");
let machine = $("#seps-machine");
let slider = $(".slider");
let machineRotation = 0;
let current = 0;

let seps = [
    { Name: "SEP-01", Count: 9 },
    { Name: "SEP-02", Count: 9 },
    { Name: "SEP-03", Count: 12 },
    { Name: "SEP-04", Count: 4 },
    { Name: "SEP-05", Count: 6 },
    { Name: "SEP-06", Count: 16 }
];

next.click(function () {
    machineRotation += 90;
    machine.css({ 'rotate': machineRotation + 'deg' });
    arrayRotate(seps);
    prepareRange();
    populateMachine();
});

prev.click(function () {
    machineRotation -= 90;
    machine.css({ 'rotate': machineRotation + 'deg' });
    arrayRotate(seps, true);
    prepareRange();
});

function prepareRange(){
    slider.attr("max", seps[0].Count - 1);
    slider.attr("value", 0);
}

function arrayRotate(arr, reverse) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}

function populateMachine(){
    for (i = 0; i < seps[0].Count; i++){
        $($("#arm-1 image")[i]).attr("href", "./img/");
    }
}

slider.on("input", function () {
    
});

//$("#arm-1 .img1").css({ "clip-path": "polygon(0 " + clip + "%, 100% " + clip + "%, 100% 100%, 0% 100%)" });