// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
const server = 'formal'
window.onload = function () {
    // var ids = location.search.replace('?routeid=', "")
    function GetParameters(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);//解决中文乱码

        } else {
            return null;
        }
    }
    var ids = GetParameters('routeid')    //ids
    var token = GetParameters('token')
    var index = GetParameters('index')
    var np = new Vue({
        el: '#tall',
        data: {
            Banner: [],
            banner:'',
            sort:'',
        },
        methods: {
            showbanner: function () {
                var that = this
                that.sort = index
                axios.post(host + '/route/v1/api/route/get', {
                    id: parseInt(ids),
                    server: server,
                    token: token
                }).then((res) => {
                    // console.log(res.data.Body)
                    var banner = JSON.parse(res.data.Body.Banner)
                    for(var i = 0;i<banner.length;i++) {
                        np.Banner.push({
                            imgs:banner[i],
                            index:i
                        })
                        if(index == i) {
                            np.banner = banner[i]
                        }
                    }
                    // np.banner = res.data.Body.Banner
                    // console.log(np.banner)
                })
            },
            // 重置
            chongzhi: function () {
                window.location.reload()
            },
            // 保存
            saves: function () {
                if(index == -1){
                    np.Banner.splice(np.Banner.length,0,{imgs:np.banner,index:np.Banner.length})
                } else {
                    for(var j = 0;j<np.Banner.length;j++) {
                        if(index == np.Banner[j].index) {
                            np.Banner[j].imgs = np.banner
                        }
                    }
                }
                var AllImgs = ''
                for(var x = 0;x<np.Banner.length;x++) {
                    AllImgs += np.Banner[x].imgs+','
                }
                var jiequAllimgs = AllImgs.substring(0,AllImgs.length-1)
                var banner = jiequAllimgs.split(',')
                var IndexBanner = ''
                for(var q = 0;q<banner.length;q++) {
                    if(np.sort<banner.length && np.sort == q) {
                        IndexBanner = banner[index]
                        banner[index] = banner[np.sort]
                        banner[np.sort] = IndexBanner
                    }
                }
                axios.post(host + '/route/v1/api/route/updateBanner', {
                    server: server,
                    banner:JSON.stringify(banner),
                    route_id: parseInt(ids)
                }).then((res) => {
                    alert("编辑成功")
                    window.history.go(-1)  
                })
            }
        },
        mounted: function () {
            this.showbanner();
            
        }
    })
}