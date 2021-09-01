var myArray

let dropdown = $('#dropdown');

dropdown.empty();

dropdown.prop('selectedIndex', 0);

const url = 'data.json';

// Populate dropdown with list of provinces
$.getJSON(url, function (data) {
    $.each(data, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', entry.KhoaQLHP).text(entry.KhoaQLHP));
    })
});

fetch("data.json")
    .then(response => response.json())
    .then(data => myArray = data)
    .then(() => {


        var firstIndex = "Khoa Sư phạm"
        buildTable(firstIndex, myArray)

        $('#dropdown').on('change', function () {
            var e = document.getElementById("dropdown");
            var selected = e.value;
            buildTable(selected, myArray)
        });


        $('#search-input').on('change paste keyup', function () {
            var value = nonAccentVietnamese($(this).val()) 
            var e = document.getElementById("dropdown");
            var selected = nonAccentVietnamese(e.value)
            var data = searchTable(selected, value, myArray)
            console.log(data)
            resultSearchTable(data)
        })

        function nonAccentVietnamese(str) {
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
            str = str.replace(/Đ/g, "D");
            // Some system encode vietnamese combining accent as individual utf-8 characters
            // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
            str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
            // Remove extra spaces
            // Bỏ các khoảng trắng liền nhau
            str = str.replace(/ + /g, " ");
            str = str.trim();
            return str;
        }


        function searchTable(selected, value, data) {
            var filteredData = []
            selected = selected.toLowerCase()
            for (var i = 0; i < data.length; i++) {
                var name = nonAccentVietnamese(data[i].KhoaQLHP.toLowerCase())
                if (name.indexOf(selected) > -1) {
                    var check = data[i].data
                    for (var j = 0; j < check.length; j++) {
                        var result = nonAccentVietnamese(check[j].tenhp) 
                        value = value.toLowerCase()
                        if (result.indexOf(value) >= 0) {
                            console.log(result)
                            console.log(value)
                            filteredData.push(data[i].data[j])
                        }
                    }
                }
            }
            return filteredData
        }

        function resultSearchTable(data) {
            var table = document.getElementById('myTable')
            table.innerHTML = ''
            for (var i = 0; i < data.length; i++) {
                var row = `<tr>
                                <td>${data[i].malhp}</td>
                                <td>${data[i].tenhp}</td>
                                <td>${data[i].tengvgd}</td>
                                <td><a href="${data[i].loptructuyen}">Vào học</a></td>
                           </tr>`
                table.innerHTML += row
            }
        }



        function buildTable(selected, data) {
            var table = document.getElementById('myTable')
            table.innerHTML = ''
            for (var i = 0; i < data.length; i++) {
                selected = selected.toLowerCase()
                var name = data[i].KhoaQLHP.toLowerCase()
                if (name.indexOf(selected) > -1) {
                    var result = data[i].data;
                    for (var j = 0; j < result.length; j++) {
                        var row = `<tr>
                            <td>${result[j].malhp}</td>
                            <td>${result[j].tenhp}</td>
                            <td>${result[j].tengvgd}</td>
                            <td><a href="${result[j].loptructuyen}">Vào học</a></td>
                       </tr>`
                        table.innerHTML += row
                    }
                }
            }
        }
    })