/**
 * P1203DataCollector (Custom Schema)
 *
 * This class is modified to collect data in the proprietary segment-based
 * JSON format provided by the user, rather than the raw P.1203 arrays.
 */
export class P1203DataCollector {
  /**
     * @param {shaka.Player} player The Shaka Player instance.
     * @param {HTMLMediaElement} videoElement The HTML5 video element.
     */
  constructor(player, videoElement) {
    if (!player || !videoElement) {
      throw new Error('P1203DataCollector requires shaka, player, and videoElement instances.');
    }

    this.player_ = player;
    this.video_ = videoElement;

    // Data Structures for the custom schema
    this.data_ = {
      I11: { segments: [], streamId: 42, type: 'audio' },
      I13: { segments: [], streamId: 42, type: 'video' },
      I23: { stalling: [], streamId: 42 },
      IGen: {
        device: 'pc',
        displaySize: `${window.screen.width}x${window.screen.height}`,
        viewingDistance: '150cm' // Placeholder, should be user-defined
      }
    };

    // State tracking for calculating segment duration
    this.lastTrackInfo_ = { audio: null, video: null };
    this.lastSegmentStart_ = { audio: 0, video: 0 };
    this.stallingStart_ = null;

    // Bind and attach event listeners
    this.onManifestParsed_ = this.onManifestParsed_.bind(this);
    this.onQualitySwitch_ = this.onQualitySwitch_.bind(this);
    this.onBuffering_ = this.onBuffering_.bind(this);
    this.onUnloading_ = this.onUnloading_.bind(this);

    this.player_.addEventListener('manifestparsed', this.onManifestParsed_);
    // Both ABR and manual changes trigger a segment break
    this.player_.addEventListener('adaptation', this.onQualitySwitch_);
    this.player_.addEventListener('variantchanged', this.onQualitySwitch_);

    // Stalling Events
    this.player_.addEventListener('buffering', this.onBuffering_);
    // Use 'unloading' to finalize the report when playback is stopped/destroyed
    this.player_.addEventListener('unloading', this.onUnloading_);
  }

  /**
     * Converts the current media time to a P.1203-compliant timestamp (seconds, 3 decimal places).
     * @returns {number}
     */
  getCurrentTime() {
    return parseFloat(this.video_.currentTime.toFixed(3));
  }

  /**
     * Captures the initial quality state after the manifest is parsed.
     */
  onManifestParsed_() {
    // Initialize Video track
    const activeVideoTracks = this.player_.getVariantTracks().filter(t => t.active && t.type === 'variant');
    if (activeVideoTracks.length > 0) {
      this.lastTrackInfo_.video = activeVideoTracks[0];
      this.logNewSegment(0, 'video'); // Start first video segment at t=0
    }

    // Initialize Audio track (requires a separate call to get the active audio track)
    const activeAudioTracks = this.player_.getAudioLanguagesAndRoles().flatMap(lang =>
      this.player_.getAudioTracks(lang.language, lang.role)
    ).filter(t => t.active);

    if (activeAudioTracks.length > 0) {
      this.lastTrackInfo_.audio = activeAudioTracks[0];
      this.logNewSegment(0, 'audio'); // Start first audio segment at t=0
    }
  }

  /**
     * Handles quality switches (for both audio and video tracks).
     */
  onQualitySwitch_() {
    // 1. Check Video Track Change
    const currentVideoTracks = this.player_.getVariantTracks().filter(t => t.active && t.type === 'variant');
    const currentVideoTrack = currentVideoTracks.length > 0 ? currentVideoTracks[0] : null;

    if (currentVideoTrack && this.lastTrackInfo_.video && currentVideoTrack.id !== this.lastTrackInfo_.video.id) {
      this.finalizePreviousSegment('video', this.getCurrentTime());
      this.lastTrackInfo_.video = currentVideoTrack;
      this.logNewSegment(this.getCurrentTime(), 'video');
      console.log(`[P.1203] Video switch: ${currentVideoTrack.height}p at ${this.getCurrentTime()}s.`);
    }

    // 2. Check Audio Track Change (simplified: Shaka only changes audio bitrate if ABR is on, or manual switch)
    // Note: The audio track change is often tied to the video variant if it's muxed, but Shaka separates the concepts.
    // We'll rely on the 'adaptation' or 'variantchanged' event and check the current active audio track.
    const currentAudioTracks = this.player_.getAudioLanguagesAndRoles().flatMap(lang =>
      this.player_.getAudioTracks(lang.language, lang.role)
    ).filter(t => t.active);
    const currentAudioTrack = currentAudioTracks.length > 0 ? currentAudioTracks[0] : null;

    if (currentAudioTrack && this.lastTrackInfo_.audio && currentAudioTrack.id !== this.lastTrackInfo_.audio.id) {
      this.finalizePreviousSegment('audio', this.getCurrentTime());
      this.lastTrackInfo_.audio = currentAudioTrack;
      this.logNewSegment(this.getCurrentTime(), 'audio');
      console.log(`[P.1203] Audio switch: ${currentAudioTrack.label || currentAudioTrack.language} at ${this.getCurrentTime()}s.`);
    }
  }

  /**
     * Finalizes the duration of the most recently logged segment for a given stream type.
     * @param {'video'|'audio'} type The stream type.
     * @param {number} endTime The media time (s) when the segment ended.
     */
  finalizePreviousSegment(type, endTime) {
    const segmentsArray = this.data_[type === 'video' ? 'I13' : 'I11'].segments;
    if (segmentsArray.length > 0) {
      const lastSegment = segmentsArray[segmentsArray.length - 1];
      // Duration = End Time - Start Time
      lastSegment.duration = parseFloat((endTime - lastSegment.start).toFixed(3));
    }
  }

  /**
     * Logs a new segment entry with a start time. The duration will be set later.
     * @param {number} startTime The media time (s) when the new segment started.
     * @param {'video'|'audio'} type The stream type.
     */
  logNewSegment(startTime, type) {
    const track = this.lastTrackInfo_[type];
    if (!track) return;

    const segment = {
      // duration is a placeholder, will be calculated on the next switch/end
      duration: 0.001,
      start: startTime,
      // Bandwidth is in bps, must be converted to kbps for the schema
      bitrate: parseFloat((track.bandwidth / 1000).toFixed(2)),
      codec: track.mimeType.split('/')[1] || track.codecs,
    };

    if (type === 'video') {
      segment.resolution = `${track.width}x${track.height}`;
      // Shaka's Track object might not always have FPS, use a default/placeholder
      segment.fps = track.frameRate || 25.0;
      this.data_.I13.segments.push(segment);
    } else {
      this.data_.I11.segments.push(segment);
    }
  }

  /**
     * Handles the 'buffering' event to start or end a stalling period.
     * @param {shaka.util.FakeEvent} event
     */
  onBuffering_(event) {
    const isBuffering = event.buffering;
    const currentTime = this.getCurrentTime();

    if (isBuffering && !this.stallingStart_) {
      this.stallingStart_ = currentTime;
      console.log(`[P.1203] Stalling started at ${this.stallingStart_}s.`);
    } else if (!isBuffering && this.stallingStart_ !== null) {
      const duration = parseFloat((currentTime - this.stallingStart_).toFixed(3));
      this.data_.I23.stalling.push({
        start: this.stallingStart_,
        duration: duration
      });
      this.stallingStart_ = null;
      console.log(`[P.1203] Stalling ended at ${currentTime}s (Duration: ${duration}s).`);
    }
  }

  /**
     * Handles the 'unloading' event to finalize the report.
     */
  onUnloading_() {
    const currentTime = this.getCurrentTime();

    // Finalize the last segment for both audio and video before player destroys
    this.finalizePreviousSegment('video', currentTime);
    this.finalizePreviousSegment('audio', currentTime);

    // Finalize any ongoing stalling period
    if (this.stallingStart_ !== null) {
      this.data_.I23.stalling.push({
        start: this.stallingStart_,
        duration: parseFloat((currentTime - this.stallingStart_).toFixed(3))
      });
      thisingStart_ = null;
    }
    console.log('[P.1203] Collector finalized and segments closed.');
  }

  /**
     * Compiles the collected data into the final custom JSON structure.
     * @returns {Object} The complete report object.
     */
  getReport() {
    // Finalize segments if the user requests the report before the player unloads/stops
    this.finalizePreviousSegment('video', this.getCurrentTime());
    this.finalizePreviousSegment('audio', this.getCurrentTime());

    // Clone the data to prevent external modification
    return JSON.parse(JSON.stringify(this.data_));
  }

  destroy() {
    this.player_.removeEventListener('manifestparsed', this.onManifestParsed_);
    this.player_.removeEventListener('adaptation', this.onQualitySwitch_);
    this.player_.removeEventListener('variantchanged', this.onQualitySwitch_);
    this.player_.removeEventListener('buffering', this.onBuffering_);
    this.player_.removeEventListener('unloading', this.onUnloading_);
  }
}
