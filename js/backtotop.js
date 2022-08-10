(function () {
  var backtotop = document.getElementById("backtotop");

  var timer;

  // 返回頂部按鈕的監聽
  backtotop.onclick = function () {
    // 設表先關
    clearInterval(timer);
    // 設置定時器
    timer = setInterval(function () {
      document.documentElement.scrollTop -= 100;

      if (document.documentElement.scrollTop <= 0) {
        clearInterval(timer);
      }
    }, 20);
  };

  // 監聽頁面的滾動
  window.onscroll = function () {
    // 捲動值
    var scrollTop = document.documentElement.scrollTop || window.scrollY;

    // 頁面沒有捲動，那麼返回頂部按鈕就隱藏掉
    if (scrollTop == 0) {
      backtotop.style.display = "none";
    } else {
      backtotop.style.display = "block";
    }
  };
})();
