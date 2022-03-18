function switchLanguageBoard() {
    var switcher = document.getElementById("language_switcher");
    if (switcher.flag == "on") {
        switcher.flag = "off";
        document.getElementById("language_button_1").style.backgroundColor = "transparent";
        document.getElementById("language_button_1").style.color = "#ccc";
        document.getElementById("language_button_3").style.display = "none";
        document.getElementById("language_button_2").style.display = "none";
    } else {
        switcher.flag = "on";
        document.getElementById("language_button_2").style.animation = "fadein 0.5s";
        document.getElementById("language_button_2").style.display = "inline";
        document.getElementById("language_button_3").style.animation = "fadein 1s";
        document.getElementById("language_button_3").style.display = "inline";
    }
}

function switchLanguage(lang) {
    if (lang == "en") {
        document.getElementById("language_button_label_1").innerHTML = 'English';
        document.getElementById("language_button_label_2").innerHTML = '中文';
        document.getElementById("language_button_label_3").innerHTML = '日本語';

        document.getElementById("language_button_2").setAttribute("onclick", "switchLanguage('zh')");
        document.getElementById("language_button_3").setAttribute("onclick", "switchLanguage('jp')");

        document.getElementById("name").innerHTML = "Xilong Yang";
        document.getElementById("occupation").innerHTML = "Programer";
        document.getElementById("language_label").innerHTML = "Language:";
        document.getElementById("stamp_intro").innerHTML = "Simple Two-Way Active Measure Protocol (IETF RFC8762).";
        document.getElementById("this_site").innerHTML = "This site";
        document.getElementById("this_site_intro").innerHTML = "A static site that simulates a OS.";
        document.getElementById("misc").innerHTML = '<a href="https://github.com/XilongYang?tab=repositories">misc.</a>';
        document.getElementById("about_label").innerHTML = "About";
        document.getElementById("intro").innerHTML = "I'm a programer with 3 years of experience about C++ and Linux.";
        document.getElementById("intro_site").innerHTML = 'I maintain a <a href="https://github.com/XilongYang">github account</a> and <a href="/blog">blog</a>.';
        document.getElementById("intro_email").innerHTML = 'You can contact me though email <a href="mailto:xilong.yang@foxmail.com">xilong.yang@foxmail.com</a>';
        document.getElementById("links_label").innerHTML = "Links";
        document.getElementById("friend_label").innerHTML = "Friends";
        document.getElementById("nomore").innerHTML = '* no more info.';
    } else if (lang == "zh") {
        document.getElementById("language_button_label_1").innerHTML = '中文';
        document.getElementById("language_button_label_2").innerHTML = '日本語';
        document.getElementById("language_button_label_3").innerHTML = 'English';

        document.getElementById("language_button_2").setAttribute("onclick", "switchLanguage('jp')");
        document.getElementById("language_button_3").setAttribute("onclick", "switchLanguage('en')");

        document.getElementById("name").innerHTML = "杨熙龙";
        document.getElementById("occupation").innerHTML = "程序员";
        document.getElementById("language_label").innerHTML = "语言:";
        document.getElementById("stamp_intro").innerHTML = "简单的双向主动测量协议 (IETF RFC8762)。";
        document.getElementById("this_site").innerHTML = "本站";
        document.getElementById("this_site_intro").innerHTML = "一个模拟成OS的静态网站。";
        document.getElementById("misc").innerHTML = '<a href="https://github.com/XilongYang?tab=repositories">更多</a>';
        document.getElementById("about_label").innerHTML = "关于我";
        document.getElementById("intro").innerHTML = "我是一个有3年 C++ 和 Linux 经验的程序员。";
        document.getElementById("intro_site").innerHTML = '有一个<a href="https://github.com/XilongYang">github帐号</a>和一个<a href="/zh/blog">博客</a>。';
        document.getElementById("intro_email").innerHTML = '可以通过邮件<a href="mailto:xilong.yang@foxmail.com">xilong.yang@foxmail.com</a>联系我。';
        document.getElementById("links_label").innerHTML = "链接";
        document.getElementById("friend_label").innerHTML = "朋友";
        document.getElementById("nomore").innerHTML = '* 没有更多信息了。';
    } else if (lang == "jp") {
        document.getElementById("language_button_label_1").innerHTML = '日本語';
        document.getElementById("language_button_label_2").innerHTML = 'English';
        document.getElementById("language_button_label_3").innerHTML = '中文';

        document.getElementById("language_button_2").setAttribute("onclick", "switchLanguage('en')");
        document.getElementById("language_button_3").setAttribute("onclick", "switchLanguage('zh')");

        document.getElementById("name").innerHTML = "楊(ヤン) 熙龍(シロン)";
        document.getElementById("occupation").innerHTML = "プログラマー";
        document.getElementById("language_label").innerHTML = "言語:";
        document.getElementById("stamp_intro").innerHTML = "シンプルな双方向アクティブ測定プロトコル(IETF RFC8762)。";
        document.getElementById("this_site").innerHTML = "このサイト";
        document.getElementById("this_site_intro").innerHTML = "OSをシミュレートする静的なWebサイト。";
        document.getElementById("misc").innerHTML = '<a href="https://github.com/XilongYang?tab=repositories">もっと</a>';
        document.getElementById("about_label").innerHTML = "紹介";
        document.getElementById("intro").innerHTML = "C++とLinuxについて3年の経験を持つプログラマーです。";
        document.getElementById("intro_site").innerHTML = '<a href="https://github.com/XilongYang">githubアカウント</a>と<a href="/blog">ブログ</a>を持っています。';
        document.getElementById("intro_email").innerHTML = 'メール<a href="mailto:xilong.yang@foxmail.com">xilong.yang@foxmail.com</a>で私に連絡することができます。';
        document.getElementById("links_label").innerHTML = "リンク";
        document.getElementById("friend_label").innerHTML = "友人";
        document.getElementById("nomore").innerHTML = '* これ以上の情報はありません。';
    }
    switchLanguageBoard();
}