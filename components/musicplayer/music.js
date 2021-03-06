class Music {
    constructor(id, name, url) {
        this.id = id;
        this.name = name;
        this.url = url;
    }
    item() {
        return "<div class='music-item' onclick='changeMusic(\""+this.name
               +"\", \""+this.url+"\");' id='"+this.id+"'>"+this.name+"</div>";
    }
}

var playlist = new Array();
playlist[0] = new Music("1", "Animenz - Merry-go-round of life", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz_merry-go-round_of_life.mp3");
playlist[1] = new Music("2", "Animenz - A cruel angel thesis", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-a_cruel_angel_thesis.mp3");
playlist[2] = new Music("3", "Animenz - βios", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-bios.mp3");
playlist[3] = new Music("4", "Animenz - Blue bird", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-blue_bird.mp3");
playlist[4] = new Music("5", "Animenz - Change the world", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-change_the_world.mp3");
playlist[5] = new Music("6", "Animenz - Connect", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-connect.mp3");
playlist[6] = new Music("7", "Animenz - Dango family", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-dango.mp3");
playlist[7] = new Music("8", "Animenz - Departures", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-departures.mp3");
playlist[8] = new Music("9", "Animenz - Hikaru nara", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-hikaru_nara.mp3");
playlist[9] = new Music("10", "Animenz - Kawaki wo ameku", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-kawaki_wo_ameku.mp3");
playlist[10] = new Music("11", "Animenz - Main theme from laputa", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-main_theme_from_laputa.mp3");
playlist[11] = new Music("12", "Animenz - One more time, one more chance", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-one_more_time_one_more_chance.mp3");
playlist[12] = new Music("13", "Animenz - Screct base", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-screct_base.mp3");
playlist[13] = new Music("14", "Animenz - Tabi no tochuu", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-tabi_no_tochuu.mp3");
playlist[14] = new Music("15", "Animenz - The everlasting guilty crown", "https://onedrive.xilong.site/Music/Pure/Animenz/animenz-the_everlasting_guilty_crown.mp3");

var listLength = 0;
function generatePlaylist() {
    var musics = document.getElementById("musics");
    for (var i = listLength; i < playlist.length; ++i) {
        musics.innerHTML += playlist[i].item();
    }
    listLength = playlist.length;
}

function playAnimation() {
    var disk = document.getElementById("disk");
    disk.style.animation = "rotation 6s linear infinite";
    var label = document.getElementById("label");
    label.style.opacity = "1";
    var probe = document.getElementById("probe");
    probe.style.animation = "probe 1s"
    probe.style.transform = "rotate(80deg)";
}

function stopAnimation() {
    var disk = document.getElementById("disk");
    disk.style.animation = "";
    var label = document.getElementById("label");
    label.style.opacity = "0";
    var probe = document.getElementById("probe");
    probe.style.animation = "probe-back 1s"
    probe.style.transform = "rotate(90deg)";
}
var preItem = null;
function clearItemDisplay() {
    if (preItem != null) preItem.style = "";
}

function changeItemDisplay(id) {
    clearItemDisplay();
    var item = document.getElementById(id);
    item.style = "box-shadow: 0px 0px 4px 4px #aaa;background-color: #333;color: #fff;";
    preItem = item;
}

function fixDisk() {
    var animation = document.getElementById("animation");
    animation.style.height = getComputedStyle(animation).width;
}

function changeMusic(name, src) {
    var player = document.getElementById("control");
    player.pause();
    player.setAttribute("src", src);
    console.log(player.innerHTML);
    player.play();

    var nameDiv = document.getElementById("name");
    nameDiv.innerHTML = name;

    var label = document.getElementById("label");
    label.innerHTML = name;

    var i = 0;
    while (i < playlist.length && src != playlist[i].url) {
        ++i;
    }
    if (i < playlist.length) {
        changeItemDisplay((i + 1).toString());
    } else {
        clearItemDisplay();
    }
}

function changeFromUrl(e) {
    if (e.code != 'Enter') return;
    var url = document.getElementById("custom-url");
    if (url.value == "") return;
    changeMusic(url.value, url.value);
    url.value = "";
}

function changePlayMode(e) {
    var target = e.target;
    var player = document.getElementById("control");
    if (target.innerText== "repeat_one") {
        target.innerText = "shuffle"
        player.removeAttribute("loop");
    } else if (target.innerText == "shuffle") {
        target.innerText = "playlist_play" 
    } else if (target.innerText == "playlist_play") {
        target.innerText = "repeat";
    } else if (target.innerText == "repeat") {
        target.innerText = "repeat_one";
        player.setAttribute("loop", "");
    }
}

function switchMusic() {
    var playMode = document.getElementById('play-mode').innerText;
    var src = document.getElementById('control').src;
    if (playMode == "shuffle") {
        var x = Math.round(Math.random() * (playlist.length - 1));
        changeMusic(playlist[x].name, playlist[x].url);
    } else {
        var i = 0;
        while (i < playlist.length && src != playlist[i].url) {
            ++i;
        }
        if (i + 1 < playlist.length) {
            changeMusic(playlist[i + 1].name, playlist[i + 1].url);
        } else if (playMode == "repeat") {
            changeMusic(playlist[0].name, playlist[0].url);
        }
    }
}
