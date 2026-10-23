# Fitnotesforgainz — návrh dizajnu a technického riešenia

**Stav:** návrh na kontrolu; pred implementáciou treba potvrdiť otvorené rozhodnutia v `SPEC.md`.  
**Zásada:** tento dokument opisuje navrhovanú štruktúru a správanie; nepredpokladá konkrétny framework ani nemení existujúci kód.

## 1. Produktové zásady

- Zaznamenanie série musí byť rýchle aj s telefónom v ruke medzi sériami.
- Aktuálny tréning má mať v rozhraní prioritu pred grafmi a štatistikami.
- Zobraziť iba údaje, ktoré používateľ potrebuje pre ďalší krok.
- Zachovať používateľove záznamy; odstránenie tréningu alebo plánu má vyžadovať potvrdenie.
- Formuláre majú mať zrozumiteľné chyby a vhodné predvolené hodnoty.

## 2. Navigácia a obrazovky

### Hlavná navigácia

1. **Prehľad** — posledný tréning, rýchly začiatok a stručný stav cieľov.
2. **Tréningy** — práve prebiehajúci tréning a história dokončených tréningov.
3. **Plány** — zoznam uložených plánov a ich úprava.
4. **Cviky** — vyhľadanie a správa cvikov.
5. **Profil** — účet, jednotky a nastavenia.

Na mobile použiť spodnú navigáciu pre hlavné sekcie. Pri aktívnom tréningu zobraziť jasný návrat do tréningu bez ohľadu na aktuálnu sekciu.

### Prehľad

- Tlačidlo **Začať tréning** ako hlavná akcia.
- Rýchly prístup k posledným plánom.
- Posledné dokončené tréningy.
- Zhrnutie cieľov bez preťaženia číslami.

### Prebiehajúci tréning

- Názov a čas začiatku tréningu.
- Zoznam cvikov; pri každom cviku samostatné riadky sérií.
- Každá séria obsahuje polia **kg** a **opakovania** a akciu na označenie dokončenia.
- Akcia na pridanie série a cviku.
- Pri cviku zobraziť posledný zaznamenaný výkon ako pomôcku.
- Trvalá akcia **Ukončiť tréning**; pred ukončením upozorniť na neuložené alebo prázdne zmeny.

### História a detail tréningu

- História zoskupená podľa dátumu; záznam uvádza názov alebo dátum a počet cvikov.
- Detail tréningu zobrazuje cviky v zaznamenanom poradí, série, váhy a opakovania.
- Pri cviku ponúknuť jednoduchý graf vývoja a prehľad predchádzajúcich výkonov.

### Plány a tvorba plánu

- Zoznam plánov s možnosťou začať tréning, upraviť, skopírovať alebo odstrániť plán.
- Editor plánu umožní vyhľadať cvik, meniť poradie a nastaviť odporúčané série a opakovania.
- Plánované hodnoty sú pomôcka; pri tréningu sa dajú zmeniť.

### Cviky a profil

- Vyhľadávanie cvikov je dostupné aj priamo pri pridávaní cviku do tréningu alebo plánu.
- Vlastné cviky sú rozlíšené od predvolených.
- V profile sa dajú meniť jednotky a základné nastavenia účtu.

## 3. Návrh dátového modelu

Všetky používateľské záznamy obsahujú `user_id` a overujú vlastníctvo na serveri.

### `User`

- `id`
- `email`
- `display_name` (voliteľné)
- `preferred_weight_unit` (predvolene kg)
- `created_at`

### `Exercise`

- `id`
- `owner_user_id` (prázdne pre spoločný predvolený cvik)
- `name`
- `muscle_group` (voliteľné)
- `equipment` (voliteľné)
- `created_at`

### `WorkoutPlan`

- `id`
- `user_id`
- `name`
- `description` (voliteľné)
- `created_at`, `updated_at`

### `WorkoutPlanExercise`

- `id`
- `plan_id`
- `exercise_id`
- `position`
- `target_sets` (voliteľné)
- `target_reps` (voliteľné)
- `target_weight` (voliteľné)

### `Workout`

- `id`
- `user_id`
- `plan_id` (voliteľné)
- `name` (voliteľné)
- `started_at`
- `ended_at` (prázdne počas tréningu)
- `status` (napr. `in_progress`, `completed`)

### `WorkoutExercise`

- `id`
- `workout_id`
- `exercise_id`
- `position`
- `notes` (voliteľné)

### `WorkoutSet`

- `id`
- `workout_exercise_id`
- `set_number`
- `weight` (voliteľné)
- `repetitions` (voliteľné)
- `completed_at` (voliteľné)

### `Goal`

- `id`
- `user_id`
- `type`
- `title`
- `target_value` (voliteľné podľa typu cieľa)
- `exercise_id` (voliteľné)
- `target_date` (voliteľné)
- `status`
- `created_at`, `updated_at`

## 4. Návrh aplikačnej štruktúry

- **Používateľské rozhranie:** stránky pre prehľad, tréning, históriu, plány, cviky a profil; opakovane použiteľné formuláre série a výberu cviku.
- **Aplikačná logika:** pravidlá pre vytvorenie a úpravu tréningu, výpočet pokroku a validáciu vstupov.
- **Dátová vrstva:** trvalé uloženie používateľských účtov, plánov, tréningov a sérií s kontrolou prístupu podľa vlastníka.
- **Autentifikácia a autorizácia:** prístup k súkromným dátam iba po prihlásení; vlastníctvo sa kontroluje pri každom čítaní aj zápise.

Konkrétne rozdelenie do modulov, framework, databáza a API sa doplnia po preskúmaní existujúceho repozitára a rozhodnutí z otvorených otázok v `SPEC.md`.

## 5. Návrh rozhraní API

Ak aplikácia používa HTTP API, navrhované operácie sú:

- `GET /api/exercises` — vyhľadanie dostupných a vlastných cvikov.
- `POST /api/exercises` — vytvorenie vlastného cviku.
- `GET /api/plans` a `POST /api/plans` — zoznam a vytvorenie plánov.
- `GET /api/plans/{id}`, `PATCH /api/plans/{id}`, `DELETE /api/plans/{id}` — detail a správa plánu.
- `GET /api/workouts` a `POST /api/workouts` — história a začatie tréningu.
- `GET /api/workouts/{id}`, `PATCH /api/workouts/{id}` — detail a priebežná aktualizácia tréningu.
- `POST /api/workouts/{id}/exercises` — pridanie cviku do tréningu.
- `POST /api/workout-exercises/{id}/sets` a `PATCH /api/sets/{id}` — pridanie alebo úprava série.
- `POST /api/workouts/{id}/complete` — ukončenie tréningu.
- `GET /api/exercises/{id}/history` — história výkonu pri cviku.
- `GET /api/goals`, `POST /api/goals`, `PATCH /api/goals/{id}`, `DELETE /api/goals/{id}` — správa cieľov.

Každá operácia pracuje s identitou prihláseného používateľa; klient neposiela dôveryhodné `user_id` ako náhradu serverovej kontroly prístupu.

## 6. Validácia a chybové stavy

- Počet opakovaní musí byť celé nezáporné číslo; váha musí byť nezáporné číslo s presnosťou určenou zvolenou jednotkou.
- Názov plánu a cviku nesmie byť prázdny.
- Tréning možno obnoviť, ak je jeho stav `in_progress`.
- Pri výpadku spojenia sa zmena nesmie potichu stratiť; rozhranie oznámi, či bola uložená. Správanie offline režimu treba potvrdiť.
- Pri nedostatočných oprávneniach server vráti bezpečnú chybu bez prezradenia cudzieho záznamu.

## 7. Implementačné kroky

1. Preskúmať existujúci projekt, jeho technológie, autentifikáciu a dátový model.
2. Potvrdiť otvorené rozhodnutia v `SPEC.md` a zosúladiť tento návrh s existujúcim riešením.
3. Implementovať účty, oprávnenia a základný model cvikov a plánov.
4. Implementovať začatie, priebežné ukladanie a ukončenie tréningu.
5. Implementovať históriu a detail tréningu.
6. Doplniť pokrok, osobné rekordy a ciele.
7. Overiť kritériá prijatia z `SPEC.md` na mobilnom aj desktopovom rozložení.
