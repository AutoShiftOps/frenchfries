// C2 Speaking chapters (CLB 10+, mastery) — literary narrative tense
// (passé simple), academic/philosophical argumentation, register-shifting
// irony, complex multi-clause subordination, and rhetorical devices. This
// is the top of the ladder: near-native command of nuance and style. Same
// format as a1/a2/b1/b2/c1-chapters.js: `focus` is the phoneme Azure
// should weigh most, `pronunciation` is a plain-English respelling.

export const C2_CHAPTERS = [
  {
    id: 'literary-narrative',
    order: 1,
    title: 'Literary narrative',
    description: 'Recognize and use the passé simple of formal narration',
    phrases: [
      { id: 'p1', text: 'Il naquit dans un petit village au bord de la mer.', translation: 'He was born in a small village by the sea.', focus: 'r', pronunciation: 'eel nah-KEE dahn zuhn puh-TEE vee-LAZH oh BOR duh lah MEHR' },
      { id: 'p2', text: 'Elle partit sans un mot, laissant tout derrière elle.', translation: 'She left without a word, leaving everything behind.', focus: 'r', pronunciation: 'ell par-TEE sahn zuhn MOH, leh-SAHN too deh-RYEHR ELL' },
      { id: 'p3', text: 'Ils comprirent, trop tard, l\'ampleur de leur erreur.', translation: 'They understood, too late, the extent of their mistake.', focus: 'r', pronunciation: 'eel kohm-PREER, troh TAR, lahm-PLUHR duh luhr eh-RUHR' },
      { id: 'p4', text: 'Le vieil homme se leva et regarda l\'horizon en silence.', translation: 'The old man stood up and looked at the horizon in silence.', focus: 'r', pronunciation: 'luh VYAY-yohm suh luh-VAH ay ruh-gar-DAH loh-ree-ZOHN ahn see-LAHNS' },
      { id: 'p5', text: 'Ainsi s\'acheva une histoire que personne n\'oublierait.', translation: 'Thus ended a story that no one would forget.', focus: 'r', pronunciation: 'an-SEE sah-shuh-VAH ewn ee-STWAHR kuh pehr-SUN noo-blee-REH' },
    ],
  },
  {
    id: 'philosophical-discourse',
    order: 2,
    title: 'Philosophical discourse',
    description: 'Structure an academic argument with precision',
    phrases: [
      { id: 'p1', text: 'Il convient tout d\'abord de distinguer ces deux notions.', translation: 'First of all, one must distinguish between these two concepts.', focus: 'r', pronunciation: 'eel kohn-VYAN too dah-BOR duh dee-stan-GAY say duh noh-SYOHN' },
      { id: 'p2', text: 'Dans quelle mesure peut-on affirmer que la liberté est absolue?', translation: 'To what extent can one claim that freedom is absolute?', focus: 'r', pronunciation: 'dahn kel muh-ZEWR puh-TOHN ah-feer-MAY kuh lah lee-behr-TAY eh tab-soh-LEW' },
      { id: 'p3', text: 'Cette thèse repose sur un présupposé discutable.', translation: 'This thesis rests on a debatable assumption.', focus: 'r', pronunciation: 'set TEZ ruh-POHZ sewr uhn pray-sew-poh-ZAY dee-skew-TAH-bluh' },
      { id: 'p4', text: 'Il n\'en demeure pas moins que la question mérite d\'être posée.', translation: 'It remains nonetheless true that the question deserves to be asked.', focus: 'r', pronunciation: 'eel nahn duh-MUHR pah mwan kuh lah kes-TYOHN may-REET DET-ruh poh-ZAY' },
      { id: 'p5', text: 'En définitive, la réponse dépend du cadre que l\'on adopte.', translation: 'Ultimately, the answer depends on the framework one adopts.', focus: 'r', pronunciation: 'ahn day-fee-nee-TEEV, lah ray-POHNS day-PAHN dew KAH-druh kuh lohn nah-DOPT' },
    ],
  },
  {
    id: 'irony-humor',
    order: 3,
    title: 'Irony and register-shifting',
    description: 'Convey subtle irony and shift between formal and casual tone',
    phrases: [
      { id: 'p1', text: 'Ah, quelle merveilleuse idée de partir sans parapluie sous la pluie!', translation: 'Ah, what a marvelous idea to leave without an umbrella in the rain!', focus: 'r', pronunciation: 'AH, kel mehr-vay-YUHZ ee-DAY duh par-TEER sahn pah-rah-PLWEE soo lah PLWEE' },
      { id: 'p2', text: 'Comme c\'est original, encore un embouteillage à cette heure.', translation: 'How original, another traffic jam at this hour.', focus: 'r', pronunciation: 'kohm seh toh-ree-zhee-NAHL, ahn-KOR uhn nahn-boo-tay-YAZH ah set UHR' },
      { id: 'p3', text: 'Bref, tout se passe à merveille, comme d\'habitude.', translation: 'In short, everything\'s going perfectly, as usual.', focus: 'r', pronunciation: 'BREF, too suh PAHS ah mehr-VAY-yuh, kohm dah-bee-TEWD' },
      { id: 'p4', text: 'On ne peut pas dire qu\'il se soit foulé pour l\'occasion.', translation: 'One can\'t say he went out of his way for the occasion.', focus: 'u', pronunciation: 'ohn nuh puh pah DEER keel suh SWAH foo-LAY poor loh-kah-ZYOHN' },
      { id: 'p5', text: 'Quelle surprise, il a encore oublié notre rendez-vous.', translation: 'What a surprise, he forgot our appointment again.', focus: 'r', pronunciation: 'kel sewr-PREEZ, eel ah ahn-KOR oo-blee-YAY NOH-truh rahn-day-VOO' },
    ],
  },
  {
    id: 'complex-subordination',
    order: 4,
    title: 'Complex subordination',
    description: 'Link multiple clauses with correlative conjunctions',
    phrases: [
      { id: 'p1', text: 'Non seulement il a refusé, mais il a encore critiqué notre projet.', translation: 'Not only did he refuse, but he also criticized our project.', focus: 'r', pronunciation: 'nohn suhl-MAHN eel ah ruh-few-ZAY, meh eel ah ahn-KOR kree-tee-KAY NOH-truh proh-ZHEH' },
      { id: 'p2', text: 'Dans la mesure où les fonds le permettent, le projet sera étendu.', translation: 'Insofar as funds allow, the project will be expanded.', focus: 'r', pronunciation: 'dahn lah muh-ZEWR OO lay FOHN luh pehr-MET, luh proh-ZHEH suh-RAH ay-tahn-DEW' },
      { id: 'p3', text: 'Bien qu\'il ait travaillé dur, il n\'a pas obtenu le poste, ce qui l\'a beaucoup déçu.', translation: 'Although he worked hard, he didn\'t get the position, which disappointed him greatly.', focus: 'r', pronunciation: 'byan keel eh trah-vah-YAY dewr, eel nah pah zohb-tuh-NEW luh POST, suh kee lah boh-KOO day-SEW' },
      { id: 'p4', text: 'Quand bien même vous auriez raison, il faudrait le prouver.', translation: 'Even if you were right, it would still need to be proven.', focus: 'r', pronunciation: 'kahn byan MEM voo zoh-RYAY reh-ZOHN, eel foh-DREH luh proo-VAY' },
      { id: 'p5', text: 'Pour peu qu\'on y réfléchisse, la solution paraît évidente.', translation: 'If one thinks about it even a little, the solution seems obvious.', focus: 'r', pronunciation: 'poor puh kohn ee ray-flay-SHEES, lah soh-lew-SYOHN pah-REH ay-vee-DAHNT' },
    ],
  },
  {
    id: 'rhetorical-mastery',
    order: 5,
    title: 'Rhetorical mastery',
    description: 'Use rhetorical questions and antithesis persuasively',
    phrases: [
      { id: 'p1', text: 'Ne devrions-nous pas plutôt nous demander pourquoi ce système persiste?', translation: 'Shouldn\'t we rather ask why this system persists?', focus: 'r', pronunciation: 'nuh duh-vryohn-NOO pah plew-TOH noo duh-mahn-DAY poor-KWAH suh see-STEM pehr-SEEST' },
      { id: 'p2', text: 'Loin d\'être un obstacle, cette crise pourrait devenir une opportunité.', translation: 'Far from being an obstacle, this crisis could become an opportunity.', focus: 'r', pronunciation: 'lwan DET-ruh uhn nohb-STAH-kluh, set KREEZ poo-REH duh-vuh-NEER ewn oh-por-tew-nee-TAY' },
      { id: 'p3', text: 'Plus on avance, plus les questions se multiplient.', translation: 'The further we go, the more the questions multiply.', focus: 'u', pronunciation: 'plew zoh-nah-VAHNS, plew lay kes-TYOHN suh mewl-tee-PLEE' },
      { id: 'p4', text: 'Ce n\'est pas tant la réponse qui compte, que la question elle-même.', translation: 'It\'s not so much the answer that matters, as the question itself.', focus: 'r', pronunciation: 'suh neh pah TAHN lah ray-POHNS kee KOHNT, kuh lah kes-TYOHN el-MEM' },
      { id: 'p5', text: 'Au fond, n\'est-ce pas là tout l\'enjeu de notre époque?', translation: 'At bottom, isn\'t that the whole issue of our era?', focus: 'r', pronunciation: 'oh FOHN, neh suh pah LAH too lahn-ZHUH duh NOH-truh ay-POHK' },
    ],
  },
]
