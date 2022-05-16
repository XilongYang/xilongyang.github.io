var is_power_on = false;

function ResetApps() {
    var apps = document.getElementsByClassName("apps");
    for (var i = 0; i < apps.length; ++i) {
        apps[i].style.color = "#c00";
    }
}

function HideApps() {
    var apps = document.getElementsByClassName("apps");
    for (var i = 0; i < apps.length; ++i) {
        apps[i].style.display="none";
    }
}

function ShowApps() {
    var apps = document.getElementsByClassName("apps");
    for (var i = 0; i < apps.length; ++i) {
        apps[i].style.display="inline";
    }
}

function Hide(e) {
    e.target.removeEventListener("animationend", Hide);
    e.target.style.animationName = "";
    e.target.style.display="none";
}

function Show(e) {
    e.target.removeEventListener("animationend", Show);
    e.target.style.animationName = "";
}

function PowerSwitch (icon_id, area_id, iframe_id) {
    ResetApps();

    var icon = document.getElementById(icon_id);
    var area = document.getElementById(area_id);
    var iframe = document.getElementById(iframe_id);

    iframe.src = "";

    if (is_power_on) {
        HideApps();
        area.style.animationName = "light";
        area.style.animationDuration = "0.4s";
        area.style.animationDirection = "reverse";
        area.style.animationPlayState = "running";
        area.addEventListener("animationend", Hide);
        is_power_on = !is_power_on;
    } else {
        ShowApps();
        area.style.animationName = "light";
        area.style.animationDuration = "0.4s";
        area.style.animationDirection = "normal";
        area.style.display = "inline";
        area.style.animationPlayState = "running";
        area.addEventListener("animationend", Show);
        is_power_on = !is_power_on;
    }
}

function ChangeApps(url, icon_id, iframe_id) {
    if (!is_power_on) {
        return;
    }

    ResetApps();

    var icon = document.getElementById(icon_id);
    var iframe = document.getElementById(iframe_id);

    icon.style.color = "#600";
    iframe.src = url;
}
