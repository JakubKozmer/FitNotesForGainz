import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

import { nacitajTreningy, ulozTreningy } from './ukladaj';
import { vybratZGalerie } from './fotky';
import { nacitajCviky, vyberExcelACviky } from './cviky';

const SVALY = {
  quadriceps: 'Kvadricepsy',
  hamstrings: 'Zadné stehná',
  glutes: 'Zadok',
  abs: 'Stred tela',
  chest: 'Hrudník',
  triceps: 'Triceps',
  biceps: 'Biceps',
  frontDelts: 'Predné ramená',
  rearDelts: 'Zadné ramená',
  lats: 'Široký chrbtový sval',
  lowerBack: 'Spodný chrbát',
  adductors: 'Vnútorné stehná',
  abductors: 'Vonkajšie stehná',
  calves: 'Lýtka',
  forearms: 'Predlaktia',
  tibialis: 'Predná časť predkolenia',
};

const NAKRES_POSTAVY = {
  front: {
    chest: [
      'M29 61 Q39 53 48 61 L48 79 Q38 84 29 76 Z',
      'M52 61 Q61 53 71 61 L71 76 Q62 84 52 79 Z',
    ],
    frontDelts: [
      'M27 56 Q31 50 38 56 L35 66 Q29 67 27 56 Z',
      'M62 56 Q69 50 73 56 Q71 67 65 66 Z',
    ],
    biceps: [
      'M22 70 Q27 67 30 75 L27 91 Q23 94 21 87 Z',
      'M70 75 Q73 67 78 70 L79 87 Q77 94 73 91 Z',
    ],
    triceps: [
      'M19 72 Q22 69 24 75 L22 88 L19 86 Z',
      'M76 75 Q78 69 81 72 L81 86 L78 88 Z',
    ],
    forearms: [
      'M17 94 Q21 91 25 96 L23 117 L18 119 Z',
      'M75 96 Q79 91 83 94 L82 119 L77 117 Z',
    ],
    abs: [
      'M43 84 L49 84 L49 94 L43 94 Z',
      'M51 84 L57 84 L57 94 L51 94 Z',
      'M43 96 L49 96 L49 106 L43 106 Z',
      'M51 96 L57 96 L57 106 L51 106 Z',
      'M43 108 L49 108 L49 117 L43 117 Z',
      'M51 108 L57 108 L57 117 L51 117 Z',
    ],
    adductors: [
      'M46 143 L50 143 L50 178 L45 172 Z',
      'M50 143 L54 143 L55 172 L50 178 Z',
    ],
    abductors: [
      'M29 137 L35 139 L36 160 L32 166 L28 153 Z',
      'M65 139 L71 137 L72 153 L68 166 L64 160 Z',
    ],
    hamstrings: [
      'M33 146 L48 145 L47 183 L35 183 Z',
      'M52 145 L67 146 L65 183 L53 183 Z',
    ],
    quadriceps: [
      'M32 139 Q41 136 48 141 L47 181 L34 181 Q30 160 32 139 Z',
      'M52 141 Q59 136 68 139 Q70 160 66 181 L53 181 Z',
    ],
    glutes: [
      'M32 126 Q40 122 49 128 L49 143 L34 145 Z',
      'M51 128 Q60 122 68 126 L66 145 L51 143 Z',
    ],
    calves: [
      'M35 205 L45 205 L44 242 L37 242 Z',
      'M55 205 L65 205 L63 242 L56 242 Z',
    ],
    tibialis: [
      'M31 207 L36 208 L36 239 L32 239 Z',
      'M64 208 L69 207 L68 239 L64 239 Z',
    ],
  },
  back: {
    traps: [
      'M39 54 L50 57 L50 77 L42 72 Z',
      'M50 57 L61 54 L58 72 L50 77 Z',
    ],
    rearDelts: [
      'M27 57 Q32 51 39 57 L36 68 L29 68 Z',
      'M61 57 Q68 51 73 57 L71 68 L64 68 Z',
    ],
    lats: [
      'M39 72 L49 77 L47 106 L39 112 L34 93 Z',
      'M51 77 L61 72 L66 93 L61 112 L53 106 Z',
    ],
    triceps: [
      'M21 70 Q26 67 29 73 L26 92 L21 90 Z',
      'M71 73 Q74 67 79 70 L79 90 L74 92 Z',
    ],
    forearms: [
      'M17 94 Q21 91 25 96 L23 117 L18 119 Z',
      'M75 96 Q79 91 83 94 L82 119 L77 117 Z',
    ],
    lowerBack: [
      'M43 106 L49 106 L49 126 L42 124 Z',
      'M51 106 L57 106 L58 124 L51 126 Z',
    ],
    glutes: [
      'M32 126 Q40 122 49 128 L49 143 L34 145 Z',
      'M51 128 Q60 122 68 126 L66 145 L51 143 Z',
    ],
    hamstrings: [
      'M33 146 L48 145 L47 183 L35 183 Z',
      'M52 145 L67 146 L65 183 L53 183 Z',
    ],
    abductors: [
      'M29 132 L35 135 L37 157 L32 163 L28 149 Z',
      'M65 135 L71 132 L72 149 L68 163 L63 157 Z',
    ],
    calves: [
      'M35 205 L45 205 L44 242 L37 242 Z',
      'M55 205 L65 205 L63 242 L56 242 Z',
    ],
  },
};

function normalizuj(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function najdiCvik(vsetkyCviky, nazov) {
  const hladanyNazov = normalizuj(nazov);

  return vsetkyCviky.find(
    (cvik) =>
      normalizuj(cvik.english) === hladanyNazov ||
      normalizuj(cvik.slovak) === hladanyNazov
  );
}

function getMuscles(workout) {
  const svaly = new Set();

  for (const exercise of workout.exercises || []) {
    (exercise.muscles || []).forEach((muscle) => svaly.add(muscle));
  }

  return [...svaly];
}

function BodyFigure({ side, activeMuscles }) {
  const activeSet = new Set(activeMuscles);

  return (
    <View style={styles.figureColumn}>
      <Text style={styles.figureTitle}>
        {side === 'front' ? 'Spredu' : 'Zozadu'}
      </Text>

      <Svg width={132} height={290} viewBox="0 0 100 270">
        <Circle cx="50" cy="25" r="13" fill="#343A30" />
        <Rect x="44" y="37" width="12" height="15" rx="4" fill="#343A30" />

        <Path
          d="M34 49 Q50 44 66 49 L77 63 L69 91 L66 128 L71 143 L64 151 L36 151 L29 143 L34 128 L31 91 L23 63 Z"
          fill="#343A30"
        />
        <Path
          d="M26 54 Q20 55 17 65 L12 92 L17 96 L23 78 L31 66 Z"
          fill="#343A30"
        />
        <Path
          d="M74 54 Q80 55 83 65 L88 92 L83 96 L77 78 L69 66 Z"
          fill="#343A30"
        />
        <Path
          d="M37 145 L49 146 L47 187 L44 205 L43 244 L34 244 L33 207 L29 184 Z"
          fill="#343A30"
        />
        <Path
          d="M51 146 L63 145 L71 184 L67 207 L66 244 L57 244 L56 205 L53 187 Z"
          fill="#343A30"
        />
        <Ellipse cx="38" cy="251" rx="9" ry="5" fill="#343A30" />
        <Ellipse cx="62" cy="251" rx="9" ry="5" fill="#343A30" />

        {Object.entries(NAKRES_POSTAVY[side]).map(([muscle, paths]) =>
          paths.map((path, index) => (
            <Path
              key={`${muscle}-${index}`}
              d={path}
              fill={activeSet.has(muscle) ? '#D5FF45' : '#495044'}
              stroke="#10120F"
              strokeWidth="1"
            />
          ))
        )}
      </Svg>
    </View>
  );
}

function MuscleFigure({ muscles }) {
  if (!muscles.length) {
    return (
      <View style={styles.figureCard}>
        <Text style={styles.cardTitle}>Zapojené svaly</Text>
        <Text style={styles.emptyText}>
          Svaly sa zvýraznia, keď vyberieš cvik zo zoznamu v Exceli.
        </Text>
      </View>
    );
  }

  const labels = muscles.map((muscle) => SVALY[muscle] || muscle);

  return (
    <View style={styles.figureCard}>
      <Text style={styles.cardTitle}>Zapojené svaly</Text>

      <View style={styles.figuresRow}>
        <BodyFigure side="front" activeMuscles={muscles} />
        <BodyFigure side="back" activeMuscles={muscles} />
      </View>

      <Text style={styles.muscleNames}>{labels.join(' · ')}</Text>
    </View>
  );
}

function ExerciseProgressChart({ data }) {
  if (!data.length) {
    return (
      <Text style={styles.emptyText}>
        Tento cvik zatiaľ nemá zaznamenanú žiadnu váhu.
      </Text>
    );
  }

  const latest = data[data.length - 1];
  const maxWeight = Math.max(...data.map((item) => item.weight), 1);
  const visibleData = data.slice(-8);

  return (
    <View>
      <Text style={styles.latestWeight}>
        {latest.weight} kg
        <Text style={styles.latestCaption}>  posledný záznam</Text>
      </Text>

      <View style={styles.chartArea}>
        {visibleData.map((item, index) => {
          const height = Math.max(8, (item.weight / maxWeight) * 125);
          const shortDate = String(item.date || '')
            .replace(/\s/g, '')
            .replace(/\.\d{4}$/, '');

          return (
            <View key={`${item.date}-${index}`} style={styles.chartColumn}>
              <Text style={styles.chartWeight}>{item.weight} kg</Text>

              <View style={styles.chartBarArea}>
                <View style={[styles.chartBar, { height }]} />
              </View>

              <Text style={styles.chartDate}>{shortDate}</Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.chartHint}>
        Najvyššia zapísaná váha cviku v každom tréningu.
      </Text>
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('training');
  const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [workoutListLoaded, setWorkoutListLoaded] = useState(false);

  const [cviky, setCviky] = useState([]);
  const [isImportingExcel, setIsImportingExcel] = useState(false);
  const [selectedExerciseKey, setSelectedExerciseKey] = useState('');

  const [workoutName, setWorkoutName] = useState('');
  const [workoutNote, setWorkoutNote] = useState('');
  const [workoutPhoto, setWorkoutPhoto] = useState(null);
  const [exercises, setExercises] = useState([
    { id: '1', name: '', sets: '3', reps: '10', weight: '', muscles: [] },
  ]);
  const [focusedExerciseId, setFocusedExerciseId] = useState(null);

  useEffect(() => {
    async function loadData() {
      const [savedWorkouts, savedCviky] = await Promise.all([
        nacitajTreningy(),
        nacitajCviky(),
      ]);

      setWorkouts(savedWorkouts);
      setCviky(savedCviky);
      setWorkoutListLoaded(true);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (workoutListLoaded) {
      ulozTreningy(workouts);
    }
  }, [workouts, workoutListLoaded]);

  const exerciseOptions = useMemo(() => {
    const options = new Map();

    workouts.forEach((workout) => {
      (workout.exercises || []).forEach((exercise) => {
        const key = exercise.english || exercise.slovak || exercise.name;
        const label = exercise.slovak || exercise.name || exercise.english;

        if (key && !options.has(key)) {
          options.set(key, { key, label });
        }
      });
    });

    return [...options.values()];
  }, [workouts]);

  useEffect(() => {
    const selectedStillExists = exerciseOptions.some(
      (exercise) => exercise.key === selectedExerciseKey
    );

    if (!selectedStillExists) {
      setSelectedExerciseKey(exerciseOptions[0]?.key || '');
    }
  }, [exerciseOptions, selectedExerciseKey]);

  const exerciseHistory = useMemo(() => {
    if (!selectedExerciseKey) {
      return [];
    }

    return [...workouts]
      .reverse()
      .flatMap((workout) => {
        const matches = (workout.exercises || []).filter(
          (exercise) =>
            (exercise.english || exercise.slovak || exercise.name) ===
            selectedExerciseKey
        );

        if (!matches.length) {
          return [];
        }

        const heaviest = matches.reduce((best, exercise) =>
          Number(exercise.weight) > Number(best.weight) ? exercise : best
        );

        return [
          {
            date: workout.date,
            weight: Number(heaviest.weight) || 0,
          },
        ];
      })
      .filter((item) => item.weight > 0);
  }, [workouts, selectedExerciseKey]);

  async function importExcel() {
    try {
      setIsImportingExcel(true);
      const importedCviky = await vyberExcelACviky();

      if (importedCviky) {
        setCviky(importedCviky);
        Alert.alert(
          'Excel načítaný',
          `Načítaných cvikov: ${importedCviky.length}`
        );
      }
    } catch (error) {
      Alert.alert(
        'Excel sa nepodarilo načítať',
        error?.message || 'Skontroluj hlavičky v prvom riadku Excelu.'
      );
    } finally {
      setIsImportingExcel(false);
    }
  }

  function updateExercise(id, field, value) {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === id
          ? {
              ...exercise,
              [field]: value,
              ...(field === 'name' ? { english: '', muscles: [] } : {}),
            }
          : exercise
      )
    );
  }

  function chooseExercise(id, cvik) {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === id
          ? {
              ...exercise,
              name: cvik.slovak,
              english: cvik.english,
              muscles: cvik.muscles || [],
            }
          : exercise
      )
    );

    setFocusedExerciseId(null);
  }

  function addExercise() {
    setExercises((current) => [
      ...current,
      {
        id: Date.now().toString(),
        name: '',
        sets: '3',
        reps: '10',
        weight: '',
        muscles: [],
      },
    ]);
  }

  async function addWorkoutPhoto() {
    try {
      const photoUri = await vybratZGalerie();

      if (photoUri) {
        setWorkoutPhoto(photoUri);
      }
    } catch {
      Alert.alert('Fotku sa nepodarilo vybrať.');
    }
  }

  function saveWorkout() {
    const savedExercises = exercises
      .filter((exercise) => exercise.name.trim())
      .map((exercise) => {
        const found = najdiCvik(cviky, exercise.name);

        return {
          ...exercise,
          english: exercise.english || found?.english || '',
          slovak: found?.slovak || exercise.name,
          muscles: exercise.muscles?.length
            ? exercise.muscles
            : found?.muscles || [],
          sets: Number(exercise.sets) || 0,
          reps: Number(exercise.reps) || 0,
          weight: Number(exercise.weight) || 0,
        };
      });

    if (!savedExercises.length) {
      Alert.alert('Pridaj cvik', 'Zadaj aspoň jeden cvik pred uložením.');
      return;
    }

    const newWorkout = {
      id: Date.now().toString(),
      name: workoutName.trim() || 'Môj tréning',
      note: workoutNote.trim(),
      photo: workoutPhoto,
      date: new Date().toLocaleDateString('sk-SK'),
      exercises: savedExercises,
    };

    setWorkouts((current) => [newWorkout, ...current]);
    setWorkoutName('');
    setWorkoutNote('');
    setWorkoutPhoto(null);
    setExercises([
      {
        id: Date.now().toString(),
        name: '',
        sets: '3',
        reps: '10',
        weight: '',
        muscles: [],
      },
    ]);
    setIsCreatingWorkout(false);
  }

  const totalVolume = workouts.reduce(
    (total, workout) =>
      total +
      (workout.exercises || []).reduce(
        (sum, exercise) =>
          sum +
          (Number(exercise.sets) || 0) *
            (Number(exercise.reps) || 0) *
            (Number(exercise.weight) || 0),
        0
      ),
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.logo}>FITNOTES</Text>
        <Text style={styles.subtitle}>FOR MORE GAINZ</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        keyboardShouldPersistTaps="handled"
      >
        {activeTab === 'training' ? (
          isCreatingWorkout ? (
            <View>
              <TouchableOpacity
                onPress={() => setIsCreatingWorkout(false)}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>←  Späť</Text>
              </TouchableOpacity>

              <Text style={styles.eyebrow}>NOVÝ ZÁPIS</Text>
              <Text style={styles.title}>Tvoj tréning</Text>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={importExcel}
                disabled={isImportingExcel}
              >
                <Text style={styles.secondaryButtonText}>
                  {isImportingExcel
                    ? 'Načítavam Excel…'
                    : cviky.length
                      ? `Zmeniť Excel (${cviky.length} cvikov)`
                      : '＋  Načítať cviky z Excelu'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.fieldLabel}>Názov tréningu</Text>
              <TextInput
                value={workoutName}
                onChangeText={setWorkoutName}
                placeholder="Napr. Hrudník a triceps"
                placeholderTextColor="#777C71"
                style={styles.input}
              />

              <Text style={styles.sectionTitle}>Cviky</Text>

              {exercises.map((exercise, index) => {
                const searchText = normalizuj(exercise.name);

                const suggestions =
                  focusedExerciseId === exercise.id && searchText.length >= 2
                    ? cviky
                        .filter(
                          (cvik) =>
                            normalizuj(cvik.english).includes(searchText) ||
                            normalizuj(cvik.slovak).includes(searchText)
                        )
                        .slice(0, 7)
                    : [];

                return (
                  <View key={exercise.id} style={styles.exerciseCard}>
                    <Text style={styles.exerciseNumber}>CVIK {index + 1}</Text>

                    <TextInput
                      value={exercise.name}
                      onFocus={() => setFocusedExerciseId(exercise.id)}
                      onChangeText={(value) =>
                        updateExercise(exercise.id, 'name', value)
                      }
                      placeholder={
                        cviky.length
                          ? 'Hľadaj cvik po slovensky alebo anglicky'
                          : 'Najprv načítaj Excel so zoznamom cvikov'
                      }
                      placeholderTextColor="#777C71"
                      style={styles.input}
                    />

                    {suggestions.length > 0 && (
                      <View style={styles.suggestionsBox}>
                        {suggestions.map((cvik) => (
                          <TouchableOpacity
                            key={cvik.english}
                            style={styles.suggestion}
                            onPress={() => chooseExercise(exercise.id, cvik)}
                          >
                            <Text style={styles.suggestionSlovak}>
                              {cvik.slovak}
                            </Text>
                            <Text style={styles.suggestionEnglish}>
                              {cvik.english}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}

                    {exercise.muscles?.length > 0 && (
                      <Text style={styles.mappedText}>
                        Zapája:{' '}
                        {exercise.muscles
                          .map((muscle) => SVALY[muscle] || muscle)
                          .join(', ')}
                      </Text>
                    )}

                    <View style={styles.exerciseFields}>
                      <NumberField
                        label="SÉRIE"
                        value={exercise.sets}
                        onChangeText={(value) =>
                          updateExercise(exercise.id, 'sets', value)
                        }
                      />
                      <NumberField
                        label="OPAKOVANIA"
                        value={exercise.reps}
                        onChangeText={(value) =>
                          updateExercise(exercise.id, 'reps', value)
                        }
                      />
                      <NumberField
                        label="VÁHA (KG)"
                        value={exercise.weight}
                        onChangeText={(value) =>
                          updateExercise(exercise.id, 'weight', value)
                        }
                      />
                    </View>
                  </View>
                );
              })}

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={addExercise}
              >
                <Text style={styles.secondaryButtonText}>＋  Pridať cvik</Text>
              </TouchableOpacity>

              <Text style={styles.fieldLabel}>Poznámka k tréningu</Text>
              <TextInput
                value={workoutNote}
                onChangeText={setWorkoutNote}
                placeholder="Ako sa ti dnes cvičilo?"
                placeholderTextColor="#777C71"
                multiline
                style={[styles.input, styles.noteInput]}
              />

              <Text style={styles.fieldLabel}>Fotka tréningu</Text>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={addWorkoutPhoto}
              >
                <Text style={styles.secondaryButtonText}>
                  {workoutPhoto ? 'Zmeniť fotku' : '＋  Pripojiť fotku'}
                </Text>
              </TouchableOpacity>

              {workoutPhoto && (
                <Image
                  source={{ uri: workoutPhoto }}
                  style={styles.workoutPhoto}
                  resizeMode="cover"
                />
              )}

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={saveWorkout}
              >
                <Text style={styles.primaryButtonText}>Uložiť tréning</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.eyebrow}>VITAJ SPÄŤ</Text>
              <Text style={styles.title}>Čas na tréning.</Text>
              <Text style={styles.description}>
                Zapisuj si cviky, série a svoj progres.
              </Text>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={importExcel}
                disabled={isImportingExcel}
              >
                <Text style={styles.secondaryButtonText}>
                  {isImportingExcel
                    ? 'Načítavam Excel…'
                    : cviky.length
                      ? `Excel načítaný · ${cviky.length} cvikov`
                      : '＋  Načítať cviky z Excelu'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setIsCreatingWorkout(true)}
              >
                <Text style={styles.primaryButtonText}>＋  Začať tréning</Text>
              </TouchableOpacity>

              {workouts.length === 0 ? (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Tvoje tréningy</Text>
                  <Text style={styles.emptyText}>
                    Zatiaľ tu nemáš žiadny tréning. Pridaj svoj prvý.
                  </Text>
                </View>
              ) : (
                workouts.map((workout) => (
                  <View key={workout.id} style={styles.card}>
                    <Text style={styles.workoutDate}>{workout.date}</Text>
                    <Text style={styles.cardTitle}>{workout.name}</Text>

                    <Text style={styles.emptyText}>
                      {(workout.exercises || [])
                        .map(
                          (exercise) =>
                            `${exercise.slovak || exercise.name} · ${exercise.sets} × ${exercise.reps} · ${exercise.weight} kg`
                        )
                        .join('\n')}
                    </Text>

                    {workout.note ? (
                      <Text style={styles.workoutNote}>{workout.note}</Text>
                    ) : null}

                    {workout.photo ? (
                      <Image
                        source={{ uri: workout.photo }}
                        style={styles.workoutPhoto}
                        resizeMode="cover"
                      />
                    ) : null}

                    <MuscleFigure muscles={getMuscles(workout)} />
                  </View>
                ))
              )}
            </View>
          )
        ) : (
          <View>
            <Text style={styles.eyebrow}>TVÔJ PROGRES</Text>
            <Text style={styles.title}>Štatistiky</Text>
            <Text style={styles.description}>
              Sleduj tréningy aj vývoj váhy pri jednotlivých cvikoch.
            </Text>

            <View style={styles.statsRow}>
              <StatCard value={workouts.length} label="TRÉNINGY" />
              <StatCard
                value={`${Math.round(totalVolume).toLocaleString('sk-SK')} kg`}
                label="OBJEM SPOLU"
              />
            </View>

            <View style={styles.figureCard}>
              <Text style={styles.cardTitle}>Progress podľa cviku</Text>

              {exerciseOptions.length === 0 ? (
                <Text style={styles.emptyText}>
                  Najprv ulož tréning s aspoň jedným cvikom.
                </Text>
              ) : (
                <>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.exercisePicker}
                  >
                    {exerciseOptions.map((exercise) => {
                      const selected = exercise.key === selectedExerciseKey;

                      return (
                        <TouchableOpacity
                          key={exercise.key}
                          style={[
                            styles.exerciseChip,
                            selected && styles.exerciseChipSelected,
                          ]}
                          onPress={() => setSelectedExerciseKey(exercise.key)}
                        >
                          <Text
                            style={[
                              styles.exerciseChipText,
                              selected && styles.exerciseChipTextSelected,
                            ]}
                          >
                            {exercise.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>

                  <ExerciseProgressChart data={exerciseHistory} />
                </>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {!isCreatingWorkout && (
        <View style={styles.tabBar}>
          <TabButton
            label="Tréning"
            icon="＋"
            selected={activeTab === 'training'}
            onPress={() => setActiveTab('training')}
          />
          <TabButton
            label="Štatistiky"
            icon="↗"
            selected={activeTab === 'stats'}
            onPress={() => setActiveTab('stats')}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

function NumberField({ label, value, onChangeText }) {
  return (
    <View style={styles.numberField}>
      <Text style={styles.smallLabel}>{label}</Text>
      <TextInput
        value={String(value)}
        onChangeText={onChangeText}
        keyboardType="numeric"
        placeholder="0"
        placeholderTextColor="#777C71"
        style={styles.numberInput}
      />
    </View>
  );
}

function StatCard({ value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function TabButton({ label, icon, selected, onPress }) {
  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Text style={[styles.tabIcon, selected && styles.selectedTabText]}>
        {icon}
      </Text>
      <Text style={[styles.tabLabel, selected && styles.selectedTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10120F',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#262923',
  },
  logo: {
    color: '#D5FF45',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
  },
  subtitle: {
    color: '#858A7D',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 3,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 24,
    paddingTop: 34,
    paddingBottom: 50,
  },
  eyebrow: {
    color: '#D5FF45',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  title: {
    color: '#F5F6F1',
    fontSize: 32,
    fontWeight: '900',
  },
  description: {
    color: '#9A9E93',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 26,
  },
  primaryButton: {
    backgroundColor: '#D5FF45',
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#151710',
    fontWeight: '900',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#D5FF45',
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButtonText: {
    color: '#D5FF45',
    fontSize: 15,
    fontWeight: '800',
  },
  backButton: {
    marginBottom: 28,
  },
  backButtonText: {
    color: '#D5FF45',
    fontSize: 15,
    fontWeight: '700',
  },
  fieldLabel: {
    color: '#F5F6F1',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 18,
    marginBottom: 8,
  },
  input: {
    color: '#F5F6F1',
    backgroundColor: '#1A1D18',
    borderWidth: 1,
    borderColor: '#2B2F27',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
  },
  noteInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    color: '#F5F6F1',
    fontSize: 19,
    fontWeight: '900',
    marginTop: 28,
    marginBottom: 12,
  },
  exerciseCard: {
    backgroundColor: '#1A1D18',
    borderWidth: 1,
    borderColor: '#2B2F27',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  exerciseNumber: {
    color: '#D5FF45',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  exerciseFields: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  numberField: {
    flex: 1,
  },
  smallLabel: {
    color: '#8E9387',
    fontSize: 9,
    fontWeight: '800',
    marginBottom: 6,
  },
  numberInput: {
    color: '#F5F6F1',
    backgroundColor: '#10120F',
    borderRadius: 9,
    padding: 10,
    fontSize: 15,
  },
  suggestionsBox: {
    backgroundColor: '#242820',
    borderRadius: 10,
    marginTop: 6,
    overflow: 'hidden',
  },
  suggestion: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#363B31',
  },
  suggestionSlovak: {
    color: '#F5F6F1',
    fontSize: 14,
    fontWeight: '700',
  },
  suggestionEnglish: {
    color: '#969B8E',
    fontSize: 11,
    marginTop: 3,
  },
  mappedText: {
    color: '#D5FF45',
    fontSize: 11,
    marginTop: 9,
  },
  card: {
    backgroundColor: '#1A1D18',
    borderWidth: 1,
    borderColor: '#2B2F27',
    borderRadius: 18,
    padding: 18,
    marginTop: 4,
    marginBottom: 14,
  },
  cardTitle: {
    color: '#F5F6F1',
    fontSize: 17,
    fontWeight: '800',
  },
  emptyText: {
    color: '#8E9387',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  workoutDate: {
    color: '#D5FF45',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 7,
  },
  workoutNote: {
    color: '#B8BCAF',
    fontSize: 13,
    marginTop: 12,
    fontStyle: 'italic',
  },
  workoutPhoto: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginTop: 14,
  },
  figureCard: {
    backgroundColor: '#141611',
    borderWidth: 1,
    borderColor: '#2B2F27',
    borderRadius: 14,
    padding: 12,
    marginTop: 16,
  },
  figuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  figureColumn: {
    alignItems: 'center',
  },
  figureTitle: {
    color: '#9A9E93',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
  },
  muscleNames: {
    color: '#D5FF45',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1D18',
    borderWidth: 1,
    borderColor: '#2B2F27',
    borderRadius: 16,
    padding: 16,
  },
  statValue: {
    color: '#D5FF45',
    fontSize: 25,
    fontWeight: '900',
  },
  statLabel: {
    color: '#8E9387',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 8,
  },
  exercisePicker: {
    marginTop: 14,
    marginBottom: 16,
  },
  exerciseChip: {
    borderWidth: 1,
    borderColor: '#3A4034',
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 9,
    marginRight: 8,
  },
  exerciseChipSelected: {
    backgroundColor: '#D5FF45',
    borderColor: '#D5FF45',
  },
  exerciseChipText: {
    color: '#B8BCAF',
    fontSize: 12,
    fontWeight: '700',
  },
  exerciseChipTextSelected: {
    color: '#151710',
  },
  latestWeight: {
    color: '#D5FF45',
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 14,
  },
  latestCaption: {
    color: '#9A9E93',
    fontSize: 12,
    fontWeight: '500',
  },
  chartArea: {
    height: 190,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#3A4034',
    paddingTop: 8,
  },
  chartColumn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chartWeight: {
    color: '#E8EADD',
    fontSize: 10,
    marginBottom: 5,
  },
  chartBarArea: {
    height: 130,
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: 18,
    maxHeight: 125,
    minHeight: 8,
    backgroundColor: '#D5FF45',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  chartDate: {
    color: '#9A9E93',
    fontSize: 9,
    marginTop: 7,
    marginBottom: 5,
  },
  chartHint: {
    color: '#8E9387',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 12,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#181A16',
    borderTopWidth: 1,
    borderTopColor: '#292C25',
    paddingTop: 10,
    paddingBottom: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  tabIcon: {
    color: '#777C71',
    fontSize: 20,
    fontWeight: '800',
  },
  tabLabel: {
    color: '#777C71',
    fontSize: 11,
    fontWeight: '700',
  },
  selectedTabText: {
    color: '#D5FF45',
  },
});
