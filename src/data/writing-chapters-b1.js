// B1 Writing chapters — same five topics as b1-chapters.js (Speaking).
// `accepted` lists valid answers (normalized: lowercased, accents kept,
// punctuation stripped) — matches writing-chapters-a2.js conventions.

export const WRITING_CHAPTERS_B1 = [
  {
    id: 'future-plans',
    order: 1,
    title: 'Future plans',
    description: 'Write about the future using futur simple',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "I will move to Toronto."',
        accepted: ['je déménagerai à toronto', 'je demenagerai a toronto'],
        hint: 'je déménagerai à ___',
        pronunciation: 'zhuh day-mayn-zhuh-RAY ah Toronto',
      },
      {
        id: 'w2',
        prompt: 'Write: "We will travel to France."',
        accepted: ['nous voyagerons en france'],
        hint: 'nous voyagerons ___',
        pronunciation: 'noo vwah-yahzh-ROHN ahn FRAHNS',
      },
      {
        id: 'w3',
        prompt: 'Write: "She will finish her degree."',
        accepted: ['elle finira son diplôme', 'elle finira son diplome'],
        hint: 'elle finira ___',
        pronunciation: 'ell fee-nee-RAH sohn dee-PLOHM',
      },
    ],
  },
  {
    id: 'opinions',
    order: 2,
    title: 'Sharing opinions',
    description: 'Write opinions using à mon avis / je pense que',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "In my opinion, this idea is excellent."',
        accepted: ['à mon avis, cette idée est excellente', 'a mon avis cette idee est excellente'],
        hint: 'à mon avis, cette idée est ___',
        pronunciation: 'ah mohn nah-VEE, set ee-DAY eh tek-say-LAHNT',
      },
      {
        id: 'w2',
        prompt: 'Write: "I think you are right."',
        accepted: ['je pense que tu as raison'],
        hint: 'je pense que tu as ___',
        pronunciation: 'zhuh PAHNS kuh tew ah reh-ZOHN',
      },
      {
        id: 'w3',
        prompt: 'Write: "I don\'t agree with this decision."',
        accepted: ['je ne suis pas d\'accord avec cette décision', 'je ne suis pas d accord avec cette decision'],
        hint: 'je ne suis pas d\'accord avec ___',
        pronunciation: 'zhuh nuh swee pah dah-KOR ah-vek set day-see-ZYOHN',
      },
    ],
  },
  {
    id: 'hypotheticals',
    order: 3,
    title: 'Hypothetical situations',
    description: 'Write with the conditionnel présent',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "If I had more time, I would travel more."',
        accepted: ['si j\'avais plus de temps, je voyagerais davantage', 'si j avais plus de temps je voyagerais davantage'],
        hint: 'si j\'avais plus de temps, je ___',
        pronunciation: 'see zhah-VEH plew duh TAHN, zhuh vwah-yah-zhuh-REH dah-vahn-TAZH',
      },
      {
        id: 'w2',
        prompt: 'Write: "If I were you, I would change jobs."',
        accepted: ['si j\'étais toi, je changerais d\'emploi', 'si j etais toi je changerais d emploi'],
        hint: 'si j\'étais toi, je ___',
        pronunciation: 'see zhay-TEH twah, zhuh shahn-zhuh-REH dahn-PLWAH',
      },
      {
        id: 'w3',
        prompt: 'Write: "I would really like to learn a third language."',
        accepted: ['j\'aimerais bien apprendre une troisième langue', 'j aimerais bien apprendre une troisieme langue'],
        hint: 'j\'aimerais bien apprendre ___',
        pronunciation: 'zhem-REH byan ah-PRAHN-druh oon trwah-ZYEM LAHNG',
      },
    ],
  },
  {
    id: 'giving-advice',
    order: 4,
    title: 'Giving advice',
    description: 'Write advice using il faut que and the subjunctive',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "You need to rest this weekend."',
        accepted: ['il faut que tu te reposes ce week-end', 'il faut que tu te reposes ce weekend'],
        hint: 'il faut que tu te ___',
        pronunciation: 'eel foh kuh tew tuh ruh-POHZ suh week-end',
      },
      {
        id: 'w2',
        prompt: 'Write: "You should talk to your supervisor."',
        accepted: ['tu devrais parler à ton superviseur', 'tu devrais parler a ton superviseur'],
        hint: 'tu devrais parler à ___',
        pronunciation: 'tew duh-VREH par-LAY ah tohn sew-pehr-vee-ZUHR',
      },
      {
        id: 'w3',
        prompt: 'Write: "It\'s important that you be on time."',
        accepted: ['il est important que vous soyez à l\'heure', 'il est important que vous soyez a l heure'],
        hint: 'il est important que vous ___',
        pronunciation: 'eel eh tan-por-TAHN kuh voo swah-YAY ah LUHR',
      },
    ],
  },
  {
    id: 'job-interview',
    order: 5,
    title: 'Job interview basics',
    description: 'Write formal interview answers using vous',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "I have worked five years in this field."',
        accepted: ['j\'ai travaillé cinq ans dans ce domaine', 'j ai travaille cinq ans dans ce domaine'],
        hint: 'j\'ai travaillé ___',
        pronunciation: 'zhay trah-vah-YAY sank ahn dahn suh doh-MEN',
      },
      {
        id: 'w2',
        prompt: 'Write: "I am someone motivated and organized."',
        accepted: ['je suis quelqu\'un de motivé et organisé', 'je suis quelqu un de motive et organise'],
        hint: 'je suis quelqu\'un de ___',
        pronunciation: 'zhuh swee kel-KUHN duh moh-tee-VAY ay or-gah-nee-ZAY',
      },
      {
        id: 'w3',
        prompt: 'Write: "What are your greatest strengths?"',
        accepted: ['quelles sont vos plus grandes forces'],
        hint: 'quelles sont vos plus grandes ___',
        pronunciation: 'kell sohn voh plew GRAHND FORS',
      },
    ],
  },
]
