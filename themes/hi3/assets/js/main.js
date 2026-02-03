function copyToClipboard(text) {
  // Use Clipboard API if available (requires secure context or localhost)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log(`Copied text to clipboard`);
      })
      .catch((error) => {
        console.error(`Could not copy text: ${error}`);
      });
  } else {
    // Fallback for non-secure contexts
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      console.log(`Copied text to clipboard`);
    } catch (error) {
      console.error(`Could not copy text: ${error}`);
    }
    document.body.removeChild(textarea);
  }
}

function ready(callback) {
  if (document.readyState != "loading") callback();
  else if (document.addEventListener) document.addEventListener("DOMContentLoaded", callback);
}

// Attach clipboard handlers to all copy buttons
var attachCopyHandlers = function() {
  var buttons = document.querySelectorAll('[data-copy-text]');
  buttons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      copyToClipboard(this.dataset.copyText);
    });
  });
};

ready(attachCopyHandlers);

var removeHidden = function() {
  var hidden = window.top.document.querySelectorAll(".hidden");
  for (let i = 0; i < hidden.length; i++) {
    hidden[i].classList.remove("hidden");
  }
};
ready(removeHidden);
