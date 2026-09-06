// C2 practice exams — 6 sets, mixed reading/listening/writing, drawing
// on c2-chapters.js's grammar focus (passé simple narration, philosophical
// discourse, irony/register-shifting, complex subordination, rhetorical
// mastery). The top of the ladder — near-native command of nuance.

export const EXAMS_C2 = [
  {
    id: 'c2-set-1',
    order: 1,
    title: 'Set 1',
    difficulty: 'Warm-up',
    questions: [
      { id: 'q1', type: 'reading', text: 'Il naquit dans un petit village au bord de la mer et n\'en partit jamais.', translation: 'He was born in a small village by the sea and never left it.', pronunciation: 'eel nah-KEE dahn zuhn puh-TEE vee-LAZH oh BOR duh lah MEHR ay nahn par-TEE zhah-MEH.', question: 'Where was he born?', options: ['A small village by the sea', 'A big city', 'A mountain town'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Il convient tout d\'abord de distinguer ces deux notions souvent confondues.', translation: 'First of all, one must distinguish between these two often-confused concepts.', pronunciation: 'eel kohn-VYAN too dah-BOR duh dee-stan-GAY say duh noh-SYOHN soo-VAHN kohn-FOHN-dew.', question: 'What must be done first?', options: ['Distinguish two concepts', 'Reject the thesis', 'Cite an example'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Comme c\'est original, encore un embouteillage à cette heure.', translation: 'How original, another traffic jam at this hour.', pronunciation: 'kohm seh toh-ree-zhee-NAHL, ahn-KOR uhn nahn-boo-tay-YAZH ah set UHR.', question: 'What tone does the speaker use?', options: ['Ironic', 'Genuinely impressed', 'Neutral'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Non seulement il a refusé, mais il a encore critiqué notre projet.', translation: 'Not only did he refuse, but he also criticized our project.', pronunciation: 'nohn suhl-MAHN eel ah ruh-few-ZAY, meh eel ah ahn-KOR kree-tee-KAY NOH-truh proh-ZHEH.', question: 'What did he do besides refusing?', options: ['Criticized the project', 'Apologized', 'Left early'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "He was born in a small village." (passé simple)', accepted: ['il naquit dans un petit village'], hint: 'il naquit dans ___', pronunciation: 'eel nah-KEE dahn zuhn puh-TEE vee-LAZH' },
      { id: 'q6', type: 'writing', prompt: 'Write: "First of all, one must distinguish between these two concepts."', accepted: ['il convient tout d abord de distinguer ces deux notions', 'il convient tout dabord de distinguer ces deux notions'], hint: 'il convient tout d\'abord de ___', pronunciation: 'eel kohn-VYAN too dah-BOR duh dee-stan-GAY say duh noh-SYOHN' },
    ],
  },
  {
    id: 'c2-set-2',
    order: 2,
    title: 'Set 2',
    difficulty: 'Building',
    questions: [
      { id: 'q1', type: 'reading', text: 'Elle partit sans un mot, laissant tout derrière elle, y compris ses souvenirs.', translation: 'She left without a word, leaving everything behind, including her memories.', pronunciation: 'ell par-TEE sahn zuhn MOH, leh-SAHN too deh-RYEHR ELL, ee kohm-PREE say soo-vuh-NEER.', question: 'What did she leave behind, besides her belongings?', options: ['Her memories', 'Her family', 'Her job'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Cette thèse repose sur un présupposé discutable, que l\'auteur ne remet jamais en question.', translation: 'This thesis rests on a debatable assumption, which the author never questions.', pronunciation: 'set TEZ ruh-POHZ sewr uhn pray-sew-poh-ZAY dee-skew-TAH-bluh, kuh loh-TUHR nuh ruh-MEH zhah-MEH ahn kes-TYOHN.', question: 'What does the author never do?', options: ['Question the assumption', 'Cite sources', 'Reach a conclusion'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'On ne peut pas dire qu\'il se soit foulé pour préparer cette présentation.', translation: 'One can\'t say he went out of his way to prepare this presentation.', pronunciation: 'ohn nuh puh pah DEER keel suh SWAH foo-LAY poor pray-pah-RAY set pray-zahn-tah-SYOHN.', question: 'What is implied about the effort put in?', options: ['Very little effort was made', 'A great deal of effort was made', 'No presentation was made'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Quand bien même vous auriez raison, il faudrait le prouver.', translation: 'Even if you were right, it would still need to be proven.', pronunciation: 'kahn byan MEM voo zoh-RYAY reh-ZOHN, eel foh-DREH luh proo-VAY.', question: 'What would still be needed, even if right?', options: ['Proof', 'An apology', 'More time'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "She left without a word." (passé simple)', accepted: ['elle partit sans un mot'], hint: 'elle partit sans un ___', pronunciation: 'ell par-TEE sahn zuhn MOH' },
      { id: 'q6', type: 'writing', prompt: 'Write: "Even if you were right, it would need to be proven." (correlative subordination)', accepted: ['quand bien meme vous auriez raison il faudrait le prouver'], hint: 'quand bien même vous auriez raison, ___', pronunciation: 'kahn byan MEM voo zoh-RYAY reh-ZOHN, eel foh-DREH luh proo-VAY' },
    ],
  },
  {
    id: 'c2-set-3',
    order: 3,
    title: 'Set 3',
    difficulty: 'Standard',
    questions: [
      { id: 'q1', type: 'reading', text: 'Ainsi s\'acheva une histoire que personne n\'oublierait de sitôt.', translation: 'Thus ended a story that no one would forget any time soon.', pronunciation: 'an-SEE sah-shuh-VAH ewn ee-STWAHR kuh pehr-SUN noo-blee-REH duh see-TOH.', question: 'How is the story described?', options: ['Unforgettable', 'Boring', 'Unfinished'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'En définitive, la réponse dépend entièrement du cadre théorique que l\'on adopte.', translation: 'Ultimately, the answer depends entirely on the theoretical framework one adopts.', pronunciation: 'ahn day-fee-nee-TEEV, lah ray-POHNS day-PAHN ahn-tyehr-MAHN dew KAH-druh tay-oh-REEK kuh lohn nah-DOPT.', question: 'What does the answer depend on?', options: ['The theoretical framework adopted', 'The author\'s mood', 'Public opinion'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Bref, tout se passe à merveille, comme d\'habitude, ironisa-t-elle.', translation: '"In short, everything\'s going perfectly, as usual," she said ironically.', pronunciation: 'BREF, too suh PAHS ah mehr-VAY-yuh, kohm dah-bee-TEWD, ee-roh-nee-ZAH-tel.', question: 'How does she actually mean her statement?', options: ['Ironically, the opposite is true', 'Completely sincerely', 'As a genuine compliment'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Dans la mesure où les fonds nécessaires seront réunis, le projet pourra être étendu.', translation: 'Insofar as the necessary funds are gathered, the project could be expanded.', pronunciation: 'dahn lah muh-ZEWR OO lay FOHN nay-say-SEHR suh-ROHN ray-ew-NEE, luh proh-ZHEH poo-RAH ET-ruh ay-tahn-DEW.', question: 'Under what condition can the project expand?', options: ['If necessary funds are gathered', 'If the committee resigns', 'Never, under any condition'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Ultimately, the answer depends on the framework one adopts."', accepted: ['en definitive la reponse depend du cadre que l on adopte', 'en definitive la reponse depend du cadre que lon adopte'], hint: 'en définitive, la réponse dépend du ___', pronunciation: 'ahn day-fee-nee-TEEV, lah ray-POHNS day-PAHN dew KAH-druh kuh lohn nah-DOPT' },
      { id: 'q6', type: 'writing', prompt: 'Write: "Insofar as funds allow, the project will be expanded." (dans la mesure où)', accepted: ['dans la mesure ou les fonds le permettent le projet sera etendu'], hint: 'dans la mesure où les fonds le permettent, ___', pronunciation: 'dahn lah muh-ZEWR OO lay FOHN luh pehr-MET, luh proh-ZHEH suh-RAH ay-tahn-DEW' },
    ],
  },
  {
    id: 'c2-set-4',
    order: 4,
    title: 'Set 4',
    difficulty: 'Applied',
    questions: [
      { id: 'q1', type: 'reading', text: 'Non seulement il a refusé notre offre, mais il a encore critiqué l\'ensemble du projet devant le comité.', translation: 'Not only did he refuse our offer, but he also criticized the whole project in front of the committee.', pronunciation: 'nohn suhl-MAHN eel ah ruh-few-ZAY NOH-truh OH-fruh, meh eel ah ahn-KOR kree-tee-KAY lahn-SAHM-bluh dew proh-ZHEH duh-VAHN luh koh-mee-TAY.', question: 'What did he do besides refusing the offer?', options: ['Criticized the project publicly', 'Approved it silently', 'Left the meeting'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Ne devrions-nous pas plutôt nous demander pourquoi ce système persiste malgré ses failles évidentes?', translation: 'Shouldn\'t we rather ask why this system persists despite its obvious flaws?', pronunciation: 'nuh duh-vryohn-NOO pah plew-TOH noo duh-mahn-DAY poor-KWAH suh see-STEM pehr-SEEST mahl-GRAY say FIGH ay-vee-DAHNT.', question: 'What question does the speaker raise?', options: ['Why the flawed system persists', 'How to replace the system', 'Who created the system'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Loin d\'être un obstacle, cette crise pourrait bien devenir une opportunité inattendue.', translation: 'Far from being an obstacle, this crisis could well become an unexpected opportunity.', pronunciation: 'lwan DET-ruh uhn nohb-STAH-kluh, set KREEZ poo-REH byan duh-vuh-NEER ewn oh-por-tew-nee-TAY ee-nah-tahn-DEW.', question: 'How does the speaker frame the crisis?', options: ['As a potential opportunity', 'As a complete disaster', 'As irrelevant'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Pour peu qu\'on y réfléchisse, la solution paraît évidente.', translation: 'If one thinks about it even a little, the solution seems obvious.', pronunciation: 'poor puh kohn ee ray-flay-SHEES, lah soh-lew-SYOHN pah-REH ay-vee-DAHNT.', question: 'How does the solution seem, upon reflection?', options: ['Obvious', 'Impossible', 'Irrelevant'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Not only did he refuse, but he also criticized the project."', accepted: ['non seulement il a refuse mais il a encore critique le projet'], hint: 'non seulement il a refusé, mais ___', pronunciation: 'nohn suhl-MAHN eel ah ruh-few-ZAY, meh eel ah ahn-KOR kree-tee-KAY luh proh-ZHEH' },
      { id: 'q6', type: 'writing', prompt: 'Write: "Far from being an obstacle, this crisis could become an opportunity."', accepted: ['loin d etre un obstacle cette crise pourrait devenir une opportunite'], hint: 'loin d\'être un obstacle, cette crise ___', pronunciation: 'lwan DET-ruh uhn nohb-STAH-kluh, set KREEZ poo-REH duh-vuh-NEER ewn oh-por-tew-nee-TAY' },
    ],
  },
  {
    id: 'c2-set-5',
    order: 5,
    title: 'Set 5',
    difficulty: 'Challenge',
    questions: [
      { id: 'q1', type: 'reading', text: 'Bien qu\'il ait travaillé dur pendant des mois, il n\'a pas obtenu le poste, ce qui l\'a beaucoup déçu.', translation: 'Although he worked hard for months, he didn\'t get the position, which disappointed him greatly.', pronunciation: 'byan keel eh trah-vah-YAY dewr pahn-DAHN day MWAH, eel nah pah zohb-tuh-NEW luh POST, suh kee lah boh-KOO day-SEW.', question: 'How did he feel about not getting the position?', options: ['Very disappointed', 'Relieved', 'Indifferent'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Ce n\'est pas tant la réponse qui compte, que la question elle-même, conclut-elle.', translation: '"It\'s not so much the answer that matters, as the question itself," she concludes.', pronunciation: 'suh neh pah TAHN lah ray-POHNS kee KOHNT, kuh lah kes-TYOHN el-MEM, kohn-KLEW-tel.', question: 'What does she conclude matters most?', options: ['The question itself', 'The final answer', 'Neither matters'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Au fond, n\'est-ce pas là tout l\'enjeu de notre époque?', translation: 'At bottom, isn\'t that the whole issue of our era?', pronunciation: 'oh FOHN, neh suh pah LAH too lahn-ZHUH duh NOH-truh ay-POHK.', question: 'What does the speaker imply?', options: ['This is the defining issue of our time', 'This issue is minor', 'This issue is resolved'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Plus on avance, plus les questions se multiplient.', translation: 'The further we go, the more the questions multiply.', pronunciation: 'plew zoh-nah-VAHNS, plew lay kes-TYOHN suh mewl-tee-PLEE.', question: 'What happens as things progress?', options: ['Questions multiply', 'Answers become clear', 'Interest fades'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Although he worked hard, he didn\'t get the position." (bien que + subjunctive)', accepted: ['bien qu il ait travaille dur il n a pas obtenu le poste', 'bien quil ait travaille dur il na pas obtenu le poste'], hint: 'bien qu\'il ait travaillé dur, il ___', pronunciation: 'byan keel eh trah-vah-YAY dewr, eel nah pah zohb-tuh-NEW luh POST' },
      { id: 'q6', type: 'writing', prompt: 'Write: "The further we go, the more the questions multiply." (plus...plus construction)', accepted: ['plus on avance plus les questions se multiplient'], hint: 'plus on avance, plus ___', pronunciation: 'plew zoh-nah-VAHNS, plew lay kes-TYOHN suh mewl-tee-PLEE' },
    ],
  },
  {
    id: 'c2-set-6',
    order: 6,
    title: 'Set 6',
    difficulty: 'Mastery check',
    questions: [
      { id: 'q1', type: 'reading', text: 'Il n\'en demeure pas moins que, sans une prise de conscience collective rapide, la mise en œuvre de ces réformes restera lettre morte, et ce quelle que soit la bonne volonté affichée par les responsables.', translation: 'It remains nonetheless true that, without a swift collective awareness, the implementation of these reforms will remain a dead letter, whatever the goodwill displayed by those in charge.', pronunciation: 'eel nahn duh-MUHR pah mwan kuh, sahn zoon PREEZ duh kohn-SYAHNS koh-lek-TEEV rah-PEED, lah MEEZ ahn NUH-vruh duh say ray-FORM res-tuh-RAH LET-truh MORT, ay suh kel kuh SWAH lah BUN voh-lohn-TAY ah-fee-SHAY par lay ruh-spohn-SAH-bluh.', question: 'What will the reforms remain, without swift collective awareness?', options: ['A dead letter', 'Fully implemented', 'Postponed indefinitely'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Comme c\'est original, dit-il d\'un ton qui trahissait tout le contraire de l\'admiration, encore un rapport qui ne changera rien.', translation: '"How original," he said in a tone that betrayed anything but admiration, "another report that will change nothing."', pronunciation: 'kohm seh toh-ree-zhee-NAHL, dee-TEEL duhn TOHN kee trah-ee-SEH too luh kohn-TREHR duh lahd-mee-rah-SYOHN, ahn-KOR uhn rah-POR kee nuh shahn-zhuh-RAH RYAN.', question: 'What does his tone actually convey?', options: ['The opposite of admiration', 'Genuine admiration', 'Complete indifference'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Non seulement la proposition fut rejetée, mais elle suscita encore une vague de critiques que personne n\'avait anticipée.', translation: 'Not only was the proposal rejected, but it also triggered a wave of criticism that no one had anticipated.', pronunciation: 'nohn suhl-MAHN lah proh-poh-zee-SYOHN few ruh-zhuh-TAY, meh ell sew-see-TAH ahn-KOR ewn VAHG duh kree-TEEK kuh pehr-SUN nah-VEH ahn-tee-see-PAY.', question: 'What did the rejection also trigger?', options: ['An unanticipated wave of criticism', 'A quick resolution', 'A new proposal'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Quand bien même l\'on parviendrait à un consensus aujourd\'hui, rien ne garantit qu\'il tiendrait face aux pressions de demain.', translation: 'Even if a consensus were reached today, nothing guarantees it would hold up against tomorrow\'s pressures.', pronunciation: 'kahn byan MEM lohn par-vyan-DREH ah tuhn kohn-sahn-SEWS oh-zhoor-DWEE, RYAN nuh gah-rahn-TEE keel tyan-DREH fahs oh pray-SYOHN duh duh-MAN.', question: 'What does nothing guarantee?', options: ['That a consensus would hold up over time', 'That a consensus is possible at all', 'That pressures will ease'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Not only was the proposal rejected, but it triggered criticism." (non seulement...mais construction)', accepted: ['non seulement la proposition a ete rejetee mais elle a suscite des critiques'], hint: 'non seulement la proposition a été rejetée, mais ___', pronunciation: 'nohn suhl-MAHN lah proh-poh-zee-SYOHN ah ay-TAY ruh-zhuh-TAY, meh ell ah sew-see-TAY day kree-TEEK' },
      { id: 'q6', type: 'writing', prompt: 'Write: "Even if a consensus were reached, nothing guarantees it would last." (quand bien même)', accepted: ['quand bien meme un consensus serait atteint rien ne garantit qu il durerait', 'quand bien meme un consensus serait atteint rien ne garantit quil durerait'], hint: 'quand bien même un consensus serait atteint, ___', pronunciation: 'kahn byan MEM uhn kohn-sahn-SEWS suh-REH ah-TAN, RYAN nuh gah-rahn-TEE keel dew-ruh-REH' },
    ],
  },
]
