// lib/blog.ts
// ─────────────────────────────────────────────────────────────────────────────
// All blog posts live here. To add a new post:
//   1. Add a new object to the TOP of the POSTS array
//   2. Give it a unique slug (URL-friendly, no spaces)
//   3. Fill in the fields
// ─────────────────────────────────────────────────────────────────────────────

export type Category =
  | "Teaching & Doctrine"
  | "Conference Updates"
  | "Ministry News";

export interface Post {
  slug: string;
  title: string;
  category: Category;
  date: string; // e.g. "June 8, 2025"
  author: string;
  excerpt: string; // 1–2 sentence summary shown on cards
  readTime: string; // e.g. "4 min read"
  content: string; // Full post — plain paragraphs separated by \n\n
  // Start a paragraph with "## " to make it a heading
  // Start with "> " to make it a pull quote
}

export const POSTS: Post[] = [
  {
    slug: "sowers-conference-2026-announcement",
    title: "Sowers Conference 2026 — Fire Brands",
    category: "Conference Updates",
    date: "June 8, 2025",
    author: "Calvaryway Mission",
    excerpt:
      "The Sowers Conference is returning in August 2026 with the theme 'Fire Brands' — a people prepared by the Lord. Here's everything you need to know.",
    readTime: "3 min read",
    content: `We are pleased to announce that the Sowers Conference 2026 is coming to Akure, Ondo State from August 20 to 22, 2026.

## Theme: Fire Brands

> "Then Samson went and caught three hundred foxes and took torches. And he turned them tail to tail and put a torch between each pair of tails." — Judges 15:4

The theme for this year's conference is Fire Brands — A People Prepared by the Lord. We believe this is a word for our generation: a people who have been set ablaze by God, not for their own comfort, but for the disruption of enemy strongholds and the advancement of God's kingdom.

## What to Expect

The Sowers Conference is a three-day gathering of believers — young and old, ministers and disciples — who come to be taught, sharpened and sent. Each session will feature intensive Bible teaching, corporate prayer, and time for fellowship and ministry.

Expect to encounter the Word of God delivered with clarity and depth. Expect to be challenged. Expect to leave different from how you came.

## Registration

Attendance is completely free. Registration is open now — simply fill in your details on our registration page and we will keep you updated with venue information and programme schedule as the date approaches.

We look forward to welcoming you to Akure in August. Come ready.`,
  },
  {
    slug: "what-is-discipleship",
    title: "What Is Discipleship — And Why It Matters",
    category: "Teaching & Doctrine",
    date: "May 18, 2025",
    author: "Bro Goke Adesida",
    excerpt:
      "Discipleship is one of the most used and least understood words in the church today. This piece attempts to clarify what it actually means.",
    readTime: "6 min read",
    content: `The word disciple appears more than 250 times in the New Testament. Yet for all its frequency in Scripture, it remains one of the most misunderstood concepts in the modern church. We use the word freely, but what do we actually mean by it?

## A Disciple Is a Learner Who Follows

The Greek word mathetes, translated disciple, means learner or pupil. But it carries more weight than the English word suggests. In the ancient world, a disciple did not merely attend lectures. He followed his teacher. He lived with him, watched how he handled situations, absorbed his way of seeing the world, and in time, came to resemble him.

This is exactly the picture Jesus paints when he calls his disciples. He does not say, "Come and learn my teachings." He says, "Come and follow me." The content and the person are inseparable.

> "If anyone would come after me, let him deny himself and take up his cross and follow me." — Matthew 16:24

## Why the Modern Church Has Lost the Thread

Much of what passes for discipleship today is actually information transfer. We run programmes, hand out notes, tick boxes on a curriculum. But a disciple is not someone who has completed a course. A disciple is someone who is being formed.

Formation requires time, proximity, and accountability. It requires an older believer investing deliberately in a younger one. It requires the Word of God not just taught but demonstrated. It is slow, costly, and inconvenient — which is perhaps why we have replaced it with programmes.

## Discipleship at Calvaryway

At Calvaryway Mission, discipleship is not a department. It is the reason we exist. Our Monday Bible Studies, our CDT weekends, our retreats and conferences — all of it is in service of one aim: forming believers into mature disciples of Jesus Christ who can, in turn, go and make disciples of others.

The mandate has not changed. The method has not changed. What needs to change is our willingness to pay the price.`,
  },
  {
    slug: "december-prayer-retreat-2025-report",
    title: "December Prayer Retreat 2025 — A Report",
    category: "Conference Updates",
    date: "January 5, 2025",
    author: "Calvaryway Mission",
    excerpt:
      "The December Prayer Retreat 2025 was a time of deep prayer, fellowship and the Word under the theme 'The Covenant Keeping God'. Here is a brief account.",
    readTime: "4 min read",
    content: `The December Prayer Retreat 2025 held in Akure, Ondo State, and we are grateful to God for what He did over those days.

## The Covenant Keeping God

The theme for this year's retreat was The Covenant Keeping God — a truth that anchored every session and became more real to many as the days passed. God is faithful not because of who we are, but because of who He is. He keeps His Word. He does not forget His promises.

Sessions were anchored in Scripture, tracing God's covenant faithfulness from Abraham through to the New Covenant in Christ. Participants were reminded that the same God who kept covenant with the patriarchs keeps covenant with every believer today.

## A Time of Prayer

True to the name of the retreat, significant time was given to corporate prayer. This was not prayer as formality but as encounter — bringing specific burdens, specific requests, specific gratitude to God in community.

Several testimonies came out of the prayer sessions — people who found clarity about direction, people who experienced breakthrough in areas they had been holding for a long time.

> "He remembers his covenant forever, the word he commanded, for a thousand generations." — Psalm 105:8

## Looking Ahead

We are grateful for every person who made the journey to be part of the retreat. The fruit of those days is not fully visible yet — but seed was planted, and we trust God to bring it to harvest.

Watch this space for announcements about the next December Prayer Retreat.`,
  },
  {
    slug: "the-cross-and-the-christian-life",
    title: "The Cross Is Not Just the Starting Point",
    category: "Teaching & Doctrine",
    date: "April 13, 2025",
    author: "Bro Goke Adesida",
    excerpt:
      "Many believers treat the cross as the entry point of the Christian life — the place where we began. But Scripture presents it as far more than that.",
    readTime: "5 min read",
    content: `There is a common misconception that the cross is where the Christian life begins — and then we move on. We were saved at the cross, we say, and now we are walking in resurrection life. The cross is behind us.

This is partly true, and wholly dangerous.

## The Cross as Centre, Not Starting Line

Paul writes to the Galatians: "Far be it from me to boast except in the cross of our Lord Jesus Christ, by which the world has been crucified to me, and I to the world." Note the present tense. Paul is not speaking of a past transaction. He is describing a present reality. The crucifixion of the world to him — and of him to the world — is ongoing.

The cross is not a starting line. It is the central organising principle of the entire Christian life.

> "I have been crucified with Christ. It is no longer I who live, but Christ who lives in me." — Galatians 2:20

## What the Cross Demands Daily

Jesus himself is explicit about this. "If anyone would come after me, let him deny himself and take up his cross daily and follow me." Daily. Not once, at conversion. Daily.

To take up the cross daily means to daily choose death to self. Death to my preferences, my comfort, my reputation, my rights. It means agreeing with God's assessment that the old man — the self-centred, self-seeking, self-protecting self — must be put to death continually.

This is not popular teaching. But it is unavoidable teaching if we take the words of Jesus seriously.

## The Cross and the Resurrection

None of this negates resurrection life. In fact, it is precisely through the cross that resurrection becomes real. There is no Easter Sunday without Good Friday. There is no genuine resurrection power in a life that has not passed through the cross.

The believers who walk in the deepest experience of Christ's resurrection are those who have not tried to bypass the cross but have embraced it as their daily companion.`,
  },
  {
    slug: "bible-study-resumes-2025",
    title: "Monday Bible Study — What We've Been Studying",
    category: "Ministry News",
    date: "June 2, 2025",
    author: "Calvaryway Mission",
    excerpt:
      "A brief update on the Monday Bible Study series — where we've been, what we're covering, and how to join us.",
    readTime: "2 min read",
    content: `The Monday Bible Study has continued faithfully through 2025, and we are grateful for the consistency of the Lord's people gathering week after week around the Word.

## Current Series

We are currently in a rich season of teaching on the life of the believer in Christ — covering topics like the new life in Christ, the nature of the overcomer, and what it means to be strong, rooted and victorious in God. Each session is available as both audio (on our Telegram channel) and video (on YouTube).

## Recent Topics

Some of the topics covered in recent weeks include The Power of Prayer, Evidences of a Maturing Believer, and our ongoing series on being Rooted and Victorious in Christ.

> "Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom." — Colossians 3:16

## How to Join

The Monday Bible Study holds every Monday evening at Oba Ile Housing Estate, Akure. If you are in or around Akure, you are welcome to join us in person. If you are elsewhere, you can follow along via our Telegram channel for audio recordings and our YouTube channel for video.

All are welcome. Come and grow.`,
  },
  {
    slug: "prayer-the-lifeblood-of-ministry",
    title: "Prayer: The Lifeblood of This Ministry",
    category: "Teaching & Doctrine",
    date: "March 10, 2025",
    author: "Bro Goke Adesida",
    excerpt:
      "A ministry that does not pray is running on borrowed time. At Calvaryway, prayer is not a programme — it is the foundation of everything.",
    readTime: "4 min read",
    content: `The apostles, when faced with a management problem in Acts 6, made a decision that reveals their priorities: "We will devote ourselves to prayer and to the ministry of the word." Not administration. Not programmes. Prayer and the Word.

This was not because they were impractical men. It was because they understood that a ministry not soaked in prayer is operating in its own strength — and human strength, however impressive it may appear for a season, will eventually run dry.

## Prayer as Foundation, Not Addition

In many ministry settings, prayer is an add-on. We have our plans, our structures, our strategies — and we pray over them. But in the New Testament model, prayer is not something added to the work. It is the foundation from which the work proceeds.

> "Unless the Lord builds the house, those who build it labour in vain." — Psalm 127:1

The order matters. We pray, and then we work — not the other way around.

## What This Looks Like at Calvaryway

At Calvaryway Mission, prayer has been present from the beginning — not as a scheduled activity alone, but as the posture of the work. Our December Prayer Retreats are an expression of this conviction: that before we plan a new year, we must first spend time in God's presence, aligning our hearts with His purposes.

The same applies to our weekly Bible Studies, our CDT sessions, and every conference we hold. We do not trust the Word to return void, but we also know that the Word is most fruitful when it is accompanied by prevailing prayer.

## A Call to the Prayer Team

If you are burdened for this ministry and desire to stand with us in prayer, we want to connect with you. There is a place for you on the prayer team — not as a formality, but as a genuine partner in the work.

Reach out to us on WhatsApp or through the contact page.`,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: Category): Post[] {
  return POSTS.filter((p) => p.category === category);
}

export const CATEGORIES: Category[] = [
  "Teaching & Doctrine",
  "Conference Updates",
  "Ministry News",
];

export const CATEGORY_COLORS: Record<Category, string> = {
  "Teaching & Doctrine": "rgba(201,169,110,0.8)",
  "Conference Updates": "rgba(168,196,162,0.8)",
  "Ministry News": "rgba(150,180,220,0.8)",
};
export const CATEGORY_BG: Record<Category, string> = {
  "Teaching & Doctrine": "rgba(201,169,110,0.1)",
  "Conference Updates": "rgba(168,196,162,0.1)",
  "Ministry News": "rgba(150,180,220,0.1)",
};
export const CATEGORY_BORDER: Record<Category, string> = {
  "Teaching & Doctrine": "rgba(201,169,110,0.2)",
  "Conference Updates": "rgba(168,196,162,0.2)",
  "Ministry News": "rgba(150,180,220,0.2)",
};
