import Vue from 'vue'
import RouterView from './components/RouterView'

Vue.component('RouterView',RouterView)
import Html5Mode from './mode/history'

// 路由表
class RouterTable {
    constructor(routes){
        this._pathMap = new Map()
        this.init(routes)
    }
    init(routes){
        const addRoute = route =>{
            this._pathMap.set(route.path,route)
        }
        //  将项目中的路由都添加进去
        routes.forEach(route => addRoute(route));
    }
    // 路由路径匹配
    match(path){
        let find
        for(let key of this._pathMap.keys()){
            if(path===key){
                find=key
                break
            }
        }
        return this._pathMap.get(find)
    }
}

export default class Router {
    constructor({routes}=[]){
        this.routerTable = new RouterTable(routes)
        this.history = new Html5Mode(this)
    }
    // 将Vue实例传入,当route发生改变时，将Vue实例下的_route进行替换
    init(app){
        const { history } = this
        history.listen(route =>{
            app._route = route
        })
        history.transitionTo(history.getCurrentLocation())
    }
}

Router.install = function () {
    Vue.mixin({
        beforeCreate(){
            if(this.$options.router !== undefined){
                this._routerRoot = this
                this._router = this.$options.router

                this._router.init(this)
                // 将_route定义为响应式
                console.log(this._route)
                Vue.util.defineReactive(this,'_route',this._route.history.current)
            } else {
                this._routerRoot = this.$parent && this.$parent._routerRoot;
            }
        }
    })
}
