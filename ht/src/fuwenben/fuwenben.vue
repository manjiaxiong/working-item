<template>
  <div>
    <!--这个地方的大小是可以自己控制的-->
    <div id="editor"></div>
    <!-- <button @click="getUEContent">确定</button> -->
  </div>
</template>

<script type="text/javascript">
    // document.domain = "dingyuan.picp.vip";
    document.domain = "api.klgj.top";
</script>
<script>
import "../../static/ueditor/ueditor.config.js";
import "../../static/ueditor/ueditor.all.js";
import "../../static/ueditor/lang/zh-cn/zh-cn.js";
import "../../static/ueditor/ueditor.parse.js";

export default {
  name: "child1",
  props: {
    value: {
      type: String,
      default: ""
    },
    classifyDescribe:{
      type: String
    }
  },
  watch:{
    classifyDescribe(val){
      console.log('富文本有变化',val)
      this.classifyDescribe = val
      this.change(val)
      // this.value = val
    }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    if (this.$store.state.primaryclassification.classifyDescribe) {
      this.value = this.$store.state.primaryclassification.classifyDescribe;
    }
    console.log('this.value',this.classifyDescribe,this.value)

    this.editor = window.UE.getEditor("editor");
    // 设置编辑器默认内容
    if(this.classifyDescribe){
      this.editor.addListener("ready", () => {
        // this.editor.setContent(this.value);
        this.editor.setContent(this.classifyDescribe);
        // this.editor.setContent('<h1>我是富文本</h1>');
      });
    }
    
    this.editor.loadServerConfig();
    console.log(123);
    console.log(this.editor.isServerConfigLoaded())
    // this.editor.afterConfigReady()
  },
  methods: {
    //获取编辑器中的内容
    getUEContent() {
      return this.editor.getContent();
    },
    change(val) {
      console.log('fuwenbenChange:',val)
      this.editor.setContent(val);
    }
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>
<style lang="scss">
#edui_fixedlayer {
  z-index: 2047 !important;
}
// .UE{
//     width:500px;
//     height:500px;
// }
#editor {
  width: 100%;
  #edui1{
    width: 80%;
  }
  #edui1_iframeholder{
    width: 90%;
    height: 200px;
  }
}
</style>
