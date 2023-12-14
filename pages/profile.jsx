import { Head } from 'next/head';
import { useState, useLayoutEffect, useMemo } from 'react';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { auth } from '../firebase/auth';
import { db, setDoc, doc } from '../firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Img from '../components/mediaUpload.js';
import { useAuthContext } from '../pages/_app.js';

const checkMark = <svg stroke="green" fill="green" strokeWidth="0" viewBox="0 0 512 512" width="1.6em" height="1.6em" xmlns="http://www.w3.org/2000/svg"> <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" /></svg>;

const loadingIcon = <svg className="spin" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="1.6em" height="1.6em" xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>;

const countries = [
		"",
		"Åland Islands", "Albania", "Algeria",
		"American Samoa", "Andorra",
		"Angola", "Anguilla",
		"Antigua &amp; Barbuda",
		"Antarctica", "Argentina",
		"Armenia", "Aruba", "Australia",
		"Austria", "Azerbaijan",
		"Bahamas", "Bahrain",
		"Bangladesh", "Barbados",
		"Belarus", "Belgium", "Belize",
		"Benin", "Bermuda", "Bhutan",
		"Bolivia", "Bonaire",
		"Bosnia &amp; Herzegovina",
		"Botswana", "Brazil",
		"British Indian Ocean Territory",
		"British Virgin Islands",
		"Brunei", "Bulgaria",
		"Burkina Faso", "Burundi", "Cambodia", "Cameroon",
		"Canada", "Cape Verde",
		"Cayman Islands", "Central African Republic",
		"Chad", "Chile", "China",
		"Christmas Island", "Cocos (Keeling) Islands", "Colombia",
		"Comoros", "Congo", "Congo (DRC)",
		"Cook Islands", "Costa Rica",
		"Côte d’Ivoire", "Croatia",
		"Cuba", "Curaçao", "Cyprus",
		"Czech", "Denmark", "Djibouti",
		"Dominica", "Dominican Republic",
		"Ecuador", "Egypt",
		"El Salvador", "Equatorial Guinea",
		"Eritrea", "Estonia", "Ethiopia",
		"Falkland Islands", "Faroe Islands",
		"Fiji", "Finland", "France",
		"French Guiana", "French Polynesia",
		"Gabon", "Gambia", "Georgia",
		"Germany", "Ghana", "Gibraltar",
		"Greece", "Greenland", "Grenada",
		"Guadeloupe", "Guam", "Guatemala",
		"Guinea", "Guinea-Bissau",
		"Guyana", "Haiti", "Heard &amp; McDonald Islands",
		"Honduras", "Hong Kong", "Hungary",
		"Iceland", "India", "Indonesia",
		"Iran", "Iraq", "Ireland",
		"Isle of Man", "Israel", "Italy",
		"Jamaica", "Japan", "Jersey",
		"Jordan", "Kazakhstan", "Kenya",
		"Kiribati", "Korea North",
		"Korea South", "Kosovo",
		"Kuwait", "Kyrgyzstan", "Laos",
		"Latvia", "Lebanon", "Lesotho",
		"Liberia", "Libya", "Liechtenstein",
		"Lithuania", "Luxembourg",
		"Macao SAR", "Macedonia", "Madagascar", "Malawi", "Malaysia",
		"Maldives", "Mali", "Malta",
		"Marshall Islands", "Martinique", "Mauritania",
		"Mauritius", "Mayotte", "Mexico",
		"Micronesia", "Moldova", "Monaco",
		"Mongolia", "Montenegro",
		"Montserrat", "Morocco",
		"Mozambique", "Myanmar",
		"Namibia", "Nauru", "Nepal",
		"Netherlands", "Nevis",
		"New Caledonia", "New Zealand",
		"Nicaragua", "Niger", "Nigeria",
		"Niue", "Norfolk Island",
		"Northern Mariana Islands",
		"Norway", "Oman", "Pakistan",
		"Palau", "Palestinian Authority",
		"Panama", "Papua New Guinea",
		"Paraguay", "Peru", "Philippines",
		"Pitcairn Islands", "Poland",
		"Portugal", "Puerto Rico",
		"Qatar", "Réunion", "Romania",
		"Russia", "Rwanda", "Samoa",
		"San Marino", "São Tomé &amp; Príncipe",
		"Saudi Arabia", "Senegal",
		"Serbia", "Seychelles", "Sierra Leone",
		"Singapore", "Sint Maarten",
		"Slovakia", "Slovenia", "Solomon Islands",
		"Somalia", "South Africa",
		"South Georgia &amp; South Sandwich Islands",
		"South Sudan", "Spain",
		"Sri Lanka", "Sudan", "Suriname",
		"Svalbard &amp; Jan Mayen",

		"Sweden", "Switzerland", "Syria",
		"Taiwan", "Tajikistan",
		"Tanzania", "Thailand", "Togo",
		"Tokelau", "Tonga",
		"Trinidad &amp; Tobago", "Tunisia",
		"Turkey", "Turkmenistan", "Turks &amp; Caicos Islands",
		"Tuvalu", "Uganda", "Ukraine",
		"United Arab Emirates",
		"United Kingdom", "United States", "Uruguay",
		"Uzbekistan", "Vanuatu",
		"Vatican City", "Venezuela",
		"Vietnam", "Wallis &amp; Futuna",
		"Yemen", "Zambia", "Zimbabwe"
	];
	
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

const spinIcon = <svg className="spin" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>;

const storage = getStorage();

let oldUserImage, imgLoadState = {};

export default function Profile({ uid }) {
	const { data } = useAuthContext();
	
 function updateRequest(data) {
  return setDoc(doc(db, 'users', uid), data, { merge: true });
 }
 
 const { ImageUpload, renderImage } = useMemo(Img(function(canvas, uploadBtn) {
  canvas.toBlob(async (blob) => {
   try {
    uploadBtn.innerHTML = spinIcon;
 
    // Create a reference to firebase storage 'users/imageName.jpg'
    const imageRef = ref(storage, 'users/' + uid);
 
    // upload image
    if (!imgLoadState.uploadBytes) {
     await uploadBytes(imageRef, blob);
     imgLoadState.uploadBytes = true;
    }
 
    if (oldUserImage) {
     // photoUrl will always be the same since we are using uid
     // We simply overwrite the file in storage but url remains the same 
     // TODO:
     // Consider checking if uid may change by any chance e.g forgot password or ...
     // If yes, then we need to perform oldUserImage comparison with the new getDownloadURL
     imgLoadState = {};
     
     // "this" here is referring to the <input type="file" /> element, we used Function.call
 
     uploadBtn.innerHTML = 'Upload';
     this.style.display = 'block';
     return;
    }
 
    const photoUrl = await getDownloadURL(imageRef);
 
    if (!imgLoadState.updateRequest) {
     await updateRequest({
      // Add photoUrl to user data
      photoUrl
     });
     imgLoadState.updateRequest = true;
    }
 
    await updateProfile(auth.currentUser, { photoUrl });
 
    imgLoadState = {};
 
    uploadBtn.innerHTML = 'Upload';
    this.style.display = 'block';
   } catch (e) {
    if (e.name == 'TypeError') return;
 
    uploadBtn.innerHTML = 'Try again!';
    this.style.display = 'block';
 
    alert('Error uploading image');
    console.error(e.stack);
   }
  }, 'image/jpeg');
 }), []);
	
	useLayoutEffect(() => {
		const form = document.forms.setting;
	
		for (let key in data) {
			if (key == 'photoUrl') {
				if (data[key]) {
					oldUserImage = data[key];
					renderImage(data[key]);
				}
			} else if (form[key]) {
				form[key].value = data[key];
			}
		}
	}, [data]);
	
 return (
 	<>
 	<Head>
 		<title>SwiftEarn - Profile settings</title>
			<meta name="description" content="Update your profile. Manage contact details, payment info, and preferences for enhanced performance." />
 	</Head>
  <main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen">
   <div className="mb-4 max-w-xl">
    <h2 className="text-2xl md:text-3xl mb-2">Profile settings</h2>
    <p className="color4 pr-2 text-sm">Update your profile. Manage contact details, payment info, and preferences for enhanced performance.</p>
   </div>
   <section>
    <form name="setting" className="text-sm">
     <div className="my-12">
      <ImageUpload />
     </div>
     <h2 className="text-lg mb-2">Basic Information</h2>
     <div className="grid md:grid-cols-2 md:gap-4">
      <Field label="Edit First Name" type="text" name="firstName" />
      <Field label="Edit Last Name" type="text" name="lastName" />
      <Field label="Edit Email Address" type="email" name="emai" />
      <Field label="Edit Phone No" type="number" name="phoneNumber" />
      <Field label="Edit Country" id="country" arr={countries} useDatalist />
     </div>
     <h2 className="text-lg mb-2 mt-12">Account Information</h2>
     <Field label="Edit Bank Name" id="bankName" arr={banks} useDatalist />
     <div className="grid md:grid-cols-2 md:gap-4">
      <Field label="Edit Account Name" type="text" name="bankAcctName" />
      <Field label="Edit Account No" type="number" name="bankAcctNo" />
     </div>
     <h2 className="text-lg mb-2 mt-12">Social media handles</h2>
     <div className="grid md:grid-cols-2 md:gap-4">
      <Field label="Edit Instagram Handle" type="text" name="instaHandle" />
      <Field label="Edit Twitter Handle" type="text" name="twitHandle" />
      <Field label="Edit Facebook Handle" type="text" name="fbHandle" />
     </div>
    </form>
   </section>
  </main>
  </>
 );
}

function Field({ label, type, name, useDatalist, id, arr }) {
 const [state, setState] = useState({
  active: 0,
  value: '',
  inputDisabled: true
 });
 const [tempState, setTempState] = useState('');
 
 return (
  <div className="py-2 px-3 bg-8 rounded-lg">
  <div className="bg-9 flex justify-between items-center">
   <div className="p-3 flex-grow">
    <input ariaLabel={label} className="w-full p-3 bg-7 color2" onInput={e => setTempState(e.target.value)} type={type} name={ id || name } placeholder={label} list={id} disabled={state.inputDisabled} />
    { useDatalist && <datalist id={id}>
     { arr.map(each => <option value={each}>{each}</option>) }</datalist> }
   </div>
   <button type="button" className="p-2 color4" onClick={async function(e) {
    try {
     if (!state.active) {
      setState(prev => ({
       ...prev,
       inputDisabled: false,
       active: 1
      }));
     } else {
      // send update request data
      if (!tempState) return;

      let data = {};
      data[id || name] = tempState;

      if (tempState.trim() === state.value) {
       setState(prev => ({
        ...prev,
        inputDisabled: true,
        active: 0
       }));
       
       return;
      }
      
      setState(prev => ({
       ...prev,
       active: 2,
       value: tempState.trim()
      }));
      
      if (name === 'email') {
       await updateEmail(auth.currentUser, tempState);
      } else if (name === 'password') {
       await updatePassword(auth.currentUser, tempState);
      } else {
       await updateRequest(data);

       if (name === 'firstName') {
        await updateProfile(auth.currentUser, { displayName: `${tempState} ${document.forms.setting.lastName.value}` });
       } else if (name === 'lastName') {
        await updateProfile(auth.currentUser, { displayName: `${document.forms.setting.firstName.value} ${tempState}` });
       }
      }

      setState(prev => ({
       ...prev,
       inputDisabled: true,
       active: 0
      }));
     }
    } catch(e) {
     console.error(e);
    }
    }}>
    {
     state.active === 1 ? checkMark : state.active === 2 ? loadingIcon : <img className="w-5" src="faEdit.svg" />
    }
   </button>
  </div>
 </div>
 );
}