// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'dev'
// const server = 'test'
const server = 'formal'
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
        },
        methods: {
            showqudao: function (pindex,psize) {
                axios.post(host + '/route/v1/api/channel/list', {
                    page: {
                        page_index: pindex,
                        page_size: psize
                    },
                    server: server,
                    token:token
                }).then((res) => {
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
                window.location.href = '/qudaochaxun?qdname=' + encodeURI(qdname)+'&token='+token
            },
            // 批量删除
            delete: function (e) {
                var that = this
                axios.post(host + '/route/v1/api/channel/del', {
                    id: parseInt(e),
                    server: server,
                    token:token
                }).then((res) => {
                    that.showqudao(1, 50)
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
            }
        }
    })
}