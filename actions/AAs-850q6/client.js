function(properties, context) {
  try {
    if (BubbleToast === undefined) {
      throw new Error('Reference to BubbleToast is undefined');
    }
    const audioSource = {
      iphone:
        '//meta-q.cdn.bubble.io/f1701539818439x962431130748698100/iphone_sound.mp3',
      notification:
        '//meta-q.cdn.bubble.io/f1701539833296x836213152712418800/notification.mp3',
      yes: '//meta-q.cdn.bubble.io/f1701539849788x808105898544384300/yes.mp3',
    };
    const props = {
      title: properties.title,
      message: bbCodeHTMl(properties.message),
      autoClose: parseInt(properties.auto_close),
      canClose: properties.can_close,
      showProgress: properties.show_progress,
      pauseOnHover: properties.pause_on_hover,
      preventDuplicates: properties.prevent_duplicates,
    };
    if (properties.position) {
      const p = properties.position.trim().toLowerCase();
      props.position = p;
    }
    if (properties.color) {
      props.color = properties.color;
    }
    if (properties.text_color) {
      props.textColor = properties.text_color;
    }
    if (properties.progress_color) {
      props.progressColor = properties.progress_color;
    }
    if (!props.message || props.message.trim() === '') {
      throw new Error('Message property must not be empty');
    }
    const Toast = BubbleToast();
    const toast = new Toast(props);
    if (properties.type) {
      const t = properties.type.trim().toLowerCase();
      toast[t]();
    }
    if (
      properties.notification_sound &&
      audioSource.hasOwnProperty(properties.notification_sound.toLowerCase())
    ) {
      playSound(properties.notification_sound);
    }
    function playSound(selected) {
      const sound = selected.trim().toLowerCase();
      const audio = new Audio(audioSource[sound]);
      audio.play();
    }
    function bbCodeHTMl(bbCodeString) {
      return String(bbCodeString).replace(/(\[|\])/g, function (x) {
        return { '[': '<', ']': '>' }[x];
      });
    }
  } catch (error) {
    console.warn(
      '%cBubble Toast Error:',
      'background-color: #ff0; color: #333; font-weight: bold',
      error.message
    );
  }
}