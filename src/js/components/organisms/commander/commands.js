import {
  saveNote,
  getNote,
  resetNoteManager,
  getNotes,
  deleteNote,
} from "../noteManager/noteManager";
import select from "../../../utils/dom";
import storage from "../../../utils/localstorage";
import {
  goAuthenticate,
  setGistToSyncWith,
  syncNotesWithGitHub,
} from "../../../utils/github/actions";
import commander from "./commander";
import {
  saveFileAs,
  saveDataToFile,
} from "../../../utils/fileSystem/fileSystem";
import { url } from "../../../utils/urlManager";
import { mailTo } from "../../../utils/mail";
import markDownViewer from "../markDownViewer";
import prettifyJSON from "../../../utils/prettifyJSON";
import notify from "../../molecules/notify";
import ipfs from "../../../utils/ipfs";
import { copyToClipboard } from "../../../utils/copyToClipboard";
import { sleep } from "../../../utils/sleep";
import { updateGist } from "../../../utils/github/api";
import { icon } from "../../atoms/icon/icon";
import ListSVG from "../../../../assets/svg/list.svg";
import TrashSVG from "../../../../assets/svg/trash.svg";
import CheckmarkCircleSVG from "../../../../assets/svg/checkmark-circle.svg";
import CloudSyncSVG from "../../../../assets/svg/cloud-sync.svg";
import LighterSVG from "../../../../assets/svg/lighter.svg";
import CloudUploadSVG from "../../../../assets/svg/cloud-upload.svg";
import EnterDownSVG from "../../../../assets/svg/enter-down.svg";
import DownloadSVG from "../../../../assets/svg/download.svg";
import EnvelopeSVG from "../../../../assets/svg/envelope.svg";
import PictureSVG from "../../../../assets/svg/picture.svg";
import PrinterSVG from "../../../../assets/svg/printer.svg";
import PageBreakSVG from "../../../../assets/svg/page-break.svg";
import FrameExpandSVG from "../../../../assets/svg/frame-expand.svg";
import MagicWandSVG from "../../../../assets/svg/magic-wand.svg";
import RocketSVG from "../../../../assets/svg/rocket.svg";
import SpellCheckSVG from "../../../../assets/svg/spell-check.svg";
import PencilSVG from "../../../../assets/svg/pencil.svg";
import ShareSVG from "../../../../assets/svg/exit-up.svg";
import AlarmSVG from "../../../../assets/svg/alarm.svg";
import { share } from "../../../utils/webShare";
import { notifier } from "../../molecules/notifier";

const getSyncTitle = () => {
  const gistId = storage.get("gistId");
  const authToken = storage.get("authToken");
  if (!authToken) {
    return "Sync: Authorize your GitHub account for synchronisation";
  }
  if (!gistId) {
    return "Sync: Pick your Gist to sync with";
  }
  return "Sync: Notes with my GitHub Gist";
};

const shareNoteCommand = {
  title: "Share note",
  icon: icon(ShareSVG, "share note"),
  sortTitle: "Share",
  call: share,
};

export const commands = () => {
  return [
    {
      title: "Set reminder",
      icon: icon(AlarmSVG, "Reminder"),
      sortTitle: "Reminder",
      key: "shift r",
      call: () => {
        console.log("Reminders are under construction");
        notifier.notify("Hey there");
        commander.hide();
      },
    },
    {
      title: "New note",
      icon: icon(PencilSVG, "new note"),
      sortTitle: "New",
      key: "n",
      call: () => resetNoteManager(),
    },
    {
      title: "Save",
      key: "s",
      icon: icon(CheckmarkCircleSVG, "save"),
      sortTitle: "Save",
      call: async () => {
        commander.hide();
        await saveNote(select(".terminal").getValue());
        const note = getNote();
        const { disableSync = false } = note;
        if (!disableSync) {
          updateGist([note]);
        }
        select("#save").removeClass("unsaved");
      },
    },
    ...(navigator.share ? [shareNoteCommand] : []),
    {
      title: "Toggle MarkDown Viewer",
      icon: icon(PageBreakSVG, "toggle markdown viewer", "rotate90"),
      sortTitle: "Split",
      key: "m",
      call: () => {
        markDownViewer.toggle();
        commander.hide();
      },
    },
    {
      title: "Full MarkDown view",
      icon: icon(FrameExpandSVG, "full view"),
      sortTitle: "Full view",
      key: "shift m",
      call: () => {
        markDownViewer.toggle("full");
        commander.hide();
      },
    },
    {
      title: "List saved notes",
      icon: icon(ListSVG, "list notes"),
      sortTitle: "Notes",
      key: "p",
      call: () => commander.toggle(commander.getModes().notes),
    },
    {
      title: "Delete note",
      key: "shift d",
      icon: icon(TrashSVG, "delete note"),
      sortTitle: "Delete",
      call: () => deleteNote(),
    },
    {
      title: getSyncTitle(),
      icon: icon(CloudSyncSVG, "sync with github"),
      key: null,
      call: async () => {
        const token = storage.get("authToken");
        if (!token) {
          return await goAuthenticate();
        }
        const gistId = storage.get("gistId");
        if (!gistId) {
          return await setGistToSyncWith(token);
        }
        commander.hide();
        await syncNotesWithGitHub();
      },
    },
    {
      title: "Sync: Reset Gist settings",
      icon: icon(LighterSVG, "reset github settings"),
      key: null,
      call: async () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("gistId");
        localStorage.removeItem("lastLocalUpdate");
        localStorage.removeItem("lastSync");
        notify.info("Gist setting have been reset!");
        commander.hide();
      },
    },
    {
      title: "Toggle sidebar",
      experimental: true,
      key: "l",
      call: () => {
        select("aside").toggle();
      },
    },
    {
      title: "Save to File System...",
      experimental: true,
      icon: icon(EnterDownSVG, "save file"),
      key: "shift s",
      call: async () => {
        const { text, title } = getNote();
        await navigator.clipboard.writeText(title);
        saveFileAs(text);
        commander.hide();
      },
    },
    {
      title: "Save to IPFS",
      key: "i",
      icon: icon(CloudUploadSVG, "save to ipfs"),
      call: () => {
        ipfs.save(select(".terminal").getValue());
        commander.hide();
      },
    },
    {
      title: "Email note to...",
      experimental: true,
      icon: icon(EnvelopeSVG, "email"),
      key: "e",
      call: () => {
        const note = `${
          document.querySelector(".terminal").value
        } \n ${url.get()}`;
        mailTo(note);
        commander.hide();
      },
    },
    {
      title: "Add a cover picture",
      experimental: true,
      icon: icon(PictureSVG, "cover picture"),
      key: null,
      call: async () => {
        const bgImage = prompt("Paste the image URL in here...");
        commander.hide();
        await sleep(200); // need to wait after prompt for some reason before copy
        copyToClipboard(
          `<div class="cover" style="background-image: url('${bgImage}')"></div>`,
          "👌Copied! Paste the code on the MiroPad editor"
        );
        select(".terminal").focus();
        notify.info(
          "Paste the cover picture wherever you prefer on the MirPad editor"
        );
      },
    },
    {
      title: "Print MarkDown output",
      experimental: true,
      icon: icon(PrinterSVG, "print"),
      key: null,
      call: () => {
        select(".preview").show();
        markDownViewer.init();
        window.print();
        commander.hide();
      },
    },
    {
      key: "j",
      title: "Prettify JSON document",
      icon: icon(MagicWandSVG, "prettify json"),
      call: () => {
        prettifyJSON(".terminal");
        commander.hide();
      },
    },
    {
      title: "Toggle command palette",
      icon: icon(RocketSVG, "toggle command palette"),
      key: "shift p",
      call: () => commander.toggle(commander.getModes().commands),
    },
    {
      title: "Find and Replace...",
      experimental: true,
      icon: icon(SpellCheckSVG, "find and replace"),
      key: "shift f",
      call: () => {
        const selectedValue = select(".terminal")
          .getValue()
          .slice(
            select(".terminal").el.selectionStart,
            select(".terminal").el.selectionEnd
          );
        const valueToFind = prompt("What do you wanna find?", selectedValue);
        if (!valueToFind) {
          return this;
        }
        const positionOfFirstChar = select(".terminal")
          .getValue()
          .indexOf(valueToFind);

        select(".terminal").el.setSelectionRange(
          positionOfFirstChar,
          positionOfFirstChar + valueToFind.length
        );
        const replacementValue = prompt(`Replace ${valueToFind} with...`);
        if (replacementValue) {
          select(".terminal").el.setRangeText(replacementValue);
        }
      },
    },
    {
      title: "Download all notes!",
      icon: icon(DownloadSVG, "Download all notes on your local file system"),
      call: () => {
        const notes = getNotes({
          includeDeleted: true,
        });
        saveDataToFile(notes);
        commander.hide();
      },
    },
    {
      title: "Permanently delete ALL notes ❗",
      icon: icon(TrashSVG, "delete note"),
      call: () => {
        const confirmation = confirm(
          "Are you sure you want do delete ALL your notes?"
        );
        if (confirmation) {
          const notes = getNotes({
            includeDeleted: true,
          });
          notes.forEach((note) => {
            storage.remove(note.id);
          });
          resetNoteManager();
        }
        commander.hide();
      },
    },
  ];
};
