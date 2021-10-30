const URL_BEGGINING = "https://www.ebay";
const URL_SECOND_PART = "/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw="
const URL_LAST_PART="&_sacat=0";
const COUNTRY_LOCATION="Country";
const EU_LOCATION="EU";
const WORLD_LOCATION="World";

document.getElementById('btn').onclick = function(){
    run(document.forms["ebayResearch"]);
}

document.addEventListener('keypress', (event) => {
    if (event.code == 'Enter'){
        run(document.forms["ebayResearch"]);
    }
})

document.getElementById('extension').onchange = function() {
    if (document.getElementById('extension').value == ".COM"){
        document.getElementById('location').selectedIndex = 0;
        document.getElementById('location').disabled = true;
    }
    else{
        document.getElementById('location').disabled = false;
    }
}

function createUrl(extension, researchKeywords, sold, location){
    url = URL_BEGGINING+extension+URL_SECOND_PART;
    url += keywordsToString(researchKeywords);
    url+=URL_LAST_PART;
    url += getSold(sold);
    url += getLocationRestriction(location);


    return url;
}

function keywordsToString(researchKeywords){
    var keywordsString ="";
    
    if (researchKeywords.length > 1){
        for (let index = 0; index < researchKeywords.length; index++) {
            keywordsString += researchKeywords[index];
            if (index != researchKeywords.length-1){
                keywordsString += "+"
            }
        }
    }else if (researchKeywords.length == 1){
        keywordsString += researchKeywords[0];
    }

    return keywordsString;
}

function getLocationRestriction(location){
    var countryRestrictionString = "";
    if (location == COUNTRY_LOCATION){
        countryRestrictionString+= "&rt=nc&LH_PrefLoc=1";
    }
    else if (location == EU_LOCATION){
        countryRestrictionString+= "&rt=nc&LH_PrefLoc=3";
    }
    else if (location == WORLD_LOCATION){
        countryRestrictionString+= "&rt=nc&LH_PrefLoc=2";
    }

    return countryRestrictionString;
}

function getSold(sold){
    var soldString =""
    if (sold){
        soldString += "&rt=nc&LH_Sold=1&LH_Complete=1";
    }

    return soldString;
}

function run(form){
    var keywords = form.elements["research"].value;
    var extension = form.elements["extension"].value;
    var location = form.elements["location"].value;
    var sold = form.elements["checkSold"].checked;

    var tabKeywords = keywords.split(" ");
    url = createUrl(extension, tabKeywords, sold, location);
    chrome.tabs.create({ url: url });
}
