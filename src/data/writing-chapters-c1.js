// C1 Writing chapters — same five topics as c1-chapters.js (Speaking).
// `accepted` lists valid answers (normalized: lowercased, accents kept,
// punctuation stripped) — matches writing-chapters-b2.js conventions.

export const WRITING_CHAPTERS_C1 = [
  {
    id: 'idiomatic-expressions',
    order: 1,
    title: 'Everyday idioms',
    description: 'Write natural idiomatic expressions',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "I\'ve been feeling down since my best friend moved away."',
        accepted: ['j\'ai le cafard depuis que mon meilleur ami a déménagé', 'j ai le cafard depuis que mon meilleur ami a demenage'],
        hint: 'j\'ai le cafard depuis que ___',
        pronunciation: 'zhay luh kah-FAR duh-PWEE kuh mohn meh-YUHR ah-MEE ah day-may-nah-ZHAY',
      },
      {
        id: 'w2',
        prompt: 'Write: "He stood me up last night."',
        accepted: ['il m\'a posé un lapin hier soir', 'il m a pose un lapin hier soir'],
        hint: 'il m\'a posé un lapin ___',
        pronunciation: 'eel mah poh-ZAY uhn lah-PAN yehr swahr',
      },
      {
        id: 'w3',
        prompt: 'Write: "It costs an arm and a leg."',
        accepted: ['ça coûte les yeux de la tête', 'ca coute les yeux de la tete'],
        hint: 'ça coûte les yeux de ___',
        pronunciation: 'sah KOOT lay zyuh duh lah TET',
      },
    ],
  },
  {
    id: 'stylistic-inversion',
    order: 2,
    title: 'Formal stylistic inversion',
    description: 'Write formal sentences with literary inversion',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "Perhaps we should reconsider our approach."',
        accepted: ['peut-être devrions-nous reconsidérer notre approche', 'peut etre devrions nous reconsiderer notre approche'],
        hint: 'peut-être devrions-nous ___',
        pronunciation: 'puh-TEH-truh duh-vryohn-NOO ruh-kohn-see-day-RAY NOH-truh ah-PROSH',
      },
      {
        id: 'w2',
        prompt: 'Write: "The whole budget will no doubt have to be revised."',
        accepted: ['sans doute faudra-t-il revoir l\'ensemble du budget', 'sans doute faudra t il revoir l ensemble du budget'],
        hint: 'sans doute faudra-t-il ___',
        pronunciation: 'sahn DOOT foh-drah-TEEL ruh-VWAHR lahn-SAHM-bluh dew bew-ZHEH',
      },
      {
        id: 'w3',
        prompt: 'Write: "That would still require everyone to agree."',
        accepted: ['encore faudrait-il que tout le monde soit d\'accord', 'encore faudrait il que tout le monde soit d accord'],
        hint: 'encore faudrait-il que tout le monde ___',
        pronunciation: 'ahn-KOR foh-DREH-teel kuh too luh MOHND swah dah-KOR',
      },
    ],
  },
  {
    id: 'negotiation',
    order: 3,
    title: 'Diplomatic negotiation',
    description: 'Write tactful, hedged negotiation language',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "We would be willing to reconsider our terms."',
        accepted: ['nous serions disposés à revoir nos conditions', 'nous serions disposes a revoir nos conditions'],
        hint: 'nous serions disposés à ___',
        pronunciation: 'noo suh-RYOHN dee-spoh-ZAY ah ruh-VWAHR noh kohn-dee-SYOHN',
      },
      {
        id: 'w2',
        prompt: 'Write: "Unless I\'m mistaken, this clause is problematic."',
        accepted: ['sauf erreur de ma part, cette clause pose problème', 'sauf erreur de ma part cette clause pose probleme'],
        hint: 'sauf erreur de ma part, cette clause ___',
        pronunciation: 'sohf eh-RUHR duh mah PAR, set KLOHZ POHZ proh-BLEM',
      },
      {
        id: 'w3',
        prompt: 'Write: "We would like to move up the deadline."',
        accepted: ['nous aimerions avancer la date limite'],
        hint: 'nous aimerions avancer ___',
        pronunciation: 'noo zem-RYOHN ah-vahn-SAY lah DAHT lee-MEET',
      },
    ],
  },
  {
    id: 'abstract-nominalization',
    order: 4,
    title: 'Abstract formal writing',
    description: 'Write formal sentences using nominalization',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "The implementation of this policy will take several years."',
        accepted: ['la mise en œuvre de cette politique prendra plusieurs années', 'la mise en oeuvre de cette politique prendra plusieurs annees'],
        hint: 'la mise en œuvre de cette politique ___',
        pronunciation: 'lah MEEZ ahn NUHV-ruh duh set poh-lee-TEEK prahn-DRAH plew-ZYUHR zah-NAY',
      },
      {
        id: 'w2',
        prompt: 'Write: "The increase in inequality remains a matter of concern."',
        accepted: ['l\'accroissement des inégalités reste un sujet de préoccupation', 'l accroissement des inegalites reste un sujet de preoccupation'],
        hint: 'l\'accroissement des inégalités reste ___',
        pronunciation: 'lah-krwahs-MAHN day zee-nay-gah-lee-TAY REST uhn sew-ZHEH duh pray-oh-kew-pah-SYOHN',
      },
      {
        id: 'w3',
        prompt: 'Write: "The questioning of the system sparked a lively debate."',
        accepted: ['la remise en question du système a suscité un vif débat', 'la remise en question du systeme a suscite un vif debat'],
        hint: 'la remise en question du système a suscité ___',
        pronunciation: 'lah ruh-MEEZ ahn kes-TYOHN dew see-STEM ah sew-see-TAY uhn VEEF day-BAH',
      },
    ],
  },
  {
    id: 'expressing-nuance',
    order: 5,
    title: 'Expressing subtle nuance',
    description: 'Write nuanced statements of doubt and certainty',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "It may well be that the situation evolves quickly."',
        accepted: ['il se peut que la situation évolue rapidement', 'il se peut que la situation evolue rapidement'],
        hint: 'il se peut que la situation ___',
        pronunciation: 'eel suh PUH kuh lah see-tew-ah-SYOHN ay-VOHL rah-peed-MAHN',
      },
      {
        id: 'w2',
        prompt: 'Write: "Still, this point deserves to be clarified."',
        accepted: ['il n\'empêche que ce point mérite d\'être clarifié', 'il n empeche que ce point merite d etre clarifie'],
        hint: 'il n\'empêche que ce point ___',
        pronunciation: 'eel nahn-PESH kuh suh PWAN may-REET DET-ruh klah-ree-FYAY',
      },
      {
        id: 'w3',
        prompt: 'Write: "Nothing allows us to claim that this hypothesis is correct."',
        accepted: ['rien ne permet d\'affirmer que cette hypothèse soit exacte', 'rien ne permet d affirmer que cette hypothese soit exacte'],
        hint: 'rien ne permet d\'affirmer que cette hypothèse ___',
        pronunciation: 'ryan nuh pehr-MEH dah-feer-MAY kuh set ee-poh-TEZ SWAH teg-ZAKT',
      },
    ],
  },
]
