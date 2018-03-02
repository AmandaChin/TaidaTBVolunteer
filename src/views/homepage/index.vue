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
                title:'1.jpg'
                //href:'http://www.baidu.com'
                },
                {
                src:require("./image/2.jpg"),
                title:'2.jpg'
                //href:'index'
                },
                {
                src:require("./image/3.jpg"),
                title:'3.jpg'
                //href:'./index'
                },
                {
                src:require("./image/4.jpg"),
                title:'4.jpg'
                //href:'../form/index'
                }
          ]
      }
  }
}
</script>
