<template>
  <div>
    <div>
      <my-time></my-time>
    </div>
    <my-char ref="hhh" :num="7"></my-char>
  </div>
</template>
<script>
import MyChar from "../echar/tongji";
import MyTime from "../timenav";
import api from "@/api/liulan";
export default {
  components: {
    MyChar,
    MyTime
  },
  created(){
      this.init();
  },
  methods: {
    getTime(val) {
      let time = {
        startTime: val.startDate,
        endTime: val.endDate
      };
      this.init(time);
    },
    getDate() {},
    init(temp) {
      api
        .getAllWatch({
          startDate: temp ? temp.startTime : null,
          endDate: temp ? temp.endTime : null
        })
        .then(res => {
          this.list = res.data.data;
          let that = this;
          setTimeout(function() {
            console.log(res.data.data, "我是原装的");
            that.$refs.hhh.init(res.data.data);
          }, 200);
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>