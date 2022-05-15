class Application {
    constructor(name, title, content, icon, trayID) {
        this.name = name;
        this.title = title;
        this.content = content;
        this.generateApp(icon, trayID);
    }
    generateApp(icon, trayID) {
        var tray = document.getElementById(trayID);
        tray.innerHTML += "<div class='app'><div class='icon' id='"+this.name+"-icon' "
                        + "onclick='lightIcon(event);"
                        + "callWindow(event)'>"
                        + "<abbr title=\"" +this.title+ "\">"
                        + icon
                        + "</abbr>"
                        + "</div>"
                        + this.app()
                        + "</div>";
    }
    app() {
        return "<div class='fake_window'"
               + "onmousedown='dragStart(event)' ondrag='return;'"
               + "id='"+this.name+"-div'" 
               + "onclick='updateOrderEvent(event)'>"
               + "<div class='drag_mask'></div>"
               + this.buttons()
               + "<div class='fake_title'>"+this.title+"</div>"
               + this.content+"</div>\n";
    }
    buttons() {
        return "<div class='fake_close non_dark' onclick='closeButtonEvent(event)'></div>"
               +"<div class='fake_full non_dark' onclick='switchFull(event)'></div>"
               +"<div class='fake_min non_dark' onclick='hideButtonEvent(event)'></div>\n"
    }
}

function appGenerate() {
    new Application("gitalk", "Gitalk"
    , "<div id='gitalk' class='non_dark'></div>"
    , "<i class='material-icons'>sticky_note_2</i>", "icons_tray");
    var gitalk_generator = new Gitalk({
        clientID: 'fae12e78dff0504db954',
        clientSecret: 'ae4a8cdf7739c32d9aa86a08fb3278f52d261f7e',
        repo: 'xilongyang.github.io',
        owner: 'XilongYang',
        admin: ['XilongYang'],
        id: "xilong_site",      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
    });
    gitalk_generator.render('gitalk');

    new Application("music", "Music Player"
    , '<iframe class="fake_window_contents" id="music-content" loading="lazy" src="/components/musicplayer/" frameborder="0"></iframe>'
    , "<i class='material-icons'>album</i>", "icons_tray");

    new Application("onedrive", "OneDrive"
    , '<iframe class="fake_window_contents non_dark" id="onedrive-content" loading="lazy" src="https://onedrive.xilong.site" frameborder="0"></iframe>'
    , "<i class='material-icons'>cloud_sync</i>", "icons_tray");

    new Application("terminal", "Terminal"
    , '<iframe class="fake_window_contents non_dark" id="terminal-content" loading="lazy" src="/components/Fe3OS/" frameborder="0"></iframe>'
    , "<i class='material-icons'>terminal</i>", "icons_tray");

    new Application("blog_life", "Xilong's Life"
    , '<iframe class="fake_window_contents non_dark" id="blog_life-content" loading="lazy" src="/life/" frameborder="0"></iframe>'
    , "<i class='material-icons non_dark'>podcasts</i>", "icons_tray");

    new Application("blog_zh", "Xilong's Blog"
    , '<iframe class="fake_window_contents non_dark" id="blog_zh-content" loading="lazy" src="/blog/" frameborder="0"></iframe>'
    , "<i class='material-icons non_dark'>podcasts</i>", "icons_tray");

    if (screen.availWidth < 950) {
        document.getElementById("body").mobile = "true";
        var apps = document.getElementsByClassName("fake_window");
        for (var i = 0; i < apps.length; ++i) {
            apps[i].full = "true";
        }
    }
}