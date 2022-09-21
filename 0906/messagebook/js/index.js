function sendUrl(url, method) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: method,
            async: true,
            success: function (data) {
                if (data.code == 0) {
                    resolve(data.rows);
                }
            }
        })
    })
}

function send(url, method) {
    sendUrl(url, method).then(data => disposeData(data));
    
}

// 处理数据
function disposeData(data) {
    // TODO 
    console.log("开始");
    let tbody = document.createElement("tbody");
    for (let i = 0; i < data.length; i ++) {
        const curr = data[i];
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        $(th).attr("scope", "row");
        $(th).text(i);
        $(tr).append(th);
        let td = document.createElement("td");
        $(td).text(curr.userid);
        $(tr).append(td);
        $(td).text(curr.createDatetime);
        $(tr).append(td);
        $(td).text(curr.ip);
        $(tr).append(td);
        $(td).text(curr.title);
        $(tr).append(td);
        $(td).text(curr.plate);
        $(tr).append(td);
        let img = document.createElement("img");
        // img.attr("src", "http:192.168.50.70:8081/images/emo/" + curr.emotion)
        $(td).append(img);
        $(tr).append(td);
        $(tbody).append(tr);
    }
    $(".table").append(tbody)
    console.log("结束");
}

function send(url, method) {
    
}