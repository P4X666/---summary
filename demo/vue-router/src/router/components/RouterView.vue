
<script>
export default {
    name:"RouterView",
    render(){
        // 获取当前的路由信息
        const route = this._routerRoot._route
        if(!route){
            // 如果没有匹配到路由信息，可以做一个404
            return
        }
        const { component } = route
        return <component />
    }
}
</script>