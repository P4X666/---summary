// export default {
//     loginIn:"/api/loginIn",
//     loginOut:"/api/loginOut"
// }

class infocache{
    constructor(max_number,popularArr){
        this.max_number=max_number 
        this.popularArr=popularArr
        this.cache=this.iscaches()
    }


 getnew(id) {
    // 根据id查找最新的商品
    // api
    // 更新到缓存中
    this.cache(id)
}

 iscaches(){
    // 声明一个变量，通过闭包保存
    let cache={}
    return function(id,isget) {
        if(cache[id]){
            // 从缓存中获取
            return '缓存'
        }else{
            // 发送请求
            cache[id]=id
            return '请求'
        }
    }
}

 ispopular(){
    let commodity={popular:0,unpopular:0}
    return function (id,max_number) {
        // 如果非热门
        if(this.popularArr.indexOf(id)===-1){
            if(commodity.unpopular===max_number.unpopular){
                // 提示存储的商品已到达上限
                return
            }
            commodity.unpopular++
            localStorage.setItem()
        }else{
            // 如果热门
            if(commodity.unpopular===max_number.popular){
                // 提示存储的商品已到达上限
                return
            }
            commodity.popular++
            window.popular
        }
    }
}
}