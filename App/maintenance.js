$(function () {
    // checkLoginOrNot(sessionStorage.getItem("userid"));
    var today = new Date();
    $(".ui.dateCalendar.calendar").calendar({
        type: "date",
        today: true,
        formatter: {
            date: function (date, settings) {
                if (!date) return "";
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                return year + "/" + month + "/" + day;
            }
        },
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        text: {
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            today: "今天"
        }
    });

    $("#btn_search").click(function () {
        $.ajax({
            url: "./Controllers/GetMaintenanceList.php",
            type: "POST",
            dataType: "json",
            data: {
                Plate_NO: $("#search_plateNO").val(),
                Date: $("#search_date").val()
            },
            success: function (r) {
                // console.log("data:" + r);
                $("#tbMaintenanceList").empty();
                var maintenanceList = "";
                for (var key in r) {
                    var type = "";
                    switch(r[key]["RepairItem"]){
                        case "w":
                            type= "輪胎類";
                            break;
                        case "b":
                            type= "燈泡類";
                            break;
                        case "o":
                            type= "機油類";
                            break;
                        case "c":
                            type= "椅子類";
                            break;
                        case "z":
                            type= "其他類";
                            break;
                    }

                    maintenanceList += "<tr>";
                    maintenanceList += "<td>" + r[key]["MaintenanceDate"] + "</td>";
                    maintenanceList += "<td>" + r[key]["PlateNO"] + "</td>";
                    maintenanceList += "<td>" + r[key]["RepairItem"] + "</td>";
                    maintenanceList += "<td>" + r[key]["Detial"] + "</td>";
                    maintenanceList += "<td>" + r[key]["Money"] + "</td>";
                    maintenanceList += "<td><button type='button' class='ui green button btnLookup' value='" + r[key]["ID"] + "' >查看</button></td>";
                    maintenanceList += "</tr>";
                }
                $("#tbMaintenanceList").append(maintenanceList);
            },
            error: function (r) {
                console.log("error:" + r);
            }
        })
    })

})