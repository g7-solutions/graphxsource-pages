//#region Variables
let previewBox = $(".preview-box");
let gallery = $("#demo footer img");
let iBefore = $(".before img");
let iAfter = $(".after img");
let divAfter = $(".after");
let scroller = $(".scroller");
let active = false;
let current;
//#endregion

//#region Scroller Functions
function scrollIt(x) {
    let transform = Math.max(0, (Math.min(x, previewBox[0].offsetWidth)));
    scroller.css("left", (transform - 25) + "px");
    divAfter.css("width", transform + "px");
}

function centerScroller() {
    let x = previewBox[0].offsetWidth / 2;
    scrollIt(x);
}
//#endregion

//#region Event Handlers for Scroller
scroller.on("mousedown", function () {
    active = true;
    scroller.addClass('scrolling');
});

$("body").on("mouseup", function () {
    active = false;
    scroller.removeClass('scrolling');
});

$("body").on("mouseleave", function () {
    active = false;
    scroller.removeClass('scrolling');
});

$("body").on("mousemove", function (e) {
    if (!active) return;
    let x = e.pageX;
    x -= previewBox[0].getBoundingClientRect().left;
    scrollIt(x);
});

$("body").on("touchmove", function (e) {
    if (!active) return;
    const touch = e.touches[0];
    let x = touch.pageX;
    x -= previewBox[0].getBoundingClientRect().left;
    scrollIt(x);
});

$("body").on("touchend", function(){
    active = false;
    scroller.removeClass("scrolling");
});

$("body").on("touchcancel", function(){
    active = false;
    scroller.removeClass("scrolling");
});

$(".scroller").on("touchstart", function () {
    active = true;
    scroller.addClass("scrolling");
});

$(".scroller").on("touchend", function () {
    active = false;
    scroller.removeClass("scrolling");
});

$(".scroller").on("touchcancel", function () {
    active = false;
    scroller.removeClass("scrolling");
});
//#endregion

//#region Window On Load - Gallery Image Click Handler
$(window).on("load", function () {
    gallery.each(function (i) {
        $(this).click(function () {
            function preview() {
                let vector = $(gallery[i]).data('vector');
                let emb = $(gallery[i]).data("embroidery");

                previewBox.fadeTo("fast", 0, function(){
                    iBefore.attr("src", vector);
                    iAfter.attr("src", emb);
                }).fadeTo("fast", 1);
             

                $(gallery[current]).css("filter", "brightness(0.5)");
                current = i;
                $(gallery[current]).css("filter", "brightness(1)");

                getImageBrightness(iBefore, function (a, brightness) {
                    if (brightness < 128) scroller.css("filter", "invert(1)");
                    else scroller.css("filter", "invert(0)");
                });
            }
            preview();
            centerScroller();
        });
    });
    gallery[0].click();
});
//#endregion

//#region Gallery Next & Previous Buttons Handlers
let nextScroll = $("#demo main .next-icon");
let prevScroll = $("#demo main .prev-icon");
let galleryContainer = $("#demo footer .footer-wrapper");

nextScroll.click(function () {
    if (current !== 33) {
        $(gallery[current]).css("filter", "brightness(0.5)");
        gallery[current + 1].click();
        gallery[current + 1].scrollIntoView();
        $(gallery[current]).css("filter", "brightness(1)");
        return;
    }
});

prevScroll.click(function () {
    if (current !== 0) {
        $(gallery[current]).css("filter", "brightness(0.5)");
        gallery[current - 1].click();
        gallery[current - 1].scrollIntoView();
        $(gallery[current]).css("filter", "brightness(1)");
        return;
    }
});
//#endregion

document.querySelector(".footer-wrapper").addEventListener("wheel", (evt) => {
    evt.preventDefault();
    document.querySelector(".footer-wrapper").scrollLeft += evt.deltaY * 10;
});

$(".cta").click(function(){
    document.querySelector("#demo").scrollIntoView();
});

//#region Image Brightness Calculation
let thisImg;

function getImageBrightness(image, callback) {
    let thisImageID = image.attr("id");
    let img = document.createElement("img");
    img.src = image.attr("src");
    img.style.display = "none";
    document.body.appendChild(img);

    let colorSum = 0;
    img.onload = function () {
        //create canvas
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;
        let r, g, b, avg;

        for (let x = 0, length = data.length; x < length; x += 4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];

            avg = Math.floor((r + g + b) / 3);
            colorSum += avg;
        }

        let brightness = Math.floor(colorSum / (this.width * this.height));
        callback(thisImageID, brightness);
        document.body.removeChild(img);
    }
}
//#endregion