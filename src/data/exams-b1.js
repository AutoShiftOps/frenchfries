// B1 practice exams — 6 sets, mixed reading/listening/writing, drawing
// on b1-chapters.js's grammar focus (futur simple, opinions, conditionnel
// présent, il faut que + subjunctive, formal vous/job interviews).

export const EXAMS_B1 = [
  {
    id: 'b1-set-1',
    order: 1,
    title: 'Set 1',
    difficulty: 'Warm-up',
    questions: [
      { id: 'q1', type: 'reading', text: 'L\'année prochaine, je déménagerai à Toronto pour mon travail.', translation: 'Next year, I will move to Toronto for my job.', pronunciation: 'lah-NAY proh-SHEN, zhuh day-may-nah-zhuh-REH ah toh-rohn-TOH poor mohn trah-VIGH.', question: 'When will the move happen?', options: ['Next year', 'This week', 'In ten years'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'À mon avis, ce film est trop long, mais l\'histoire est intéressante.', translation: 'In my opinion, this film is too long, but the story is interesting.', pronunciation: 'ah mohn nah-VEE, suh FEELM eh troh LOHN, meh lee-STWAHR eh tan-tay-reh-SAHNT.', question: 'What is the speaker\'s complaint about the film?', options: ['It\'s too long', 'It\'s boring', 'It\'s too short'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Si j\'avais plus de temps, je voyagerais davantage.', translation: 'If I had more time, I would travel more.', pronunciation: 'see zhah-VEH plew duh TAHN, zhuh vwah-yah-zhuh-REH dah-vahn-TAZH.', question: 'What is stopping the speaker from traveling more?', options: ['Lack of time', 'Lack of money', 'Fear of flying'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Il faut que vous arriviez avant neuf heures pour l\'entretien.', translation: 'You need to arrive before nine o\'clock for the interview.', pronunciation: 'eel foh kuh voo zah-ree-VYAY ah-VAHN nuh VUHR poor lahn-truh-TYAN.', question: 'What must happen before 9am?', options: ['Arriving for the interview', 'Sending an email', 'Calling the office'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "I will move next year." (futur simple)', accepted: ['je demenagerai l annee prochaine', 'je demenagerai lannee prochaine'], hint: 'je déménagerai ___', pronunciation: 'zhuh day-may-nah-zhuh-REH lah-NAY proh-SHEN' },
      { id: 'q6', type: 'writing', prompt: 'Write: "In my opinion, it is interesting."', accepted: ['a mon avis c est interessant', 'a mon avis cest interessant'], hint: 'à mon avis, c\'est ___', pronunciation: 'ah mohn nah-VEE, seh tan-tay-reh-SAHN' },
    ],
  },
  {
    id: 'b1-set-2',
    order: 2,
    title: 'Set 2',
    difficulty: 'Building',
    questions: [
      { id: 'q1', type: 'reading', text: 'Je pense que cette solution résoudra le problème plus rapidement que l\'ancienne méthode.', translation: 'I think this solution will solve the problem faster than the old method.', pronunciation: 'zhuh PAHNS kuh set soh-lew-SYOHN ray-zoo-DRAH luh proh-BLEM plew rah-peed-MAHN kuh lahn-SYEN may-TOHD.', question: 'What does the speaker believe about the new solution?', options: ['It will be faster', 'It will be cheaper', 'It will fail'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Si nous avions plus de budget, nous embaucherions deux personnes de plus.', translation: 'If we had a bigger budget, we would hire two more people.', pronunciation: 'see noo zah-VYOHN plew duh bew-ZHEH, noo zahm-boh-shuh-RYOHN duh pehr-SUN duh PLEWS.', question: 'What would a bigger budget allow?', options: ['Hiring two more people', 'Buying new equipment', 'Extending the deadline'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Il faudrait que tu prépares tes réponses avant l\'entretien de demain.', translation: 'You should prepare your answers before tomorrow\'s interview.', pronunciation: 'eel foh-DREH kuh tew pray-PAR tay ray-POHNS ah-VAHN lahn-truh-TYAN duh duh-MAN.', question: 'What should be prepared before the interview?', options: ['Answers', 'A resume', 'A suit'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Nous vous contacterons dès que nous aurons pris une décision.', translation: 'We will contact you as soon as we\'ve made a decision.', pronunciation: 'noo voo kohn-tahk-tuh-ROHN deh kuh noo zoh-ROHN pree oon day-see-ZYOHN.', question: 'When will they be contacted?', options: ['As soon as a decision is made', 'In one week exactly', 'Never'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "If I had more time, I would travel." (conditionnel présent)', accepted: ['si j avais plus de temps je voyagerais', 'si javais plus de temps je voyagerais'], hint: 'si j\'avais plus de temps, je ___', pronunciation: 'see zhah-VEH plew duh TAHN, zhuh vwah-yah-zhuh-REH' },
      { id: 'q6', type: 'writing', prompt: 'Write: "You need to prepare your answers." (il faut que + subjunctive)', accepted: ['il faut que tu prepares tes reponses'], hint: 'il faut que tu ___', pronunciation: 'eel foh kuh tew pray-PAR tay ray-POHNS' },
    ],
  },
  {
    id: 'b1-set-3',
    order: 3,
    title: 'Set 3',
    difficulty: 'Standard',
    questions: [
      { id: 'q1', type: 'reading', text: 'Selon moi, il vaudrait mieux reporter la réunion à la semaine prochaine.', translation: 'In my view, it would be better to postpone the meeting to next week.', pronunciation: 'suh-LOHN mwah, eel voh-DREH myuh ruh-por-TAY lah ray-ew-NYOHN ah lah suh-MEN proh-SHEN.', question: 'What does the speaker suggest?', options: ['Postponing the meeting', 'Canceling the meeting', 'Shortening the meeting'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Quand vous arriverez au bureau, demandez à parler avec Madame Lefèvre.', translation: 'When you arrive at the office, ask to speak with Madame Lefèvre.', pronunciation: 'kahn voo zah-ree-vuh-RAY oh bew-ROH, duh-mahn-DAY ah par-LAY ah-VEK mah-DAM luh-FEV-ruh.', question: 'Who should the visitor ask for?', options: ['Madame Lefèvre', 'The receptionist', 'The manager'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Je crois que le trajet prendra environ deux heures en voiture.', translation: 'I think the trip will take about two hours by car.', pronunciation: 'zhuh KRWAH kuh luh trah-ZHEH prahn-DRAH ahn-vee-ROHN duh ZUHR ahn vwah-TEWR.', question: 'How long will the trip take?', options: ['About two hours', 'About one hour', 'About four hours'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Il faudrait que nous soyons tous d\'accord avant de signer le contrat.', translation: 'We would all need to agree before signing the contract.', pronunciation: 'eel foh-DREH kuh noo swah-YOHN too dah-KOR ah-VAHN duh see-NYAY luh kohn-TRAH.', question: 'What is required before signing?', options: ['Everyone agreeing', 'A lawyer\'s presence', 'A deposit'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "I think this solution will work."', accepted: ['je pense que cette solution fonctionnera'], hint: 'je pense que cette solution ___', pronunciation: 'zhuh PAHNS kuh set soh-lew-SYOHN fohnk-syoh-nuh-RAH' },
      { id: 'q6', type: 'writing', prompt: 'Write: "We will contact you soon."', accepted: ['nous vous contacterons bientot'], hint: 'nous vous contacterons ___', pronunciation: 'noo voo kohn-tahk-tuh-ROHN byan-TOH' },
    ],
  },
  {
    id: 'b1-set-4',
    order: 4,
    title: 'Set 4',
    difficulty: 'Applied',
    questions: [
      { id: 'q1', type: 'reading', text: 'D\'après moi, la qualité du service s\'est nettement améliorée depuis l\'année dernière, même si les prix ont aussi augmenté.', translation: 'In my view, the quality of service has clearly improved since last year, even if prices have also gone up.', pronunciation: 'dah-PREH mwah, lah kah-lee-TAY dew sehr-VEES seh net-MAHN ah-may-lyoh-RAY duh-PWEE lah-NAY dehr-NYEHR, mem see lay PREE ohn toh-see oh-gmahn-TAY.', question: 'What has improved, according to the speaker?', options: ['Service quality', 'Only the prices', 'Nothing has changed'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Si j\'étais vous, je négocierais un meilleur salaire avant d\'accepter ce poste.', translation: 'If I were you, I would negotiate a better salary before accepting this position.', pronunciation: 'see zhay-TEH VOO, zhuh nay-goh-syuh-REH uhn may-YUHR sah-LEHR ah-VAHN dahk-sep-TAY suh POST.', question: 'What is the speaker advising?', options: ['Negotiating a better salary', 'Rejecting the job', 'Accepting immediately'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Dès que j\'aurai fini ce rapport, je vous l\'enverrai par courriel.', translation: 'As soon as I finish this report, I\'ll send it to you by email.', pronunciation: 'deh kuh zhoh-REH fee-NEE suh rah-POR, zhuh voo lahn-vehr-REH par koor-YEL.', question: 'How will the report be sent?', options: ['By email', 'By mail', 'In person'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Il aurait fallu réserver plus tôt, car il ne reste plus de places disponibles.', translation: 'We should have booked earlier, because there are no more seats available.', pronunciation: 'eel oh-REH fah-LEW ray-zehr-VAY plew TOH, kar eel nuh REST plew duh PLAS dee-spoh-NEE-bluh.', question: 'What is the current problem?', options: ['No seats are left', 'The event is cancelled', 'The price went up'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "If I were you, I would negotiate the salary." (conditionnel)', accepted: ['si j etais vous je negocierais le salaire', 'si jetais vous je negocierais le salaire'], hint: 'si j\'étais vous, je ___', pronunciation: 'see zhay-TEH VOO, zhuh nay-goh-syuh-REH luh sah-LEHR' },
      { id: 'q6', type: 'writing', prompt: 'Write: "As soon as I finish, I will send it."', accepted: ['des que j aurai fini je l enverrai', 'des que jaurai fini je lenverrai'], hint: 'dès que j\'aurai fini, ___', pronunciation: 'deh kuh zhoh-REH fee-NEE, zhuh lahn-vehr-REH' },
    ],
  },
  {
    id: 'b1-set-5',
    order: 5,
    title: 'Set 5',
    difficulty: 'Challenge',
    questions: [
      { id: 'q1', type: 'reading', text: 'Bien que le poste soit intéressant, je pense qu\'il faudrait clarifier les horaires avant de signer quoi que ce soit.', translation: 'Although the position is interesting, I think the hours would need to be clarified before signing anything.', pronunciation: 'byan kuh luh POST swah tan-tay-reh-SAHN, zhuh PAHNS keel foh-DREH klah-ree-FYAY lay zoh-RER ah-VAHN duh see-NYAY kwah kuh suh SWAH.', question: 'What does the speaker want clarified first?', options: ['The hours', 'The salary', 'The location'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Si l\'entreprise investissait davantage dans la formation, les employés seraient plus motivés.', translation: 'If the company invested more in training, employees would be more motivated.', pronunciation: 'see lahn-truh-PREEZ an-veh-stee-SEH dah-vahn-TAZH dahn lah for-mah-SYOHN, lay zahm-plwah-YAY suh-REH plew moh-tee-VAY.', question: 'What would increase motivation?', options: ['More investment in training', 'Higher salaries only', 'Shorter working hours'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Il faudrait que le rapport soit prêt avant que le directeur n\'arrive lundi.', translation: 'The report would need to be ready before the director arrives on Monday.', pronunciation: 'eel foh-DREH kuh luh rah-POR swah PREH ah-VAHN kuh luh dee-rek-TUHR nah-REEV luhn-DEE.', question: 'By when must the report be ready?', options: ['Before the director arrives Monday', 'By Friday evening', 'By the end of the month'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Nous aurions dû prévoir plus de temps pour cette étape du projet.', translation: 'We should have planned more time for this stage of the project.', pronunciation: 'noo zoh-RYOHN dew pray-VWAHR plew duh TAHN poor set ay-TAP dew proh-ZHEH.', question: 'What does the speaker regret?', options: ['Not planning enough time', 'Choosing the wrong team', 'Skipping a step entirely'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "Although the position is interesting, the hours need clarifying." (bien que + subjunctive)', accepted: ['bien que le poste soit interessant les horaires doivent etre clarifies'], hint: 'bien que le poste soit intéressant, ___', pronunciation: 'byan kuh luh POST swah tan-tay-reh-SAHN' },
      { id: 'q6', type: 'writing', prompt: 'Write: "We should have planned more time." (conditionnel passé)', accepted: ['nous aurions du prevoir plus de temps'], hint: 'nous aurions dû ___', pronunciation: 'noo zoh-RYOHN dew pray-VWAHR plew duh TAHN' },
    ],
  },
  {
    id: 'b1-set-6',
    order: 6,
    title: 'Set 6',
    difficulty: 'Mastery check',
    questions: [
      { id: 'q1', type: 'reading', text: 'Si j\'avais su plus tôt que le poste exigeait autant de déplacements, j\'aurais réfléchi davantage avant de poser ma candidature.', translation: 'If I had known earlier that the position required so much travel, I would have thought more before applying.', pronunciation: 'see zhah-VEH sew plew TOH kuh luh POST eg-zee-ZHEH oh-TAHN duh day-plas-MAHN, zhoh-REH ray-flay-SHEE dah-vahn-TAZH ah-VAHN duh poh-ZAY mah kahn-dee-dah-TEWR.', question: 'What does the speaker regret?', options: ['Not knowing about the travel requirement sooner', 'Applying too late', 'Not asking for a higher salary'], answerIndex: 0 },
      { id: 'q2', type: 'reading', text: 'Il faudrait que tous les employés soient formés avant que le nouveau système ne soit mis en place le mois prochain.', translation: 'All employees would need to be trained before the new system is put in place next month.', pronunciation: 'eel foh-DREH kuh too lay zahm-plwah-YAY swah for-MAY ah-VAHN kuh luh noo-VOH sees-TEM nuh swah mee zahn PLAS luh MWAH proh-SHAN.', question: 'What needs to happen before the system launches?', options: ['All employees trained', 'A new office opened', 'The budget approved'], answerIndex: 0 },
      { id: 'q3', type: 'listening', text: 'Je pense que nous aurions dû négocier un délai plus long avant de nous engager.', translation: 'I think we should have negotiated a longer deadline before committing.', pronunciation: 'zhuh PAHNS kuh noo zoh-RYOHN dew nay-goh-SYAY uhn day-LEH plew LOHN ah-VAHN duh noo zahn-gah-ZHAY.', question: 'What does the speaker think should have happened?', options: ['Negotiating a longer deadline', 'Hiring more staff', 'Changing suppliers'], answerIndex: 0 },
      { id: 'q4', type: 'listening', text: 'Si l\'entretien se passe bien, on vous rappellera dans la semaine pour discuter du contrat.', translation: 'If the interview goes well, they\'ll call you back within the week to discuss the contract.', pronunciation: 'see lahn-truh-TYAN suh PAS byan, ohn voo rah-pell-RAH dahn lah suh-MEN poor dee-skew-TAY dew kohn-TRAH.', question: 'What happens if the interview goes well?', options: ['A callback within the week', 'An immediate offer', 'A second interview the next day'], answerIndex: 0 },
      { id: 'q5', type: 'writing', prompt: 'Write: "If I had known, I would have thought more about it." (conditionnel passé)', accepted: ['si j avais su j aurais reflechi davantage', 'si javais su jaurais reflechi davantage'], hint: 'si j\'avais su, j\'aurais ___', pronunciation: 'see zhah-VEH sew, zhoh-REH ray-flay-SHEE dah-vahn-TAZH' },
      { id: 'q6', type: 'writing', prompt: 'Write: "All employees need to be trained." (il faut que + subjunctive)', accepted: ['il faut que tous les employes soient formes'], hint: 'il faut que tous les employés ___', pronunciation: 'eel foh kuh too lay zahm-plwah-YAY swah for-MAY' },
    ],
  },
]
