<template>
<div class="leftMenu">
    <LeftMenu msg="MENU"/>
</div>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
// @ is an alias to /src
import LeftMenu from '@/components/LeftMenu.vue'
export default {
  name: 'AboutView',
  components: {
    LeftMenu
  }
}
</script>
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
.leftMenu{
left:0;
top:0;
}
</style>
