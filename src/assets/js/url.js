export function setPageUrl(page) {
    var url = location.pathname;
    var wenhao_index = url.indexOf("?")
    if (wenhao_index = -1) {
        url = `${url}?page=${page}`

    } else {
        url = `${url}&page=${page}`
    }
    return url
}


export function getOffsetByPage(limit) {
    var limit = limit || 10
    var params = getUrlParams()
    var page = params['page'] || 1
    var offset = 0;
    if (page) {
        offset = (page - 1) * limit || 0;
    }
    return offset

}

export function getUrlParams(url) {
    var url = url || location.search || location.hash;
    var name, value;
    var str = url; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里
    var params = {}
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            params[name] = value;
        }
    }
    return params
}