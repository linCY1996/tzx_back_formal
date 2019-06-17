// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
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
    var ids = GetParameters('id')    //taskid
    var token = GetParameters('token')    //token
    var np = new Vue({
        el:'#tall',
        data:{
            b_Num:'',
            b_Status:'',
        },
        methods:{
            showMsgs:function name(params) {
                axios.post(host+'/route/v1/api/version/get',{
                    id:parseInt(ids),
                    server:server,
                    token:token
                }).then((res) => {
                    np.b_Num = res.data.Body.num
                    np.b_Status = res.data.Body.status
                })
            },

             // 重置
             chongzhi: function () {
                window.location.reload()
            },
            posts:function () {
                var str = Date.parse(new Date())
                var strs = JSON.stringify(str)
                console.log(strs.substring(0,10))
                var times = strs.substring(0,10)
                if(np.b_Num == '' || np.b_Status == '') {
                    alert("信息未填写完整")
                } else {
                    axios.post(host+'/route/v1/api/version/update',{
                        id:parseInt(ids),
                        num:parseInt(np.b_Num),
                        server:server,
                        status: np.b_Status,
                        update_time:JSON.parse(times),
                        token:token
                    }).then((res) => {
                        alert("保存成功")
                        window.history.go(-1)
                    })
                } 
            }
        },
        mounted:function () {
            this.showMsgs();
        }
    })
}