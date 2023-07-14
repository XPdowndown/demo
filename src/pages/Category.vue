<template>
  <div id="category">
    <Header>
      <template slot="left">
        <div class="left"></div>
      </template>
      <template slot="center">
        <div class="center">商品分类</div>
      </template>
      <template slot="right">
        <div class="right"></div>
      </template>
    </Header>
    <Search />
    <Cates />

    <Footer v-show="$store.state.bottomShow" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Search from "@/components/Search";
import Cates from "@/components/Cates";
import Footer from "@/components/Footer";

export default {
  name: "Category",
  components: { Header, Search, Cates, Footer },
  // components: { Footer },
};
</script>

<style scoped>
#category {
  width: 100%;
}
</style>