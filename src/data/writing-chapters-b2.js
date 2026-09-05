// B2 Writing chapters — same five topics as b2-chapters.js (Speaking).
// `accepted` lists valid answers (normalized: lowercased, accents kept,
// punctuation stripped) — matches writing-chapters-b1.js conventions.

export const WRITING_CHAPTERS_B2 = [
  {
    id: 'debating-issues',
    order: 1,
    title: 'Debating a social issue',
    description: 'Write a concession using bien que and the subjunctive',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "Although it\'s difficult, we must act now."',
        accepted: ['bien que ce soit difficile, il faut agir maintenant', 'bien que ce soit difficile il faut agir maintenant'],
        hint: 'bien que ce soit difficile, il faut ___',
        pronunciation: 'byan kuh suh SWAH dee-fee-SEEL, eel foh tah-ZHEER man-tuh-NAHN',
      },
      {
        id: 'w2',
        prompt: 'Write: "Despite the government\'s efforts, the problem persists."',
        accepted: ['malgré les efforts du gouvernement, le problème persiste', 'malgre les efforts du gouvernement le probleme persiste'],
        hint: 'malgré les efforts du gouvernement, le problème ___',
        pronunciation: 'mahl-GRAY lay zay-FOR dew goo-vehr-nuh-MAHN, luh proh-BLEM pehr-SEEST',
      },
      {
        id: 'w3',
        prompt: 'Write: "Nevertheless, it\'s essential to find a compromise."',
        accepted: ['néanmoins, il est essentiel de trouver un compromis', 'neanmoins il est essentiel de trouver un compromis'],
        hint: 'néanmoins, il est essentiel de ___',
        pronunciation: 'nay-ahn-MWAN, eel eh tay-sahn-SYEL duh troo-VAY uhn kohm-proh-MEE',
      },
    ],
  },
  {
    id: 'reported-speech',
    order: 2,
    title: 'Reporting what someone said',
    description: 'Write reported speech in the past',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "He said he would be late today."',
        accepted: ['il a dit qu\'il serait en retard aujourd\'hui', 'il a dit qu il serait en retard aujourdhui'],
        hint: 'il a dit qu\'il serait ___',
        pronunciation: 'eel ah DEE keel suh-REH ahn ruh-TAR oh-zhoor-DWEE',
      },
      {
        id: 'w2',
        prompt: 'Write: "My colleague announced that he was leaving the company."',
        accepted: ['mon collègue a annoncé qu\'il quittait l\'entreprise', 'mon collegue a annonce qu il quittait l entreprise'],
        hint: 'mon collègue a annoncé qu\'il ___',
        pronunciation: 'mohn koh-LEG ah ah-nohn-SAY keel kee-TEH lahn-truh-PREEZ',
      },
      {
        id: 'w3',
        prompt: 'Write: "The director specified that the meeting would take place Friday."',
        accepted: ['le directeur a précisé que la réunion aurait lieu vendredi', 'le directeur a precise que la reunion aurait lieu vendredi'],
        hint: 'le directeur a précisé que la réunion ___',
        pronunciation: 'luh dee-rek-TUHR ah pray-see-ZAY kuh lah ray-ew-NYOHN oh-REH LYUH vahn-druh-DEE',
      },
    ],
  },
  {
    id: 'regrets',
    order: 3,
    title: 'Expressing regret',
    description: 'Write regrets using the past conditional',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "I should have talked to him sooner."',
        accepted: ['j\'aurais dû lui parler plus tôt', 'j aurais du lui parler plus tot'],
        hint: 'j\'aurais dû lui parler ___',
        pronunciation: 'zhoh-REH dew lwee par-LAY plew TOH',
      },
      {
        id: 'w2',
        prompt: 'Write: "If I had known, I wouldn\'t have come."',
        accepted: ['si j\'avais su, je ne serais pas venu', 'si j avais su je ne serais pas venu'],
        hint: 'si j\'avais su, je ne serais pas ___',
        pronunciation: 'see zhah-VEH SEW, zhuh nuh suh-REH pah vuh-NEW',
      },
      {
        id: 'w3',
        prompt: 'Write: "We could have avoided this mistake."',
        accepted: ['nous aurions pu éviter cette erreur', 'nous aurions pu eviter cette erreur'],
        hint: 'nous aurions pu éviter ___',
        pronunciation: 'noo zoh-RYOHN pew ay-vee-TAY set eh-RUHR',
      },
    ],
  },
  {
    id: 'passive-voice',
    order: 4,
    title: 'Describing processes and news',
    description: 'Write news-style statements in the passive voice',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "The decision was made by the council last night."',
        accepted: ['la décision a été prise par le conseil hier soir', 'la decision a ete prise par le conseil hier soir'],
        hint: 'la décision a été prise par ___',
        pronunciation: 'lah day-see-ZYOHN ah ay-TAY PREEZ par luh kohn-SAY yehr swahr',
      },
      {
        id: 'w2',
        prompt: 'Write: "The results will be announced next week."',
        accepted: ['les résultats seront annoncés la semaine prochaine', 'les resultats seront annonces la semaine prochaine'],
        hint: 'les résultats seront annoncés ___',
        pronunciation: 'lay ray-zewl-TAH suh-ROHN tah-nohn-SAY lah suh-MEN proh-SHEN',
      },
      {
        id: 'w3',
        prompt: 'Write: "The factory was closed for economic reasons."',
        accepted: ['l\'usine a été fermée pour des raisons économiques', 'l usine a ete fermee pour des raisons economiques'],
        hint: 'l\'usine a été fermée pour ___',
        pronunciation: 'lew-ZEEN ah ay-TAY fehr-MAY poor day reh-ZOHN ay-koh-noh-MEEK',
      },
    ],
  },
  {
    id: 'nuanced-arguments',
    order: 5,
    title: 'Making nuanced arguments',
    description: 'Write a balanced argument with contrast connectors',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "However, not everyone shares this opinion."',
        accepted: ['cependant, tout le monde n\'est pas de cet avis', 'cependant tout le monde n est pas de cet avis'],
        hint: 'cependant, tout le monde n\'est pas ___',
        pronunciation: 'suh-pahn-DAHN, too luh MOHND neh pah duh set ah-VEE',
      },
      {
        id: 'w2',
        prompt: 'Write: "Granted, the method has its limits, but it remains useful."',
        accepted: ['certes, la méthode a ses limites, mais elle reste utile', 'certes la methode a ses limites mais elle reste utile'],
        hint: 'certes, la méthode a ses limites, mais elle reste ___',
        pronunciation: 'SEHRT, lah may-TOHD ah say lee-MEET, meh ell REST ew-TEEL',
      },
      {
        id: 'w3',
        prompt: 'Write: "In short, the situation is more complex than it appears."',
        accepted: ['en somme, la situation reste plus complexe qu\'il n\'y paraît', 'en somme la situation reste plus complexe qu il n y parait'],
        hint: 'en somme, la situation reste plus ___',
        pronunciation: 'ahn SOHM, lah see-tew-ah-SYOHN REST plew kohn-PLEKS keel nee pah-REH',
      },
    ],
  },
]
