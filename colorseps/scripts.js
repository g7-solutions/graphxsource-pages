let prev = $(".prev-btn");
let next = $(".next-btn");
let machine = $("#seps-machine");
let slider = $(".slider");
let machineRotation = 0;
let imgArray = ['A', 'B', 'C', 'D', 'E', 'F'];
let seps = [
    { Name: "SEP-01", Dir: "./img/Shark" },
    { Name: "SEP-02", Dir: "./img/Tiger" },
    { Name: "SEP-03", Dir: "./img/Mouse" },
    { Name: "SEP-04", Dir: "./img/Shark" },
    { Name: "SEP-05", Dir: "./img/Shark" },
    { Name: "SEP-06", Dir: "./img/Shark" }
];

next.click(function () {
    machineRotation += 90;
    machine.css({ 'rotate': machineRotation + 'deg' });
    arrayRotate(imgArray);
    console.log(seps[0].Name + " - " + seps[0].Dir);
});

prev.click(function () {
    machineRotation -= 90;
    machine.css({ 'rotate': machineRotation + 'deg' });
    arrayRotate(imgArray, true);
});

function arrayRotate(arr, reverse) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}

slider.on("input", function () {
    let clip;
    if (this.value <= 100) {
        clip = this.value;
        $("#arm-1 .img1").css({ "clip-path": "polygon(0 " + clip + "%, 100% " + clip + "%, 100% 100%, 0% 100%)" });
    } else if (this.value >= 100 && this.value <= 200) {
        clip = this.value - 100;
        $("#arm-1 .img2").css({ "clip-path": "polygon(0 " + clip + "%, 100% " + clip + "%, 100% 100%, 0% 100%)" });
    } else if (this.value >= 200 && this.value <= 300) {
        clip = this.value - 200;
        $("#arm-1 .img3").css({ "clip-path": "polygon(0 " + clip + "%, 100% " + clip + "%, 100% 100%, 0% 100%)" });
    } else if (this.value >= 300 && this.value <= 400) {
        clip = this.value - 300;
        $("#arm-1 .img4").css({ "clip-path": "polygon(0 " + clip + "%, 100% " + clip + "%, 100% 100%, 0% 100%)" });
    } else if (this.value >= 400 && this.value <= 500) {
        clip = this.value - 400;
        $("#arm-1 .img5").css({ "clip-path": "polygon(0 " + clip + "%, 100% " + clip + "%, 100% 100%, 0% 100%)" });
    } else if (this.value >= 500 && this.value <= 600) {
        clip = this.value - 500;
        $("#arm-1 .img6").css({ "clip-path": "polygon(0 " + clip + "%, 100% " + clip + "%, 100% 100%, 0% 100%)" });
    } else if (this.value >= 600 && this.value <= 700) {
        clip = this.value - 600;
        $("#arm-1 .img7").css({ "clip-path": "polygon(0 " + clip + "%, 100% " + clip + "%, 100% 100%, 0% 100%)" });
    } else if (this.value >= 700 && this.value <= 801) {
        clip = this.value - 700;
        $("#arm-1 .img8").css({ "clip-path": "polygon(0 " + clip + "%, 100% " + clip + "%, 100% 100%, 0% 100%)" });
    }
});