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
            copy_show: false,   //复制显示
            current: -1,   //显示对应的hover元素
            timer:null,   //定时器名称
            loadings:true,    //加载
            is_super:true,
        },
        methods: {
            showloading:function () {
                var that = this
                that.loadings = true  
                that.tan_show = false
                that.tan_show_list = false
            },
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
                }).then((res) => {
                    nm.loadings = false
                    for(var i = 0;i<res.data.Body.list.length;i++) {
                        nm.daoyou.push({
                            Id:res.data.Body.list[i].Id,
                            Img:res.data.Body.list[i].Img,
                            Name:res.data.Body.list[i].Name,
                            Uid:res.data.Body.list[i].Uid,
                            can_edit:res.data.Body.list[i].can_edit,
                            is_super:eval(is_super)
                        })
                    }
                    // console.log(nm.daoyou)
                    // nm.all = resp.data.Body.list.length
                    if (is_super == "true") {
                        nm.total = res.data.Body.pager.total
                    } else {
                        nm.total = res.data.Body.list.length
                    }
                    if (nm.total % 50 != 0) {
                        nm.all = parseInt(nm.total / 50) + 1
                    } else {
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
            },
            // 复制  鼠标移入事件
            enter: function (index) {
                nm.current = index
                nm.copy_show = true
            },
            // 鼠标移出事件
            leave: function () {
                if (nm.copy_show == true) {
                    nm.timer = setTimeout(() => {
                        nm.copy_show = false
                        nm.current = null
                    },2000)
                }
                clearTimeout()
            },
            copy_test: function (params) {
                axios.post(host + '/route/v1/api/guide/copy', {
                    from_server: server,
                    id: parseInt(params),
                    to_server: 'test'
                }).then((res) => {
                    // console.log(res.data.Body)
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
                    // console.log(res.data.Body)
                    if(res.data.Body == 'ok') {
                        alert("复制成功")
                    }
                })
            }

        },
        created () {
          this.showloading()  
        },
        mounted: function () {
            this.showloading()
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
            },
        },
        watch: {
            cur: function (oldValue, newValue) {
            },
            copy_show:function () {
                if (nm.copy_show == true) {
                    nm.timer = setTimeout(() => {
                        nm.copy_show = false
                        nm.current = null
                    },2000)
                }
                clearTimeout()
            }
        },
        beforeDestroy () {
            clearTimeout(nm.timer)
            nm.timer = null
        }

    })

}