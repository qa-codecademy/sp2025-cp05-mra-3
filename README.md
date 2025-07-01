Za integriranje na multilingual dropdown vo navbar od ticket navBar#9					
    Vo contact.html, kopiran e block nav od navBar#10 I vo nego vo poslednoto li celosniot div e zamenet so nov.				
        Vo celtiot block nav se dodadeni se potrebnite klasi kaj site elementi koi prikazuvaat text koj zavisi od izborot na jazik na aplikacijata.			
    Vo main.js e celosno prevzement kodot od main.js na navBar#9, no delot koj se odnesuva na language selector dropdown e zakomentiran.	
        Napravena e promena da ako user e logiran odnosno ima ima vrednost za localStorage isLoggedIn da vodi do admin.html, a ako nema da vodi do homepage.html			
    Blokot header, od contact.html e spremen da se kopira vo site preostanati .html strani.				
                    
Za integriranje na multilingual vo display text od footer od ticket Footer#10					
    Celosniot kod za footer od Footer#10 e staven kako footer vo contact.html				
        Vo nego dodadeni se potrebnite klasi kaj site elementi koi prikazuvaat text koj zavisi od izborot na jazik na aplikacijata.			
    Blokot footer, od contact.html e spremen da se kopira vo site preostanati .html strani.				

Za integriranje na multilingual vo display text vo homePage.html od ticket Hero-section#8		
    Kako sto pogore e objasneto sredenite header I footer se kopirani tuka, zaedno so celosniot kod za section hero od Hero-section#8 od homePage.html I homePage.css.	
        Vo nego dodadeni se potrebnite klasi kaj site elementi koi prikazuvaat text koj zavisi od izborot na jazik na aplikacijata.

Za integriranje na multilingual vo display text vo services.html od ticket dynamic-cards-services#2	
    Kako sto pogore e objasneto sredenite header I footer se kopirani tuka, zaedno so celosniot kod za section za cards od services.html.
    Celosnite kodovi od services.js I services.css se isto taka kopirani od dynamic-cards-services#2.
    Zakomentiran e kodot od ticket dynamic-cards-services#2 I vo services.html, I vo services.js, I vo services.css, za da ne pojavuva konflikti I da moze da se prodolzi so rabota na toj tiket I da se integrira vo aplikacijata soodvetno. 
                    
Kreiran e main.css koj sodrzi:					
    blok namenet za footer, prevzemen kompletno od ticket Footer#10 so napraveni minimalni korekcii vo pozicioniranje I otstraneti nepostoecki klasi.				
    blok namenet za header, prevzemen od ticket navBar#9, so promena vo delot koj se odnesuva na language selector dropdown.				

Za integriranje na multilingual vo display text vo aboutUs.html	
    Kako sto pogore e objasneto sredenite header I footer se kopirani tuka, so cel da se oformi strukturata na <body> kade kje ima sekcii za header, main I footer.
    Potrebno e da se dodade nekoja slika ili tekst vo main delot za da lici kako sto treba.

Za integriranje na multilingual vo display text vo reviews.html		
    Kako sto pogore e objasneto sredenite header I footer se kopirani tuka.	
    Kreiran e celosen sistem za pisuvanje na reviews od strana na posetiteli na stranata reviews.html, zaedno so reviews.css.	
    Vo contact.html I vo contact.js e kreiran sistem za da moze da se poglednat site reviews koi se dobieni I istite da se izmenuvaat vo property public so koe kje se odreduva dali nekoj review kje se prikaze javno ili ne.	
        Ne sakame site reviews da bidat prikazani javno, bidejki ne sme sigurni dali kje ni odgovara sodrzinata sto nekoj posetitel kje ja napise za nasata rabota.

VAZNO:
    1. Koga vo main.css ili main.js se dodava kod treba, pocetokot I krajot na noviot kod, so komentiranje da se oznaci na sto se odnesuva… 				
    2. Za da kodot se loadira po pravilen redosled I se da funkcionira treba, koga se integriraat .css I .js file-ovite da bidat na sledniot nacin:				
        najgore vo <head> da bidat .css po sledniot redosled			
            <head>		
              <meta charset="UTF-8">		
              <meta name="viewport" content="width=device-width, initial-scale=1.0">		
              <title>Page</title>		
              <link rel="stylesheet" href="../css/main.css">		
              <link rel="stylesheet" href="../css/page.css">		
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">		
            </head>		
        najdolu pred </body> da bidat .js po sledniot redosled			
              <script src="../scripts/page.js"></script>		
              <script src="../scripts/main.js"></script>		
              <script src="../modules/multilingual.js"></script>		
            </body>		
    3. Koga treba da se stavaat kartickite koi kje se renderiraat na services.html, treba tie da se kreiraat vo stranata contact.html				
    4. Koga nekoj tekst treba da se prikaze na ekran preku nekoj element mora:				
        toj element da ima klasi onscreenText pagenamehtmlUniquename 			
        tekstot koj treba da se prikaze ne se pisuva pomegju otvoracki I zatvaracki tag na toj element			
        tekstot koj treba da se prikaze treba da se prevede na germanski, angliski I makedonski I istiot direktno da se vnese vo file-ot contents.json vo data folderot			
        Primer:			
            Ako treba na homePage.html preku p tag da se ispise tekst "Home", treba: 		
                Namesto      <p>Home</p>	
                Da se vpise     <p class="onscreenText homepagehtmlHome"></p>	
                Vo contents.json da se dodade	
                      {
                        "id": "homepagehtmlHome",
                        "german": "Heim",
                        "english": "Home",
                        "macedonian": "Дома"
                      }
    5. Strukturata na branch-ata e MVC patern, odnosno, za da se testira otkako kje se merge-ne, prvo treba da se izvrsi npm install, potoa npm run dev, i se pristapuva preku API so http://localhost:3000/pagename.html