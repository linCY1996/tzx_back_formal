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
    var routeId = GetParameters('routeId')
    var routeName = GetParameters('routeName')
    var startTime = GetParameters('startTime')
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
                axios.post(host+'/route/v1/api/userRoute/list',{
                    page:{
                        page_index:pindex,
                        page_size:psize
                    },
                    server:server,
                    nickname:nickName,
                    route_id:routeId,
                    route_name:routeName,
                    token:token
                }).then((res) => {
                    // console.log(res.data.Body)
                    var ls = res.data.Body.list
                    var list = []
                    for(var i = 0;i<ls.length;i++){
                        list.push({
                            index:i,
                            Uid:ls[i].uid,
                            nickName:ls[i].nick_name,
                            channel:ls[i].channel,
                            routeId:ls[i].route_id,
                            routeName:ls[i].name,
                            price:ls[i].price,
                            startTime:that.getLocalTime(ls[i].time),
                            status:ls[i].status,
                            lat:JSON.parse(ls[i].latitude)[0].latitude,
                            lon:JSON.parse(ls[i].latitude)[0].longitude,
                            memLink:ls[i].mem_inlet,
                            endBend:ls[i].endbend
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
            },
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