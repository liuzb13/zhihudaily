<template>
   <div class="daily">
     <div class="daily-menu">
       <div class="daily-menu-item" @click="showLastedNews">最新消息</div>
       <div class="daily-menu-item" @click="showOldNews">去年今日</div>
     </div>
     <div class="daily-list">
       <Item v-for="item in list" :key="item.id" :parentList="item" @click.native="showArticle(item.id)"></Item>
     </div>
     <dailyarticle :articleId="id"></dailyarticle>   
   </div>
</template>

<script>
import axios from 'axios';
import Item from './components/item';
import dailyarticle from './components/daily-article';
export default {
  components:{
    Item,
    dailyarticle
  },
  methods:{
    getdata(){
      var date=new Date();
      var yy=date.getFullYear()-1;
      var mm=(date.getMonth()+1).toString().padStart(2,'0');
      var dd=(date.getDate()+1).toString().padStart(2,'0');
      return yy+mm+dd;
    },
    showLastedNews(){
      axios('api/4/news/latest').then((res)=>{
        this.list = res.data.stories.concat(res.data.top_stories);
      })
    },
    showOldNews(){
      axios('api/4/news/before/'+this.getdata()).then((res)=>{
        this.list=res.data.stories;
      })
    },
    showArticle(id){  
      this.id=id;
    }
  },
  data(){
    return{
      list:[],
      id:0
    }
  }
}
</script>

<style scoped>
  .daily-menu{
    width: 150px;
    position :fixed;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background :#f5f7f9;
  }
  .daily-menu ul li{
    list-style-type: none;
  }
  .daily-menu-item{
    font-size: 18px;
    text-align: center;
    margin: 5px 0;
    padding:10px 0;
    cursor:pointer;
    border-right: 2px solid transparent;
    transition: all 0.3s ease-in-out;
  }
  .daily-menu-item:hover{
    background:#e3e8ee;
  }
  .daily-list{
    width: 300px;
    position: fixed;
    top: 0;
    bottom:0;
    left:150px;
    overflow:auto;
    border-right:1px solid #d7dde4;
  }  
  .daily-item{
    display: block;
    color:inherit;
    text-decoration: none;
    padding:16px;
    overflow: hidden;
    cursor: pointer;
    transition:all 0.3s ease-in-out;
  }
  .daily-item:hover{
    background: #e3e8ee;
  }
  .daily-article{
    margin-left:450px;
    padding:20px;
  }
  .daily-menu ul li a{
    display: block;
    color: inherit;
    text-emphasis: none;
    padding:5px 0;
    margin: 5px 0;
    cursor:pointer;
  }
  .daily-menu ul li a{
    color:#3399ff;
  }
</style>    