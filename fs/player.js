
var Player = function () {
    this.label = "Lofi";
    this.currTrack = '';
    _this = this; 
};

Player.prototype = {
    loadPlayList: (playlist) => {
        _this.playList = playlist || [];
        console.log(`Loaded ${_this.playList.length} tracks.`)
    },
    updateCurrentTrackInfo: function(info)  {
        _this.currTrack = info.track || '';
        console.log(info);
    },
    getCurrentTrackInfo: function() {
        return _this.currTrack;
    },
    play: ({ index, track }) => {
        let isValidIndex = (index > -1 && index < _this.playList.length);

        if (!isValidIndex) {
            console.log(`Invalid index: ${index}. Only ${_this.playList.length} songs [0-${_this.playList.length - 1}] are loaded.`)
            return
        }

        track = isValidIndex && _this.playList[index] ? _this.playList[index] : track;

        if (!track) {
            console.log(`Track Not Defined!`);
        }

        let sound;
        let data = track;

        // If we already loaded _this track, use the current one.
        // Otherwise, setup and load a new Howl.
        if (data.howl) {
            sound = data.howl;
        } else {
            data.howl = new Howl({
                src: data.src,
                html5: true,
                format: ['mp3', 'aac']
            });
            sound = data.howl;
        }

        // Begin playing the sound.
        sound.play();

        // Toggle the display.
        _this.updateCurrentTrackInfo({ action: 'Play', track })

        // Keep track of the index we are currently playing.
        _this.currTrack = track;
    },

    /**
     * Stop a station's live stream.
     */
    stop: function () {
        // Get the Howl we want to manipulate.
        var sound = _this.currTrack.howl;

        // Toggle the display.
        _this.updateCurrentTrackInfo({ action: 'Stop', track: _this.currTrack })

        // Stop the sound.
        if (sound) {
            sound.unload();
        }
    },

    isPlaying: () => {
        return (_this.currTrack.howl && _this.currTrack.howl.playing());
    }
};


