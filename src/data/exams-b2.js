// B2 practice exams — 6 sets, mixed reading/listening/writing, drawing
// on b2-chapters.js's grammar focus (bien que + subjunctive, discours
// indirect, past conditional/regret, passive voice, contrast connectors).

export const EXAMS_B2 = [
  {
    id: 'b2-set-1',
    order: 1,
    title: 'Set 1',
    difficulty: 'Warm-up',
    questions: [
      { id: 'q1', type: 'reading', text: 'Bien que le projet soit ambitieux, l\'équipe reste confiante dans les délais.', translation: 'Although the project is ambitious, the team remains confident about the deadlines.', pronunciation: 'byan kuh luh proh-ZHEH swah tahn-bee-SYUH, lay-KEEP REST kohn-fee-AHNT dahn lay day-LEH.', question: 'What does the team feel about the deadlines?', options: ['Confident', 'Worried', 'Indifferent'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Elle a dit qu\'elle arriverait en retard à cause de la circulation.', translation: 'She said she would arrive late because of traffic.', pronunciation: 'ell ah DEE kell ah-ree-vuh-REH ahn ruh-TAR ah KOHZ duh lah seer-kew-lah-SYOHN.', question: 'Why would she be late?', options: ['Traffic', 'A meeting ran long', 'She overslept'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Ce rapport a été rédigé par toute l\'équipe, pas seulement par le directeur.', translation: 'This report was written by the whole team, not just the director.', pronunciation: 'suh rah-POR ah ay-TAY ray-dee-ZHAY par toot lay-KEEP, pah suhl-MAHN par luh dee-rek-TUHR.', question: 'Who wrote the report?', options: ['The whole team', 'Only the director', 'An outside consultant'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Cependant, malgré ces efforts, les résultats restent décevants.', translation: 'However, despite these efforts, the results remain disappointing.', pronunciation: 'suh-pahn-DAHN, mahl-GRAY say zeh-FOR, lay ray-zewl-TAH REST day-suh-VAHN.', question: 'How are the results described?', options: ['Disappointing', 'Excellent', 'Average'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Although the project is ambitious, the team is confident." (bien que + subjunctive)', accepted: ['bien que le projet soit ambitieux l equipe est confiante', 'bien que le projet soit ambitieux lequipe est confiante'], hint: 'bien que le projet soit ambitieux, ___', pronunciation: 'byan kuh luh proh-ZHEH swah tahn-bee-SYUH' },
      { id: 'q6', type: 'writing', prompt: 'Write: "She said she would arrive late." (discours indirect)', accepted: ['elle a dit qu elle arriverait en retard', 'elle a dit quelle arriverait en retard'], hint: 'elle a dit qu\'elle ___', pronunciation: 'ell ah DEE kell ah-ree-vuh-REH ahn ruh-TAR' },
    ],
  },
  {
    id: 'b2-set-2',
    order: 2,
    title: 'Set 2',
    difficulty: 'Building',
    questions: [
      { id: 'q1', type: 'reading', text: 'Si nous avions su plus tôt, nous aurions pu éviter cette erreur coûteuse.', translation: 'If we had known sooner, we could have avoided this costly mistake.', pronunciation: 'see noo zah-VYOHN sew plew TOH, noo zoh-RYOHN pew ay-vee-TAY set eh-RUHR koo-TUHZ.', question: 'What does the speaker regret?', options: ['Not knowing sooner', 'Hiring the wrong person', 'Missing a deadline'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Le contrat a été signé hier soir, après plusieurs semaines de négociations.', translation: 'The contract was signed last night, after several weeks of negotiations.', pronunciation: 'luh kohn-TRAH ah ay-TAY see-NYAY YEHR SWAHR, ah-PREH plew-ZYUHR suh-MEN duh nay-goh-syah-SYOHN.', question: 'When was the contract signed?', options: ['Last night', 'This morning', 'Last week'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'En revanche, les ventes en ligne ont fortement augmenté ce trimestre.', translation: 'On the other hand, online sales have increased strongly this quarter.', pronunciation: 'ahn ruh-VAHNSH, lay VAHNT ahn LEEN yohn for-tuh-MAHN oh-gmahn-TAY suh tree-MESTR.', question: 'What increased this quarter?', options: ['Online sales', 'In-store sales', 'Prices'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Il m\'a demandé si j\'accepterais de reporter la réunion.', translation: 'He asked me if I would agree to postpone the meeting.', pronunciation: 'eel mah duh-mahn-DAY see zhahk-sep-tuh-REH duh ruh-por-TAY lah ray-ew-NYOHN.', question: 'What was he asking about?', options: ['Postponing the meeting', 'Canceling the project', 'Changing the venue'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "If we had known sooner, we could have avoided it." (past conditional / regret)', accepted: ['si nous avions su plus tot nous aurions pu l eviter', 'si nous avions su plus tot nous aurions pu leviter'], hint: 'si nous avions su plus tôt, nous aurions pu ___', pronunciation: 'see noo zah-VYOHN sew plew TOH, noo zoh-RYOHN pew ay-vee-TAY' },
      { id: 'q6', type: 'writing', prompt: 'Write: "The contract was signed yesterday." (passive voice)', accepted: ['le contrat a ete signe hier'], hint: 'le contrat a été signé ___', pronunciation: 'luh kohn-TRAH ah ay-TAY see-NYAY YEHR' },
    ],
  },
  {
    id: 'b2-set-3',
    order: 3,
    title: 'Set 3',
    difficulty: 'Standard',
    questions: [
      { id: 'q1', type: 'reading', text: 'Bien qu\'il ait présenté des arguments solides, le comité n\'a pas approuvé la proposition.', translation: 'Although he presented solid arguments, the committee did not approve the proposal.', pronunciation: 'byan keel eh pray-zahn-TAY day zar-gew-MAHN soh-LEED, luh koh-mee-TAY nah pah zah-proo-VAY lah proh-poh-zee-SYOHN.', question: 'What was the committee\'s decision?', options: ['They did not approve it', 'They approved it immediately', 'They postponed the decision'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Toutes les candidatures ont été examinées avec attention par le jury.', translation: 'All applications were carefully examined by the jury.', pronunciation: 'toot lay kahn-dee-dah-TEWR ohn tay-TAY eg-zah-mee-NAY ah-VEK ah-tahn-SYOHN par luh zhew-REE.', question: 'Who examined the applications?', options: ['The jury', 'The HR department', 'An external agency'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Elle m\'a expliqué qu\'elle avait déjà envoyé le document la veille.', translation: 'She explained to me that she had already sent the document the day before.', pronunciation: 'ell mah eks-plee-KAY kell ah-VEH day-ZHAH ahn-vwah-YAY luh doh-kew-MAHN lah VAY-yuh.', question: 'When had she sent the document?', options: ['The day before', 'That morning', 'A week earlier'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Néanmoins, l\'entreprise a décidé de poursuivre le projet malgré les risques.', translation: 'Nevertheless, the company decided to continue the project despite the risks.', pronunciation: 'nay-ahn-MWAN, lahn-truh-PREEZ ah day-see-DAY duh poor-SWEEV-ruh luh proh-ZHEH mahl-GRAY lay REESK.', question: 'What did the company decide?', options: ['To continue despite the risks', 'To cancel the project', 'To hire a risk consultant'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Although he presented solid arguments, they refused." (bien que + subjunctive)', accepted: ['bien qu il ait presente des arguments solides ils ont refuse', 'bien quil ait presente des arguments solides ils ont refuse'], hint: 'bien qu\'il ait présenté des arguments solides, ___', pronunciation: 'byan keel eh pray-zahn-TAY day zar-gew-MAHN soh-LEED' },
      { id: 'q6', type: 'writing', prompt: 'Write: "All applications were examined." (passive voice)', accepted: ['toutes les candidatures ont ete examinees'], hint: 'toutes les candidatures ont été ___', pronunciation: 'toot lay kahn-dee-dah-TEWR ohn tay-TAY eg-zah-mee-NAY' },
    ],
  },
  {
    id: 'b2-set-4',
    order: 4,
    title: 'Set 4',
    difficulty: 'Applied',
    questions: [
      { id: 'q1', type: 'reading', text: 'Il a affirmé qu\'il n\'était pas au courant de la décision avant la réunion de mardi.', translation: 'He claimed he was not aware of the decision before Tuesday\'s meeting.', pronunciation: 'eel ah ah-feer-MAY keel nay-TEH pah zoh koo-RAHN duh lah day-see-ZYOHN ah-VAHN lah ray-ew-NYOHN duh mar-DEE.', question: 'What did he claim?', options: ['He didn\'t know about the decision beforehand', 'He made the decision himself', 'He missed the meeting'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Malgré une conjoncture difficile, l\'entreprise a réussi à maintenir ses effectifs.', translation: 'Despite a difficult economic climate, the company managed to maintain its staff levels.', pronunciation: 'mahl-GRAY oon kohn-zhohnk-TEWR dee-fee-SEEL, lahn-truh-PREEZ ah ray-ew-SEE ah man-tuh-NEER say zay-fek-TEEF.', question: 'What did the company manage to do?', options: ['Maintain staff levels', 'Increase profits', 'Reduce staff by half'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Nous aurions dû consulter l\'équipe avant de prendre cette décision seuls.', translation: 'We should have consulted the team before making this decision alone.', pronunciation: 'noo zoh-RYOHN dew kohn-sewl-TAY lay-KEEP ah-VAHN duh PRAHN-druh set day-see-ZYOHN SUHL.', question: 'What does the speaker regret?', options: ['Not consulting the team', 'Deciding too slowly', 'Involving too many people'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Ces nouvelles règles seront appliquées à partir du premier janvier.', translation: 'These new rules will be applied starting January 1st.', pronunciation: 'say noo-VEL REG-luh suh-ROHN tah-plee-KAY ah par-TEER dew pruh-MYAY zhahn-VYAY.', question: 'When do the new rules take effect?', options: ['January 1st', 'Immediately', 'Next year sometime'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "He claimed he was not aware of it." (discours indirect)', accepted: ['il a affirme qu il n etait pas au courant', 'il a affirme quil netait pas au courant'], hint: 'il a affirmé qu\'il n\'était pas ___', pronunciation: 'eel ah ah-feer-MAY keel nay-TEH pah zoh koo-RAHN' },
      { id: 'q6', type: 'writing', prompt: 'Write: "We should have consulted the team." (past conditional / regret)', accepted: ['nous aurions du consulter l equipe', 'nous aurions du consulter lequipe'], hint: 'nous aurions dû ___', pronunciation: 'noo zoh-RYOHN dew kohn-sewl-TAY lay-KEEP' },
    ],
  },
  {
    id: 'b2-set-5',
    order: 5,
    title: 'Set 5',
    difficulty: 'Challenge',
    questions: [
      { id: 'q1', type: 'reading', text: 'Bien que les résultats du trimestre soient encourageants, la direction reste prudente quant aux prévisions pour l\'année.', translation: 'Although this quarter\'s results are encouraging, management remains cautious about the year\'s forecasts.', pronunciation: 'byan kuh lay ray-zewl-TAH dew tree-MESTR SWAH ahn-koo-rah-ZHAHN, lah dee-rek-SYOHN REST prew-DAHNT kahn toh pray-vee-ZYOHN poor lah-NAY.', question: 'How does management feel about the year\'s forecasts?', options: ['Cautious', 'Extremely confident', 'Indifferent'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'La proposition, bien qu\'accueillie favorablement, a néanmoins été reportée faute de budget.', translation: 'The proposal, although well received, was nevertheless postponed due to lack of budget.', pronunciation: 'lah proh-poh-zee-SYOHN, byan kahk-uh-YEE fah-voh-rah-bluh-MAHN, ah nay-ahn-MWAN ay-TAY ruh-por-TAY FOHT duh bew-ZHEH.', question: 'Why was the proposal postponed?', options: ['Lack of budget', 'It was rejected', 'It needed more research'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Le directeur nous a informés que le budget avait été révisé à la baisse.', translation: 'The director informed us that the budget had been revised downward.', pronunciation: 'luh dee-rek-TUHR noo zah an-for-MAY kuh luh bew-ZHEH ah-VEH ay-TAY ray-vee-ZAY ah lah BES.', question: 'What happened to the budget?', options: ['It was revised downward', 'It was doubled', 'It stayed the same'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Si l\'on avait anticipé cette hausse des coûts, les prix auraient été ajustés à temps.', translation: 'If we had anticipated this cost increase, prices would have been adjusted in time.', pronunciation: 'see LOHN ah-VEH ahn-tee-see-PAY set OHS day KOO, lay PREE oh-REH ay-TAY ah-zhew-STAY ah TAHN.', question: 'What would have happened with earlier anticipation?', options: ['Prices adjusted in time', 'Costs would have dropped', 'Nothing would change'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Although the results are encouraging, management remains cautious." (bien que + subjunctive)', accepted: ['bien que les resultats soient encourageants la direction reste prudente'], hint: 'bien que les résultats soient encourageants, ___', pronunciation: 'byan kuh lay ray-zewl-TAH SWAH ahn-koo-rah-ZHAHN' },
      { id: 'q6', type: 'writing', prompt: 'Write: "The budget was revised downward." (passive voice)', accepted: ['le budget a ete revise a la baisse'], hint: 'le budget a été révisé ___', pronunciation: 'luh bew-ZHEH ah ay-TAY ray-vee-ZAY ah lah BES' },
    ],
  },
  {
    id: 'b2-set-6',
    order: 6,
    title: 'Set 6',
    difficulty: 'Mastery check',
    questions: [
      { id: 'q1', type: 'reading', text: 'Bien que la direction ait affirmé que tout serait réglé avant la fin du mois, plusieurs employés se demandent si ce délai sera vraiment respecté, d\'autant plus qu\'aucune mise à jour officielle n\'a été communiquée depuis deux semaines.', translation: 'Although management claimed everything would be settled before month\'s end, several employees wonder whether that deadline will really be met, especially since no official update has been communicated for two weeks.', pronunciation: 'byan kuh lah dee-rek-SYOHN eh ah-feer-MAY kuh too suh-REH ray-GLAY ah-VAHN lah FAN dew MWAH, plew-ZYUHR zahm-plwah-YAY suh duh-MAHND see suh day-LEH suh-RAH vray-MAHN res-pek-TAY, doh-TAHN plews koh-KEWN meez ah ZHOOR oh-fee-SYEL nah ay-TAY koh-mew-nee-KAY duh-PWEE duh suh-MEN.', question: 'Why are employees doubtful?', options: ['No official update in two weeks', 'The deadline already passed', 'Management denied the claim'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Le rapport, qui avait été rédigé en urgence par une équipe restreinte, a néanmoins été salué pour sa clarté malgré les délais très courts.', translation: 'The report, which had been drafted urgently by a small team, was nevertheless praised for its clarity despite the very short deadlines.', pronunciation: 'luh rah-POR, kee ah-VEH ay-TAY ray-dee-ZHAY ahn newr-ZHAHNS par oon ay-KEEP res-tran-TUH, ah nay-ahn-MWAN ay-TAY sah-LWAY poor sah klar-tay mahl-GRAY lay day-LEH treh KOOR.', question: 'What was praised despite the short deadlines?', options: ['The report\'s clarity', 'The team\'s size', 'The final decision'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Elle nous a précisé que la décision définitive serait communiquée uniquement après validation du conseil.', translation: 'She specified that the final decision would only be communicated after board approval.', pronunciation: 'ell noo zah pray-see-ZAY kuh lah day-see-ZYOHN day-fee-nee-TEEV suh-REH koh-mew-nee-KAY ew-neek-MAHN ah-PREH vah-lee-dah-SYOHN dew kohn-SAY.', question: 'When will the final decision be communicated?', options: ['After board approval', 'By the end of the day', 'Only if requested'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Si les délais avaient été respectés dès le départ, la situation actuelle aurait sans doute été évitée.', translation: 'If the deadlines had been respected from the start, the current situation would probably have been avoided.', pronunciation: 'see lay day-LEH ah-VEH ay-TAY res-pek-TAY deh luh day-PAR, lah see-tew-ah-SYOHN ahk-tew-EL oh-REH sahn DOOT ay-TAY ay-vee-TAY.', question: 'What would probably have been avoided?', options: ['The current situation', 'The original deadline', 'The board\'s decision'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "The report was praised for its clarity." (passive voice)', accepted: ['le rapport a ete salue pour sa clarte'], hint: 'le rapport a été salué pour ___', pronunciation: 'luh rah-POR ah ay-TAY sah-LWAY poor sah klar-TAY' },
      { id: 'q6', type: 'writing', prompt: 'Write: "If the deadlines had been respected, the situation would have been avoided." (past conditional)', accepted: ['si les delais avaient ete respectes la situation aurait ete evitee'], hint: 'si les délais avaient été respectés, la situation ___', pronunciation: 'see lay day-LEH ah-VEH ay-TAY res-pek-TAY, lah see-tew-ah-SYOHN oh-REH ay-TAY ay-vee-TAY' },
    ],
  },
]
