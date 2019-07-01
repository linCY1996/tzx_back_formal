// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'dev'
// const server = 'test'
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
    var token = GetParameters('token')
    var is_super = GetParameters('is_super')
    var nm = new Vue({
        el: '#tall',
        data: {
            tan_show_list: false,
            dname: '',   //查询
            daoyou: [],   //导游管理信息
            total: 0,
            all: 1, //总页数
            cur: 1,//当前页码
            checkId: [],  //选择
            // pagesNum:10   //选择每页呈现信息条数
            tan_show: false,   //弹窗
            Id: -1,    //点击删除得Id
        },
        methods: {

            // 显示导游管理列表
            showdaoyou: function (pindex, psize) {
                var that = this
                axios.post(host + '/route/v1/api/get/guide/list', {
                    page: {
                        page_index: pindex,
                        page_size: psize
                    },
                    server: server,
                    token: token
                }).then((resp) => {
                    nm.daoyou = resp.data.Body.list
                    // nm.all = resp.data.Body.list.length
                    if(is_super == "true") {
                        nm.total = resp.data.Body.pager.total
                    }else {
                        nm.total = resp.data.Body.list.length
                    }
                    if (nm.total%50 != 0) {
                        nm.all = parseInt(nm.total / 50) + 1
                    }else {
                        nm.all = parseInt(nm.total / 50)
                    }
                })
            },
            // 跳转页面
            btn_link: function (e) {
                window.location.href = '/bianji?id=' + e + '&token=' + token
            },
            // 删除导游
            del: function (e) {
                nm.Id = e
                nm.tan_show = true
            },
            // 点击取消
            Cancels: function () {
                nm.tan_show = false
            },
            // 点击确认
            Confirms: function () {
                var that = this
                // console.log("id=",nm.Id)
                // console.log(token)
                axios.post(host + '/route/v1/api/guide/del', {
                    id: parseInt(nm.Id),
                    server: server,
                    token: token
                }).then((res) => {
                    console.log(res.data.Body)
                    that.showdaoyou(1, 50)
                    nm.tan_show = false
                })
            },

            // // 查询导游
            looks: function () {
                window.location.href = '/dyglchaxun?id=' + encodeURI(nm.dname) + '&token=' + token

            },
            //页码点击事件
            btnClick: function (e) {
                var that = this
                that.showdaoyou(e, 50)
                if (e != this.cur) {
                    this.cur = e
                }
            },

            pageClick: function () {
                var that = this
                that.showdaoyou(this.cur, 50)
            },
            delete: function (e) {
                var that = this
                axios.post(host + '/route/v1/api/guide/del', {
                    id: parseInt(e),
                    server: server,
                    token: token
                }).then((res) => {
                    console.log(res.data.Body)
                    that.showdaoyou(1, 50)

                })
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
            // 添加导游
            add_touer: function () {
                window.location.href = '/dygladd?token=' + token
            }

        },
        mounted: function () {
            this.showdaoyou(1, 50)
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