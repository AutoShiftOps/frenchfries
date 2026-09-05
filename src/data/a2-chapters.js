// A2 Speaking chapters — builds on A1's present-tense survival phrases with
// reflexive verbs (daily routine), negotiation (shopping), and the first
// past tense a learner meets, passé composé (talking about the past).
// Same format as a1-chapters.js: `focus` is the phoneme Azure should weigh
// most, `pronunciation` is a plain-English phonetic respelling.

export const A2_CHAPTERS = [
  {
    id: 'daily-routine',
    order: 1,
    title: 'Your daily routine',
    description: 'Describe a normal day using reflexive verbs',
    phrases: [
      { id: 'p1', text: 'Je me lève à sept heures.', translation: 'I get up at seven o\'clock.', focus: 'eu', pronunciation: 'zhuh muh LEV ah set UHR' },
      { id: 'p2', text: 'Je me douche, puis je m\'habille.', translation: 'I shower, then I get dressed.', focus: 'ou', pronunciation: 'zhuh muh DOOSH, pwee zhuh mah-BEE-yuh' },
      { id: 'p3', text: 'Je prends le petit-déjeuner à huit heures.', translation: 'I have breakfast at eight o\'clock.', focus: 'eu', pronunciation: 'zhuh prahn luh puh-TEE day-zhuh-NAY ah weet UHR' },
      { id: 'p4', text: 'L\'après-midi, je travaille au bureau.', translation: 'In the afternoon, I work at the office.', focus: 'r', pronunciation: 'lah-preh-mee-DEE, zhuh trah-VIGH oh bew-ROH' },
      { id: 'p5', text: 'Le soir, je me couche vers dix heures.', translation: 'In the evening, I go to bed around ten o\'clock.', focus: 'ou', pronunciation: 'luh SWAHR, zhuh muh KOOSH vehr deez UHR' },
    ],
  },
  {
    id: 'shopping',
    order: 2,
    title: 'Shopping and prices',
    description: 'Ask prices, sizes, and colors — and haggle a little',
    phrases: [
      { id: 'p1', text: 'Je voudrais acheter une nouvelle veste.', translation: 'I would like to buy a new jacket.', focus: 'ou', pronunciation: 'zhuh voo-DREH ahsh-TAY oon noo-VELL VEST' },
      { id: 'p2', text: 'Combien ça coûte, s\'il vous plaît?', translation: 'How much does this cost, please?', focus: 'ou', pronunciation: 'kohm-BYAN sah KOOT, seel voo PLEH' },
      { id: 'p3', text: 'C\'est trop cher pour moi.', translation: 'It\'s too expensive for me.', focus: 'r', pronunciation: 'seh troh SHEHR poor MWAH' },
      { id: 'p4', text: 'Avez-vous cette chemise en bleu?', translation: 'Do you have this shirt in blue?', focus: 'eu', pronunciation: 'ah-vay-VOO set shuh-MEEZ ahn BLUH' },
      { id: 'p5', text: 'Je vais payer par carte, merci.', translation: 'I\'ll pay by card, thank you.', focus: 'r', pronunciation: 'zhuh veh pay-YAY par KART, mehr-SEE' },
    ],
  },
  {
    id: 'weather',
    order: 3,
    title: 'Weather and seasons',
    description: 'Talk about the weather and the four seasons',
    phrases: [
      { id: 'p1', text: 'Il fait beau aujourd\'hui.', translation: 'The weather is nice today.', focus: 'ou', pronunciation: 'eel feh BOH oh-zhoor-DWEE' },
      { id: 'p2', text: 'En hiver, il fait très froid ici.', translation: 'In winter, it\'s very cold here.', focus: 'r', pronunciation: 'ahn nee-VEHR, eel feh treh FRWAH ee-SEE' },
      { id: 'p3', text: 'Il pleut beaucoup au printemps.', translation: 'It rains a lot in spring.', focus: 'eu', pronunciation: 'eel PLUH boh-KOO oh pran-TAHN' },
      { id: 'p4', text: 'J\'aime l\'été parce qu\'il fait chaud.', translation: 'I like summer because it\'s hot.', focus: 'r', pronunciation: 'zhem lay-TAY pars keel feh SHOH' },
      { id: 'p5', text: 'En automne, les feuilles tombent des arbres.', translation: 'In autumn, the leaves fall from the trees.', focus: 'on', pronunciation: 'ahn noh-TUN, lay FUH-yuh TOHNB day ZAR-bruh' },
    ],
  },
  {
    id: 'weekend-past',
    order: 4,
    title: 'Talking about the past',
    description: 'Say what you did last weekend with passé composé',
    phrases: [
      { id: 'p1', text: 'Samedi dernier, j\'ai visité le musée.', translation: 'Last Saturday, I visited the museum.', focus: 'u', pronunciation: 'sahm-DEE dehr-NYAY, zhay vee-zee-TAY luh mew-ZAY' },
      { id: 'p2', text: 'Nous avons mangé dans un restaurant français.', translation: 'We ate in a French restaurant.', focus: 'an', pronunciation: 'noo zah-VOHN mahn-ZHAY dahn zuhn res-toh-RAHN frahn-SEH' },
      { id: 'p3', text: 'J\'ai regardé un film hier soir.', translation: 'I watched a movie last night.', focus: 'r', pronunciation: 'zhay ruh-gar-DAY uhn feelm YEHR swahr' },
      { id: 'p4', text: 'Elle a acheté des fleurs pour sa mère.', translation: 'She bought flowers for her mother.', focus: 'eu', pronunciation: 'ell ah ahsh-TAY day FLUHR poor sah MEHR' },
      { id: 'p5', text: 'Nous sommes allés à la plage en famille.', translation: 'We went to the beach with the family.', focus: 'an', pronunciation: 'noo som zah-LAY ah lah PLAHZH ahn fah-MEE-yuh' },
    ],
  },
  {
    id: 'health',
    order: 5,
    title: 'Health and feeling unwell',
    description: 'Describe symptoms and understand basic medical advice',
    phrases: [
      { id: 'p1', text: 'J\'ai mal à la tête depuis ce matin.', translation: 'I\'ve had a headache since this morning.', focus: 'in', pronunciation: 'zhay mahl ah lah TET duh-PWEE suh mah-TAN' },
      { id: 'p2', text: 'Je suis un peu malade aujourd\'hui.', translation: 'I am a bit sick today.', focus: 'eu', pronunciation: 'zhuh swee zuhn PUH mah-LAHD oh-zhoor-DWEE' },
      { id: 'p3', text: 'Il faut prendre rendez-vous chez le médecin.', translation: 'You need to make an appointment with the doctor.', focus: 'r', pronunciation: 'eel foh PRAHN-druh rahn-day-VOO shay luh mayd-SAN' },
      { id: 'p4', text: 'J\'ai un peu de fièvre ce soir.', translation: 'I have a slight fever tonight.', focus: 'eu', pronunciation: 'zhay uhn puh duh FYEV-ruh suh SWAHR' },
      { id: 'p5', text: 'Reposez-vous bien et buvez de l\'eau.', translation: 'Rest well and drink water.', focus: 'u', pronunciation: 'ruh-poh-ZAY-voo byan ay bew-VAY duh LOH' },
    ],
  },
]
