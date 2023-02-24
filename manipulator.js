const fs = require('fs');
const fsPromises = require('fs').promises;


async function addControlPad() {
    const data = await fsPromises.readFile('emulator.json')
                       .catch((err) => console.error('Failed to read file', err));

    let TVemulator = JSON.parse(data);
    const entries = Object.entries(TVemulator);

    console.log(entries)

    entries.forEach((screen) => {
        if (screen[1]?.back_button?.target && screen[1]?.control_pad) {
            screen[1].control_pad.left = screen[1].back_button.target
        } 
    })
    const fromEntries = Object.fromEntries(entries)

    // let toString = fromEntries.toString()
    let stringfyed = (JSON.stringify(fromEntries));

    fs.writeFileSync("test.json", stringfyed)
  }


async function getNames() {
    //open directory and add filenames in an array
    const fileNames = fs.readdirSync('./america_missing_ones/webp/');

    //open JSON and transform into an JS Object, then into an Array to loop
    const data = await fsPromises.readFile('emulator.json')
                       .catch((err) => console.error('Failed to read file', err));
    let TVemulator = JSON.parse(data);
    const entries = Object.entries(TVemulator);
    console.log(entries)

    //flatten the JSON to and array of names
    const flattened = []
    entries.forEach((item) => {
        flattened.push(item[0])
    })

    const addedScreens = []
    const repeatedScreens = []

    //compare the filenames array and the flattened JSON array, if the name doesnt exist, create a new item on JSON
    fileNames.forEach((name) => {
        if (!flattened.includes(name)) {
            entries.push([name, {"back_button":{},"buttons":[]}])
            addedScreens.push(name)
            console.log(`ADDED ${name}`);
          } else {
            repeatedScreens.push(name)
            console.log("====== NAME ALREADY EXISTS =======")
          }
    })

    //transform into JS object again and stringy again
    const fromEntries = Object.fromEntries(entries)
    let toString = fromEntries.toString()
    let stringfyed = (JSON.stringify(fromEntries));

    // ==================== CREATE THE FILES ============================
    //write JSON file 
    fs.writeFileSync("newEmulator.json", stringfyed)

    //list of added screens to .txt file to print later
    const addedToTxt = addedScreens.join(',');
    const addedLineBreak = addedToTxt.replace(/,/g, '\n');
    fs.writeFileSync("screensAdded.txt", addedLineBreak)

    //list of repeated screens to .txt file to print later
    const repeatedToTxt = repeatedScreens.join(',');
    const repeatedLineBreak = repeatedToTxt.replace(/,/g, '\n');
    fs.writeFileSync("screensRepeated.txt", repeatedLineBreak)
} 

// addControlPad()
getNames()
