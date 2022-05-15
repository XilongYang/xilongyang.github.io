var power_on = false;

function ResetAllIcon() {
    var apps = document.getElementsByClassName("apps");
    for (var i = 0; i < apps.length; ++i) {
        apps[i].style.color = "#333";
    }
}

function PowerOff (icon_id, iframe_id) {
    ResetAllIcon();

    var icon = document.getElementById(icon_id);
    var iframe = document.getElementById(iframe_id);

    iframe.src = "/components/power_off";

    if (power_on) {
        icon.style.color = "#333";
        iframe.style.opacity = 0;
        power_on = !power_on;
    } else {
        icon.style.color = "#c00";
        iframe.style.opacity = 1;
        power_on = !power_on;
    }
}

function ChangeApps(url, icon_id, iframe_id) {
    if (!power_on) {
        return;
    }

    ResetAllIcon();

    var icon = document.getElementById(icon_id);
    var iframe = document.getElementById(iframe_id);

    icon.style.color = "#0c0";
    iframe.src = url;
}
