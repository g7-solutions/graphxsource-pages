//GALLERY OPENING/CLOSING, IMAGE LOAD

const gallery = document.querySelectorAll(".logo"),
  previewBox = document.querySelector(".preview-box"),
  mPreviewBox = document.querySelector(".mobile-preview-box"),
  mPreviewBefore = mPreviewBox.querySelector(".m-before img"),
  mPreviewAfter = mPreviewBox.querySelector(".m-after img"),
  previewBefore = previewBox.querySelector(".before img"),
  previewAfter = previewBox.querySelector(".after img"),
  closeIcon = previewBox.querySelector(".icon");

var mobileQuery = window.matchMedia('screen and (min-width: 320px) and (max-width: 46rem)');
var tabletQuery = window.matchMedia('screen and (max-width: 62rem) and (min-width: 46.1rem)');
var desktopQuery = window.matchMedia('screen and (max-width: 82rem) and (min-width: 62.1rem)');
var fullQuery = window.matchMedia('screen and (min-width: 82.1rem)');

function centerScroller() {
  let x = previewBox.offsetWidth / 2;
  let xM = mPreviewBox.offsetWidth / 2;
  scrollIt(x);
  scrollMobile(xM);
}

window.onload = () => {
  for (let i = 0; i < gallery.length; i++) {
    let newIndex = i;
    let clickedImgIndex;

    gallery[i].onclick = () => {
      clickedImgIndex = i;

      centerScroller();

      function preview() {
        let vectorImage = gallery[newIndex].querySelector("img").getAttribute("data-vector");
        let embroideryImage = gallery[newIndex].querySelector("img").getAttribute("data-embroidery");
        previewBefore.src = vectorImage;
        previewAfter.src = embroideryImage;
        mPreviewBefore.src = vectorImage;
        mPreviewAfter.src = embroideryImage;

        thisImg = previewBefore;
        getImageBrightness(previewBefore, function (thisImageID, brightness) {
          if (brightness < 128) {
            document.querySelector(".scroller").style.filter = "invert(1)";
            document.querySelector(".m-scroller").style.filter = "invert(1)";
            closeIcon.style.filter = "invert(0)";
          }
          else {
            document.querySelector(".scroller").style.filter = "invert(0)";
            document.querySelector(".m-scroller").style.filter = "invert(0)";
            closeIcon.style.filter = "invert(1)";
          }
        });
      }
      preview();

      previewBox.classList.add("show");
      previewBox.style.opacity = 1;
      closeIcon.onclick = () => {
        newIndex = clickedImgIndex;
        previewBox.classList.remove("show");
        previewBox.style.opacity = 0;
      }
    }
  }

  if(mobileQuery.matches || tabletQuery.matches ){
    gallery[0].click();
  } else return;
}

// SCROLLING FUNCTIONS FOR BEFORE & AFTER GALLERY
let active = false;

document.querySelector('.scroller').addEventListener('mousedown', function () {
  active = true;
  document.querySelector('.scroller').classList.add('scrolling');
});
document.querySelector('.m-scroller').addEventListener('mousedown', function () {
  active = true;
  document.querySelector('.m-scroller').classList.add('m-scrolling');
});

document.body.addEventListener('mouseup', function () {
  active = false;
  document.querySelector('.scroller').classList.remove('scrolling');
});
document.body.addEventListener('mouseleave', function () {
  active = false;
  document.querySelector('.scroller').classList.remove('scrolling');
});

document.body.addEventListener('mouseup', function () {
  active = false;
  document.querySelector('.m-scroller').classList.remove('m-scrolling');
});
document.body.addEventListener('mouseleave', function () {
  active = false;
  document.querySelector('.m-scroller').classList.remove('m-scrolling');
});

document.body.addEventListener('mousemove', function (e) {
  if (!active) return;
  let x = e.pageX;
  x -= document.querySelector('.preview-box').getBoundingClientRect().left;
  scrollIt(x);
  scrollMobile(x);
});

document.body.addEventListener('touchmove', function (e) {
  if (!active) return;
  const touch = e.touches[0];
  let x = touch.pageX;
  x -= document.querySelector('.mobile-preview-box').getBoundingClientRect().left;
  scrollMobile(x);
});

function scrollIt(x) {
  let transform = Math.max(0, (Math.min(x, document.querySelector('.preview-box').offsetWidth)));
  document.querySelector('.after').style.width = transform + "px";
  document.querySelector('.scroller').style.left = transform - 25 + "px";
}

function scrollMobile(x) {
  let transform = Math.max(0, (Math.min(x, document.querySelector('.mobile-preview-box').offsetWidth)));
  document.querySelector('.m-after').style.width = transform + "px";
  document.querySelector('.m-scroller').style.left = transform - 25 + "px";
}

scrollIt(0);
scrollMobile(0);

document.querySelector('.scroller').addEventListener('touchstart', function () {
  active = true;
  document.querySelector('.scroller').classList.add('scrolling');
});
document.body.addEventListener('touchend', function () {
  active = false;
  document.querySelector('.scroller').classList.remove('scrolling');
});
document.body.addEventListener('touchcancel', function () {
  active = false;
  document.querySelector('.scroller').classList.remove('scrolling');
});

document.querySelector('.m-scroller').addEventListener('touchstart', function () {
  active = true;
  document.querySelector('.m-scroller').classList.add('m-scrolling');
});
document.body.addEventListener('touchend', function () {
  active = false;
  document.querySelector('.m-scroller').classList.remove('m-scrolling');
});
document.body.addEventListener('touchcancel', function () {
  active = false;
  document.querySelector('.m-scroller').classList.remove('m-scrolling');
});


//IMAGE COLOR BRIGHTNESS EVALUATION


let thisImg;

function getImageBrightness(image, callback) {
  let thisImageID = image.getAttribute("id");
  let img = document.createElement("img");
  img.src = image.getAttribute("src");
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
  }
}

let buttonDiv = document.querySelector(".extra");
let sticky = buttonDiv.offsetTop;
function makeSticky() {
  if (window.scrollY >= sticky) {
    buttonDiv.classList.add("sticky");
  } else {
    buttonDiv.classList.remove("sticky");
  }
}
window.onscroll = function () {
  if (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth <= 688) {
    makeSticky();
  } else {
    buttonDiv.classList.remove("sticky");
  }
}

window.onresize = function () {
  centerScroller();
  mobileQuery.addEventListener('change', function (mq) {
    if (mq.matches) {
      if (previewBox.classList.contains("show")) {
        previewBox.classList.remove("show");
        previewBox.style.opacity = 0;
      }
    }
  });
  tabletQuery.addEventListener('change', function (mq) {
    if (mq.matches) {
      if (previewBox.classList.contains("show")) {
        previewBox.classList.remove("show");
        previewBox.style.opacity = 0;
      }
    }
  });
  desktopQuery.addEventListener('change', function (mq) {
    if (mq.matches) {
      if (mPreviewBox.display === "none") {
        mPreviewBox.display = "none";
      }
    }
  });
  fullQuery.addEventListener('change', function (mq) {
    if (mq.matches) {
      if (mPreviewBox.display === "none") {
        mPreviewBox.display = "none";
      }
    }
  });
}