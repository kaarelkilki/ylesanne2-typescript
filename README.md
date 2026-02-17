# Ülesanne 1

Konsoolirakendus: prindib Store Analytics raporti.

Teie lahendus peab:

olema TypeScriptis ja korrektselt tüübitud (interfaces/types);
sisaldama vähemalt: tooted, tarnijad, laoseis ladude kaupa, arvustused, soodustuse reeglid;
arvutama välja: saadav kogus (available), keskmine hinne, laoseisu staatus, soodushind;
kuvama ka specifications (kui need on olemas), võtme-väärtuse paaridena;
Vormindamine on osa ülesandest: hinnad 2 komakohta, reavahed ja tekstid peavad klappima.

Raportis kasutatavad arvutused peavad vastama järgmistele reeglitele:

1. Stock status

   0 - OUT

   1..2 - LOW

   3+ - IN_STOCK

2. Average rating

   Kui arvustusi ei ole - näidake tekstina no reviews

   Kui on arvustused - keskmine hinne 2 komakohaga

3. Discount rules (soodustus)

   Soodustus rakendub kategooria järgi.

   Mõnel reeglil on minRating: soodustus rakendub ainult siis, kui keskmine hinne on vähemalt see väärtus.

   Kui soodustus rakendub, näidake price: X -> Y, muidu ainult price: X.

   Hinnad ümardage 2 komakohani.

4. Specifications

   Kui tootel on specs, siis printige need kujul: specs: key=value, key=value, ...

   Kui specs puuduvad, siis seda osa reas ei ole.

# Ülesanne 2

Looge TypeScriptis interaktiivne veebirakendus, mis:

    - kuvab toodete nimekirja,

    - võimaldab lisada uusi tooteid,

    - arvutab laoseisu staatuse,

    - võimaldab filtreerida või sorteerida,

    - salvestab andmed LocalStorage’i,

    - taastab andmed pärast lehe värskendamist.

    - looma elemendid dünaamiliselt (mitte kirjutama HTML-i käsitsi ette),

Visuaalne lahendus on teie looming.

Hea lahendus:

    - kontrollib sisendi korrektsust,

    - käsitleb null väärtusi,

    - ei dubleeri koodi,

    - hoiab andmete ja DOM-i loogika eraldi,

    - kasutab tüüpe teadlikult.

# Projekti seadistamine

```bash
npm install
```

# Ülesanne 1 - Kontrollimise sammud

## Variant 1: Node.js konsoolis

```bash
npm run build
npm start
```

Väljund ilmub terminali.

## Variant 2: Brauseri konsoolis (nagu näidis)

1. **Kompileeri kood:**

   ```bash
   npm run build
   ```

2. **Käivita lokaalne server:**

   ```bash
   npx http-server . -p 3000
   ```

3. **Ava brauser:**
   - Mine aadressile: `http://localhost:3000/test.html`
   - Vajuta **F12** (Chrome DevTools)
   - Vaata **Console** tab'i

Raport kuvatakse nii lehel kui ka brauseri konsooliaknas.

## Projekti struktuur

```
src/
├── types/index.ts          # Kõik TypeScript tüübid ja interface'id
├── data/mockData.ts        # Näidisandmed (tooted, tarnijad, laoseis, jne)
├── utils/
│   ├── calculations.ts     # Arvutusfunktsioonid (stock, ratings, discounts)
│   └── storage.ts          # LocalStorage funktsioonid
├── console/report.ts       # Ülesanne 1: konsooliraport
└── web/
    ├── app.ts              # Ülesanne 2: rakenduse loogika
    ├── dom.ts              # DOM manipulatsioon
    ├── index.html          # HTML struktuur
    └── styles.css          # Stiilid
```

# Ülesanne 2 - Kontrollimise sammud

## Variant 1: Kohalik testimine

1. **Kompileeri kood:**

   ```bash
   npm run build
   ```

2. **Käivita lokaalne server:**

   ```bash
   npx http-server . -p 3000
   ```

3. **Ava brauser:**
   - Mine aadressile: `http://localhost:3000/src/web/index.html`
   - Rakendus laadib automaatselt mock-andmed LocalStorage'i
   - Testimise võimalused:
     - Lisa uusi tooteid (vorm kontrollib sisendi korrektsust)
     - Filtreeri tooteid laoseisu või kategooria järgi
     - Sorteeri tooteid erinevate kriteeriumite järgi
     - Kustuta tooteid
     - Värskenda lehte - andmed peavad püsima (LocalStorage)
     - Vajuta "Taasta algandmed" - algandmed taastatakse

## Variant 2: Funktsionaalsuse kontroll

Rakendus peaks täitma järgmised nõuded:

1. **Toodete kuvamine:**
   - Kõik tooted kuvatakse dünaamiliselt loodud kaartidena
   - Iga toote kaart näitab: nimi, kategooria, hind, laoseis
   - Laoseisu staatus arvutatakse automaatselt (OUT/LOW/IN_STOCK)
   - Värviline indikaator laoseisu staatuse jaoks

2. **Uue toote lisamine:**
   - Vorm kontrollib sisendi korrektsust (kohustuslikud väljad, hinna valideerimine)
   - Lisa nupu vajutamisel ilmub uus toode kohe nimekirja
   - Vorm tühjendatakse pärast edukat lisamist
   - Eduteade kuvatakse kasutajale

3. **Filtreerimine:**
   - Saab filtreerida laoseisu järgi (IN_STOCK, LOW, OUT)
   - Saab filtreerida kategooria järgi
   - "Kõik tooted" näitab kõiki tooteid

4. **Sorteerimine:**
   - Nime järgi (tähestikuline)
   - Hinna järgi (odavamad/kallimad enne)
   - Kategooria järgi
   - Laoseisu järgi

5. **LocalStorage:**
   - Andmed salvestatakse automaatselt LocalStorage'i
   - Lehe värskendamisel andmed taastatakse
   - "Taasta algandmed" nupp taastab mock-andmed

6. **Kustutamine:**
   - Iga toote kaardil on kustuta nupp
   - Kustutamine eemaldab toote nii vaates kui LocalStorage'ist
   - Kustutamise kohta kuvatakse teade

7. **Kood vastab headele tavadele:**
   - TypeScript tüübid korrektselt kasutatud
   - Andmete loogika ja DOM loogika on eraldi failides
   - Sisend valideeritakse
   - Null väärtusi käsitletakse korrektselt
   - Kood ei ole dubleeritud
