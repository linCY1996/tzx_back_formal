// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    function GetParameters(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){
            return decodeURI(r[2]);//解决中文乱码
            
        }else{
             return null;
        }
    }
    var lxname = GetParameters('lxname')    //pname
    var lxcity = GetParameters('lxcity')
    var pclass = GetParameters('pclass')
    var token = GetParameters('token')
    var np = new Vue({
        el: '#tall',
        data: {
            total: 0,
            all: 1, //总页数
            cur: 1,//当前页码
            luxian:[],   //所有路线
            tan_show:false,   //弹出
            Id:-1,  //删除id
            checkId:[],  //批量删除
            tan_show_list:false,
        },
        methods: {
            showluxian:function (pindex,psize) {
                axios.post(host+'/route/v1/api/route/list',{
                    page:{
                        page_index:pindex,
                        page_size:psize
                    },
                    server:server,
                    route_name:lxname,
                    city:lxcity,
                    channel_id:parseInt(pclass),      //渠道id
                    token:token
                }).then((res) => {
                    np.luxian = res.data.Body.list
                    np.all = res.data.Body.pager.pages
                    np.total = res.data.Body.pager.total
                    if(np.total/50 != 0) {
                        np.all = parseInt(np.total/50)+1
                    }
                })
            },
            //页码点击事件
            btnClick: function (e) {
                var that = this
                that.showluxian(e, 50)
                if (e != this.cur) {
                    this.cur = e
                }
            },
            pageClick: function () {
                var that = this
                that.showluxian(this.cur, 50)
            },
            add_link:function () {
              window.location.href = '/lxadd?token='+token
            },
            // 编辑跳转链接
            btn_link:function (e) {
                console.log(e)
                window.location.href = '/lxbianji?id='+e+'&token='+token
            },
            // 删除导游
            del: function (e) {
                np.Id = e
                np.tan_show = true
                
            },
            // 进入详情
            goDetail:function (e) {
                window.location.href = '/lxdetail?id='+e+'&token='+token
            },
            // 点击取消
            Cancels:function () {
                np.tan_show = false
            },

            // 点击确认
            Confirms:function () {
                var that = this
                axios.post(host + '/route/v1/api/route/del', {
                    id: parseInt(np.Id),
                    server: server,
                    token:token
                }).then((res) => {
                    that.showluxian(1,50)
                    np.tan_show = false
                })
            },
            // 批量删除
            delete:function (e) {
                var that = this
                axios.post(host + '/route/v1/api/route/del', {
                    id: parseInt(e),
                    server: server,
                    token:token
                }).then((res) => {
                    console.log(res.data)
                    that.showluxian(1,50)
                    
                })
            },
            delAll:function () {
                np.tan_show_list = true
                
            },
            Refuse:function () {
                np.tan_show_list = false
            },
            Delete:function () {
                var that = this
                // nm.tan_show = true
                np.tan_show_list = false
                for(var i = 0;i<np.checkId.length;i++){
                    that.delete(np.checkId[i])
                }
                // window.location.reload()
            },
        },
        mounted: function () {
            this.showluxian(1,50)
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