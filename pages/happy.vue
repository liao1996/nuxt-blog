<template>

  <vab-snow class="box">

    <div class="share_box">
        <ul class="share_list">
            <li v-for="item in shareList" @mouseover="seeThis(item.id)"  @mouseleave="seeOver()" :key="item.id">
                 <nuxt-link :to="{ name: `${item.name}`, path:`${item.name}`}">
                    <div class="share_img_box">
                        <transition name="share">
                            <div class="share_content_box" v-if="shareHoverId==item.id">
                                <p class="share_title">{{item.title}}</p>
                                <p class="share_content">{{item.content}}</p>
                                <p class="share_author">—— 制作人：{{item.author}}</p>
                            </div>
                        </transition>
                        <img :src="item.src" alt="" class="share_img">
                    </div>
                    <transition name="share_tag">
                         <el-tag :style="{color:$store.state.style.tag[item.tag]}" class="share_tag" v-if="shareHoverId==item.id">{{item.tag}}</el-tag>
                    </transition>             
                 </nuxt-link>
            </li>
            <div class="clear"></div>
        </ul>
    </div>
  </vab-snow>
 
</template>
<script>
import wuziqi from "~/assets/img/wuziqi.svg";
import num2048 from "~/assets/img/num2048.svg";
import VabSnow from "~/components/VabSnow";
export default {
  components:{
    VabSnow
  },
    data() {
        return {
            shareHoverId:0,
            shareList:[{
              name:"gobang",
              id:1,
              title:"五子棋",
              content:"用Vue实现的五子棋游戏，快来与AI决一死战吧。鼠标点击操作即可。",
              author:"手辰",
              tag:"休闲",
              src:wuziqi
            },{
              name:"num2048",
              id:2,
              title:"2048",
              content:"2048小游戏，按上下左右键合并数字，冲击你的最高分吧。",
              author:"手辰",
              tag:"益智",
              src:num2048
            }]
        }
    },
    methods: {

        seeThis(id){
          console.log(11)
            this.shareHoverId=id;
        },
        seeOver(){
          console.log(22)
            this.shareHoverId=0;
        }
    },
}
</script>
<style scoped>
@import url("~/assets/pagecss/happy.css");
@import url("~/assets/pagecss/happymobile.css");
</style>