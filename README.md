Patrik Eriksson

Repo:
https://github.com/patrik909/foodAPI

Live:
https://patrik909.github.io

Randomize Your Dinner är en app för dig som inte vet vad du ska äta till middag, jag tror att vi alla har varit där någon gång.

Du kan slumpa en maträtt genom en redan inbyggd funktion i API't: https://www.themealdb.com/api/json/v1/1/random.php

Först får du bara titeln samt vilken kategori matträtten tillhör, låter det intressant kan du klicka dig vidare till receptet eller testa din lycka igen.

När receptet visas görs inte ett till fetch anrop, all info hämtades redan i första anropet.

Om du tycker receptet är intressant men vill titta på fler i kategorin. Kan du se relaterade maträtter i samma kategori: 
https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

Här byter jag ut sökordet till strCategory vilket är nyckeln för kategorin i första objekten.

Med hjälp av id't som finns listan tillsammans med namnet kan man klicka sig vidare och göra yttligare ett fetch anrop till med valda id't istället för det statiska id't i exemplet: 

https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
  
Här visas allt content precis som i den tidigare Read More funktionen.


Har mest använt mig av Flexbox och gjort lite övergånger med animationer.


TODO:

* Save funktion så att användaren kan spara intressanta maträtter.

* Cache funktion.

* Animation som visar att sidan laddas om fetch anropet väntar.

* Gör så att objekt fade'as ut en efter en istället för allt innehåll på en gång.

* Snyggare CSS.

* Det är lite kod upprepningar då ReadMore funktionerna gör i stortsett samma sak.

* SASS.