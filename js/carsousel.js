//輪播圖特效 IIFE立即調用函數怕去汙染全局變數
(function(){
    //得到html元素
    var carsousel_list = document.getElementById('carsousel_list');
    var left_btn = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');

    //克隆第一張li 這時還是孤兒節點
    var clone_li = carsousel_list.firstElementChild.cloneNode(true);
    //添加上樹
    carsousel_list.appendChild(clone_li);
    //當前顯示的圖片編號是0
    var idx = 0;

    //右按鍵是件監聽
    right_btn.onclick = function(){
        //加上過渡效果因為輪迴第一張時會刪除屬性
        carsousel_list.style.transition = 'transform .5s ease 0s';
        //idx+1
        idx++;
        //輪播
        carsousel_list.style.transform ='translateX('+ -16.66 * idx +'%)';
        //判斷是否是最後一張如果是 就傳回第一張
        if(idx > 4){
            setTimeout(function(){
                //去掉過渡動畫屬性
                carsousel_list.style.transition = 'none';
                carsousel_list.style.transform = 'none';
                //讓突變再次回到編號0的圖片再次輪播
                idx = 0;

            }, 500)
        }
    };

    //左按鈕事件監聽
    left_btn.onclick = function(){
        if(idx == 0){
            //瞬間拉到最後面
            carsousel_list.style.transition = 'none';
            //拉到最後面
            carsousel_list.style.transform ='translateX('+ -16.66 * 5 +'%)';


            //這邊加上延時0毫秒可以讓上面瞬間拉到最後面後在把過渡屬性加上
            setTimeout(function(){
                //加上過渡
                carsousel_list.style.transition = 'transform .5s ease 0s';
                //動畫
                carsousel_list.style.transform ='translateX('+ -16.66 * 4 +'%)';
                //改變idx值
                idx = 4;

            }, 0);
        }else{
            idx --;
            //拉動
            carsousel_list.style.transform ='translateX('+ -16.66 * idx +'%)';
        }
    }


})();