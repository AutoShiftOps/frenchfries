// C2 Writing chapters — same five topics as c2-chapters.js (Speaking).
// `accepted` lists valid answers (normalized: lowercased, accents kept,
// punctuation stripped) — matches writing-chapters-c1.js conventions.

export const WRITING_CHAPTERS_C2 = [
  {
    id: 'literary-narrative',
    order: 1,
    title: 'Literary narrative',
    description: 'Write literary narration using the passé simple',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "He was born in a small village by the sea."',
        accepted: ['il naquit dans un petit village au bord de la mer'],
        hint: 'il naquit dans un petit village ___',
        pronunciation: 'eel nah-KEE dahn zuhn puh-TEE vee-LAZH oh BOR duh lah MEHR',
      },
      {
        id: 'w2',
        prompt: 'Write: "She left without a word."',
        accepted: ['elle partit sans un mot'],
        hint: 'elle partit sans un ___',
        pronunciation: 'ell par-TEE sahn zuhn MOH',
      },
      {
        id: 'w3',
        prompt: 'Write: "Thus ended a story that no one would forget."',
        accepted: ['ainsi s\'acheva une histoire que personne n\'oublierait', 'ainsi s acheva une histoire que personne n oublierait'],
        hint: 'ainsi s\'acheva une histoire que ___',
        pronunciation: 'an-SEE sah-shuh-VAH ewn ee-STWAHR kuh pehr-SUN noo-blee-REH',
      },
    ],
  },
  {
    id: 'philosophical-discourse',
    order: 2,
    title: 'Philosophical discourse',
    description: 'Write a precise academic argument',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "First of all, one must distinguish between these two concepts."',
        accepted: ['il convient tout d\'abord de distinguer ces deux notions', 'il convient tout d abord de distinguer ces deux notions'],
        hint: 'il convient tout d\'abord de ___',
        pronunciation: 'eel kohn-VYAN too dah-BOR duh dee-stan-GAY say duh noh-SYOHN',
      },
      {
        id: 'w2',
        prompt: 'Write: "This thesis rests on a debatable assumption."',
        accepted: ['cette thèse repose sur un présupposé discutable', 'cette these repose sur un presuppose discutable'],
        hint: 'cette thèse repose sur ___',
        pronunciation: 'set TEZ ruh-POHZ sewr uhn pray-sew-poh-ZAY dee-skew-TAH-bluh',
      },
      {
        id: 'w3',
        prompt: 'Write: "Ultimately, the answer depends on the framework one adopts."',
        accepted: ['en définitive, la réponse dépend du cadre que l\'on adopte', 'en definitive la reponse depend du cadre que l on adopte'],
        hint: 'en définitive, la réponse dépend du ___',
        pronunciation: 'ahn day-fee-nee-TEEV, lah ray-POHNS day-PAHN dew KAH-druh kuh lohn nah-DOPT',
      },
    ],
  },
  {
    id: 'irony-humor',
    order: 3,
    title: 'Irony and register-shifting',
    description: 'Write a line with deliberate irony',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "How original, another traffic jam at this hour."',
        accepted: ['comme c\'est original, encore un embouteillage à cette heure', 'comme c est original encore un embouteillage a cette heure'],
        hint: 'comme c\'est original, encore un ___',
        pronunciation: 'kohm seh toh-ree-zhee-NAHL, ahn-KOR uhn nahn-boo-tay-YAZH ah set UHR',
      },
      {
        id: 'w2',
        prompt: 'Write: "In short, everything\'s going perfectly, as usual."',
        accepted: ['bref, tout se passe à merveille, comme d\'habitude', 'bref tout se passe a merveille comme d habitude'],
        hint: 'bref, tout se passe à ___',
        pronunciation: 'BREF, too suh PAHS ah mehr-VAY-yuh, kohm dah-bee-TEWD',
      },
      {
        id: 'w3',
        prompt: 'Write: "What a surprise, he forgot our appointment again."',
        accepted: ['quelle surprise, il a encore oublié notre rendez-vous', 'quelle surprise il a encore oublie notre rendez vous'],
        hint: 'quelle surprise, il a encore ___',
        pronunciation: 'kel sewr-PREEZ, eel ah ahn-KOR oo-blee-YAY NOH-truh rahn-day-VOO',
      },
    ],
  },
  {
    id: 'complex-subordination',
    order: 4,
    title: 'Complex subordination',
    description: 'Write multi-clause sentences with correlative conjunctions',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "Not only did he refuse, but he also criticized our project."',
        accepted: ['non seulement il a refusé, mais il a encore critiqué notre projet', 'non seulement il a refuse mais il a encore critique notre projet'],
        hint: 'non seulement il a refusé, mais ___',
        pronunciation: 'nohn suhl-MAHN eel ah ruh-few-ZAY, meh eel ah ahn-KOR kree-tee-KAY NOH-truh proh-ZHEH',
      },
      {
        id: 'w2',
        prompt: 'Write: "Even if you were right, it would still need to be proven."',
        accepted: ['quand bien même vous auriez raison, il faudrait le prouver', 'quand bien meme vous auriez raison il faudrait le prouver'],
        hint: 'quand bien même vous auriez raison, il ___',
        pronunciation: 'kahn byan MEM voo zoh-RYAY reh-ZOHN, eel foh-DREH luh proo-VAY',
      },
      {
        id: 'w3',
        prompt: 'Write: "Insofar as funds allow, the project will be expanded."',
        accepted: ['dans la mesure où les fonds le permettent, le projet sera étendu', 'dans la mesure ou les fonds le permettent le projet sera etendu'],
        hint: 'dans la mesure où les fonds le permettent, ___',
        pronunciation: 'dahn lah muh-ZEWR OO lay FOHN luh pehr-MET, luh proh-ZHEH suh-RAH ay-tahn-DEW',
      },
    ],
  },
  {
    id: 'rhetorical-mastery',
    order: 5,
    title: 'Rhetorical mastery',
    description: 'Write persuasive sentences with rhetorical devices',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "Shouldn\'t we rather ask why this system persists?"',
        accepted: ['ne devrions-nous pas plutôt nous demander pourquoi ce système persiste', 'ne devrions nous pas plutot nous demander pourquoi ce systeme persiste'],
        hint: 'ne devrions-nous pas plutôt nous demander ___',
        pronunciation: 'nuh duh-vryohn-NOO pah plew-TOH noo duh-mahn-DAY poor-KWAH suh see-STEM pehr-SEEST',
      },
      {
        id: 'w2',
        prompt: 'Write: "The further we go, the more the questions multiply."',
        accepted: ['plus on avance, plus les questions se multiplient', 'plus on avance plus les questions se multiplient'],
        hint: 'plus on avance, plus les questions ___',
        pronunciation: 'plew zoh-nah-VAHNS, plew lay kes-TYOHN suh mewl-tee-PLEE',
      },
      {
        id: 'w3',
        prompt: 'Write: "Far from being an obstacle, this crisis could become an opportunity."',
        accepted: ['loin d\'être un obstacle, cette crise pourrait devenir une opportunité', 'loin d etre un obstacle cette crise pourrait devenir une opportunite'],
        hint: 'loin d\'être un obstacle, cette crise ___',
        pronunciation: 'lwan DET-ruh uhn nohb-STAH-kluh, set KREEZ poo-REH duh-vuh-NEER ewn oh-por-tew-nee-TAY',
      },
    ],
  },
]
