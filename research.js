document.getElementById('btn').onclick = function(){
    var keywords = document.getElementById('research').value;
    var extension = document.getElementById('extension').value;
    var sold = document.querySelector('#sold').checked;

    var tabKeywords = keywords.split(" ");
    url = createUrl(extension, tabKeywords, sold);
    chrome.tabs.create({ url: url });
}

function createUrl(extension, researchKeywords, sold){
    urlBeggining = "https://www.ebay.";
    urlSecondPart = "/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw="
    urlLastPart = "&_sacat=0";
    url = urlBeggining+extension+urlSecondPart;
    if (researchKeywords.length > 1){
        for (let index = 0; index < researchKeywords.length; index++) {
            url += researchKeywords[index];
            if (index != researchKeywords.length-1){
                url += "+"
            }
        }
    }else if (researchKeywords.length == 1){
        url += researchKeywords[0];
    }

    if (sold){
        url += "&rt=nc&LH_Sold=1&LH_Complete=1";
    }
    return url;
    //https://www.ebay.fr/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=gyarados+130&_sacat=0
}
