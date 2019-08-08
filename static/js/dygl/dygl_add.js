// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
const server = 'formal'
window.onload = function () {
    var token = location.search.replace('?token=', "")
    var np = new Vue({
        el:'#tall',
        data:{
            d_Name:'',
            d_Imgs:'',
           
        },
        methods:{
            // 上传
            posts:function () {
                if(np.d_Name == '' || np.d_Imgs == '') {
                    alert("不能传入空字段")
                }else{
                    axios.post(host+'/route/v1/api/guide/create',{
                        name:np.d_Name,
                        img:np.d_Imgs,
                        server:server,
                        token:token
                    }).then((res) => {
                        console.log(res.data.Body)
                        alert("添加成功")
                        window.history.go(-1)
                    })
                }
            },
            // 重置
            chongzhi:function () {
                window.location.reload()
            }
        },
        mounted:function () {
            
        }
    })
}