<<template>
  <div class="homepage">
    <h1>{{msg}}</h1>
    
  </div>
</template>

<<script>
export default {
  name: 'homepage',
  data() {
    return {
      msg: '默认主页'
    }
  }
}
</script>
