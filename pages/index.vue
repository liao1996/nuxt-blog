<template>
  <div class="container">
    <nav>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">推荐</el-menu-item>
        <el-submenu index="2">
          <template slot="title">分类</template>
          <el-menu-item index="2-1">前端</el-menu-item>
          <el-menu-item index="2-2">算法</el-menu-item>
          <el-menu-item index="2-3">架构</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">其他</template>
            <el-menu-item index="2-4-1">生活琐事</el-menu-item>
            <el-menu-item index="2-4-2">心灵鸡汤</el-menu-item>
            <el-menu-item index="2-4-3">天马行空</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled title="登陆后才能查看">消息中心</el-menu-item>
        <el-menu-item index="4">
          <a href="http://www.eightythousand.com" target="_blank">小喵八万</a>
        </el-menu-item>
      </el-menu>
      <div class="line"></div>
    </nav>
    <transition-group name="bolgList" tag="ul" class="bolg_list">
      <li v-for="(item,index) in blogList" :key="item.id" :hid="item.id" :data-index="index">
        <!-- :class="{bolg_click:bolg.bolgListClick==item.id}"
         @mousedown="BolgDown"
        @mouseup="BolgUp"-->
        <div class="list_img_box">
          <!-- <img :src="item.imgUrl" alt="" class="list_img"> -->
          <div class="list_title_box">
            <div class="list_title">
              <Icon type="ios-quote" class="t_l_icon" size="20" />
              {{item.title}}
              <Icon type="ios-quote" class="t_r_icon" size="20" />
            </div>
            <p
              style="text-align: center;color: rgba(92,107,119,0.8);"
              class="list_time"
            >发布日期：&nbsp;&nbsp;&nbsp;{{item.time}}</p>
          </div>
        </div>
        <div class="list_info">
          <p class="list_content" v-html="item.realContent"></p>
          <div class="list_record">
            <span class="list_record_span" style="margin-left: 0px;">
              <Icon type="md-eye" size="15" />
              &nbsp;&nbsp;&nbsp;{{item.readNum}}
            </span>
            <span class="list_record_span">
              <Icon type="md-heart" size="15" />
              &nbsp;&nbsp;&nbsp;{{item.loveNum}}
            </span>
            <span class="list_record_span">
              <Icon type="logo-foursquare" size="15" />
              &nbsp;&nbsp;{{item.fontNum}}
            </span>
            <div class="list_tag">
              <div v-for="tag in item.tags" :key="tag" class="tag">
                <Icon
                  :type="$store.state.tag[tag].style"
                  :color="$store.state.tag[tag].color"
                  size="18"
                  style="line-height: 1px;"
                />
                &nbsp;{{tag}}
              </div>
            </div>
          </div>
        </div>
        <div class="new" v-if="(new Date()-new Date(item.time))/86400000<=newTime">new</div>
        <!-- <div class="hr"></div> -->
      </li>
    </transition-group>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  data() {
    return {
      categories: [
        { router: { name: "index" }, name: "推荐" },
        { router: { path: "/welcome/frontend" }, name: "前端" },
        { router: { path: "/welcome/android" }, name: "Android" },
        { router: { path: "/welcome/backend" }, name: "后端" },
        { router: { path: "/welcome/ai" }, name: "人工智能" },
        { router: { path: "/welcome/ios" }, name: "iOS" },
        { router: { path: "/welcome/freebie" }, name: "工具资源" },
        { router: { path: "/welcome/article" }, name: "阅读" }
      ],
      activeIndex: "1",
      blogList: [
        {
          content:
            '<p><br></p><div class="block_light">由于最近学业较重，很少更新文章了～～<br><p></p><p>在某一天我产生了一个想法，想知道我女朋友实时的位置信息，并显示在地图上，可以查看她的路径和当前速度等信息；就像微信里面的位置共享一样，但是我想要全天候共享位置。我在网上找了很多app，很多都不能达到我的要求，大部分都是不能用或者有病毒的。我寻思着要不自己做一个？经历了两三周平常挤出来的时间，做出了这样的一个微信小程序。和女朋友测试了一周后感觉还不错，就决定挂在平台上，大家有想用的可以微信小程序搜索：“寻寻Ta”。对于异地恋的情侣再好不过了（滑稽）。</p></div><br><p></p><p></p><div id="point_1" class="catalog_title">小程序介绍</div><p></p><p>名称：</p><p><br></p><div class="block_light">寻寻Ta</div><br><p></p><p>简介：</p><p><br></p><div class="block_light">双方实时监测对方的位置等信息，适合情侣之间使用</div><br><p></p><p>功能：</p><p><br></p><div class="block_light"><p></p><p>· 实时获取（监测）对方位置</p><p>· 查看对方经过的路径</p><p>· 查看对方手机电量</p><p>· 情侣打卡记录</p><p><span style="color: rgb(192, 0, 0);">（3月30号）即将新增功能：</span></p><p><span style="color:#c00000">· 可以通过分享链接进行邀请</span></p><p><span style="color:#c00000">· 查看对方在线还是离线<br></span></p><p><span style="color:#c00000">· 实时获取对方的环境录音（录像）</span></p><p><br></p><p></p></div><br><p></p><p>小程序截图：</p><p><img src="../../img/1207328440278192128.jpg" title="" alt="qq_pic_merged_1576684069589.jpg">&nbsp; &nbsp; &nbsp; &nbsp;<img src="../../img/1207328536273227776.jpg" title="" alt="qq_pic_merged_1576684085531.jpg"></p><p><br></p><p><img src="../../img/1207328753286516736.jpg" title="" alt="qq_pic_merged_1576684092403.jpg"></p><p><br></p><p>下载地址：</p><p><br></p><div class="block_light">微信小程序搜索：“寻寻Ta”</div><br><p></p><p><br></p><p>小程序二维码：</p><p><img src="../../img/1207507623977553920.jpg" title="" alt="gh_694272aba684_430.jpg"></p><p><br></p><p></p><div id="point_2" class="catalog_title">未完待续</div><p></p><p>.......（太晚了，文章明天写）</p><p><br></p><p></p><div id="point_3" class="catalog_title">结语</div><p></p><p>有什么新奇的想法小伙伴可以提出来，我尽力去实现，让这个小程序为情侣之间或者朋友之间带来更多有趣或者更实用的功能，谢谢大家。对于这个位置共享小程序如果很多人感兴趣我会不断地维护下去。</p><p>服务器负载变大了，目前用的还是最便宜的服务器，手头还较宽裕的朋友，打赏下博主吧！用来换个服务器，感激不尽。<img src="http://img.baidu.com/hi/bobo/B_0011.gif"></p><p><br></p><p>支付宝：</p><p style="text-align:center"><img src="../../img/1207332981258194944.jpg" title="" alt="qq_pic_merged_15766854.jpg"></p><p><br></p>',
          fontNum: 635,
          id: 58,
          loveNum: 3,
          point: "point_1,小程序介绍,point_2,未完待续,point_3,结语",
          readNum: 259,
          realContent:
            '<p>|||由于最近学业较重，很少更新文章了～～<br/></p><p>在某一天我产生了一个想法，想知道我女朋友实时的位置信息，并显示在地图上，可以查看她的路径和当前速度等信息；就像微信里面的位置共享一样，但是我想要全天候共享位置。我在网上找了很多app，很多都不能达到我的要求，大部分都是不能用或者有病毒的。我寻思着要不自己做一个？经历了两三周平常挤出来的时间，做出了这样的一个微信小程序。和女朋友测试了一周后感觉还不错，就决定挂在平台上，大家有想用的可以微信小程序搜索：“寻寻Ta”。对于异地恋的情侣再好不过了（滑稽）。|||</p><p>^^^小程序介绍^^^</p><p>名称：</p><p>|||寻寻Ta|||</p><p>简介：</p><p>|||双方实时监测对方的位置等信息，适合情侣之间使用|||</p><p>功能：</p><p>|||</p><p>· 实时获取（监测）对方位置</p><p>· 查看对方经过的路径</p><p>· 查看对方手机电量</p><p>· 情侣打卡记录</p><p><span style="color: rgb(192, 0, 0);">（3月30号）即将新增功能：</span></p><p><span style="color:#c00000">· 可以通过分享链接进行邀请</span></p><p><span style="color:#c00000">· 查看对方在线还是离线<br/></span></p><p><span style="color:#c00000">· 实时获取对方的环境录音（录像）</span></p><p><br/></p><p>|||</p><p>小程序截图：</p><p><img src="../../img/1207328440278192128.jpg" title="" alt="qq_pic_merged_1576684069589.jpg"/>&nbsp; &nbsp; &nbsp; &nbsp;<img src="../../img/1207328536273227776.jpg" title="" alt="qq_pic_merged_1576684085531.jpg"/></p><p><br/></p><p><img src="../../img/1207328753286516736.jpg" title="" alt="qq_pic_merged_1576684092403.jpg"/></p><p><br/></p><p>下载地址：</p><p>|||微信小程序搜索：“寻寻Ta”|||</p><p><br/></p><p>小程序二维码：</p><p><img src="../../img/1207507623977553920.jpg" title="" alt="gh_694272aba684_430.jpg"/></p><p><br/></p><p>^^^未完待续^^^</p><p>.......（太晚了，文章明天写）</p><p><br/></p><p>^^^结语^^^</p><p>有什么新奇的想法小伙伴可以提出来，我尽力去实现，让这个小程序为情侣之间或者朋友之间带来更多有趣或者更实用的功能，谢谢大家。对于这个位置共享小程序如果很多人感兴趣我会不断地维护下去。</p><p>服务器负载变大了，目前用的还是最便宜的服务器，手头还较宽裕的朋友，打赏下博主吧！用来换个服务器，感激不尽。<img src="http://img.baidu.com/hi/bobo/B_0011.gif"/></p><p><br/></p><p>支付宝：</p><p style="text-align:center"><img src="../../img/1207332981258194944.jpg" title="" alt="qq_pic_merged_15766854.jpg"/></p><p><br/></p>',
          tags: ["架构", "其它"],
          time: "2019-12-19",
          title: "位置实时共享app（微信小程序）（3.31更新已上线）"
        }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
    // BolgDown(el) {
    //   this.bolg.bolgListClick = el.currentTarget.getAttribute("hid");
    //   // this.$router.push('/Article/'+el.currentTarget.getAttribute('hid'));
    // },
    // BolgUp(el) {
    //   this.$router.push("/Article/" + el.currentTarget.getAttribute("hid"));
    //   this.bolg.bolgListClick = "";
    // }
  }
};
</script>

<style lang="stylus" scoped>
@import url('~/assets/pagecss/blogmain.css');

.container {
  nav {
    left: 0;
    background-color: #fff;
    position: fixed;
    top: 5rem;
    width: 100%;
    z-index: 100;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
    transform: translateZ(0);

    .el-menu-demo {
      left: 38rem;
    }
  }
}
</style>
