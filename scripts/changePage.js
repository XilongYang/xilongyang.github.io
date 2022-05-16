function NextPage() {
    var page_container = document.getElementById("page_container");
    var pages = document.getElementsByClassName("pages");

    var curY = page_container.scrollTop;

    var targetY = 0;
    for (var i = 0; i < pages.length; ++i) {
        var pageY = pages[i].offsetTop;
        if (pageY > curY) {
            targetY = pageY;
            break;
        }
    }

    page_container.scroll({
        top: targetY,
        left: 0,
        behavior: 'smooth'
    });
}

function PrevPage() {
    var page_container = document.getElementById("page_container");
    var pages = document.getElementsByClassName("pages");

    var curY = page_container.scrollTop;

    var targetY = 0;
    for (var i = pages.length - 1; i >= 0; --i) {
        var pageY = pages[i].offsetTop;
        if (pageY <= curY) {
            targetY = pageY;
            break;
        }
    }

    page_container.scroll({
        top: targetY,
        left: 0,
        behavior: 'smooth'
    });
}

var scroll_timer;
var delay = 100;
var is_direction_down = true;

function QuickScroll() {
    if (is_direction_down) {
        NextPage();
    } else {
        PrevPage();
    }
    clearTimeout(scroll_timer);
}

function QuickScrollListener(e) {
    if (e.deltaY) {
        if (e.deltaY > 0) {
            is_direction_down = true;
        } else {
            is_direction_down = false;
        }
    }
    clearTimeout(scroll_timer);
    scroll_timer = setTimeout(QuickScroll, delay);
}

function ChangePage(e) {
    if (e.code == "ArrowUp" || e.code == "PageUp") {
        console.log("Up");
        PrevPage();
    }
    if (e.code == "ArrowDown" || e.code == "PageDown") {
        console.log("Down");
        NextPage();
    }
}
