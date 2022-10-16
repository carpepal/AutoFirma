import { PDFDocument } from "pdf-lib";
import  JSZip  from "jszip";

export const sign = async ( signFile : File , fileList : FileList)=>{
    if(fileList == null || signFile == null){
        console.log("No files selected");
        return;
    }
    if(fileList.length == 0){
        console.log("No files selected");
        return;
    }

    const zip = JSZip();
    for (const file of fileList) {
         const pdf = await PDFDocument.load(await file.arrayBuffer());
         const pages = pdf.getPages();
         const pngImage = await pdf.embedPng(await signFile.arrayBuffer());
         const pngAspectRatio = pngImage.width / pngImage.height;
         console.log("pngAspectRatio:", pngAspectRatio);
         
         if(pages.length == 1){
                const { width, height } = pages[0].getSize();
                pages[0].drawImage(pngImage, {
                    x: width - 200,
                    y: height - (200 / pngAspectRatio),
                    width: 200,
                    height: 200 / pngAspectRatio,
                });
         }
         if(pages.length > 1){
                const lastPage = pages[pages.length - 1];
                const { width, height } = lastPage.getSize();
                lastPage.drawImage(pngImage, {
                    x: 450 - 200,
                    y: 550 - (200 / pngAspectRatio),
                    width: 200,
                    height: 200 / pngAspectRatio,
                });
         }
            const pdfBytes = await pdf.save();
            zip.file(file.name, pdfBytes);

    }

    zip.generateAsync({type:"blob"}).then(zip=>{
        const url = URL.createObjectURL(zip);
        window.open(url , "_blank");
    })
    
}