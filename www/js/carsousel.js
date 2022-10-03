//輪播圖特效 IIFE立即調用函數怕去汙染全局變數
(function () {
  //得到html元素
  var carsousel_list = document.getElementById("carsousel_list");
  var left_btn = document.getElementById("left_btn");
  var right_btn = document.getElementById("right_btn");
  var circles_ol = document.getElementById("circles_ol");
  var circles_lis = circles_ol.getElementsByTagName("li");
  var banner = document.getElementById("banner");

  //克隆第一張li 這時還是孤兒節點
  var clone_li = carsousel_list.firstElementChild.cloneNode(true);
  //添加上樹
  carsousel_list.appendChild(clone_li);
  //當前顯示的圖片編號是0
  var idx = 0;

  //函數節流
  var lock = true;

  //右按鍵是件監聽
  right_btn.onclick = right_btn_handler;

  //右按鈕的事件處理函數
  function right_btn_handler() {
    //判斷節流.如果是false就甚麼都不做
    if (!lock) return;
    //關閉防止被干擾
    lock = false;
    //加上過渡效果因為輪迴第一張時會刪除屬性
    carsousel_list.style.transition = "transform .5s ease 0s";
    //idx+1
    idx++;
    //輪播
    carsousel_list.style.transform = "translateX(" + -16.66 * idx + "%)";
    //判斷是否是最後一張如果是 就傳回第一張
    if (idx > 4) {
      setTimeout(function () {
        //去掉過渡動畫屬性
        carsousel_list.style.transition = "none";
        carsousel_list.style.transform = "none";
        //讓突變再次回到編號0的圖片再次輪播
        idx = 0;
      }, 500);
    }
    //設置小圓點
    setCircles();
    //動畫結束後開鎖
    setTimeout(function () {
      lock = true;
    }, 500);
  }

  //左按鈕事件監聽
  left_btn.onclick = function () {
    //判斷節流.如果是false就甚麼都不做
    if (!lock) return;
    //關閉防止被干擾
    lock = false;
    if (idx == 0) {
      //瞬間拉到最後面
      carsousel_list.style.transition = "none";
      //拉到最後面
      carsousel_list.style.transform = "translateX(" + -16.66 * 5 + "%)";
      //改變idx值

      //這邊加上延時0毫秒可以讓上面瞬間拉到最後面後在把過渡屬性加上
      setTimeout(function () {
        //加上過渡
        carsousel_list.style.transition = "transform .5s ease 0s";
        //動畫
        carsousel_list.style.transform = "translateX(" + -16.66 * 4 + "%)";
        idx = 4;
      }, 0);
    } else {
      idx--;
      //拉動
      carsousel_list.style.transform = "translateX(" + -16.66 * idx + "%)";
    }
    //設置小圓點
    setCircles();

    //動畫結束後開鎖
    setTimeout(function () {
      lock = true;
    }, 500);
  };
  //設置小圓點的current在誰身上  序號為idx的小圓點才有類名,其他li都沒有類名
  function setCircles() {
    //每遍歷一次就要跟idx比一下,如果相等就把它的類名設置為current否則去掉類名
    for (var i = 0; i <= 4; i++) {
      //這邊%5的用意是讓idx回到0,因為前面有setime會讓idx卡在5持續500毫秒導致畫面不完整
      if (i == idx % 5) {
        circles_lis[i].className = "current";
      } else {
        circles_lis[i].className = "";
      }
    }
  }
  //小圓點事件監聽
  circles_ol.onclick = function (e) {
    if (e.target.tagName.toLowerCase() == "li") {
      //得到li身上的data-n屬性就是n
      var n = Number(e.target.getAttribute("data-n"));
      //改變idx
      idx = n;
      //拉動
      carsousel_list.style.transform = "translateX(" + -16.66 * idx + "%)";
      //設置小圓點
      setCircles();
    }
  };

  //定時器,自動輪播
  var timer = setInterval(right_btn_handler, 2000);
  //當鼠標進入自動停止輪播
  banner.onmouseenter = function () {
    clearInterval(timer);
  };
  //鼠標離開,自動撥放
  banner.onmouseleave = function () {
    //先關掉防止用戶頻繁的點擊
    clearInterval(timer);
    //這邊的var宣告不能加,會變成局部變量,就clear不掉了
    timer = setInterval(right_btn_handler, 2000);
  };
})();
