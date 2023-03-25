import axios from 'axios'
export function requestLocal(config) {
  return new Promise((resolve, reject) => {
    //1.创建axios的实例
    const instance = axios.create({
      // baseURL: "https://netease-cloud-music-api-edvq.vercel.app",
      baseURL: 'http://localhost:80',
      timeout: 5000
    })
    //2.发送真正的请求
    instance(config)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            })
  })
}