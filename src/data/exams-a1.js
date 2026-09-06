// A1 practice exams — 6 sets, each a short mixed exam (2 reading + 2
// listening + 2 writing questions) drawing on the same topics as
// a1-chapters.js/reading-chapters.js/etc. (greetings, ordering food,
// directions, family, numbers/time), at increasing difficulty within the
// level. Auto-gradable only — no speaking questions (see examScorer.js).

export const EXAMS_A1 = [
  {
    id: 'a1-set-1',
    order: 1,
    title: 'Set 1',
    difficulty: 'Warm-up',
    questions: [
      { id: 'q1', type: 'reading', text: 'Bonjour, je m\'appelle Marc.', translation: 'Hello, my name is Marc.', pronunciation: 'bohn-ZHOOR, zhuh mah-PELL mark.', question: 'What is the speaker doing?', options: ['Introducing himself', 'Ordering food', 'Asking for directions'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Je voudrais un café, s\'il vous plaît.', translation: 'I would like a coffee, please.', pronunciation: 'zhuh voo-DREH uhn kah-FAY, seel voo PLEH.', question: 'What is being ordered?', options: ['A coffee', 'A sandwich', 'A glass of water'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Comment allez-vous?', translation: 'How are you?', pronunciation: 'koh-mahn tah-lay VOO?', question: 'What is being asked?', options: ['How are you', 'Where do you live', 'What time is it'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'J\'ai deux frères et une sœur.', translation: 'I have two brothers and one sister.', pronunciation: 'zheh duh FREHR ay oon SUHR.', question: 'How many siblings does the speaker have?', options: ['Three', 'Two', 'One'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Hello, how are you?"', accepted: ['bonjour comment allez vous', 'bonjour comment ca va'], hint: 'bonjour, comment ___', pronunciation: 'bohn-ZHOOR, koh-mahn tah-lay VOO' },
      { id: 'q6', type: 'writing', prompt: 'Write: "My name is [your name]." — use "Sophie" as the name.', accepted: ['je m appelle sophie'], hint: 'je m\'appelle ___', pronunciation: 'zhuh mah-PELL soh-FEE' },
    ],
  },
  {
    id: 'a1-set-2',
    order: 2,
    title: 'Set 2',
    difficulty: 'Building',
    questions: [
      { id: 'q1', type: 'reading', text: 'Où est la gare, s\'il vous plaît?', translation: 'Where is the train station, please?', pronunciation: 'oo eh lah GAR, seel voo PLEH?', question: 'What is being asked for?', options: ['The train station', 'The restaurant', 'The hotel'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Tournez à gauche, puis continuez tout droit.', translation: 'Turn left, then continue straight ahead.', pronunciation: 'toor-NAY ah GOSH, pwee kohn-tee-NWAY too DRWAH.', question: 'Which direction comes first?', options: ['Left', 'Right', 'Straight ahead'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Il est trois heures et demie.', translation: 'It is half past three.', pronunciation: 'eel eh trwah ZUHR ay duh-MEE.', question: 'What time is it?', options: ['3:30', '3:00', '4:30'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Ma mère s\'appelle Claire.', translation: 'My mother\'s name is Claire.', pronunciation: 'mah MEHR sah-pell KLEHR.', question: 'Whose name is Claire?', options: ['The speaker\'s mother', 'The speaker\'s sister', 'The speaker\'s friend'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Where is the restaurant?"', accepted: ['ou est le restaurant'], hint: 'où est ___', pronunciation: 'oo eh luh res-toh-RAHN' },
      { id: 'q6', type: 'writing', prompt: 'Write the number 30 in French.', accepted: ['trente'], hint: 'tr___', pronunciation: 'TRAHNT' },
    ],
  },
  {
    id: 'a1-set-3',
    order: 3,
    title: 'Set 3',
    difficulty: 'Standard',
    questions: [
      { id: 'q1', type: 'reading', text: 'L\'addition, s\'il vous plaît. Est-ce que vous acceptez les cartes?', translation: 'The bill, please. Do you accept cards?', pronunciation: 'lah-dee-SYOHN, seel voo PLEH. es kuh voo zahk-sep-TAY lay KART?', question: 'What does the speaker ask about, besides the bill?', options: ['Whether cards are accepted', 'Where the bathroom is', 'What time it closes'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Mon père travaille dans un bureau au centre-ville.', translation: 'My father works in an office downtown.', pronunciation: 'mohn PEHR trah-VIGH dahn zuhn bew-ROH oh sahn-truh-VEEL.', question: 'Where does the father work?', options: ['An office downtown', 'A restaurant', 'A school'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Excusez-moi, la pharmacie est loin d\'ici?', translation: 'Excuse me, is the pharmacy far from here?', pronunciation: 'ex-kew-ZAY mwah, lah far-mah-SEE eh lwan dee-SEE?', question: 'What is the speaker asking about?', options: ['Distance to the pharmacy', 'The price of medicine', 'Opening hours'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Nous sommes quatre dans la famille: mes parents, ma sœur et moi.', translation: 'We are four in the family: my parents, my sister, and me.', pronunciation: 'noo som KAH-truh dahn lah fah-MEEY: may pah-RAHN, mah SUHR ay MWAH.', question: 'How many people are in the family?', options: ['Four', 'Three', 'Five'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "I would like a coffee, please."', accepted: ['je voudrais un cafe s il vous plait', 'je voudrais un cafe sil vous plait'], hint: 'je voudrais un ___', pronunciation: 'zhuh voo-DREH uhn kah-FAY' },
      { id: 'q6', type: 'writing', prompt: 'Write: "Turn right."', accepted: ['tournez a droite'], hint: 'tournez à ___', pronunciation: 'toor-NAY ah DRWAHT' },
    ],
  },
  {
    id: 'a1-set-4',
    order: 4,
    title: 'Set 4',
    difficulty: 'Applied',
    questions: [
      { id: 'q1', type: 'reading', text: 'Bonsoir madame, une table pour deux, s\'il vous plaît.', translation: 'Good evening madam, a table for two, please.', pronunciation: 'bohn-SWAHR mah-DAM, oon TAH-bluh poor DUH, seel voo PLEH.', question: 'How many people is the table for?', options: ['Two', 'One', 'Four'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'C\'est au premier étage, à côté de la banque.', translation: 'It\'s on the first floor, next to the bank.', pronunciation: 'seh toh pruh-MYAY ay-TAZH, ah koh-TAY duh lah BAHNK.', question: 'Where is the place located?', options: ['First floor, next to the bank', 'Ground floor, near the station', 'Second floor, near the school'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Le train part à neuf heures moins le quart.', translation: 'The train leaves at a quarter to nine.', pronunciation: 'luh TRAN par ah nuh VUHR mwan luh KAR.', question: 'What time does the train leave?', options: ['8:45', '9:15', '9:45'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Mon grand-père a soixante-dix ans.', translation: 'My grandfather is seventy years old.', pronunciation: 'mohn grahn-PEHR ah swah-sahnt-DEES ahn.', question: 'How old is the grandfather?', options: ['Seventy', 'Sixty', 'Seventeen'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "How are you?" (formal)', accepted: ['comment allez vous'], hint: 'comment ___ vous', pronunciation: 'koh-mahn tah-lay VOO' },
      { id: 'q6', type: 'writing', prompt: 'Write: "I have a sister."', accepted: ['j ai une soeur', 'jai une soeur'], hint: 'j\'ai une ___', pronunciation: 'zheh oon SUHR' },
    ],
  },
  {
    id: 'a1-set-5',
    order: 5,
    title: 'Set 5',
    difficulty: 'Challenge',
    questions: [
      { id: 'q1', type: 'reading', text: 'Pardon, pour aller à la poste, c\'est bien tout droit?', translation: 'Excuse me, to get to the post office, is it straight ahead?', pronunciation: 'par-DOHN, poor ah-LAY ah lah POST, seh byan too DRWAH?', question: 'What is the speaker checking?', options: ['Whether the post office is straight ahead', 'The price of a stamp', 'What time the post office opens'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Je prendrai le poulet avec des frites, et de l\'eau pour boire.', translation: 'I\'ll have the chicken with fries, and water to drink.', pronunciation: 'zhuh prahn-DREH luh poo-LEH ah-VEK day FREET, ay duh LOH poor BWAHR.', question: 'What is being ordered to drink?', options: ['Water', 'Wine', 'Juice'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Ma tante habite avec mes cousins près de Lyon.', translation: 'My aunt lives with my cousins near Lyon.', pronunciation: 'mah TAHNT ah-BEET ah-VEK may koo-ZAN preh duh lee-OHN.', question: 'Who does the aunt live with?', options: ['Her cousins', 'Her parents', 'Alone'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Le magasin ferme à dix-neuf heures, sauf le dimanche.', translation: 'The store closes at 7pm, except on Sunday.', pronunciation: 'luh mah-gah-ZAN FEHRM ah deez-nuh-VUHR, sohf luh dee-MAHNSH.', question: 'When does the store NOT follow this closing time?', options: ['Sunday', 'Saturday', 'Monday'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "The train leaves at eight o\'clock."', accepted: ['le train part a huit heures'], hint: 'le train part à ___', pronunciation: 'luh TRAN par ah weet UHR' },
      { id: 'q6', type: 'writing', prompt: 'Write: "Excuse me, where is the bank?"', accepted: ['excusez moi ou est la banque'], hint: 'excusez-moi, où est ___', pronunciation: 'ex-kew-ZAY mwah, oo eh lah BAHNK' },
    ],
  },
  {
    id: 'a1-set-6',
    order: 6,
    title: 'Set 6',
    difficulty: 'Mastery check',
    questions: [
      { id: 'q1', type: 'reading', text: 'Nous sommes en retard: le bus part dans cinq minutes et la gare est à dix minutes à pied.', translation: 'We\'re late: the bus leaves in five minutes and the station is a ten-minute walk away.', pronunciation: 'noo som ahn ruh-TAR: luh BOOS par dahn sank mee-NEWT ay lah GAR eh tah dee mee-NEWT ah PYAY.', question: 'Why are they in a hurry?', options: ['The bus leaves before they can walk there', 'The store is closing', 'The restaurant is full'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Bonjour, j\'ai une réservation au nom de Dubois pour vingt heures.', translation: 'Hello, I have a reservation under the name Dubois for 8pm.', pronunciation: 'bohn-ZHOOR, zheh oon ray-zehr-vah-SYOHN oh nohn duh dew-BWAH poor van-TUHR.', question: 'What time is the reservation?', options: ['8pm', '8am', '2pm'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Mes grands-parents ont quatre-vingts ans et habitent toujours dans leur maison.', translation: 'My grandparents are eighty and still live in their house.', pronunciation: 'may grahn-pah-RAHN ohn kah-truh-VAN ahn ay ah-BEET too-ZHOOR dahn luhr meh-ZOHN.', question: 'How old are the grandparents?', options: ['Eighty', 'Forty', 'Eighteen'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Le musée est ouvert de neuf heures à dix-huit heures, fermé le lundi.', translation: 'The museum is open from 9am to 6pm, closed on Monday.', pronunciation: 'luh mew-ZAY eh too-VEHR duh nuh-VUHR ah deez-weet UHR, fehr-MAY luh luhn-DEE.', question: 'Which day is the museum closed?', options: ['Monday', 'Sunday', 'Friday'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "I have a reservation for two people."', accepted: ['j ai une reservation pour deux personnes', 'jai une reservation pour deux personnes'], hint: 'j\'ai une réservation pour ___', pronunciation: 'zheh oon ray-zehr-vah-SYOHN poor duh pehr-SUN' },
      { id: 'q6', type: 'writing', prompt: 'Write: "The museum is closed on Monday."', accepted: ['le musee est ferme le lundi'], hint: 'le musée est fermé ___', pronunciation: 'luh mew-ZAY eh fehr-MAY luh luhn-DEE' },
    ],
  },
]
