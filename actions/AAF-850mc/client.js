function(properties, context) {
  try {
    if (toastr === undefined) {
      throw new Error('Reference to toastr is undefined');
    }

    const nxToastPosition = properties.position
      .trim()
      .replace(/\s/g, '-')
      .toLowerCase();

    const nxToastTitle = properties.title || '';
    const nxToastMessage = properties.message || null;
    const nxPropTimeout = parseInt(properties.timeout);
    const nxContextTimeout = parseInt(context.keys.Timeout);
    let nxToastTimeout = 6000;

    if (!isNaN(nxPropTimeout)) {
      nxToastTimeout = nxPropTimeout;
    } else if (!isNaN(nxContextTimeout)) {
      nxToastTimeout = nxContextTimeout;
    }

    if (nxToastMessage === null) {
      toastr['warning']('You forgot to enter a message.');
      return;
    }

    // colors
    const toastDefaultColors = {
      info: { text: 'rgb(59 130 246 / 1)', bg: 'rgb(239 246 255 / 1)' },
      warning: { text: 'rgb(249 115 22 / 1)', bg: 'rgb(255 247 237 / 1)' },
      error: { text: 'rgb(239 68 68 / 1)', bg: 'rgb(254 242 242 / 1)' },
      success: { text: 'rgb(20 184 166 / 1)', bg: 'rgb(240 253 250 / 1)' },
    };

    // user defined colors
    const nxToastInfoBg = context.keys['Info_BG_Color'];
    const nxToastInfoTxt = context.keys['Info_TXT_Color'];
    const nxToastSuccessBg = context.keys['Success_BG_Color'];
    const nxToastSuccessTxt = context.keys['Success_TXT_Color'];
    const nxToastWarningBg = context.keys['Warning_BG_Color'];
    const nxToastWarningTxt = context.keys['Warning_TXT_Color'];
    const nxToastErrorBg = context.keys['Error_BG_Color'];
    const nxToastErrorTxt = context.keys['Error_TXT_Color'];

    // toast styles
    const toastStyles = {
      info: {
        backgroundColor: nxToastInfoBg || toastDefaultColors.info.bg,
        color: nxToastInfoTxt || toastDefaultColors.info.text,
      },
      success: {
        backgroundColor: nxToastSuccessBg || toastDefaultColors.success.bg,
        color: nxToastSuccessTxt || toastDefaultColors.success.text,
      },
      warning: {
        backgroundColor: nxToastWarningBg || toastDefaultColors.warning.bg,
        color: nxToastWarningTxt || toastDefaultColors.warning.text,
      },
      error: {
        backgroundColor: nxToastErrorBg || toastDefaultColors.error.bg,
        color: nxToastErrorTxt || toastDefaultColors.error.text,
      },
    };

    toastr.options = {
      closeButton: true,
      progressBar: properties.progress_bar,
      positionClass: 'toast-' + nxToastPosition,
      newestOnTop: false,
      preventDuplicates: properties.prevent_duplicates,
      timeOut: nxToastTimeout,
      extendedTimeOut: 1000,
    };

    if (properties.toast_type) {
      toastr[properties.toast_type](bbcodeHTMl(nxToastMessage), nxToastTitle);
      if (
        properties.play_sound &&
        String(properties.play_sound).toLowerCase() === 'yes'
      ) {
        const xAudio = new Audio(
          'https://dd7tel2830j4w.cloudfront.net/f1663854581689x804563806938988900/noti2.mp3'
        );
        xAudio.play();
      }
    }

    Array.from(document.querySelectorAll('.toast')).forEach(function (el) {
      if (el.classList.contains('toast-info')) {
        applyToastStyles(el, toastStyles.info);
      }
      if (el.classList.contains('toast-success')) {
        applyToastStyles(el, toastStyles.success);
      }
      if (el.classList.contains('toast-warning')) {
        applyToastStyles(el, toastStyles.warning);
      }
      if (el.classList.contains('toast-error')) {
        applyToastStyles(el, toastStyles.error);
      }
    });
  } catch (error) {
    console.warn(error);
  }

  function applyToastStyles(el, styles = {}) {
    Object.assign(el.style, styles);
  }

  function bbcodeHTMl(bbcodeString) {
    return String(bbcodeString).replace(/(\[|\])/g, function (x) {
      return { '[': '<', ']': '>' }[x];
    });
  }
}