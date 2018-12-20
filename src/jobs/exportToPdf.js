const os = require('os');
const ipc = electron();
import { app, BrowserWindow, ipcMain , shell } from 'electron'

//to just open the browser in background
const window_to_PDF = new BrowserWindow({show : false});
//give the file link you want to display
window_to_PDF.loadURL('anylink.html');

const fsp = require("fs").promises;

function pdfSettings() {
    var paperSizeArray = ["A4", "A5"];

    var option = {
        landscape: false,
        marginsType: 0,
        printBackground: false,
        printSelectionOnly: false,
        pageSize: paperSizeArray[settingCache.getPrintPaperSize()-1],
    };
    return option;
}
window_to_PDF.webContents.printToPDF(pdfSettings(), async function(err, data) {
    if (err) {
        //do whatever you want
        return;
    }
    try{
        await fsp.writeFile('./generated_pdf.pdf', data);
    }catch(err){
        //unable to save pdf..
    }

})
