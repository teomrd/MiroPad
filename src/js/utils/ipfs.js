/* eslint-disable no-unused-vars */

// /*global Buffer */
// import IPFS from "ipfs";
// import { url } from "./urlManager";
// import CID from "cids";
// import notify from "../components/molecules/notify";
// import { copyToClipboard } from "./copyToClipboard";
// import select from "./dom";
import storage from "./localstorage";
// import { saveNote } from "../components/organisms/noteManager/noteManager";

let ipfsNode;

const setInfo = async (node) => {
  // const nodeInfo = await node.id();
  // storage.set("ipfsNode", JSON.stringify(nodeInfo));
};

const initIpfsNode = async () => {
  // const node = ipfsNode || (await IPFS.create());
  // setInfo(node);
  // return node;
};

export const retrieveFromIPFS = async (cid) => {
  // try {
  //   const retrievedValueFromIPFS = await ipfs.getFileContents(cid);
  //   select(".terminal").setValue(retrievedValueFromIPFS);
  //   notify.success("IPFS note retrieved!");
  // } catch (error) {
  //   notify.error(`IPFS Error ${error.message}`);
  // }
};

const ipfs = {
  isValidCid(hash) {
    return false;
    // try {
    //   new CID(hash); // eslint-disable-line no-new
    //   return true;
    // } catch (e) {
    //   return false;
    // }
  },
  getFileContents: async function (cid) {
    // try {
    //   const node = await initIpfsNode();
    //   const source = await node.cat(cid);
    //   let data = "";
    //   for await (const chunk of source) {
    //     data = `${data}${chunk.toString()}`;
    //   }
    //   return Promise.resolve(data);
    // } catch (error) {
    //   notify.error(`The requested CID: ${cid} was not found`);
    //   return Promise.reject(new Error("Not valid CID"));
    // }
  },
  save: async function (value) {
    // console.log("save value to IPFS:", value);
    // const add = async () => {
    //   const node = await initIpfsNode();
    //   const results = await node.add([{ content: Buffer.from(value) }]);
    //   let hash;
    //   for await (const result of results) {
    //     hash = result.path;
    //   }
    //   return hash
    //     ? Promise.resolve(hash)
    //     : Promise.reject("IPFS Error: No path found");
    // };
    // try {
    //   const hash = await add(value);
    //   saveNote(value, hash);
    //   copyToClipboard(
    //     `${url.baseUrl}#${hash}`,
    //     "👌 Note saved. IPFS Link copied to clipboard!"
    //   );
    // } catch (e) {
    //   notify.error(`😱 Something went wrong while trying to save to IPFS ${e}`); // eslint-disable-line
    // }
  },
};

export default ipfs;
