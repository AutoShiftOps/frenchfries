// B1 Speaking chapters (CLB 5-6) — the first level where the learner
// produces connected, opinion-bearing speech rather than survival phrases:
// futur simple, conditionnel présent, a first taste of the subjunctive
// (il faut que / je recommande que), and formal "vous" register for work
// and services. Same format as a1/a2-chapters.js: `focus` is the phoneme
// Azure should weigh most, `pronunciation` is a plain-English respelling.

export const B1_CHAPTERS = [
  {
    id: 'future-plans',
    order: 1,
    title: 'Future plans',
    description: 'Talk about what you will do using futur simple',
    phrases: [
      { id: 'p1', text: 'L\'année prochaine, je déménagerai à Toronto.', translation: 'Next year, I will move to Toronto.', focus: 'r', pronunciation: 'lah-nay proh-SHEN, zhuh day-mayn-ZHRAY ah Toronto' },
      { id: 'p2', text: 'Je chercherai un nouvel emploi après mes études.', translation: 'I will look for a new job after my studies.', focus: 'eu', pronunciation: 'zhuh shehr-shuh-RAY uhn noo-VEL ahn-PLWAH ah-preh may zay-TEWD' },
      { id: 'p3', text: 'Nous voyagerons en France cet été.', translation: 'We will travel to France this summer.', focus: 'on', pronunciation: 'noo vwah-yahzh-ROHN ahn FRAHNS set ay-TAY' },
      { id: 'p4', text: 'Elle finira son diplôme dans deux ans.', translation: 'She will finish her degree in two years.', focus: 'r', pronunciation: 'ell fee-nee-RAH sohn dee-PLOHM dahn duh ZAHN' },
      { id: 'p5', text: 'Est-ce que vous serez libre samedi prochain?', translation: 'Will you be free next Saturday?', focus: 'r', pronunciation: 'ess kuh voo suh-RAY LEE-bruh sahm-DEE proh-SHAN' },
    ],
  },
  {
    id: 'opinions',
    order: 2,
    title: 'Sharing opinions',
    description: 'Agree, disagree, and explain why using à mon avis / je pense que',
    phrases: [
      { id: 'p1', text: 'À mon avis, cette idée est excellente.', translation: 'In my opinion, this idea is excellent.', focus: 'r', pronunciation: 'ah mohn nah-VEE, set ee-DAY eh tek-say-LAHNT' },
      { id: 'p2', text: 'Je pense que tu as raison.', translation: 'I think you are right.', focus: 'r', pronunciation: 'zhuh PAHNS kuh tew ah reh-ZOHN' },
      { id: 'p3', text: 'Je ne suis pas d\'accord avec cette décision.', translation: 'I don\'t agree with this decision.', focus: 'r', pronunciation: 'zhuh nuh swee pah dah-KOR ah-vek set day-see-ZYOHN' },
      { id: 'p4', text: 'D\'un côté c\'est utile, mais de l\'autre côté c\'est cher.', translation: 'On one hand it\'s useful, but on the other hand it\'s expensive.', focus: 'u', pronunciation: 'duhn koh-TAY seh tew-TEEL, meh duh LOH-truh koh-TAY seh SHEHR' },
      { id: 'p5', text: 'Selon moi, il faut réfléchir avant d\'agir.', translation: 'In my view, one must think before acting.', focus: 'r', pronunciation: 'suh-LOHN mwah, eel foh ray-flay-SHEER ah-vahn dah-ZHEER' },
    ],
  },
  {
    id: 'hypotheticals',
    order: 3,
    title: 'Hypothetical situations',
    description: 'Say what you would do using the conditionnel présent',
    phrases: [
      { id: 'p1', text: 'Si j\'avais plus de temps, je voyagerais davantage.', translation: 'If I had more time, I would travel more.', focus: 'r', pronunciation: 'see zhah-VEH plew duh TAHN, zhuh vwah-yah-zhuh-REH dah-vahn-TAZH' },
      { id: 'p2', text: 'Si j\'étais toi, je changerais d\'emploi.', translation: 'If I were you, I would change jobs.', focus: 'r', pronunciation: 'see zhay-TEH twah, zhuh shahn-zhuh-REH dahn-PLWAH' },
      { id: 'p3', text: 'Nous pourrions déménager si le loyer baissait.', translation: 'We could move if the rent went down.', focus: 'r', pronunciation: 'noo poo-RYOHN day-may-nah-ZHAY see luh lwah-YAY beh-SEH' },
      { id: 'p4', text: 'J\'aimerais bien apprendre une troisième langue.', translation: 'I would really like to learn a third language.', focus: 'r', pronunciation: 'zhem-REH byan ah-PRAHN-druh oon trwah-ZYEM LAHNG' },
      { id: 'p5', text: 'Que feriez-vous à ma place?', translation: 'What would you do in my place?', focus: 'r', pronunciation: 'kuh fuh-RYAY-voo ah mah PLAHS' },
    ],
  },
  {
    id: 'giving-advice',
    order: 4,
    title: 'Giving advice',
    description: 'Recommend and insist using il faut que and the subjunctive',
    phrases: [
      { id: 'p1', text: 'Il faut que tu te reposes ce week-end.', translation: 'You need to rest this weekend.', focus: 'u', pronunciation: 'eel foh kuh tew tuh ruh-POHZ suh week-end' },
      { id: 'p2', text: 'Je recommande que vous preniez rendez-vous rapidement.', translation: 'I recommend that you make an appointment soon.', focus: 'r', pronunciation: 'zhuh ruh-koh-MAHND kuh voo pruh-NYAY rahn-day-VOO rah-peed-MAHN' },
      { id: 'p3', text: 'Tu devrais parler à ton superviseur.', translation: 'You should talk to your supervisor.', focus: 'r', pronunciation: 'tew duh-VREH par-LAY ah tohn sew-pehr-vee-ZUHR' },
      { id: 'p4', text: 'Il vaut mieux que nous partions tôt demain.', translation: 'It\'s better that we leave early tomorrow.', focus: 'u', pronunciation: 'eel voh MYUH kuh noo par-TYOHN toh duh-MAN' },
      { id: 'p5', text: 'Il est important que vous soyez à l\'heure.', translation: 'It\'s important that you be on time.', focus: 'r', pronunciation: 'eel eh tan-por-TAHN kuh voo swah-YAY ah LUHR' },
    ],
  },
  {
    id: 'job-interview',
    order: 5,
    title: 'Job interview basics',
    description: 'Answer common interview questions using the formal vous',
    phrases: [
      { id: 'p1', text: 'Pouvez-vous me parler de votre expérience?', translation: 'Can you tell me about your experience?', focus: 'r', pronunciation: 'poo-vay-VOO muh par-LAY duh VOH-truh ek-spay-ryahns' },
      { id: 'p2', text: 'J\'ai travaillé cinq ans dans ce domaine.', translation: 'I have worked five years in this field.', focus: 'r', pronunciation: 'zhay trah-vah-YAY sank ahn dahn suh doh-MEN' },
      { id: 'p3', text: 'Quelles sont vos plus grandes forces?', translation: 'What are your greatest strengths?', focus: 'r', pronunciation: 'kell sohn voh plew GRAHND FORS' },
      { id: 'p4', text: 'Je suis quelqu\'un de motivé et organisé.', translation: 'I am someone motivated and organized.', focus: 'r', pronunciation: 'zhuh swee kel-KUHN duh moh-tee-VAY ay or-gah-nee-ZAY' },
      { id: 'p5', text: 'Merci de m\'avoir reçu, j\'attends votre réponse.', translation: 'Thank you for meeting with me, I look forward to your response.', focus: 'r', pronunciation: 'mehr-SEE duh mah-vwahr ruh-SEW, zhah-TAHN VOH-truh ray-POHNS' },
    ],
  },
]
