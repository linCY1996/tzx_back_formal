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
    var nickName = GetParameters('nickName')
    var phone = GetParameters('phone')  
    // var is_super = GetParameters('is_super')
    var zx = new Vue({
        el: '#tall',
        data: {
            all: 1, //总页数
            cur: 1,//当前页码
            total:9,
            list:[],   //注册信息列表
        },
        methods: {
            // 显示用户注册信息列表
            showMsgs:function (pindex,psize) {
                var that = this
                axios.post(host+'/route/v1/api/user/list',{
                    nickname:nickName,
                    phone:phone,
                    page:{
                        page_index:pindex,
                        page_size:psize
                    },
                    server:server,
                    token:token
                }).then((res) => {
                    var ls = res.data.Body.list
                    var list = []
                    for(var i = 0;i<ls.length;i++) {
                        list.push({
                            index:i,
                            nickName:ls[i].nickname,
                            headImg:ls[i].head_img,
                            phone:ls[i].phone,
                            time: that.getLocalTime(ls[i].login_time)
                        })
                    }
                    zx.list = list
                    zx.total = res.data.Body.pager.total
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
            looks:function () {
                console.log("here")
            }
        },
        mounted() {
            this.showMsgs(0,50)
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