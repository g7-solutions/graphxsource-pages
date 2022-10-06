let prev = $(".prev-btn");
let next = $(".next-btn");
let machine = $("#seps-machine");
let slider = $(".slider");
let machineRotation = 0;
let current = 1;

let seps = [
    { Name: "shark", Count: 9 },
    { Name: "fest", Count: 9 },
    { Name: "eren", Count: 12 },
    { Name: "grim", Count: 4 },
    { Name: "cars", Count: 10 }
];

next.click(function () {
    machineRotation += 90;
    machine.css({ 'rotate': machineRotation + 'deg' });
    arrayRotate(seps);
    prepareRange();
    populateMachine(seps[0], current);
});

prev.click(function () {
    machineRotation -= 90;
    machine.css({ 'rotate': machineRotation + 'deg' });
    prepareRange();
    arrayRotate(seps, true);
    populateMachine(seps[0], current);
});

function prepareRange() {
    slider.attr("max", seps[0].Count);
    slider.val(1);
    slider.trigger('input');
}

function arrayRotate(arr, reverse) {
    if (reverse) {
        arr.unshift(arr.pop());
        current = current == 1 ? 4 : current -= 1;
    }
    else {
        arr.push(arr.shift());
        current = current == 4 ? 1 : current += 1;
    }
    return arr;
}

function populateMachine(separations, armIndex) {
    let n = separations.Count + 1;
    let arm = "#arm-" + armIndex + " image";
    for (i = 0; i < separations.Count; i++) {
        n--;
        let href = "./img/" + separations.Name + "/" + separations.Name + "-" + (n) + ".png";
        $($(arm)[i + (12 - separations.Count)]).attr("href", href)
            .attr("data-status", "inactive");
    }
}

$(document).ready(function () {
    prepareRange();
    populateMachine(seps[0], 1);
});

let oldValue = Number(1);
slider.on("input", function () {
    // console.log("----------------------");
    // console.log("Old Value: " + oldVal);
    let newValue = Number(slider.val());
    if (newValue >= oldValue) {
        let obj = "#arm-" + current + " .img" + (newValue - 1);
        $(obj).attr("data-status", "active");
    }
    else {
        let obj = "#arm-" + current + " .img" + (newValue);
        $(obj).attr("data-status", "inactive");
    }
    oldValue = newValue;

    // console.log("New Value: " + val);
    // console.log("----------------------");
});