// Maps ISO numeric country codes to Timeglass region IDs.
// Codes sourced from Natural Earth / world-atlas countries-110m dataset.

const REGION_MAPPING = {
  // Western Europe
  826: 'western-europe', // United Kingdom
  250: 'western-europe', // France
  276: 'western-europe', // Germany
  724: 'western-europe', // Spain
  620: 'western-europe', // Portugal
  380: 'western-europe', // Italy
  528: 'western-europe', // Netherlands
  56:  'western-europe', // Belgium
  756: 'western-europe', // Switzerland
  40:  'western-europe', // Austria
  578: 'western-europe', // Norway
  752: 'western-europe', // Sweden
  208: 'western-europe', // Denmark
  246: 'western-europe', // Finland
  372: 'western-europe', // Ireland
  442: 'western-europe', // Luxembourg
  352: 'western-europe', // Iceland
  300: 'western-europe', // Greece
  620: 'western-europe', // Portugal
  191: 'western-europe', // Croatia
  705: 'western-europe', // Slovenia
  703: 'western-europe', // Slovakia
  203: 'western-europe', // Czech Republic
  348: 'western-europe', // Hungary
  642: 'western-europe', // Romania
  100: 'western-europe', // Bulgaria
  688: 'western-europe', // Serbia
  70:  'western-europe', // Bosnia and Herzegovina
  807: 'western-europe', // North Macedonia
  499: 'western-europe', // Montenegro
  8:   'western-europe', // Albania
  792: 'western-europe', // Turkey (transcontinental, placed here)
  196: 'western-europe', // Cyprus

  // East Asia
  156: 'east-asia', // China
  392: 'east-asia', // Japan
  410: 'east-asia', // South Korea
  408: 'east-asia', // North Korea
  496: 'east-asia', // Mongolia
  158: 'east-asia', // Taiwan

  // Middle East & North Africa
  818: 'middle-east', // Egypt
  434: 'middle-east', // Libya
  788: 'middle-east', // Tunisia
  12:  'middle-east', // Algeria
  504: 'middle-east', // Morocco
  682: 'middle-east', // Saudi Arabia
  368: 'middle-east', // Iraq
  364: 'middle-east', // Iran
  760: 'middle-east', // Syria
  400: 'middle-east', // Jordan
  422: 'middle-east', // Lebanon
  376: 'middle-east', // Israel
  414: 'middle-east', // Kuwait
  784: 'middle-east', // United Arab Emirates
  634: 'middle-east', // Qatar
  48:  'middle-east', // Bahrain
  512: 'middle-east', // Oman
  887: 'middle-east', // Yemen
  275: 'middle-east', // Palestine
  729: 'middle-east', // Sudan
  706: 'middle-east', // Somalia
  262: 'middle-east', // Djibouti
  232: 'middle-east', // Eritrea
  32:  'middle-east', // Western Sahara (approximate)

  // Sub-Saharan Africa
  710: 'sub-saharan-africa', // South Africa
  566: 'sub-saharan-africa', // Nigeria
  404: 'sub-saharan-africa', // Kenya
  800: 'sub-saharan-africa', // Uganda
  834: 'sub-saharan-africa', // Tanzania
  508: 'sub-saharan-africa', // Mozambique
  450: 'sub-saharan-africa', // Madagascar
  288: 'sub-saharan-africa', // Ghana
  384: 'sub-saharan-africa', // Ivory Coast
  120: 'sub-saharan-africa', // Cameroon
  12:  'sub-saharan-africa', // (Algeria already mapped above)
  180: 'sub-saharan-africa', // DR Congo
  178: 'sub-saharan-africa', // Republic of Congo
  426: 'sub-saharan-africa', // Lesotho
  516: 'sub-saharan-africa', // Namibia
  72:  'sub-saharan-africa', // Botswana
  716: 'sub-saharan-africa', // Zimbabwe
  454: 'sub-saharan-africa', // Malawi
  894: 'sub-saharan-africa', // Zambia
  686: 'sub-saharan-africa', // Senegal
  466: 'sub-saharan-africa', // Mali
  854: 'sub-saharan-africa', // Burkina Faso
  562: 'sub-saharan-africa', // Niger
  148: 'sub-saharan-africa', // Chad
  140: 'sub-saharan-africa', // Central African Republic
  706: 'sub-saharan-africa', // Somalia
  232: 'sub-saharan-africa', // Eritrea
  231: 'sub-saharan-africa', // Ethiopia
  706: 'sub-saharan-africa', // Somalia
  646: 'sub-saharan-africa', // Rwanda
  108: 'sub-saharan-africa', // Burundi
  728: 'sub-saharan-africa', // South Sudan
  24:  'sub-saharan-africa', // Angola
  624: 'sub-saharan-africa', // Guinea-Bissau
  324: 'sub-saharan-africa', // Guinea
  694: 'sub-saharan-africa', // Sierra Leone
  430: 'sub-saharan-africa', // Liberia
  266: 'sub-saharan-africa', // Gabon
  226: 'sub-saharan-africa', // Equatorial Guinea
  678: 'sub-saharan-africa', // São Tomé and Príncipe
  132: 'sub-saharan-africa', // Cape Verde
  174: 'sub-saharan-africa', // Comoros
  480: 'sub-saharan-africa', // Mauritius
  690: 'sub-saharan-africa', // Seychelles
  204: 'sub-saharan-africa', // Benin
  768: 'sub-saharan-africa', // Togo
  288: 'sub-saharan-africa', // Ghana
  270: 'sub-saharan-africa', // Gambia
  478: 'sub-saharan-africa', // Mauritania
  174: 'sub-saharan-africa', // Comoros
  748: 'sub-saharan-africa', // Eswatini

  // South Asia
  356: 'south-asia', // India
  586: 'south-asia', // Pakistan
  50:  'south-asia', // Bangladesh
  144: 'south-asia', // Sri Lanka
  524: 'south-asia', // Nepal
  64:  'south-asia', // Bhutan
  462: 'south-asia', // Maldives
  4:   'south-asia', // Afghanistan

  // Russia
  643: 'russia', // Russia

  // Eastern Europe
  616: 'eastern-europe', // Poland
  804: 'eastern-europe', // Ukraine
  112: 'eastern-europe', // Belarus
  440: 'eastern-europe', // Lithuania
  428: 'eastern-europe', // Latvia
  233: 'eastern-europe', // Estonia
  498: 'eastern-europe', // Moldova

  // Central Asia
  398: 'central-asia', // Kazakhstan
  860: 'central-asia', // Uzbekistan
  417: 'central-asia', // Kyrgyzstan
  762: 'central-asia', // Tajikistan
  795: 'central-asia', // Turkmenistan
  31:  'central-asia', // Azerbaijan
  51:  'central-asia', // Armenia
  268: 'central-asia', // Georgia

  // Southeast Asia
  104: 'southeast-asia', // Myanmar
  764: 'southeast-asia', // Thailand
  704: 'southeast-asia', // Vietnam
  116: 'southeast-asia', // Cambodia
  418: 'southeast-asia', // Laos
  458: 'southeast-asia', // Malaysia
  360: 'southeast-asia', // Indonesia
  608: 'southeast-asia', // Philippines
  702: 'southeast-asia', // Singapore
  96:  'southeast-asia', // Brunei
  626: 'southeast-asia', // Timor-Leste

  // Oceania
  36:  'oceania', // Australia
  554: 'oceania', // New Zealand
  242: 'oceania', // Fiji
  598: 'oceania', // Papua New Guinea
  90:  'oceania', // Solomon Islands
  548: 'oceania', // Vanuatu
  882: 'oceania', // Samoa
  776: 'oceania', // Tonga
  585: 'oceania', // Palau
  583: 'oceania', // Micronesia
  584: 'oceania', // Marshall Islands

  // North America
  840: 'north-america', // United States
  124: 'north-america', // Canada
  304: 'north-america', // Greenland

  // Latin America
  484: 'latin-america', // Mexico
  320: 'latin-america', // Guatemala
  340: 'latin-america', // Honduras
  222: 'latin-america', // El Salvador
  558: 'latin-america', // Nicaragua
  188: 'latin-america', // Costa Rica
  591: 'latin-america', // Panama
  192: 'latin-america', // Cuba
  332: 'latin-america', // Haiti
  214: 'latin-america', // Dominican Republic
  388: 'latin-america', // Jamaica
  76:  'latin-america', // Brazil
  32:  'latin-america', // Argentina
  152: 'latin-america', // Chile
  604: 'latin-america', // Peru
  170: 'latin-america', // Colombia
  862: 'latin-america', // Venezuela
  218: 'latin-america', // Ecuador
  68:  'latin-america', // Bolivia
  600: 'latin-america', // Paraguay
  858: 'latin-america', // Uruguay
  328: 'latin-america', // Guyana
  740: 'latin-america', // Suriname
  254: 'latin-america', // French Guiana
  630: 'latin-america', // Puerto Rico
  44:  'latin-america', // Bahamas
  52:  'latin-america', // Barbados
  84:  'latin-america', // Belize
  659: 'latin-america', // Saint Kitts and Nevis
  662: 'latin-america', // Saint Lucia
  670: 'latin-america', // Saint Vincent and the Grenadines
  308: 'latin-america', // Grenada
  28:  'latin-america', // Antigua and Barbuda
  212: 'latin-america', // Dominica
  780: 'latin-america', // Trinidad and Tobago
};

export default REGION_MAPPING;
