<template>
    <a class="daily-item">
        <div class="daily-img">
            <img :src="pic">
        </div>
        <div class="daily-title">{{ parentList.title }}</div>
    </a>
</template>

<script>
export default {
    data(){
        return{
            pic:''
        }
    },
    props:['parentList'],
    created(){
        if(this.parentList.images)
            this.pic=this.parentList.images[0];
            else if(this.parentList.image)
                    this.pic=this.parentList.image;
    }
}
</script>

<style scoped>
    .daily-item{
        display: block;
        color: inherit;
        text-decoration: none;
        padding:16px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }
    .daily-item:hover{
        background:#e3e8ee;
    }
    .daily-img{
        width: 80px;
        height: 80px;
        float: left;
    }
    .daily-img img{
        width: 100%;
        height: 100%;
        border-radius: 3px;
    }
    .daily-title{
        padding:10px 5px 10px 90px;
    }
    .daily-title.noImg{
        padding-left: 5px;
    }
</style>