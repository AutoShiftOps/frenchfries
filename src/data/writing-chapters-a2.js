// A2 Writing chapters — same five topics as a2-chapters.js (Speaking).
// `accepted` lists valid answers (normalized: lowercased, accents kept,
// punctuation stripped) — matches writing-chapters.js conventions.

export const WRITING_CHAPTERS_A2 = [
  {
    id: 'daily-routine',
    order: 1,
    title: 'Your daily routine',
    description: 'Write about your day using reflexive verbs',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "I get up at seven o\'clock."',
        accepted: ['je me lève à sept heures', 'je me leve a sept heures'],
        hint: 'je me lève à ___ heures',
        pronunciation: 'zhuh muh LEV ah set UHR',
      },
      {
        id: 'w2',
        prompt: 'Write: "I go to bed at ten o\'clock."',
        accepted: ['je me couche à dix heures', 'je me couche a dix heures'],
        hint: 'je me couche à ___ heures',
        pronunciation: 'zhuh muh KOOSH ah deez UHR',
      },
      {
        id: 'w3',
        prompt: 'Write: "I work in the afternoon."',
        accepted: ["je travaille l'après-midi", 'je travaille l apres midi', "je travaille l'apres-midi"],
        hint: 'je travaille ___',
        pronunciation: 'zhuh trah-VIGH lah-preh-mee-DEE',
      },
    ],
  },
  {
    id: 'shopping',
    order: 2,
    title: 'Shopping and prices',
    description: 'Write requests for prices and preferences',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "How much does this cost?"',
        accepted: ['combien ça coûte', 'combien ca coute', 'combien ça coûte ?'],
        hint: 'combien ça ___',
        pronunciation: 'kohm-BYAN sah KOOT',
      },
      {
        id: 'w2',
        prompt: 'Write: "It\'s too expensive."',
        accepted: ["c'est trop cher", 'cest trop cher'],
        hint: "c'est trop ___",
        pronunciation: 'seh troh SHEHR',
      },
      {
        id: 'w3',
        prompt: 'Write: "I would like to buy a jacket."',
        accepted: ['je voudrais acheter une veste'],
        hint: 'je voudrais acheter ___',
        pronunciation: 'zhuh voo-DREH ahsh-TAY oon VEST',
      },
    ],
  },
  {
    id: 'weather',
    order: 3,
    title: 'Weather and seasons',
    description: 'Write simple statements about the weather',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "The weather is nice today."',
        accepted: ["il fait beau aujourd'hui", 'il fait beau aujourdhui'],
        hint: "il fait ___ aujourd'hui",
        pronunciation: 'eel feh BOH oh-zhoor-DWEE',
      },
      {
        id: 'w2',
        prompt: 'Write: "It is cold in winter."',
        accepted: ['il fait froid en hiver'],
        hint: 'il fait ___ en hiver',
        pronunciation: 'eel feh FRWAH ahn nee-VEHR',
      },
      {
        id: 'w3',
        prompt: 'Write: "It rains a lot in spring."',
        accepted: ['il pleut beaucoup au printemps'],
        hint: 'il ___ beaucoup au printemps',
        pronunciation: 'eel PLUH boh-KOO oh pran-TAHN',
      },
    ],
  },
  {
    id: 'weekend-past',
    order: 4,
    title: 'Talking about the past',
    description: 'Write what you did using passé composé',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "I visited the museum."',
        accepted: ["j'ai visité le musée", 'jai visite le musee'],
        hint: "j'ai visité ___",
        pronunciation: 'zhay vee-zee-TAY luh mew-ZAY',
      },
      {
        id: 'w2',
        prompt: 'Write: "We ate at a restaurant."',
        accepted: ['nous avons mangé dans un restaurant', 'nous avons mange dans un restaurant'],
        hint: 'nous avons mangé ___',
        pronunciation: 'noo zah-VOHN mahn-ZHAY dahn zuhn res-toh-RAHN',
      },
      {
        id: 'w3',
        prompt: 'Write: "We went to the beach."',
        accepted: ['nous sommes allés à la plage', 'nous sommes alles a la plage'],
        hint: 'nous sommes allés ___',
        pronunciation: 'noo som zah-LAY ah lah PLAHZH',
      },
    ],
  },
  {
    id: 'health',
    order: 5,
    title: 'Health and feeling unwell',
    description: 'Write about symptoms and basic advice',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "I have a headache."',
        accepted: ["j'ai mal à la tête", 'jai mal a la tete'],
        hint: "j'ai mal à ___",
        pronunciation: 'zhay mahl ah lah TET',
      },
      {
        id: 'w2',
        prompt: 'Write: "I am a bit sick."',
        accepted: ['je suis un peu malade'],
        hint: 'je suis un peu ___',
        pronunciation: 'zhuh swee zuhn puh mah-LAHD',
      },
      {
        id: 'w3',
        prompt: 'Write: "Drink water."',
        accepted: ["buvez de l'eau", 'buvez de leau'],
        hint: 'buvez de ___',
        pronunciation: 'bew-VAY duh LOH',
      },
    ],
  },
]
