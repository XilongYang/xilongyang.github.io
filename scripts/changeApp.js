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

function PowerSwitch (icon_id, area_id, iframe_id) {
    ResetApps();

    var icon = document.getElementById(icon_id);
    var area = document.getElementById(area_id);
    var iframe = document.getElementById(iframe_id);

    if (iframe.src != "/components/power/off") {
        iframe.src = "/components/power_off";
    }

    if (is_power_on) {
        HideApps();
        area.style.display = "none";
        is_power_on = !is_power_on;
    } else {
        ShowApps();
        area.style.display = "inline";
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
