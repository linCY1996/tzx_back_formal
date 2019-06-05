// const host = 'https://tzx-admin.tuzuu.com'    //开发服
// const host = 'https://tzx-admin-test.tuzuu.com'   //体验服
const host = 'https://tzx-admin-formal.tuzuu.com'   //正式服
// const server = 'test'    //体验服
const server = 'formal'   //正式服
window.onload = function () {
    var ids = location.search.replace('?id=', "")
    console.log(ids)
    var np = new Vue({
        el: '#tall',
        data: {
            b_jingqu_name:'',   //渠道名称
            // a_qudao_id:'',   //添加渠道id
            a_qudao_name:'',  //添加渠道名称
           
        },
        methods: {
            showqudao:function () {
                axios.post(host+'/route/v1/api/channel/get',{
                    id:parseInt(ids),
                    server:server
                }).then((res) => {
                    // np.b_jingqu_id = res.data.Body.id
                    np.b_jingqu_name = res.data.Body.name
                })
            },
            // 重置
            chongzhi: function () {
                window.location.reload()
            },
     
            // 保存
            saves: function () {

                axios.post(host+'/route/v1/api/channel/update',{
                    id:parseInt(ids),
                    name: np.b_jingqu_name,
                    server:server
                }).then((res) => {
                    alert("修改成功")
                    window.history.go(-1)
                })
            },
           
        },
        mounted: function () {
            this.showqudao();
        }
    })
}