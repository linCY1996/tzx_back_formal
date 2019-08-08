// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
const server = 'formal'
window.onload = function () {
    function GetParameters(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);//解决中文乱码

        } else {
            return null;
        }
    }
    var token = GetParameters('token')
    // var is_super = GetParameters('is_super')
    var zx = new Vue({
        el: '#tall',
        data: {
            all: 1, //总页数
            cur: 1,//当前页码
            total: 9,
            nick_Name:'',
            list: [],   //注册信息列表
            loadings:true,
        },
        methods: {
            // 显示用户注册信息列表
            showMsgs: function (pindex, psize) {
                var that = this
                axios.post(host + '/route/v1/api/bw/list', {
                    page: {
                        page_index: pindex,
                        page_size: psize
                    },
                    server: server,
                    token: token
                }).then((res) => {
                    zx.loadings = false
                    var list = res.data.Body.list
                    var ls = []
                    for (var i = 0; i < list.length; i++) {
                        ls.push({
                            index: i,
                            id: list[i].uid,
                            nickName: list[i].nick_name,
                            time:that.getLocalTime(list[i].time)
                        })
                    }
                    zx.list = ls
                    zx.total = res.data.Body.pager.total  //
                    if (zx.total % 50 != 0) {
                        zx.all = parseInt(zx.total / 50) + 1
                    } else {
                        zx.all = parseInt(zx.total / 50)
                    }
                })
            },
            // 格式时间
            getLocalTime: function (nS) {
                return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
            },
            format: function (time, format) {
                var t = new Date(time);
                var tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                };
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                        case 'yyyy':
                            return tf(t.getFullYear());
                            break;
                        case 'MM':
                            return tf(t.getMonth() + 1);
                            break;
                        case 'mm':
                            return tf(t.getMinutes());
                            break;
                        case 'dd':
                            return tf(t.getDate());
                            break;
                        case 'HH':
                            return tf(t.getHours());
                            break;
                        case 'ss':
                            return tf(t.getSeconds());
                            break;
                    }
                })
            },
            //页码点击事件
            btnClick: function (e) {
                var that = this
                that.showMsgs(e, 50)
                if (e != this.cur) {
                    this.cur = e
                }
            },
            pageClick: function () {
                var that = this
                that.showMsgs(this.cur, 50)
            },
            // 查询
            looks: function () {
                window.location.href = '/lookWhite?token='+token+'&nick_Name='+zx.nick_Name
            },
            // 添加白名单用户
            btns:function () {
                window.location.href = '/addwhiteName?token='+token
            }
        },
        mounted() {
            this.showMsgs(50, 1)
        },
        computed: {
            indexs: function () {
                var left = 1;
                var right = this.all;
                var ar = [];
                if (this.all >= 5) {
                    if (this.cur > 3 && this.cur < this.all - 2) {
                        left = this.cur - 2
                        right = this.cur + 2
                    } else {
                        if (this.cur <= 3) {
                            left = 1
                            right = 5
                        } else {
                            right = this.all
                            left = this.all - 4
                        }
                    }
                }
                while (left <= right) {
                    ar.push(left)
                    left++
                }
                return ar
            }
        },
    })
}