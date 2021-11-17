const URL_BEGGINING = "https://www.ebay";
const URL_SECOND_PART = "/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw="
const URL_LAST_PART="&_sacat=0";
const COUNTRY_LOCATION="Country";
const EU_LOCATION="EU";
const WORLD_LOCATION="World";
const FORMNAMME="ebayResearch";
const ELEMEXTENSION="extension";
const ELEMLOCATION="location";
const ELEMRESEARCH="research";
const ELEMSOLD="checkSold";


document.getElementById('btn').onclick = function(){
    run(document.forms[FORMNAMME]);
}

document.addEventListener('keypress', (event) => {
    if (event.code == 'Enter'){
        run(document.forms[FORMNAMME]);
    }
})

document.getElementById(ELEMEXTENSION).onchange = function() {
    if (document.getElementById(ELEMEXTENSION).value == ".COM"){
        document.getElementById(ELEMLOCATION).selectedIndex = 0;
        document.getElementById(ELEMLOCATION).disabled = true;
    }
    else{
        document.getElementById(ELEMLOCATION).disabled = false;
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
    var keywords = form.elements[ELEMRESEARCH].value;
    var extension = form.elements[ELEMEXTENSION].value;
    var location = form.elements[ELEMLOCATION].value;
    var sold = form.elements[ELEMSOLD].checked;

    var tabKeywords = keywords.split(" ");
    url = createUrl(extension, tabKeywords, sold, location);
    chrome.tabs.create({ url: url });
}
