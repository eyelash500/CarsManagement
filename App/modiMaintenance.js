$(function () {
    var m_id = 0;    
    setData();
    $(".ui.sticky").sticky();
    $(".ui.dropdown").dropdown();
    $(".ui.toggle.checkbox").checkbox();
    $('#manufactureDate').calendar({
        type: 'month',
        formatter: {
            date: function (date, settings) {
                if (!date) return '';
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                return year + "-" + month;
            }
        },
        text: {
            monthsShort: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
    });

    //func:dropdown
    //brand
    $("#vehicleBrand").change(function () {
        if ($("#vehicleBrand").val() == 'O') {
            $("#otherBrand").prop("hidden", false);
        }
        else {
            $("#otherBrand").prop("hidden", true);
        }
    });

    var today = new Date();
    $('.ui.dateCalendar.calendar').calendar({
        type: 'date',
        today: true,
        formatter: {
            date: function (date, settings) {
                if (!date) return '';
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                return year + "-" + month + "-" + day;
            }
        },
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        text: {
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            today: "今天"
        }
    });
    $("#birthday").on("blur", function (e) {
        var age = getAge();
        $("#age").prop("value", age);
    });

    $('.ui.form').form({
        on: 'blur',
        fields: {
            plateNumber: {
                identifier: 'plateNumber',
                rules: [{
                    type: 'empty',
                    prompt: '請輸入車牌'
                }]
            },
            date_month: {
                rules: [{
                    type: 'regExp',
                    value: /[1,2][9,0]\d{2}-\d{1,2}/i,
                    prompt: '請選擇日期'
                }]
            },
            date: {
                identifier: "date",
                rules: [{
                    type: 'regExp',
                    value: /[1,2][9,0]\d{2}-\d{1,2}-\d{1,2}/i,
                    prompt: '請選擇日期'
                }]
            },
            money: {
                identifier: "maintenanceMoney",
                // optional: true,
                rules: [{
                    type: "integer[0..500000]",
                    prompt: "最高金額：500000"

                }]
            }
        },
        onSuccess: function () {
            $.ajax({
                url: "./Controllers/modiMaintenance.php",
                type: "POST",
                dataType: "text",
                data: {
                    ID: m_id,
                    PlateNO: $("#plateNumber").val(),
                    VehicleBrand: $("#vehicleBrand").val(),
                    VehicleProduct: $("#vehicleProduct").val(),
                    OtherBrand: $("#otherBrand").val(),
                    VehicleManufactureDate: $("#vehicleManufactureDate").val(),
                    CustomerName: $("#customerName").val(),
                    Gender: $("#gender").val(),
                    Birthday: $("#birthday").val(),
                    Address: $("#address").val(),
                    Cellphone: $("#cellphone").val(),
                    Telephone: $("#telephone").val(),
                    Date: $("#maintenanceDate").val(),
                    Item: $("#maintenanceItem").val(),
                    Money: $("#maintenanceMoney").val(),
                    Detail: $("#maintenanceDetail").val(),
                    IsGetMoney: $("#isGetMoney").prop("checked"),
                    Remark:$("#remark").val(),
                    UserID: "boss"
                },
                success: function (r) {
                    if (r == 1) {
                        alert("修改成功");
                        window.location.replace = "./maintenance.html";
                    }
                    else {
                        alert("修改失敗");
                    }
                },
                error: function (r) {
                    console.log("r:" + r);
                    alert("系統發生錯誤");
                }
            })
        }
    });

    function setData() {
        var id = getUrlInfo("id");
        m_id = id;
        $.ajax({
            url: "./Controllers/getMaintenanceOneData.php",
            type: "POST",
            dataType: "json",
            data: {
                ID: id
            },
            success: function (r) {
                $("#plateNumber").prop("value", r[0]["PlateNO"]);
                $("#vehicleBrand").dropdown("set selected", r[0]["Brand"]);
                $("#vehicleProduct").prop("value", r[0]["Product"]);
                $("#vehicleManufactureDate").prop("value", r[0]["PlateNO"]);
                $("#customerName").prop("value", r[0]["CustomerName"]);
                $("#gender").dropdown("set selected", r[0]["Gender"]);
                $("#birthday").prop("value", r[0]["Birthday"]);
                $("#address").prop("value", r[0]["Address"]);
                $("#cellphone").prop("value", r[0]["CellPhone"]);
                $("#telephone").prop("value", r[0]["Phone"]);
                $("#maintenanceDate").prop("value", r[0]["MaintenanceDate"]);
                $("#maintenanceItem").prop("value", r[0]["MaintenanceItem"]);
                $("#maintenanceMoney").prop("value", r[0]["Money"]);
                $("#maintenanceDetail").prop("value", r[0]["Detail"]);
                $("#isGetMoney").prop("checked", r[0]["IsPayment"] == 1 ? true : false);
                $("#remark").prop("value", r[0]["Remark"])
                $("#age").prop("value", getAge());
            },
            error: function (r) {
                console.log("r:" + r);
                alert("系統發生錯誤");
            }
        })

    }

    function getAge() {
        var birthday = new Date($("#birthday").prop("value"));
        var years = today.getFullYear() - birthday.getFullYear();

        // Reset birthday to the current year.
        birthday.setFullYear(today.getFullYear());

        // If the user's birthday has not occurred yet this year, subtract 1.
        if (today < birthday) {
            years--;
        }
        return years;
    }

    function getUrlInfo(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var urlStr = decodeURIComponent(window.location);
        // console.log(urlStr);
        var r = urlStr.match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;

    }
})