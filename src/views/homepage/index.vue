<<template>
  <slide-show :slides="slides" :inv="slideSpeed"></slide-show>
</template>

<script>
import slideShow from '../../components/SlideShow/slideShow'

export default {
  components:{
      slideShow
  },
  data(){
      return {
          slides:[
                { 
                src:require("./image/1.jpg"),
                title:'欢迎志愿者的加入'
                //href:'http://www.baidu.com'
                },
                {
                src:require("./image/2.jpg"),
                title:'像小天使般的志愿者'
                //href:'index'
                },
                {
                src:require("./image/3.jpg"),
                title:'志愿服务从今天开始'
                //href:'./index'
                },
                {
                src:require("./image/4.jpg"),
                title:'志愿服务从小做起'
                //href:'../form/index'
                }
          ]
      }
  }
}
</script>
