import showdown from "showdown";
import select from "../../utils/dom";
import { url } from "../../utils/urlManager";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { button } from "../atoms/button/button";

const converter = new showdown.Converter({
  tasklists: true,
  emoji: true,
  simplifiedAutoLink: true,
  tables: true,
  openLinksInNewWindow: true,
});

converter.setFlavor("github");

const markDownViewer = (() => {
  return {
    view: select(".preview"),
    init: function () {
      this.update();
      select(".terminal").listen("input", () => this.update());
      const isVisible = Boolean(url.getSearchParam("md"));
      if (isVisible === true) {
        this.view.show();
      } else {
        this.view.hide();
      }
      return this;
    },
    update: function () {
      this.view.innerHTML(converter.makeHtml(select(".terminal").getValue()));
      const { elements } = select("pre");
      Array.prototype.slice.call(elements).forEach((el) => {
        const copyBtn = button("📋 Copy", async (e) => {
          e.stopPropagation();
          const codeToCopy = e.srcElement.previousSibling.innerHTML;
          await copyToClipboard(codeToCopy, "📋 Code copied to clipboard");
        });
        el.appendChild(copyBtn);
      });

      select("code").listenAll("click", async ({ innerHTML }) => {
        const result = eval(innerHTML);
        select(".console").show().innerHTML(result);
      });
      select(".console").listen("click", async (e) => {
        e.srcElement.classList.add("hidden");
        const codeToCopy = e.srcElement.innerHTML;
        await copyToClipboard(codeToCopy, "📋 Code copied to clipboard");
      });
    },
    show: function (mode = true) {
      this.view.show();
      url.set(undefined, {
        md: mode,
      });
    },
    hide: function () {
      this.view.hide();
      url.deleteParam("md");
    },
    toggle: function (mode = "true") {
      if (url.getSearchParam("md") === mode) {
        this.hide();
      } else {
        this.show(mode);
      }
      return this;
    },
  };
})();

export default markDownViewer;
