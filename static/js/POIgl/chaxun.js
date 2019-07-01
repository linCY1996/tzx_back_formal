// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'dev'
// const server = 'test'
const server = 'formal'
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
    var pname = GetParameters('pname')    //pname
    var pclass = GetParameters('pclass')    //pclass
    var plabel = GetParameters('plabel')
    var token = GetParameters('token')
    var np = new Vue({
        el: '#tall',
        data: {
            all: 1, //总页数
            cur: 1,//当前页码
            tan_show:false,   //弹出
            Id:-1, //删除id
            Poilist:[],  //poi列表
            total:0, 
            checkId:[],  //批量删除
            tan_show_list:false,
        },
        methods: {
            showPoilist:function (pindex,psize) {
                axios.post(host+'/route/v1/api/poi/list',{
                    name:pname,
                    type:parseInt(pclass),
                    label:plabel,
                    page:{
                        page_index:pindex,
                        page_size:psize
                    },
                    server:server,
                    token:token
                }).then((res) => {
                    np.Poilist = res.data.Body.list
                    np.total = res.data.Body.pager.total
                    var poilist = np.Poilist
                    for(var i = 0;i<poilist.length;i++) {
                        if(poilist[i].Type == 0) {
                            np.Poilist[i].Type = '0-景'
                        }else if(poilist[i].Type == 1) {
                            np.Poilist[i].Type = '1-人'
                        }else if(poilist[i].Type == 2) {
                            np.Poilist[i].Type = '2-文'
                        }else if(poilist[i].Type == 3) {
                            np.Poilist[i].Type = '3-吃'
                        }else if(poilist[i].Type == 4) {
                            np.Poilist[i].Type = '4-历'
                        }else if(poilist[i].Type == 5) {
                            np.Poilist[i].Type = '5-购'
                        }else if(poilist[i].Type == 6) {
                            np.Poilist[i].Type = '6-娱'
                        }
                    }
                })
            },
            //页码点击事件
            btnClick: function (e) {
                var that = this
                that.showPoilist(e, 50)
                if (e != this.cur) {
                    this.cur = e
                }
            },
            pageClick: function () {
                var that = this
                that.showPoilist(this.cur, 50)
            },
            // 点击编辑页面
            bian_link: function (e) {
                window.location.href = '/poiadd1?id='+e+'&token='+token
            },
            // 删除导游
            del: function (e) {
                var that = this
                np.Id = e
                np.tan_show = true
                
            },
            add_link:function () {
              window.location.href = '/poinowadd1?token='+token  
            },
            // 点击取消
            Cancels:function () {
                np.tan_show = false
            },

            // 点击确认
            Confirms:function () {
                var that = this
                axios.post(host + '/route/v1/api/poi/del', {
                    id: parseInt(np.Id),
                    server: server,
                    token:token
                }).then((res) => {
                    that.showPoilist(1,50)
                    np.tan_show = false
                })
            },
             // 批量删除
             delete:function (e) {
                var that = this
                axios.post(host + '/route/v1/api/poi/del', {
                    id: parseInt(e),
                    server: server,
                    token:token
                }).then((res) => {
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
            },
        },
        mounted: function () {
            this.showPoilist(1, 50);
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