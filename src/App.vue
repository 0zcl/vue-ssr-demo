<template>
  <div id="app">
    <router-link to="/bar">Goto Bar</router-link> 
    <router-link to="/foo">Goto Foo</router-link> 
    <router-view></router-view>
  </div>
</template>

<script>
import Foo from './components/Foo.vue';
import Bar from './components/Bar.vue';
export default {
  beforeCreate() {
    console.log('App.vue beforeCreate');
  },
  created() {
    console.log('App.vue created');
  },
  beforeMount() {
    console.log('App.vue beforeMount');
  },
  mounted() {
    console.log('App.vue mounted');
  },
  components: {
    Foo, Bar
  }
}
</script>
