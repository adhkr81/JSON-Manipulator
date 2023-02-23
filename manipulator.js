'use strict';

const fs = require('fs');
const fsPromises = require('fs').promises;


async function read() {
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


read()
