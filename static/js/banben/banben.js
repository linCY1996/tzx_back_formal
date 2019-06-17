// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var token = location.search.replace('?token=', "")
    var np = new Vue({
        el: '#tall',
        data: {
            tan_show_list: false,
            all: 1, //总页数
            cur: 1,//当前页码
            total: 0,
            banben: [],  //版本列表
            checkId: [],  //选择
            tan_show: false,   //弹窗
            Id: -1,    //点击删除得Id
        },
        methods: {
            viewbanben: function () {
                var that = this
                axios.post(host + '/route/v1/api/version/list', {
                    page: {
                        page_index: 1,
                        page_size: 50
                    },
                    server: server,
                    token: token
                }).then((res) => {
                    console.log(res.data.Body)
                    // var t = Date(time)
                    np.total = res.data.Body.pager.total
                    var ban = res.data.Body.list
                    for (var i = 0; i < np.total; i++) {
                        np.banben.push({
                            id: ban[i].Id,
                            num: ban[i].V,
                            status: ban[i].S,
                            update_time: that.format(ban[i].T,'yyyy-MM-dd HH:mm:ss')
                        })
                    }
                    // console.log("===",np.banben)
                })
            },
            // 添加版本
            add_banben: function () {
                window.location.href = '/banbenadd?token=' + token
            },
            // 编辑版本
            bianji: function (e) {
                window.location.href = '/banbenbianji?id=' + e + '&token=' + token
            },
            //页码点击事件
            btnClick: function (e) {
                var that = this
                // that.showdaoyou(e, 5)
                if (e != this.cur) {
                    this.cur = e
                }
            },
            pageClick: function () {
                var that = this
                // that.showdaoyou(this.cur, 5)
            },
            // 删除导游
            del: function (e) {
                var that = this
                np.Id = e
                np.tan_show = true
            },
            // 点击取消
            Cancels: function () {
                np.tan_show = false
            },
            // 点击确认
            Confirms: function () {
                var that = this
                axios.post(host + '/route/v1/api/version/del', {
                    id: parseInt(np.Id),
                    server: server,
                    token: token
                }).then((res) => {
                    // that.viewbanben()
                    window.location.reload()
                    np.tan_show = false
                })
            },
            // 多条删除
            delete: function (e) {
                var that = this
                axios.post(host + '/route/v1/api/version/del', {
                    id: parseInt(e),
                    server: server,
                    token: token
                }).then((res) => {
                    console.log(res.data)
                    window.location.reload()

                })
            },
            delAll: function () {
                np.tan_show_list = true

            },
            Refuse: function () {
                np.tan_show_list = false
            },
            Delete: function () {
                var that = this
                np.tan_show_list = false
                for (var i = 0; i < np.checkId.length; i++) {
                    that.delete(np.checkId[i])
                }
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
            }
        },
        mounted: function () {
            this.viewbanben()
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
        watch: {
            cur: function (oldValue, newValue) {
            }
        }
    })
}