import * as ImagePicker from 'expo-image-picker';

export async function odfotit() {
  const povolenie = await ImagePicker.requestCameraPermissionsAsync();

  if (!povolenie.granted) {
    return null;
  }

  const vysledok = await ImagePicker.launchCameraAsync({
    mediaTypes: ['images'],
    quality: 0.8,
  });

  if (vysledok.canceled) {
    return null;
  }

  return vysledok.assets[0].uri;
}

export async function vybratZGalerie() {
  const povolenie = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!povolenie.granted) {
    return null;
  }

  const vysledok = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.8,
  });

  if (vysledok.canceled) {
    return null;
  }

  return vysledok.assets[0].uri;
}
