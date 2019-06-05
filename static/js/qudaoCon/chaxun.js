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
            all: 2, //总页数
            cur: 1,//当前页码
            tan_show:false,   //弹出
            Id:-1, //删除id
            q_name:'',  //渠道名称
            qudao:[],  //渠道列表
        },
        methods: {
            showqudao:function () {
                axios.post(host+'/route/v1/api/channel/list',{
                    name:qdname,
                    page:{
                        page_index:1,
                        page_size:50
                    },
                    server:server
                }).then((res) => {
                    np.qudao = res.data.Body.list
                })
            },
            //页码点击事件
            btnClick: function (e) {
                var that = this
                if (e != this.cur) {
                    this.cur = e
                }
            },
            pageClick: function () {
                var that = this
            },
            // 编辑跳转
            bian_link:function (e) {
                window.location.href = '/qudaobianji?id='+e
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
                // var that = this
                // axios.post(host + '/route/v1/api/guide/del', {
                //     id: parseInt(nm.Id),
                //     server: "dev"
                // }).then((res) => {
                //     that.showdaoyou(1,30)
                //     nm.tan_show = false
                // })
            },
            // 查询
            looks:function () {
                window.location.href = '/qudaochaxun?name='+np.q_name
            }
        },
        mounted: function () {
            this.showqudao();
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