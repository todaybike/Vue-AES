<template>
  <div class="home">
    <!-- img alt="Vue logo" src="../assets/logo.png" -->
    <HelloWorld msg="AES 암호화 테스트 1.0"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
