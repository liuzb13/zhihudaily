<template>
    <div class="daily-article">
        <div class="daily-article-title">{{ data.title }}</div>
        <div class="daily-article-content" v-html="data.body"></div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
   props:['artitleUrl'],
   data(){
       return{
           data:{}
       }
   },
   methods:{
       getArticle(){
           axios(this.artitleUrl).then((res)=>{
               this.data=res.data;
           })
       }
   },
   watch:{
       artitleUrl(val){
           if(val) this.getArticle();
       }
   }
}
</script>

<style scoped>
    .daily-article{
        margin-left: 450px;
        padding:20px;
    }
    .daily-article-title{
        font-size: 28px;
        font-weight: bold;
        color: #222;
        padding:10px 0;
    }
    .view-more a{
        display: block;
        cursor: pointer;
        background: #f5f7f9;
        text-align: center;
        color: inherit;
        text-decoration: none;
        padding: 4px 0;
        border-radius: 3px;
    }
</style>