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
    var is_super = GetParameters('is_super')
    var key = GetParameters('keyword')
    var np = new Vue({
        el: '#tall',
        data: {
            tan_show_list: false,
            total: 0,
            all: 1, //总页数
            cur: 1,//当前页码
            checkId: [],  //选择
            // pagesNum:10   //选择每页呈现信息条数
            tan_show: false,   //弹窗
            Id: -1,    //点击删除得Id
            copy_show: false,   //复制显示
            current: -1,   //显示对应的hover元素
            timer: null,   //定时器名称
            loadings: true,    //加载
            is_super: true,
            list: [],
            keyword: '',  //关键字

        },
        methods: {
            showKF: function (pindex, psize) {
                var that = this
                axios.post(host + '/route/v1/api/get/keyReply/list', {
                    page: {
                        page_index: pindex,
                        page_size: psize
                    },
                    server: server,
                    token: token,
                    key: key
                }).then((res) => {
                    console.log(res.data)
                      np.loadings = false
                      var list = res.data.Body.list
                      var plist = []
                      for(var i = 0;i<list.length;i++) {
                        plist.push({
                            channelId:list[i].ChannelId,
                            Id:list[i].Id,
                            Key:list[i].Key,
                            reply:JSON.parse(list[i].reply),
                            time:that.getLocalTime(list[i].time)
                        })
                      }
                      np.list = plist
                      np.total = res.data.Body.pager.total
                      if (np.total % 50 != 0) {
                        np.all = parseInt(np.total / 50) + 1
                    } else {
                        np.all = parseInt(np.total / 50)
                    }
                })
            },
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
            // 跳转页面
            btn_link: function (e) {
                window.location.href = '/keywordbianji?id=' + e + '&token=' + token
            },
            // 添加
            add_keyword: function () {
                window.location.href = '/addkeyword?token=' + token
            },
            // 删除导游
            del: function (e) {
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
                alert("未提供接口")
                // axios.post(host + '/route/v1/api/guide/del', {
                //     id: parseInt(np.Id),
                //     server: server,
                //     token: token
                // }).then((res) => {
                //     that.showKF(1, 50)
                //     np.tan_show = false
                // })
            },
            //页码点击事件
            btnClick: function (e) {
                var that = this
                that.showKF(e, 50)
                if (e != this.cur) {
                    this.cur = e
                }
            },

            pageClick: function () {
                var that = this
                that.showKF(this.cur, 50)
            },
            delete: function (e) {
                var that = this
                alert("未提供接口")
                // axios.post(host + '/route/v1/api/guide/del', {
                //     id: parseInt(e),
                //     server: server,
                //     token: token
                // }).then((res) => {
                //     console.log(res.data.Body)
                //     that.showKF(1, 50)
                // })
            },
            delAll: function () {
                nm.tan_show_list = true

            },
            Refuse: function () {
                nm.tan_show_list = false
            },
            Delete: function () {
                var that = this
                nm.tan_show_list = false
                for (var i = 0; i < nm.checkId.length; i++) {
                    that.delete(nm.checkId[i])
                }
            },
            // 复制  鼠标移入事件
            enter: function (index) {
                nm.current = index
                nm.copy_show = true
            },
            copy_test: function (params) {
                alert("没有接口")
                // axios.post(host + '/route/v1/api/guide/copy', {
                //     from_server: server,
                //     id: parseInt(params),
                //     to_server: 'test'
                // }).then((res) => {
                //     // console.log(res.data.Body)
                //     if(res.data.Body == 'ok') {
                //         alert("复制成功")
                //     }
                // })
            },
            copy_formal: function (params) {
                alert("没有接口")
                // axios.post(host + '/route/v1/api/guide/copy', {
                //     from_server: server,
                //     id: parseInt(params),
                //     to_server: 'formal'
                // }).then((res) => {
                //     // console.log(res.data.Body)
                //     if(res.data.Body == 'ok') {
                //         alert("复制成功")
                //     }
                // })
            }
        },
        mounted: function () {
            this.showKF(1, 50)
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
            },
        },
        watch: {
            cur: function (oldValue, newValue) {
            },
            copy_show: function () {
                if (nm.copy_show == true) {
                    nm.timer = setTimeout(() => {
                        nm.copy_show = false
                        nm.current = null
                    }, 2000)
                }
                clearTimeout()
            }
        }
    })
}