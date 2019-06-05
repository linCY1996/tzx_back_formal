

// const host ="https://tzxtest.tuzuu.com",//演示服
// const host = "https://tuzhuxin5.tuzuu.com",//开发版
// const host = "https://tuzhuxing.tuzuu.com",//正式服
const host  = "https://tzx-admin.tuzuu.com"

// get
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(host+url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

// post
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(host+url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}