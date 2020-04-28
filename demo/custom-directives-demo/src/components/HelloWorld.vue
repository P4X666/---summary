<template>
  <div class="hello">
    <!-- <div v-resize="onResize">window width is:{{length}}</div> -->
    <div v-resize:[direction].quiet="onResize">window {{direction==="vertical"?"height":"width"}} is:{{length}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      direction:"vertical",
      length:0
    }
  },
  methods:{
    onResize(length){
      this.length = length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
