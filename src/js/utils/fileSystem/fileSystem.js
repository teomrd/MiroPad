import notify from "../../components/molecules/notify";

export const getNewFileHandle = () => {
  const handle = window.chooseFileSystemEntries({
    type: "saveFile",
    accepts: [
      {
        description: "Text file",
        extensions: ["miropad"],
        mimeTypes: ["text/plain"],
      },
    ],
  });
  return handle;
};

export const writeFile = async (fileHandle, contents) => {
  // Create a writer
  const writer = await fileHandle.createWriter();
  // Write the full length of the contents
  await writer.write(0, contents);
  // Close the file and write the contents to disk
  await writer.close();
};

/**
 * Saves a new file to disk using the Service Worker.
 * Thanks to https://serviceworke.rs/local-download_service-worker_doc.html
 */
export const saveFileAsWithServiceWorker = async (title, content) => {
  try {
    const response = await fetch("/download", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
    }).then(() => {
      window.location = "/download";
    });
  } catch (error) {
    console.log({ error });
  }
};

/**
 * Saves a new file to disk.
 */
export const saveFileAs = async (contents) => {
  let fileHandle;
  try {
    fileHandle = await getNewFileHandle();
  } catch (ex) {
    if (ex.name === "AbortError") {
      notify.info("File saving aborted");
      return;
    }
    const msg = "An error occurred trying to open the file.";
    notify.error(msg);
    return;
  }
  try {
    await writeFile(fileHandle, contents);
  } catch (ex) {
    const msg = "Unable to save file.";
    notify.error(msg);
  }
};

export const saveDataToFile = (() => {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return (data, fileName = `MiroPad-${new Date().toISOString()}.json`) => {
    const json = JSON.stringify(data),
      blob = new Blob([json], { type: "octet/stream" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();
