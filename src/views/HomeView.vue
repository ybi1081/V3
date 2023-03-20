<template>
<div class="leftMenu">
    <LeftMenu msg="MENU"/>
</div>
  <div class="home">
    <HelloWorld msg=""/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import LeftMenu from '@/components/LeftMenu.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    LeftMenu
  }
}
</script>
