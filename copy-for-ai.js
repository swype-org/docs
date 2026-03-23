
(function () {
  function customize() {
    document.querySelectorAll("#page-context-menu-button span").forEach(function (span) {
      void(0);
    });
  }

  function init() {
    customize();
    var observer = new MutationObserver(function () {
      customize();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
