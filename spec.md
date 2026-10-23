# Fitnotesforgainz — špecifikácia požiadaviek

**Stav:** pracovný návrh na schválenie  
**Verzia:** 0.1

## 1. Účel aplikácie

Fitnotesforgainz pomáha používateľovi plánovať silové tréningy, zaznamenávať ich priebeh a sledovať dlhodobý pokrok. Používateľ má vedieť rýchlo začať tréning, priebežne zapisovať série a neskôr si pozrieť, čo cvičil a ako sa jeho výkon menil.

## 2. Problém

Bez jednoduchého záznamu sa ťažko pamätajú použité váhy, série a opakovania. Používateľ preto nevie spoľahlivo nadviazať na predchádzajúci tréning ani vyhodnotiť, či sa zlepšuje.

## 3. Používatelia a roly

- **Používateľ:** spravuje svoje cviky, tréningové plány, tréningy a ciele.
- **Administrátor:** v prvej verzii nie je samostatná administrátorská rola súčasťou rozsahu.

## 4. Funkčné požiadavky

### 4.1 Účet a osobné údaje

1. Používateľ si môže vytvoriť účet, prihlásiť sa a odhlásiť sa.
2. Používateľ môže zobraziť a upraviť základné nastavenia svojho profilu.
3. Každý používateľ vidí a upravuje iba svoje vlastné tréningové dáta.

### 4.2 Knižnica cvikov

1. Používateľ môže vyhľadať cvik podľa názvu.
2. Používateľ môže filtrovať cviky podľa svalovej partie a typu vybavenia, ak sú tieto údaje dostupné.
3. Používateľ môže vytvoriť vlastný cvik a uviesť jeho názov a voliteľnú svalovú partiu.

### 4.3 Tréningové plány

1. Používateľ môže vytvoriť plán s názvom a voliteľným popisom.
2. Do plánu môže pridávať cviky, meniť ich poradie a nastaviť plánovaný počet sérií a opakovaní.
3. Používateľ môže plán upraviť, skopírovať alebo odstrániť.
4. Používateľ môže začať tréning z uloženého plánu.

### 4.4 Zaznamenávanie tréningu

1. Používateľ môže začať tréning naprázdno alebo z uloženého plánu.
2. Počas tréningu môže pridať, upraviť alebo odstrániť cvik.
3. Pri každom cviku môže zaznamenať jednotlivé série s váhou a počtom opakovaní.
4. Používateľ môže tréning priebežne uložiť a následne ho ukončiť.
5. Aplikácia zobrazí predchádzajúce zaznamenané hodnoty cviku, ak sú k dispozícii.
6. Po ukončení tréningu sa tréning zobrazí v histórii.

### 4.5 História a pokrok

1. Používateľ môže zobraziť svoje tréningy zoradené od najnovšieho.
2. Používateľ môže otvoriť tréning a skontrolovať dátum, cviky, série, váhy a opakovania.
3. Používateľ môže zobraziť vývoj zaznamenanej váhy alebo počtu opakovaní pre konkrétny cvik.
4. Aplikácia označí osobný rekord, keď používateľ dosiahne vyššiu zaznamenanú váhu pri danom cviku.

### 4.6 Ciele

1. Používateľ môže vytvoriť, upraviť a odstrániť osobný cieľ.
2. Cieľ môže byť zameraný na tréningovú pravidelnosť alebo výkon pri cviku.
3. Pri cieli môže používateľ zadať cieľovú hodnotu a voliteľný termín.
4. Aplikácia zobrazí stav cieľa a dostupný pokrok vypočítaný zo zaznamenaných údajov.

## 5. Nefunkčné požiadavky a obmedzenia

- Rozhranie má byť použiteľné na mobilnom telefóne aj počítači.
- Zaznamenávanie série má vyžadovať čo najmenej krokov a nemá nútiť používateľa vypĺňať nepovinné údaje.
- Používateľské rozhranie a predvolené jednotky majú byť v slovenčine a v metrickej sústave.
- Údaje jedného účtu nesmú byť dostupné inému používateľovi.
- Konkrétny technologický stack, spôsob nasadenia a požiadavky na offline režim zatiaľ nie sú potvrdené.

## 6. Mimo rozsahu prvej verzie

- Sociálna sieť, zdieľanie tréningov a verejné profily.
- Platené predplatné alebo nákupy v aplikácii.
- Integrácia s inteligentnými hodinkami a externými fitness službami.
- Automaticky generované tréningové plány alebo zdravotné odporúčania.
- Pokročilé výživové denníky.

## 7. Kritériá prijatia prvej verzie

1. Nový používateľ si vie vytvoriť účet a dostať sa do svojho prehľadu.
2. Používateľ vie vytvoriť plán a spustiť z neho tréning.
3. Používateľ vie počas tréningu uložiť viac cvikov a pri každom viac sérií s váhou a opakovaniami.
4. Po ukončení sa tréning zobrazuje v histórii aj po opätovnom prihlásení.
5. Používateľ vie otvoriť detail minulého tréningu a zobraziť predchádzajúci výkon pri cviku.
6. Používateľ nevie zobraziť ani upraviť tréningové dáta iného účtu.
7. Základné obrazovky sa dajú používať na úzkom mobilnom displeji.

## 8. Otvorené otázky

- Aké technológie a databázu používa existujúca aplikácia?
- Má byť registrácia otvorená, alebo budú účty vytvárané pozvánkou?
- Majú sa podporovať aj libry, telesná hmotnosť, čas a vzdialenosť ako typy merania?
- Má sa tréning automaticky ukladať po každej zmene?
- Potrebuje aplikácia fungovať bez internetového pripojenia?
- Ako presne definovať osobný rekord: najvyššia váha, objem, počet opakovaní alebo samostatný rekord podľa typu cviku?
- Má sa cieľ pravidelnosti počítať podľa týždňa, kalendárneho mesiaca alebo používateľom zvoleného obdobia?
