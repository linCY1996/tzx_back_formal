package control

import (
	"io/ioutil"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/login.html`)
	w.Write(buf)
}

func View(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/index.html`)
	w.Write(buf)
}

//导游管理
func Dygl(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/dygl/dygl.html`)
	w.Write(buf)
}

func Bianji(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/dygl/bianji.html`)
	w.Write(buf)
}

func Dygl_add(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/dygl/dygl_add.html`)
	w.Write(buf)
}

func Dygl_chaxun(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/dygl/chaxun.html`)
	w.Write(buf)
}

//POI管理
func POIgl(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/POIgl/poigl.html`)
	w.Write(buf)
}

func POIbianji(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/POIgl/bianji.html`)
	w.Write(buf)
}

func POI_add1(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/POIgl/poi_add1.html`)
	w.Write(buf)
}

func POI_add2(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/POIgl/poi_add2.html`)
	w.Write(buf)
}
func POI_add3(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/POIgl/poi_add3.html`)
	w.Write(buf)
}

func POIAddTask(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/POIgl/addtask.html`)
	w.Write(buf)
}

func POI_now_Add1(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/POIgl/poi_now_add1.html`)
	w.Write(buf)
}

func POI_chaxun(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/POIgl/chaxun.html`)
	w.Write(buf)
}

//路线管理
func Lxgl(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/lxgl/lxgl.html`)
	w.Write(buf)
}

func Lxbianji(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/lxgl/bianji.html`)
	w.Write(buf)
}
func Lxadd(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/lxgl/lxgl_add.html`)
	w.Write(buf)
}

func LxDetail(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/lxgl/lxdetail.html`)
	w.Write(buf)
}

func Lxchaxun(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/lxgl/chaxun.html`)
	w.Write(buf)
}

//首页&详情页管理
func FirstPagegl(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/firstPage/firstPage.html`)
	w.Write(buf)
}

func FirstPagebianji(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/firstPage/bianji.html`)
	w.Write(buf)
}

func FirstPageXQ(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/firstPage/xiangqing.html`)
	w.Write(buf)
}

func FirstPageadd(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/firstPage/first_add.html`)
	w.Write(buf)
}

func FirstPagechaxun(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/firstPage/chaxun.html`)
	w.Write(buf)
}

func FirstPagexiangbianji(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/firstPage/xiangbannerBianji.html`)
	w.Write(buf)
}

//渠道管理
func Qudaogl(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/qudaoCon/qudaoCon.html`)
	w.Write(buf)
}

func Qudaobianji(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/qudaoCon/bianji.html`)
	w.Write(buf)
}

func Qudaoadd(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/qudaoCon/qudao_add.html`)
	w.Write(buf)
}

func Qudaochaxun(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/qudaoCon/chaxun.html`)
	w.Write(buf)
}

//版本控制
func Banben(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/banben/banben.html`)
	w.Write(buf)
}

func Banbenadd(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/banben/ban_add.html`)
	w.Write(buf)
}

func Banbainji(w http.ResponseWriter, r *http.Request) {
	buf, _ := ioutil.ReadFile(`view/banben/bianji.html`)
	w.Write(buf)
}
