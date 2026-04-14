(function () {
  function fallbackCopy(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    var successful = false;
    try {
      successful = document.execCommand("copy");
    } catch (_error) {
      successful = false;
    }

    document.body.removeChild(textarea);
    return successful;
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text)
        .then(function () {
          return true;
        })
        .catch(function () {
          return fallbackCopy(text);
        });
    }

    return Promise.resolve(fallbackCopy(text));
  }

  function setButtonState(button, copied) {
    var originalLabel = button.dataset.copyLabel || button.textContent;
    button.dataset.copyLabel = originalLabel;

    button.textContent = copied ? "Copied" : "Copy failed";
    button.disabled = true;

    window.setTimeout(function () {
      button.textContent = originalLabel;
      button.disabled = false;
    }, 1200);
  }

  function attachCopyHandlers() {
    document.addEventListener("click", function (event) {
      var button = event.target.closest("[data-copy-text]");
      if (!button) {
        return;
      }

      event.preventDefault();
      var text = (button.dataset.copyText || "").trim();
      if (!text) {
        return;
      }

      copyToClipboard(text).then(function (copied) {
        setButtonState(button, copied);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachCopyHandlers);
  } else {
    attachCopyHandlers();
  }
})();
