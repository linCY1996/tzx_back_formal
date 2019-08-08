// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
const server = 'formal'
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
window.onload = function () {
    var np = new Vue({
        el: '#tall',
        data: {
            total:0,
            all: 1, //总页数
            cur: 1,//当前页码
            tan_show: false,   //弹出
            Id: -1, //删除id
            q_name: '',  //渠道名称
            qudao: [],  //渠道列表
            checkId:[],  //批量删除
            tan_show_list:false,
            copy_show: false,   //复制显示
            current: -1,   //显示对应的hover元素
            timer:null,
            loadings:false,
        },
        methods: {
            showloading:function () {
                var that = this
                that.loadings = true  
                that.tan_show = false
                that.tan_show_list = false
            },
            showqudao: function (pindex,psize) {
                axios.post(host + '/route/v1/api/channel/list', {
                    page: {
                        page_index: pindex,
                        page_size: psize
                    },
                    name:qdname,
                    server: server,
                    token:token
                }).then((res) => {
                    // console.log(res.data.Body.list)
                    np.loadings = false;
                    var qudao = res.data.Body.list
                    if(is_super == true) {
                        np.total = res.data.Body.pager.total
                    }else {
                        np.total = qudao.length
                    }
                    if(np.total%50 != 0) {
                        np.all = parseInt(np.total/50)+1
                    }else {
                        np.all = parseInt(np.total/50)
                    }
                    for(var i = 0;i<qudao.length;i++) {
                        np.qudao.push({
                            id:qudao[i].id,
                            name:qudao[i].name,
                            page_url:qudao[i].page_url,
                            can_edit_guide:JSON.parse(qudao[i].can_edit_guide),
                            can_edit_poi:JSON.parse(qudao[i].can_edit_poi),
                            can_edit_route:JSON.parse(qudao[i].can_edit_route),
                            can_use_guide:JSON.parse(qudao[i].can_use_guide),
                            can_use_poi:JSON.parse(qudao[i].can_use_poi),
                            can_use_route:JSON.parse(qudao[i].can_use_route),
                            reply:JSON.parse(qudao[i].reply).text.content
                        })
                    }
                    // np.qudao = res.data.Body.list
                    
                })
            },
            //页码点击事件
            btnClick: function (e) {
                var that = this
                np.qudao = []
                that.showqudao(e, 50)
                if (e != this.cur) {
                    this.cur = e
                }
            },
            pageClick: function () {
                var that = this
                np.qudao = []
                that.showqudao(this.cur, 50)
            },
            // 添加渠道
            addQudao:function () {
              window.location.href = '/qudaoadd?token='+token  
            },
            // 编辑跳转
            bian_link: function (e) {
                window.location.href = '/qudaobianji?id=' + e+'&token='+token
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
                    token:token
                }).then((res) => {
                    that.showqudao(1, 50)
                    window.location.reload()
                    np.tan_show = false
                })
            },
            // 查询
            chaXun: function () {
                var qdname = np.q_name
                window.location.href = '/qudaochaxun?qdname=' + encodeURI(qdname)+'&token='+token+'&is_super='+is_super
            },
            // 批量删除
            delete: function (e) {
                var that = this
                axios.post(host + '/route/v1/api/channel/del', {
                    id: parseInt(e),
                    server: server,
                    token:token
                }).then((res) => {
                    np.qudao = []
                    that.showqudao(1, 50)
                    // window.location.reload()
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
                // nm.tan_show = true
                np.tan_show_list = false
                for (var i = 0; i < np.checkId.length; i++) {
                    that.delete(np.checkId[i])
                }
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
                    },1000)
                }
            },
            copy_test: function (params) {
                axios.post(host + '/route/v1/api/channel/copy', {
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
                axios.post(host + '/route/v1/api/channel/copy', {
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
        created () {
          this.showloading()  
        },
        mounted: function () {
            this.showqudao(1,50);
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
                    },2000)
                }
                clearTimeout()
            }
        },
        beforeDestroy () {
            clearTimeout(np.timer)
            np.timer = null
        }
    })
}