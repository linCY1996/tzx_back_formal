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
    var qdname = GetParameters('qdname')    //pname

    var np = new Vue({
        el: '#tall',
        data: {
            total:0,  
            all: 1, //总页数
            cur: 1,//当前页码
            tan_show:false,   //弹出
            Id:-1, //删除id
            first_list:[],  //首页详情信息列表
        },
        methods: {
            showlist:function (pindex,psize) {
              axios.post(host+'/route/v1/api/channel/list',{
                  name:qdname,
                  page:{
                      page_index:pindex,
                      page_size:psize
                  },
                  server:server
              }).then((res) => {
                  np.first_list = res.data.Body.list
                  np.total = res.data.Body.list.length
              })
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
                window.location.href = '/firstPagebianji?id='+e
            },
            // 详情跳转
            detail:function (e) {
                window.location.href = '/firstPagexq?id='+e
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
                axios.post(host + '/route/v1/api/homePage/del', {
                    id: parseInt(np.Id),
                    server: server
                }).then((res) => {
                    that.showlist(1,50)
                    nm.tan_show = false
                })
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