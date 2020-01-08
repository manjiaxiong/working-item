// console.log(qiniu);
import * as qiniu from 'qiniu-js'
// token 找后端，obj 这里指代从 el-upload 接收到的 object
export const upload = (token, obj, next, error, complete) => {
    const {
        file
    } = obj

    // 关于 key 要怎么处理自行解决，但如果为 undefined 或者 null 会使用上传后的 hash 作为 key.
    // const key = formatDate(new Date(), "yyyyMMddhhmmss") + getRandomInt(1000, 9999)
    const key=new Date().getTime()+".png";

    // 因人而异，自行解决
    const putExtra = {
        fname: "",
        params: {},
        mimeType: [] || null
    },
        //       fname: string，文件原文件名
        // params: object，用来放置自定义变量
        // mimeType: null || array，用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
        config = {
            useCdnDomain: true,
            region: null
        }

    let options = {
        quality: 0.92,
        noCompressIfLarger: true,
        maxWidth: 1000,
        maxHeight: 618
    }

    qiniu.compressImage(file, options).then(data => {
        // 调用sdk上传接口获得相应的observable，控制上传和暂停
        console.log(data,'hhhhh')
        console.log(token,'hhhhh')
        console.log(config,'hhhhh')
        console.log(key,"我是key")
        console.log(putExtra,'123123')
        let observable = qiniu.upload(data.dist, key, token, putExtra, config);
        let subscription = observable.subscribe(next, error, complete);
        return subscription
    }).catch(res => {
        console.log(res)
        return res
    })
}