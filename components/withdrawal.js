import { db, doc, collection, addDoc, setDoc } from '../src/header.js';
import { Link } from '../src/auth.js';

const banks = [
 "",
 "AL-Barakah Microfinance Bank",
 "3Line Card Management Limited",
 "9 Payment Service Bank",
 "AB Microfinance Bank",
 "ABU Microfinance Bank",
 "AG Mortgage Bank",
 "ALTERNATIVE BANK LIMITED",
 "AMJU Unique Microfinance Bank",
 "AMML MFB",
 "AMOYE MICROFINANCE BANK",
 "ASOSavings & Loans",
 "AVE MARIA MICROFINANCE BANK LTD",
 "Aaa Finance",
 "Abbey Mortgage Bank",
 "Above Only Microfinance Bank",
 "Abucoop Microfinance Bank",
 "Abulesoro Microfinance Bank Ltd",
 "Accelerex Network",
 "Access Bank",
 "AccessMobile",
 "Accion Microfinance Bank",
 "Ada Microfinance Bank",
 "Addosser Microfinance Bank",
 "Adeyemi College Staff Microfinance Bank",
 "Afekhafe Microfinance Bank",
 "Afemai Microfinance Bank",
 "Agosasa Microfinance Bank",
 "Akpo Microfinance Bank",
 "Aku Microfinance Bank",
 "Akuchukwu Microfinance Bank Ltd",
 "Akwa Savings & Loans Limited",
 "Al-Hayat Microfinance Bank",
 "Alekun Microfinance Bank",
 "Alert Microfinance Bank",
 "Allworkers Microfinance Bank",
 "Ally Microfinance Bank",
 "Alpha Kapital Microfinance Bank",
 "Alvana Microfinance Bank",
 "Amac Microfinance Bank",
 "Anchorage Microfinance Bank",
 "Aniocha Microfinance Bank",
 "Apeks Microfinance Bank",
 "Apple Microfinance Bank",
 "Aramoko Microfinance Bank",
 "Arca Payments",
 "Arise Microfinance Bank",
 "Aspire Microfinance Bank Ltd",
 "Assets Matrix Microfinance Bank",
 "Assets Microfinance Bank",
 "Astrapolaris Microfinance Bank",
 "Atbu Microfinance Bank",
 "Auchi Microfinance Bank",
 "Avuenegbe Microfinance Bank",
 "Aztec Microfinance Bank",
 "BANC CORP MICROFINANCE BANK",
 "BC Kash Microfinance Bank",
 "BRIDGEWAY MICROFINANCE BANK",
 "Baines Credit Microfinance Bank",
 "Balera Microfinance Bank Ltd",
 "Balogun Fulani Microfinance Bank",
 "Balogun Gambari Microfinance Bank",
 "Banex Microfinance Bank",
 "Bankly Microfinance Bank",
 "Baobab Microfinance Bank",
 "Bayero Microfinance Bank",
 "Benysta Microfinance Bank",
 "Beststar Microfinance Bank",
 "Beta-Access Yello",
 "Bipc Microfinance Bank",
 "Bishopgate Microfinance Bank",
 "Blue Investments Microfinance Bank",
 "Bluewhales Microfinance Bank",
 "Boctrust Microfinance Bank",
 "Boi Mf Bank",
 "Boji Boji Microfinance Bank",
 "Bonghe Microfinance Bank",
 "Borgu Microfinance Bank",
 "Borno Renaissance Microfinance Bank",
 "Boromu Microfinance Bank",
 "Borstal Microfinance Bank",
 "Bosak Microfinance Bank",
 "Bowen Microfinance Bank",
 "Branch International Financial Services",
 "Brent Mortgage Bank",
 "Brethren Microfinance Bank",
 "Brightway Microfinance Bank",
 "Broadview Microfinance Bank Ltd",
 "Bubayero Microfinance Bank",
 "Bud Infrastructure Limited",
 "Business Support Microfinance Bank",
 "CASHRITE MICROFINANCE BANK",
 "CBN_TSA",
 "CEMCS Microfinance Bank",
 "CIT Microfinance Bank",
 "Calabar Microfinance Bank",
 "Capitalmetriq Swift Microfinance Bank",
 "Capricorn Digital",
 "Capstone Mf Bank",
 "Carbon",
 "Caretaker Microfinance Bank",
 "Cashconnect Microfinance Bank",
 "Catland Microfinance Bank",
 "Cedar Microfinance Bank Ltd",
 "Cellulant",
 "Cellulant Pssp",
 "Central Bank Of Nigeria",
 "ChamsMobile",
 "Chanelle Bank",
 "Chase Microfinance Bank",
 "Cherish Microfinance Bank",
 "Chibueze Microfinance Bank",
 "Chikum Microfinance Bank",
 "Chukwunenye Microfinance Bank",
 "Citi Bank",
 "Citizen Trust Microfinance Bank Ltd",
 "Cloverleaf Microfinance Bank",
 "Coalcamp Microfinance Bank",
 "Coastline Microfinance Bank",
 "Confidence Microfinance Bank Ltd",
 "Consistent Trust Microfinance Bank Ltd",
 "Consumer Microfinance Bank",
 "Contec Global Infotech Limited (NowNow)",
 "Coop Mortgage Bank",
 "Corestep Microfinance Bank",
 "Coronation Merchant Bank",
 "County Finance Ltd",
 "Covenant Microfinance Bank",
 "Credit Afrique Microfinance Bank",
 "Creditville Microfinance Bank",
 "Crescent Microfinance Bank",
 "Crossriver Microfinance Bank",
 "Crowdforce",
 "Crutech Microfinance Bank",
 "Cyberspace Limited",
 "DOT MICROFINANCE BANK",
 "Davodani Microfinance Bank",
 "Daylight Microfinance Bank",
 "Delta Trust Mortgage Bank",
 "Dignity Finance", "ENaira",
 "Eagle Flight Microfinance Bank",
 "Eartholeum",
 "Ebsu Microfinance Bank",
 "EcoBank PLC", "EcoMobile",
 "Ecobank Xpress Account",
 "Edfin Microfinance Bank",
 "Egwafin Microfinance Bank Ltd",
 "Ek-Reliable Microfinance Bank",
 "Ekimogun Microfinance Bank",
 "Ekondo MFB",
 "Emeralds Microfinance Bank",
 "Empire trust MFB", "Enco Finance",
 "Enrich Microfinance Bank",
 "Enterprise Bank",
 "Esan Microfinance Bank",
 "Eso-E Microfinance Bank",
 "Evangel Microfinance Bank",
 "Evergreen Microfinance Bank",
 "Ewt Microfinance Bank",
 "Excellent Microfinance Bank",
 "Eyowo MFB", "FAST CREDIT",
 "FAST Microfinance Bank",
 "FBN Mortgages Limited", "FBNMobile",
 "FBNQUEST Merchant Bank",
 "FCMB Easy Account",
 "FEDETH MICROFINANCE BANK", "FET",
 "FFS Microfinance Bank",
 "FINATRUST MICROFINANCE BANK",
 "FLOURISH MFB", "FSDH Merchant Bank",
 "FUNDQUEST FINANCIAL SERVICES LTD",
 "Fairmoney Microfinance Bank Ltd",
 "Fame Microfinance Bank",
 "Fcmb Microfinance Bank",
 "Fct Microfinance Bank",
 "Federal Polytechnic Nekede Microfinance Bank",
 "Federal University Dutse Microfinance Bank",
 "Federalpoly Nasarawa mfb",
 "Fewchore Finance Company Limited",
 "Fha Mortgage Bank Ltd",
 "Fidelity Bank", "Fidelity Mobile",
 "Fidfund Microfinance Bank",
 "Fims Microfinance Bank",
 "Finca Microfinance Bank",
 "Firmus MFB", "First Apple Limited",
 "First Bank PLC",
 "First City Monument Bank",
 "First Generation Mortgage Bank",
 "First Heritage Microfinance Bank",
 "First Multiple Microfinance Bank",
 "First Option Microfinance Bank",
 "First Royal Microfinance Bank",
 "Firstmidas Microfinance Bank Ltd",
 "Flutterwave Technology Solutions Limited",
 "Foresight Microfinance Bank",
 "Fortis Microfinance Bank",
 "FortisMobile",
 "Fortress Microfinance Bank",
 "Fullrange Microfinance Bank",
 "Futminna Microfinance Bank",
 "Futo Microfinance Bank",
 "GIDAUNIYAR ALHERI MICROFINANCE BANK",
 "GOLDMAN MICROFINANCE BANK",
 "GOMBE MICROFINANCE BANK LTD",
 "GOODNEWS MFB", "GTMobile",
 "Gabsyn Microfinance Bank",
 "Garki Microfinance Bank",
 "Gashua Microfinance Bank",
 "Gateway Mortgage Bank",
 "Gbede Microfinance Bank",
 "Giant Stride Microfinance Bank",
 "Giginya Microfinance Bank",
 "Girei Microfinance Bank",
 "Giwa Microfinance Bank",
 "Globus Bank",
 "Glory Microfinance Bank",
 "Gmb Microfinance Bank", "GoMoney",
 "Good Neighbours Microfinance Bank",
 "Gowans Microfinance Bank",
 "Grant MF Bank",
 "Green Energy Microfinance Bank Ltd",
 "GreenBank Microfinance Bank",
 "Greenacres MFB",
 "Greenville Microfinance Bank",
 "Greenwich Merchant Bank",
 "Grooming Microfinance Bank",
 "Gti Microfinance Bank",
 "Guaranty Trust Bank",
 "Gwong Microfinance Bank",
 "Hackman Microfinance Bank",
 "Haggai Mortgage Bank Limited",
 "Halacredit Microfinance Bank",
 "Hasal Microfinance Bank",
 "Headway Microfinance Bank",
 "Hedonmark", "Heritage Bank",
 "HighStreet Microfinance Bank",
 "Highland Microfinance Bank",
 "Homebase Mortgage", "Hopepsb",
 "IBA MFB", "IBILE Microfinance Bank",
 "IRL Microfinance Bank",
 "ISLAND MICROFINANCE BANK",
 "Ibeto Microfinance Bank",
 "Ibolo Micorfinance Bank Ltd",
 "Ibom Fadama Microfinance Bank",
 "Ibu-Aje Microfinance",
 "Ic Globalmicrofinance Bank",
 "Ijebu-Ife Microfinance Bank Ltd",
 "Ikenne Microfinance Bank",
 "Ikire Microfinance Bank",
 "Ikoyi-Osun Microfinance Bank",
 "Ilaro Poly Microfinance Bank Ltd",
 "Ilasan Microfinance Bank",
 "Illorin Microfinance Bank",
 "Ilora Microfinance Bank",
 "Imo State Microfinance Bank",
 "Imowo Microfinance Bank",
 "Imperial Homes Mortgage Bank",
 "Infinity Microfinance Bank",
 "Infinity Trust Mortgage Bank",
 "Innovectives Kesh",
 "Insight Microfinance Bank",
 "Intellifin",
 "Interland Microfinance Bank",
 "Interswitch Financial Inclusion Services (Ifis)",
 "Interswitch Limited",
 "Iperu Microfinance Bank",
 "Isaleoyo Microfinance Bank",
 "Ishie Microfinance Bank",
 "Island MFB",
 "Isuofia Microfinance Bank",
 "Itex Integrated Services Limited",
 "Iwade Microfinance Bank Ltd",
 "Iwoama Microfinance Bank",
 "Iyamoye Microfinance Bank Ltd",
 "Iyeru Okin Microfinance Bank Ltd",
 "Iyin Ekiti MFB",
 "Izon Microfinance Bank",
 "Jaiz Bank",
 "Jessefield Microfinance Bank",
 "Jubilee-Life Mortgage Bank",
 "KANO POLY MFB",
 "KCMB Microfinance Bank",
 "KENECHUKWU MICROFINANCE BANK",
 "KKU Microfinance Bank",
 "KOLOMONI MICROFINANCE BANK",
 "Kadick Integration Limited",
 "Kadpoly Microfinance Bank",
 "Kayvee Microfinance Bank",
 "Kc Microfinance Bank",
 "Kegow(Chamsmobile)",
 "Keystone Bank",
 "Kingdom College Microfinance Bank",
 "Kontagora Microfinance Bank",
 "Koraypay",
 "Kredi Money Microfinance Bank",
 "Kuda", "Kwasu Mf Bank",
 "La Fayette Microfinance Bank",
 "Lagos Building Investment Company",
 "Landgold Microfinance Bank",
 "Lapo Microfinance Bank",
 "Lavender Microfinance Bank",
 "Leadremit Limited",
 "Legend Microfinance Bank",
 "Letshego MFB",
 "Lifegate Microfinance Bank Ltd",
 "Light Microfinance Bank",
 "Links Microfinance Bank",
 "Lobrem Microfinance Bank",
 "Lotus Bank",
 "Lovonus Microfinance Bank",
 "M36", "MAUTECH Microfinance Bank",
 "MICHAEL OKPARA UNIAGRIC MICROFINANCE BANK",
 "MKOBO MICROFINANCE BANK LTD",
 "Mab Allianz MFB", "Macrod MFB",
 "Mainland Microfinance Bank",
 "Mainstreet Microfinance Bank",
 "Maintrust Microfinance Bank",
 "Malachy Microfinance Bank",
 "Manny Microfinance bank",
 "Maritime Microfinance Bank",
 "Mayfair Microfinance Bank", "Mayfresh Mortgage Bank",
 "Medef Microfinance Bank",
 "Megapraise Microfinance Bank",
 "Memphis Microfinance Bank",
 "Mercury MFB",
 "Meridian Microfinance Bank",
 "Mgbidi Microfinance Bank",
 "Microbiz Microfinance Bank",
 "Microsystems Investment And Development Limited",
 "Microvis Microfinance Bank",
 "Midland Microfinance Bank",
 "Mint-Finex MICROFINANCE BANK",
 "Mkudi", "Molusi Microfinance Bank",
 "Momo Psb",
 "Monarch Microfinance Bank",
 "Money Master Psb",
 "Money Trust Microfinance Bank",
 "MoneyBox",
 "Moniepoint Microfinance Bank",
 "Moyofade Mf Bank",
 "Mozfin Microfinance Bank",
 "Mutual Benefits Microfinance Bank",
 "Mutual Trust Microfinance Bank",
 "NIP Virtual Bank",
 "NIRSAL Microfinance Bank",
 "NPF MicroFinance Bank",
 "Nagarta Microfinance Bank",
 "Nasarawa Microfinance Bank",
 "Navy Microfinance Bank",
 "Ndiorah Microfinance Bank",
 "Neptune Microfinance Bank",
 "Netapps Technology Limited",
 "New Dawn Microfinance Bank",
 "New Golden Pastures Microfinance Bank",
 "New Prudential Bank",
 "Newedge Finance Ltd",
 "Nibssussd Payments",
 "Nice Microfinance Bank",
 "Nigeria Prisonsmicrofinance Bank",
 "Nkpolu-Ust Microfinance",
 "Nomba Financial Services Limited",
 "Nova Merchant Bank",
 "Nsuk Microfinance Bank",
 "Numo Microfinance Bank",
 "Nuture Microfinance Bank",
 "Nwannegadi Microfinance Bank",
 "Oakland Microfinance Bank",
 "Oau Microfinance Bank Ltd",
 "Oche Microfinance Bank",
 "Octopus Microfinance Bank Ltd",
 "Ohafia Microfinance Bank",
 "Ojokoro Microfinance Bank",
 "Oke-Aro Oredegbe Microfinance Bank Ltd",
 "Okpoga Microfinance Bank",
 "Okuku Microfinance Bank Ltd",
 "Olabisi Onabanjo University Microfinance Bank",
 "Olofin Owena Microfinance Bank",
 "Olowolagba Microfinance Bank",
 "Oluchukwu Microfinance Bank",
 "Oluyole Microfinance Bank",
 "Omiye Microfinance Bank",
 "Omoluabi savings and loans",
 "One Finance", "Opay",
 "Optimus Bank",
 "Oraukwu Microfinance Bank",
 "Orisun MFB",
 "Orokam Microfinance Bank Ltd",
 "Oscotech Microfinance Bank",
 "Ospoly Microfinance Bank",
 "Otech Microfinance Bank Ltd",
 "Otuo Microfinance Bank Ltd", "PALMPAY", "PAYSTACK-TITAN",
 "PYRAMID MICROFINANCE BANK", "Paga",
 "Page Financials",
 "Palmcoast Microfinance Bank",
 "Parallex Bank", "Parkway Mf Bank",
 "Parkway-ReadyCash",
 "Parralex Microfinance bank",
 "PatrickGold Microfinance Bank",
 "PayAttitude Online", "Paycom",
 "Paystack Payments Limited",
 "Peace Microfinance Bank",
 "PecanTrust Microfinance Bank",
 "Peniel Micorfinance Bank Ltd",
 "Pennywise Microfinance Bank",
 "Personal Trust Microfinance Bank",
 "Petra Microfinance Bank",
 "Pillar Microfinance Bank",
 "Platinum Mortgage Bank",
 "Polaris bank",
 "Polyibadan Microfinance Bank",
 "Polyuwanna Microfinance Bank",
 "Preeminent Microfinance Bank",
 "PremiumTrust Bank",
 "Prestige Microfinance Bank",
 "Prisco Microfinance Bank",
 "Pristine Divitis Microfinance Bank",
 "Projects Microfinance Bank",
 "ProvidusBank PLC",
 "Purplemoney Microfinance Bank",
 "Qr Payments",
 "Qube Microfinance Bank Ltd",
 "Quickfund Microfinance Bank",
 "RAYYAN Microfinance Bank",
 "Radalpha Microfinance Bank",
 "Rahama Microfinance Bank",
 "Rand merchant Bank",
 "Refuge Mortgage Bank",
 "Regent Microfinance Bank",
 "Rehoboth Microfinance Bank",
 "Reliance Microfinance Bank",
 "RenMoney Microfinance Bank",
 "Rephidim Microfinance Bank",
 "Resident Fintech Limited",
 "Richway Microfinance Bank",
 "Rigo Microfinance Bank",
 "Rima Growth Pathway Microfinance Bank",
 "Rima Microfinance Bank",
 "Rockshield Microfinance Bank",
 "Royal Exchange Microfinance Bank",
 "Rubies Microfinance Bank",
 "SIGNATURE BANK",
 "SIMPLE FINANCE LIMITED",
 "STATESIDE MFB", "Safe Haven MFB",
 "SafeTrust",
 "Safegate Microfinance Bank",
 "Sagamu Microfinance Bank",
 "Sagegrey Finance Limited",
 "Seap Microfinance Bank",
 "Seed Capital Microfinance Bank",
 "Seedvest Microfinance Bank",
 "Shalom Microfinance Bank",
 "Shepherd Trust Microfinance Bank",
 "Shield Microfinance Bank Ltd",
 "Shongom Microfinance Bank Ltd",
 "Sls Mf Bank",
 "Smartcash Payment Service Bank",
 "Snow Microfinance Bank",
 "Solid Allianze Microfinance Bank",
 "Solidrock Microfinance Bank",
 "Sparkle", "Spay Business",
 "Spectrum Microfinance Bank",
 "Stanbic IBTC @ease wallet",
 "Stanbic IBTC Bank",
 "Standard Chaterted bank PLC",
 "Standard Microfinance Bank",
 "Stanford Microfinance Bak",
 "Stb Mortgage Bank",
 "Stellas Microfinance Bank",
 "Sterling Bank PLC",
 "Stockcorp Microfinance Bank",
 "Sulsap Microfinance Bank",
 "Sunbeam Microfinance Bank",
 "Suntrust Bank", "Support Mf Bank",
 "Supreme Microfinance Bank Ltd",
 "TANADI MFB (CRUST)",
 "TASUED MICROFINANCE BANK LTD",
 "TCF MFB",
 "TRINITY FINANCIAL SERVICES LIMITED",
 "TagPay", "Taj Bank Limited",
 "Tajwallet", "Tangerine Bank",
 "TeamApt", "TeasyMobile",
 "Tekla Finance Ltd", "Tf Microfinance Bank",
 "Thrive Microfinance Bank",
 "Titan Trust Bank",
 "Total Trust Microfinance Bank",
 "Trident Microfinance Bank",
 "Triple A Microfinance Bank",
 "Trust Microfinance Bank",
 "Trustbond Mortgage Bank",
 "Trustfund Microfinance Bank",
 "U And C Microfinance Bank",
 "UNN MFB", "Uda Microfinance Bank",
 "Uhuru Microfinance Bank",
 "Ummah Microfinance Bank",
 "Umuchinemere Procredit Microfinance Bank",
 "Umunnachi Microfinance Bank",
 "Unaab Microfinance Bank",
 "Uniben Microfinance Bank",
 "Unical Microfinance Bank",
 "Uniibadan Microfinance Bank",
 "Unilag Microfinance Bank",
 "Unilorin Microfinance Bank",
 "Unimaid Microfinance Bank",
 "Union Bank PLC",
 "United Bank for Africa",
 "Unity Bank PLC",
 "Uniuyo Microfinance Bank",
 "Uzondu Mf Bank",
 "VALE FINANCE LIMITED",
 "VFD Micro Finance Bank",
 "VTNetworks", "Vas2Nets Limited",
 "Venture Garden Nigeria Limited",
 "Verdant Microfinance Bank",
 "Verite Microfinance Bank",
 "Virtue Microfinance Bank",
 "Visa Microfinance Bank",
 "WAYA MICROFINANCE BANK LTD",
 "Waya Microfinance Bank",
 "Wema Bank PLC",
 "Wetland Microfinance Bank",
 "Winview Bank", "Woven Finance",
 "Xpress Payments",
 "Xslnce Microfinance Bank",
 "Yct Microfinance Bank",
 "Yello Digital Financial Services",
 "Yes Microfinance Bank",
 "Yobe Microfinance Bank",
 "ZENITH EAZY WALLET",
 "Zenith bank PLC", "ZenithMobile",
 "Zikora Microfinance Bank",
 "Zinternet Nigera Limited",
 "e-Barcs Microfinance Bank",
 "eTranzact"
];

export default function withdrawalComp(uid) {
 
 EventBus.subscribe('loaded-data', data => {
  setTimeout(() => {
  const form = document.forms.withdrawal;
  
  for(let key in data) {
   if(form[key]) {
    form[key].value = data[key];
   }
  }
  }, 500);
 });
 
 async function handleSubmit(e) {
  e.preventDefault();
  
  const data = {
   user_id: uid,
   timeCreated: Date.now(),
   status: 'Pending',
   code: 'withdrawal',
   detail: 'Fund Withdrawal'
  };
  
  const formData = new FormData(this);
  
  iter(formData, key => data[key[0]] = key[1]);
  
  const ref = doc(collection(db, 'withdrawals'));
  const docRef = await addDoc(ref, data);
  
  await setDoc(ref, { ref: docRef.id }, { merge: true });
  
  withdrawalSent();
 }

 const div = cEl('form', { class: 'border rounded-lg text-sm font-bold p-3 max-w-xl mx-auto', name: 'withdrawal', event: {
  submit: handleSubmit
 } },
  cEl('h2', { class: 'py-6 text-center text-md', textContent: 'Withdrawal information' }),
  cEl('hr'),
  cEl('div', { class: 'mt-3 py-3' },
   cEl('label', { textContent: 'Withdrawal method:', class: 'block mb-1' }),
   cEl('select', { name: 'method', class: 'w-full p-3 bg-7 color2' },
    new Option('Bank Transfer', 'Bank Transfer')
   )
  ),
  cEl('div', { class: 'grid md:grid-cols-2 gap-5 py-3' },
  cEl('div', {},
   cEl('label', { textContent: 'Bank Name:', class: 'block mb-1' }),
   cEl('select', { class: 'w-full p-3 color2 bg-7', name: 'bankName', required: true, event: {
    focus(e) {
     banks.forEach(each => e.target.appendChild(new Option(each, each)));
    },
    blur() {
     let selected = this.selectedOptions[0];
     this.innerHTML = '';
     this.append(selected);
    }
   } })
  ),
  cEl('div', {},
   cEl('label', { textContent: 'Amount', class: 'inline-block mb-1' }),
   cEl('div', { class: 'grid grid-cols-6' },
    cEl('input', { value: 'USD', class: 'col-span-1 text-center border', disabled: true }),
    cEl('input', { textContent: 'Amount', class: 'p-3 bg-7 color2 col-span-5', type: 'number', name: 'amount', required: true })
   )
   )
  ),
  cEl('div', { class: 'grid md:grid-cols-2 gap-5 py-3' },
   cEl('div', {},
    cEl('label', { textContent: 'Account Holder Name:', class: 'block mb-1' }),
    cEl('input', { class: 'w-full p-3 bg-7 color2', type: 'text', name: 'bankAcctName', minLength: '3', required: true })
   ),
   cEl('div', {},
    cEl('label', { textContent: 'Account Number:', class: 'block mb-1' }),
    cEl('input', { class: 'w-full p-3 bg-7 color2', type: 'number', minLength: '5', name: 'bankAcctNo', required: true })
   )
  ),
  cEl('button', {
   type: 'submit',
   textContent: 'Continue',
   class: 'py-3 mt-8 w-full text-gray-100 bg-blue-700 rounded-sm font-bold'
  })
 );

 return div;
}

function withdrawalSent() {
 
 
}