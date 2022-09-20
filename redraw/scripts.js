let selector = document.getElementById('process-selector');
let final = 1;
let oldValue = 1;
$("#process-selector").on('input', function () {
    var imgArray = [{
        Val: 1,
        Url: 'redraw/img/original-arts/original(' + $("#artwork").data('number') + ').jpg'
    }, {
        Val: 2,
        Url: 'redraw/img/step-one/step-one(' + $("#artwork").data('number') + ').jpg'
    }, {
        Val: 3,
        Url: 'redraw/img/step-two/step-two(' + $("#artwork").data('number') + ').jpg'
    }, {
        Val: 4,
        Url: 'redraw/img/final-product/final-product(' + $("#artwork").data('number') + ').jpg'
    }];

    //Calcute range value reducing to one-digit number to ease dymamic image selection
    final = Math.round((((this.value - 1) * (4 - 1)) / (100 - 1)) + 1);
    if (oldValue != final) {
        $("#artwork").fadeTo(300, 0, function () {
            $("#artwork").attr("src", imgArray.filter(a => a.Val == final)[0].Url);
        }).fadeTo(300, 1);
        oldValue = final;

        let steps = $(".steps p");
        for (i = 0; i < steps.length; i++) {
            if ((final - 1) == i) {
                steps.eq(i).addClass('clicked');
            } else {
                steps.eq(i).removeClass('clicked');
            }
        }

    }
});

$(".steps p").on('mouseenter', function () {
    $(this).addClass('hovered');
});

$(".steps p").on('mouseleave', function () {
    $(this).removeClass('hovered');
});

$(".steps p").click(function (event) {
    let p = $(this);
    for (i = 0; i < $(".steps p").length; i++) {
        if (i == p.index()) {
            switch (p.index()) {
                case 0:
                    selector.value = 1;
                    break;
                case 1:
                    selector.value = 38;
                    break;
                case 2:
                    selector.value = 63;
                    break;
                case 3:
                    selector.value = 100;
                    break;
            }
        } else {
            $(".steps p").eq(i).removeClass('clicked');
        }
    }

    p.addClass('clicked');

    var imgArray = [{
        Val: 1,
        Url: 'redraw/img/original-arts/original(' + $("#artwork").data('number') + ').jpg'
    }, {
        Val: 2,
        Url: 'redraw/img/step-one/step-one(' + $("#artwork").data('number') + ').jpg'
    }, {
        Val: 3,
        Url: 'redraw/img/step-two/step-two(' + $("#artwork").data('number') + ').jpg'
    }, {
        Val: 4,
        Url: 'redraw/img/final-product/final-product(' + $("#artwork").data('number') + ').jpg'
    }];

    //Calcute range value reducing to one-digit number to ease dymamic image selection
    final = Math.round((((selector.value - 1) * (4 - 1)) / (100 - 1)) + 1);
    if (oldValue != final) {
        $("#artwork").fadeTo(300, 0, function () {
            $("#artwork").attr("src", imgArray.filter(a => a.Val == final)[0].Url);
        }).fadeTo(300, 1);
        oldValue = final;
    }

});

$(".gallery .gallery-img").click(function (event) {
    let source = $(this).attr('src');
    let number = $(this).data('number');
    let showcase = $("#artwork");

    showcase.fadeTo(300, 0, function () {
        showcase.attr({ src: source, });
        showcase.data('number', number);
    }).fadeTo(300, 1);
    selector.value = 1;
    oldValue = 1; final = 1;
    $(".steps p").removeClass('clicked');
    $(".steps p").eq(0).addClass('clicked');
});

$(window).scroll(function (e) {
    let btn = $("#scroll-to-top");
    if($(this).scrollTop() > 100){
        btn.addClass('active');
    }else{
        btn.removeClass('active');
    }
});

$("#scroll-to-top").click(function () {
    $('html,body').animate({scrollTop: 0}, 'slow');
    return false;
});