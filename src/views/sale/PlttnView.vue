<template>

    <div style="margin-left: 250px;width: 1000px;">
        <h1>Sales Plttn</h1>
        <div class="profile">
            <Profile msg="ProfileProfileProfile"/>
            <button v-on:click="searchFn"> Axios Search </button>
        </div>
        <div class="profile">
            <ag-grid-vue
                style="width: 100%; height: 400px"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                :rowData="rowData"
            >
            </ag-grid-vue>
        </div>
    </div>

</template>

<script>
// @ is an alias to /src
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import Profile from '@/components/ProfileWorld.vue'

export default {
  name: 'PlttnView',
  components: {
    Profile,
    AgGridVue,
  },
  data() {
    return {
      columnDefs: [
          { field: "plttnNum", headerName: '아이디', maxWidth: 150, suppressSizeToFit: true  },
          { field: "plttnNm", headerName: '이름', maxWidth: 150, },
          { colId: "plttnAddr", field: "plttnAddr", headerName: '주소', minWidth: 550,  },
      ],
      gridApi: null,
      rowData: [],
      columnApi: null,
      suppressColumnVirtualisation: true,
      defaultColDef: {
        resizable: true,
      },
      isLoading: false,
    };
  },
  beforeMount() {
  },
  mounted() {
  },
  // 페이지가 생성되자마자 호출할 함수
  created() {
    this.searchFn();
  },
  methods:{
    async searchFn(){
        this.isLoading = true;
        this.$axios.get("/api/agmet/selectPlttnInfo.do",
                {  
                  params: {    }
                , headers: { 'Content-Type': 'application/json' }
                })
          .then((res) => {
                console.log("응답 데이터 : " + res);
                this.rowData = []
                res.data.forEach((v,i) =>{ 
                    this.rowData.push({plttnNum: v.plttnNum, plttnNm: v.plttnNm, plttnAddr: v.plttnAddr })
                    console.log( i, v)
                });
                //sizeToFit()
                //this.gridApi.sizeColumnsToFit();

                      this.gridApi.sizeColumnsToFit({
                        defaultMinWidth: 150,
                        columnLimits: [{ key: 'plttnAddr', minWidth: 500 }],
                });


          })
          .catch(error => {
            console.log("에러 데이터 : " + error);
          })
          .finally(() => {
            this.isLoading = false;
          })
    }
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