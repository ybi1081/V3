<template>
  <div class="leftMenu">
    <h1>{{ msg }}</h1>
    <h3>system</h3>
    <ul>
       <router-link
            @click="setToolName(list.title)"  
            v-for="list in lists"
            :key="list.key"
            :to="list.link"
            class-active="active"
            exact>
            <li :href="href" @click="setToolName(list.title)" class='whatever-you-want'>
                {{ list.title }}
            </li>
          </router-link>
    </ul>
  </div>
  <sidebar-menu :menu="menu" />
  <router-view/>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    SidebarMenu
  },
  beforeMount() {
        this.$axios.get("/agmet/selectAdminMenuTree.do",
                {  
                  params: {    }
                , headers: { 'Content-Type': 'application/json' }
                })
          .then((res) => {
                console.log("응답 데이터 : " + res.data);
                this.menu = [{id:0, header: 'Main Navigation System', hiddenOnCollapse: true}]
                this.menu.push({id:9999, href: '/salePlttn', title: 'Sale Plttn', icon: 'fa fa-user' })
                this.menu.push({id:99999, href: '/saleFrmhs', title: 'Sale Frmhs', icon: 'fa fa-user' })
                this.menu.push({id:99999, href: '/saleForm', title: 'Sale Form', icon: 'fa fa-user' })
                res.data.forEach((v) =>{ 
                    var url = v.adminMenuUrl;
                    console.log( v)
                    if ( url ){
                        //url = '/saleFrmhs'
                    }else{
                        url = ''
                    }
                    if ( v.upAdminMenuNum == 0 ){
                         this.menu.push({id: v.adminMenuNum ,href: url, title: v.adminMenuNm, icon: 'fa fa-user'})
                    }else{
                        var ix = this.menu.findIndex(function(element) {return element.id == v.upAdminMenuNum});
                        if ( ix > 0){

                            if (typeof this.menu[ix]["child"] == "object") {
                                let child = {id: v.adminMenuNum ,href: url, title: v.adminMenuNm, icon: 'fa fa-user' }
                                this.menu[ix].child.push(child)
                            }else{
                                this.menu[ix].child = [{id: v.adminMenuNum ,href: '/salePlttn', title: v.adminMenuNm, icon: 'fa fa-user' }]
                            }
                        }
                    }
                });
          })
          .catch(error => {
            console.log("에러 데이터 : " + error);
          })
          .finally(() => {
          })

  },
  methods:{
    setToolName: function(_name){
        console.log(_name)
    }
  },
  data() {
      return {
        lists: [
            { link: '/', title: 'about' },
            { link: '/develop', title: 'develop.log' },
            { link: '/thought', title: 'thought.log' },
            { link: '/review', title: 'review.log' },
            { link: '/uncategorized', title: 'uncategorized.log' },
            { link: '#', title: '무무무무무무무무' },
          ],
        menu: [],
        menu_: [
          {
            header: 'Main Navigation',
            hiddenOnCollapse: true
          },
          {
            href: '/',
            title: 'Dashboard',
            icon: 'fa fa-user'
          },
          {
            href: '#',
            title: 'sales',
            icon: 'fa fa-chart-area',
            child: [
              {
                href: '/salePlttn',
                title: 'Sale Plttn'
              },
              {
                href: '/saleFrmhs',
                title: 'Sale saleFrmhs'
              },
            ]
          }
        ]
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
.leftMenu{
    left:0;
    top:0;
    text-align: left;
}
</style>
