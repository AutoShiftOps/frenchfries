// A1 Speaking chapters — MVP scope
// Each phrase has a `focus` phoneme so Azure's phoneme-level score
// can be matched to a pre-recorded mouth-position clip.

export const A1_CHAPTERS = [
  {
    id: 'greetings',
    order: 1,
    title: 'Greetings and introductions',
    description: 'Say hello, introduce yourself, ask how someone is',
    phrases: [
      { id: 'p1', text: 'Bonjour, je m\'appelle Sajja.', translation: "Hello, my name is Sajja.", focus: 'on' },
      { id: 'p2', text: 'Comment allez-vous?', translation: 'How are you? (formal)', focus: 'u' },
      { id: 'p3', text: 'Ça va bien, merci.', translation: "I'm fine, thank you.", focus: 'r' },
      { id: 'p4', text: 'J\'habite à Mississauga.', translation: 'I live in Mississauga.', focus: 'an' },
      { id: 'p5', text: 'Enchanté de vous rencontrer.', translation: 'Nice to meet you.', focus: 'on' },
    ],
  },
  {
    id: 'ordering',
    order: 2,
    title: 'Ordering food and drink',
    description: 'Order at a café or restaurant with confidence',
    phrases: [
      { id: 'p1', text: 'Je voudrais un café, s\'il vous plaît.', translation: 'I would like a coffee, please.', focus: 'u' },
      { id: 'p2', text: 'Une table pour deux, s\'il vous plaît.', translation: 'A table for two, please.', focus: 'eu' },
      { id: 'p3', text: 'L\'addition, s\'il vous plaît.', translation: 'The bill, please.', focus: 'on' },
      { id: 'p4', text: 'C\'est délicieux.', translation: "It's delicious.", focus: 'u' },
      { id: 'p5', text: 'Je suis végétarien.', translation: 'I am vegetarian.', focus: 'r' },
    ],
  },
  {
    id: 'directions',
    order: 3,
    title: 'Asking for directions',
    description: 'Find your way and understand simple directions',
    phrases: [
      { id: 'p1', text: 'Excusez-moi, où est la gare?', translation: 'Excuse me, where is the train station?', focus: 'r' },
      { id: 'p2', text: 'Tournez à gauche, s\'il vous plaît.', translation: 'Turn left, please.', focus: 'an' },
      { id: 'p3', text: 'C\'est loin d\'ici?', translation: 'Is it far from here?', focus: 'in' },
      { id: 'p4', text: 'Tout droit, puis à droite.', translation: 'Straight ahead, then right.', focus: 'r' },
      { id: 'p5', text: 'Merci beaucoup pour votre aide.', translation: 'Thank you very much for your help.', focus: 'u' },
    ],
  },
  {
    id: 'family',
    order: 4,
    title: 'Describing your family',
    description: 'Talk about the people in your life',
    phrases: [
      { id: 'p1', text: 'J\'ai une famille de trois personnes.', translation: 'I have a family of three people.', focus: 'an' },
      { id: 'p2', text: 'Ma femme s\'appelle Asha.', translation: 'My wife is called Asha.', focus: 'on' },
      { id: 'p3', text: 'Mon fils est jeune.', translation: 'My son is young.', focus: 'eu' },
      { id: 'p4', text: 'Elle est intelligente et travailleuse.', translation: 'She is intelligent and hardworking.', focus: 'r' },
      { id: 'p5', text: 'Nous habitons au Canada.', translation: 'We live in Canada.', focus: 'u' },
    ],
  },
  {
    id: 'numbers-time',
    order: 5,
    title: 'Numbers and time',
    description: 'Tell the time and count with confidence',
    phrases: [
      { id: 'p1', text: 'Il est trois heures et demie.', translation: "It's 3:30.", focus: 'r' },
      { id: 'p2', text: 'J\'ai rendez-vous à neuf heures.', translation: 'I have an appointment at 9 o\'clock.', focus: 'eu' },
      { id: 'p3', text: 'Le lundi, je travaille.', translation: 'On Mondays, I work.', focus: 'on' },
      { id: 'p4', text: 'Vingt et un, vingt-deux, vingt-trois.', translation: 'Twenty-one, twenty-two, twenty-three.', focus: 'in' },
      { id: 'p5', text: 'À quelle heure commence la réunion?', translation: 'What time does the meeting start?', focus: 'r' },
    ],
  },
]

// Phoneme correction library — maps focus phoneme to guidance shown
// when Azure flags that phoneme with low accuracy. Video clips would
// replace the `tip` field in a later iteration (see PHONEME_CLIPS below).
export const PHONEME_GUIDANCE = {
  u: {
    label: 'French "u" sound',
    example: 'tu, une, voudrais',
    tip: 'Round your lips tightly like you\'re about to whistle, then say "ee". The sound sits between "ee" and "oo".',
  },
  ou: {
    label: 'French "ou" sound',
    example: 'vous, nous, bonjour',
    tip: 'Round your lips fully forward, like saying "oo" in "food" but with more lip rounding.',
  },
  r: {
    label: 'French "r" sound',
    example: 'merci, restaurant, Paris',
    tip: 'The French r comes from the back of the throat, not the tip of the tongue. Think of a soft gargle, not an English "r".',
  },
  an: {
    label: 'Nasal "an/en" sound',
    example: 'France, restaurant, enfant',
    tip: 'Let air flow through your nose while saying "ah" — don\'t fully close your mouth. Your tongue stays low and relaxed.',
  },
  on: {
    label: 'Nasal "on" sound',
    example: 'bonjour, maison, on',
    tip: 'Round your lips as if saying "oh", then let the sound flow through your nose. Don\'t pronounce a clear "n" at the end.',
  },
  in: {
    label: 'Nasal "in" sound',
    example: 'vin, matin, intelligent',
    tip: 'Smile slightly while saying "ah" through your nose. The sound is nasal, not a clear "in" like in English.',
  },
  eu: {
    label: 'French "eu" sound',
    example: 'deux, veux, monsieur',
    tip: 'Round your lips slightly and say "eh" — similar to the vowel in "her" but with rounder lips.',
  },
}
