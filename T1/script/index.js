$(function () {
    var order_time = null;

    // 獲取日期數據
    fetch('config.json')
        .then((response) => response.json())
        .then((data) => {
            runTime(data.date);
            $('.tips').text(data.date); // 顯示日期提示
        });

    // 時間計算
    function endTime(endDate) {
        var leftTime = new Date(endDate) - new Date(); //計算剩餘的毫秒數
        if (leftTime <= 0) {
            window.location.href = '../index3.html';
        } else if (leftTime <= 10000) {
            window.location.href = '../index2.html';
        }

        var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //計算剩餘的天數
        var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10); //計算剩餘的小時
        var minutes = parseInt((leftTime / 1000 / 60) % 60, 10); //計算剩餘的分鐘
        var seconds = parseInt((leftTime / 1000) % 60, 10); //計算剩餘的秒數
        days = checkTime(days);
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) {
            $('p.day').text(days);
            $('p.hour').text(hours);
            $('p.min').text(minutes);
            $('p.sec').text(seconds);
        }
    }

    function checkTime(i) {
        //將0-9的數字前面加上0，例1變為01
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

    // 刷新時間
    function runTime(time) {
        var futureDate = new Date(time);

        if (new Date(time) - new Date() <= 0) {
            window.location.href = '../index3.html';
        }

        order_time = setInterval(function () {
            endTime(futureDate);
        }, 1000);
    }
});
