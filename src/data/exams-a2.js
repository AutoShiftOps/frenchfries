// A2 practice exams — 6 sets, mixed reading/listening/writing, drawing
// on a2-chapters.js's topics (daily routine, shopping/prices, weather/
// seasons, past tense, health), at increasing difficulty within the level.

export const EXAMS_A2 = [
  {
    id: 'a2-set-1',
    order: 1,
    title: 'Set 1',
    difficulty: 'Warm-up',
    questions: [
      { id: 'q1', type: 'reading', text: 'Je me lève à sept heures et je prends une douche.', translation: 'I get up at seven and take a shower.', pronunciation: 'zhuh muh LEV ah set UHR ay zhuh prahn oon DOOSH.', question: 'What time does the speaker get up?', options: ['Seven', 'Eight', 'Six'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Cette veste coûte quarante euros, c\'est en solde.', translation: 'This jacket costs forty euros, it\'s on sale.', pronunciation: 'set VEST koot kah-RAHNT uh-ROH, seh tahn SOLD.', question: 'Why is the price lower?', options: ['It\'s on sale', 'It\'s used', 'It\'s a different size'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Il fait froid et il neige aujourd\'hui.', translation: 'It\'s cold and it\'s snowing today.', pronunciation: 'eel feh FRWAH ay eel NEZH oh-zhoor-DWEE.', question: 'What\'s the weather like?', options: ['Cold and snowing', 'Hot and sunny', 'Windy and mild'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Hier, j\'ai visité le musée avec mes amis.', translation: 'Yesterday, I visited the museum with my friends.', pronunciation: 'YEHR, zheh vee-zee-TAY luh mew-ZAY ah-VEK may zah-MEE.', question: 'When did this happen?', options: ['Yesterday', 'Today', 'Tomorrow'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "I get dressed at eight o\'clock."', accepted: ['je m habille a huit heures', 'je mhabille a huit heures'], hint: 'je m\'habille à ___', pronunciation: 'zhuh mah-BEE-yuh ah weet UHR' },
      { id: 'q6', type: 'writing', prompt: 'Write: "It costs how much?" (asking the price)', accepted: ['combien ca coute', 'combien ca coute s il vous plait'], hint: 'combien ça ___?', pronunciation: 'kohm-BYAN sah KOOT' },
    ],
  },
  {
    id: 'a2-set-2',
    order: 2,
    title: 'Set 2',
    difficulty: 'Building',
    questions: [
      { id: 'q1', type: 'reading', text: 'L\'après-midi, je travaille au bureau jusqu\'à dix-huit heures.', translation: 'In the afternoon, I work at the office until 6pm.', pronunciation: 'lah-preh-mee-DEE, zhuh trah-VIGH oh bew-ROH zhoos-KAH deez-weet UHR.', question: 'Until what time does the speaker work?', options: ['6pm', '8pm', 'Noon'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Au printemps, il fait doux et les fleurs commencent à pousser.', translation: 'In spring, it\'s mild and the flowers start to grow.', pronunciation: 'oh pran-TAHN, eel feh DOO ay lay FLUHR koh-MAHNS ah poo-SAY.', question: 'Which season is described?', options: ['Spring', 'Winter', 'Summer'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'J\'ai mal à la tête depuis ce matin.', translation: 'I\'ve had a headache since this morning.', pronunciation: 'zheh mahl ah lah TET duh-PWEE suh mah-TAN.', question: 'What is the problem?', options: ['A headache', 'A stomachache', 'A fever'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Le week-end dernier, nous sommes allés à la plage.', translation: 'Last weekend, we went to the beach.', pronunciation: 'luh week-END dehr-NYAY, noo som ah-LAY ah lah PLAZH.', question: 'Where did they go?', options: ['The beach', 'The mountains', 'A museum'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "This is too expensive for me."', accepted: ['c est trop cher pour moi', 'cest trop cher pour moi'], hint: 'c\'est trop cher ___', pronunciation: 'seh troh SHEHR poor MWAH' },
      { id: 'q6', type: 'writing', prompt: 'Write: "I have a headache."', accepted: ['j ai mal a la tete', 'jai mal a la tete'], hint: 'j\'ai mal à ___', pronunciation: 'zheh mahl ah lah TET' },
    ],
  },
  {
    id: 'a2-set-3',
    order: 3,
    title: 'Set 3',
    difficulty: 'Standard',
    questions: [
      { id: 'q1', type: 'reading', text: 'Le soir, je me couche vers dix heures, mais le week-end je reste debout plus tard.', translation: 'In the evening I go to bed around ten, but on weekends I stay up later.', pronunciation: 'luh SWAHR, zhuh muh KOOSH vehr deez UHR, meh luh week-END zhuh REST duh-BOO plew TAR.', question: 'When does the speaker go to bed later?', options: ['On weekends', 'On weekdays', 'Never'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'En été, il fait très chaud, alors on va souvent à la piscine.', translation: 'In summer, it\'s very hot, so we often go to the pool.', pronunciation: 'ahn nay-TAY, eel feh treh SHOH, ah-LOR ohn vah soo-VAHN ah lah pee-SEEN.', question: 'Why do they go to the pool?', options: ['Because it\'s hot', 'Because it\'s a holiday', 'Because friends invited them'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Le docteur m\'a dit de me reposer et de boire beaucoup d\'eau.', translation: 'The doctor told me to rest and drink a lot of water.', pronunciation: 'luh dohk-TUHR mah DEE duh muh ruh-poh-ZAY ay duh BWAHR boh-KOO DOH.', question: 'What did the doctor advise?', options: ['Rest and drink water', 'Take medicine three times a day', 'See a specialist'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'L\'année dernière, nous avons déménagé à Montréal.', translation: 'Last year, we moved to Montreal.', pronunciation: 'lah-NAY dehr-NYEHR, noo zah-VOHN day-may-nah-ZHAY ah mohn-ray-AHL.', question: 'What happened last year?', options: ['They moved to Montreal', 'They visited Montreal', 'They were born in Montreal'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "I have visited the museum." (passé composé)', accepted: ['j ai visite le musee', 'jai visite le musee'], hint: 'j\'ai visité ___', pronunciation: 'zheh vee-zee-TAY luh mew-ZAY' },
      { id: 'q6', type: 'writing', prompt: 'Write: "It is snowing today."', accepted: ['il neige aujourd hui', 'il neige aujourdhui'], hint: 'il neige ___', pronunciation: 'eel NEZH oh-zhoor-DWEE' },
    ],
  },
  {
    id: 'a2-set-4',
    order: 4,
    title: 'Set 4',
    difficulty: 'Applied',
    questions: [
      { id: 'q1', type: 'reading', text: 'D\'habitude je prends le petit-déjeuner vite, mais aujourd\'hui je n\'ai pas eu le temps.', translation: 'Usually I have breakfast quickly, but today I didn\'t have time.', pronunciation: 'dah-bee-TEWD zhuh prahn luh puh-TEE day-zhuh-NAY VEET, meh oh-zhoor-DWEE zhuh neh pah zew luh TAHN.', question: 'What was different today?', options: ['No time for breakfast', 'Breakfast was bigger', 'Breakfast was later'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Ces chaussures sont trop petites; est-ce que vous avez la taille au-dessus?', translation: 'These shoes are too small; do you have the next size up?', pronunciation: 'say shoh-SEWR sohn troh puh-TEET; es kuh voo zah-VAY lah TIGH oh-duh-SEW?', question: 'What is the problem with the shoes?', options: ['Too small', 'Too expensive', 'Wrong color'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'En automne, les feuilles tombent et il pleut souvent.', translation: 'In autumn, the leaves fall and it rains often.', pronunciation: 'ahn noh-TON, lay FUH-yuh TOHMB ay eel PLUH soo-VAHN.', question: 'Which season is being described?', options: ['Autumn', 'Spring', 'Winter'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'J\'ai de la fièvre, alors j\'ai pris rendez-vous chez le médecin.', translation: 'I have a fever, so I made an appointment with the doctor.', pronunciation: 'zheh duh lah FYEHV-ruh, ah-LOR zheh pree rahn-day-VOO shay luh mayd-SAN.', question: 'What did the speaker do about the fever?', options: ['Made a doctor\'s appointment', 'Went to the pharmacy', 'Stayed in bed all week'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Last weekend, we went to the beach." (passé composé)', accepted: ['le week end dernier nous sommes alles a la plage', 'le weekend dernier nous sommes alles a la plage'], hint: 'le week-end dernier, nous sommes allés ___', pronunciation: 'luh week-END dehr-NYAY, noo som ah-LAY ah lah PLAZH' },
      { id: 'q6', type: 'writing', prompt: 'Write: "I feel unwell."', accepted: ['je ne me sens pas bien', 'je me sens mal'], hint: 'je ne me sens pas ___', pronunciation: 'zhuh nuh muh sahn pah BYAN' },
    ],
  },
  {
    id: 'a2-set-5',
    order: 5,
    title: 'Set 5',
    difficulty: 'Challenge',
    questions: [
      { id: 'q1', type: 'reading', text: 'Normalement je me lève tôt, mais hier je me suis réveillé en retard et j\'ai raté le bus.', translation: 'Normally I get up early, but yesterday I woke up late and missed the bus.', pronunciation: 'nor-mahl-MAHN zhuh muh LEV toh, meh YEHR zhuh muh swee ray-vay-YAY ahn ruh-TAR ay zheh rah-TAY luh BOOS.', question: 'What went wrong yesterday?', options: ['Woke up late and missed the bus', 'Forgot his keys', 'Was sick all day'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Le vendeur m\'a proposé une réduction de vingt pour cent si j\'achetais deux articles.', translation: 'The salesperson offered me a 20% discount if I bought two items.', pronunciation: 'luh vahn-DUHR mah proh-poh-ZAY oon ray-dewk-SYOHN duh van poor SAHN see zhah-shuh-TEH duh zar-TEEK-luh.', question: 'What was the condition for the discount?', options: ['Buying two items', 'Paying in cash', 'Being a returning customer'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Il y avait du vent et le ciel était couvert toute la journée.', translation: 'It was windy and the sky was overcast all day.', pronunciation: 'eel ee ah-VEH dew VAHN ay luh SYEL ay-TEH koo-VEHR toot lah zhoor-NAY.', question: 'What was the sky like?', options: ['Overcast', 'Clear and sunny', 'Full of stars'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Après l\'accident, elle a dû rester à l\'hôpital pendant trois jours.', translation: 'After the accident, she had to stay in the hospital for three days.', pronunciation: 'ah-PREH lahk-see-DAHN, ell ah dew reh-STAY ah loh-pee-TAL pahn-DAHN trwah ZHOOR.', question: 'How long did she stay in the hospital?', options: ['Three days', 'One day', 'A week'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Yesterday I missed the bus."', accepted: ['hier j ai rate le bus', 'hier jai rate le bus'], hint: 'hier, j\'ai raté ___', pronunciation: 'YEHR, zheh rah-TAY luh BOOS' },
      { id: 'q6', type: 'writing', prompt: 'Write: "The doctor told me to rest."', accepted: ['le docteur m a dit de me reposer', 'le docteur ma dit de me reposer'], hint: 'le docteur m\'a dit de ___', pronunciation: 'luh dohk-TUHR mah DEE duh muh ruh-poh-ZAY' },
    ],
  },
  {
    id: 'a2-set-6',
    order: 6,
    title: 'Set 6',
    difficulty: 'Mastery check',
    questions: [
      { id: 'q1', type: 'reading', text: 'D\'habitude je fais tout tranquillement le matin, mais aujourd\'hui je me suis levé en retard, j\'ai sauté le petit-déjeuner et j\'ai couru pour attraper le bus.', translation: 'Usually I do everything calmly in the morning, but today I got up late, skipped breakfast, and ran to catch the bus.', pronunciation: 'dah-bee-TEWD zhuh feh too trahn-keel-MAHN luh mah-TAN, meh oh-zhoor-DWEE zhuh muh swee luh-VAY ahn ruh-TAR, zheh soh-TAY luh puh-TEE day-zhuh-NAY ay zheh koo-REW poor ah-trah-PAY luh BOOS.', question: 'What did the speaker skip?', options: ['Breakfast', 'The bus', 'The morning routine entirely'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Puisque j\'ai été malade toute la semaine, mon médecin m\'a conseillé de ne pas retourner au travail avant lundi prochain.', translation: 'Since I was sick all week, my doctor advised me not to go back to work before next Monday.', pronunciation: 'pweesk zheh ay-TAY mah-LAD toot lah suh-MEN, mohn mayd-SAN mah kohn-say-YAY duh nuh pah ruh-toor-NAY oh trah-VIGH ah-VAHN luhn-DEE proh-SHAN.', question: 'What did the doctor advise?', options: ['Wait until next Monday to return to work', 'See a specialist immediately', 'Take stronger medication'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'La météo annonce de la pluie pour le week-end, mais un peu de soleil lundi.', translation: 'The forecast announces rain for the weekend, but a bit of sun on Monday.', pronunciation: 'lah may-tay-OH ah-NOHNS duh lah PLWEE poor luh week-END, meh uhn puh duh soh-LAY luhn-DEE.', question: 'When does the forecast predict sun?', options: ['Monday', 'The weekend', 'Every day'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Ce magasin avait une promotion incroyable, alors j\'ai acheté trois pulls au lieu d\'un seul.', translation: 'This store had an incredible promotion, so I bought three sweaters instead of just one.', pronunciation: 'suh mah-gah-ZAN ah-VEH oon proh-moh-SYOHN an-krwah-YAH-bluh, ah-LOR zheh ahsh-TAY trwah PEWL oh LYUH duhn SUHL.', question: 'How many sweaters were bought?', options: ['Three', 'One', 'Two'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "I woke up late and I missed the bus."', accepted: ['je me suis leve en retard et j ai rate le bus', 'je me suis leve en retard et jai rate le bus'], hint: 'je me suis levé en retard et j\'ai ___', pronunciation: 'zhuh muh swee luh-VAY ahn ruh-TAR ay zheh rah-TAY luh BOOS' },
      { id: 'q6', type: 'writing', prompt: 'Write: "The doctor advised me to rest and drink water."', accepted: ['le medecin m a conseille de me reposer et de boire de l eau', 'le medecin ma conseille de me reposer et de boire de leau'], hint: 'le médecin m\'a conseillé de ___', pronunciation: 'luh mayd-SAN mah kohn-say-YAY duh muh ruh-poh-ZAY' },
    ],
  },
]
