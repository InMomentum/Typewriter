class Typewriter {

    constructor(args) {

        /**
         * ID of target element
         * @type {string}
         */
        this.elementId = args.elementId;

        /**
         * Array with phrases
         * @type {array}
         */
        this.phrases = args.phrases;

        /**
         * Boolean for deciding to loop or not
         * @type {boolean}
         */
        this.loop = (typeof args.loop === 'undefined') ? true : args.loop;

        /**
         * Default typing speed
         * @type {number}
         */
        this.speed = (typeof args.speed === 'undefined') ? 100 : args.speed;

        /**
         * Default delay amount
         * @type {number}
         */
        this.delay = (typeof args.delay === 'undefined') ? 1500 : args.delay;

        /**
         * Array containing events
         * @type {array}
         */
        this._events = [];

        /**
         * Interval object
         * @type {object}
         */
        this._interval;

        /**
         * Frame counter
         * @type {number}
         */
        this._frame = 0;

        /**
         * Array containing the timeline
         * @type {array}
         */
        this._timeline = [];

    }

    /**
     * typewrite - runs the process to generate the timeline and starts the loop
     *
     * @return void
     */
    typewrite() {
        this._timeline = this._createTimeline(this.phrases);
        this._start();
    }

    /**
     * addEventAt - add an event with a callback function that will fire at a given frame
     *
     * @param  {type} frame    the frame the event will be fired on
     * @param  {type} callback the callback function that will be called
     * @return void
     */
    addEventAt(frame, callback) {
        this._events.push({
            frame: frame,
            callback: callback
        });
    }

    /**
     * pause - pause and resume the typewriter for a given amount of time
     *
     * @param  {type} time milliseconds the pause will consist of
     * @return void
     */
    pause(time) {
        this.stop();

        let self = this;

        setTimeout(function() {
            self._start();
        }, time);
    }

    /**
     * stop - stops the typewriter
     *
     * @return {type}  description
     */
    stop() {
        clearInterval(this._interval);
    }

    /**
     * refresh - refreshes the typewriter without restarting from first frame
     *
     * @return void
     */
    refresh() {
        this.stop();
        this._start();
    }

    /**
     * reset - resets the frame counter to 0
     *
     * @return void
     */
    reset() {
        this._frame = 0;
    }

    /**
     * _start - heart of the script, handles the interval and firering of events
     *
     * @return void
     */
    _start() {

        let self = this;

        this._interval = setInterval(function() {

            // Check for events for current frame and fires them
            for (let i = 0; i < self._events.length; i++) {
                if (self._events[i].frame === self._frame) {
                    self._events[i].callback();
                }
            }

            document.getElementById(self.elementId).textContent = self._timeline[self._frame];

            self._frame++;

        }, this.speed);

    }

    /**
     * _createTimeline - creates a timeline out of given array, containing the phrases
     *
     * @param  {type} array array containing the phrases
     * @return {type}       array containing each frame in the timeline
     */
    _createTimeline(phrases) {

        let self = this;

        let timeline = [];

        timeline.push('');

        // Loop through each phrase
        for (var i = 0; i < phrases.length; i++) {

            // Create a buffer variable to hold each level of the sequence
            let bufferString = '';

            // Loop through each character of the phrase and build the timeline
            for (var j = 0; j < phrases[i].length; j++) {
                bufferString = bufferString + phrases[i].charAt(j);
                timeline.push(bufferString);
            }

            // Add event for either pause or stop at last word
            if ((phrases.length - 1) === i && this.loop === false) {
                this.addEventAt(timeline.length - 1, function() {
                    self.stop();
                });
            } else {
                this.addEventAt(timeline.length - 1, function() {
                    self.pause(self.delay);
                });
            }

            // Loop through each character of the phrase and build the timeline
            for (var k = 0; k < phrases[i].length; k++) {
                bufferString = bufferString.slice(0, -1);
                timeline.push(bufferString);
            }

        }

        // Create event for resetting typewriter at last frame
        if (this.loop === true) {
            this.addEventAt(timeline.length, function() {
                self.reset();
            });
        }

        return timeline;

    }

}
