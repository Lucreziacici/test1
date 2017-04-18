/* ------------------------------------------------
*	公共方法
*	write by zyh at 2016/7/28
*/

// 获得本浏览器支持的 CSS3 属性
var _div = document.createElement('div');
function getVendorPropertyName(prop) {
    if (prop in _div.style) return prop;
    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);
    for (var i = 0; i < prefixes.length; ++i) {
        var vendorProp = prefixes[i] + prop_;
        if (vendorProp in _div.style) { return vendorProp; }
    }
}
var support = {};
support.transition = getVendorPropertyName('transition');
support.transitionDelay = getVendorPropertyName('transitionDelay');
support.transform = getVendorPropertyName('transform');
support.transformOrigin = getVendorPropertyName('transformOrigin');
support.filter = getVendorPropertyName('Filter');
support.animation = getVendorPropertyName('animation');
support.animationDelay = getVendorPropertyName('animationDelay');
support.fullScreen = getVendorPropertyName('requestFullscreen');
var transEndEventNames = {
    'transition': 'transitionend',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition': 'MSTransitionEnd',
};
support.transitionEnd = transEndEventNames[support.transition] || null;
var animEndEventNames = {
    animation: 'animationend',
    MozAnimation: 'animationend',
    OAnimation: 'oAnimationEnd oanimationend',
    WebkitAnimation: 'webkitAnimationEnd',
    msAnimation: 'MSAnimationEnd',
};
support.animationEnd = animEndEventNames[support.animation] || null;

// 过渡动画结束时的回调
$.fn.transitionend = function (callback) {
    this.one(support.transitionEnd, function () {
        if (callback) callback();
    });
    return this;
};
// 动画结束时的回调
$.fn.animationend = function (callback) {
    this.one(support.animationEnd, function () {
        if (callback) callback();
    });
    return this;
};

// 获得 dom 元素，可传入 类名/索引/对象
function getElem(o, box) {
    if (typeof o == "string") return document.querySelector(obj);
    else if (typeof o == "number") return getObj(box).eq(o)[0];
    else if (typeof o == "object") {
        if (typeof o.css == "function") return o[0];
        else return o;
    }
}
// 获取 jquery 元素，参数同上
function getObj(o, box) {
    if (typeof o == "string") return $(o);
    else if (typeof o == "number") return getObj(box).eq(o);
    else if (typeof o == "object") {
        if (typeof o.css == "function") return o;
        else return $(o);
    }
}

// li 内部有元素则会影响点击时的元素选择，用此方法统一为 li
function isLi(o) {
    var $obj = getObj(o);
    return $obj.is("li") ? $obj : $obj.parents("li");
}

// 添加一个 id
$.fn.addId = function (id) {
    this.attr("id", id);
    return this;
}

//把/DATE(...)/时间转换成yyyy-MM-dd hh:mm:ss
function ConvertToDatetime(datetime) {
    var time = datetime;
    var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hou = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var d = month + "-" + currentDate + " " + hou + ":" + min + ":" + sec;
    //var d = date.getFullYear() + "-" + month + "-" + currentDate + " " + hou + ":" + min + ":" + sec;
    return d;
}
function changeDate(datetime) {
    return new Date(parseInt(datetime.replace("/Date(", "").replace(")/", ""), 10));
}

// 将时间改成我想要的格式
String.prototype.change = function (rgx) {
    return this.split(" ")[0].replace(/-/g, rgx);
}

// 从 search 或 hash 中拿到 name 对应的值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


// 禁用空链接的 a 标签
$("body").on("click", "a[href=\"#\"]", function (e) {
    e.preventDefault();
    return false;
});

// 点击关闭按钮
$("body").on("touchstart", "[role=\"close\"]", function (e) {
    var target = $(this).attr("target");
    $(target).fadeOut(0);
    return false;
});

// 显示第一页
function showFirstPage(callback) {
    $("#loading").fadeOut(0);
    $(".page1").fadeIn(0, function () {
        if (typeof callback == "function") callback();

    }).siblings(".page").fadeOut(0);
}

// 点击规则按钮
$(".rule_btn").on("click", function () {
    $("#rule").fadeIn("fast");
});

// 点击分享按钮
$(".share_btn").on("click", function () {
    $("#share").fadeIn("fast");
});
// 初始化刮刮乐
function guaguaEvent(ok) {
    var $canvas = $(".guagua canvas").show(0);
    var canvas = $canvas[0];
    var ctx = canvas.getContext('2d');
    var w = canvas.width = $(".guagua canvas").width();
    var h = canvas.height = $(".guagua canvas").height();
    var area = 0;   // 刮的面积
    var img = new Image();
    img.src = "http://swa.dgshare.cn/signin/img/guaguale.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, w, h);
        // 刮奖的事件
        $(".guagua.ok").off().on("touchstart mousedown", BindEvent);

        // 刮刮乐事件
        function BindEvent(e) {
            if (e.type == 'touchstart') { e = e.originalEvent.touches[0] || window.event; }
            var isMoving = true;
            if (typeof startGua == "function") startGua();
            $(".guagua .text").hide(0);
            var ox = $(".guagua").offset().left, oy = $(".guagua").offset().top;
            var startX = e.clientX - ox, startY = e.clientY - oy;
            $(window).on("touchmove.gua mousemove.gua", function (e) {
                if (!isMoving) { return }
                if (e.type == 'touchmove') { e = e.originalEvent.touches[0] || window.event; }
                area += 1;
                var xx = e.clientX - ox, yy = e.clientY - oy;
                for (var i = 0, len = 20; i < len; i++) {
                    ctx.save();
                    ctx.clearRect(startX + i * (xx - startX) / len, startY + i * (yy - startY) / len, 20, 20);
                    ctx.restore();
                    //ctx.clearRect(e.clientX - ox - i, e.clientY - oy - i, 10, 10);
                }
            }).on("touchend.gua mouseup.gua", function () {
                $(this).off(".gua");
                isMoving = null;
                // 是否刮够一定范围
                if (area > 30) {
                    $(".cover").fadeOut();
                    if (typeof afterGua == "function") afterGua();
                }
            });
            return false;
        }
    }
    if (ok) { $(".guagua").addClass("ok"); }
}

// 绑定手机
function bindPhone() {
    var tel, Timer;
    var canBindPhone = false;
    $("#getCode").on("touchend", function () {
        var $this = $(this);
        canBindPhone = true;
        clearInterval(Timer);
        var count = 60;
        $this.text("请求中...");
        tel = $("#tel").val();
        if (/^1\d{10}$/.test(tel)) {
            $.post("/CRm/GetVerificationCode", {
                mobilePhone: tel,
                code: $("#imgInput").val(),
            }, function (r) {
                if (r.Status) {
                    clearInterval(Timer);
                    $this.text(count + "秒后失效");
                    Timer = setInterval(function () {
                        count--;
                        if (count > 0) {
                            $this.text(count + "秒后失效");
                        } else {
                            $this.text("请重新获取");
                            clearInterval(Timer);
                        }
                    }, 1000);
                } else {
                    $this.text("获取验证码");
                    alert(r.ErrorMessage);
                }
            })
        } else {
            alert("请输入正确的手机号码");
        }
        return false;
    })

    // 点击绑定按钮
    $("#bind_btn").on("click", function () {
        if (!$("#tel").val()) { alert("请输入手机号进行验证"); return; }
        if (!$("#code").val()) { alert("请输入验证码完成验证"); return; }
        if (canBindPhone) {
            if ($("#code").val() == "") {
                alert("请填写验证码");
            } else {
                var code = $("#code").val();
                clearInterval(Timer);
                $.post("/CRM/CustomerLogin", { mobilePhone: tel, code: code }, function (r) {
                    if (r.Status) {
                        if (typeof afterBindPhone == "function") afterBindPhone();
                    } else {
                        alert(r.ErrorMessage);
                    }
                })
            }
        } else {
            $(this).text("请先填写验证码");
        }
    });
}