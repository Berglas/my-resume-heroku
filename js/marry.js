var color = {
    select: 'rgb(252, 49, 83)',
    background: 'rgb(220, 220, 220)'
};

var times = Math.floor(Math.random() * 100);
var i = 0;

//機率
//5(bar):兩個,4(seven):六個,3(pear):十二個,2(banana):十七個,1(orange):二十三個,0(cherry):四十個
var rateArray = [
    5, 1, 2, 0, 0, 3, 0, 2, 1, 3,
    1, 2, 1, 1, 0, 0, 2, 0, 4, 0,
    0, 1, 3, 0, 1, 0, 0, 3, 0, 1,
    3, 2, 4, 1, 0, 3, 2, 0, 1, 2,
    0, 0, 1, 0, 0, 0, 4, 0, 1, 3,
    0, 2, 0, 0, 0, 2, 1, 1, 0, 2,
    1, 1, 0, 3, 1, 0, 1, 0, 4, 2,
    3, 4, 2, 0, 0, 4, 1, 0, 2, 0,
    0, 2, 0, 1, 1, 0, 2, 0, 3, 2,
    2, 0, 3, 1, 0, 0, 3, 1, 0, 5
];

//UI 顯示分別個數
//5(bar):一個,4(seven):兩個,3(pear):三個,2(banana):五個,1(orange):六個,0(cherry):七個
var imgArray = [
    0, 1, 4, 0, 1, 3,
    1, 2, 0, 1, 0, 2,
    0, 3, 2, 4, 5, 1,
    2, 1, 0, 3, 0, 2
]

//setting UI item img
$(function() {
    for (var a = 0; a < imgArray.length; a++) {
        if (imgArray[a] == 5) {
            $('#item' + a)[0].classList.add('img-bar');
            $('#item' + a)[0].setAttribute('name', '5');
        } else if (imgArray[a] == 4) {
            $('#item' + a)[0].classList.add('img-seven');
            $('#item' + a)[0].setAttribute('name', '4');
        } else if (imgArray[a] == 3) {
            $('#item' + a)[0].classList.add('img-pear');
            $('#item' + a)[0].setAttribute('name', '3');
        } else if (imgArray[a] == 2) {
            $('#item' + a)[0].classList.add('img-banana');
            $('#item' + a)[0].setAttribute('name', '2');
        } else if (imgArray[a] == 1) {
            $('#item' + a)[0].classList.add('img-orange');
            $('#item' + a)[0].setAttribute('name', '1');
        } else if (imgArray[a] == 0) {
            $('#item' + a)[0].classList.add('img-cherry');
            $('#item' + a)[0].setAttribute('name', '0');
        }
    }
});

function startGame() {
    if (bar_count + seven_count + pear_count + banana_count + orange_count + cherry_count == 0) {
        alert("請先下注");
    } else {
        if (chip_count <= 0) {
            alert("資金不足!無法繼續遊玩");
        } else {
            bet_count_temp();
            chip_count = chip_count_temp;
            $('#start_btn').prop('disabled', true);
            $('#auto_cb').prop('disabled', true);
            $('#start_btn')[0].classList.add('active');
            var count = setInterval(function() {
                if (i > 48) {
                    if ($('#item' + (i % 24))[0].getAttribute('name') != rateArray[times].toString()) {
                        $('#item' + (i % 24))
                            .animate({ backgroundColor: color.select }, 100)
                            .animate({ backgroundColor: color.background }, 100);
                        i++;
                    } else {
                        $('#item' + (i % 24))
                            .animate({ backgroundColor: color.select }, 100)
                            .animate({ backgroundColor: color.background }, 100)
                            .animate({ backgroundColor: color.select }, 100)
                            .animate({ backgroundColor: color.background }, 100)
                            .animate({ backgroundColor: color.select }, 100)
                            .animate({ backgroundColor: color.background }, 100)
                            .animate({ backgroundColor: color.select }, 100);
                        i = i % 24;
                        setTimeout(function() {
                            times = Math.floor(Math.random() * 100);

                        }, 500)
                        clearInterval(count);
                        bet_count(rateArray[times]);
                        $('#start_btn').prop('disabled', false);
                        $('#auto_cb').prop('disabled', false);
                        $('#start_btn')[0].classList.remove('active');
                    }
                } else {
                    $('#item' + (i % 24))
                        .animate({ backgroundColor: color.select }, 300)
                        .animate({ backgroundColor: color.background }, 300);
                    i++;
                }

            }, 100);
        }
    }
}

var bar_count = 0;
var seven_count = 0;
var pear_count = 0;
var banana_count = 0;
var orange_count = 0;
var cherry_count = 0;
var chip_count = 2000;
var chip_count_temp = 2000;

$(function() {
    bet_setting('bet-bar', bar_count);
    bet_setting('bet-seven', seven_count);
    bet_setting('bet-pear', pear_count);
    bet_setting('bet-banana', banana_count);
    bet_setting('bet-orange', orange_count);
    bet_setting('bet-cherry', cherry_count);
    chip_setting(chip_count);
});

function add(id) {
    switch (id) {
        case 'bet-bar':
            if (bar_count >= 40) {

            } else {
                if (chip_count_temp < 5) {
                    alert("資金不足!無法進行加注");
                } else {
                    bar_count++;
                    bet_setting(id, bar_count);
                    bet_count_temp();
                }
            }
            break;

        case 'bet-seven':
            if (seven_count >= 40) {

            } else {
                if (chip_count_temp < 5) {
                    alert("資金不足!無法進行加注");
                } else {
                    seven_count++;
                    bet_setting(id, seven_count);
                    bet_count_temp();
                }
            }
            break;

        case 'bet-pear':
            if (pear_count >= 40) {

            } else {
                if (chip_count_temp < 5) {
                    alert("資金不足!無法進行加注");
                } else {
                    pear_count++;
                    bet_setting(id, pear_count);
                    bet_count_temp();
                }
            }
            break;

        case 'bet-banana':
            if (banana_count >= 40) {

            } else {
                if (chip_count_temp < 5) {
                    alert("資金不足!無法進行加注");
                } else {
                    banana_count++;
                    bet_setting(id, banana_count);
                    bet_count_temp();
                }
            }
            break;

        case 'bet-orange':
            if (orange_count >= 40) {

            } else {
                if (chip_count_temp < 5) {
                    alert("資金不足!無法進行加注");
                } else {
                    orange_count++;
                    bet_setting(id, orange_count);
                    bet_count_temp();
                }
            }
            break;

        case 'bet-cherry':
            if (cherry_count >= 40) {

            } else {
                if (chip_count_temp < 5) {
                    alert("資金不足!無法進行加注");
                } else {
                    cherry_count++;
                    bet_setting(id, cherry_count);
                    bet_count_temp();
                }
            }
            break;
    }
}

function minus(id) {
    switch (id) {
        case 'bet-bar':
            if (bar_count >= 1) {
                bar_count--;
                bet_setting(id, bar_count);
                bet_count_temp();

            } else {}
            break;

        case 'bet-seven':
            if (seven_count >= 1) {
                seven_count--;
                bet_setting(id, seven_count);
                bet_count_temp();

            } else {}
            break;

        case 'bet-pear':
            if (pear_count >= 1) {
                pear_count--;
                bet_setting(id, pear_count);
                bet_count_temp();

            } else {}
            break;

        case 'bet-banana':
            if (banana_count >= 1) {
                banana_count--;
                bet_setting(id, banana_count);
                bet_count_temp();

            } else {}
            break;

        case 'bet-orange':
            if (orange_count >= 1) {
                orange_count--;
                bet_setting(id, orange_count);
                bet_count_temp();

            } else {}
            break;

        case 'bet-cherry':
            if (cherry_count >= 1) {
                cherry_count--;
                bet_setting(id, cherry_count);
                bet_count_temp();

            } else {}
            break;
    }

}

var number = [
    [1, 1, 1, 0, 1, 1, 1], // 0
    [0, 0, 1, 0, 0, 1, 0], // 1
    [1, 0, 1, 1, 1, 0, 1], // 2
    [1, 0, 1, 1, 0, 1, 1], // 3
    [0, 1, 1, 1, 0, 1, 0], // 4
    [1, 1, 0, 1, 0, 1, 1], // 5
    [1, 1, 0, 1, 1, 1, 1], // 6
    [1, 0, 1, 0, 0, 1, 0], // 7
    [1, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 1, 0, 1, 1] // 9
]

function bet_setting(id, n) {
    var onesNo = number[n % 10];
    var tensNo = number[Math.floor(n / 10)];
    var j = 0;
    var onesCrystal = $('#' + id + '-ones *');
    var tensCrystal = $('#' + id + '-tens *');
    for (var j = 0; j < onesNo.length; j++) {
        if (onesNo[j] == 0) {
            onesCrystal[6 - j].style.opacity = '0.1';
        } else {
            onesCrystal[6 - j].style.opacity = '1';
        }
    }

    for (var j = 0; j < tensNo.length; j++) {
        if (tensNo[j] == 0) {
            tensCrystal[6 - j].style.opacity = '0.1';
        } else {
            tensCrystal[6 - j].style.opacity = '1';
        }
    }
}

function chip_setting(n) {
    var _this = $('#chip g');
    var digitsArray = [number[n % 10], number[Math.floor(n % 100 / 10)], number[Math.floor(n % 1000 / 100)], number[Math.floor(n % 10000 / 1000)], number[Math.floor(n / 10000)]];

    for (var j = 0; j < _this.length; j++) {

        for (var k = 0; k < digitsArray[j].length; k++) {
            if (digitsArray[j][k] == 0) {
                $(_this[j]).children('*')[6 - k].style.opacity = '0.1';
            } else {
                $(_this[j]).children('*')[6 - k].style.opacity = '1';
            }
        }

    }
}

function bet_count_temp() {
    if (chip_count <= 0) {

    } else {
        chip_count_temp = chip_count - ((bar_count + seven_count + pear_count + banana_count + orange_count + cherry_count) * 5);
        chip_setting(chip_count_temp);
    }
}

//結算賭注
function bet_count(n) {
    if (n == 5) {
        chip_count += bar_count * 100;
    } else if (n == 4) {
        chip_count += seven_count * 50;
    } else if (n == 3) {
        chip_count += pear_count * 40;
    } else if (n == 2) {
        chip_count += banana_count * 30;
    } else if (n == 1) {
        chip_count += orange_count * 20;
    } else if (n == 0) {
        chip_count += cherry_count * 10;
    }

    chip_count_temp = chip_count;
    //勾選自動下注
    if ($("input[name='auto_cb']").prop("checked")) {
        if (chip_count_temp - ((bar_count + seven_count + pear_count + banana_count + orange_count + cherry_count) * 5) < 0) {
            bar_count = 0;
            seven_count = 0;
            pear_count = 0;
            banana_count = 0;
            orange_count = 0;
            cherry_count = 0;
            bet_setting('bet-bar', bar_count);
            bet_setting('bet-seven', seven_count);
            bet_setting('bet-pear', pear_count);
            bet_setting('bet-banana', banana_count);
            bet_setting('bet-orange', orange_count);
            bet_setting('bet-cherry', cherry_count);
            chip_setting(chip_count);
            $("input[name='auto_cb']").prop("checked",false);
            alert("因資金不足，無法自動下注");
        } else {
            bet_count_temp();
        }

    } else {
        bar_count = 0;
        seven_count = 0;
        pear_count = 0;
        banana_count = 0;
        orange_count = 0;
        cherry_count = 0;
        bet_setting('bet-bar', bar_count);
        bet_setting('bet-seven', seven_count);
        bet_setting('bet-pear', pear_count);
        bet_setting('bet-banana', banana_count);
        bet_setting('bet-orange', orange_count);
        bet_setting('bet-cherry', cherry_count);
        chip_setting(chip_count);
    }

    //破產
    if (chip_count <= 0) {
        bar_count = 0;
        seven_count = 0;
        pear_count = 0;
        banana_count = 0;
        orange_count = 0;
        cherry_count = 0;
        bet_setting('bet-bar', bar_count);
        bet_setting('bet-seven', seven_count);
        bet_setting('bet-pear', pear_count);
        bet_setting('bet-banana', banana_count);
        bet_setting('bet-orange', orange_count);
        bet_setting('bet-cherry', cherry_count);
        alert("破產囉!");
        chip_setting(chip_count);
    }
}