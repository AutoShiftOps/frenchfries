// C1 Speaking chapters (CLB 9) — near-native command of register: common
// idioms, literary stylistic inversion after adverbs (peut-être, aussi, à
// peine), diplomatic hedging for negotiation, abstract nominalization
// typical of formal writing, and subtle expressions of doubt/certainty.
// Same format as a1/a2/b1/b2-chapters.js: `focus` is the phoneme Azure
// should weigh most, `pronunciation` is a plain-English respelling.

export const C1_CHAPTERS = [
  {
    id: 'idiomatic-expressions',
    order: 1,
    title: 'Everyday idioms',
    description: 'Use common idioms naturally in conversation',
    phrases: [
      { id: 'p1', text: 'J\'ai le cafard depuis que mon meilleur ami a déménagé.', translation: 'I\'ve been feeling down since my best friend moved away.', focus: 'r', pronunciation: 'zhay luh kah-FAR duh-PWEE kuh mohn meh-YUHR ah-MEE ah day-may-nah-ZHAY' },
      { id: 'p2', text: 'Il m\'a posé un lapin hier soir sans même s\'excuser.', translation: 'He stood me up last night without even apologizing.', focus: 'r', pronunciation: 'eel mah poh-ZAY uhn lah-PAN yehr swahr sahn MEM sek-skew-ZAY' },
      { id: 'p3', text: 'Ne tourne pas autour du pot, dis-moi ce qui ne va pas.', translation: 'Stop beating around the bush, tell me what\'s wrong.', focus: 'u', pronunciation: 'nuh TOORN pah zoh-TOOR dew POH, dee-MWAH suh kee nuh vah PAH' },
      { id: 'p4', text: 'Ça coûte les yeux de la tête, je ne peux pas me le permettre.', translation: 'It costs an arm and a leg, I can\'t afford it.', focus: 'u', pronunciation: 'sah KOOT lay zyuh duh lah TET, zhuh nuh puh pah muh luh pehr-MET-ruh' },
      { id: 'p5', text: 'Il faut qu\'on mette les points sur les i avant de signer.', translation: 'We need to spell things out clearly before signing.', focus: 'r', pronunciation: 'eel foh kohn MET lay pwan sewr lay zee ah-vahn duh see-NYAY' },
    ],
  },
  {
    id: 'stylistic-inversion',
    order: 2,
    title: 'Formal stylistic inversion',
    description: 'Use literary inversion after adverbs like peut-être and à peine',
    phrases: [
      { id: 'p1', text: 'Peut-être devrions-nous reconsidérer notre approche.', translation: 'Perhaps we should reconsider our approach.', focus: 'r', pronunciation: 'puh-TEH-truh duh-vryohn-NOO ruh-kohn-see-day-RAY NOH-truh ah-PROSH' },
      { id: 'p2', text: 'À peine avait-il fini son discours que les critiques ont commencé.', translation: 'He had barely finished his speech when the criticism began.', focus: 'r', pronunciation: 'ah PEN ah-veh-TEEL fee-NEE sohn dee-SKOOR kuh lay kree-TEEK ohn koh-mahn-SAY' },
      { id: 'p3', text: 'Aussi convient-il de rappeler le contexte de cette décision.', translation: 'It is therefore worth recalling the context of this decision.', focus: 'r', pronunciation: 'oh-SEE kohn-vyahn-TEEL duh rah-play LUH kohn-TEKST duh set day-see-ZYOHN' },
      { id: 'p4', text: 'Sans doute faudra-t-il revoir l\'ensemble du budget.', translation: 'The whole budget will no doubt have to be revised.', focus: 'u', pronunciation: 'sahn DOOT foh-drah-TEEL ruh-VWAHR lahn-SAHM-bluh dew bew-ZHEH' },
      { id: 'p5', text: 'Encore faudrait-il que tout le monde soit d\'accord.', translation: 'That would still require everyone to agree.', focus: 'r', pronunciation: 'ahn-KOR foh-DREH-teel kuh too luh MOHND swah dah-KOR' },
    ],
  },
  {
    id: 'negotiation',
    order: 3,
    title: 'Diplomatic negotiation',
    description: 'Hedge and negotiate tactfully in a professional setting',
    phrases: [
      { id: 'p1', text: 'Nous serions disposés à revoir nos conditions, sous certaines réserves.', translation: 'We would be willing to reconsider our terms, with certain reservations.', focus: 'r', pronunciation: 'noo suh-RYOHN dee-spoh-ZAY ah ruh-VWAHR noh kohn-dee-SYOHN, soo sehr-TEN ray-ZEHRV' },
      { id: 'p2', text: 'Il conviendrait sans doute d\'envisager un compromis équitable.', translation: 'It would no doubt be worth considering a fair compromise.', focus: 'r', pronunciation: 'eel kohn-vyahn-DREH sahn DOOT dahn-vee-zah-ZHAY uhn kohm-proh-MEE ay-kee-TAH-bluh' },
      { id: 'p3', text: 'Sauf erreur de ma part, cette clause pose problème.', translation: 'Unless I\'m mistaken, this clause is problematic.', focus: 'r', pronunciation: 'sohf eh-RUHR duh mah PAR, set KLOHZ POHZ proh-BLEM' },
      { id: 'p4', text: 'Nous aimerions, dans la mesure du possible, avancer la date limite.', translation: 'We would like, as far as possible, to move up the deadline.', focus: 'r', pronunciation: 'noo zem-RYOHN, dahn lah muh-ZEWR dew poh-SEE-bluh, ah-vahn-SAY lah DAHT lee-MEET' },
      { id: 'p5', text: 'Loin de nous l\'idée de remettre en cause votre travail.', translation: 'Far be it from us to question your work.', focus: 'r', pronunciation: 'lwan duh NOO lee-DAY duh ruh-MET-truh ahn KOHZ VOH-truh trah-VIGH' },
    ],
  },
  {
    id: 'abstract-nominalization',
    order: 4,
    title: 'Abstract formal writing',
    description: 'Use nominalized noun phrases typical of formal French',
    phrases: [
      { id: 'p1', text: 'La mise en œuvre de cette politique prendra plusieurs années.', translation: 'The implementation of this policy will take several years.', focus: 'r', pronunciation: 'lah MEEZ ahn NUHV-ruh duh set poh-lee-TEEK prahn-DRAH plew-ZYUHR zah-NAY' },
      { id: 'p2', text: 'La prise de conscience collective a été un tournant décisif.', translation: 'The collective awareness was a decisive turning point.', focus: 'r', pronunciation: 'lah PREEZ duh kohn-SYAHNS koh-lek-TEEV ah ay-TAY uhn toor-NAHN day-see-ZEEF' },
      { id: 'p3', text: 'L\'accroissement des inégalités reste un sujet de préoccupation.', translation: 'The increase in inequality remains a matter of concern.', focus: 'r', pronunciation: 'lah-krwahs-MAHN day zee-nay-gah-lee-TAY REST uhn sew-ZHEH duh pray-oh-kew-pah-SYOHN' },
      { id: 'p4', text: 'Le renforcement des mesures de sécurité était devenu nécessaire.', translation: 'The strengthening of security measures had become necessary.', focus: 'r', pronunciation: 'luh rahn-for-suh-MAHN day muh-ZEWR duh say-kew-ree-TAY ay-TEH duh-vuh-NEW nay-say-SEHR' },
      { id: 'p5', text: 'La remise en question du système a suscité un vif débat.', translation: 'The questioning of the system sparked a lively debate.', focus: 'r', pronunciation: 'lah ruh-MEEZ ahn kes-TYOHN dew see-STEM ah sew-see-TAY uhn VEEF day-BAH' },
    ],
  },
  {
    id: 'expressing-nuance',
    order: 5,
    title: 'Expressing subtle nuance',
    description: 'Convey doubt, certainty, and rhetorical emphasis precisely',
    phrases: [
      { id: 'p1', text: 'Il se peut que la situation évolue rapidement.', translation: 'It may well be that the situation evolves quickly.', focus: 'u', pronunciation: 'eel suh PUH kuh lah see-tew-ah-SYOHN ay-VOHL rah-peed-MAHN' },
      { id: 'p2', text: 'Il n\'empêche que ce point mérite d\'être clarifié.', translation: 'Still, this point deserves to be clarified.', focus: 'r', pronunciation: 'eel nahn-PESH kuh suh PWAN may-REET DET-ruh klah-ree-FYAY' },
      { id: 'p3', text: 'Encore faut-il que les moyens suivent les ambitions.', translation: 'It still remains to be seen whether the means will match the ambitions.', focus: 'r', pronunciation: 'ahn-KOR foh-TEEL kuh lay mwah-YAN SWEEV lay zahm-bee-SYOHN' },
      { id: 'p4', text: 'Rien ne permet d\'affirmer que cette hypothèse soit exacte.', translation: 'Nothing allows us to claim that this hypothesis is correct.', focus: 'r', pronunciation: 'ryan nuh pehr-MEH dah-feer-MAY kuh set ee-poh-TEZ SWAH teg-ZAKT' },
      { id: 'p5', text: 'Faut-il encore rappeler à quel point ce dossier est sensible?', translation: 'Do we still need to point out how sensitive this matter is?', focus: 'r', pronunciation: 'foh-TEEL ahn-KOR rah-play ah kel PWAN suh doh-SYAY eh sahn-SEE-bluh' },
    ],
  },
]
