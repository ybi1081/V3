<template>
<div class="leftMenu">
    <LeftMenu msg="Sales Frmhs"/>
</div>
<div style="margin-left: 300px;display: inline-block;">
    <div class="leftMenu">
        <LeftMenu msg="Sales Plttn"/>
    </div>
    <LoadingSpinner v-if="isLoading"></loadingSpinner>
    </div>
    <div>
        <input v-model="message" placeholder="여기를 수정해보세요">
        <p>메시지: {{ message }}</p>

        <select v-model="selected">
          <option v-for="option in options" v-bind:key="option.value">
            {{ option.text }}
          </option>
        </select>
        <span>Selected: {{ selected }}</span>
        <br>
            <input
              type="checkbox"
              v-model="toggle"
              true-value="yes"
              false-value="no"
            > 체크
            <br>
            <input type="radio" v-model="pick" v-bind:value="a">
            <br>
            <!--<base-input v-model="inputText"></base-input>-->
            <br>
            <input type="text" v-model="id">
            <br>
            <input type="text" v-model="nm">
            <br>
            <input type="text" v-model="add">
            <br>

            <button v-on:click="addTodo">저장</button>
    </div>


</template>

<script>
export default ({
  name: "FormView",
  components: {
  },
  data() {
      return{
        layout: null,
        options: [
          { text: 'One', value: 'A' },
          { text: 'Two', value: 'B' },
          { text: 'Three', value: 'C' }
        ],
        selected: 'A',
        todoItem:'',
        id:'',
        nm:'',
        add:'',
        data: { _id: ''
               , _nm: ''
               , _add: ''
        },
        isLoading: false,
        popupView : false,
      }
  },
  methods: {
      async addTodo(){
          if (this.id !== ''){
            this.data.adminNum = 1
            this.data.sggNoticeContent = this.nm
            this.data.sggNoticeTitle = this.add
            this.data.administZoneCd = 46170
            //this.$emit('addItemEvent', this.todoItem);
            //this.todoItem= '';
            this.isLoading = true;

            let res = await this.$axios.get("/agmet/selectAdminMenuTree.do")
            console.log(res.data)

            console.log(this.data);
                this.$axios.get("/agmet/insertSggNotice.do",
                    {  
                      params: this.data
                    , headers: { 'Content-Type': 'application/json' }
                    })
                .then((res) => {
                    console.log("응답 데이터 : " + res.data);
                    alert('저장되었습니다.')
                  })
                  .catch(error => {
                    console.log("에러 데이터 : " + error);
                  })
                  .finally(() => {
                    this.isLoading = false;
                  })


          }

      },
  },
  created() {
    
  },
})
</script>
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