// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
const server = 'formal'
window.onload = function () {
    // var token = location.search.replace('?token=', "")
    function GetParameters(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);//解决中文乱码

        } else {
            return null;
        }
    }
    var qdname = GetParameters('qdname')    //pname
    var token = GetParameters('token')
    var is_super = GetParameters('is_super')
    var np = new Vue({
        el: '#tall',
        data: {
            total: 0,
            all: 1, //总页数
            cur: 1,//当前页码
            tan_show: false,   //弹出
            Id: -1, //删除id
            first_list: [],  //首页详情信息列表
            qd_name: '',
            lx_name: '',
            checkId: [],  //批量删除
            tan_show_list: false,
            copy_show: false,   //复制显示
            current: -1,   //显示对应的hover元素
            timer: null,   //定时器名称
            loadings: false,
            is_super: true,
        },
        methods: {
            showloading: function () {
                var that = this
                that.loadings = true
                that.tan_show = false
                that.tan_show_list = false
            },
            showlist: function (pindex, psize) {
                axios.post(host + '/route/v1/api/channel/list', {
                    page: {
                        page_index: pindex,
                        page_size: psize
                    },
                    name:qdname,
                    server: server,
                    token: token
                }).then((res) => {
                    // console.log(res.data.Body.list)
                    np.loadings = false
                    np.is_super = eval(is_super)
                    np.first_list = res.data.Body.list
                    if (is_super == "true") {
                        np.total = res.data.Body.pager.total
                    } else {
                        np.total = res.data.Body.list.length
                    }
                    if (np.total % 50 != 0) {
                        np.all = parseInt(np.total / 50) + 1
                    } else {
                        np.all = parseInt(np.total / 50)
                    }
                })
            },
            chaXun: function () {
                var qdname = np.qd_name
                var lxname = np.lx_name
                window.location.href = '/firchaxun?qdname=' + encodeURI(qdname) + '&lxname=' + encodeURI(lxname) + '&token=' + token
            },
            //页码点击事件
            btnClick: function (e) {
                var that = this
                that.showlist(e, 50)
                if (e != this.cur) {
                    this.cur = e
                }
            },
            pageClick: function () {
                var that = this
                that.showlist(this.cur, 50)
            },
            // 编辑跳转
            bian_link: function (e) {
                window.location.href = '/firstPagebianji?id=' + e + '&token=' + token
            },
            // 首页详情跳转
            detail: function (e) {
                window.location.href = '/firstPagexq?id=' + e + '&fshow=' + true + '&sshow=' + false + '&token=' + token
            },
            // 详情页详情跳转
            detail1: function (e) {
                window.location.href = '/firstPagexq?id=' + e + '&fshow=' + false + '&sshow=' + true + '&token=' + token
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
                axios.post(host + '/route/v1/api/channel/del', {
                    id: parseInt(np.Id),
                    server: server,
                    token: token
                }).then((res) => {
                    that.showlist(1, 50)
                    np.tan_show = false
                })
            },
            // 批量删除
            delete: function (e) {
                var that = this
                axios.post(host + '/route/v1/api/channel/del', {
                    id: parseInt(e),
                    server: server,
                    token: token
                }).then((res) => {
                    console.log(res.data.Body)
                    that.showlist(1, 50)
                    np.tan_show = false
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
                console.log('==', np.checkId)
                np.tan_show_list = false
                for (var i = 0; i < np.checkId.length; i++) {
                    that.delete(np.checkId[i])
                }
                // window.location.reload()
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
            },
            copy_test: function (params) {
                axios.post(host + '/route/v1/api/homePage/copy', {
                    from_server: server,
                    id: parseInt(params),
                    is_keep_on: eval(true),
                    to_server: 'test'
                }).then((res) => {
                    if (res.data.Body == 'ok') {
                        alert("复制成功")
                    }
                })
            },
            copy_formal: function (params) {
                axios.post(host + '/route/v1/api/homePage/copy', {
                    from_server: server,
                    id: parseInt(params),
                    is_keep_on: eval(true),
                    to_server: 'formal'
                }).then((res) => {
                    if (res.data.Body == 'ok') {
                        alert("复制成功")
                    }
                })
            }
        },
        created() {
            this.showloading()
        },
        mounted: function () {
            this.showlist(1, 50);
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
            copy_show: function () {
                if (np.copy_show == true) {
                    setTimeout(() => {
                        np.copy_show = false
                        np.current = null
                    }, 2000)
                }
                clearTimeout()
            }
        },
        beforeDestroy() {
            clearTimeout(np.timer)
            np.timer = null
        }
    })
}