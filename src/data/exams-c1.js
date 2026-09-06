// C1 practice exams — 6 sets, mixed reading/listening/writing, drawing
// on c1-chapters.js's grammar focus (everyday idioms, literary stylistic
// inversion, diplomatic hedging, abstract nominalization, nuanced
// doubt/certainty).

export const EXAMS_C1 = [
  {
    id: 'c1-set-1',
    order: 1,
    title: 'Set 1',
    difficulty: 'Warm-up',
    questions: [
      { id: 'q1', type: 'reading', text: 'Depuis qu\'il a perdu son emploi, il a vraiment le cafard.', translation: 'Since he lost his job, he\'s really been feeling down.', pronunciation: 'duh-PWEE keel ah pehr-DEW sohn nahm-PLWAH, eel ah vray-MAHN luh kah-FAR.', question: 'What does "avoir le cafard" mean here?', options: ['Feeling down', 'Being very busy', 'Being angry'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Peut-être devrions-nous reconsidérer notre approche avant la prochaine réunion.', translation: 'Perhaps we should reconsider our approach before the next meeting.', pronunciation: 'puh-TET duh-vryohn-NOO ruh-kohn-see-day-RAY NOH-truh ah-PROSH ah-VAHN lah proh-SHEN ray-ew-NYOHN.', question: 'What is being suggested?', options: ['Reconsidering the approach', 'Canceling the meeting', 'Hiring a consultant'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Il se pourrait que la proposition soit acceptée, mais rien n\'est garanti.', translation: 'The proposal might be accepted, but nothing is guaranteed.', pronunciation: 'eel suh poo-REH kuh lah proh-poh-zee-SYOHN swah tahk-sep-TAY, meh RYAN neh gah-rahn-TEE.', question: 'How certain is the outcome?', options: ['Uncertain — nothing is guaranteed', 'Completely certain', 'Definitely rejected'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'La mise en œuvre de cette stratégie prendra plusieurs mois.', translation: 'The implementation of this strategy will take several months.', pronunciation: 'lah MEEZ ahn NUH-vruh duh set strah-tay-ZHEE prahn-DRAH plew-ZYUHR MWAH.', question: 'What will take several months?', options: ['The implementation', 'The planning', 'The approval'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "He has been feeling down since he lost his job." (idiom: avoir le cafard)', accepted: ['il a le cafard depuis qu il a perdu son emploi', 'il a le cafard depuis quil a perdu son emploi'], hint: 'il a le cafard depuis qu\'il a perdu ___', pronunciation: 'eel ah luh kah-FAR duh-PWEE keel ah pehr-DEW sohn nahm-PLWAH' },
      { id: 'q6', type: 'writing', prompt: 'Write: "Perhaps we should reconsider it." (stylistic inversion after peut-être)', accepted: ['peut etre devrions nous reconsiderer cela', 'peut etre devrions nous reconsiderer ca'], hint: 'peut-être devrions-nous ___', pronunciation: 'puh-TET duh-vryohn-NOO ruh-kohn-see-day-RAY suh-LAH' },
    ],
  },
  {
    id: 'c1-set-2',
    order: 2,
    title: 'Set 2',
    difficulty: 'Building',
    questions: [
      { id: 'q1', type: 'reading', text: 'Il m\'a encore posé un lapin, c\'est la troisième fois ce mois-ci.', translation: 'He stood me up again, it\'s the third time this month.', pronunciation: 'eel mah ahn-KOR poh-ZAY uhn lah-PAN, seh lah trwah-ZYEM FWAH suh mwah-SEE.', question: 'What does "poser un lapin" mean?', options: ['To stand someone up', 'To make a mistake', 'To arrive early'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'À peine avait-il terminé son discours que les questions ont commencé à pleuvoir.', translation: 'He had barely finished his speech when the questions started pouring in.', pronunciation: 'ah PEN ah-VEH teel tehr-mee-NAY sohn dee-SKOOR kuh lay kes-TYOHN ohn koh-mahn-SAY ah pluh-VWAHR.', question: 'What happened right after the speech?', options: ['Questions started pouring in', 'The audience left', 'Applause began'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Il n\'empêche que cette décision reste difficile à justifier.', translation: 'Nevertheless, this decision remains hard to justify.', pronunciation: 'eel nahm-PESH kuh set day-see-ZYOHN REST dee-fee-SEEL ah zhew-stee-FYAY.', question: 'How does the speaker view the decision?', options: ['Hard to justify', 'Fully justified', 'Irrelevant'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'La prise de conscience collective a pris du temps, mais elle est bien réelle aujourd\'hui.', translation: 'The collective awareness took time, but it is very real today.', pronunciation: 'lah PREEZ duh kohn-SYAHNS koh-lek-TEEV ah PREE dew TAHN, meh ell eh byan ray-EL oh-zhoor-DWEE.', question: 'What took time to develop?', options: ['Collective awareness', 'The budget approval', 'The new policy'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "He stood me up again." (idiom: poser un lapin)', accepted: ['il m a encore pose un lapin', 'il ma encore pose un lapin'], hint: 'il m\'a encore posé ___', pronunciation: 'eel mah ahn-KOR poh-ZAY uhn lah-PAN' },
      { id: 'q6', type: 'writing', prompt: 'Write: "Nevertheless, it remains hard to justify."', accepted: ['il n empeche que cela reste difficile a justifier', 'il nempeche que cela reste difficile a justifier'], hint: 'il n\'empêche que cela reste ___', pronunciation: 'eel nahm-PESH kuh suh-LAH REST dee-fee-SEEL' },
    ],
  },
  {
    id: 'c1-set-3',
    order: 3,
    title: 'Set 3',
    difficulty: 'Standard',
    questions: [
      { id: 'q1', type: 'reading', text: 'Nous comprenons vos préoccupations et sommes disposés à explorer d\'autres pistes, sans pour autant nous engager formellement.', translation: 'We understand your concerns and are willing to explore other avenues, without formally committing just yet.', pronunciation: 'noo kohm-pruh-NOHN voh pray-oh-kew-pah-SYOHN ay som dee-spoh-ZAY ah eks-ploh-RAY doh-truh PEEST, sahn poor oh-TAHN noo zahn-gah-ZHAY for-mel-MAHN.', question: 'What is the speaker hesitant to do?', options: ['Formally commit', 'Discuss the issue at all', 'Explore other options'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Sans doute faudra-t-il revoir les termes de l\'accord avant la signature finale.', translation: 'The terms of the agreement will no doubt need to be revised before the final signing.', pronunciation: 'sahn DOOT foh-drah-TEEL ruh-VWAHR lay TERM duh lah-KOR ah-VAHN lah see-nyah-TEWR fee-NAL.', question: 'What likely needs revision?', options: ['The terms of the agreement', 'The location of signing', 'The list of signatories'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Il se peut que nous devions revoir notre position sur ce point précis.', translation: 'It\'s possible that we\'ll need to revise our position on this specific point.', pronunciation: 'eel suh PUH kuh noo duh-VYOHN ruh-VWAHR NOH-truh poh-zee-SYOHN sewr suh PWAN pray-SEE.', question: 'What might need revising?', options: ['Their position on one point', 'The whole strategy', 'The negotiating team'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'La mise en œuvre du plan dépendra en grande partie de la coopération des équipes locales.', translation: 'The implementation of the plan will largely depend on the cooperation of local teams.', pronunciation: 'lah MEEZ ahn NUH-vruh dew PLAHN day-pahn-DRAH ahn GRAHND par-TEE duh lah koh-oh-pay-rah-SYOHN day zay-KEEP loh-KAL.', question: 'What does the plan\'s success largely depend on?', options: ['Cooperation of local teams', 'Government funding', 'The original timeline'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "It\'s possible that we\'ll need to revise our position." (nuanced possibility)', accepted: ['il se peut que nous devions revoir notre position'], hint: 'il se peut que nous devions ___', pronunciation: 'eel suh PUH kuh noo duh-VYOHN ruh-VWAHR NOH-truh poh-zee-SYOHN' },
      { id: 'q6', type: 'writing', prompt: 'Write: "The implementation will depend on their cooperation." (nominalization: la mise en œuvre)', accepted: ['la mise en oeuvre dependra de leur cooperation', 'la mise en uvre dependra de leur cooperation'], hint: 'la mise en œuvre dépendra ___', pronunciation: 'lah MEEZ ahn NUH-vruh day-pahn-DRAH duh luhr koh-oh-pay-rah-SYOHN' },
    ],
  },
  {
    id: 'c1-set-4',
    order: 4,
    title: 'Set 4',
    difficulty: 'Applied',
    questions: [
      { id: 'q1', type: 'reading', text: 'Peut-être aurions-nous intérêt à consulter un expert externe avant de trancher cette question épineuse.', translation: 'Perhaps we would benefit from consulting an outside expert before settling this thorny question.', pronunciation: 'puh-TET oh-RYOHN-noo an-tay-REH ah kohn-sewl-TAY uhn nex-PEHR ex-TEHRN ah-VAHN duh trahn-SHAY set kes-TYOHN ay-pee-NUHZ.', question: 'What does the speaker suggest?', options: ['Consulting an outside expert', 'Dropping the question entirely', 'Voting immediately'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Il n\'en demeure pas moins que certains membres de l\'équipe restent réticents face à ce changement.', translation: 'It remains nonetheless true that some team members remain reluctant about this change.', pronunciation: 'eel nahn duh-MUHR pah mwan kuh sehr-TAN MAHMBR duh lay-KEEP REST ray-tee-SAHN fahs ah suh shahn-ZHUH-mahn.', question: 'How do some team members feel?', options: ['Reluctant', 'Enthusiastic', 'Indifferent'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'À vrai dire, je ne suis pas sûr que ce soit la meilleure solution à long terme.', translation: 'To be honest, I\'m not sure this is the best solution in the long run.', pronunciation: 'ah vreh DEER, zhuh nuh swee pah SEWR kuh suh SWAH lah may-YUHR soh-lew-SYOHN ah LOHN TEHRM.', question: 'How confident is the speaker about the solution?', options: ['Not sure it\'s the best long-term', 'Completely confident', 'Certain it will fail'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'La prise de décision finale reviendra au conseil d\'administration, pas à nous.', translation: 'The final decision-making will fall to the board, not to us.', pronunciation: 'lah PREEZ duh day-see-ZYOHN fee-NAL ruh-vyan-DRAH oh kohn-SAY dahd-mee-nee-strah-SYOHN, pah zah NOO.', question: 'Who makes the final decision?', options: ['The board', 'The speaker\'s team', 'An external auditor'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "It remains nonetheless true that some are reluctant." (idiom: il n\'en demeure pas moins que)', accepted: ['il n en demeure pas moins que certains sont reticents', 'il nen demeure pas moins que certains sont reticents'], hint: 'il n\'en demeure pas moins que ___', pronunciation: 'eel nahn duh-MUHR pah mwan kuh sehr-TAN sohn ray-tee-SAHN' },
      { id: 'q6', type: 'writing', prompt: 'Write: "To be honest, I\'m not sure." (hedged uncertainty)', accepted: ['a vrai dire je ne suis pas sur'], hint: 'à vrai dire, je ne suis pas ___', pronunciation: 'ah vreh DEER, zhuh nuh swee pah SEWR' },
    ],
  },
  {
    id: 'c1-set-5',
    order: 5,
    title: 'Set 5',
    difficulty: 'Challenge',
    questions: [
      { id: 'q1', type: 'reading', text: 'Sans doute conviendrait-il de nuancer cette affirmation, tant les avis divergent selon les secteurs concernés.', translation: 'This statement would no doubt need nuancing, given how much opinion diverges across the sectors involved.', pronunciation: 'sahn DOOT kohn-vyan-DREH teel duh new-ahn-SAY set ah-feer-mah-SYOHN, tahn lay zah-VEE dee-VEHRZH suh-LOHN lay sek-TUHR kohn-sehr-NAY.', question: 'Why would the statement need nuancing?', options: ['Opinions diverge across sectors', 'It contains a factual error', 'It is too short'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Toujours est-il que les chiffres du dernier trimestre appellent à la prudence, quels que soient les espoirs affichés.', translation: 'Be that as it may, last quarter\'s figures call for caution, whatever hopes have been expressed.', pronunciation: 'too-ZHOOR eh TEEL kuh lay SHEEF-ruh dew dehr-NYAY tree-MESTR ah-PEL ah lah prew-DAHNS, kel kuh SWAH lay zeh-SPWAHR ah-fee-SHAY.', question: 'What do the figures call for?', options: ['Caution', 'Immediate celebration', 'A total strategy change'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Encore faudrait-il que toutes les parties soient d\'accord sur les priorités avant d\'avancer.', translation: 'It would still need all parties to agree on priorities before moving forward.', pronunciation: 'ahn-KOR foh-DREH teel kuh toot lay par-TEE SWAH dah-KOR sewr lay pree-oh-ree-TAY ah-VAHN dah-vahn-SAY.', question: 'What must happen before moving forward?', options: ['All parties agreeing on priorities', 'A new budget being approved', 'The deadline being extended'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Il ne fait aucun doute que cette prise de position aura des répercussions sur le long terme.', translation: 'There is no doubt that this stance will have long-term repercussions.', pronunciation: 'eel nuh feh oh-KUHN DOOT kuh set PREEZ duh poh-zee-SYOHN oh-RAH day ray-pehr-kew-SYOHN sewr luh LOHN TEHRM.', question: 'How certain is the speaker about repercussions?', options: ['No doubt at all', 'Somewhat doubtful', 'Completely dismissive'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "This statement would no doubt need nuancing." (stylistic inversion after sans doute)', accepted: ['sans doute conviendrait il de nuancer cette affirmation'], hint: 'sans doute conviendrait-il de ___', pronunciation: 'sahn DOOT kohn-vyan-DREH teel duh new-ahn-SAY set ah-feer-mah-SYOHN' },
      { id: 'q6', type: 'writing', prompt: 'Write: "There is no doubt that this will have repercussions."', accepted: ['il ne fait aucun doute que cela aura des repercussions'], hint: 'il ne fait aucun doute que ___', pronunciation: 'eel nuh feh oh-KUHN DOOT kuh suh-LAH oh-RAH day ray-pehr-kew-SYOHN' },
    ],
  },
  {
    id: 'c1-set-6',
    order: 6,
    title: 'Set 6',
    difficulty: 'Mastery check',
    questions: [
      { id: 'q1', type: 'reading', text: 'À peine la nouvelle avait-elle été annoncée que déjà les critiques fusaient de toutes parts, si bien que la direction a dû convoquer une réunion d\'urgence dès le lendemain matin.', translation: 'The news had barely been announced when criticism was already flying from every direction, so much so that management had to call an emergency meeting the very next morning.', pronunciation: 'ah PEN lah noo-VEL ah-VEH tell ay-TAY ah-nohn-SAY kuh day-ZHAH lay kree-TEEK few-ZEH duh toot PAR, see byan kuh lah dee-rek-SYOHN ah dew kohn-voh-KAY oon ray-ew-NYOHN dewr-ZHAHNS deh luh lahn-duh-man mah-TAN.', question: 'What forced the emergency meeting?', options: ['Immediate widespread criticism', 'A financial loss', 'A resignation'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Il n\'en demeure pas moins que, sans une prise de conscience collective rapide, la mise en œuvre de ces réformes restera lettre morte.', translation: 'It remains nonetheless true that, without a swift collective awareness, the implementation of these reforms will remain a dead letter.', pronunciation: 'eel nahn duh-MUHR pah mwan kuh, sahn zoon PREEZ duh kohn-SYAHNS koh-lek-TEEV rah-PEED, lah MEEZ ahn NUH-vruh duh say ray-FORM res-tuh-RAH LET-truh MORT.', question: 'What is needed for the reforms to succeed?', options: ['A swift collective awareness', 'More funding', 'A new committee'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Il se pourrait fort bien que la situation évolue rapidement, mais rien ne permet de l\'affirmer avec certitude pour l\'instant.', translation: 'It could very well be that the situation evolves quickly, but nothing allows us to state that with certainty for now.', pronunciation: 'eel suh poo-REH for byan kuh lah see-tew-ah-SYOHN ay-voh-LEW rah-peed-MAHN, meh RYAN nuh pehr-MEH duh lah-feer-MAY ah-VEK sehr-tee-TEWD poor lan-STAHN.', question: 'How certain is the speaker about a quick evolution?', options: ['Possible but not certain', 'Absolutely certain', 'Ruled out entirely'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Sans pour autant remettre en cause l\'ensemble du projet, quelques ajustements semblent malgré tout nécessaires.', translation: 'Without questioning the whole project, some adjustments nevertheless seem necessary.', pronunciation: 'sahn poor oh-TAHN ruh-MET-truh ahn KOHZ lahn-SAHM-bluh dew proh-ZHEH, kel-kuh zah-zhew-stuh-MAHN SAHM-bluh mahl-GRAY too nay-say-SEHR.', question: 'What seems necessary, without rejecting the project?', options: ['Some adjustments', 'A total redesign', 'Cancellation'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "The news had barely been announced when criticism flew in." (stylistic inversion: à peine)', accepted: ['a peine la nouvelle avait elle ete annoncee que les critiques ont fuse', 'a peine la nouvelle avait elle ete annoncee que les critiques ont fusees'], hint: 'à peine la nouvelle avait-elle été annoncée que ___', pronunciation: 'ah PEN lah noo-VEL ah-VEH tell ay-TAY ah-nohn-SAY' },
      { id: 'q6', type: 'writing', prompt: 'Write: "Without questioning the whole project, some adjustments seem necessary."', accepted: ['sans remettre en cause l ensemble du projet quelques ajustements semblent necessaires', 'sans remettre en cause lensemble du projet quelques ajustements semblent necessaires'], hint: 'sans remettre en cause l\'ensemble du projet, ___', pronunciation: 'sahn ruh-MET-truh ahn KOHZ lahn-SAHM-bluh dew proh-ZHEH' },
    ],
  },
]
