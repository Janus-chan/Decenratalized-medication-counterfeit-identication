
const { Web3Storage, getFilesFromPath, Blob, File } = require("web3.storage");

const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI4NDMzYTVGZDg0ZDJENTkyMDM3NmM1MDY2ZTQ2M0MxYTkwMTI3NGMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODIwMDMwODgxMzAsIm5hbWUiOiJKYW51U3BhY2UifQ.3X_xiB6Xa819CD2L226VlAaD-5ApAvpEaQLS4mkTV8w";
const client = new Web3Storage({ token });

async function listUploads () {
  
    for await (const upload of client.list()) {
      console.log(`${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`)
    }
  }


  listUploads ()