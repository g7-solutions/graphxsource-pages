//GALLERY OPENING/CLOSING, IMAGE LOAD

const gallery = document.querySelectorAll(".logo"),
  previewBox = document.querySelector(".preview-box"),
  mPreviewBox = document.querySelector(".mobile-preview-box"),
  mPreviewBefore = mPreviewBox.querySelector(".m-before img"),
  mPreviewAfter = mPreviewBox.querySelector(".m-after img"),
  previewBefore = previewBox.querySelector(".before img"),
  previewAfter = previewBox.querySelector(".after img"),
  closeIcon = previewBox.querySelector(".icon");

window.onload = () => {
  for (let i = 0; i < gallery.length; i++) {
    let newIndex = i;
    let clickedImgIndex;

    gallery[i].onclick = () => {
      clickedImgIndex = i;
      scrollIt(0);
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
      closeIcon.onclick = () => {
        newIndex = clickedImgIndex;
        previewBox.classList.remove("show");
      }
    }
  }
}

// SCROLLING FUNCTIONS FOR BEFORE & AFTER GALLERY

// Let's use the 'active' variable to let us know when we're using it
let active = false;

// First we'll have to set up our event listeners
// We want to watch for clicks on our scroller
document.querySelector('.scroller').addEventListener('mousedown', function () {
  console.log("A");
  active = true;
  // Add our scrolling class so the scroller has full opacity while active
  document.querySelector('.scroller').classList.add('scrolling');
});
document.querySelector('.m-scroller').addEventListener('mousedown', function () {
  console.log("A");
  active = true;
  // Add our scrolling class so the scroller has full opacity while active
  document.querySelector('.m-scroller').classList.add('m-scrolling');
});

// We also want to watch the body for changes to the state,
// like moving around and releasing the click
// so let's set up our event listeners
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


// Let's figure out where their mouse is at
document.body.addEventListener('mousemove', function (e) {
  if (!active) return;
  // Their mouse is here...
  let x = e.pageX;
  // but we want it relative to our wrapper
  x -= document.querySelector('.preview-box').getBoundingClientRect().left;
  x -= document.querySelector('.mobile-preview-box').getBoundingClientRect().left;
  // Okay let's change our state
  scrollIt(x);
});

document.body.addEventListener('touchmove', function (e) {
  if (!active) return;
  // Their mouse is here...
  let x = e.pageX;
  // but we want it relative to our wrapper
  x -= document.querySelector('.preview-box').getBoundingClientRect().left;
  x -= document.querySelector('.mobile-preview-box').getBoundingClientRect().left;
  // Okay let's change our state
  scrollIt(x);
});

// Let's use this function
function scrollIt(x) {
  let transform = Math.max(0, (Math.min(x, document.querySelector('.preview-box').offsetWidth)));
  let transformMobile = Math.max(0, (Math.min(x, document.querySelector('.mobile-preview-box').offsetWidth)));
  document.querySelector('.after').style.width = transform + "px";
  document.querySelector('.scroller').style.left = transform - 25 + "px";
  document.querySelector('.m-after').style.width = transform + "px";
  document.querySelector('.m-scroller').style.left = transform - 25 + "px";
}

// Let's set our opening state based off the width, 
// we don't want to show the image on its after state to lose the surprise.
scrollIt(0);

// And finally let's repeat the process for touch events
// first our middle scroller...
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