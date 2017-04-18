function Draw(u) {
    var K = $.extend({
        
        //新加
        Video:video,
       
    }, u || {});
    var J = "";
    for (var y in K) {
        if (typeof K[y] == "function") {
            continue
        } else {
            switch (y) {
            case "header":
                J += K.Header(K[y]);
                break;
            case "swiper":
                J += K.Swiper(K[y]);
                break;
            case "footer":
                J += K.Footer(K[y]);
                break;
            case "popup":
                J += K.Popup(K[y]);
                break;
            case "img":
                J += K.Img(K[y]);
                break;
            case "detail":
                J += K.Detail(K[y]);
                break;
            case "video":
                J += K.Video(K[y]);
                break;
            case "mainlist":
                J += K.Mainlist(K[y]);
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
           strVar += "<div class=\"videostart\" style=\"z-index: 1;width:100%;height:100%;\"><img style=\"width:100%;height:100%;\" src=\""+a.startimg+"\"><\/div>";
           strVar += "<div style=\"width:100%;height:100%;display:none;\" id=\"video\">"
           //如果是none就不显示，如果是check就显示
           strVar += "<div style=\"width:20px;height:20px;position:absolute;z-index:1;background-color:red;\" id=\"like\"></div>"
           strVar += " <video id=\"example_video_1\" style=\"width:100%;height:100%;\"  class=\"video-js vjs-default-skin\" controls preload=\"none\" ";
          // strVar += "      data-setup=\"{}\" src=\""+a.videourl+"\">";
          strVar += "      data-setup=\"{}\" >";
           strVar += "<source src=\""+a.videourl+"\" type=\"application/vnd.apple.mpegurl\"/>"
           strVar += "    <track kind=\"captions\" src=\"demo.captions.vtt\" srclang=\"en\" label=\"English\"><\/track>";
           strVar += "    <track kind=\"subtitles\" src=\"demo.captions.vtt\" srclang=\"en\" label=\"English\"><\/track><";
           strVar += "<\/video>";
           //strVar += ""
           strVar += "</div>"
           strVar += "<div class=\"videoend\" style=\"z-index: 1;display: none;width:100%;height:100%;\"><img style=\" width:100%;height:100%;\" src=\""+a.endimg+"\"><\/div>";
           strVar += "<script src=\"//g.alicdn.com/de/prismplayer/1.3.8/prism-min.js\"><\/script>\r\n";
           strVar += "<script type=\"text/javascript\">\r\n";
           strVar += "var myVideo=document.getElementById(\"example_video_1\");\r\n";
           strVar += "myVideo.controls=false;\r\n";
           strVar += "var width=$(window).width();\r\n";
           strVar += "var height=$(window).height();\r\n";
           strVar += "var play=0;\r\n";

           //strVar += "$(\"#example_video_1\").css(\"width\",width).css(\"height\",height);\r\n";
           //strVar += "$(\".videostart img\").css(\"width\",width).css(\"height\",height);";
           //strVar += "$(\".videoend img\").css(\"width\",width).css(\"height\",height);";
           strVar += "$(\".videostart\").click(function(){\r\n";
           strVar += "   $(\"#video\").show();\r\n "
           strVar += "   myVideo.play();\r\n";
           
           strVar += "   $(\".videostart\").hide();\r\n";
           strVar += "  });\r\n";
           //单击点赞
           strVar += "$(\"#like\").click(function(){\r\n";
          // strVar += "$(\"like\").html("")"
           strVar += "  });\r\n";
           //单击视频收起或显示进度条
           strVar += "$(\"#example_video_1\").click(function(){\r\n";
           strVar += "console.log(play);\r\n";
           strVar += "if(play==0){\r\n";
           strVar += "myVideo.controls=true;\r\n";
           //strVar += "myVideo.pause();\r\n";
           strVar += "play=1;\r\n";
           strVar += "}else{\r\n";
           strVar +="myVideo.controls=false;\r\n";
           //strVar += "myVideo.play();\r\n";
           strVar += "play=0;\r\n";
           strVar += "}\r\n";
           strVar += "})\r\n";
           strVar += "$('#example_video_1').on('ended', function () {\r\n";
           strVar += "$('#example_video_1,#video').remove();\r\n";
           strVar += " $(\".videoend\").show();\r\n";
           strVar += " });\r\n";
           strVar += "<\/script>\r\n";
           return strVar
       }
   
  
};



