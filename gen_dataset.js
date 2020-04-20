#!/usr/bin/node

const { writeFile } = require("fs").promises;
const puppeteer = require('puppeteer');

const randomHTML = require('./random_generator');

const generate = async (lower, upper) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1080});

  for (let i = lower; i <= upper; i++) {
    await writeFile(`pages/page${i}.html`, randomHTML({maxHeight: 5}));

    await page.goto(`file://${process.cwd()}/pages/page${i}.html`);
    await page.screenshot({path: `imgs/img${i}.png`});
  }

  await browser.close();
}

generate(+process.argv[2], +process.argv[3]);

module.exports = generate;
//generate(0, 100);