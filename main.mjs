import * as netmask from "netmask"
import fs from "node:fs";
import util from "node:util";

import readline from "node:readline"

import child_process from "node:child_process";


let gateway = "172.24.1.1"
let metric = 497;
let interfaceIndex = 7;

//  https://github.com/gaoyifan/china-operator-ip/blob/ip-lists/china.txt
// https://nodejs.org/docs/latest-v18.x/api/readline.html#example-read-file-stream-line-by-line
async function processLineByLine() {
  const fileStream = fs.createReadStream('china.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // 注意：使用 crlfDelay 选项
  // 将 input.txt 中的所有 CR LF ('\r\n') 实例识别为单个换行符。

  let exec = child_process.exec;
  let execPromised = util.promisify(exec);

  try {
    execPromised(`route change 0.0.0.0 mask 128.0.0.0 192.168.48.1 METRIC 599`).catch(e => { console.log(e) })
    execPromised(`route change 128.0.0.0 mask 128.0.0.0 192.168.48.1 METRIC 599`).catch(e => { console.log(e) })
  } catch (error) {
    console.error(error)
  }


  let num = 0;
  let str = "@echo off \r\n";
  for await (const line of rl) {
    num += 1;
    console.log("当前行"+ num)
    // input.txt 中的每一行都将在此处作为 `line` 连续可用。
    // console.log(`Line from file: ${line}`);
    let block = new netmask.Netmask(line);
    // console.log(block.base,block.first, block.mask)
    try {

      // let r = await execPromised(`route add ${block.base} MASK ${block.mask} ${gateway} METRIC ${metric} IF ${interfaceIndex}`)
      let r = await execPromised(`route add ${block.base} MASK ${block.mask} ${gateway} METRIC ${metric}`)
      // let r = execPromised(`route delete ${block.base} ${gateway} `)
      console.log(r.stdout, r.stderr)

      // str += `route add ${block.base} MASK ${block.mask} ${gateway} METRIC ${metric} &  `
      // str += `route delete ${block.base} ${gateway}  &  `
      block = null
    } catch (error) {
      console.error(error)
    }

  }
  // str = str.substring(0, str.length - 3)
  // str += `\r\npause`
  // fs.writeFileSync('route.bat', str)
}

processLineByLine().then(r =>{
  process.exit(0);

}).catch(e =>{
  console.error(e)
}).finally(r =>{
});




// console.log(block)