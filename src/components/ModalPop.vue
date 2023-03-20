<template>
      <div class="close-image">
        <img src="../assets/button.png" alt="" @click="closePopup()">
      </div>
</template>


<style scoped>
.popup-view{
  opacity: 0;
  display: none;
  visibility: hidden;
}
.active{
  opacity: 1;
  display: block;
  visibility: visible;
}
</style>