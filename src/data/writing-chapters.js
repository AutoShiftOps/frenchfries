// A1 Writing chapters — translate an English prompt into French.
// `accepted` lists valid answers (normalized: lowercased, accents kept,
// punctuation stripped) — the checker in WritingPractice does the
// normalizing, so write these as natural, correctly-accented French.
// Field is `phrases` for ChapterList reuse.
// `pronunciation` is a plain-English phonetic respelling (not IPA) of
// accepted[0] — only revealed after the learner checks their answer,
// so it doesn't give the answer away up front.

export const WRITING_CHAPTERS = [
  {
    id: 'greetings',
    order: 1,
    title: 'Greetings and introductions',
    description: 'Write simple introductions in French',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "Hello, my name is Sajja."',
        accepted: ["bonjour je m'appelle sajja", "bonjour, je m'appelle sajja"],
        hint: 'bonjour, je m\'appelle ___',
        pronunciation: 'bohn-ZHOOR, zhuh mah-PELL Sajja',
      },
      {
        id: 'w2',
        prompt: 'Write: "How are you?" (formal)',
        accepted: ['comment allez-vous', 'comment allez vous', 'comment allez-vous ?'],
        hint: 'comment allez-___ ?',
        pronunciation: 'koh-mahn tah-lay-VOO',
      },
      {
        id: 'w3',
        prompt: 'Write: "Nice to meet you."',
        accepted: ['enchanté de vous rencontrer', 'enchantée de vous rencontrer', 'enchanté', 'enchantée'],
        hint: 'enchanté(e) de vous ___',
        pronunciation: 'ahn-shahn-TAY duh voo rahn-kohn-TRAY',
      },
    ],
  },
  {
    id: 'ordering',
    order: 2,
    title: 'Ordering food and drink',
    description: 'Write café orders in French',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "I would like a coffee, please."',
        accepted: ["je voudrais un café, s'il vous plaît", "je voudrais un café s'il vous plaît", 'je voudrais un cafe sil vous plait'],
        hint: 'je voudrais un ___, s\'il vous plaît',
        pronunciation: 'zhuh voo-DREH uhn kah-FAY, seel voo PLEH',
      },
      {
        id: 'w2',
        prompt: 'Write: "The bill, please."',
        accepted: ["l'addition, s'il vous plaît", "l'addition s'il vous plaît", 'laddition sil vous plait'],
        hint: 'l\'___, s\'il vous plaît',
        pronunciation: 'lah-dee-SYOHN, seel voo PLEH',
      },
      {
        id: 'w3',
        prompt: 'Write: "It\'s delicious."',
        accepted: ["c'est délicieux", 'cest delicieux'],
        hint: 'c\'est ___',
        pronunciation: 'seh day-lee-SYUH',
      },
    ],
  },
  {
    id: 'directions',
    order: 3,
    title: 'Asking for directions',
    description: 'Write direction requests in French',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "Excuse me, where is the train station?"',
        accepted: ['excusez-moi, où est la gare', 'excusez moi ou est la gare', 'excusez-moi, où est la gare ?'],
        hint: 'excusez-moi, où est ___ ?',
        pronunciation: 'ex-kew-ZAY-mwah, oo eh lah GAHR',
      },
      {
        id: 'w2',
        prompt: 'Write: "Turn left, please."',
        accepted: ["tournez à gauche, s'il vous plaît", 'tournez a gauche sil vous plait'],
        hint: 'tournez à ___, s\'il vous plaît',
        pronunciation: 'toor-NAY ah GOHSH, seel voo PLEH',
      },
      {
        id: 'w3',
        prompt: 'Write: "Thank you very much."',
        accepted: ['merci beaucoup'],
        hint: 'merci ___',
        pronunciation: 'mehr-SEE boh-KOO',
      },
    ],
  },
  {
    id: 'family',
    order: 4,
    title: 'Describing your family',
    description: 'Write about family in French',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "My wife is called Asha."',
        accepted: ["ma femme s'appelle asha", 'ma femme sappelle asha'],
        hint: 'ma femme s\'appelle ___',
        pronunciation: 'mah FAHM sah-PELL Asha',
      },
      {
        id: 'w2',
        prompt: 'Write: "My son is young."',
        accepted: ['mon fils est jeune'],
        hint: 'mon fils est ___',
        pronunciation: 'mohn FEES eh ZHUHN',
      },
      {
        id: 'w3',
        prompt: 'Write: "We live in Canada."',
        accepted: ['nous habitons au canada'],
        hint: 'nous habitons au ___',
        pronunciation: 'noo zah-bee-TOHN oh Canada',
      },
    ],
  },
  {
    id: 'numbers-time',
    order: 5,
    title: 'Numbers and time',
    description: 'Write times and numbers in French',
    phrases: [
      {
        id: 'w1',
        prompt: 'Write: "It\'s 3:30."',
        accepted: ['il est trois heures et demie'],
        hint: 'il est ___ heures et demie',
        pronunciation: 'eel eh TRWAH-zuhr ay duh-MEE',
      },
      {
        id: 'w2',
        prompt: 'Write: "I have an appointment at 9 o\'clock."',
        accepted: ["j'ai rendez-vous à neuf heures", 'jai rendez vous a neuf heures'],
        hint: 'j\'ai rendez-vous à ___ heures',
        pronunciation: 'zhay rahn-day-VOO ah nuh-VUHR',
      },
      {
        id: 'w3',
        prompt: 'Write: "On Mondays, I work."',
        accepted: ['le lundi, je travaille', 'le lundi je travaille'],
        hint: 'le lundi, je ___',
        pronunciation: 'luh luhn-DEE, zhuh trah-VIGH',
      },
    ],
  },
]
