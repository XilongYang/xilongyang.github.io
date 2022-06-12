colors = ["#27010e", "#134857", "#223e36", "black"];
cur_color = 0;

function RealChange(e) {
    var circle = e.target;
    circle.removeEventListener("animationend", RealChange);
    circle.style.animationName = "";

    var mask = document.getElementById("color-mask");
    mask.style.backgroundColor = colors[cur_color];

    cur_color = (cur_color + 1) % colors.length;
}

function ChangeColor() {
    var circle = document.getElementById("circle");
    circle.style.fill = colors[cur_color];
    circle.style.animationName = "change-color";
    circle.addEventListener("animationend", RealChange);
}