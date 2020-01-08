<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
     <add-banner v-if="$store.state.bannder.state"></add-banner>

  </div>
</template>

<script>
import AddBanner from "../src/page/Lwq/mianTitle/mark/addBanner/index";
export default {
  name: "App",
  components: {
    AddBanner
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  provide(){ //提供
    return {
      reload: this.reload
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false
      this.$nextTick( function () {
        this.isRouterAlive = true
      })
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/index.scss";

* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
html {
  font-size: 16px;
}
#app {
  position: relative;
  overflow: hidden;
}
                  th{
                    padding: 0 !important;
                  }
td{
  padding: 0!important;
}
.el-button{
  padding: 5px;
}
table {
  width: 100%;
  font-size: 16px;
}
.color {
  color: #555;
  background: #f7f7f7;
  th {
    padding: 10px 10px;
  }
}
.Myhover {
  color: #555;
  &:hover {
    background-color: rgb(242,242,242);
    /*color: #fff;*/
  }
  td {
    text-align: center;
    /*padding: 1px 0;*/
    // border: 1px solid #ccc;

    &:hover {
    }
  }
}
.border {
  display: inline-block;
  border: 1px solid #888;
  padding: 0 20px;
  width: 50px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.juzhong {
  display: flex;
  justify-content: center;
  align-items: center;
}
.lwqimgswtach {
  // width: 50px;
  // height: 58px;
  margin: auto;
  cursor: pointer;
  width: 50px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
}


</style>
