/**
 * THE LOVE WE BECAME
 * Edit the story here. Chapter order is the order of CHAPTERS.
 *
 * Photographs & videos
 * Drop files into src/assets/media/<album>/ and they appear on their own.
 *   beginning, flowers, adventures, midnight, october2, october3, october7
 * Name a file with a memory word so it finds the right moment
 *   (ooty, bowling, win, flower, pink, jigarthanda, trevizo, endgame, doraemon…).
 * Anything private belongs in src/assets/media/private/
 * and stays behind the hold / passcode. It is never shown in the open story.
 *
 * QR
 * Paste the final public URL into SITE.qrDestinationUrl.
 * Leave it empty to use this site's address with ?enter=1.
 *
 * Private gate
 * Change SITE.privatePasscode. Holding the seal also opens it.
 */

export type AudioMood = 'pulse' | 'memory' | 'intimate' | 'warm' | 'finale' | 'hush'
export type ChapterMood = 'memory' | 'intimate' | 'warm' | 'cinema' | 'sky' | 'finale'

export interface ChapterMeta {
  id: string
  num: string
  kicker: string
  title: string
  subtitle?: string
  mood: ChapterMood
}

export interface ScriptLine {
  text: string
  variant?: 'whisper' | 'body' | 'emphasis' | 'title' | 'hand'
}

export interface FlowerMoment {
  id: string
  title: string
  keywords: string[]
  tone: string
  lines: ScriptLine[]
}

export interface MemoryItem {
  id: string
  title: string
  date?: string
  text: string
  album: string
  keywords?: string[]
}

export interface DreamStar {
  id: string
  label: string
  line: string
  x: number
  y: number
}

export const SITE = {
  title: 'THE LOVE WE BECAME',
  titlePairing: 'Raghav × Kanmani',
  monogram: 'Romeo × Kanmani',
  /** Paste the live website URL. Empty uses the current address. */
  qrDestinationUrl: '',
  /** Word for the private photographs. Holding the seal also opens them. */
  privatePasscode: 'kanmani',
}

export const CHAPTERS: ChapterMeta[] = [
  { id: 'beginning', num: '01', kicker: 'The Unexpected Beginning', title: 'The Day You Found Me', mood: 'memory' },
  { id: 'flowers', num: '02', kicker: 'The Flowers', title: 'You Kept Bringing Me Flowers', mood: 'memory' },
  { id: 'adventures', num: '03', kicker: 'All the Little Adventures', title: 'All the Places We Became Us', mood: 'memory' },
  { id: 'midnight', num: '04', kicker: 'A Midnight Screening', title: 'Midnight with Raghav', mood: 'cinema' },
  { id: 'october2', num: '05', kicker: 'A Date I Will Keep', title: 'October 2, 2026', subtitle: 'The night everything felt closer', mood: 'intimate' },
  { id: 'october3', num: '06', kicker: 'The Hour I Chose', title: '12:00 AM — October 3', mood: 'intimate' },
  { id: 'october7', num: '07', kicker: 'After the Lights', title: 'October 7, 2026', subtitle: 'The night we chose each other again', mood: 'warm' },
  { id: 'dreams', num: '08', kicker: 'What I Want with You', title: "I Don't Just Want Moments with You", mood: 'memory' },
  { id: 'allofyou', num: '09', kicker: 'All of You', title: 'I Love Everything About You', mood: 'memory' },
  { id: 'kanmani', num: '10', kicker: 'A Name That Became Ours', title: 'Your Kanmani', mood: 'memory' },
  { id: 'hislove', num: '11', kicker: 'What You Told Me', title: 'The Love You Gave Me', mood: 'intimate' },
  { id: 'reallove', num: '12', kicker: 'In Return', title: 'I Want to Make You Feel Loved', mood: 'warm' },
  { id: 'sky', num: '13', kicker: 'The Constellation', title: 'My Dreams Have You in Them', mood: 'sky' },
]

export function audioMoodFor(mood: ChapterMood): AudioMood {
  if (mood === 'intimate') return 'intimate'
  if (mood === 'warm') return 'warm'
  if (mood === 'finale') return 'finale'
  return 'memory'
}

export const GATE = {
  lines: [
    "Some stories aren't meant to be read.",
    "They're meant to be felt.",
  ],
  name: 'Raghav',
  whisper: 'Something was made for you.',
  scan: 'Scan to enter',
  touch: 'If this is already in your hands, touch the seal.',
}

export const ARRIVAL = {
  title: 'The Love We Became',
  pairing: 'Raghav × Kanmani',
  line: 'Our story is still being written.',
}

export const BEGINNING = {
  epigraph:
    'Somewhere between two people finding each other and two people choosing each other… we became us.',
  lines: [
    { text: "I don't know exactly when you became so important to me.", variant: 'body' },
    { text: 'Maybe it was the first conversation.', variant: 'whisper' },
    { text: 'Maybe it was the way you looked at me.', variant: 'whisper' },
    { text: 'Maybe it was the little things you did without realizing how much they meant.', variant: 'whisper' },
    { text: 'Or maybe love was quietly happening while we were busy calling it something else.', variant: 'emphasis' },
  ] as ScriptLine[],
  notes: [
    'the first conversation',
    'the way you looked at me',
    'the little things',
    'while we called it something else',
  ],
}

export const FLOWERS = {
  intro: [
    { text: "I don't know when flowers became our thing.", variant: 'body' },
  ] as ScriptLine[],
  moments: [
    {
      id: 'first',
      title: 'The first flowers',
      keywords: ['first', 'rose', 'red'],
      tone: '#f4b8cb',
      lines: [{ text: 'The first flowers.', variant: 'title' }],
    },
    {
      id: 'pink',
      title: 'Pink and purple',
      keywords: ['pink', 'purple', 'lavender'],
      tone: '#e4d4f7',
      lines: [{ text: 'The pink and purple flowers.', variant: 'title' }],
    },
    {
      id: 'ooty',
      title: 'Ooty',
      keywords: ['ooty', 'hill', 'mountain'],
      tone: '#f8d7c8',
      lines: [{ text: 'The flowers in Ooty.', variant: 'title' }],
    },
    {
      id: 'again',
      title: 'Again',
      keywords: ['again', 'door', 'visit'],
      tone: '#f7c5d4',
      lines: [
        { text: 'And then somehow…', variant: 'whisper' },
        { text: 'every time you came to see me, there was another flower waiting in your hands.', variant: 'body' },
      ],
    },
  ] as FlowerMoment[],
  after: [
    { text: 'You probably thought you were just bringing me flowers.', variant: 'whisper' },
    { text: 'But I was quietly collecting those moments in my heart.', variant: 'emphasis' },
  ] as ScriptLine[],
}

export const ADVENTURES: MemoryItem[] = [
  { id: 'first-dates', title: 'First dates', text: 'The earliest days. Before we had language for what this was.', album: 'adventures', keywords: ['first', 'date', 'beginning'] },
  { id: 'cafe', title: 'Cafe moments', text: 'A table. Two cups. Time that did not ask us to hurry.', album: 'adventures', keywords: ['cafe', 'coffee', 'tea'] },
  { id: 'milkshakes', title: 'Milkshakes', text: 'Something sweet between us, and nowhere else we needed to be.', album: 'adventures', keywords: ['milkshake', 'shake'] },
  { id: 'trevizo', title: 'Trevizo pizza', text: 'Trevizo. Pizza. One of our tables.', album: 'adventures', keywords: ['trevizo', 'pizza'] },
  { id: 'jigarthanda', title: 'Jigarthanda', text: 'Cold, sweet, and kept.', album: 'adventures', keywords: ['jigarthanda', 'jigar'] },
  { id: 'bowling', title: 'Bowling', text: 'A lane, a little noise, and us in the middle of it.', album: 'adventures', keywords: ['bowling', 'bowl'] },
  { id: 'bowling-win', title: 'Winning at bowling', text: 'You won. I kept that.', album: 'adventures', keywords: ['win', 'winning', 'trophy'] },
  { id: 'snooker', title: 'Snooker', text: 'The quiet of the table. You, across it.', album: 'adventures', keywords: ['snooker', 'pool', 'billiard'] },
  { id: 'flowers-memory', title: 'Flowers', text: 'Your hands, and something blooming in them.', album: 'flowers', keywords: ['flower', 'bouquet', 'rose'] },
  { id: 'ooty', title: 'Ooty', text: 'The hills, the cold, and flowers you brought there too.', album: 'adventures', keywords: ['ooty'] },
  { id: 'mindescapes', title: 'MindEscapes', text: 'A world we stepped into together.', album: 'adventures', keywords: ['mind', 'escape'] },
  { id: 'boating', title: 'Boating', text: 'Water under us. The day moving slower.', album: 'adventures', keywords: ['boat', 'boating', 'lake'] },
  { id: 'bridge', title: 'The bridge', text: 'A crossing I still see when I think of us.', album: 'adventures', keywords: ['bridge'] },
  { id: 'car', title: 'The car ride', text: 'The road, and you beside me.', album: 'adventures', keywords: ['car', 'drive', 'ride'] },
  { id: 'singing', title: 'Singing together', text: 'Your voice and mine, sharing the same moment.', album: 'adventures', keywords: ['sing', 'song', 'karaoke'] },
  { id: 'endgame', title: 'Midnight · Avengers: Endgame', date: 'Midnight', text: 'One movie. One midnight. Conversations that became bigger than the film.', album: 'midnight', keywords: ['endgame', 'avengers', 'midnight'] },
  { id: 'future', title: 'Talking about the future', text: 'We talked about what could come next, and I started picturing you in it.', album: 'midnight', keywords: ['future', 'talk'] },
  { id: 'characters', title: 'Who we are', text: 'We talked about our personalities. The characters we carry. The parts we are still learning how to name.', album: 'adventures', keywords: ['personality', 'character'] },
  { id: 'meesaya', title: 'Meesaya Murukku 2', date: 'October 2, 2026', text: 'The film we went to see. The date that stayed.', album: 'october2', keywords: ['meesaya', 'murukku', 'october2'] },
  { id: 'oct3', title: 'October 3, midnight', date: 'October 3, 2026 · 12:00 AM', text: 'The hour I proposed. The hour I chose you.', album: 'october3', keywords: ['october3', 'proposal', 'midnight'] },
  { id: 'doraemon', title: 'Doraemon', date: 'October 7, 2026', text: 'A movie with your brother. And then a night that became about us.', album: 'october7', keywords: ['doraemon', 'october7'] },
  { id: 'oct7', title: 'October 7', date: 'October 7, 2026', text: 'We opened up. We stayed. We chose each other again.', album: 'october7', keywords: ['october7', 'talk', 'night'] },
]

export const MIDNIGHT = {
  clock: '12:00 AM',
  film: 'Avengers: Endgame',
  lines: [
    { text: 'One movie.', variant: 'title' },
    { text: 'One midnight.', variant: 'title' },
    { text: 'Two people.', variant: 'title' },
    { text: 'And conversations that somehow became bigger than the movie.', variant: 'body' },
  ] as ScriptLine[],
  after: [
    { text: 'We talked about the future.', variant: 'whisper' },
    { text: 'We talked about who we are.', variant: 'whisper' },
    { text: 'We talked about the kind of people we want to become.', variant: 'whisper' },
    { text: 'And somewhere in those conversations, I realized I wasn’t just enjoying moments with you.', variant: 'body' },
    { text: 'I was imagining more of them.', variant: 'emphasis' },
  ] as ScriptLine[],
}

export const OCTOBER2 = {
  film: 'Meesaya Murukku 2',
  date: 'October 2, 2026',
  lines: [
    { text: 'October 2 became one of those dates that will always stay somewhere inside me.', variant: 'body' },
    { text: 'We became closer that night.', variant: 'emphasis' },
    { text: 'Not just physically.', variant: 'whisper' },
    { text: 'Emotionally.', variant: 'title' },
    { text: 'There was a kind of trust between us that felt different.', variant: 'body' },
    { text: 'A feeling that we were no longer simply two people dating.', variant: 'body' },
    { text: 'We were becoming something deeper.', variant: 'emphasis' },
  ] as ScriptLine[],
  after: [
    { text: "Some moments don't need many words.", variant: 'whisper' },
    { text: 'They simply change the way you look at the person beside you.', variant: 'emphasis' },
  ] as ScriptLine[],
  lockTitle: 'A few photographs stay between us.',
  lockHint: 'Hold the seal, or speak the word only we would use.',
}

export const OCTOBER3 = {
  lead: 'And at midnight…',
  proposal: 'I proposed to you.',
  lines: [
    { text: "I didn't propose because I had every answer about the future.", variant: 'body' },
    { text: 'I proposed because I knew one thing.', variant: 'whisper' },
    { text: 'I wanted you in it.', variant: 'title' },
    { text: 'I wanted to choose you.', variant: 'emphasis' },
    { text: 'I wanted to build something with you.', variant: 'body' },
    { text: 'I wanted to see where our story could take us.', variant: 'body' },
  ] as ScriptLine[],
  vow: 'I chose you.',
}

export const OCTOBER7 = {
  film: 'Doraemon',
  with: "With Raghav's brother.",
  lines: [
    { text: 'It started as another movie night.', variant: 'whisper' },
    { text: 'But somehow… it became something much more important.', variant: 'body' },
  ] as ScriptLine[],
  opened: [
    { text: 'We opened up.', variant: 'title' },
    { text: 'About our insecurities.', variant: 'whisper' },
    { text: 'About the things that scare us.', variant: 'whisper' },
    { text: 'About the things we misunderstand.', variant: 'whisper' },
    { text: "About the parts of ourselves we don't always know how to explain.", variant: 'whisper' },
  ] as ScriptLine[],
  stayed: [
    { text: 'We became vulnerable with each other.', variant: 'body' },
    { text: "We didn't suddenly become perfect.", variant: 'whisper' },
    { text: 'We still had insecurities.', variant: 'whisper' },
    { text: 'We still misunderstood each other sometimes.', variant: 'whisper' },
    { text: 'But we communicated.', variant: 'emphasis' },
  ] as ScriptLine[],
  close: [
    { text: 'And somehow…', variant: 'whisper' },
    { text: "after seeing each other's vulnerable sides,", variant: 'body' },
    { text: "we didn't walk away.", variant: 'emphasis' },
  ] as ScriptLine[],
  vow: 'We chose each other.',
  last: "That's what made that night so memorable to me.",
}

export const DREAMS = {
  intro: [
    { text: 'Raghav…', variant: 'hand' },
    { text: 'I want a life filled with little moments with you.', variant: 'body' },
  ] as ScriptLine[],
  wants: [
    'I want to explore places with you.',
    'I want to try new food with you.',
    'I want to dance with you.',
    'I want late-night conversations with you.',
    'I want dinners together.',
    'I want to wake up beside you.',
    'I want to cook together.',
    'I want to go to the gym together.',
    'I want random drives.',
    'I want adventures.',
    'I want to travel.',
    'I want to laugh until our stomachs hurt.',
    "I want to flirt with you even when we're old.",
  ],
  old: 'I want to grow old with you and still look at you like you’re the most handsome man I’ve ever seen.',
  someday: [
    { text: 'And someday…', variant: 'whisper' },
    { text: 'beautiful, healthy little children running around our home.', variant: 'body' },
    { text: 'A family.', variant: 'emphasis' },
    { text: 'A life.', variant: 'emphasis' },
    { text: 'A home full of laughter.', variant: 'emphasis' },
    { text: 'A story we built together.', variant: 'title' },
  ] as ScriptLine[],
}

export const ALL_OF_YOU = {
  name: 'Raghav.',
  features: [
    'I love your face.',
    'Your eyes.',
    'Your eyebrows.',
    'Your hair.',
    'Your smile.',
    'Your expressions.',
    'Your little habits.',
    'Your body.',
    'Your hands.',
    'Your everything.',
  ],
  handsome: 'You somehow manage to look incredibly handsome and ridiculously cute at the same time.',
  seen: 'You are one of the most beautiful, handsome, and attractive men I have ever seen.',
  deeper: "But the thing I love most isn't just the way you look. It's the person I see when I look at you.",
  qualities: [
    { word: 'Caring', note: 'The way you show up with something in your hands, and with room for how I feel.' },
    { word: 'Protective', note: 'A pillar. A place that feels safe.' },
    { word: 'Romantic', note: 'Flowers. Midnights. The way you speak about love.' },
    { word: 'Playful', note: 'Bowling lanes, milkshakes, a movie with your brother, the mischief in you.' },
    { word: 'Funny', note: 'The silliness I want to keep until we are old.' },
    { word: 'Vulnerable', note: 'October 7. You let me see what scares you.' },
    { word: 'Emotionally open', note: 'You stayed in the conversation when it would have been easier to leave it.' },
    { word: 'Supportive', note: 'You want to be there for the joy and the sorrow.' },
    { word: 'Affectionate', note: 'In the closeness, and in the ordinary days between the big ones.' },
  ],
}

export const KANMANI = {
  lines: [
    { text: 'You call me Kanmani.', variant: 'hand' },
    { text: 'And I love that.', variant: 'emphasis' },
    { text: 'Because somewhere along the way, “Kanmani” stopped feeling like a nickname.', variant: 'body' },
    { text: 'It became a little world that belongs to us.', variant: 'whisper' },
  ] as ScriptLine[],
  title: 'Your Kanmani',
}

export const HIS_LOVE = {
  fragments: [
    'I want to be your best friend.',
    'I want to be your pillar of support.',
    'I want to be there for your joy and your sorrow.',
    'I want to give you safety and comfort.',
    'I want to be your naughty boyfriend.',
    'Your caring husband.',
    'And someday… the father of your kids.',
  ],
  after: [
    { text: 'You told me what love means to you.', variant: 'body' },
    { text: 'And I want you to know what love means to me too.', variant: 'emphasis' },
  ] as ScriptLine[],
}

export const REAL_LOVE = {
  intro: [
    { text: 'You made me feel loved, Raghav.', variant: 'body' },
    { text: 'And now…', variant: 'whisper' },
    { text: 'I want to make you feel even more loved.', variant: 'emphasis' },
  ] as ScriptLine[],
  whens: [
    'I want you to feel loved when I look at you.',
    'When I listen to you.',
    'When I remember the smallest things about you.',
    'When I make something for you.',
    'When I hold you.',
    'When I choose to understand you.',
    'When we disagree.',
    'When we are happy.',
    'When life gets difficult.',
  ],
  vows: [
    "I don't want a perfect love.",
    'I want a real one.',
  ],
  real: [
    'One where we communicate.',
    'One where we are honest.',
    'One where we can be insecure and still feel safe.',
    'One where we can misunderstand and still choose to understand.',
    'One where we keep choosing each other.',
  ],
}

export const SKY = {
  intro: 'I have so many dreams.',
  line: 'And somehow… so many of them have you in them.',
  connect: 'Let them become one',
  stars: [
    { id: 'travel', label: 'Travel', line: 'I want to explore places with you.', x: 18, y: 48 },
    { id: 'food', label: 'Food', line: 'I want to try new food with you.', x: 30, y: 30 },
    { id: 'dance', label: 'Dance', line: 'I want to dance with you.', x: 44, y: 24 },
    { id: 'home', label: 'Home', line: 'I want to build a home with you.', x: 52, y: 40 },
    { id: 'love', label: 'Love', line: 'I want a real love. The kind we keep choosing.', x: 50, y: 54 },
    { id: 'cooking', label: 'Cooking', line: 'I want to cook together.', x: 64, y: 28 },
    { id: 'gym', label: 'Gym', line: 'I want to go to the gym together.', x: 78, y: 36 },
    { id: 'talks', label: 'Midnight talks', line: 'I want late-night conversations with you.', x: 82, y: 54 },
    { id: 'roads', label: 'Road trips', line: 'I want random drives. Adventures. The road.', x: 70, y: 68 },
    { id: 'family', label: 'Family', line: 'A family. A life. A home full of laughter.', x: 54, y: 72 },
    { id: 'kids', label: 'Kids', line: 'Someday, if life is kind, little children in that home.', x: 36, y: 70 },
    { id: 'old', label: 'Growing old', line: 'I want to grow old with you, and still look at you that way.', x: 22, y: 62 },
  ] as DreamStar[],
  path: ['travel', 'food', 'dance', 'home', 'love', 'cooking', 'gym', 'talks', 'roads', 'family', 'love', 'kids', 'old', 'travel'],
}

export const FINALE = {
  before: [
    { text: 'There was a time when you told me you loved me…', variant: 'body' },
    { text: 'and I needed time.', variant: 'whisper' },
    { text: 'I wanted to be sure.', variant: 'whisper' },
    { text: 'I wanted it to be real.', variant: 'whisper' },
    { text: 'And somewhere along the way…', variant: 'body' },
    { text: 'I stopped being afraid of saying it.', variant: 'emphasis' },
  ] as ScriptLine[],
  name: 'Raghav…',
  love: 'I love you.',
  because: [
    { text: 'Not because you said it first.', variant: 'whisper' },
    { text: 'Not because I was supposed to.', variant: 'whisper' },
    { text: 'But because it became true.', variant: 'emphasis' },
  ] as ScriptLine[],
  whens: [
    "I love you when we're happy.",
    "I love you when we're silly.",
    "I love you when we're flirting.",
    "I love you when we're vulnerable.",
    "I love you when we're trying to understand each other.",
    "I love you even when we're imperfect.",
  ],
  special: 'You became one of the most special people in my entire life.',
  made: 'You made me feel loved.',
  want: 'And I want to make you feel loved.',
  skyLead: [
    { text: 'Raghav…', variant: 'hand' },
    { text: "I don't know exactly what every chapter of our future will look like.", variant: 'body' },
    { text: 'But I know who I want beside me while we discover it.', variant: 'emphasis' },
  ] as ScriptLine[],
  live: [
    'I want to live with you.',
    'Explore with you.',
    'Eat with you.',
    'Dance with you.',
    'Travel with you.',
    'Wake up beside you.',
    'Cook with you.',
    'Go to the gym with you.',
    'Have late-night talks with you.',
    "Flirt with you even when we're old.",
    'Build a home with you.',
    'Build a family with you.',
    'Grow old with you.',
  ],
  closing: [
    { text: 'I have so many dreams, Raghav.', variant: 'body' },
    { text: 'And I hope we keep communicating through every single one of them.', variant: 'whisper' },
    { text: 'Because whatever happens…', variant: 'body' },
    { text: 'I want us to talk.', variant: 'emphasis' },
    { text: 'I want us to understand.', variant: 'emphasis' },
    { text: 'I want us to choose each other.', variant: 'emphasis' },
  ] as ScriptLine[],
  every: 'Every time.',
  signoff: 'With all my heart,',
  signature: 'Your Kanmani ❤️',
  endnote: [
    "This isn't the end of our story.",
    "It's one of my favourite chapters so far.",
  ],
  more: 'There is one more thing…',
  kiss: 'Come here. I owe you a kiss. ❤️',
  look: 'Now go look at me the way you always do. 😌❤️',
}

export const FLOATING = [
  'Flowers',
  'Ooty',
  'Bowling',
  'The car',
  'Endgame',
  'A ticket',
  'October 2',
  'October 3',
  'October 7',
  'Doraemon',
  'Jigarthanda',
  'The bridge',
]
