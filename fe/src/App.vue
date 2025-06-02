<template>
  <!-- Phần này là cho nó được hiển thị lên -->
  <Header/>
  <Footer/>
  
</template>

<script>
// Phần này là import sử dụng các component khác
import Header from './components/ComHeader.vue'
import Footer from './components/ComFooter.vue'
export default {
  name: 'App',
  components: {
    // Phần này là chúng ta sử dụng kêu nó hiển thị
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
