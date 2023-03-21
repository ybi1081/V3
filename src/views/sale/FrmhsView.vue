<template>
<div class="leftMenu">
    <LeftMenu msg="Sales Frmhs"/>
</div>
<div style="margin-left: 300px;">
    <h1>Sales Frmhs</h1>
    <LoadingSpinner v-if="isLoading"></loadingSpinner>

    <div ref="table" style="border:1px solid red;width:100%;height:300px;"></div>

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
import {TabulatorFull as Tabulator} from 'tabulator-tables'; //import Tabulator library
export default {
  name: 'FrmhsView',
  components: {
    Profile,
    AgGridVue,
  },
  data() {
    return {
        tabulator: null, //variable to hold your table
        tableData: [
          {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
          {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
          {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
          {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
          {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
        ], //data for table to display
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
  // 페이지가 생성되자마자 호출할 함수
  created() {
    this.searchFn();
  },
    mounted() {
      //instantiate Tabulator when element is mounted
      this.tabulator = new Tabulator(this.$refs.table, {
        data: this.tableData, //link data to table
        reactiveData: true, //enable data reactivity
        columns: [
              { title: "Name", field: "name", width: 150 },
              { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
              { title: "Favourite Color", field: "col" },
              { title: "Date Of Birth", field: "dob", hozAlign: "center" },
              { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
              { title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross" }
        ], //define table columns
      });
    },
  methods:{
    searchFn: function(){
        this.isLoading = true;
        this.$axios.get("/api/agmet/selectAdminMenuTree.do",
                {  
                  params: {    }
                , headers: { 'Content-Type': 'application/json' }
                })
          .then((res) => {
                console.log("응답 데이터 : " + res.data);
                this.rowData = []
                res.data.forEach((v,i) =>{ 
                    this.rowData.push({plttnNum: v.adminMenuNum, plttnNm: v.adminMenuNm, plttnAddr: v.adminMenuUrl })
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