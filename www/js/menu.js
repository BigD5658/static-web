(function () {
  var bannerNavUl = document.getElementById("banner-nav-ul");
  var bannerNav = document.getElementById("banner-nav");
  var menus = document.querySelectorAll(".menus-box .menu");
  var bannerLis = document.querySelectorAll("#banner-nav-ul li");

  // 事件委託，使用onmouseover事件，不是onmouseenter
  bannerNavUl.onmouseover = function (e) {
    if (e.target.tagName.toLowerCase() == "li") {
      // 得到觸碰的這個li元素身上的data-t屬性
      var t = e.target.getAttribute("data-t");
      // 排他操作，讓所有的li都去掉current類名
      for (var i = 0; i < bannerLis.length; i++) {
        bannerLis[i].className = bannerLis[i].getAttribute("data-t");
      }
      // 當前碰到的這個li，要加current類
      e.target.className += " current";
      // 尋找匹配的menu
      var themenu = document.querySelector(
        ".menus-box .menu[data-t=" + t + "]"
      );
      // 排他操作，讓所有的盒子都去掉current類名
      for (var i = 0; i < menus.length; i++) {
        menus[i].className = "menu";
      }
      // 匹配的這項加上current類名
      themenu.className = "menu current";
    }
  };

  // 當鼠標離開大盒子的時候，菜單要關閉
  bannerNav.onmouseleave = function () {
    for (var i = 0; i < bannerLis.length; i++) {
      bannerLis[i].className = bannerLis[i].getAttribute("data-t");
      menus[i].className = "menu";
    }
  };
})();
