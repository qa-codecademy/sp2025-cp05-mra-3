Za integriranje na multilingual dropdown vo navbar od ticket navBar#9					
    Vo contact.html, kopiran e block nav od navBar#10 I vo nego vo poslednoto li celosniot div e zamenet so nov.				
        Vo celtiot block nav se dodadeni se potrebnite klasi kaj site elementi koi prikazuvaat text koj zavisi od izborot na jazik na aplikacijata.			
    Vo main.js e celosno prevzement kodot od main.js na navBar#9, no delot koj se odnesuva na language selector dropdown e zakomentiran.				
    Blokot header, od contact.html e spremen da se kopira vo site preostanati .html strani.				
                    
Za integriranje na multilingual vo display text od footer od ticket Footer#10					
    Celosniot kod za footer od Footer#10 e staven kako footer vo contact.html				
        Vo nego dodadeni se potrebnite klasi kaj site elementi koi prikazuvaat text koj zavisi od izborot na jazik na aplikacijata.			
    Blokot footer, od contact.html e spremen da se kopira vo site preostanati .html strani.				

Za integriranje na multilingual vo display text vo homePage.html od ticket Hero-section#8		
    Kako sto pogore e objasneto sredenite header I footer se kopirani tuka, zaedno so celosniot kod za section hero od Hero-section#8 od homePage.html I homePage.css.	
        Vo nego dodadeni se potrebnite klasi kaj site elementi koi prikazuvaat text koj zavisi od izborot na jazik na aplikacijata.
                    
Kreiran e main.css koj sodrzi:					
    blok namenet za footer, prevzemen kompletno od ticket Footer#10 so napraveni minimalni korekcii vo pozicioniranje I otstraneti nepostoecki klasi.				
    blok namenet za header, prevzemen od ticket navBar#9, so promena vo delot koj se odnesuva na language selector dropdown.				
                    
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