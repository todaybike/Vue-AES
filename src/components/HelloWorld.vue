<template>
  <div class="hello">
    <h1 class="title">{{ msg }}</h1>
    문자열 <input type="text" size=60 v-model="stringInput" placeholder="암호화할 문자열을 넣으세요."><br>
      <br>

      암호화 : <div id="enc">{{ encrypt() }}</div><br>
      
      복호화 : <div id="dec">{{ decrypt() }}</div><br>
      <br>

      SVR ENcoding : <div id="serverDecoding">{{ stringServerEncoded }}</div>
      <button v-on:click="serverEncoding()">서버에서 인코딩 결과 가져 오기 (encoding.jsp)</button>
      <br>
      <br>
      SVR DEcoding : <div id="serverEncoding">{{ stringServerDecoded }}</div>
      <button v-on:click="serverDecoding()">서버에서 디코딩 결과 가져 오기 (decoding.jsp)</button>
      <br>

      <br><br>


      <footer>2019.4.2 rimbrake. </footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Crypto from '@/components/Crypto';
import axios from 'axios';

@Component
export default class HelloWorld extends Vue {

  public stringInput: string = '';
  public stringEncoded: string = '';
  public stringDecoded: string = '';
  public stringServerEncoded: string = '';
  public stringServerDecoded: string = '';

  @Prop() private msg!: string;

  public encrypt(): string {
    const crypto = new Crypto();
    this.stringEncoded = crypto.encrypt( this.stringInput );
    return this.stringEncoded;
    // return "";
  }

  public decrypt(): string {
    const crypto = new Crypto();
    this.stringDecoded = crypto.decrypt( this.stringEncoded );
    return this.stringDecoded;
    // return "";
  }

  //
    // 서버 인코딩
    public serverEncoding(): string {
      axios({
        method: 'GET',
        url: 'encoding.jsp',
        params: { line: this.stringInput },

      })
      .then( (res: any) => {
        console.log(res);
        this.stringServerEncoded = res.data;
      })
      .catch( (ex: any) => {
        console.log('error:' + ex );
        this.stringServerEncoded = '';
      });

      console.log( this.stringServerEncoded );

      return this.stringServerEncoded;
    }

    //
    // 서버에서 디코딩 하기.
    public serverDecoding(): string {
      axios({
        method: 'GET',
        url: 'decoding.jsp',
        params: { line: this.stringEncoded },

      })
      .then( (res: any) => {
        console.log(res);
        this.stringServerDecoded = res.data;
      })
      .catch( (ex: any) => {
        console.log('error:' + ex );
        this.stringServerDecoded = '';
      });

      console.log( this.stringServerDecoded );

      return this.stringServerDecoded;
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
} 
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.title { text-align: center; }
.hello {
  text-align: left;
}
</style>
