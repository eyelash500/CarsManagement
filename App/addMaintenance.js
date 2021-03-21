$(function () {
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
        var birthday = new Date($("#birthday").prop("value"));
        var years = today.getFullYear() - birthday.getFullYear();

        // Reset birthday to the current year.
        birthday.setFullYear(today.getFullYear());

        // If the user's birthday has not occurred yet this year, subtract 1.
        if (today < birthday) {
            years--;
        }
        $("#age").prop("value", years);
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
                    prompt: '請輸入時間'
                }]
            },
            // gender: {
            //     identifier: 'gender',
            //     rules: [{
            //         type: 'empty',
            //         prompt: '請輸入性別'
            //     }]
            // },
            date: {
                identifier: "date",
                rules: [{
                    type: 'regExp',
                    value: /[1,2][9,0]\d{2}-\d{1,2}-\d{1,2}/i,
                    prompt: '請輸入日期'
                }]
            },
            money: {
                identifier: "repairMoney",
                // optional: true,
                rules: [{
                    type: "integer[0..500000]",
                    prompt: "最高金額：500000"

                }]
            }
        },
        onSuccess: function () {
            $.ajax({
                url: "./Controllers/addMaintenance.php",
                type: "POST",
                dataType: "text",
                data: {
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
                    RepairDate: $("#repairDate").val(),
                    RepairItem: $("#repairItem").val(),
                    RepairMoney: $("#repairMoney").val(),
                    RepairDetail: $("#repairDetail").val(),
                    IsGetMoney: $("#isGetMoney").prop("checked"),
                    Remark:$("#remark").val(),
                    UserID: "boss"
                },
                success: function (r) {
                    if (r == 1) {
                        alert("新增成功");
                        window.location.replace = "./maintenance.html";
                    }
                    else {
                        alert("新增失敗");
                    }
                },
                error: function (r) {
                    console.log("r:" + r);
                    alert("系統發生錯誤");
                }
            })
        }
    });


})