
export default class HistoryBase {
    constructor({routerTable}){
        this.routerTable = routerTable
    }
    listen(cb){
        this.cb = cb
    }
    // 根据传过来的路由进行判断是否进行跳转至目标路由
    transitionTo(target){
        const route = this.routerTable.match(target)
        this.current = route

        this.cb(this.current)
    }
}