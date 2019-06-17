// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var token = location.search.replace('?token=', "")
    var np = new Vue({
        el: '#tall',
        data: {
            total:0,  
            all: 1, //总页数
            cur: 1,//当前页码
            tan_show:false,   //弹出
            Id:-1, //删除id
            first_list:[],  //首页详情信息列表
            qd_name:'',
            lx_name:'',
            checkId:[],  //批量删除
            tan_show_list:false,
        },
        methods: {
            showlist:function (pindex,psize) {
              axios.post(host+'/route/v1/api/channel/list',{
                  page:{
                      page_index:pindex,
                      page_size:psize
                  },
                  server:server,
                  token:token
              }).then((res) => {
                  np.first_list = res.data.Body.list
                  np.total = res.data.Body.list.length
                  if(np.total/50 != 0) {
                    np.all = parseInt(np.total/50)+1
                }
              })
            },
            chaXun:function () {
                var qdname = np.qd_name
                var lxname = np.lx_name
                window.location.href = '/firchaxun?qdname='+encodeURI(qdname)+'&lxname='+encodeURI(lxname)+'&token='+token
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
            // 编辑跳转
            bian_link:function (e) {
                window.location.href = '/firstPagebianji?id='+e +'&token='+token
            },
            // 首页详情跳转
            detail:function (e) {
                window.location.href = '/firstPagexq?id='+e+'&fshow='+true+'&sshow='+false+'&token='+token
            },
            // 详情页详情跳转
            detail1:function (e) {
                window.location.href = '/firstPagexq?id='+e+'&fshow='+false+'&sshow='+true+'&token='+token
            },
            // 删除导游
            del: function (e) {
                np.Id = e
                np.tan_show = true
                
            },
            // 点击取消
            Cancels:function () {
                np.tan_show = false
            },

            // 点击确认
            Confirms:function () {
                var that = this
                axios.post(host + '/route/v1/api/channel/del', {
                    id: parseInt(np.Id),
                    server: server,
                    token:token
                }).then((res) => {
                    that.showlist(1,50)
                    np.tan_show = false
                })
            },
             // 批量删除
             delete:function (e) {
                var that = this
                axios.post(host + '/route/v1/api/channel/del', {
                    id: parseInt(e),
                    server: server,
                    token:token
                }).then((res) => {
                    console.log(res.data.Body)
                    that.showlist(1,50)
                    np.tan_show = false
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
                console.log('==',np.checkId)
                np.tan_show_list = false
                for(var i = 0;i<np.checkId.length;i++){
                    that.delete(np.checkId[i])
                }
                // window.location.reload()
            },
        },
        mounted: function () {
            this.showlist(1,50);
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