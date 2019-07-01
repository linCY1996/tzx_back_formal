// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'dev'
// const server = 'test'
const server = 'formal'
window.onload = function () {
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
    var np = new Vue({
        el: '#tall',
        data: {
            all: 1, //总页数
            cur: 1,//当前页码
            tan_show:false,   //弹出
            Id:-1, //删除id
            Poilist:[],  //poi列表
            total:0, 
            poi_name:'',  //
            poi_class:-1,
            poi_label:'',
            checkId:[],  //批量删除
            tan_show_list:false,
        },
        methods: {
            // 无权限点击查看
            looks:function (e,e1) {
                window.location.href = '/poiadd1?id='+e+'&token='+token+'&can_edit='+e1
            },
            showPoilist:function (pindex,psize) {
                axios.post(host+'/route/v1/api/poi/list',{
                    page:{
                        page_index:pindex,
                        page_size:psize
                    },
                    type:-1,
                    server:server,
                    token:token
                }).then((res) => {
                    console.log(res.data.Body)
                    np.Poilist = res.data.Body.list
                    if(is_super == "true") {
                        np.total = res.data.Body.pager.total
                    }else {
                        np.total = np.Poilist.length
                    }
                    if(np.total%50 != 0) {
                        np.all = parseInt(np.total/50)+1
                    }else {
                        np.all = parseInt(np.total/50)
                    }
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
            chaXun:function () {
                var pname = np.poi_name
                var pclass = np.poi_class
                var plabel = np.poi_label
                window.location.href = '/poichaxun?pname='+encodeURI(pname)+'&pclass='+encodeURI(pclass)+'&plabel='+encodeURI(plabel)+'&token='+token
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
                    that.showPoilist(1,50)
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