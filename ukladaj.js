import AsyncStorage from '@react-native-async-storage/async-storage';

const KLUC_TRENINGOV = 'fitnotes-workouts';

export async function nacitajTreningy() {
  try {
    const ulozeneData = await AsyncStorage.getItem(KLUC_TRENINGOV);

    if (!ulozeneData) {
      return [];
    }

    return JSON.parse(ulozeneData);
  } catch (chyba) {
    console.log('Tréningy sa nepodarilo načítať.', chyba);
    return [];
  }
}

export async function ulozTreningy(treningy) {
  try {
    await AsyncStorage.setItem(KLUC_TRENINGOV, JSON.stringify(treningy));
  } catch (chyba) {
    console.log('Tréningy sa nepodarilo uložiť.', chyba);
  }
}
