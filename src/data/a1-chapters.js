// A1 Speaking chapters — MVP scope
// Each phrase has a `focus` phoneme so Azure's phoneme-level score
// can be matched to a pre-recorded mouth-position clip.
// `pronunciation` is a plain-English phonetic respelling (not IPA) —
// stressed syllable in CAPS — meant to be read at a glance, not studied.

export const A1_CHAPTERS = [
  {
    id: 'greetings',
    order: 1,
    title: 'Greetings and introductions',
    description: 'Say hello, introduce yourself, ask how someone is',
    phrases: [
      { id: 'p1', text: 'Bonjour, je m\'appelle Sajja.', translation: "Hello, my name is Sajja.", focus: 'on', pronunciation: 'bohn-ZHOOR, zhuh mah-PELL Sajja' },
      { id: 'p2', text: 'Comment allez-vous?', translation: 'How are you? (formal)', focus: 'u', pronunciation: 'koh-mahn tah-lay-VOO' },
      { id: 'p3', text: 'Ça va bien, merci.', translation: "I'm fine, thank you.", focus: 'r', pronunciation: 'sah vah BYAN, mehr-SEE' },
      { id: 'p4', text: 'J\'habite à Mississauga.', translation: 'I live in Mississauga.', focus: 'an', pronunciation: 'zhah-BEET ah Mississauga' },
      { id: 'p5', text: 'Enchanté de vous rencontrer.', translation: 'Nice to meet you.', focus: 'on', pronunciation: 'ahn-shahn-TAY duh voo rahn-kohn-TRAY' },
    ],
  },
  {
    id: 'ordering',
    order: 2,
    title: 'Ordering food and drink',
    description: 'Order at a café or restaurant with confidence',
    phrases: [
      { id: 'p1', text: 'Je voudrais un café, s\'il vous plaît.', translation: 'I would like a coffee, please.', focus: 'u', pronunciation: 'zhuh voo-DREH uhn kah-FAY, seel voo PLEH' },
      { id: 'p2', text: 'Une table pour deux, s\'il vous plaît.', translation: 'A table for two, please.', focus: 'eu', pronunciation: 'OON TAH-bluh poor DUH, seel voo PLEH' },
      { id: 'p3', text: 'L\'addition, s\'il vous plaît.', translation: 'The bill, please.', focus: 'on', pronunciation: 'lah-dee-SYOHN, seel voo PLEH' },
      { id: 'p4', text: 'C\'est délicieux.', translation: "It's delicious.", focus: 'u', pronunciation: 'seh day-lee-SYUH' },
      { id: 'p5', text: 'Je suis végétarien.', translation: 'I am vegetarian.', focus: 'r', pronunciation: 'zhuh swee vay-zhay-tah-RYAN' },
    ],
  },
  {
    id: 'directions',
    order: 3,
    title: 'Asking for directions',
    description: 'Find your way and understand simple directions',
    phrases: [
      { id: 'p1', text: 'Excusez-moi, où est la gare?', translation: 'Excuse me, where is the train station?', focus: 'r', pronunciation: 'ex-kew-ZAY-mwah, oo eh lah GAHR' },
      { id: 'p2', text: 'Tournez à gauche, s\'il vous plaît.', translation: 'Turn left, please.', focus: 'an', pronunciation: 'toor-NAY ah GOHSH, seel voo PLEH' },
      { id: 'p3', text: 'C\'est loin d\'ici?', translation: 'Is it far from here?', focus: 'in', pronunciation: 'seh LWAN dee-SEE' },
      { id: 'p4', text: 'Tout droit, puis à droite.', translation: 'Straight ahead, then right.', focus: 'r', pronunciation: 'too DRWAH, pwee ah DRWAHT' },
      { id: 'p5', text: 'Merci beaucoup pour votre aide.', translation: 'Thank you very much for your help.', focus: 'u', pronunciation: 'mehr-SEE boh-KOO poor VOH-truh EHD' },
    ],
  },
  {
    id: 'family',
    order: 4,
    title: 'Describing your family',
    description: 'Talk about the people in your life',
    phrases: [
      { id: 'p1', text: 'J\'ai une famille de trois personnes.', translation: 'I have a family of three people.', focus: 'an', pronunciation: 'zhay oon fah-MEE-yuh duh TRWAH pehr-SUN' },
      { id: 'p2', text: 'Ma femme s\'appelle Asha.', translation: 'My wife is called Asha.', focus: 'on', pronunciation: 'mah FAHM sah-PELL Asha' },
      { id: 'p3', text: 'Mon fils est jeune.', translation: 'My son is young.', focus: 'eu', pronunciation: 'mohn FEES eh ZHUHN' },
      { id: 'p4', text: 'Elle est intelligente et travailleuse.', translation: 'She is intelligent and hardworking.', focus: 'r', pronunciation: 'ell eh tan-tay-lee-ZHAHNT ay trah-vah-YUHZ' },
      { id: 'p5', text: 'Nous habitons au Canada.', translation: 'We live in Canada.', focus: 'u', pronunciation: 'noo zah-bee-TOHN oh Canada' },
    ],
  },
  {
    id: 'numbers-time',
    order: 5,
    title: 'Numbers and time',
    description: 'Tell the time and count with confidence',
    phrases: [
      { id: 'p1', text: 'Il est trois heures et demie.', translation: "It's 3:30.", focus: 'r', pronunciation: 'eel eh TRWAH-zuhr ay duh-MEE' },
      { id: 'p2', text: 'J\'ai rendez-vous à neuf heures.', translation: 'I have an appointment at 9 o\'clock.', focus: 'eu', pronunciation: 'zhay rahn-day-VOO ah nuh-VUHR' },
      { id: 'p3', text: 'Le lundi, je travaille.', translation: 'On Mondays, I work.', focus: 'on', pronunciation: 'luh luhn-DEE, zhuh trah-VIGH' },
      { id: 'p4', text: 'Vingt et un, vingt-deux, vingt-trois.', translation: 'Twenty-one, twenty-two, twenty-three.', focus: 'in', pronunciation: 'van-tay-UHN, van-DUH, van-TRWAH' },
      { id: 'p5', text: 'À quelle heure commence la réunion?', translation: 'What time does the meeting start?', focus: 'r', pronunciation: 'ah kell UHR koh-MAHNS lah ray-oo-nee-OHN' },
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
