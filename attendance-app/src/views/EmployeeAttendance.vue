<template>
  <div class="giant-box">

    <div class="border border-primary border-5 rounded big-box">
      <h1>GET READY</h1>
      <div class="wrapper">
        <div class="g-col-6 vid">
          <video ref="video" @canplay="initCanvas()">Stream Unavailable</video>
          <canvas ref="canvas" style="display:none"/>
        </div>
        <div class="snap-shot">
          <img :src="imageSrc" />
        </div>
      </div>
      <div class="for-button">
        <button type="button" class="btn btn-primary btn-take" @click="takePicture()">Take Picture</button>
        <button type="button" class="btn btn-secondary btn-submit" v-if="imageSrc == null">Submit</button>
        <button type="button" class="btn btn-success btn-submit" v-if="imageSrc != null" @click="submitAttendance()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "EmployeeAttendance",
mounted() {
  this.canvas = this.$refs.canvas
  this.video = this.$refs.video
  this.startCapture()
},
data() {
  return {
    video: null,
    canvas: null,
    imageSrc: null
  }
},
created(){
  this.$store.commit('SET_ISLOGIN', true)
  this.$store.commit('SET_ROLE', "employee")
},
methods: {
  startCapture() {
    navigator.mediaDevices.getUserMedia({video:true, audio:false})
      .then(stream => {
        this.video.srcObject = stream
        this.video.play()
      })
      .catch(err => {
        console.log(err)
      })
      
  },
  initCanvas() {
    this.canvas.setAttribute('width', this.video.videoWidth)
    this.canvas.setAttribute('height', this.video.videoHeight)
  },
  takePicture() {
    let context = this.canvas.getContext('2d')
    context.drawImage(this.video, 0, 0, 200, 150)
    this.imageSrc = this.canvas.toDataURL('image/png')
  },
  submitAttendance() {
    this.$store.dispatch('createAttendance', {
      picture: this.imageSrc
     })
  }
}
}
</script>

<style>
.giant-box{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.big-box{
  align-self: center;
  width: 70%;
}
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-self: center;

}
.for-button {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.btn-take{
width: 200px;
}
.btn-submit{
width: 200px;
}

.vid{
  flex-grow: 5;
}
.snap-shot{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  flex-shrink: 0.5;
  
}
</style>