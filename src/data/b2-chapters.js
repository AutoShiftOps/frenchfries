// B2 Speaking chapters (CLB 7-8) — nuanced, argumentative language: the
// past subjunctive after bien que, indirect/reported speech, the past
// conditional for regret, the passive voice, and connectors for
// structured argument (quoique, malgré, néanmoins). Same format as
// a1/a2/b1-chapters.js: `focus` is the phoneme Azure should weigh most,
// `pronunciation` is a plain-English respelling.

export const B2_CHAPTERS = [
  {
    id: 'debating-issues',
    order: 1,
    title: 'Debating a social issue',
    description: 'Concede a point using bien que and the subjunctive',
    phrases: [
      { id: 'p1', text: 'Bien que ce soit difficile, il faut agir maintenant.', translation: 'Although it\'s difficult, we must act now.', focus: 'r', pronunciation: 'byan kuh suh SWAH dee-fee-SEEL, eel foh tah-ZHEER man-tuh-NAHN' },
      { id: 'p2', text: 'Quoiqu\'il y ait des avantages, les risques restent élevés.', translation: 'Although there are advantages, the risks remain high.', focus: 'r', pronunciation: 'kwah-KEEL yeh day zah-vahn-TAZH, lay REESK REST ay-luh-VAY' },
      { id: 'p3', text: 'Malgré les efforts du gouvernement, le problème persiste.', translation: 'Despite the government\'s efforts, the problem persists.', focus: 'r', pronunciation: 'mahl-GRAY lay zay-FOR dew goo-vehr-nuh-MAHN, luh proh-BLEM pehr-SEEST' },
      { id: 'p4', text: 'Certains soutiennent que la solution est trop coûteuse.', translation: 'Some argue that the solution is too costly.', focus: 'u', pronunciation: 'sehr-TAN soo-TYEN kuh lah soh-lew-SYOHN eh troh koo-TUHZ' },
      { id: 'p5', text: 'Néanmoins, il est essentiel de trouver un compromis.', translation: 'Nevertheless, it\'s essential to find a compromise.', focus: 'r', pronunciation: 'nay-ahn-MWAN, eel eh tay-sahn-SYEL duh troo-VAY uhn kohm-proh-MEE' },
    ],
  },
  {
    id: 'reported-speech',
    order: 2,
    title: 'Reporting what someone said',
    description: 'Relay a conversation using discours indirect',
    phrases: [
      { id: 'p1', text: 'Il a dit qu\'il serait en retard aujourd\'hui.', translation: 'He said he would be late today.', focus: 'r', pronunciation: 'eel ah DEE keel suh-REH ahn ruh-TAR oh-zhoor-DWEE' },
      { id: 'p2', text: 'Elle a expliqué que le projet avait pris du retard.', translation: 'She explained that the project had fallen behind.', focus: 'r', pronunciation: 'ell ah ek-splee-KAY kuh luh proh-ZHEH ah-veh PREE dew ruh-TAR' },
      { id: 'p3', text: 'Ils m\'ont demandé si je pouvais les aider demain.', translation: 'They asked me if I could help them tomorrow.', focus: 'r', pronunciation: 'eel mohn duh-mahn-DAY see zhuh poo-VEH lay zeh-DAY duh-MAN' },
      { id: 'p4', text: 'Mon collègue a annoncé qu\'il quittait l\'entreprise.', translation: 'My colleague announced that he was leaving the company.', focus: 'r', pronunciation: 'mohn koh-LEG ah ah-nohn-SAY keel kee-TEH lahn-truh-PREEZ' },
      { id: 'p5', text: 'Le directeur a précisé que la réunion aurait lieu vendredi.', translation: 'The director specified that the meeting would take place on Friday.', focus: 'r', pronunciation: 'luh dee-rek-TUHR ah pray-see-ZAY kuh lah ray-ew-NYOHN oh-REH LYUH vahn-druh-DEE' },
    ],
  },
  {
    id: 'regrets',
    order: 3,
    title: 'Expressing regret',
    description: 'Say what should have happened using the past conditional',
    phrases: [
      { id: 'p1', text: 'J\'aurais dû lui parler plus tôt.', translation: 'I should have talked to him/her sooner.', focus: 'u', pronunciation: 'zhoh-REH dew lwee par-LAY plew TOH' },
      { id: 'p2', text: 'Si j\'avais su, je ne serais pas venu.', translation: 'If I had known, I wouldn\'t have come.', focus: 'r', pronunciation: 'see zhah-VEH SEW, zhuh nuh suh-REH pah vuh-NEW' },
      { id: 'p3', text: 'Nous aurions pu éviter cette erreur.', translation: 'We could have avoided this mistake.', focus: 'r', pronunciation: 'noo zoh-RYOHN pew ay-vee-TAY set eh-RUHR' },
      { id: 'p4', text: 'Elle regrette de ne pas avoir accepté cette offre.', translation: 'She regrets not having accepted that offer.', focus: 'r', pronunciation: 'ell ruh-GRET duh nuh pah zah-VWAHR ahk-sep-TAY set OH-fruh' },
      { id: 'p5', text: 'Vous auriez pu me le dire plus tôt.', translation: 'You could have told me sooner.', focus: 'r', pronunciation: 'voo zoh-RYAY pew muh luh DEER plew TOH' },
    ],
  },
  {
    id: 'passive-voice',
    order: 4,
    title: 'Describing processes and news',
    description: 'Report events and decisions using the passive voice',
    phrases: [
      { id: 'p1', text: 'La décision a été prise par le conseil hier soir.', translation: 'The decision was made by the council last night.', focus: 'r', pronunciation: 'lah day-see-ZYOHN ah ay-TAY PREEZ par luh kohn-SAY YEHR swahr' },
      { id: 'p2', text: 'Le nouveau pont sera construit d\'ici deux ans.', translation: 'The new bridge will be built within two years.', focus: 'r', pronunciation: 'luh noo-VOH POHN suh-RAH kohn-STREE dee-SEE duh ZAHN' },
      { id: 'p3', text: 'Les résultats seront annoncés la semaine prochaine.', translation: 'The results will be announced next week.', focus: 'r', pronunciation: 'lay ray-zewl-TAH suh-ROHN tah-nohn-SAY lah suh-MEN proh-SHEN' },
      { id: 'p4', text: 'Ce livre a été traduit dans plusieurs langues.', translation: 'This book has been translated into several languages.', focus: 'r', pronunciation: 'suh LEE-vruh ah ay-TAY trah-DWEE dahn plew-ZYUHR LAHNG' },
      { id: 'p5', text: 'L\'usine a été fermée pour des raisons économiques.', translation: 'The factory was closed for economic reasons.', focus: 'r', pronunciation: 'lew-ZEEN ah ay-TAY fehr-MAY poor day reh-ZOHN ay-koh-noh-MEEK' },
    ],
  },
  {
    id: 'nuanced-arguments',
    order: 5,
    title: 'Making nuanced arguments',
    description: 'Structure a balanced argument with contrast connectors',
    phrases: [
      { id: 'p1', text: 'Cependant, tout le monde n\'est pas de cet avis.', translation: 'However, not everyone shares this opinion.', focus: 'r', pronunciation: 'suh-pahn-DAHN, too luh MOHND neh pah duh set ah-VEE' },
      { id: 'p2', text: 'En revanche, les jeunes semblent plus ouverts au changement.', translation: 'On the other hand, young people seem more open to change.', focus: 'r', pronunciation: 'ahn ruh-VAHNSH, lay ZHUHN SAHM-bluh plew zoo-VEHR oh shahnzh-MAHN' },
      { id: 'p3', text: 'Certes, la méthode a ses limites, mais elle reste utile.', translation: 'Granted, the method has its limits, but it remains useful.', focus: 'u', pronunciation: 'SEHRT, lah may-TOHD ah say lee-MEET, meh ell REST ew-TEEL' },
      { id: 'p4', text: 'Il n\'en demeure pas moins que des progrès ont été faits.', translation: 'It remains nonetheless true that progress has been made.', focus: 'r', pronunciation: 'eel nahn duh-MUHR pah mwan kuh day proh-GREH ohn tay-TAY FEH' },
      { id: 'p5', text: 'En somme, la situation reste plus complexe qu\'il n\'y paraît.', translation: 'In short, the situation is more complex than it appears.', focus: 'r', pronunciation: 'ahn SOHM, lah see-tew-ah-SYOHN REST plew kohn-PLEKS keel nee pah-REH' },
    ],
  },
]
