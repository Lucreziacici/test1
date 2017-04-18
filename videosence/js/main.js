function Draw(u) {
    var K = $.extend({
        Video:video, 
    }, u || {});
    var J = "";
    for (var y in K) {
        if (typeof K[y] == "function") {
            continue
        } else {
            switch (y) {
            case "video":
                J += K.Video(K[y]);
                break;

            default:
                if (y == "Plugin" && K[y] === {}) {
                    J += B(K[y], K)
                }
            }
        }
    }
    return J;

    function B(a, b) {
        for (var c in a) {
            for (var d in b) {
                if (c == d) {
                    return a[c](b[d]) || ""
                }
            }
        }
    }

    function video(a) {
        var a = $.extend({
            startimg:"http://swa.dgshare.cn/signin/img/welcome.jpg",
            videourl:"http://live.dgshare.cn/AppName/StreamName.m3u8",
            endimg:"http://swa.dgshare.cn/signin/img/welcome.jpg",
            checked:"checked"
        }, a || {});
       var strVar = "";
           strVar +="<link rel=\"stylesheet\" href=\"http://g.alicdn.com/de/prismplayer/1.3.8/skins/default/index-min.css\">"
           strVar += "<script type=\"text/javascript\" src=\"http://g.alicdn.com/de/prismplayer/1.4.10/prism-min.js\"><\/script>\r\n";   
           strVar += "<div class=\"videostart\" id=\"videostart\" style=\"z-index: 1;width:100%;height:100%;\"><img style=\"width:100%;height:100%;\" src=\""+a.startimg+"\"><\/div>";
           strVar += "<img src=\"img/like.png\" id=\"like\" class=\""+a.checked+"\">"
           strVar += "<div style=\"width:100%;height:100%;display:none;\" id=\"video\">"

           
           strVar += "<div id=\"J_prismPlayer\" class=\"prism-player\"></div>"
           strVar += "</div>"
           strVar += "<div class=\"videoend\" style=\"z-index: 1;display: none;width:100%;height:100%;\"><img style=\" width:100%;height:100%;\" src=\""+a.endimg+"\"><\/div>";
           
           strVar += "<script type=\"text/javascript\">\r\n";
           strVar += "var player = new prismplayer({\r\n";
           strVar += "    id:\"J_prismPlayer\", \r\n";
           strVar += "    source:\"http://cloud.video.taobao.com/play/u/2554695624/p/1/e/6/t/1/fv/102/28552077.mp4\",\r\n ";
           strVar += "    autoplay: false,  \r\n ";
           strVar += "    width:\"100%\",\r\n";         
           strVar += "    height:\"667px\"\r\n";
           strVar += "});\r\n";
           // strVar += "var clickDom = document.getElementById(\"videostart\");\r\n";
           // strVar += "    clickDom.addEventListener(\"click\", function(e) {\r\n";
           // strVar += "    $(\".videostart\").hide();\r\n";
           // strVar += "    $(\"#video,#like\").show();\r\n ";
           // strVar += "        player.play();\r\n";
           // strVar += "    });\r\n";
           // strVar += "player.on(\"ended\",function(e){\r\n";
           // strVar += "    $(\"#video,#like\").remove();\r\n";
           // strVar += "    $(\".videoend\").show();\r\n";
           // strVar += "    })\r\n";
           strVar += "$(\"#like\").on(\"click\",function(){\r\n";
           strVar += "    $(\"#like\").css(\"width\",\"80px\");\r\n";
           
           strVar += "    })\r\n";

           strVar += "<\/script>\r\n";
           return strVar
       }
   
  
};



