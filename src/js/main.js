import "../css/styles.css";
import "../css/print.css";
import "github-markdown-css";
import welcomeUser from "./components/molecules/welcome";
import errorHandler from "./utils/errorHandler";
import select from "./utils/dom";
import {
  setNoteFromHash,
  resetNoteManager,
  getNote,
  search,
} from "./components/organisms/noteManager/noteManager";
import { url } from "./utils/urlManager";
import { copyToClipboard } from "./utils/copyToClipboard";
import markDownViewer from "./components/organisms/markDownViewer";
import commander from "./components/organisms/commander/commander";
import {
  syncNotesWithGitHub,
  setAuthTokenFromCallback,
} from "./utils/github/actions";
import { registerServiceWorker } from "./registerServiceWorker";

const actOnURLStateChange = () => {
  setNoteFromHash();

  if (url.getSearchParam("md") === "full") {
    select(".terminal").hide();
  } else {
    select(".terminal").show();
  }

  if (url.getSearchParam("cid")) {
    select(".anchor").show();
  } else {
    select(".anchor").hide();
  }

  const q = url.getSearchParam("q");
  const queryResult = search(q);
  if (queryResult) select(".terminal").setValue(queryResult.text);
};

const main = async () => {
  window.addEventListener("error", errorHandler);
  welcomeUser();
  commander.init();

  select(".terminal")
    .listen("focus", () => commander.hide())
    .listen("keydown", (e) => {
      // tab feature
      if (e.keyCode === 9) {
        e.preventDefault();
        select(".terminal").insertAtCaret("  ");
      }
    })
    .listen("keyup", () => {
      // unsaved state UI indication
      const currentNode = getNote();
      if (currentNode) {
        const { text = "" } = currentNode;
        if (select(".terminal").getValue() !== text) {
          select(".logo").addClass("unsaved");
        } else {
          select(".logo").removeClass("unsaved");
        }
      }
    });

  setNoteFromHash(url.getPageId());

  select(".logo").listen("click", resetNoteManager);
  select("#permalink").listen("click", async () => {
    await copyToClipboard(url.get());
  });

  markDownViewer.init();

  window.addEventListener("hashchange", actOnURLStateChange);
  actOnURLStateChange();

  registerServiceWorker();

  await syncNotesWithGitHub();
  await setAuthTokenFromCallback();
};

export default main;
