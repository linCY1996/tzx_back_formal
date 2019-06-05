// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var np = new Vue({
        el: '#tall',
        data: {
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
                        page_index: 1,
                        page_size: 50
                    },
                    server: server
                }).then((res) => {
                    console.log(res.data.Body.list)
                    np.qudao = res.data.Body.list
                    var total = np.qudao.length
                    if(total/50 != 0) {
                        np.all = parseInt(total/50)+1
                    }
                })
            },
            //页码点击事件
            btnClick: function (e) {
                var that = this
                that.showqudao(e, 50)
                if (e != this.cur) {
                    this.cur = e
                }
            },
            pageClick: function () {
                var that = this
                that.showqudao(this.cur, 50)
            },
            // 添加渠道
            addQudao:function () {
              window.location.href = '/qudaoadd'  
            },
            // 编辑跳转
            bian_link: function (e) {
                console.log(e)
                window.location.href = '/qudaobianji?id=' + e
            },
            // 删除导游
            del: function (e) {
                console.log("e", e)
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
                    server: server
                }).then((res) => {
                    that.showqudao(1, 50)
                    np.tan_show = false
                })
            },
            // 查询
            chaXun: function () {
                var qdname = np.q_name
                window.location.href = '/qudaochaxun?qdname=' + encodeURI(qdname)
            },
            // 批量删除
            delete: function (e) {
                var that = this
                console.log("e", e)
                axios.post(host + '/route/v1/api/channel/del', {
                    id: parseInt(e),
                    server: server
                }).then((res) => {
                    console.log(res.data)
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
                console.log("checkId:", np.checkId)
                for (var i = 0; i < np.checkId.length; i++) {
                    that.delete(np.checkId[i])
                }
                // window.location.reload()
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