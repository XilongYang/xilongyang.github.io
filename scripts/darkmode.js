function dark() {
    var nondarks = document.getElementsByClassName("non_dark");
    for (var i = 0; i < nondarks.length; ++i) {
        nondarks[i].style.filter = "invert(1)";
    }

    var hasshadows = document.getElementsByClassName("has_shadow");
    for (var i = 0; i < hasshadows.length; ++i) {
        hasshadows[i].style.boxShadow = "3px 0 8px -2px #fff inset "
    }
}
function light() {
    var nondarks = document.getElementsByClassName("non_dark");
    for (var i = 0; i < nondarks.length; ++i) {
        nondarks[i].style.filter = "invert(0)";
    }

    var hasshadows = document.getElementsByClassName("has_shadow");
    for (var i = 0; i < hasshadows.length; ++i) {
        hasshadows[i].style.boxShadow = "3px 0 8px -2px #000 inset "
    }
}

function switchDarkmode() {
    var mask = document.getElementById("darkmode-mask");
    mask.removeEventListener("transitionend", dark);
    mask.removeEventListener("transitionend", light);
    if (getComputedStyle(mask).opacity != '1') {
        mask.style.opacity = "1";
        mask.addEventListener("transitionend", dark);
    } else {
        mask.style.opacity = "0";
        mask.addEventListener("transitionend", light);
    }
}
