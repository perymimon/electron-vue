const fsp = require("fs").promises;
import {remote} from 'electron'

const path = require('path');

const {BrowserWindow} = remote;

const defaultOptions = {outer: false};
const currentWindow = remote.getCurrentWindow();

export async function saveDOMtoHTML(DOM, savedPath, options = defaultOptions) {
    try {
        const template1 = `
            <head>
            <style>
                ${await fsp.readFile(path.resolve(__static, 'printStyle.css'))}
            </style>
            </head>
            <body>
                ${DOM.innerHTML}
            </body>
        `;
        return await fsp.writeFile(savedPath, template1, {encoding: 'utf8'})
    } catch (e) {
        console.log(e);
    }
}

export async function saveHTMLToPDF(htmlPath, PDFPath) {
    try {
        const win = new BrowserWindow({show: false});
        win.loadFile(htmlPath);

        win.webContents.on('did-finish-load', function () {
            win.webContents.printToPDF({
                landscape: false,
                marginsType: 0,
                printBackground: false,
                printSelectionOnly: false,
                pageSize: 'A4',
            }, async function (err, data) {
                if (err) throw err;
                return await fsp.writeFile(PDFPath, data);


            })

        });
    } catch (e) {
        console.log(e);
    }
}

export async function saveWebContentPDF(PDFPath) {
    try {
        currentWindow.webContents.printToPDF({
            landscape: false,
            marginsType: 0,
            printBackground: false,
            printSelectionOnly: false,
            pageSize: 'A4',
        }, async function (err, data) {
            if (err) throw err;
            return await fsp.writeFile(PDFPath, data);


        })

    } catch (e) {
        console.log(e);
    }
}


