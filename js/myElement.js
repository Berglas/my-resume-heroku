$(function() {
    //將myTable隱藏欄位設為隱藏
    $(".myTable tr td[data-hidden='true'],th[data-hidden='true']").hide();

    //限制myNumberBox的min、max值
    $(".myNumberBox").on('change', function(e) {
        //非數字時(true)將值設為min。
        if (!this.value) {
            this.value = this.min;
        } else {
            if (parseInt(this.value, 0) > parseInt(this.max, 0)) {
                this.value = this.max;
            }

            if (parseInt(this.value, 0) < parseInt(this.min, 0)) {
                this.value = this.min;
            }
        }
    })

    //#region 初始化myWindowns
    $(".myWindows").each(function(e) {
        $('#' + $(".myWindows")[e].id).append("<div class='close-icon'></div>");
        $('#' + $(".myWindows")[e].id).after("<div id='" + $(".myWindows")[e].id + "_mask'></div>");
        $(".myWindows .close-icon").on('click', function(e) {
            $('#' + $(".myWindows .close-icon").parent('.myWindows')[0].id).myWindows('close');
        });
    });
    //#endregion

    //初始化myPagination
    $(".myPagination li a").on('click', function(e) {
        var nowIndex = $(".myPagination")[0].getAttribute('data-index') * 1;

        if (this.getAttribute('data-type') == "Previous") {
            if (nowIndex - 1 >= 1) {
                $(".myPagination li a:eq(" + nowIndex + ")")[0].classList.remove('active');
                $(".myPagination")[0].setAttribute('data-index', nowIndex - 1);
                $(".myPagination li a:eq(" + (nowIndex - 1) + ")")[0].classList.add('active');
            }
        } else if (this.getAttribute('data-type') == "Next") {
            if (nowIndex + 1 <= $(".myPagination")[0].getAttribute('data-max') * 1) {
                $(".myPagination li a:eq(" + nowIndex + ")")[0].classList.remove('active');
                $(".myPagination")[0].setAttribute('data-index', nowIndex + 1);
                $(".myPagination li a:eq(" + (nowIndex + 1) + ")")[0].classList.add('active');
            }
        } else {
            $(".myPagination li a:eq(" + nowIndex + ")")[0].classList.remove('active');
            $(".myPagination")[0].setAttribute('data-index', this.getAttribute('data-type'));
            this.classList.add('active');
        }
    });
})

//myTable function
//function name："loadData"、"getSelect","appendRow"
$.fn.myTable = function(functionName, Data) {
    var id = "#" + this[0].id;
    var column_item = $(id + " tr th");
    var columnContent = [];
    var columnType = []; //儲存欄位屬性

    //讀取欄位名稱
    for (var i = 0; i < column_item.length; i++) {
        var type = "";
        type += " data-column='" + column_item[i].getAttribute("data-column") + "' ";
        type += column_item[i].getAttribute("data-hidden") == null ? "" : "data-hidden='" + column_item[i].getAttribute("data-hidden") + "' ";
        type += column_item[i].getAttribute("data-reanalysis") == null ? "" : "data-reanalysis='" + column_item[i].getAttribute("data-reanalysis") + "' ";
        if (column_item[i].getAttribute("data-column")) {
            columnType.push(type);
            columnContent.push(column_item[i].getAttribute("data-column"));
        }
    }

    if (functionName == "loadData") {
        var content = ""; //生成HTML內容

        if (Data.length > 0) {
            for (var i = 0; i < Data.length; i++) {
                for (var j = 0; j < columnContent.length; j++) {
                    var reanalysis = false; //再分析判斷

                    if (j == 0) {
                        content += "<tr name='content' data-index='" + i + "'>";
                    }

                    for (var k = 0; k < columnType[j].split(' ').length; k++) {
                        if (columnType[j].split(' ')[k] == "data-reanalysis='true'") {
                            reanalysis = true;
                        }
                    }
                    if (reanalysis) {
                        var _jsonPD = JSON.parse(Data[i][columnContent[j]]);
                        if (i == 0) {
                            $(id + " tr:first th[data-dynamic='true']").remove();
                        }
                        for (var l = 0; l < _jsonPD.Content.length; l++) {
                            content += "<td data-column='" + _jsonPD.Content[l]["ItemName"] + "'>" + _jsonPD.Content[l]["Value"] + "</td>";
                            if (i == 0) {
                                $(id + " tr:first").append("<th data-dynamic='true'>" + _jsonPD.Content[l]["ItemName"] + "</th>");
                            }
                        }
                    } else {
                        content += "<td " + columnType[j] + ">" + Data[i][columnContent[j]] + "</td>";
                    }
                    if (j == columnContent.length) {
                        content += "</tr>";
                    }
                }
            }

            $(id + " tr[name='noData']").remove();
            $(id + " tr[name='content']").remove();
            $(id).append(content);
        } else {
            $(id + " tr[name='content']").remove();
            $(id + " tr[name='noData']").remove();
            $(id).append("<tr name='noData'><td>查無資料</td></tr>");
        }

        //onclick Row事件(改變選擇Row的顏色、暫存選擇Row的index)
        $(id).on('mousedown', 'tr', function(e) {
            if (this.getAttribute("data-index") != null) {
                var selectNo = parseInt($(id)[0].getAttribute("data-select"));
                if (isNaN(selectNo)) {} else {
                    $(id + " tr")[selectNo + 1].classList.remove("table-select");
                }

                $(id)[0].setAttribute("data-select", this.getAttribute("data-index"));
                this.classList.add("table-select");
            }
        });

        //將data-hidden='true'之欄位設為隱藏
        $(".myTable tr td[data-hidden='true'],th[data-hidden='true']").hide();
    } else if (functionName == "getSelect") {
        var select = $(id + " tr[data-index=" + $(id)[0].getAttribute("data-select") + "] td");
        var columnArray = [];
        for (var i = 0; i < select.length; i++) {
            columnArray[select[i].getAttribute("data-column")] = select[i].innerHTML;
        }

        return columnArray;
    } else if (functionName == "appendRow") {

        var content = ""; //生成HTML內容
        var dataIndex = 0;
        if ($(id + " tr:last")[0].getAttribute("data-index") != null) {
            dataIndex = parseInt($(id + " tr:last")[0].getAttribute("data-index")) + 1;
        }

        for (var j = 0; j < columnContent.length; j++) {
            if (j == 0) {
                content += "<tr name='content' data-index='" + dataIndex + "'>";
            }
            content += "<td " + columnType[j] + ">" + Data[columnContent[j]] + "</td>";
            if (j == columnContent.length) {
                content += "</tr>";
            }
        }
        $(id).append(content);

        //onclick Row事件(改變選擇Row的顏色、暫存選擇Row的index)
        $(id).on('mousedown', 'tr', function(e) {
            if (this.getAttribute("data-index") != null) {
                var selectNo = parseInt($(id)[0].getAttribute("data-select"));
                if (isNaN(selectNo)) {} else {
                    $(id + " tr")[selectNo + 1].classList.remove("table-select");
                }

                $(id)[0].setAttribute("data-select", this.getAttribute("data-index"));
                this.classList.add("table-select");
            }
        });

        //將data-hidden='true'之欄位設為隱藏
        $(".myTable tr td[data-hidden='true'],th[data-hidden='true']").hide();
    }
}

$.fn.myDropDownList = function(functionName, data) {
    var id = "#" + this[0].id;

    if (functionName == "loadData") {
        var optionHtml = "";
        for (var i = 0; i < data.length; i++) {
            optionHtml += "<option value='" + data[i]["value"] + "'>" + data[i]["text"] + "</option>";
        }

        $(id).html(optionHtml);
    } else if (functionName == "getValue") {
        return $(id + " option:selected").val();
    } else if (functionName == "setValue") {
        $(id).val(data);
    }
}

$.fn.myPagination = function(functionName) {
    var id = "#" + this[0].id;
    if (functionName == "getIndex") {
        return $(id)[0].getAttribute("data-index");
    }
}

//myDropDownList function
//function name："open"、"close"
$.fn.myWindows = function(functionName, list) {
    var id = "#" + this[0].id;
    if (functionName == "open") {
        $(id).show();
        document.body.parentNode.style.overflow = "hidden";
        $(id + '_mask')[0].classList.add("mask");
    } else if (functionName == "close") {
        $(id).hide();
        document.body.parentNode.style.overflow = "auto";
        $(id + '_mask')[0].classList.remove("mask");
    } else if (functionName == "center") {
        $(id).css("left", "50%");
        $(id).css("top", "50%");
        $(id).css("margin-left", "-" + $(id).width() / 2 + "px");
        $(id).css("margin-top", "-" + $(id).height() / 2 + "px");
    }
}

//myWindows拖曳事件
// $(function () {
//    $('.myWindows').mousedown(function () {
//        recordPos(this);
//    });

//    $('.myWindows').mouseup(function () {
//        f = false;
//    });

//    $('.myWindows').mousemove(function () {
//        myWindowsMove(event, this);
//    });

//    var f = false;
//    var fy = 0;
//    var fx = 0;

//    function recordPos(e) {
//        f = true;
//        fx = e.clientX;
//        fy = e.clientY;
//    }

//    function myWindowsMove(e,obj) {
//        if (!f) return;
//        var deltaX = e.clientX - fx;
//        var deltaY = e.clientY - fy;        
//        recordPos(e);
//        obj.style.left = parseInt(obj.style.left) + deltaX;
//        obj.style.top = parseInt(obj.style.top) + deltaY;
//    }
// })