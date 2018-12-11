const MyAlert = {}

MyAlert.loading = () => {
    var index = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
}
MyAlert.clear = () => {
    var index = layer.closeAll();
}
MyAlert.success = (str) => {
    layer.msg(str, {time: 1500, icon: 6});
}
MyAlert.fail = (str) => {
    layer.msg(str, {time: 1500, icon: 5});
}
MyAlert.confirm = (str) => {
    return new Promise(res => {
        layer.confirm(str, {
            btn: ['确定', '取消'] //按钮
        }, function () {
            return res(true)
        }, function () {
            return res(false)
        });
    })

}
export default MyAlert