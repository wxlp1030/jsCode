function getData(u) {
    return new Promise(
        (resolve, reject) => {
            $.ajax({
                url: u,
                method: "GET",
                async: true,
                success: function (data) {
                    resolve(data);
                }
            })
        })
    
}

function view(url, type) {
    getData(url).then(data => disposeData(data, type))
}

function disposeData(data, type) {
    if (type == 1) {
        const item = data.getElementsByTagName("item");
        $("#box").addClass("row");
        $("#box").css('justify-content', "space-between");
        $("#box").css('flex-wrap', "wrap-reverse");
        for (let i = 0; i < 4; i++) {
            // 创建单个卡片div对象
            let div = document.createElement("div");
            $(div).addClass("card border-success mb-3 col-sm-2");
            $(div).css('display', "flex");
            $(div).css('justify-content', "space-between");
            $(div).css('order', (i + 1) % 2);
            $(div).css('height', "270px");
            const ch = item[i].children;
            let title, link, description, author, pubDate;
            for (let j = 0; j < ch.length; j++) {
                switch (ch[j].tagName) {
                    case 'title':
                        title = ch[j].textContent;
                        break;
                    case 'link':
                        link = ch[j].textContent;
                        break;
                    case 'description':
                        description = ch[j].textContent;
                        break;
                    case 'dc:creator':
                        author = ch[j].textContent;
                        break;
                    case 'pubDate':
                        const date = new Date(ch[j].textContent);
                        console.log(date);
                        pubDate = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
                        break;
                }
            }
            let header = document.createElement("div");
            $(header).addClass("card-header bg-transparent border-success");
            $(header).text(title);
            let content = document.createElement("div");
            $(content).addClass("card-body text-success");
            let h5 = document.createElement("h5");
            $(h5).addClass("card-title");
            let a = document.createElement("a");
            $(a).attr('href', link);
            $(a).text(title);
            $(h5).append(a);
            let text = document.createElement("p");
            $(text).addClass("card-text");
            $(text).text(description);
            $(content).append(h5);
            $(content).append(text);
            let footer = document.createElement("div");
            $(footer).addClass("card-footer bg-transparent border-success");
            $(footer).css("text-align", "center")
            $(footer).text(author + "  " +pubDate);
            $(div).append(header);
            $(div).append(content);
            $(div).append(footer);
            $("#box").append(div);
        }
        return box;
    } else if (type == 0) {
        return JSON.stringify(data);
    }
}