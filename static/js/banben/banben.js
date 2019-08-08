// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
const server = 'formal'
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
            copy_show: false,   //复制显示
            current: -1,   //显示对应的hover元素
            timer: null,   //定时器名称
            loadings: false,  //加载
        },
        methods: {
            showloading: function () {
                var that = this
                that.loadings = true
                that.tan_show = false
                that.tan_show_list = false
            },
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
                    np.loadings = false
                    np.total = res.data.Body.pager.total
                    var ban = res.data.Body.list
                    for (var i = 0; i < np.total; i++) {
                        np.banben.push({
                            id: ban[i].Id,
                            num: ban[i].V,
                            status: ban[i].S,
                            update_time: that.format(ban[i].T, 'yyyy-MM-dd HH:mm:ss')
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
            },
            // 复制  鼠标移入事件
            enter: function (index) {
                np.current = index
                np.copy_show = true
            },
            // 鼠标移出事件
            leave: function () {
                if (np.copy_show == true) {
                    np.timer = setTimeout(() => {
                        np.copy_show = false
                        np.current = null
                    }, 1000)
                }
                clearTimeout()
            },
            copy_test: function (params) {
                axios.post(host + '/route/v1/api/guide/copy', {
                    from_server: server,
                    id: parseInt(params),
                    to_server: 'test'
                }).then((res) => {
                    if(res.data.Body == 'ok') {
                        alert("复制成功")
                    }
                })
            },
            copy_formal: function (params) {
                axios.post(host + '/route/v1/api/guide/copy', {
                    from_server: server,
                    id: parseInt(params),
                    to_server: 'formal'
                }).then((res) => {
                    if(res.data.Body == 'ok') {
                        alert("复制成功")
                    }
                })
            }
        },
        created() {
            this.showloading()
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
            },
            copy_show:function () {
                if (np.copy_show == true) {
                    setTimeout(() => {
                        np.copy_show = false
                        np.current = null
                    }, 2000)
                }
                clearTimeout()
            }
        },
        // beforeDestroy() {
        //     clearTimeout(np.timer)
        //     np.timer = null
        // }
    })
}