import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';
import * as XLSX from 'xlsx';

const KLUC_CVIKOV = 'fitnotes-exercises';

function normalizuj(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function svalNaId(nazov) {
  const sval = normalizuj(nazov);

  const mapovanie = {
    kvadricepsy: 'quadriceps',
    'zadne stehna': 'hamstrings',
    zadok: 'glutes',
    'stred tela': 'abs',
    hrudnik: 'chest',
    triceps: 'triceps',
    biceps: 'biceps',
    ramena: 'frontDelts',
    'predne ramena': 'frontDelts',
    'zadne ramena': 'rearDelts',
    'siroky chrbtovy sval': 'lats',
    chrbat: 'lats',
    'spodny chrbat': 'lowerBack',
    'vnútorne stehna': 'adductors',
    'vnutorne stehna': 'adductors',
    'vonkajsie stehna': 'abductors',
    'roznozovace bedra': 'abductors',
    lytka: 'calves',
    predlaktia: 'forearms',
    tibialis: 'tibialis',
  };

  return mapovanie[sval] || null;
}

export async function nacitajCviky() {
  try {
    const ulozene = await AsyncStorage.getItem(KLUC_CVIKOV);
    return ulozene ? JSON.parse(ulozene) : [];
  } catch (chyba) {
    console.log('Cviky sa nepodarilo načítať.', chyba);
    return [];
  }
}

export async function vyberExcelACviky() {
  const vysledok = await DocumentPicker.getDocumentAsync({
    type: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ],
    copyToCacheDirectory: true,
  });

  if (vysledok.canceled) {
    return null;
  }

  const subor = new File(vysledok.assets[0].uri);
  const data = await subor.arrayBuffer();
  const zošit = XLSX.read(data, { type: 'array' });
  const nazovHarku = zošit.SheetNames[0];

  if (!nazovHarku) {
    throw new Error('Excel súbor neobsahuje žiadny hárok.');
  }

  const riadky = XLSX.utils.sheet_to_json(
    zošit.Sheets[nazovHarku],
    { header: 1, defval: '' }
  );

  const hlavicka = riadky[0].map(normalizuj);

  if (
    hlavicka[0] !== 'english name' ||
    hlavicka[1] !== 'slovensky nazov'
  ) {
    throw new Error(
      'V prvom riadku Excelu očakávam stĺpce English name a Slovenský názov.'
    );
  }

  const nacitaneCviky = riadky
    .slice(1)
    .filter((riadok) => riadok[0] && riadok[1])
    .map((riadok) => {
      const nazvySvalov = riadok.slice(2, 5).filter(Boolean);
      const muscles = [
        ...new Set(nazvySvalov.map(svalNaId).filter(Boolean)),
      ];

      return {
        english: String(riadok[0]).trim(),
        slovak: String(riadok[1]).trim(),
        muscleNames: nazvySvalov.map(String),
        muscles,
      };
    });

  if (nacitaneCviky.length === 0) {
    throw new Error('V Exceli som nenašiel žiadne cviky.');
  }

  await AsyncStorage.setItem(
    KLUC_CVIKOV,
    JSON.stringify(nacitaneCviky)
  );

  return nacitaneCviky;
}
