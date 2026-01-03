/**
 * County Search Utility
 * Maps cities to their county real estate websites
 */

export interface CountySearchResult {
  city: string;
  urls: string[];
  found: boolean;
}

/**
 * Opens the county real estate website(s) for a given city
 * @param city - The city name to search for
 * @returns CountySearchResult with the URLs opened
 */
export function setCounty(city: string): CountySearchResult {
  console.log('Searching county site for:', city);

  const urls: string[] = [];
  let found = true;

  switch (city) {
    // RDU Area - Wake County
    case "Raleigh":
    case "Cary":
    case "Apex":
    case "Fuquay-Varina":
    case "Fuquay Varina":
    case "Garner":
    case "Knightdale":
    case "Wake Forest":
    case "Morrisville":
    case "Holly Springs":
    case "Wendell":
      urls.push("https://services.wakegov.com/realestate/");
      break;

    case "Clayton":
    case "Smithfield":
      urls.push("https://www.johnstonnc.com/tax2/");
      break;

    // Greenville County, SC
    case "Greenville":
    case "Mauldin":
    case "Greer":
    case "Simpsonville":
    case "Travelers Rest":
      urls.push("https://www.greenvillecounty.org/appsAS400/RealProperty/");
      break;

    case "Spartanburg":
      urls.push("https://qpublic.schneidercorp.com/Application.aspx?App=SpartanburgCountySC&Layer=Parcels&PageType=Search");
      break;

    // Towns spanning Anderson and Greenville counties
    case "Piedmont":
    case "Williamston":
    case "Pelzer":
    case "Powdersville":
      urls.push("https://acpass.andersoncountysc.org/real_prop_search.htm");
      urls.push("https://www.greenvillecounty.org/appsAS400/RealProperty/");
      break;

    case "Easley":
    case "Clemson":
      urls.push("https://qpublic.schneidercorp.com/Application.aspx?AppID=927&LayerID=18058&PageTypeID=2&PageID=8075");
      break;

    // York County, SC
    case "Rock Hill":
    case "York":
    case "Fort Mill":
    case "Tega Cay":
    case "Indian Land":
    case "Clover":
    case "Hickory Grove":
    case "Lake Wylie":
    case "McConnells":
    case "Sharon":
      urls.push("https://experience.arcgis.com/experience/e827d330f20a4508aa6777bf2c0b94e3/page/Address-Search/#data_s=id%3AdataSource_2-Parcels_5039~dataSource_11-18220f7f386-layer-86-182abbc3d1c-layer-44%3A118");
      break;

    case "Chapel Hill":
      urls.push("https://property.spatialest.com/nc/orange/#/");
      break;

    case "Durham":
      urls.push("https://property.spatialest.com/nc/durham/#/");
      break;

    // New Hanover County, NC
    case "Wilmington":
    case "Castle Hayne":
    case "Carolina Beach":
    case "Kure Beach":
      urls.push("https://etax.nhcgov.com/pt/search/commonsearch.aspx?mode=address");
      break;

    case "Burgaw":
    case "Hampstead":
      urls.push("https://mss.pendercountync.gov/css/citizens/RealEstate/Default.aspx?mode=new");
      break;

    case "Leland":
    case "Navassa":
    case "Winnabow":
      urls.push("https://tax.brunsco.net/itsnet/RealEstate.aspx");
      break;

    // Mecklenburg County, NC
    case "Charlotte":
    case "Huntersville":
    case "Matthews":
    case "Mint Hill":
    case "Cornelius":
      urls.push("https://property.spatialest.com/nc/mecklenburg#/");
      break;

    case "Belmont":
    case "Gastonia":
    case "Mount Holly":
      urls.push("https://gastonnc.devnetwedge.com/");
      break;

    case "Locust":
    case "King":
      urls.push("https://www.stanlytax.com/taxes.html#/WildfireSearch");
      break;

    case "Concord":
      urls.push("https://tax.cabarruscounty.us/TaxBill.aspx");
      break;

    case "Indian Trail":
    case "Waxhaw":
      urls.push("https://unionnc.devnetwedge.com/");
      break;

    case "Fayetteville":
      urls.push("https://taxpwa.co.cumberland.nc.us/camapwa/");
      break;

    case "Lexington":
      urls.push("http://www2.co.davidson.nc.us/taxnet/RealEstate.aspx");
      break;

    case "Archdale":
      urls.push("http://txpwa.co.randolph.nc.us/camapwa/");
      break;

    // Forsyth County, NC
    case "Clemmons":
    case "Pfafftown":
    case "Winston-Salem":
    case "Winston Salem":
      urls.push("https://lrcpwa.ncptscloud.com/forsyth/");
      break;

    // Guilford County, NC
    case "Greensboro":
    case "High Point":
    case "Jamestown":
      urls.push("https://taxcama.guilfordcountync.gov/camapwa/searchProperty.aspx");
      break;

    // Davie County, NC
    case "Mocksville":
    case "Bermuda Run":
    case "Cooleemee":
    case "Advance":
      urls.push("https://maps.daviecountync.gov/itsnet/RealEstate.aspx");
      break;

    default:
      console.log('No match for county');
      found = false;
  }

  // Open all URLs in new tabs
  urls.forEach(url => {
    window.open(url, '_blank');
  });

  return {
    city,
    urls,
    found
  };
}

/**
 * Get all supported cities
 * @returns Array of city names
 */
export function getSupportedCities(): string[] {
  return [
    // Wake County
    "Raleigh", "Cary", "Apex", "Fuquay-Varina", "Garner", "Knightdale",
    "Wake Forest", "Morrisville", "Holly Springs", "Wendell",
    // Johnston County
    "Clayton", "Smithfield",
    // Greenville County, SC
    "Greenville", "Mauldin", "Greer", "Simpsonville", "Travelers Rest",
    // Spartanburg County, SC
    "Spartanburg",
    // Anderson/Greenville Counties, SC
    "Piedmont", "Williamston", "Pelzer", "Powdersville",
    // Pickens County, SC
    "Easley", "Clemson",
    // York County, SC
    "Rock Hill", "York", "Fort Mill", "Tega Cay", "Indian Land", "Clover",
    "Hickory Grove", "Lake Wylie", "McConnells", "Sharon",
    // Orange County, NC
    "Chapel Hill",
    // Durham County, NC
    "Durham",
    // New Hanover County, NC
    "Wilmington", "Castle Hayne", "Carolina Beach", "Kure Beach",
    // Pender County, NC
    "Burgaw", "Hampstead",
    // Brunswick County, NC
    "Leland", "Navassa", "Winnabow",
    // Mecklenburg County, NC
    "Charlotte", "Huntersville", "Matthews", "Mint Hill", "Cornelius",
    // Gaston County, NC
    "Belmont", "Gastonia", "Mount Holly",
    // Stanly County, NC
    "Locust", "King",
    // Cabarrus County, NC
    "Concord",
    // Union County, NC
    "Indian Trail", "Waxhaw",
    // Cumberland County, NC
    "Fayetteville",
    // Davidson County, NC
    "Lexington",
    // Randolph County, NC
    "Archdale",
    // Forsyth County, NC
    "Clemmons", "Pfafftown", "Winston-Salem",
    // Guilford County, NC
    "Greensboro", "High Point", "Jamestown",
    // Davie County, NC
    "Mocksville", "Bermuda Run", "Cooleemee", "Advance"
  ];
}
