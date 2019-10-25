<template>
   <div class="daily">
     <div class="daily-menu">
       <div class="daily-menu-item" @click="showLastedNews">最新消息</div>
       <div class="daily-menu-item" @click="showOldNews">去年今日</div>
       <div class="daily-menu-item" @click="showHotNews">热门消息</div>
       <div class="daily-menu-item" @click="showTotalNews">项目总览</div>
       <ul v-show="showThemes">
         <li class="daily-menu-downitem" v-for="item in themes" :key="item.id">
            <a @click="showSectionitem(item.id)">
              <div class="daily-menu-downitem-img">
               <img :src='item.thumbnail'>
              </div>
             <div class="daily-menu-downitem-title">{{item.name}}</div>
            </a>
         </li>
       </ul>
     </div>
     <div class="daily-list">
       <Item v-for="item in list" :key=item.id+item.local_img :itemList='item'
        @click.native="showArticle(item.local_url)"></Item>
     </div>
     <dailyarticle :artitleUrl="itemUrl"></dailyarticle>   
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
  data(){
    return{
      list:[],
      itemUrl:'',
      themes:[],
      showThemes:false
    }
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
        var list0=[].concat(res.data.stories);
        var list1=[].concat(res.data.top_stories);
        for(var i=0;i<list0.length;i++){
          list0[i].newParam = 'local_img';
          list0[i].local_img = list0[i].images[0];
          list0[i].newparam = 'local_title';
          list0[i].local_title = list0[i].title;
          list0[i].newparam = 'local_url';
          list0[i].local_url = 'api/4/news/'+list0[i].id;
        }
        for(var i=0;i<list1.length;i++){
          list1[i].newParam = 'local_img';
          list1[i].local_img = list1[i].image;
          list1[i].newparam = 'local_title';
          list1[i].local_title = list1[i].title;
          list1[i].newparam = 'local_url';
          list1[i].local_url = 'api/4/news/'+list1[i].id;
        }
        this.list=[].concat(list0,list1);
        })
    },
    showOldNews(){
      axios('api/4/news/before/'+this.getdata()).then((res)=>{
        var list0=[].concat(res.data.stories);
        for(var i=0;i<list0.length;i++){
          list0[i].newParam = 'local_img';
          list0[i].local_img = list0[i].images[0];
          list0[i].newparam = 'local_title';
          list0[i].local_title = list0[i].title;
          list0[i].newparam = 'local_url';
          list0[i].local_url = 'api/4/news/'+list0[i].id;
        }
        this.list=list0;
      })
    },
    showArticle(url){  
      this.itemUrl=url;
    },
    showHotNews(){
      axios('api/3/news/hot').then((res)=>{
        var list0=[].concat(res.data.recent);
        for(var i=0 ;i<list0.length;i++){
          list0[i].newParam='local_img';
          list0[i].local_img=list0[i].thumbnail;
          list0[i].newParam='local_title';
          list0[i].local_title=list0[i].title;
          list0[i].newParam='local_url';
          list0[i].local_url='api/2/news/'+list0[i].news_id;
        }
        this.list=list0;
      })
    },
    showTotalNews(){
      this.showThemes = !this.showThemes;
      axios('api/3/sections').then((res)=>{
        var list0=[].concat(res.data.data);
        this.themes = res.data.data;
      })
    },
    showSectionitem(id){
        axios('api/3/section/'+id).then((res)=>{
         // console.log(res.data.stories);
          var list0=[].concat(res.data.stories);
          for(var i=0;i<list0.length;i++){
            list0[i].newParam='local_img';
            list0[i].local_img=list0[i].images[0];
            list0[i].newParam='local_title';
            list0[i].local_title=list0[i].title;
            list0[i].newParam='local_url';
            list0[i].local_url='api/4/news/'+list0[i].id;
            this.list=list0;
          }
        });
        // axios('api/4/news/8387524').then((res)=>{
        //   console.log(res.data.body);
        // })
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
 
  .daily-menu-downitem{
    float: left;
    display:block;
    width: 130px;
    margin: 5px 0px 5px -35px;
    padding: 5px 0px;
    cursor:pointer;
    transition: all 0.3s ease-in-out;
  }
  .daily-menu-downitem:hover{
    background: #e3e8ee;
  }
  .daily-menu-downitem-img img{
    border-radius: 3px;
    width: 40%;
    float: left;
  }
  .daily-menu-downitem-title{
    font-size: 15px;
    padding-left: 5px;
    float: left;
    height: 50%;
    width: 50%;
  }
</style>    