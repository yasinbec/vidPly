# vidPly
HTML5 Video Player

Responsive Native HTML5 Player customization with SCSS. 
Dependecy : Jquery {as usual}

```
<!-- Video -->
 <div class="video-container marg-med">
    <!-- Video Player -->
    <video class="vid" poster="" controls>
      <source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4"/>
    </video>           
    <!-- Video Player Control-->
    <div class="video-controls">

      <!-- Progress Bar -->
      <div class="progress">
        <div class="progress-box">
            <span class="play-progress"></span>
        </div>
      </div>

      <!-- Play Button -->
      <button class="play" title="Play"> &#x25BA; </button>

      <!-- Mute -->
      <button class="mute" title="mute"> <img src="img/audio-icon.png" alt="" /></button>

      <!-- Volume -->
      <div class="volume">
        <div class="volume-box">
            <span class="volume-progress"></span>
        </div>
      </div>

      <!-- FullScreen -->
      <button class="full-screen" title="FullScreen Toggle"> <img src="img/fullscreen-icon.png" alt="" /> </button>

    </div>
  </div>

You can customize it whatever you want. 

Enjoy!
