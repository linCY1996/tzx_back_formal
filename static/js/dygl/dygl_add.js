// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var np = new Vue({
        el:'#tall',
        data:{
            d_Name:'',
            d_Imgs:'',
            d_Start:'',
            d_Start_Audio:'',
            d_End:'',
            d_End_Audio:''

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
                        start:'',
                        end:'',
                        server:server
                    }).then((res) => {
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