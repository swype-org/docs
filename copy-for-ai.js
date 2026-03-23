
(function () {
  var SITEMAP = [
    "[Introduction](/introduction): Documentation, integration guides, and SDK reference",
    "[Quickstart](/quickstart): Get a working Blink deposit integration in 5 minutes.",
    "[Architecture Overview](/integration/architecture): How Blink deposit flows work. The signed-link model, data flow, and component responsibilities.",
    "[Generate Your Key Pair](/integration/key-generation): Create an ECDSA P-256 key pair for signing payment requests.",
    "[Register Your Merchant Account](/integration/merchant-registration): Send your public key to Blink and receive your merchant ID.",
    "[Build Your Signer Endpoint](/integration/signer-endpoint): Create the server-side endpoint that validates and signs payment requests.",
    "[Integrate the Deposit SDK](/integration/deposit-sdk): Install and configure the Deposit SDK to trigger payment flows from your frontend.",
    "[Integrate the Mobile Deposit SDK](/integration/deposit-mobile-sdk): Install and configure the Mobile Deposit SDK for React Native and native mobile apps.",
    "[Testing](/integration/testing): Verify your Blink integration with the sample app and staging environment.",
    "[Production Checklist](/integration/production-checklist): Verify every item before going live with Blink payments.",
    "[Deposit Class](/sdk-reference/deposit-class): API reference for the Deposit class. The core SDK entry point.",
    "[React Hook](/sdk-reference/react-hook): API reference for the useBlinkDeposit React hook.",
    "[TypeScript Types](/sdk-reference/types): Complete type reference for the Deposit SDK.",
    "[Error Handling](/sdk-reference/errors): Error codes, DepositError class, and user-friendly error messages.",
    "[Events and Lifecycle](/sdk-reference/events): Event system, status transitions, and instance lifecycle management.",
    "[MobileDeposit Class](/sdk-reference/mobile-deposit-class): API reference for the MobileDeposit class for mobile SDK integrations.",
    "[React Native Hook](/sdk-reference/mobile-react-native-hook): API reference for the useBlinkMobileDeposit hook.",
    "[Mobile Error Codes](/sdk-reference/mobile-errors): Error codes and user-friendly error messages for the mobile SDK."
  ];

  function htmlToMarkdown(el) {
    var md = "";
    var nodes = el.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType === 3) {
        md += node.textContent;
        continue;
      }
      if (node.nodeType !== 1) continue;
      var tag = node.tagName.toLowerCase();
      if (tag === "h1") md += "\n# " + node.textContent.trim() + "\n\n";
      else if (tag === "h2") md += "\n## " + node.textContent.trim() + "\n\n";
      else if (tag === "h3") md += "\n### " + node.textContent.trim() + "\n\n";
      else if (tag === "h4") md += "\n#### " + node.textContent.trim() + "\n\n";
      else if (tag === "p") md += node.textContent.trim() + "\n\n";
      else if (tag === "pre") {
        var code = node.querySelector("code");
        var lang = "";
        if (code && code.className) {
          var m = code.className.match(/language-(\w+)/);
          if (m) lang = m[1];
        }
        md += "```" + lang + "\n" + (code || node).textContent.trim() + "\n```\n\n";
      }
      else if (tag === "ul" || tag === "ol") {
        var items = node.querySelectorAll(":scope > li");
        for (var j = 0; j < items.length; j++) {
          var prefix = tag === "ol" ? (j + 1) + ". " : "- ";
          md += prefix + items[j].textContent.trim() + "\n";
        }
        md += "\n";
      }
      else if (tag === "table") {
        var rows = node.querySelectorAll("tr");
        for (var r = 0; r < rows.length; r++) {
          var cells = rows[r].querySelectorAll("th, td");
          var row = "| ";
          for (var c = 0; c < cells.length; c++) {
            row += cells[c].textContent.trim() + " | ";
          }
          md += row + "\n";
          if (r === 0) {
            md += "| ";
            for (var c2 = 0; c2 < cells.length; c2++) md += "--- | ";
            md += "\n";
          }
        }
        md += "\n";
      }
      else if (tag === "a") {
        var href = node.getAttribute("href") || "";
        md += "[" + node.textContent.trim() + "](" + href + ")";
      }
      else if (tag === "code") {
        md += "`" + node.textContent + "`";
      }
      else if (tag === "strong" || tag === "b") {
        md += "**" + node.textContent.trim() + "**";
      }
      else if (tag === "em" || tag === "i") {
        md += "*" + node.textContent.trim() + "*";
      }
      else if (tag === "blockquote") {
        md += "> " + node.textContent.trim() + "\n\n";
      }
      else if (tag === "br") {
        md += "\n";
      }
      else {
        md += htmlToMarkdown(node);
      }
    }
    return md;
  }

  function getPageMarkdown() {
    var title = document.querySelector("#page-title, h1");
    var content = document.querySelector("#content-area, .mdx-content, article");
    if (!content) content = document.querySelector("main");

    var sitemap = "<!--\nSitemap:\n" + SITEMAP.map(function (s) { return "- " + s; }).join("\n") + "\n-->\n\n";
    var titleText = title ? "# " + title.textContent.trim() + "\n\n" : "";
    var body = content ? htmlToMarkdown(content) : "";

    return sitemap + titleText + body.trim() + "\n";
  }

  function createButton() {
    var existing = document.getElementById("copy-for-ai-btn");
    if (existing) return;

    var header = document.querySelector("#header, .eyebrow, [class*='eyebrow']");
    if (!header) {
      var pageTitle = document.querySelector("#page-title");
      if (pageTitle) header = pageTitle.parentElement;
    }
    if (!header) return;

    header.style.position = "relative";

    var btn = document.createElement("button");
    btn.id = "copy-for-ai-btn";
    btn.textContent = "Copy page for AI";
    btn.style.cssText = "position:absolute;right:0;top:50%;transform:translateY(-50%);padding:6px 12px;border-radius:6px;border:1px solid rgba(128,128,128,0.25);background:transparent;color:inherit;font-size:12px;font-family:inherit;cursor:pointer;transition:border-color 0.15s;white-space:nowrap;";
    btn.onmouseenter = function () { btn.style.borderColor = "var(--primary, #CAFF34)"; };
    btn.onmouseleave = function () { btn.style.borderColor = "rgba(128,128,128,0.25)"; };

    btn.addEventListener("click", function () {
      var md = getPageMarkdown();
      navigator.clipboard.writeText(md).then(function () {
        var original = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(function () { btn.textContent = original; }, 2000);
      });
    });

    header.appendChild(btn);
  }

  function init() {
    createButton();
    var observer = new MutationObserver(function () {
      if (!document.getElementById("copy-for-ai-btn")) createButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
