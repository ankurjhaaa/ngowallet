import { createContext, useContext, useState, useEffect } from"react";

const LanguageContext = createContext();

const translations = {
 en: {
 // Navbar
 navHome:"Home",
 navVision:"Our Vision",
 navPrograms:"Programs",
 navJoin:"Join Us",
 navLogin:"Login",
 navProfile:"Profile",
 navLogout:"Logout",
 navBrand:"Bazm-e-Haidri",
 navTagline:"Serving Humanity",

 // Home Hero
 heroQuote:"Whoever saves a life, it is as if he has saved all of humanity",
 heroTitle:"Bazm-e-Haidri",
 heroSubtitle:"Heritage of Purnea, Commitment to Service",
 heroDesc:"Rooted in the rich heritage of Purnea, Bazm-e-Haidri is dedicated to education, healthcare, and community upliftment. Together, we serve humanity with compassion and integrity.",
 heroCta1:"Join Our Mission",
 heroCta2:"Our Vision →",

 // Purnea History
 historyTag:"Heritage",
 historyTitle:"Purnea —",
 historyHighlight:"A Glorious Legacy",
 historyAncientTitle:"Ancient Era",
 historyAncientDesc:"Purnea's history is linked to the Maurya and Gupta empires. This region was part of the ancient Anga Mahajanapada — a thriving land of culture and trade.",
 historyCultureTitle:"Cultural Heritage",
 historyCultureDesc:"This land has been a center for the spread of diverse faiths and cultures. Ancient temples, mosques, and monuments bear witness to its rich multicultural heritage.",
 historyGeoTitle:"Geographic Significance",
 historyGeoDesc:"Irrigated by rivers Kosi and Mahananda, Purnea is the largest district of North Bihar. Bordering Nepal, this region is blessed with natural beauty.",

 // Great Personalities
 personalitiesTag:"Great Personalities",
 personalitiesTitle:"Legends of",
 personalitiesHighlight:"Purnea",
 personalitiesSubtitle:"The great souls who brought glory to this land",

 personRenuName:"Phanishwar Nath Renu",
 personRenuTitle:"Legendary Author",
 personRenuDesc:"The immortal storyteller of Hindi literature. His novel'Maila Anchal' put Purnea on the world literary map. Father of regional literature.",

 personMaharajaName:"Maharaja Gopal Narayan Singh",
 personMaharajaTitle:"Ruler of Purnea Estate",
 personMaharajaDesc:"A beloved ruler who championed education and social development. His contributions remain etched in Purnea's history.",

 personSinhaName:"Dr. Sachidanand Sinha",
 personSinhaTitle:"Founder of Bihar",
 personSinhaDesc:"Played a key role in the creation of Bihar state. First temporary chairman of the Constituent Assembly and a renowned jurist.",

 personRahulName:"Rahul Sankrityayan",
 personRahulTitle:"Mahapandit (Great Scholar)",
 personRahulDesc:"Father of travel literature. This great scholar from Bihar made invaluable contributions to Buddhist philosophy and Hindi literature.",

 personSaintName:"Saints of Purnea",
 personSaintTitle:"Spiritual Leaders",
 personSaintDesc:"Saints and Sufi masters who dedicated their lives to the upliftment of the poor and underprivileged through education and service.",

 personFreedomName:"Freedom Fighters of Purnea",
 personFreedomTitle:"Immortal Martyrs",
 personFreedomDesc:"From the revolt of 1857 to the Quit India Movement of 1942, many brave souls of Purnea sacrificed everything for India's freedom.",

 // Timeline
 timelineTag:"Timeline",
 timelineTitle:"History of",
 timelineHighlight:"Purnea",

 // Mission
 missionTag:"Our Service",
 missionTitle:"Our",
 missionHighlight:"Mission",
 missionSubtitle:"Serving humanity through education, healthcare, and community support",
 missionEduTitle:"Education",
 missionEduDesc:"Providing books, fees, and digital learning resources for children. Helping children from underprivileged families attend school.",
 missionHealthTitle:"Healthcare",
 missionHealthDesc:"Medical camps, emergency treatment, and medicine distribution in rural areas. A healthy society builds a strong future.",
 missionCommunityTitle:"Community Service",
 missionCommunityDesc:"Food drives, skill development, and women empowerment programs. Making every individual self-reliant.",

 // Impact
 impactTag:"Impact",
 impactTitle:"Our",
 impactHighlight:"Achievements",
 impactPrograms:"Programs",
 impactVillages:"Villages",
 impactVolunteers:"Volunteers",
 impactYears:"Years of Service",

 // CTA
 ctaQuote:"✦ Service is the highest duty ✦",
 ctaTitle:"Be Part of This Noble Cause",
 ctaDesc:"Donate, volunteer, or support our mission in any way.",
 ctaCta1:"Donate Now",
 ctaCta2:"Become a Volunteer →",

 // Footer
 footerAbout:"About Bazm-e-Haidri",
 footerAboutDesc:"We empower communities through education, healthcare, and sustainable initiatives.",
 footerLinks:"Quick Links",
 footerContact:"Contact",
 footerFollow:"Follow Us",
 footerCopy:"Bazm-e-Haidri · All Rights Reserved",

 // Vision Page
 visionHeroTitle:"Our Vision",
 visionHeroDesc:"We envision a society where every individual has equal access to education, healthcare, and opportunities for a dignified life.",
 visionMissionTitle:"Our Mission",
 visionMissionDesc:"Our mission is to empower underprivileged communities by providing access to quality education, essential healthcare, and sustainable livelihood programs.",
 visionVisionTitle:"Our Vision",
 visionVisionDesc:"We strive to build a future where no child is denied education, no family lacks basic healthcare, and every community thrives with dignity.",
 visionWhatTitle:"What We Do",
 visionWhatDesc:"Our work is focused on creating long-term impact through well-structured programs.",
 visionGoalsTitle:"Our Future Goals",
 visionGoalsDesc:"We are committed to expanding our reach and impact in the coming years.",
 visionGoal1Title:"Expand Education Programs",
 visionGoal1Desc:"Reach 5,000+ children with quality education and digital resources.",
 visionGoal2Title:"Strengthen Healthcare",
 visionGoal2Desc:"Conduct regular health camps across 50+ rural communities.",
 visionGoal3Title:"Empower Communities",
 visionGoal3Desc:"Support sustainable livelihoods for 1,000+ families.",

 // Join Page
 joinHeroTitle:"Join Our Mission",
 joinHeroDesc:"We believe meaningful change comes through long-term commitment, not one-time donations.",
 joinWhyTitle:"Why We Don't Accept Direct Donations",
 joinWhyDesc:"Our trust works on a planned and transparent funding model. Instead of random donations, we prefer meaningful yearly commitments discussed directly with our team.",
 joinHowTitle:"How It Works",
 joinStep1:"Contact our team and discuss your intent to support.",
 joinStep2:"A yearly contribution amount is mutually decided.",
 joinStep3:"Our admin records your commitment in our system.",
 joinStep4:"You contribute gradually during the year until the committed amount is fulfilled.",
 joinWhoTitle:"Who Can Join?",
 joinWhoDesc:"Individuals, families, professionals, and organizations who believe in sustained social impact are welcome.",
 joinCtaTitle:"Start the Conversation",
 joinCtaDesc:"If you wish to support our work, please reach out to our team. We will guide you personally.",
 joinCtaBtn1:"Contact Our Team",
 joinCtaBtn2:"Call Us Directly",

 // Programs Page
 progsHeroTitle:"Our Programs",
 progsHeroDesc:"We run focused programs that create real impact in education, healthcare, and community development.",
 progsEduTitle:"Education Support",
 progsEduDesc:"Providing school fees, books, uniforms, and digital learning resources to underprivileged children.",
 progsHealthTitle:"Healthcare Assistance",
 progsHealthDesc:"Medical camps, emergency treatments, free medicines, and health awareness programs.",
 progsCommunityTitle:"Community Development",
 progsCommunityDesc:"Food distribution, skill development, women empowerment, and livelihood support initiatives.",
 progsCtaTitle:"Want to Support a Program?",
 progsCtaDesc:"You can donate to a specific program or join us as a volunteer to make a direct impact.",
 footerPrivacyPolicy:"Privacy Policy",
 footerAccountDeletion:"Account Deletion",

 privacyBadge:"Legal",
 privacyTitle:"Privacy Policy",
 privacyDesc:"Bazm-e-Haidri uses user data only for service improvement, communication, and membership management.",
 privacySec1Title:"1. What data we collect",
 privacySec1Desc:"We may collect your name, phone number, email, address, and membership/payment related information.",
 privacySec2Title:"2. How data is used",
 privacySec2Desc:"This data is used for account management, payment records, membership reminders, reporting, and user support.",
 privacySec3Title:"3. Data sharing policy",
 privacySec3Desc:"We do not share personal data for third-party marketing without legal requirement or your permission.",
 privacySec4Title:"4. Data security",
 privacySec4Desc:"We use reasonable technical and administrative safeguards to keep user data secure.",
 privacySec5Title:"5. User rights",
 privacySec5Desc:"You can update your profile data and submit an account deletion request.",
 privacySec6Title:"6. Contact",
 privacySec6Desc:"For privacy concerns, contact us through NGO details shown in the footer.",

 deletionBadge:"User Support",
 deletionTitle:"Account Deletion Process",
 deletionDesc:"If a user wants to delete the account, follow the process below.",
 deletionStep1Title:"Submit Deletion Request",
 deletionStep1Desc:"The user should send an account deletion request to NGO support team via phone or email.",
 deletionStep2Title:"Identity Verification",
 deletionStep2Desc:"For security purposes, verification is done through registered phone or email.",
 deletionStep3Title:"Review & Confirmation",
 deletionStep3Desc:"After verifying pending payments and records, final confirmation is provided.",
 deletionStep4Title:"Account Removal Timeline",
 deletionStep4Desc:"After verification, account deactivation/deletion is completed within 7-14 working days.",
 deletionNote:"Note: As per legal, tax, or audit requirements, some transactional records may be securely retained for a limited period.",
 },
 hi: {
 navHome:"होम",
 navVision:"हमारा विज़न",
 navPrograms:"कार्यक्रम",
 navJoin:"जुड़ें",
 navLogin:"लॉगिन",
 navProfile:"प्रोफ़ाइल",
 navLogout:"लॉगआउट",
 navBrand:"बज़्म-ए-हैदरी",
 navTagline:"मानवता की सेवा",

 heroQuote:"जिसने एक जान बचाई, उसने पूरी मानवता बचाई",
 heroTitle:"बज़्म-ए-हैदरी",
 heroSubtitle:"पूर्णिया की धरोहर, सेवा का संकल्प",
 heroDesc:"पूर्णिया की समृद्ध विरासत में निहित, बज़्म-ए-हैदरी शिक्षा, स्वास्थ्य और सामुदायिक उत्थान के लिए समर्पित है। हम मिलकर करुणा और ईमानदारी से मानवता की सेवा करते हैं।",
 heroCta1:"हमारे मिशन में जुड़ें",
 heroCta2:"हमारा विज़न →",

 historyTag:"इतिहास",
 historyTitle:"पूर्णिया —",
 historyHighlight:"एक गौरवशाली विरासत",
 historyAncientTitle:"प्राचीन काल",
 historyAncientDesc:"पूर्णिया का इतिहास मौर्य और गुप्त साम्राज्य से जुड़ा है। यह क्षेत्र प्राचीन अंग महाजनपद का हिस्सा था — संस्कृति और व्यापार की समृद्ध भूमि।",
 historyCultureTitle:"सांस्कृतिक धरोहर",
 historyCultureDesc:"यह धरती विविध धर्मों और संस्कृतियों के प्रसार का केंद्र रही है। प्राचीन मंदिर, मस्जिदें और स्मारक इसकी समृद्ध बहुसांस्कृतिक विरासत के साक्षी हैं।",
 historyGeoTitle:"भौगोलिक महत्व",
 historyGeoDesc:"कोशी और महानंदा नदियों से सिंचित, पूर्णिया उत्तर बिहार का सबसे बड़ा जिला है। नेपाल सीमा से लगा यह क्षेत्र प्राकृतिक सौंदर्य से भरपूर है।",

 personalitiesTag:"विभूतियाँ",
 personalitiesTitle:"पूर्णिया के",
 personalitiesHighlight:"महान पुरुष",
 personalitiesSubtitle:"जिन महापुरुषों ने इस धरती को गौरवान्वित किया",
 personRenuName:"फणीश्वर नाथ रेणु",
 personRenuTitle:"महान साहित्यकार",
 personRenuDesc:"हिंदी साहित्य के अमर कथाकार।'मैला आँचल' उपन्यास से पूर्णिया को विश्व पटल पर पहचान दिलाई।",
 personMaharajaName:"महाराजा गोपाल नारायण सिंह",
 personMaharajaTitle:"पूर्णिया रियासत के शासक",
 personMaharajaDesc:"शिक्षा और सामाजिक विकास के लिए समर्पित। जनता के प्रिय राजा।",
 personSinhaName:"डॉ॰ सच्चिदानंद सिन्हा",
 personSinhaTitle:"बिहार के संस्थापक",
 personSinhaDesc:"बिहार राज्य के निर्माण में महत्वपूर्ण भूमिका। संविधान सभा के प्रथम अस्थायी अध्यक्ष।",
 personRahulName:"राहुल सांकृत्यायन",
 personRahulTitle:"महापंडित",
 personRahulDesc:"यात्रा साहित्य के जनक। बौद्ध दर्शन और हिंदी साहित्य में अमूल्य योगदान।",
 personSaintName:"पूर्णिया के संत",
 personSaintTitle:"आध्यात्मिक नेता",
 personSaintDesc:"संत और सूफ़ी फ़क़ीर जिन्होंने शिक्षा और सेवा के माध्यम से गरीबों के उत्थान के लिए जीवन समर्पित किया।",
 personFreedomName:"स्वतंत्रता सेनानी",
 personFreedomTitle:"अमर बलिदानी",
 personFreedomDesc:"1857 से लेकर 1942 तक, पूर्णिया के वीरों ने स्वतंत्रता की लड़ाई में सर्वस्व दिया।",

 timelineTag:"कालक्रम",
 timelineTitle:"पूर्णिया का",
 timelineHighlight:"कालक्रम",

 missionTag:"हमारी सेवा",
 missionTitle:"हमारा",
 missionHighlight:"मिशन",
 missionSubtitle:"शिक्षा, स्वास्थ्य और समुदाय सेवा के माध्यम से मानवता की सेवा",
 missionEduTitle:"शिक्षा",
 missionEduDesc:"बच्चों के लिए किताबें, फीस और डिजिटल शिक्षा। गरीब परिवारों के बच्चों को स्कूल भेजने का प्रयास।",
 missionHealthTitle:"स्वास्थ्य",
 missionHealthDesc:"मेडिकल कैंप, आपातकालीन उपचार और ग्रामीण क्षेत्रों में दवा वितरण।",
 missionCommunityTitle:"समुदाय सेवा",
 missionCommunityDesc:"भोजन अभियान, कौशल विकास और महिला सशक्तीकरण कार्यक्रम।",

 impactTag:"प्रभाव",
 impactTitle:"हमारी",
 impactHighlight:"उपलब्धियाँ",
 impactPrograms:"कार्यक्रम",
 impactVillages:"गाँव",
 impactVolunteers:"स्वयंसेवक",
 impactYears:"वर्ष सेवा",

 ctaQuote:"✦ सेवा ही धर्म है ✦",
 ctaTitle:"इस पवित्र कार्य का हिस्सा बनें",
 ctaDesc:"दान करें, स्वयंसेवक बनें, या किसी भी तरह से सहयोग करें।",
 ctaCta1:"अभी दान करें",
 ctaCta2:"स्वयंसेवक बनें →",

 footerAbout:"बज़्म-ए-हैदरी के बारे में",
 footerAboutDesc:"शिक्षा, स्वास्थ्य सेवा और सतत पहल के माध्यम से समुदायों को सशक्त बनाना।",
 footerLinks:"त्वरित लिंक",
 footerContact:"संपर्क",
 footerFollow:"फॉलो करें",
 footerCopy:"बज़्म-ए-हैदरी · सर्वाधिकार सुरक्षित",

 visionHeroTitle:"हमारा विज़न",
 visionHeroDesc:"हम एक ऐसे समाज की कल्पना करते हैं जहाँ हर व्यक्ति को शिक्षा, स्वास्थ्य और सम्मानजनक जीवन का समान अवसर मिले।",
 visionMissionTitle:"हमारा मिशन",
 visionMissionDesc:"हमारा मिशन वंचित समुदायों को गुणवत्तापूर्ण शिक्षा, स्वास्थ्य सेवा और टिकाऊ आजीविका कार्यक्रम प्रदान करके सशक्त बनाना है।",
 visionVisionTitle:"हमारा विज़न",
 visionVisionDesc:"हम एक ऐसा भविष्य बनाना चाहते हैं जहाँ कोई बच्चा शिक्षा से वंचित न रहे और हर समुदाय सम्मान के साथ फले-फूले।",
 visionWhatTitle:"हम क्या करते हैं",
 visionWhatDesc:"हमारा काम सुव्यवस्थित कार्यक्रमों के माध्यम से दीर्घकालिक प्रभाव बनाने पर केंद्रित है।",
 visionGoalsTitle:"हमारे भविष्य के लक्ष्य",
 visionGoalsDesc:"हम आने वाले वर्षों में अपनी पहुँच और प्रभाव का विस्तार करने के लिए प्रतिबद्ध हैं।",
 visionGoal1Title:"शिक्षा कार्यक्रम विस्तार",
 visionGoal1Desc:"5,000+ बच्चों तक गुणवत्तापूर्ण शिक्षा पहुँचाना।",
 visionGoal2Title:"स्वास्थ्य सेवा मजबूत करना",
 visionGoal2Desc:"50+ ग्रामीण समुदायों में नियमित स्वास्थ्य शिविर।",
 visionGoal3Title:"समुदायों को सशक्त बनाना",
 visionGoal3Desc:"1,000+ परिवारों के लिए टिकाऊ आजीविका सहायता।",

 joinHeroTitle:"हमारे मिशन में जुड़ें",
 joinHeroDesc:"हम मानते हैं कि सार्थक बदलाव दीर्घकालिक प्रतिबद्धता से आता है।",
 joinWhyTitle:"हम सीधे दान स्वीकार क्यों नहीं करते",
 joinWhyDesc:"हमारा ट्रस्ट एक नियोजित और पारदर्शी फंडिंग मॉडल पर काम करता है। यादृच्छिक दान के बजाय, हम सार्थक वार्षिक प्रतिबद्धताओं को प्राथमिकता देते हैं।",
 joinHowTitle:"यह कैसे काम करता है",
 joinStep1:"हमारी टीम से संपर्क करें।",
 joinStep2:"वार्षिक योगदान राशि तय की जाती है।",
 joinStep3:"हमारा एडमिन आपकी प्रतिबद्धता दर्ज करता है।",
 joinStep4:"आप वर्ष भर धीरे-धीरे योगदान करते हैं।",
 joinWhoTitle:"कौन जुड़ सकता है?",
 joinWhoDesc:"व्यक्ति, परिवार, पेशेवर और संगठन — सभी का स्वागत है।",
 joinCtaTitle:"बातचीत शुरू करें",
 joinCtaDesc:"हमारी टीम से संपर्क करें। हम आपका व्यक्तिगत रूप से मार्गदर्शन करेंगे।",
 joinCtaBtn1:"टीम से संपर्क करें",
 joinCtaBtn2:"सीधे कॉल करें",

 progsHeroTitle:"हमारे कार्यक्रम",
 progsHeroDesc:"शिक्षा, स्वास्थ्य और सामुदायिक विकास में वास्तविक प्रभाव डालने वाले कार्यक्रम।",
 progsEduTitle:"शिक्षा सहायता",
 progsEduDesc:"वंचित बच्चों के लिए स्कूल फीस, किताबें और डिजिटल शिक्षा संसाधन।",
 progsHealthTitle:"स्वास्थ्य सहायता",
 progsHealthDesc:"मेडिकल कैंप, आपातकालीन उपचार, मुफ्त दवाएं और स्वास्थ्य जागरूकता।",
 progsCommunityTitle:"सामुदायिक विकास",
 progsCommunityDesc:"भोजन वितरण, कौशल विकास और महिला सशक्तीकरण पहल।",
 progsCtaTitle:"किसी कार्यक्रम का समर्थन करें?",
 progsCtaDesc:"किसी विशेष कार्यक्रम में दान करें या स्वयंसेवक बनें।",
 footerPrivacyPolicy:"प्राइवेसी पॉलिसी",
 footerAccountDeletion:"अकाउंट डिलीशन",

 privacyBadge:"कानूनी",
 privacyTitle:"प्राइवेसी पॉलिसी",
 privacyDesc:"बज़्म-ए-हैदरी उपयोगकर्ता डेटा का उपयोग केवल सेवा सुधार, संचार और सदस्यता प्रबंधन के लिए करता है।",
 privacySec1Title:"1. कौन सा डेटा एकत्र होता है",
 privacySec1Desc:"हम आपका नाम, फोन नंबर, ईमेल, पता और सदस्यता/भुगतान से संबंधित जानकारी एकत्र कर सकते हैं।",
 privacySec2Title:"2. डेटा का उपयोग कैसे होता है",
 privacySec2Desc:"यह डेटा अकाउंट प्रबंधन, भुगतान रिकॉर्ड, सदस्यता रिमाइंडर, रिपोर्टिंग और उपयोगकर्ता सहायता के लिए उपयोग होता है।",
 privacySec3Title:"3. डेटा साझा करने की नीति",
 privacySec3Desc:"कानूनी आवश्यकता या आपकी अनुमति के बिना हम व्यक्तिगत डेटा को थर्ड-पार्टी मार्केटिंग के लिए साझा नहीं करते।",
 privacySec4Title:"4. डेटा सुरक्षा",
 privacySec4Desc:"उपयोगकर्ता डेटा सुरक्षित रखने के लिए हम उचित तकनीकी और प्रशासनिक सुरक्षा उपाय अपनाते हैं।",
 privacySec5Title:"5. उपयोगकर्ता अधिकार",
 privacySec5Desc:"आप अपना प्रोफाइल डेटा अपडेट कर सकते हैं और अकाउंट डिलीशन अनुरोध भेज सकते हैं।",
 privacySec6Title:"6. संपर्क",
 privacySec6Desc:"प्राइवेसी संबंधी प्रश्नों के लिए फुटर में दिए NGO संपर्क विवरण पर हमसे संपर्क करें।",

 deletionBadge:"यूज़र सपोर्ट",
 deletionTitle:"अकाउंट डिलीशन प्रक्रिया",
 deletionDesc:"यदि उपयोगकर्ता अपना अकाउंट हटाना चाहता है, तो नीचे दी गई प्रक्रिया अपनाएँ।",
 deletionStep1Title:"डिलीशन अनुरोध भेजें",
 deletionStep1Desc:"उपयोगकर्ता NGO सपोर्ट टीम को फोन या ईमेल के माध्यम से अकाउंट डिलीशन अनुरोध भेजे।",
 deletionStep2Title:"पहचान सत्यापन",
 deletionStep2Desc:"सुरक्षा के लिए पंजीकृत फोन या ईमेल के जरिए सत्यापन किया जाता है।",
 deletionStep3Title:"समीक्षा और पुष्टि",
 deletionStep3Desc:"लंबित भुगतान और रिकॉर्ड सत्यापित होने के बाद अंतिम पुष्टि दी जाती है।",
 deletionStep4Title:"अकाउंट हटाने की समयसीमा",
 deletionStep4Desc:"सत्यापन पूरा होने के बाद 7-14 कार्य दिवसों में अकाउंट निष्क्रिय/हटाने की प्रक्रिया पूरी की जाती है।",
 deletionNote:"नोट: कानूनी, टैक्स या ऑडिट आवश्यकताओं के अनुसार कुछ लेन-देन रिकॉर्ड सीमित अवधि तक सुरक्षित रखे जा सकते हैं।",
 },
 ur: {
 navHome:"ہوم",
 navVision:"ہمارا وژن",
 navPrograms:"پروگرام",
 navJoin:"شامل ہوں",
 navLogin:"لاگ ان",
 navProfile:"پروفائل",
 navLogout:"لاگ آؤٹ",
 navBrand:"بزمِ حیدری",
 navTagline:"انسانیت کی خدمت",

 heroQuote:"جس نے ایک جان بچائی اس نے پوری انسانیت بچائی",
 heroTitle:"بزمِ حیدری",
 heroSubtitle:"پورنیہ کی وراثت، خدمت کا عزم",
 heroDesc:"پورنیہ کی بھرپور وراثت میں جڑے ہوئے، بزمِ حیدری تعلیم، صحت اور معاشرتی ترقی کے لیے وقف ہے۔ ہم مل کر ہمدردی اور دیانتداری سے انسانیت کی خدمت کرتے ہیں۔",
 heroCta1:"ہمارے مشن میں شامل ہوں",
 heroCta2:"ہمارا وژن ←",

 historyTag:"تاریخ",
 historyTitle:"پورنیہ —",
 historyHighlight:"ایک شاندار وراثت",
 historyAncientTitle:"قدیم دور",
 historyAncientDesc:"پورنیہ کی تاریخ موریہ اور گپتا سلطنتوں سے جڑی ہے۔ یہ علاقہ قدیم انگ مہاجنپد کا حصہ تھا۔",
 historyCultureTitle:"ثقافتی ورثہ",
 historyCultureDesc:"یہ سرزمین مختلف مذاہب اور ثقافتوں کے فروغ کا مرکز رہی ہے۔ قدیم مندر، مساجد اور یادگاریں اس کی شاندار وراثت کی گواہ ہیں۔",
 historyGeoTitle:"جغرافیائی اہمیت",
 historyGeoDesc:"کوشی اور مہانندا ندیوں سے سیراب، پورنیہ شمالی بہار کا سب سے بڑا ضلع ہے۔ نیپال کی سرحد سے ملحق یہ علاقہ قدرتی خوبصورتی سے مالا مال ہے۔",

 personalitiesTag:"عظیم شخصیات",
 personalitiesTitle:"پورنیہ کے",
 personalitiesHighlight:"عظیم لوگ",
 personalitiesSubtitle:"وہ عظیم روحیں جنہوں نے اس سرزمین کو عزت بخشی",
 personRenuName:"پھنیشور ناتھ رینو",
 personRenuTitle:"عظیم ادیب",
 personRenuDesc:"ہندی ادب کے لافانی قصہ گو۔ ناول'میلا آنچل' نے پورنیہ کو عالمی ادبی نقشے پر لایا۔",
 personMaharajaName:"مہاراجہ گوپال نارائن سنگھ",
 personMaharajaTitle:"پورنیہ ریاست کے حکمران",
 personMaharajaDesc:"تعلیم اور سماجی ترقی کے چیمپیئن۔ ان کی خدمات تاریخ میں امر ہیں۔",
 personSinhaName:"ڈاکٹر سچیدانند سنہا",
 personSinhaTitle:"بہار کے بانی",
 personSinhaDesc:"بہار ریاست کی تشکیل میں کلیدی کردار۔ دستور ساز اسمبلی کے پہلے عارضی صدر۔",
 personRahulName:"راہل سانکرتیائن",
 personRahulTitle:"مہاپنڈت",
 personRahulDesc:"سفرنامہ ادب کے باپ۔ بدھ فلسفے اور ہندی ادب میں انمول شراکت۔",
 personSaintName:"پورنیہ کے بزرگ",
 personSaintTitle:"روحانی رہنما",
 personSaintDesc:"صوفی بزرگ جنہوں نے تعلیم اور خدمت کے ذریعے غریبوں کی ترقی کے لیے زندگی وقف کی۔",
 personFreedomName:"آزادی کے مجاہدین",
 personFreedomTitle:"لافانی شہید",
 personFreedomDesc:"1857 سے 1942 تک، پورنیہ کے بہادروں نے آزادی کی جنگ میں سب کچھ قربان کیا۔",

 timelineTag:"ٹائم لائن",
 timelineTitle:"پورنیہ کی",
 timelineHighlight:"ٹائم لائن",

 missionTag:"ہماری خدمت",
 missionTitle:"ہمارا",
 missionHighlight:"مشن",
 missionSubtitle:"تعلیم، صحت اور معاشرتی خدمت کے ذریعے انسانیت کی خدمت",
 missionEduTitle:"تعلیم",
 missionEduDesc:"بچوں کے لیے کتابیں، فیس اور ڈیجیٹل تعلیم۔ غریب خاندانوں کے بچوں کو اسکول بھیجنے کی کوشش۔",
 missionHealthTitle:"صحت",
 missionHealthDesc:"طبی کیمپ، ہنگامی علاج اور دیہی علاقوں میں دوائیوں کی تقسیم۔",
 missionCommunityTitle:"معاشرتی خدمت",
 missionCommunityDesc:"کھانے کی تقسیم، مہارت کی ترقی اور خواتین کو بااختیار بنانے کے پروگرام۔",

 impactTag:"اثر",
 impactTitle:"ہماری",
 impactHighlight:"کامیابیاں",
 impactPrograms:"پروگرام",
 impactVillages:"گاؤں",
 impactVolunteers:"رضاکار",
 impactYears:"سال خدمت",

 ctaQuote:"✦ خدمت سب سے بڑا فرض ہے ✦",
 ctaTitle:"اس نیک کام کا حصہ بنیں",
 ctaDesc:"عطیہ دیں، رضاکار بنیں، یا کسی بھی طرح سے مدد کریں۔",
 ctaCta1:"ابھی عطیہ دیں",
 ctaCta2:"رضاکار بنیں ←",

 footerAbout:"بزمِ حیدری کے بارے میں",
 footerAboutDesc:"تعلیم، صحت اور پائیدار اقدامات کے ذریعے معاشروں کو بااختیار بنانا۔",
 footerLinks:"فوری لنکس",
 footerContact:"رابطہ",
 footerFollow:"فالو کریں",
 footerCopy:"بزمِ حیدری · جملہ حقوق محفوظ ہیں",

 visionHeroTitle:"ہمارا وژن",
 visionHeroDesc:"ہم ایک ایسے معاشرے کا تصور کرتے ہیں جہاں ہر فرد کو تعلیم، صحت اور باعزت زندگی تک مساوی رسائی ہو۔",
 visionMissionTitle:"ہمارا مشن",
 visionMissionDesc:"ہمارا مشن پسماندہ طبقوں کو معیاری تعلیم، صحت اور پائیدار معاش فراہم کرنا ہے۔",
 visionVisionTitle:"ہمارا وژن",
 visionVisionDesc:"ہم ایسا مستقبل بنانا چاہتے ہیں جہاں کوئی بچہ تعلیم سے محروم نہ رہے اور ہر معاشرہ عزت سے پھلے پھولے۔",
 visionWhatTitle:"ہم کیا کرتے ہیں",
 visionWhatDesc:"ہمارا کام منظم پروگراموں کے ذریعے طویل مدتی اثرات پیدا کرنے پر مرکوز ہے۔",
 visionGoalsTitle:"ہمارے مستقبل کے اہداف",
 visionGoalsDesc:"ہم آنے والے سالوں میں اپنی رسائی اور اثر کو بڑھانے کے لیے پرعزم ہیں۔",
 visionGoal1Title:"تعلیمی پروگراموں کی توسیع",
 visionGoal1Desc:"5,000+ بچوں تک معیاری تعلیم پہنچانا۔",
 visionGoal2Title:"صحت کی خدمات مضبوط کرنا",
 visionGoal2Desc:"50+ دیہی معاشروں میں باقاعدہ صحت کیمپ۔",
 visionGoal3Title:"معاشروں کو بااختیار بنانا",
 visionGoal3Desc:"1,000+ خاندانوں کے لیے پائیدار معاش کی مدد۔",

 joinHeroTitle:"ہمارے مشن میں شامل ہوں",
 joinHeroDesc:"ہم یقین رکھتے ہیں کہ بامعنی تبدیلی طویل مدتی عزم سے آتی ہے۔",
 joinWhyTitle:"ہم براہ راست عطیات کیوں قبول نہیں کرتے",
 joinWhyDesc:"ہمارا ٹرسٹ منصوبہ بند اور شفاف فنڈنگ ماڈل پر کام کرتا ہے۔ بے ترتیب عطیات کے بجائے، ہم بامعنی سالانہ وابستگی کو ترجیح دیتے ہیں۔",
 joinHowTitle:"یہ کیسے کام کرتا ہے",
 joinStep1:"ہماری ٹیم سے رابطہ کریں۔",
 joinStep2:"سالانہ شراکت کی رقم طے کی جاتی ہے۔",
 joinStep3:"ہمارا ایڈمن آپ کی وابستگی درج کرتا ہے۔",
 joinStep4:"آپ سال بھر آہستہ آہستہ شراکت کرتے ہیں۔",
 joinWhoTitle:"کون شامل ہو سکتا ہے؟",
 joinWhoDesc:"افراد، خاندان، پیشہ ور اور تنظیمیں — سب کا خیرمقدم ہے۔",
 joinCtaTitle:"بات چیت شروع کریں",
 joinCtaDesc:"ہماری ٹیم سے رابطہ کریں۔ ہم ذاتی طور پر آپ کی رہنمائی کریں گے۔",
 joinCtaBtn1:"ٹیم سے رابطہ کریں",
 joinCtaBtn2:"براہ راست کال کریں",

 progsHeroTitle:"ہمارے پروگرام",
 progsHeroDesc:"تعلیم، صحت اور معاشرتی ترقی میں حقیقی اثر پیدا کرنے والے پروگرام۔",
 progsEduTitle:"تعلیمی مدد",
 progsEduDesc:"پسماندہ بچوں کے لیے اسکول فیس، کتابیں اور ڈیجیٹل تعلیمی وسائل۔",
 progsHealthTitle:"صحت کی مدد",
 progsHealthDesc:"طبی کیمپ، ہنگامی علاج، مفت ادویات اور صحت سے آگاہی۔",
 progsCommunityTitle:"معاشرتی ترقی",
 progsCommunityDesc:"کھانے کی تقسیم، مہارت کی ترقی اور خواتین کو بااختیار بنانے کے اقدامات۔",
 progsCtaTitle:"کسی پروگرام کی مدد کریں؟",
 progsCtaDesc:"کسی خاص پروگرام میں عطیہ دیں یا رضاکار بنیں۔",
 footerPrivacyPolicy:"پرائیویسی پالیسی",
 footerAccountDeletion:"اکاؤنٹ ڈیلیشن",

 privacyBadge:"قانونی",
 privacyTitle:"پرائیویسی پالیسی",
 privacyDesc:"بزمِ حیدری صارف کا ڈیٹا صرف سروس میں بہتری، مواصلات اور ممبرشپ مینجمنٹ کے لیے استعمال کرتا ہے۔",
 privacySec1Title:"1. کون سا ڈیٹا جمع ہوتا ہے",
 privacySec1Desc:"ہم آپ کا نام، فون نمبر، ای میل، پتہ اور ممبرشپ/ادائیگی سے متعلق معلومات جمع کر سکتے ہیں۔",
 privacySec2Title:"2. ڈیٹا کا استعمال",
 privacySec2Desc:"یہ ڈیٹا اکاؤنٹ مینجمنٹ، ادائیگی ریکارڈ، ممبرشپ ریمائنڈر، رپورٹنگ اور صارف معاونت کے لیے استعمال ہوتا ہے۔",
 privacySec3Title:"3. ڈیٹا شیئرنگ پالیسی",
 privacySec3Desc:"قانونی ضرورت یا آپ کی اجازت کے بغیر ہم ذاتی ڈیٹا تھرڈ پارٹی مارکیٹنگ کے لیے شیئر نہیں کرتے۔",
 privacySec4Title:"4. ڈیٹا سیکیورٹی",
 privacySec4Desc:"صارف ڈیٹا کی حفاظت کے لیے ہم مناسب تکنیکی اور انتظامی حفاظتی اقدامات اپناتے ہیں۔",
 privacySec5Title:"5. صارف کے حقوق",
 privacySec5Desc:"آپ اپنا پروفائل ڈیٹا اپڈیٹ کر سکتے ہیں اور اکاؤنٹ ڈیلیشن کی درخواست دے سکتے ہیں۔",
 privacySec6Title:"6. رابطہ",
 privacySec6Desc:"پرائیویسی سے متعلق سوالات کے لیے فٹر میں دی گئی NGO رابطہ معلومات سے ہم سے رابطہ کریں۔",

 deletionBadge:"صارف معاونت",
 deletionTitle:"اکاؤنٹ ڈیلیشن کا عمل",
 deletionDesc:"اگر صارف اپنا اکاؤنٹ حذف کرنا چاہے تو نیچے دیا گیا عمل اختیار کریں۔",
 deletionStep1Title:"ڈیلیشن درخواست جمع کریں",
 deletionStep1Desc:"صارف NGO سپورٹ ٹیم کو فون یا ای میل کے ذریعے اکاؤنٹ ڈیلیشن کی درخواست بھیجے۔",
 deletionStep2Title:"شناخت کی تصدیق",
 deletionStep2Desc:"سیکیورٹی کے لیے رجسٹرڈ فون یا ای میل کے ذریعے تصدیق کی جاتی ہے۔",
 deletionStep3Title:"جائزہ اور تصدیق",
 deletionStep3Desc:"زیر التوا ادائیگیوں اور ریکارڈ کی تصدیق کے بعد حتمی منظوری دی جاتی ہے۔",
 deletionStep4Title:"اکاؤنٹ ہٹانے کا وقت",
 deletionStep4Desc:"تصدیق مکمل ہونے کے بعد 7-14 ورکنگ دنوں میں اکاؤنٹ غیر فعال/حذف کرنے کا عمل مکمل کیا جاتا ہے۔",
 deletionNote:"نوٹ: قانونی، ٹیکس یا آڈٹ ضروریات کے مطابق کچھ ٹرانزیکشن ریکارڈ محدود مدت تک محفوظ رکھے جا سکتے ہیں۔",
 },
};

export function LanguageProvider({ children, initialSettings = {} }) {
 const [lang, setLang] = useState(() => {
 if (typeof window !=="undefined") {
 return localStorage.getItem("bazm_lang") ||"en";
 }
 return"en";
 });
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
 localStorage.setItem("bazm_lang", lang);
 }, [lang]);

 const changeLanguage = (newLang) => {
 if (newLang === lang) return;
 setIsLoading(true);
 setTimeout(() => {
 setLang(newLang);
 setTimeout(() => {
 setIsLoading(false);
 }, 600); // Wait for the transition
 }, 800);
 };

  const dynamicNgoName = initialSettings.ngo_name || "Bazm-e-Haidri";

  // Override translations dynamically based on settings
  const t = {
    ...translations[lang],
    navBrand: dynamicNgoName,
    heroTitle: dynamicNgoName,
    footerAbout: translations[lang].footerAbout.replace(/Bazm-e-Haidri/g, dynamicNgoName),
    footerCopy: translations[lang].footerCopy.replace(/Bazm-e-Haidri/g, dynamicNgoName),
  };

  return (
  <LanguageContext.Provider value={{ lang, setLang, changeLanguage, isLoading, t, settings: initialSettings, ngoName: dynamicNgoName }}>
  <LanguageLoader isLoading={isLoading} ngoName={dynamicNgoName} />
  {children}
  </LanguageContext.Provider>
  );
}

export function useLanguage() {
 return useContext(LanguageContext);
}

function LanguageLoader({ isLoading, ngoName }) {
 return (
 <div
 className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 pointer-events-none ${isLoading
 ?"bg-white/80 backdrop-blur-md opacity-100"
 :"bg-white/0 backdrop-blur-none opacity-0"
 }`}
 >
 <div className={`flex flex-col items-center justify-center transform transition-all duration-700 ${isLoading ?"scale-100 opacity-100":"scale-125 opacity-0"}`}>
 <div className="relative w-20 h-20 flex items-center justify-center">
 {/* Outer Rotating Ring */}
 <div className="absolute inset-0 rounded-md border-2 border-emerald-100 border-t-emerald-800 animate-spin"></div>

 {/* Inner Pulse Icon */}
 <div className="w-12 h-12 rounded-md bg-emerald-800 flex items-center justify-center text-white animate-pulse z-10">
 <i className="fas fa-mosque text-xl"></i>
 </div>
 </div>

 {/* Text Label */}
 <div className="mt-4 text-center">
  <p className="text-emerald-900 font-bold tracking-widest text-sm animate-bounce">
  {(ngoName || "NGO HUB").toUpperCase()}
  </p>
 <div className="flex justify-center gap-1 mt-1">
 <div className="w-1.5 h-1.5 rounded-md bg-emerald-800 animate-bounce delay-0"></div>
 <div className="w-1.5 h-1.5 rounded-md bg-emerald-800 animate-bounce delay-150"></div>
 <div className="w-1.5 h-1.5 rounded-md bg-emerald-800 animate-bounce delay-300"></div>
 </div>
 </div>
 </div>
 </div>
 );
}

export function LanguageSwitcher() {
 const { lang, changeLanguage } = useLanguage();
 const langs = [
 { code:"en", label:"EN"},
 { code:"hi", label:"हिं"},
 { code:"ur", label:"اُر"},
 ];

 return (
 <div className="flex items-center bg-emerald-50 rounded-md p-0.5 border border-emerald-200">
 {langs.map((l) => (
 <button
 key={l.code}
 onClick={() => changeLanguage(l.code)}
 className={`px-2.5 py-1 text-xs rounded-md font-medium transition ${lang === l.code
 ?"bg-emerald-700 text-white"
 :"text-emerald-700 hover:bg-emerald-100"
 }`}
 >
 {l.label}
 </button>
 ))}
 </div>
 );
}
