# FitNotesForMoreGainz

## Aký problém riešim

Ľuďom, ktorí cvičia v posilňovni, chýba jednoduchý spôsob, ako si zapisovať tréningy a sledovať svoj silový progres.

## Kto sú moji používatelia

Ľudia, ktorí pravidelne cvičia v posilňovni a chcú mať svoje tréningy, cviky a výsledky prehľadne zaznamenané v mobile. Aplikácia je určená najmä pre začiatočníkov a mierne pokročilých používateľov.

## Ako problém vyriešim v MVP

MVP bude mobilná aplikácia, v ktorej používateľ môže:

- vytvoriť tréning a pridať k nemu cviky,
- zaznamenať série, opakovania, váhu a poznámku,
- pripojiť k tréningu fotku,
- načítať zoznam cvikov z Excelu a vybrať cvik z ponuky,
- po tréningu zobraziť zapojené svaly na postave spredu a zozadu,
- prezerať uložené tréningy a základné štatistiky progresu.

Dáta sa v MVP ukladajú lokálne v zariadení.

## Čo v MVP nebude (non-goals) a prečo

- **Účty používateľov a synchronizácia medzi zariadeniami** — MVP má najprv overiť základné zapisovanie tréningov bez servera a zložitej správy účtov.
- **Apple Health a GPS** — nie sú potrebné na zapisovanie silového tréningu a vyžadujú ďalšie integrácie a povolenia.
- **Stravovací plán a počítanie kalórií** — rozšírili by produkt mimo jeho hlavného účelu.
- **Sociálne funkcie, zdieľanie a súťaže** — najprv sa sústredím na osobný tréningový denník.
- **Automatické rozpoznávanie cvikov alebo svalov pomocou AI** — MVP použije údaje priradené ku cvikom v katalógu.
- **Komplexné tréningové plány a odporúčania** — najprv chcem zabezpečiť spoľahlivý zápis a prehľad histórie.

## Aké technológie potrebujem

- **React Native a Expo** — tvorba mobilnej aplikácie pre iPhone a prípadne Android.
- **JavaScript** — hlavný programovací jazyk aplikácie.
- **AsyncStorage** — lokálne ukladanie tréningov a načítaného katalógu cvikov.
- **Expo Document Picker a Expo FileSystem** — výber a načítanie Excel súboru zo zariadenia alebo dostupného úložiska.
- **SheetJS (`xlsx`)** — čítanie údajov z Excelu.
- **Expo Image Picker** — výber fotky z galérie.
- **React Native SVG** — vykreslenie postavy a zvýraznenie zapojených svalov.
- **Node.js a npm** — inštalácia balíkov a spustenie vývojového servera Expo.
