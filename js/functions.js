function getPDF(url, fileName){

    if(url== undefined){
        return;
    }
    if (fileName == undefined){
        fileName = "PdfFile-" + new Date().getTime() + ".pdf";
    }

var req = new XMLHttpRequest();
        req.open("POST", url);
        req.responseType = "blob";
        req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {

        if (typeof window.navigator.msSaveBlob === 'function') {
          window.navigator.msSaveBlob(req.response, "PdfName-" + new Date().getTime() + ".pdf");
        } else {
          var blob = req.response;
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;

          // append the link to the document body

          document.body.appendChild(link);

          link.click();
        }
  }
};
req.send();
}
