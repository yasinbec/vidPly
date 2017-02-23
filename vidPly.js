(function(window, undefined) {
  'use strict';
  
  var vidPly = window.vidPly || {};

  vidPly.video = {

    videos: [],

    setupVideo : function(videoElement) {
      // Check FullScreenEnabled
      var fullScreenEnabled = !!(document.fullscreenEnabled ||
                                 document.mozFullScreenEnabled ||
                                 document.msFullscreenEnabled ||
                                 document.webkitSupportsFullscreen ||
                                 document.webkitFullscreenEnabled ||
            document.createElement('video').webkitRequestFullScreen);

      // Video
      var video = $(videoElement),
          vid = $(videoElement).get(0),
          videoControls = $(videoElement).next(),
          play = videoControls.find('.play'),
          mute = videoControls.find('.mute'),
          fullscreen = videoControls.find('.full-screen'),
          volumeHolder = videoControls.find('.volume-box'),
          playProgress = videoControls.find('.play-progress'),
          progressHolder = videoControls.find('.progress-box'),
          volumeProgress = videoControls.find('.volume-progress');

      this.videos.push({
        vid: vid,
        play: play
      });

      var self = this;

      if (!$('html').hasClass('touch') &&
          navigator.userAgent.toLowerCase().indexOf('firefox') < 0) {
        video.on('click', function() {
          if (vid.paused) {
            self.stopVideos(vid);
            vid.play();
            play.html('&#x2590;&#x2590;').addClass('playing');

          } else {
            vid.pause();
            play.html('&#x25BA;').removeClass('playing');
          }
        });
      }

      // Remove Browser Contoller
      video.removeAttr('controls');
      // Modern IE browsers disable native controls
      video.controls = false;

      // Bacause of autoplay
      // Play button statement should be
      //$('.play').html('&#x2590;&#x2590;').addClass('playing');

      // Play Button
      play.on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('playing');
        if($(this).hasClass('playing')) {
          self.stopVideos(vid);
          vid.play();
          // show pause button
          $(this).html('&#x2590;&#x2590;');

        } else {
          vid.pause();
          // show play button
          $(this).html('&#x25BA;');
        }
      });

      // FullScreen

      if(!fullScreenEnabled && !basaglar.util.isTablet()) {
        // IE9 doesnt support FullScreen
        // It makes sense, IE9
        fullscreen.remove();

      } else {

        fullscreen.on('click', function(){
          if(vid.requestFullScreen){
            // IE
            vid.requestFullScreen();
          } else if(vid.webkitRequestFullScreen){
            // Chrome && Safari
            vid.webkitRequestFullScreen();
          } else if(vid.mozRequestFullScreen){
            // Firefox
            vid.mozRequestFullScreen();
          } else if (vid.msRequestFullscreen) {
            // IE
            vid.msRequestFullscreen();
          } else {

            //IOS
            vid.webkitEnterFullscreen();
          }
        });
      }

      // Progress Bar
      video.on('timeupdate', function(){
        // First Load Progress Bar
        var progressBarPosition = setTimeout(function () {
          var videoTime = (vid.currentTime / vid.duration) *
                           progressHolder.outerWidth();
          playProgress.css({'width':  videoTime+ 'px'});
        },50);

        progressHolder.on('click', function(){
          clearTimeout(progressBarPosition);
        });
      });

      // Moving Around the progress bar
      progressHolder.on('click', function(e){

        // Pause it first
        self.stopVideos(vid);
        vid.pause();

        // click location e.pageX
        var clickLocation = e.pageX - $(this).offset().left,
            ProgressBar = progressHolder.outerWidth(),
            videoDuration = vid.duration;

        // Calculate Video Sec

        var videoTime =  (videoDuration * clickLocation) / ProgressBar;

        vid.currentTime = videoTime;

        playProgress.css({'width':  clickLocation + 'px'});

        // Now Play
        vid.play();
        $(play).addClass('playing');
        $(play).html('&#x2590;&#x2590;');
      });

      // Mute
      mute.on('click', function(e){
        e.preventDefault();
        if(vid.muted){
          vid.muted = false;
          $(this).find('img').attr('src', 'img/audio-icon.png');
          volumeProgress.css({'width': volumeHolder.outerWidth()});
        } else {
          vid.muted = true;
          $(this).find('img').attr('src', 'img/audio-no-icon.png');
          volumeProgress.css({'width': 0});
        }
      });

      // Volume Control
      // First Load
      volumeProgress.css({'width': volumeHolder.outerWidth()});

      // Moving on volume

      volumeHolder.on('click', function(e){
        // click location e.pageX
        var volumeClickLocation = e.pageX - $(this).offset().left,
            volumeProgressBar = volumeHolder.outerWidth(),
            volumeMaxLevel = 50;

        // Calculate volume Location
        var volumePosition =  (volumeMaxLevel * volumeClickLocation) /
                               volumeProgressBar;

        vid.volume = (Math.round(volumePosition))*2 / 100;

        volumeProgress.css({'width':  volumePosition + 'px'});

      });

      // end of the video
      video.on('ended', function(){
        // reset the video
        video.currentTime = 0;
        play.html('&#x25BA;').removeClass('playing');

        setTimeout(function(){
          playProgress.removeAttr('style');
        }, 500);

      });

    },

    stopVideos: function (currentVideo) {
      this.videos.forEach(function (video) {
        if (video.vid !== currentVideo) {

          if (video.play.hasClass('playing')) {
            video.vid.pause();
            video.play.removeClass('playing');
            video.play.html('&#x25BA;');
          }
        }
      });
    },

    init: function(){
      var self = this;
      $('.vid').each(function () {
        self.setupVideo($(this));
      });
    }

  };

  // Make our namespace globally available.
  window.vidPly = vidPly;

}(this));
