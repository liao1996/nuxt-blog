<template>
  <el-autocomplete
    popper-class="my-autocomplete"
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="搜索文章"
    @select="handleSelect"
  >
    <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick"></i>
    <template slot-scope="{ item }">
      <div class="name">{{ item.title }}</div>
      <span class="addr">{{ text(item.content )}}</span>
    </template>
  </el-autocomplete>
</template>

<style lang="stylus">
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>

<script>
import { getQueryString, getQueryBlogList } from "~/api/articlelist";
export default {
  data() {
    return {
      state: ""
    };
  },
  methods: {
    querySearch(queryString, cb) {
     // if (queryString.length > 0) {
        getQueryString(queryString?queryString:"").then(res => {
          cb(res.result.data);
        });
     // }
    },
    text(str) {
      str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
      str = str.replace(/[ | ]*\n/g, "\n"); //去除行尾空白
      str = str.replace(/\n[\s| | ]*\r/g, "\n"); //去除多余空行
      str = str.replace(/&nbsp;/gi, ""); //去掉&nbsp;
      str = str.replace(/\s/g, ""); //将空格去掉
      return str;
    },
    handleSelect(item) {
      const title = item.title;
      getQueryBlogList(title).then(res => {
        const data = res.result.data;
        //this.$store.commit("global/updateBlogList",data)
        this.$router.push({
          name: "detail-id",
          path: "/detail",
          query: { id: parseInt(data[0].id) }
        });
      });
    },
    handleIconClick(ev) {
      console.log(ev);
    }
  }
};
</script>