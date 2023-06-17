/**
 * Declare feature "name" for shaka player
 * Declare feature.js name.
 */
export const advancedFeatures = {
  playlist: 'playlist',
  backward_button: 'backwardButton',
  big_live_button: 'bigLiveButton',
  small_live_button: 'smallLiveButton',
  chapters_live: 'chaptersLive',
  express_mode: 'expressMode',
  forward_button: 'forwardButton',
  manage_alerts: 'manageAlerts',
  popup_list: 'popupList',
  snapshot: 'screenshot',
  switch_channels: 'switchChannels',
  thumbnails: 'thumbnails',
  thumbnail_track_live: 'thumbnailTrackLive',
  share: 'shareButton',
  redirect: 'redirect',
  chapters_vod: 'chaptersVOD',
  subtitles: 'subtitles',
  auto_pip: 'autoPictureInPicture',
  image_overlay: 'imageOverlay',
  dvr_mode_button: 'dvrModeButton',
  thumbnail_track_vod: 'thumbnailTrackVod',
  auto_disconnect: 'autoDisconnect',
  time_tooltip: 'timeTooltip',
  custom_buttons: 'customButtons',
  custom_audio_languages: 'customAudioLanguages',
  tags: 'tags'
};

export const mimeTypes = {
  dashwidevine: 'application/dash+xml',
  hlsfairplay: 'application/x-mpegURL',
  dashplayready: 'application/dash+xml',
  hls: 'application/x-mpegURL'
};

export const drmServerTypes = {
  dashwidevine: 'com.widevine.alpha',
  hlsfairplay: 'com.apple.fps.1_0',
  dashplayready: 'com.microsoft.playready',
  hls: ''
};

export const drmSupportMatrix = {
  dashwidevine: {
    browsers: ['Chrome', 'Firefox', 'Opera', 'Chromium', 'Samsung Browser'],
    extention: 'mpd'
  },
  hlsfairplay: {
    browsers: ['Safari'],
    extention: 'm3u8'
  },
  dashplayready: {
    browsers: ['Edge'],
    extention: 'mpd'
  },
  hls: {
    browsers: ['Safari', 'Chrome', 'Firefox'],
    extention: 'm3u8'
  }
};

export const sourceExtensions = ['mp4', 'mp3', 'm3u8', 'mpd', 'php'];

export const streamInfoGlobalErrorMessages = [
  /**
   "fr":    "French (Standard)",
   "fr-be": "French (Belgium)",
   "fr-ca": "French (Canada)",
   "fr-fr": "French (France)",
   "fr-lu": "French (Luxembourg)",
   "fr-mc": "French (Monaco)",
   "fr-ch": "French (Switzerland)",
   */
  {
    language: 'fr',
    messages: {
      403: 'Le HTTP 403 est un code d\'état HTTP signifiant que l\'accès à la ressource demandée est interdit. Le serveur a compris la demande, mais ne l\'exécutera pas.',
      405: 'Erreur de blocage géographique. Votre navigateur Web ne peut pas accéder à la page Web demandée en raison de la région non prise en charge. Erreur HTTP! Statut : 405',
      406: 'Le code d\'état 406 Non acceptable. Votre site Web ou application Web ne prend pas en charge la demande des clients avec un protocole particulier.'
    }
  },
  /**
   "en":    "English",
   "en-au": "English (Australia)",
   "en-bz": "English (Belize)",
   "en-ca": "English (Canada)",
   "en-ie": "English (Ireland)",
   "en-jm": "English (Jamaica)",
   "en-nz": "English (New Zealand)",
   "en-ph": "English (Philippines)",
   "en-za": "English (South Africa)",
   "en-tt": "English (Trinidad & Tobago)",
   "en-gb": "English (United Kingdom)",
   "en-us": "English (United States)",
   "en-zw": "English (Zimbabwe)",
   */
  {
    language: 'en',
    messages: {
      403: 'The HTTP 403 is an HTTP status code meaning access to the requested resource is forbidden. The server understood the request, but will not fulfill it.',
      405: 'Geo-Blocking Error. Your web browser cannot access the requested web page because of the not supportable region. Error HTTP! Status: 405',
      406: 'The 406 Not Acceptable status code. Your website or web application does not support the clients request with a particular protocol.'
    }
  },
  /**
   "es":    "Spanish",
   "es-ar": "Spanish (Argentina)",
   "es-bo": "Spanish (Bolivia)",
   "es-cl": "Spanish (Chile)",
   "es-co": "Spanish (Colombia)",
   "es-cr": "Spanish (Costa Rica)",
   "es-do": "Spanish (Dominican Republic)",
   "es-ec": "Spanish (Ecuador)",
   "es-sv": "Spanish (El Salvador)",
   "es-gt": "Spanish (Guatemala)",
   "es-hn": "Spanish (Honduras)",
   "es-mx": "Spanish (Mexico)",
   "es-ni": "Spanish (Nicaragua)",
   "es-pa": "Spanish (Panama)",
   "es-py": "Spanish (Paraguay)",
   "es-pe": "Spanish (Peru)",
   "es-pr": "Spanish (Puerto Rico)",
   "es-es": "Spanish (Spain)",
   "es-uy": "Spanish (Uruguay)",
   "es-ve": "Spanish (Venezuela)",
   */
  {
    language: 'es',
    messages: {
      403: 'El HTTP 403 es un código de estado HTTP, lo que significa que el acceso al recurso solicitado está prohibido. El servidor entendió la solicitud, pero no la cumplirá.',
      405: 'Error de bloqueo geográfico. Su navegador web no puede acceder a la página web solicitada debido a que la región no es compatible. ¡Error HTTP! Estado: 405',
      406: 'El código de estado 406 No aceptable. Su sitio web o aplicación web no admite la solicitud de los clientes con un protocolo en particular.'
    }
  },
  /**
   "de":    "German (Standard)",
   "de-at": "German (Austria)",
   "de-de": "German (Germany)",
   "de-li": "German (Liechtenstein)",
   "de-lu": "German (Luxembourg)",
   "de-ch": "German (Switzerland)",
   */
  {
    language: 'de',
    messages: {
      403: 'HTTP 403 ist ein HTTP-Statuscode, der bedeutet, dass der Zugriff auf die angeforderte Ressource verboten ist. Der Server hat die Anfrage verstanden, wird sie aber nicht erfüllen.',
      405: 'Geoblocking-Fehler. Ihr Webbrowser kann aufgrund der nicht unterstützten Region nicht auf die angeforderte Webseite zugreifen. HTTP-Fehler! Status: 405',
      406: 'Der Statuscode 406 Nicht akzeptabel. Ihre Website oder Webanwendung unterstützt die Anforderung des Clients mit einem bestimmten Protokoll nicht.'
    }
  },
  // "ru":    "Russian",
  {
    language: 'ru',
    messages: {
      403: 'HTTP 403 - это код состояния HTTP, означающий, что доступ к запрошенному ресурсу запрещен. Сервер понял запрос, но не выполнит его.',
      405: 'Ошибка геоблокировки. Ваш веб-браузер не может получить доступ к запрошенной веб-странице из-за неподдерживаемого региона. Ошибка HTTP! Статус: 405',
      406: 'Код состояния 406 Not Acceptable. Ваш веб-сайт или веб-приложение не поддерживает запросы клиентов по определенному протоколу.'
    }
  },
  /**
   "ar":    "Arabic (Standard)",
   "ar-dz": "Arabic (Algeria)",
   "ar-bh": "Arabic (Bahrain)",
   "ar-eg": "Arabic (Egypt)",
   "ar-iq": "Arabic (Iraq)",
   "ar-jo": "Arabic (Jordan)",
   "ar-kw": "Arabic (Kuwait)",
   "ar-lb": "Arabic (Lebanon)",
   "ar-ly": "Arabic (Libya)",
   "ar-ma": "Arabic (Morocco)",
   "ar-om": "Arabic (Oman)",
   "ar-qa": "Arabic (Qatar)",
   "ar-sa": "Arabic (Saudi Arabia)",
   "ar-sy": "Arabic (Syria)",
   "ar-tn": "Arabic (Tunisia)",
   "ar-ae": "Arabic (U.A.E.)",
   "ar-ye": "Arabic (Yemen)",
   */
  {
    language: 'ar',
    messages: {
      403: 'HTTP 403 هو رمز حالة HTTP مما يعني أن الوصول إلى المورد المطلوب محظور. فهم الخادم الطلب ، لكنه لم يستوفيه.',
      405: 'خطأ في الحظر الجغرافي. لا يمكن لمتصفح الويب الخاص بك الوصول إلى صفحة الويب المطلوبة بسبب المنطقة غير القابلة للدعم. خطأ HTTP! الحالة: 405',
      406: 'رمز الحالة 406 غير مقبول. لا يدعم موقع الويب الخاص بك أو تطبيق الويب طلبات العملاء ببروتوكول معين.'
    }
  },
  /**
   "zh":    "Chinese",
   "zh-hk": "Chinese (Hong Kong)",
   "zh-cn": "Chinese (PRC)",
   "zh-sg": "Chinese (Singapore)",
   "zh-tw": "Chinese (Taiwan)",
   */
  {
    language: 'zh',
    messages: {
      403: 'HTTP 403 是一个 HTTP 状态代码，表示禁止访问所请求的资源。服务器理解请求，但不会满足它。',
      405: '地理封锁错误。由于不支持的区域，您的 Web 浏览器无法访问请求的网页。错误 HTTP！状态：405',
      406: '406 Not Acceptable 状态代码。您的网站或 Web 应用程序不支持使用特定协议的客户端请求。'
    }
  }
];

export const featuresConfig = {
  chapters_vod: {
    requiredProperties: ['url', 'lang'],
    defaultProperties: ['mimeType']
  },
  subtitles: {
    requiredProperties: ['url', 'language'],
    defaultProperties: ['mimeType']
  },
  backward_button: {
    requiredProperties: ['backwardSeconds'],
  },
  forward_button: {
    requiredProperties: ['forwardSeconds'],
  },
  express_mode: {
    isInArray: true,
    requiredProperties: ['begin', 'express_speed', 'end']
  },
  playlist: {
    requiredProperties: ['videos', 'withPlaylist', 'withNextVideoPopup', 'loop'],
    videoPlaylistProperties: ['title', 'description', 'source', 'thumbnail', 'thumbnailOnHover'],
    defaultProperties: ['auto_second']
  },
  share: {
    requiredProperties: ['medias'],
  },
  playback_speed: {
    requiredProperties: ['speeds']
  },
  switch_channels: {
    requiredProperties: ['ui', 'channels'],
    channelProperties: ['name', 'source'],
  },
  popup_list: {
    requiredProperties: ['popup_title', 'popup_desc', 'list'],
    listProperties: ['avatar_url', 'title', 'description']
  },
  auto_pip: {
    requiredProperties: ['threshold']
  },
  image_overlay: {
    requiredProperties: ['imageUrls']
  },
  manage_alerts: {
    requiredProperties: ['serverUrl', 'topics', 'onScreenTime']
  },
  redirect: {
    requiredProperties: ['title', 'url', 'thumbnail', 'auto_second']
  },
  chapters_live: {
    requiredProperties: ['chapters'],
    chaptersProperties: ['title', 'startTime', 'endTime']
  },
  dvr_mode_button: {
    requiredProperties: ['noDvrModeTime', 'dvrModeActive']
  },
  auto_disconnect: {
    requiredProperties: ['promptTime', 'sessionTimeout', 'promptMessage', 'promptBtnName']
  },
  custom_buttons: {
    requiredProperties: ['buttonInfo', 'onEventType', 'onEventTypeHandler']
  },
  custom_audio_languages: {
    requiredProperties: ['code', 'url']
  },
  tags: {
    requiredProperties: ['tagWebVtt']
  }
};

export const DEFAULT_CHAPTER_TOOLTIPS = {
  noNextChapter: 'No Next Chapter Available',
  noPreviousChapter: 'No Previous Chapter Available',
  nextChapterPrefix: 'Next Chapter: ',
  previousChapterPrefix: 'Previous Chapter: ',
  lastChapterPrefix: 'Last Chapter: ',
};

export const multiLanguageMessagePhrases = [
  {
    language: 'en',
    messages: {
      next: 'There is no new chapter',
      prev: 'There is no previous chapter',
      last_chapter_prefix: 'Last chapter: ',
      next_chapter_prefix: 'Next chapter: ',
      prev_chapter_prefix: 'Previous chapter: '
    }
  },
  {
    language: 'fr',
    messages: {
      next: 'Il n\'y a pas de nouveau chapitre.',
      prev: 'Il n\'y a pas de chapitre précédent',
      last_chapter_prefix: 'Dernier chapitre: ',
      next_chapter_prefix: 'Chapitre suivant: ',
      prev_chapter_prefix: 'Chapitre précédent: '
    }
  },
  {
    language: 'ru',
    messages: {
      next: 'Новой главы нет.',
      prev: 'Нет предыдущей главы',
      next_chapter_prefix: 'Следующая глава: ',
      last_chapter_prefix: 'Последняя глава: ',
      prev_chapter_prefix: 'предыдущая глава: '
    }
  },
  {
    language: 'ar',
    messages: {
      next: 'لا يوجد فصل جديد.',
      prev: 'لا يوجد فصل سابق',
      next_chapter_prefix: 'الفصل القادم :',
      last_chapter_prefix: 'الفصل الأخير : ',
      prev_chapter_prefix: 'الفصل السابق :'
    }
  },
  {
    language: 'zh',
    messages: {
      next: '没有下一章可用',
      prev: '没有上一章可用',
      next_chapter_prefix: '最后一章: ',
      last_chapter_prefix: 'Last chapter: ',
      prev_chapter_prefix: '上一章: '
    }
  },
  {
    language: 'de',
    messages: {
      next: 'Es gibt kein neues Kapitel.',
      prev: 'Es gibt kein vorheriges Kapitel',
      last_chapter_prefix: 'Letztes Kapitel: ',
      next_chapter_prefix: 'Nächstes Kapitel: ',
      prev_chapter_prefix: 'Vorheriges Kapitel: '
    }
  },
  {
    language: 'es',
    messages: {
      next: 'No hay capítulo nuevo.',
      prev: 'No hay capitulo anterior',
      last_chapter_prefix: 'Último capítulo: ',
      next_chapter_prefix: 'Siguiente capítulo: ',
      prev_chapter_prefix: 'Capítulo previo: '
    }
  }
];

export const errors = {
  /**
   * A network request was made using an unsupported URI scheme.
   * <br> error.data[0] is the URI.
   */
  UNSUPPORTED_SCHEME: 1000,

  /**
   * An HTTP network request returned an HTTP status that indicated a failure.
   * <br> error.data[0] is the URI.
   * <br> error.data[1] is the status code.
   * <br> error.data[2] is the response text, or null if the response could not
   *   be interpretted as text.
   * <br> error.data[3] is the map of response headers.
   * <br> error.data[4] is the NetworkingEngine.RequestType of the request,
   *   if one was provided.
   */
  BAD_HTTP_STATUS: 1001,

  /**
   * An HTTP network request failed with an error, but not from the server.
   * <br> error.data[0] is the URI.
   * <br> error.data[1] is the original error.
   * <br> error.data[2] is the NetworkingEngine.RequestType of the request.
   */
  HTTP_ERROR: 1002,

  /**
   * A network request timed out.
   * <br> error.data[0] is the URI.
   * <br> error.data[1] is the NetworkingEngine.RequestType of the request,
   *   if one was provided.
   */
  TIMEOUT: 1003,

  /**
   * A network request was made with a malformed data URI.
   * <br> error.data[0] is the URI.
   */
  MALFORMED_DATA_URI: 1004,

  // RETIRED: 'UNKNOWN_DATA_URI_ENCODING': 1005,

  /**
   * A request filter threw an error.
   * <br> error.data[0] is the original error.
   */
  REQUEST_FILTER_ERROR: 1006,

  /**
   * A response filter threw an error.
   * <br> error.data[0] is the original error.
   */
  RESPONSE_FILTER_ERROR: 1007,

  /**
   * A testing network request was made with a malformed URI.
   * This error is only used by unit and integration tests.
   */
  MALFORMED_TEST_URI: 1008,

  /**
   * An unexpected network request was made to the FakeNetworkingEngine.
   * This error is only used by unit and integration tests.
   */
  UNEXPECTED_TEST_REQUEST: 1009,

  /**
   * The number of retry attempts have run out.
   * This is an internal error and shouldn't be propagated.
   */
  ATTEMPTS_EXHAUSTED: 1010,

  /**
   * The segment is missing.
   * <br> error.data[0] is the URI.
   */
  SEGMENT_MISSING: 1011,

  /** The text parser failed to parse a text stream due to an invalid header. */
  INVALID_TEXT_HEADER: 2000,

  /**
   * The text parser failed to parse a text stream due to an invalid cue.
   * <br> error.data[0] is extra context, if available.
   */
  INVALID_TEXT_CUE: 2001,

  // RETIRED: 'INVALID_TEXT_SETTINGS': 2002,

  /**
   * Was unable to detect the encoding of the response text.  Suggest adding
   * byte-order-markings to the response data.
   */
  UNABLE_TO_DETECT_ENCODING: 2003,

  /** The response data contains invalid Unicode character encoding. */
  BAD_ENCODING: 2004,

  /**
   * The XML parser failed to parse an xml stream, or the XML lacks mandatory
   * elements for TTML.
   * <br> error.data[0] is extra context, if available.
   */
  INVALID_XML: 2005,

  // RETIRED: 'INVALID_TTML': 2006,

  /**
   * MP4 segment does not contain TTML.
   */
  INVALID_MP4_TTML: 2007,

  /**
   * MP4 segment does not contain VTT.
   */
  INVALID_MP4_VTT: 2008,

  /**
   * When examining media in advance, we were unable to extract the cue time.
   * This should only be possible with HLS, where we do not have explicit
   * segment start times.
   * <br> error.data[0] is the underlying exception or Error object.
   */
  UNABLE_TO_EXTRACT_CUE_START_TIME: 2009,

  /**
   * MP4 segment for CEA data is invalid.
   */
  INVALID_MP4_CEA: 2010,

  /**
   * Unable to guess mime type of the text.
   * <br> error.data[0] is the text file's extension.
   */
  TEXT_COULD_NOT_GUESS_MIME_TYPE: 2011,

  /**
   * External text tracks cannot be added in src= because native platform
   * doesn't support it.
   */
  CANNOT_ADD_EXTERNAL_TEXT_TO_SRC_EQUALS: 2012,

  /**
   * Only WebVTT is supported when using src=.
   * <br> error.data[0] is the text MIME type.
   */
  TEXT_ONLY_WEBVTT_SRC_EQUALS: 2013,

  /**
   * The compilation does not contain a required text plugin for this
   * operation.
   * <br> error.data[0] is the text MIME type.
   */
  MISSING_TEXT_PLUGIN: 2014,

  /**
   * The chapters track failed to load.  The browser does not provide any
   * information in this case to identify why it failed, but there may be
   * details in the JavaScript console.
   */
  CHAPTERS_TRACK_FAILED: 2015,

  /**
   * Some component tried to read past the end of a buffer.  The segment index,
   * init segment, or PSSH may be malformed.
   */
  BUFFER_READ_OUT_OF_BOUNDS: 3000,

  /**
   * Some component tried to parse an integer that was too large to fit in a
   * JavaScript number without rounding error.  JavaScript can only natively
   * represent integers up to 53 bits.
   */
  JS_INTEGER_OVERFLOW: 3001,

  /**
   * The EBML parser used to parse the WebM container encountered an integer,
   * ID, or other field larger than the maximum supported by the parser.
   */
  EBML_OVERFLOW: 3002,

  /**
   * The EBML parser used to parse the WebM container encountered a floating-
   * point field of a size not supported by the parser.
   */
  EBML_BAD_FLOATING_POINT_SIZE: 3003,

  /**
   * The MP4 SIDX parser found the wrong box type.
   * Either the segment index range is incorrect or the data is corrupt.
   */
  MP4_SIDX_WRONG_BOX_TYPE: 3004,

  /**
   * The MP4 SIDX parser encountered an invalid timescale.
   * The segment index data may be corrupt.
   */
  MP4_SIDX_INVALID_TIMESCALE: 3005,

  /** The MP4 SIDX parser encountered a type of SIDX that is not supported. */
  MP4_SIDX_TYPE_NOT_SUPPORTED: 3006,

  /**
   * The WebM Cues parser was unable to locate the Cues element.
   * The segment index data may be corrupt.
   */
  WEBM_CUES_ELEMENT_MISSING: 3007,

  /**
   * The WebM header parser was unable to locate the Ebml element.
   * The init segment data may be corrupt.
   */
  WEBM_EBML_HEADER_ELEMENT_MISSING: 3008,

  /**
   * The WebM header parser was unable to locate the Segment element.
   * The init segment data may be corrupt.
   */
  WEBM_SEGMENT_ELEMENT_MISSING: 3009,

  /**
   * The WebM header parser was unable to locate the Info element.
   * The init segment data may be corrupt.
   */
  WEBM_INFO_ELEMENT_MISSING: 3010,

  /**
   * The WebM header parser was unable to locate the Duration element.
   * The init segment data may be corrupt or may have been incorrectly encoded.
   * Shaka requires a duration in WebM DASH content.
   */
  WEBM_DURATION_ELEMENT_MISSING: 3011,

  /**
   * The WebM Cues parser was unable to locate the Cue Track Positions element.
   * The segment index data may be corrupt.
   */
  WEBM_CUE_TRACK_POSITIONS_ELEMENT_MISSING: 3012,

  /**
   * The WebM Cues parser was unable to locate the Cue Time element.
   * The segment index data may be corrupt.
   */
  WEBM_CUE_TIME_ELEMENT_MISSING: 3013,

  /**
   * A MediaSource operation failed.
   * <br> error.data[0] is a MediaError code from the video element.
   */
  MEDIA_SOURCE_OPERATION_FAILED: 3014,

  /**
   * A MediaSource operation threw an exception.
   * <br> error.data[0] is the exception that was thrown.
   */
  MEDIA_SOURCE_OPERATION_THREW: 3015,

  /**
   * The video element reported an error.
   * <br> error.data[0] is a MediaError code from the video element.
   * <br> On Edge, error.data[1] is a Microsoft extended error code in hex.
   * <br> On Chrome, error.data[2] is a string with details on the error.
   * <br> See top of file for links to browser error codes.
   */
  VIDEO_ERROR: 3016,

  /**
   * A MediaSource operation threw QuotaExceededError and recovery failed. The
   * content cannot be played correctly because the segments are too large for
   * the browser/platform. This may occur when attempting to play very high
   * quality, very high bitrate content on low-end devices.
   * <br> error.data[0] is the type of content which caused the error.
   */
  QUOTA_EXCEEDED_ERROR: 3017,

  /**
   * Mux.js did not invoke the callback signifying successful transmuxing.
   */
  TRANSMUXING_FAILED: 3018,

  /**
   * Content transformations required by the platform could not be performed for
   * some reason (unsupported container, etc.)
   *
   * @see https://github.com/shaka-project/shaka-player/issues/2759
   */
  CONTENT_TRANSFORMATION_FAILED: 3019,

  /**
   * The Player was unable to guess the manifest type based on file extension
   * or MIME type.  To fix, try one of the following:
   * <br><ul>
   *   <li>Rename the manifest so that the URI ends in a well-known extension.
   *   <li>Configure the server to send a recognizable Content-Type header.
   *   <li>Configure the server to accept a HEAD request for the manifest.
   * </ul>
   * <br> error.data[0] is the manifest URI.
   */
  UNABLE_TO_GUESS_MANIFEST_TYPE: 4000,

  /**
   * The DASH Manifest contained invalid XML markup.
   * <br> error.data[0] is the URI associated with the XML.
   */
  DASH_INVALID_XML: 4001,

  /**
   * The DASH Manifest contained a Representation with insufficient segment
   * information.
   */
  DASH_NO_SEGMENT_INFO: 4002,

  /** The DASH Manifest contained an AdaptationSet with no Representations. */
  DASH_EMPTY_ADAPTATION_SET: 4003,

  /** The DASH Manifest contained an Period with no AdaptationSets. */
  DASH_EMPTY_PERIOD: 4004,

  /**
   * The DASH Manifest does not specify an init segment with a WebM container.
   */
  DASH_WEBM_MISSING_INIT: 4005,

  /** The DASH Manifest contained an unsupported container format. */
  DASH_UNSUPPORTED_CONTAINER: 4006,

  /** The embedded PSSH data has invalid encoding. */
  DASH_PSSH_BAD_ENCODING: 4007,

  /**
   * There is an AdaptationSet whose Representations do not have any common
   * key-systems.
   */
  DASH_NO_COMMON_KEY_SYSTEM: 4008,

  /** Having multiple key IDs per Representation is not supported. */
  DASH_MULTIPLE_KEY_IDS_NOT_SUPPORTED: 4009,

  /** The DASH Manifest specifies conflicting key IDs. */
  DASH_CONFLICTING_KEY_IDS: 4010,

  // RETIRED: 'UNPLAYABLE_PERIOD': 4011,

  /**
   * There exist some streams that could be decoded, but restrictions imposed
   * by the application or the key system prevent us from playing.  This may
   * happen under the following conditions:
   * <ul>
   *   <li>The application has given restrictions to the Player that restrict
   *       at least one content type completely (e.g. no playable audio).
   *   <li>The manifest specifies different keys than were given to us from the
   *       license server.
   *   <li>The key system has imposed output restrictions that cannot be met
   *       (such as HDCP) and there are no unrestricted alternatives.
   * </ul>
   * <br> error.data[0] is a {@link shaka.extern.RestrictionInfo} object
   * describing the kinds of restrictions that caused this error.
   */
  RESTRICTIONS_CANNOT_BE_MET: 4012,

  // RETIRED: 'INTERNAL_ERROR_KEY_STATUS': 4013,

  // RETIRED: 'NO_PERIODS': 4014,

  /**
   * HLS playlist doesn't start with a mandory #EXTM3U tag.
   */
  HLS_PLAYLIST_HEADER_MISSING: 4015,

  /**
   * HLS tag has an invalid name that doesn't start with '#EXT'
   * <br> error.data[0] is the invalid tag.
   */
  INVALID_HLS_TAG: 4016,

  /**
   * HLS playlist has both Master and Media/Segment tags.
   */
  HLS_INVALID_PLAYLIST_HIERARCHY: 4017,

  /**
   * A Representation has an id that is the same as another Representation in
   * the same Period.  This makes manifest updates impossible since we cannot
   * map the updated Representation to the old one.
   */
  DASH_DUPLICATE_REPRESENTATION_ID: 4018,

  // RETIRED: 'HLS_MEDIA_INIT_SECTION_INFO_MISSING': 4019,

  /**
   * HLS manifest has several #EXT-X-MAP tags. We can only
   * support one at the moment.
   */
  HLS_MULTIPLE_MEDIA_INIT_SECTIONS_FOUND: 4020,

  // RETIRED: 'HLS_COULD_NOT_GUESS_MIME_TYPE': 4021,

  // RETIRED: 'HLS_MASTER_PLAYLIST_NOT_PROVIDED': 4022,

  /**
   * One of the required attributes was not provided, so the
   * HLS manifest is invalid.
   * <br> error.data[0] is the missing attribute's name.
   */
  HLS_REQUIRED_ATTRIBUTE_MISSING: 4023,

  /**
   * One of the required tags was not provided, so the
   * HLS manifest is invalid.
   * <br> error.data[0] is the missing tag's name.
   */
  HLS_REQUIRED_TAG_MISSING: 4024,

  /**
   * The HLS parser was unable to guess codecs of a stream.
   * <br> error.data[0] is the list of all codecs for the variant.
   */
  HLS_COULD_NOT_GUESS_CODECS: 4025,

  /**
   * The HLS parser has encountered encrypted content with unsupported
   * KEYFORMAT attributes.
   */
  HLS_KEYFORMATS_NOT_SUPPORTED: 4026,

  /**
   * The manifest parser only supports xlink links with xlink:actuate="onLoad".
   */
  DASH_UNSUPPORTED_XLINK_ACTUATE: 4027,

  /**
   * The manifest parser has hit its depth limit on xlink link chains.
   */
  DASH_XLINK_DEPTH_LIMIT: 4028,

  // RETIRED: 'HLS_LIVE_CONTENT_NOT_SUPPORTED': 4029,

  // RETIRED: 'HLS_COULD_NOT_PARSE_SEGMENT_START_TIME': 4030,

  // RETIRED: 'HLS_MEDIA_SEQUENCE_REQUIRED_IN_LIVE_STREAMS': 4031,

  /**
   * The content container or codecs are not supported by this browser. For
   * example, this could happen if the content is WebM, but your browser does
   * not support the WebM container, or if the content uses HEVC, but your
   * browser does not support the HEVC codec.  This can also occur for
   * multicodec or multicontainer manifests if none of the codecs or containers
   * are supported by the browser.
   *
   * To see what your browser supports, you can check the JSON data dumped by
   * http://support.shaka-player-demo.appspot.com/
   */
  CONTENT_UNSUPPORTED_BY_BROWSER: 4032,

  /**
   * External text tracks cannot be added to live streams.
   */
  CANNOT_ADD_EXTERNAL_TEXT_TO_LIVE_STREAM: 4033,

  /**
   * We do not support AES-128 encryption with HLS yet.
   */
  HLS_AES_128_ENCRYPTION_NOT_SUPPORTED: 4034,

  /**
   * An internal error code that should never be seen by applications, thrown
   * to force the HLS parser to skip an unsupported stream.
   */
  HLS_INTERNAL_SKIP_STREAM: 4035,

  /** The Manifest contained no Variants. */
  NO_VARIANTS: 4036,

  /**
   * We failed to find matching streams across DASH Periods, and the
   * period-flattening aglorithm introduced in v3.0 has failed.
   */
  PERIOD_FLATTENING_FAILED: 4037,

  /**
   * We failed to find matching streams across DASH Periods due to inconsistent
   * DRM systems across periods.
   */
  INCONSISTENT_DRM_ACROSS_PERIODS: 4038,

  /**
   * The HLS manifest refers to an undeclared variables.
   * <br> error.data[0] is the variable undeclared.
   */
  HLS_VARIABLE_NOT_FOUND: 4039,

  /**
   * We do not support playing encrypted mp2t with MSE
   */
  HLS_MSE_ENCRYPTED_MP2T_NOT_SUPPORTED: 4040,

  // RETIRED: 'HLS_MSE_ENCRYPTED_LEGACY_APPLE_MEDIA_KEYS_NOT_SUPPORTED': 4041,

  // RETIRED: 'INCONSISTENT_BUFFER_STATE': 5000,
  // RETIRED: 'INVALID_SEGMENT_INDEX': 5001,
  // RETIRED: 'SEGMENT_DOES_NOT_EXIST': 5002,
  // RETIRED: 'CANNOT_SATISFY_BYTE_LIMIT': 5003,
  // RETIRED: 'BAD_SEGMENT': 5004,
  // RETIRED: 'INVALID_STREAMS_CHOSEN': 5005,

  /**
   * This would only happen if StreamingEngine were not started correctly, and
   * should not be seen in production.
   */
  STREAMING_ENGINE_STARTUP_INVALID_STATE: 5006,

  /**
   * The manifest indicated protected content, but the manifest parser was
   * unable to determine what key systems should be used.
   */
  NO_RECOGNIZED_KEY_SYSTEMS: 6000,

  /**
   * None of the requested key system configurations are available.  This may
   * happen under the following conditions:
   * <ul>
   *   <li> The key system is not supported.
   *   <li> The key system does not support the features requested (e.g.
   *        persistent state).
   *   <li> A user prompt was shown and the user denied access.
   *   <li> The key system is not available from unsecure contexts. (i.e.
   requires HTTPS) See https://bit.ly/2K9X1nY
   * </ul>
   */
  REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE: 6001,

  /**
   * The browser found one of the requested key systems, but it failed to
   * create an instance of the CDM for some unknown reason.
   * <br> error.data[0] is an error message string from the browser.
   */
  FAILED_TO_CREATE_CDM: 6002,

  /**
   * The browser found one of the requested key systems and created an instance
   * of the CDM, but it failed to attach the CDM to the video for some unknown
   * reason.
   * <br> error.data[0] is an error message string from the browser.
   */
  FAILED_TO_ATTACH_TO_VIDEO: 6003,

  /**
   * The CDM rejected the server certificate supplied by the application.
   * The certificate may be malformed or in an unsupported format.
   * <br> error.data[0] is an error message string from the browser.
   */
  INVALID_SERVER_CERTIFICATE: 6004,

  /**
   * The CDM refused to create a session for some unknown reason.
   * <br> error.data[0] is an error message string from the browser.
   */
  FAILED_TO_CREATE_SESSION: 6005,

  /**
   * The CDM was unable to generate a license request for the init data it was
   * given.  The init data may be malformed or in an unsupported format.
   * <br> error.data[0] is an error message string from the browser.
   * <br> error.data[1] is the error object from the browser.
   * <br> error.data[2] is a string with the extended error code, if available.
   * <br> See top of file for links to browser error codes.
   */
  FAILED_TO_GENERATE_LICENSE_REQUEST: 6006,

  /**
   * The license request failed.  This could be a timeout, a network failure, or
   * a rejection by the server.
   * <br> error.data[0] is a shaka.util.Error from the networking engine.
   */
  LICENSE_REQUEST_FAILED: 6007,

  /**
   * The license response was rejected by the CDM.  The server's response may be
   * invalid or malformed for this CDM.
   * <br> error.data[0] is an error message string from the browser.
   * <br> See top of file for links to browser error codes.
   */
  LICENSE_RESPONSE_REJECTED: 6008,

  // RETIRED: 'NO_LICENSE_SERVER_SPECIFIED': 6009,

  /**
   * The manifest does not specify any DRM info, but the content is encrypted.
   * Either the manifest or the manifest parser are broken.
   */
  ENCRYPTED_CONTENT_WITHOUT_DRM_INFO: 6010,

  // RETIRED: 'WRONG_KEYS': 6011,

  /**
   * No license server was given for the key system signaled by the manifest.
   * A license server URI is required for every key system.
   * <br> error.data[0] is the key system identifier.
   */
  NO_LICENSE_SERVER_GIVEN: 6012,

  /**
   * A required offline session was removed.  The content is not playable.
   */
  OFFLINE_SESSION_REMOVED: 6013,

  /**
   * The license has expired.  This is triggered when all keys in the key
   * status map have a status of 'expired'.
   */
  EXPIRED: 6014,

  /**
   * A server certificate wasn't given when it is required.  FairPlay requires
   * setting an explicit server certificate in the configuration.
   */
  SERVER_CERTIFICATE_REQUIRED: 6015,

  /**
   * An error was thrown while executing the init data transformation.
   * <br> error.data[0] is the original error.
   */
  INIT_DATA_TRANSFORM_ERROR: 6016,

  /**
   * The server certificate request failed.
   * <br> error.data[0] is a shaka.util.Error from the networking engine.
   */
  SERVER_CERTIFICATE_REQUEST_FAILED: 6017,

  /**
   * The call to Player.load() was interrupted by a call to Player.unload()
   * or another call to Player.load().
   */
  LOAD_INTERRUPTED: 7000,

  /**
   * An internal error which indicates that an operation was aborted.  This
   * should not be seen by applications.
   */
  OPERATION_ABORTED: 7001,

  /**
   * The call to Player.load() failed because the Player does not have a video
   * element.  The video element must either be provided to the constructor or
   * to Player.attach() before Player.load() is called.
   */
  NO_VIDEO_ELEMENT: 7002,

  /**
   * The operation failed because the object has been destroyed.
   */
  OBJECT_DESTROYED: 7003,

  /**
   * The content has not been loaded in the Player.
   */
  CONTENT_NOT_LOADED: 7004,

  /**
   * The Cast API is unavailable.  This may be because of one of the following:
   *  1. The browser may not have Cast support
   *  2. The browser may be missing a necessary Cast extension
   *  3. The Cast sender library may not be loaded in your app
   */
  CAST_API_UNAVAILABLE: 8000,

  /**
   * No cast receivers are available at this time.
   */
  NO_CAST_RECEIVERS: 8001,

  /**
   * The library is already casting.
   */
  ALREADY_CASTING: 8002,

  /**
   * A Cast SDK error that we did not explicitly plan for has occurred.
   * Check data[0] and refer to the Cast SDK documentation for details.
   * <br> error.data[0] is an error object from the Cast SDK.
   */
  UNEXPECTED_CAST_ERROR: 8003,

  /**
   * The cast operation was canceled by the user.
   * <br> error.data[0] is an error object from the Cast SDK.
   */
  CAST_CANCELED_BY_USER: 8004,

  /**
   * The cast connection timed out.
   * <br> error.data[0] is an error object from the Cast SDK.
   */
  CAST_CONNECTION_TIMED_OUT: 8005,

  /**
   * The requested receiver app ID does not exist or is unavailable.
   * Check the requested app ID for typos.
   * <br> error.data[0] is an error object from the Cast SDK.
   */
  CAST_RECEIVER_APP_UNAVAILABLE: 8006,

  // RETIRED: CAST_RECEIVER_APP_ID_MISSING': 8007,

  /**
   * Offline storage is not supported on this browser; it is required for
   * offline support.
   */
  STORAGE_NOT_SUPPORTED: 9000,

  /**
   * An unknown error occurred in the IndexedDB.
   * <br> On Firefox, one common source for UnknownError calls is reverting
   * Firefox to an old version. This makes the IndexedDB storage inaccessible
   * for older versions. The only way to fix this is to delete the storage
   * data in your profile. See https://mzl.la/2yCGWCm
   * <br> error.data[0] is the error object.
   */
  INDEXED_DB_ERROR: 9001,

  /**
   * The storage operation was aborted.  Deprecated in favor of more general
   * OPERATION_ABORTED.
   */
  DEPRECATED_OPERATION_ABORTED: 9002,

  /**
   * The specified item was not found in the IndexedDB.
   * <br> error.data[0] is the offline URI.
   */
  REQUESTED_ITEM_NOT_FOUND: 9003,

  /**
   * A network request was made with a malformed offline URI.
   * <br> error.data[0] is the URI.
   */
  MALFORMED_OFFLINE_URI: 9004,

  /**
   * The specified content is live or in-progress.
   * Live and in-progress streams cannot be stored offline.
   * <br> error.data[0] is the URI.
   */
  CANNOT_STORE_LIVE_OFFLINE: 9005,

  // RETIRED: 'STORE_ALREADY_IN_PROGRESS': 9006,

  /**
   * There was no init data available for offline storage.  This happens when
   * there is no init data in the manifest nor could we find any in the
   * segments.  We currently only support searching MP4 init segments for init
   * data.
   */
  NO_INIT_DATA_FOR_OFFLINE: 9007,

  /**
   * shaka.offline.Storage was constructed with a Player proxy instead of a
   * local player instance.  To fix this, use Player directly with Storage
   * instead of the results of CastProxy.prototype.getPlayer().
   */
  LOCAL_PLAYER_INSTANCE_REQUIRED: 9008,

  // RETIRED/MOVED TO 4000's: 'CONTENT_UNSUPPORTED_BY_BROWSER': 9009,

  // RETIRED: 'UNSUPPORTED_UPGRADE_REQUEST': 9010,

  /**
   * The storage cell does not allow new operations that require new keys.
   */
  NEW_KEY_OPERATION_NOT_SUPPORTED: 9011,

  /**
   * A key was not found in a storage cell.
   */
  KEY_NOT_FOUND: 9012,

  /**
   * A storage cell was not found.
   */
  MISSING_STORAGE_CELL: 9013,

  /**
   * The storage limit defined in <code>downloadSizeCallback</code> has been
   * reached.
   */
  STORAGE_LIMIT_REACHED: 9014,

  /**
   * <code>downloadSizeCallback</code> has produced an unexpected error.
   */
  DOWNLOAD_SIZE_CALLBACK_ERROR: 9015,

  /**
   * The storage cell does not allow new operations that significantly change
   * existing data.
   */
  MODIFY_OPERATION_NOT_SUPPORTED: 9016,

  /**
   * CS IMA SDK, required for ad insertion, has not been included on the page.
   */
  CS_IMA_SDK_MISSING: 10000,

  /**
   * Client Side Ad Manager needs to be initialized to enable Client Side
   * Ad Insertion. Call adManager.initClientSide() to do it.
   */
  CS_AD_MANAGER_NOT_INITIALIZED: 10001,

  /**
   * SS IMA SDK, required for ad insertion, has not been included on the page.
   */
  SS_IMA_SDK_MISSING: 10002,

  /**
   * Server Side Ad Manager needs to be initialized to enable Server Side
   * Ad Insertion. Call adManager.initServerSide() to do it.
   */
  SS_AD_MANAGER_NOT_INITIALIZED: 10003,

  /**
   * A new DAI steam was requested before the previous request had been
   * resolved. Only one stream request at a time is supported. Please wait
   * for the previous request to complete before initiating a new one.
   */
  CURRENT_DAI_REQUEST_NOT_FINISHED: 10004,
};

/**
 * A mapping from language code to the native and English names for that
 * language.  The language code can be specific and include a locale, such as
 * "es-CL" instead of merely "es".
 *
 * @type {!Object.<string, {nativeName: string, englishName: string}>}
 */
export const mozillaLanguageMapping = {
  ach: {
    nativeName: 'Lwo',
    englishName: 'Acholi'
  },
  ady: {
    nativeName: 'Адыгэбзэ',
    englishName: 'Adyghe'
  },
  af: {
    nativeName: 'Afrikaans',
    englishName: 'Afrikaans'
  },
  'af-NA': {
    nativeName: 'Afrikaans (Namibia)',
    englishName: 'Afrikaans (Namibia)'
  },
  'af-ZA': {
    nativeName: 'Afrikaans (South Africa)',
    englishName: 'Afrikaans (South Africa)'
  },
  ak: {
    nativeName: 'Tɕɥi',
    englishName: 'Akan'
  },
  ar: {
    nativeName: 'العربية',
    englishName: 'Arabic'
  },
  'ar-AR': {
    nativeName: 'العربية',
    englishName: 'Arabic'
  },
  'ar-MA': {
    nativeName: 'العربية',
    englishName: 'Arabic (Morocco)'
  },
  'ar-SA': {
    nativeName: 'العربية (السعودية)',
    englishName: 'Arabic (Saudi Arabia)'
  },
  'ay-BO': {
    nativeName: 'Aymar aru',
    englishName: 'Aymara'
  },
  az: {
    nativeName: 'Azərbaycan dili',
    englishName: 'Azerbaijani'
  },
  'az-AZ': {
    nativeName: 'Azərbaycan dili',
    englishName: 'Azerbaijani'
  },
  'be-BY': {
    nativeName: 'Беларуская',
    englishName: 'Belarusian'
  },
  bg: {
    nativeName: 'Български',
    englishName: 'Bulgarian'
  },
  'bg-BG': {
    nativeName: 'Български',
    englishName: 'Bulgarian'
  },
  bn: {
    nativeName: 'বাংলা',
    englishName: 'Bengali'
  },
  'bn-IN': {
    nativeName: 'বাংলা (ভারত)',
    englishName: 'Bengali (India)'
  },
  'bn-BD': {
    nativeName: 'বাংলা(বাংলাদেশ)',
    englishName: 'Bengali (Bangladesh)'
  },
  'bs-BA': {
    nativeName: 'Bosanski',
    englishName: 'Bosnian'
  },
  ca: {
    nativeName: 'Català',
    englishName: 'Catalan'
  },
  'ca-ES': {
    nativeName: 'Català',
    englishName: 'Catalan'
  },
  cak: {
    nativeName: 'Maya Kaqchikel',
    englishName: 'Kaqchikel'
  },
  'ck-US': {
    nativeName: 'ᏣᎳᎩ (tsalagi)',
    englishName: 'Cherokee'
  },
  cs: {
    nativeName: 'Čeština',
    englishName: 'Czech'
  },
  'cs-CZ': {
    nativeName: 'Čeština',
    englishName: 'Czech'
  },
  cy: {
    nativeName: 'Cymraeg',
    englishName: 'Welsh'
  },
  'cy-GB': {
    nativeName: 'Cymraeg',
    englishName: 'Welsh'
  },
  da: {
    nativeName: 'Dansk',
    englishName: 'Danish'
  },
  'da-DK': {
    nativeName: 'Dansk',
    englishName: 'Danish'
  },
  de: {
    nativeName: 'Deutsch',
    englishName: 'German'
  },
  'de-AT': {
    nativeName: 'Deutsch (Österreich)',
    englishName: 'German (Austria)'
  },
  'de-DE': {
    nativeName: 'Deutsch (Deutschland)',
    englishName: 'German (Germany)'
  },
  'de-CH': {
    nativeName: 'Deutsch (Schweiz)',
    englishName: 'German (Switzerland)'
  },
  dsb: {
    nativeName: 'Dolnoserbšćina',
    englishName: 'Lower Sorbian'
  },
  el: {
    nativeName: 'Ελληνικά',
    englishName: 'Greek'
  },
  'el-GR': {
    nativeName: 'Ελληνικά',
    englishName: 'Greek (Greece)'
  },
  en: {
    nativeName: 'English',
    englishName: 'English'
  },
  'en-GB': {
    nativeName: 'English (UK)',
    englishName: 'English (UK)'
  },
  'en-AU': {
    nativeName: 'English (Australia)',
    englishName: 'English (Australia)'
  },
  'en-CA': {
    nativeName: 'English (Canada)',
    englishName: 'English (Canada)'
  },
  'en-IE': {
    nativeName: 'English (Ireland)',
    englishName: 'English (Ireland)'
  },
  'en-IN': {
    nativeName: 'English (India)',
    englishName: 'English (India)'
  },
  'en-PI': {
    nativeName: 'English (Pirate)',
    englishName: 'English (Pirate)'
  },
  'en-UD': {
    nativeName: 'English (Upside Down)',
    englishName: 'English (Upside Down)'
  },
  'en-US': {
    nativeName: 'English (US)',
    englishName: 'English (US)'
  },
  'en-ZA': {
    nativeName: 'English (South Africa)',
    englishName: 'English (South Africa)'
  },
  'en@pirate': {
    nativeName: 'English (Pirate)',
    englishName: 'English (Pirate)'
  },
  eo: {
    nativeName: 'Esperanto',
    englishName: 'Esperanto'
  },
  'eo-EO': {
    nativeName: 'Esperanto',
    englishName: 'Esperanto'
  },
  es: {
    nativeName: 'Español',
    englishName: 'Spanish'
  },
  'es-AR': {
    nativeName: 'Español (Argentine)',
    englishName: 'Spanish (Argentina)'
  },
  'es-419': {
    nativeName: 'Español (Latinoamérica)',
    englishName: 'Spanish (Latin America)'
  },
  'es-CL': {
    nativeName: 'Español (Chile)',
    englishName: 'Spanish (Chile)'
  },
  'es-CO': {
    nativeName: 'Español (Colombia)',
    englishName: 'Spanish (Colombia)'
  },
  'es-EC': {
    nativeName: 'Español (Ecuador)',
    englishName: 'Spanish (Ecuador)'
  },
  'es-ES': {
    nativeName: 'Español (España)',
    englishName: 'Spanish (Spain)'
  },
  'es-LA': {
    nativeName: 'Español (Latinoamérica)',
    englishName: 'Spanish (Latin America)'
  },
  'es-NI': {
    nativeName: 'Español (Nicaragua)',
    englishName: 'Spanish (Nicaragua)'
  },
  'es-MX': {
    nativeName: 'Español (México)',
    englishName: 'Spanish (Mexico)'
  },
  'es-US': {
    nativeName: 'Español (Estados Unidos)',
    englishName: 'Spanish (United States)'
  },
  'es-VE': {
    nativeName: 'Español (Venezuela)',
    englishName: 'Spanish (Venezuela)'
  },
  et: {
    nativeName: 'eesti keel',
    englishName: 'Estonian'
  },
  'et-EE': {
    nativeName: 'Eesti (Estonia)',
    englishName: 'Estonian (Estonia)'
  },
  eu: {
    nativeName: 'Euskara',
    englishName: 'Basque'
  },
  'eu-ES': {
    nativeName: 'Euskara',
    englishName: 'Basque'
  },
  fa: {
    nativeName: 'فارسی',
    englishName: 'Persian'
  },
  'fa-IR': {
    nativeName: 'فارسی',
    englishName: 'Persian'
  },
  'fb-LT': {
    nativeName: 'Leet Speak',
    englishName: 'Leet'
  },
  ff: {
    nativeName: 'Fulah',
    englishName: 'Fulah'
  },
  fi: {
    nativeName: 'Suomi',
    englishName: 'Finnish'
  },
  'fi-FI': {
    nativeName: 'Suomi',
    englishName: 'Finnish'
  },
  'fo-FO': {
    nativeName: 'Føroyskt',
    englishName: 'Faroese'
  },
  fr: {
    nativeName: 'Français',
    englishName: 'French'
  },
  'fr-CA': {
    nativeName: 'Français (Canada)',
    englishName: 'French (Canada)'
  },
  'fr-FR': {
    nativeName: 'Français (France)',
    englishName: 'French (France)'
  },
  'fr-BE': {
    nativeName: 'Français (Belgique)',
    englishName: 'French (Belgium)'
  },
  'fr-CH': {
    nativeName: 'Français (Suisse)',
    englishName: 'French (Switzerland)'
  },
  'fy-NL': {
    nativeName: 'Frysk',
    englishName: 'Frisian (West)'
  },
  ga: {
    nativeName: 'Gaeilge',
    englishName: 'Irish'
  },
  'ga-IE': {
    nativeName: 'Gaeilge (Gaelic)',
    englishName: 'Irish (Gaelic)'
  },
  gl: {
    nativeName: 'Galego',
    englishName: 'Galician'
  },
  'gl-ES': {
    nativeName: 'Galego',
    englishName: 'Galician'
  },
  'gn-PY': {
    nativeName: 'Avañe\'ẽ',
    englishName: 'Guarani'
  },
  'gu-IN': {
    nativeName: 'ગુજરાતી',
    englishName: 'Gujarati'
  },
  'gx-GR': {
    nativeName: 'Ἑλληνική ἀρχαία',
    englishName: 'Classical Greek'
  },
  he: {
    nativeName: 'עברית‏',
    englishName: 'Hebrew'
  },
  'he-IL': {
    nativeName: 'עברית‏',
    englishName: 'Hebrew'
  },
  hi: {
    nativeName: 'हिन्दी',
    englishName: 'Hindi'
  },
  'hi-IN': {
    nativeName: 'हिन्दी',
    englishName: 'Hindi'
  },
  hr: {
    nativeName: 'Hrvatski',
    englishName: 'Croatian'
  },
  'hr-HR': {
    nativeName: 'Hrvatski',
    englishName: 'Croatian'
  },
  hsb: {
    nativeName: 'Hornjoserbšćina',
    englishName: 'Upper Sorbian'
  },
  ht: {
    nativeName: 'Kreyòl',
    englishName: 'Haitian Creole'
  },
  hu: {
    nativeName: 'Magyar',
    englishName: 'Hungarian'
  },
  'hu-HU': {
    nativeName: 'Magyar',
    englishName: 'Hungarian'
  },
  'hy-AM': {
    nativeName: 'Հայերեն',
    englishName: 'Armenian'
  },
  id: {
    nativeName: 'Bahasa Indonesia',
    englishName: 'Indonesian'
  },
  'id-ID': {
    nativeName: 'Bahasa Indonesia',
    englishName: 'Indonesian'
  },
  is: {
    nativeName: 'Íslenska',
    englishName: 'Icelandic'
  },
  'is-IS': {
    nativeName: 'Íslenska (Iceland)',
    englishName: 'Icelandic (Iceland)'
  },
  it: {
    nativeName: 'Italiano',
    englishName: 'Italian'
  },
  'it-IT': {
    nativeName: 'Italiano',
    englishName: 'Italian'
  },
  ja: {
    nativeName: '日本語',
    englishName: 'Japanese'
  },
  'ja-JP': {
    nativeName: '日本語',
    englishName: 'Japanese'
  },
  'jv-ID': {
    nativeName: 'Basa Jawa',
    englishName: 'Javanese'
  },
  'ka-GE': {
    nativeName: 'ქართული',
    englishName: 'Georgian'
  },
  'kk-KZ': {
    nativeName: 'Қазақша',
    englishName: 'Kazakh'
  },
  km: {
    nativeName: 'ភាសាខ្មែរ',
    englishName: 'Khmer'
  },
  'km-KH': {
    nativeName: 'ភាសាខ្មែរ',
    englishName: 'Khmer'
  },
  kab: {
    nativeName: 'Taqbaylit',
    englishName: 'Kabyle'
  },
  kn: {
    nativeName: 'ಕನ್ನಡ',
    englishName: 'Kannada'
  },
  'kn-IN': {
    nativeName: 'ಕನ್ನಡ (India)',
    englishName: 'Kannada (India)'
  },
  ko: {
    nativeName: '한국어',
    englishName: 'Korean'
  },
  'ko-KR': {
    nativeName: '한국어 (韩国)',
    englishName: 'Korean (Korea)'
  },
  ku: {
    nativeName: 'Kurdî',
    englishName: 'Kurdish'
  },
  'ku-TR': {
    nativeName: 'Kurdî',
    englishName: 'Kurdish'
  },
  la: {
    nativeName: 'Latin',
    englishName: 'Latin'
  },
  'la-VA': {
    nativeName: 'Latin',
    englishName: 'Latin'
  },
  lb: {
    nativeName: 'Lëtzebuergesch',
    englishName: 'Luxembourgish'
  },
  'li-NL': {
    nativeName: 'Lèmbörgs',
    englishName: 'Limburgish'
  },
  lt: {
    nativeName: 'Lietuvių',
    englishName: 'Lithuanian'
  },
  'lt-LT': {
    nativeName: 'Lietuvių',
    englishName: 'Lithuanian'
  },
  lv: {
    nativeName: 'Latviešu',
    englishName: 'Latvian'
  },
  'lv-LV': {
    nativeName: 'Latviešu',
    englishName: 'Latvian'
  },
  mai: {
    nativeName: 'मैथिली, মৈথিলী',
    englishName: 'Maithili'
  },
  'mg-MG': {
    nativeName: 'Malagasy',
    englishName: 'Malagasy'
  },
  mk: {
    nativeName: 'Македонски',
    englishName: 'Macedonian'
  },
  'mk-MK': {
    nativeName: 'Македонски (Македонски)',
    englishName: 'Macedonian (Macedonian)'
  },
  ml: {
    nativeName: 'മലയാളം',
    englishName: 'Malayalam'
  },
  'ml-IN': {
    nativeName: 'മലയാളം',
    englishName: 'Malayalam'
  },
  'mn-MN': {
    nativeName: 'Монгол',
    englishName: 'Mongolian'
  },
  mr: {
    nativeName: 'मराठी',
    englishName: 'Marathi'
  },
  'mr-IN': {
    nativeName: 'मराठी',
    englishName: 'Marathi'
  },
  ms: {
    nativeName: 'Bahasa Melayu',
    englishName: 'Malay'
  },
  'ms-MY': {
    nativeName: 'Bahasa Melayu',
    englishName: 'Malay'
  },
  mt: {
    nativeName: 'Malti',
    englishName: 'Maltese'
  },
  'mt-MT': {
    nativeName: 'Malti',
    englishName: 'Maltese'
  },
  my: {
    nativeName: 'ဗမာစကာ',
    englishName: 'Burmese'
  },
  nb: {
    nativeName: 'Norsk (bokmål)',
    englishName: 'Norwegian (bokmal)'
  },
  'nb-NO': {
    nativeName: 'Norsk (bokmål)',
    englishName: 'Norwegian (bokmal)'
  },
  ne: {
    nativeName: 'नेपाली',
    englishName: 'Nepali'
  },
  'ne-NP': {
    nativeName: 'नेपाली',
    englishName: 'Nepali'
  },
  nl: {
    nativeName: 'Nederlands',
    englishName: 'Dutch'
  },
  'nl-BE': {
    nativeName: 'Nederlands (België)',
    englishName: 'Dutch (Belgium)'
  },
  'nl-NL': {
    nativeName: 'Nederlands (Nederland)',
    englishName: 'Dutch (Netherlands)'
  },
  'nn-NO': {
    nativeName: 'Norsk (nynorsk)',
    englishName: 'Norwegian (nynorsk)'
  },
  no: {
    nativeName: 'Norsk',
    englishName: 'Norwegian'
  },
  oc: {
    nativeName: 'Occitan',
    englishName: 'Occitan'
  },
  'or-IN': {
    nativeName: 'ଓଡ଼ିଆ',
    englishName: 'Oriya'
  },
  pa: {
    nativeName: 'ਪੰਜਾਬੀ',
    englishName: 'Punjabi'
  },
  'pa-IN': {
    nativeName: 'ਪੰਜਾਬੀ (ਭਾਰਤ ਨੂੰ)',
    englishName: 'Punjabi (India)'
  },
  pl: {
    nativeName: 'Polski',
    englishName: 'Polish'
  },
  'pl-PL': {
    nativeName: 'Polski',
    englishName: 'Polish'
  },
  'ps-AF': {
    nativeName: 'پښتو',
    englishName: 'Pashto'
  },
  pt: {
    nativeName: 'Português',
    englishName: 'Portuguese'
  },
  'pt-BR': {
    nativeName: 'Português (Brasil)',
    englishName: 'Portuguese (Brazil)'
  },
  'pt-PT': {
    nativeName: 'Português (Portugal)',
    englishName: 'Portuguese (Portugal)'
  },
  'qu-PE': {
    nativeName: 'Qhichwa',
    englishName: 'Quechua'
  },
  'rm-CH': {
    nativeName: 'Rumantsch',
    englishName: 'Romansh'
  },
  ro: {
    nativeName: 'Română',
    englishName: 'Romanian'
  },
  'ro-RO': {
    nativeName: 'Română',
    englishName: 'Romanian'
  },
  ru: {
    nativeName: 'Русский',
    englishName: 'Russian'
  },
  'ru-RU': {
    nativeName: 'Русский',
    englishName: 'Russian'
  },
  'sa-IN': {
    nativeName: 'संस्कृतम्',
    englishName: 'Sanskrit'
  },
  'se-NO': {
    nativeName: 'Davvisámegiella',
    englishName: 'Northern Sámi'
  },
  'si-LK': {
    nativeName: 'පළාත',
    englishName: 'Sinhala (Sri Lanka)'
  },
  sk: {
    nativeName: 'Slovenčina',
    englishName: 'Slovak'
  },
  'sk-SK': {
    nativeName: 'Slovenčina (Slovakia)',
    englishName: 'Slovak (Slovakia)'
  },
  sl: {
    nativeName: 'Slovenščina',
    englishName: 'Slovenian'
  },
  'sl-SI': {
    nativeName: 'Slovenščina',
    englishName: 'Slovenian'
  },
  'so-SO': {
    nativeName: 'Soomaaliga',
    englishName: 'Somali'
  },
  sq: {
    nativeName: 'Shqip',
    englishName: 'Albanian'
  },
  'sq-AL': {
    nativeName: 'Shqip',
    englishName: 'Albanian'
  },
  sr: {
    nativeName: 'Српски',
    englishName: 'Serbian'
  },
  'sr-RS': {
    nativeName: 'Српски (Serbia)',
    englishName: 'Serbian (Serbia)'
  },
  su: {
    nativeName: 'Basa Sunda',
    englishName: 'Sundanese'
  },
  sv: {
    nativeName: 'Svenska',
    englishName: 'Swedish'
  },
  'sv-SE': {
    nativeName: 'Svenska',
    englishName: 'Swedish'
  },
  sw: {
    nativeName: 'Kiswahili',
    englishName: 'Swahili'
  },
  'sw-KE': {
    nativeName: 'Kiswahili',
    englishName: 'Swahili (Kenya)'
  },
  ta: {
    nativeName: 'தமிழ்',
    englishName: 'Tamil'
  },
  'ta-IN': {
    nativeName: 'தமிழ்',
    englishName: 'Tamil'
  },
  te: {
    nativeName: 'తెలుగు',
    englishName: 'Telugu'
  },
  'te-IN': {
    nativeName: 'తెలుగు',
    englishName: 'Telugu'
  },
  tg: {
    nativeName: 'забо́ни тоҷикӣ́',
    englishName: 'Tajik'
  },
  'tg-TJ': {
    nativeName: 'тоҷикӣ',
    englishName: 'Tajik'
  },
  th: {
    nativeName: 'ภาษาไทย',
    englishName: 'Thai'
  },
  'th-TH': {
    nativeName: 'ภาษาไทย (ประเทศไทย)',
    englishName: 'Thai (Thailand)'
  },
  tl: {
    nativeName: 'Filipino',
    englishName: 'Filipino'
  },
  'tl-PH': {
    nativeName: 'Filipino',
    englishName: 'Filipino'
  },
  tlh: {
    nativeName: 'tlhIngan-Hol',
    englishName: 'Klingon'
  },
  tr: {
    nativeName: 'Türkçe',
    englishName: 'Turkish'
  },
  'tr-TR': {
    nativeName: 'Türkçe',
    englishName: 'Turkish'
  },
  'tt-RU': {
    nativeName: 'татарча',
    englishName: 'Tatar'
  },
  uk: {
    nativeName: 'Українська',
    englishName: 'Ukrainian'
  },
  'uk-UA': {
    nativeName: 'Українська',
    englishName: 'Ukrainian'
  },
  ur: {
    nativeName: 'اردو',
    englishName: 'Urdu'
  },
  'ur-PK': {
    nativeName: 'اردو',
    englishName: 'Urdu'
  },
  uz: {
    nativeName: 'O\'zbek',
    englishName: 'Uzbek'
  },
  'uz-UZ': {
    nativeName: 'O\'zbek',
    englishName: 'Uzbek'
  },
  vi: {
    nativeName: 'Tiếng Việt',
    englishName: 'Vietnamese'
  },
  'vi-VN': {
    nativeName: 'Tiếng Việt',
    englishName: 'Vietnamese'
  },
  'xh-ZA': {
    nativeName: 'isiXhosa',
    englishName: 'Xhosa'
  },
  yi: {
    nativeName: 'ייִדיש',
    englishName: 'Yiddish'
  },
  'yi-DE': {
    nativeName: 'ייִדיש (German)',
    englishName: 'Yiddish (German)'
  },
  zh: {
    nativeName: '中文',
    englishName: 'Chinese'
  },
  'zh-HANS': {
    nativeName: '中文简体',
    englishName: 'Chinese Simplified'
  },
  'zh-HANT': {
    nativeName: '中文繁體',
    englishName: 'Chinese Traditional'
  },
  'zh-CN': {
    nativeName: '中文（中国）',
    englishName: 'Chinese Simplified (China)'
  },
  'zh-HK': {
    nativeName: '中文（香港）',
    englishName: 'Chinese Traditional (Hong Kong)'
  },
  'zh-SG': {
    nativeName: '中文（新加坡）',
    englishName: 'Chinese Simplified (Singapore)'
  },
  'zh-TW': {
    nativeName: '中文（台灣）',
    englishName: 'Chinese Traditional (Taiwan)'
  },
  'zu-ZA': {
    nativeName: 'isiZulu',
    englishName: 'Zulu'
  }
};

// We normalize language codes to all lower case, while this table
// uses lower-UPPER format for 4 letter codes. This duplicates all entries
// in lower case. It's a bit hacky, but lets us keep in sync with updates
// to the table without needing to normalize it to lower-lower every time.
for (const key of Object.keys(mozillaLanguageMapping)) {
  mozillaLanguageMapping[key.toLowerCase()] = mozillaLanguageMapping[key];
}
