# R5 — Legal, ethics and safety of cloning your OWN voice

Research date: 2026-10-17. All sources accessed 2026-10-17 unless stated otherwise.

> **Not legal advice.** These are educational research notes for a tutorial. Laws differ by country, change often, and depend on facts. For paid courses, company training or anything involving other people's voices, check with a qualified lawyer and, inside a company, with the data protection officer and works council.

Labels used:
- **(primary)**: official law text, regulator, court, or the vendor's/platform's own page.
- **(secondary)**: law-firm blog, news, review site.
- **Inference**: my own reading of the sources, not stated in them.
- **Unverified**: I looked and could not confirm it.

Reader profile assumed: a software engineer at a German company, possibly living in the EU or Asia, making English and Mandarin teaching content (paid courses, monetised YouTube, company training).

---

## 1. Rights in your own voice

### 1.1 GDPR: voice is personal data; it is "biometric data" only in some uses

- **Art. 4(14) GDPR** defines biometric data as "personal data resulting from specific technical processing relating to the physical, physiological or behavioural characteristics of a natural person, which allow or confirm the unique identification of that natural person, such as facial images or dactyloscopic data" (quoted in EDPB Guidelines 02/2021, fn. 14) (primary) [S5].
- **Art. 9(1)** prohibits processing "biometric data **for the purpose of uniquely identifying** a natural person", unless an Art. 9(2) exception applies. The relevant exceptions are (a) the data subject's explicit consent, and (e) data "manifestly made public by the data subject" (primary) [S6].
- **Recital 51** (written about photos, but the logic is the same for voice): photos count as biometric data "only when processed through a specific technical means allowing the unique identification or authentication of a natural person" (primary) [S7].
- **EDPB Guidelines 02/2021 on virtual voice assistants** (final, 7 July 2021): "voice data is inherently biometric personal data"; when voice is processed "for the purpose of uniquely identifying a natural person" an Art. 9 exception is needed, and for user identification "only data subjects' explicit consent seems applicable." The guidelines describe enrolment that creates a "voice model (or voiceprint)" used to identify users (primary) [S5].
- **What vendors say**:
  - Resemble's privacy policy classes "voice models ... and the voice and facial characteristics derived from them" as Art. 9 special-category data, and relies on Art. 9(2)(a) explicit consent for its consent-verification step (primary) [S40].
  - ElevenLabs says that checking your upload is really your voice "may" involve biometric/special-category data (primary) [S33].
  - Microsoft describes a "voice signature ... 'voiceprint' ... a numeric vector" used for speaker verification (primary) [S37].

**When is a voice clone "biometric data for unique identification"?** (Inference)
- Raw recordings and the clone itself are always personal data, because they identify you.
- The vendor's **speaker-verification step** (comparing your consent clip with your training audio) is a clear case of biometric processing for unique identification.
- A TTS voice model built only to *generate* speech is a grey area. Its purpose is synthesis, not identification. But it contains the identifying features, and some vendors (Resemble) treat it as Art. 9 data anyway. The safe approach: treat it as special-category data.
- When you clone your own voice for yourself, you are the data subject, and usually the controller too (for your own channel) or the employer is (for company content). The vendor is a processor or an independent controller depending on its terms.
- Inference: the GDPR household exemption, Art. 2(2)(c), does not cover monetised or company content.

**Pending change: the GDPR "Digital Omnibus"** (COM(2025) 837). Council texts dated 3 Sep 2026 and later propose a new **Art. 9(2)(l)**: biometric processing allowed for one-to-one **verification** where the biometric data or the means of verification are "under the sole control of the data subject". It is **still a proposal as of Oct 2026, not law** (primary Council doc + secondary tracker) [S8][S9][S10]. It does not cover voice synthesis.

### 1.2 Germany: general personality right (allgemeines Persönlichkeitsrecht)

- There is no special "voice statute". The voice is protected as part of the general personality right (Art. 2(1) with Art. 1(1) GG). Key precedents:
  - **OLG Hamburg, 8 May 1989, 3 W 45/89 ("Heinz Erhardt")**: a voice impersonator imitating a famous comedian in an advertisement infringed his (post-mortem) personality right.
  - **BGH, 1 Dec 1999, I ZR 49/97 ("Marlene Dietrich")**: commercially valuable identifying features (picture, name, and, the court notes, voice) are protected.
  (secondary summaries quoting the judgments) [S11][S12].
- **LG Berlin II, 20 Aug 2025, 2 O 202/24**: a YouTuber used an **AI imitation** of Manfred Lehmann (German dubbing voice of Bruce Willis) in commercial videos without consent. The court treated it like a human impersonation. The infringement turns on whether "ein erheblicher Teil des Publikums die Stimme ... zuordnet" (a significant part of the audience attributes the voice to the person). Art and free speech did not justify the mainly commercial use. Lehmann received a notional licence fee: €4,000 in total, €2,000 per video (secondary: LTO, aufrecht.de, dejure.org) [S12][S13][S14].
- **Draft § 201b StGB** ("Verletzung von Persönlichkeitsrechten durch täuschende Inhalte"): adopted by the federal cabinet on 7 Oct 2026 and sent to the Bundesrat (BR-Drs. 590/26, 9 Oct 2026).
  - It would criminalise making *accessible* computer-generated content that falsely appears to show a real event involving a person and is apt to "erheblich" damage their reputation. Penalty: up to 2 years or a fine.
  - Merely creating such content is not covered. Satire is excluded. Consent makes it lawful.
  - **Not yet law** (primary: BMJV press release and draft text) [S15][S16][S17].
- **Your own voice, Inference**: you can license your own voice to yourself or others. The risk for you in Germany is mainly on the *other* side: (a) someone misusing your clone, and (b) an employer or vendor using your voice beyond what you agreed to. See the ElevenLabs licence in §4.

### 1.3 United States

- **Right of publicity** is state law (statute or common law) and differs by state. No federal right exists as of Oct 2026 (see the NO FAKES Act below).
- **Tennessee ELVIS Act** (Ensuring Likeness, Voice, and Image Security Act of 2024, Public Chapter No. 588, HB 2091/SB 2096):
  - Effective **1 July 2024**.
  - Adds "voice" as a protected personal right, defined as "a sound in a medium that is readily identifiable and attributable to a particular individual, regardless of whether the sound contains the actual voice or a simulation of the voice of the individual."
  - Also changes the knowledge standard for liability to "had knowledge or reasonably should have known" (primary: Tennessee SOS PDF) [S18].
- **NO FAKES Act of 2026** (S. 4591 / H.R. 8915, introduced 20 May 2026):
  - Would create a federal IP-like right over "digital replicas" of voice and visual likeness. The right is licensable but not assignable during the person's life. It includes notice-and-takedown and pre-empts most state laws (except causes of action existing as of 2 Jan 2025).
  - S. 4591 was reported by Senate Judiciary and placed on the calendar on **24 Jun 2026** (primary: Congress.gov) [S19].
  - H.R. 8915 was referred to House Judiciary on 20 May 2026 (primary) [S20].
  - On **30 Sep 2026** Sen. Cruz objected to Sen. Blackburn's unanimous-consent request, and the bill is stalled until at least the post-election session in November (secondary: POLITICO, RBR, 9 Oct 2026) [S21][S22].
  - **Status: not law.**
  - The press reports a duration of "up to 70 years after death" and platform liability "up to $750,000 per work" (secondary; I did not check these figures in the bill text).

### 1.4 China

- **Beijing Internet Court, (2023)京0491民初12142号, judgment 23 Apr 2024** (Yin v. Beijing [AI tech co.] et al.), China's first AI-voice personality-rights case:
  - A voice actor's recordings, made under a contract with a media company, were passed to a software company. That company built a TTS voice from them, which was resold through a cloud platform and a dubbing app.
  - Holding: a natural person's voice-rights interests **extend to the AI voice** if it is identifiable. "If the voice synthesized by AI can make the general public or the public in relevant fields associate it with that natural person according to the timbre, intonation, and pronunciation style, it can be recognized as having identifiability."
  - Owning the copyright in the recordings did **not** include the right to "AI-ify" the voice.
  - Award: ¥250,000 economic loss, paid jointly by the media company and the software company, plus a written apology. Downstream companies without fault were not liable for damages. Neither side appealed (primary: court English page, Shandong court reference-case page, WIPO Lex) [S23][S24][S25].
  - Lesson for the reader, Inference: **a recording contract does not by itself grant voice-cloning rights**. This matters for any studio or employer recordings of you.
- **Provisions on the Administration of Deep Synthesis of Internet Information Services** (互联网信息服务深度合成管理规定, CAC/MIIT/MPS Order No. 12, in force 10 Jan 2023):
  - **Art. 14**: providers offering editing of biometric information such as faces or **human voices** (人声) "shall prompt users to inform the person being edited and obtain their **separate consent** (单独同意)".
  - **Art. 17(1)(2)**: for "合成人声、仿声等语音生成" (synthetic human voice, voice imitation) services that may cause public confusion, the provider must add **conspicuous labels** (primary: gov.cn) [S26].
- **Measures for Labeling AI-Generated Synthetic Content** (人工智能生成合成内容标识办法, 国信办通字〔2025〕2号, issued 7 Mar 2025, **effective 1 Sep 2025**) (primary: CAC) [S27]:
  - Art. 3: there are two kinds of labels, **explicit labels** (显式标识, perceptible: text, sound, graphics) and **implicit labels** (隐式标识, in the file data).
  - Art. 4(2): for **audio**, add "语音提示或者音频节奏提示" (a spoken notice or an audio-rhythm cue) at the start, end or a suitable middle point, or a conspicuous notice in the interface. Downloads and exports must keep the explicit label.
  - Art. 5: an implicit label in the **file metadata** containing the content attribute, the provider name or code, and a content ID. Watermarks are encouraged.
  - Art. 9: a provider may hand over unlabeled output only after the user agreement sets out the user's labelling duty, and must keep logs for at least 6 months.
  - **Art. 10: users publishing AI content "应当主动声明并使用 ... 标识功能"** (must proactively declare it and use the platform's labelling function). Nobody may maliciously remove or forge labels.
  - The companion national standard (GB 45438-2025, read here in its draft text) says the spoken label must contain "人工智能" or "AI" and "生成" and/or "合成". The rhythm cue is "短长 短短", which is "AI" in Morse code. The metadata field name must include "AIGC" (draft text, secondary host) [S28].
  - Inference: if the reader publishes Mandarin content on Chinese platforms (Bilibili, Douyin, WeChat Channels), or uses a Chinese provider such as MiniMax, he should expect to self-declare and keep the labels, **even for his own voice**.

---

## 2. EU AI Act Article 50: transparency

### 2.1 Exact text (Regulation (EU) 2024/1689) (primary) [S1]

- **Art. 50(2), providers**: "Providers of AI systems, including general-purpose AI systems, generating synthetic audio, image, video or text content, shall ensure that the outputs of the AI system are marked in a machine-readable format and detectable as artificially generated or manipulated. Providers shall ensure their technical solutions are effective, interoperable, robust and reliable as far as this is technically feasible ... This obligation shall not apply to the extent the AI systems perform an assistive function for standard editing or do not substantially alter the input data provided by the deployer or the semantics thereof ..."
- **Art. 50(4), deployers**:
  - First subparagraph, deep fakes: "Deployers of an AI system that generates or manipulates image, audio or video content constituting a deep fake, shall disclose that the content has been artificially generated or manipulated. ... Where the content forms part of an evidently artistic, creative, satirical, fictional or analogous work or programme, the transparency obligations set out in this paragraph are limited to disclosure of the existence of such generated or manipulated content in an appropriate manner that does not hamper the display or enjoyment of the work."
  - Second subparagraph, text on matters of public interest: must be disclosed "unless ... the AI-generated content has undergone a process of human review or editorial control and where a natural or legal person holds editorial responsibility." **This human-review exception applies to text only, not to audio.**
- **Art. 50(5)**: information must be given "in a clear and distinguishable manner at the latest at the time of the first interaction or exposure" and must meet accessibility requirements.
- **Art. 3(60), "deep fake"**: "AI-generated or manipulated image, audio or video content that resembles existing persons, objects, places, entities or events and would falsely appear to a person to be authentic or truthful."
- **Art. 2(10)** (quoted in the Commission Guidelines): the regulation does not apply to obligations of deployers who are natural persons using AI "in the course of a purely personal, non-professional activity." The Guidelines (para 19) add: "Any activity through which natural persons gain an economic benefit on a regular basis or are otherwise involved in a professional, business ... or freelance activity should be considered as a 'professional' activity" (primary) [S3].
- Penalties for Art. 50 breaches: up to €15M or 3% of worldwide annual turnover, with proportionality for SMEs (primary: Commission quick-facts) [S4].

### 2.2 Dates and the Digital Omnibus on AI (status as of 17 Oct 2026)

- Art. 50 has **applied since 2 Aug 2026** (Art. 113) (primary) [S1][S2].
- The **Digital Omnibus on AI** went through these steps:
  - Trilogue agreement on 7 May 2026.
  - EP plenary approval on 16 Jun 2026.
  - Council adoption on 29 Jun 2026.
  - Signed 8 Jul 2026, published in the OJ on 24 Jul 2026, in force 27 Jul 2026.
  (primary: EP Legislative Train; AI Act Service Desk) [S29][S2].
- **Its only change to Art. 50 timing**: providers whose systems were placed on the market **before 2 Aug 2026** have until **2 Dec 2026** to meet the **Art. 50(2) marking/detection** duty. Systems placed on the market from 2 Aug 2026 must comply immediately. **Deployer labelling under Art. 50(4) was not delayed** (primary) [S2][S30].
- Deep fakes generated before 2 Aug 2026 do not have to be labelled retroactively; labelling them is "encouraged" (primary: Commission quick-facts) [S4].
- The Omnibus also added a ban on AI systems generating non-consensual intimate content and CSAM, applying from 2 Dec 2026 (primary) [S2].

### 2.3 Code of Practice and Commission Guidelines

- The **Code of Practice on Transparency of AI-generated Content** was published in final form on **10 Jun 2026**. It is voluntary and has been assessed as adequate by the Commission and the AI Board (primary) [S31][S32].
  - About 190 signatories by the end of July 2026 (primary) [S32].
  - Section 1 is for providers (marking and detection). Section 2 is for deployers (labelling deep fakes and public-interest text).
  - **Audio-only deep fakes**, Code Section 2, Measure 1.1: "a short audible disclaimer in plain and simple natural language, either in the same language as the content or in English, disclosing the artificial origin of the audio deep fake", placed "**at the beginning of the deep fake itself**".
  - Alternatively, an earcon (a short audio signature) may be used ahead of a common EU audio solution, but only with awareness-raising.
  - For visual content: the EU "AI" icon or an equivalent label.
  - The Code also says labelling "does not exempt" anyone from consent requirements under other laws (primary: Code text) [S31].
- The **Commission Guidelines on Article 50**, C(2026) 5054 final, dated **20 Jul 2026** (primary) [S3]:
  - Deep-fake test (para 113): four cumulative criteria, namely resemblance, existing, persons/objects/places/entities/events, and false appearance of authenticity. "Persons" explicitly includes "personal characteristics or expressions, such as image, **voice**".
  - The assessment is "objective and does not require the intention of the deployer to deceive" (para 114). Audience composition matters (para 115).
  - **Example deep fakes**:
    - "AI-generated audio involving voice cloning of a newspaper podcast's regular presenters ... discussing some news events".
    - "AI-generated video featuring a realistic synthetic avatar of a company CEO congratulating employees".
  - **Example non-deep-fakes**: "AI voice replication for fictional characters (e.g., for audiobooks, games or animation) **when there is no deception as to the identity of the narrators**", and technical audio clean-up "without altering the actual words spoken ... or their way of speaking".
  - Labels must be perceivable by people. Deployers "cannot rely on the machine readable marking" (para 117).
  - **Artistic/creative exception** (para 122): interpreted "strictly". It excludes content "whose nature is exclusively informative or commercial". Where content is both informative and creative, "the informative character should always prevail".
  - Under Art. 50(2), "Synthesis of realistic speech in a specific person's voice" is listed as a semantic change that **requires marking** by the provider (para 92 area). By contrast, "customized neural voices (CNV)" used purely as **assistive technology** for people with disabilities are listed as *not* altering semantics.
  - Personality rights apply on top of Art. 50 (para 129).

### 2.4 Is narrating your own tutorial with your cloned voice a "deep fake"? (Inference: careful reading)

1. **Resemblance and existing person**: yes. A good clone is designed to resemble you, a real person, and the Guidelines name voice explicitly.
2. **"Would falsely appear ... authentic or truthful"**: this is the deciding criterion.
   - Authenticity covers "whether the content is genuinely what it purports to be in terms of its source or creation process (including e.g. the involvement of real human beings ...)" (para 113 iv).
   - A viewer who hears "you" naturally assumes you recorded it. That is a false belief about how the audio was created, even if every word is yours and true.
   - The closest example in the Guidelines, the podcast presenters with cloned voices, is classed as a deep fake. The CEO-avatar example shows that **internal company content is not exempt**.
3. **Exceptions are unlikely to help**:
   - Tutorials are informative, so the creative exception is out (para 122).
   - Monetised or company content is "professional", so Art. 2(10) does not apply (para 19).
   - The human-review exception exists only for text.
4. **Counter-argument**: the "fictional characters ... when there is no deception as to the identity of the narrators" example suggests that if the audience *knows* the narration is synthetic, the criterion falls away. In practice, the way to make sure there is "no deception" is the disclosure itself.
5. **Practical conclusion**: treat cloned-voice tutorials published in the EU (or aimed at EU viewers) as Art. 50(4) deep fakes.
   - Add an audible line at the start (for example "This narration uses an AI-generated version of my voice"), plus a visible note or "AI" icon on video, plus a note in the description.
   - This costs almost nothing and also satisfies YouTube, TikTok, Udemy and the Chinese rules.
   - Whoever deploys the system, you for your channel or your employer for company training, carries the duty.
6. Secondary support: Praxikon (law commentary) states "consent settles the rights, not the transparency" for voice clones (secondary) [S34]. A LinkedIn post by a podcaster with a cloned voice reached the same reading of the Guidelines' podcast example (secondary, anecdotal) [S35].

---

## 3. Platform disclosure rules

| Platform | Rule for a clone of *your own* voice | Source |
|---|---|---|
| **YouTube** | **"Cloning one's own voice to create voice overs or dubs"** is explicitly listed as content creators **don't** need to disclose. Disclosure is required when AI "makes a real person appear to say or do something they didn't do", or for realistic altered events or scenes. YouTube may auto-label content carrying **C2PA metadata**, and such labels cannot be removed. Repeated non-disclosure can lead to removal or suspension from the YouTube Partner Program. | (primary) [S36] |
| **TikTok** | Labelling is **required** for AI-generated content containing "realistic images, **audio**, and video". Labelling is encouraged for content "significantly edited by AI". TikTok auto-labels via C2PA and is testing invisible watermarks. A label cannot be removed after posting. | (primary) [S38][S39] |
| **Udemy** | Quality TTS/AI narration is allowed, but "Udemy does not accept courses that are entirely AI-generated". Disclosure is **mandatory**: the course description must **begin** with "This course contains the use of artificial intelligence." The list of tools that require disclosure includes "Video/audio creation tools that generate artificial video or speech meant to emulate human instruction" and "voice cloning for multi-language versions". | (primary) [S41][S42][S43] |
| **LinkedIn** | "Do not share synthetic or manipulated media that depicts a person saying something they did not say ... without clearly disclosing the fake or altered nature." LinkedIn shows C2PA Content Credentials and offers self-attestation in some countries. | (primary) [S44][S45][S46] |
| **Coursera** | No public instructor rule on disclosing voice clones was found. Coursera itself AI-dubs instructors in their own voice, and learners see a note that the audio was AI-translated. It says it does not use learner or course-video data to train its dubbing models. | (primary, partial) [S47][S48]; instructor policy **unverified** |

**Conflict**: YouTube's "no disclosure needed for your own cloned voice" does **not** remove the EU legal duty under Art. 50(4), which is independent of platform policy. Inference: disclose anyway, either in the audio or video itself or by switching on the "AI use" toggle voluntarily. The Guidelines (para 126) allow deployers to rely on a VLOP's labelling tool to meet Art. 50(4) within that platform [S3].

---

## 4. Vendor terms: ownership, training, retention, commercial rights

Terms change often. Re-check them before relying on any of this.

### ElevenLabs (Terms of Use and Prohibited Use Policy, both "Last Updated: 09 October 2026"; EU terms carry the same date) (primary) [S49][S50][S51][S33]

- **Outputs**: "as between you and ElevenLabs, you retain all rights in and to your Output." The same applies to Input.
- **Commercial use**: "if you access or use our Services free of charge ... you may only use the Services for non-commercial purposes", while paid users "may use the Services for commercial purposes".
- **Licence to ElevenLabs, the key point**: you grant a "**perpetual and irrevocable**", worldwide, royalty-free, sub-licensable licence to use your Content "to improve the Services, and to develop new services and products". This covers "your voice, and other indicia of your persona". The only limit: "we will not commercialize your voice on a standalone basis without your permission." A similar perpetual licence covers **User Voice Models**. The same wording appears in the EU terms.
- **Training opt-out**: Settings → Terms and privacy → Data use → disable "Improve the models for everyone". It applies only going forward and "does not affect any uses ... prior to that date". Enterprise data is not used for training by default (primary help article) [S52].
- **Deletion**: "You may request deletion of your User Voice Models ... through your account." The privacy policy says: "We won't keep data we generate about your voice for longer than 3 years after your last interaction with us, unless the law requires or allows otherwise." Backups are kept up to 30 days after deletion. Zero Retention Mode is Enterprise only (primary) [S33][S53].
- **Prohibited**: "Cloning, synthesizing, or impersonating the voice ... of any living individual without their explicit and informed consent"; impersonating candidates or officials; political campaigning without written consent; fraud; circumventing "Voice CAPTCHA"; removing ElevenLabs watermarks or metadata; voice recordings of anyone under 18 (primary) [S50].

### Microsoft Azure: Personal Voice and Professional Voice (CNV) (primary) [S37][S54][S55][S56]

- **Limited Access**: you need an approved use case and an intake form. Personal Voice is meant for apps that let *their users* clone *their own* voice. The demo is available in Speech Studio and Foundry (classic).
- **Consent**: a recorded verbal statement from the speaker (Microsoft's own script) that "the customer ... will create and use their voice". It is used to check the voice matches the training audio. The Code of Conduct also requires users to record fresh audio inside the app, not pre-existing recordings.
- **Training and ownership**: "A customer's training data is used only to develop that customer's custom voice models and isn't used by Microsoft to train or improve any Microsoft text to speech voice models." "While you maintain the exclusive usage rights to your custom neural voice model, Microsoft may independently retain a copy ... for the sole purpose of protecting the security and integrity". The same applies to personal voice models.
- **Retention**: Personal Voice does not support Bring-Your-Own-Storage; prompt audio can be deleted via the API. Consent statements and voice-talent profile data are kept "for as long as necessary to preserve the security and integrity". Real-time synthesis output is not stored.
- **Watermark**: "Watermarks are added to custom neural voices created with the personal voice feature" and identify Azure synthesis and "which voice was used". Detection is available to eligible customers via mstts@microsoft.com. Microsoft blog: >99.7% average detection accuracy across "various audio editing scenarios" (vendor claim) [S57].

### Google Cloud: Chirp 3 Instant Custom Voice (primary) [S58][S59]

- Allow-listed users only, through sales. Pre-GA. Production use requires a "safety and ethics review".
- Required consent statement: "I am the owner of this voice and I consent to Google using this voice to create a synthetic voice model." Custom scripts are not allowed.
- The output is a **voice cloning key**, a text string "representation of your voice data", which is stored **client-side** and sent with each request. Inference: treat this key like a password, because anyone holding it can make your voice.
- Ownership of outputs, training on your data and retention are governed by the general Google Cloud terms. A clone-specific clause was **unverified** in this pass.

### Resemble AI (primary) [S40][S60]

- Privacy policy: voice data is processed "to deliver that service and for no other purpose. We do not use customer voice data to train general-purpose models". Resemble acts as processor; the business customer is controller. Voice models are treated as Art. 9 data.
- ToS: Resemble "may require consent from the individual ... whose voice is being cloned ... that consent must be verbal". Resemble owns non-identifying "Aggregated Data". Using output to train your own or third-party models or deepfake detectors is prohibited.
- A secondary review says the ToS has **no clause assigning ownership of generated audio to the customer**, and quotes the DPA (17 Mar 2026): voice cloning data deleted "within 30 days of Controller's deletion request" (secondary) [S61]. The CEO's 2024 Senate testimony says "Once the voice is created, the user owns all rights to that voice" (primary testimony, 16 Apr 2024) [S62]. **There is a conflict between the testimony and the current ToS.**

### Fish Audio (primary) [S63][S64][S65]

- ToS (as fetched; "Effective date: August 18, 2024", possibly stale): use is "personal, non-commercial" unless "you are a user of Paid Services". "Usage Data and Content may be used to develop, train, or enhance artificial intelligence or machine learning models". User Submissions are licensed "royalty-free, perpetual, sublicensable, irrevocable". After account deletion, "it may not be possible to completely delete that content".
- The **pricing page shows "Commercial use allowed" on the Free tier**, which **conflicts** with the ToS.
- Open-weights licence (fish-speech, drama-3): commercial use only while annual revenue is below **USD 500,000**. Hosted services need a separate licence. Generating narration for your *own* content is explicitly *not* a Hosted Service.
- Inference: the free tier gives you "public voice slots", so check that your clone is **private**.

### MiniMax (primary) [S66][S67][S68]

- Chinese Audio ToS (更新日期 2025-06-21):
  - "在您与我们之间 ... 输出内容的知识产权及相关权益归属于您" (as between you and MiniMax, IP in outputs belongs to you).
  - You also grant MiniMax a free, worldwide licence to use input and owned output "用于产品和服务的提升和优化、品牌推广和宣传" (for improving products and services, and for brand promotion).
  - The base licence is "非商业的" (non-commercial) unless agreed otherwise.
  - You must label AI output and must not remove MiniMax watermarks.
- English Audio ToS: you keep rights in Input, including "rights of publicity (including voice rights)", and "We may analyze voice characteristics ... but we will not use such data to identify any specific individual."
- Paid-plan commercial rights are described in the Paid Service Terms. The exact commercial clause was **unverified**.

### Cartesia (primary) [S69][S70][S71][S72]

- ToS (as fetched: "Last Revised on June 14, 2024"): "Cartesia does not claim ownership of any of your Inputs ... or any of the Outputs." No commercial use "unless commercial use is expressly permitted by your subscription tier".
- **Training by default**: "Inputs, Outputs, and user interactions ... may be used by Cartesia to train ... Models", under an "irrevocable, perpetual ... transferable, sublicensable" licence. There is an opt-out form, which applies going forward only.
- Zero Data Retention covers TTS/STT only and **"is not available for voice cloning"**, because the samples must be kept. The product page says "Only clone your own voice or a voice you have explicit permission to clone".

**Summary pattern (Inference)**:
- You usually own or keep the outputs.
- The vendor usually gets a broad, often **perpetual and irrevocable**, licence to your recordings for training and product development. This is true for ElevenLabs, Cartesia and Fish by default. Microsoft and Resemble say they do not train on your data.
- Free tiers are usually non-commercial. Fish is the exception, with conflicting statements.
- "Delete my voice" removes the model from your account but **does not undo past training**.

---

## 5. Watermarking and provenance

| Tool | What it is | Notes |
|---|---|---|
| **ElevenLabs AI Speech Classifier** | A legacy ML classifier. Free, no login, analyses the first minute. | It "does not reliably classify audio generated with the Eleven v3 model" and cannot detect other vendors. Documented: "99% precision, 80% recall" on *unmodified* files. The newer **Audio Detector** (sign-in, all plans) first checks for a **SynthID** watermark, then falls back to the classifier (primary) [S73][S74][S75]. |
| **ElevenLabs + SynthID** | Google DeepMind SynthID watermark embedded in ElevenLabs audio. It started with free-tier TTS and is "expand[ing] coverage to all ElevenLabs audio". | Claimed to survive trimming, speed-up, metadata stripping and format conversion. ElevenLabs also supports C2PA (primary vendor blog, date of the blog post unverified) [S76]. |
| **Resemble PerTh** | A neural watermark placed in psychoacoustically masked bands. The API now applies Perth v2 and detects v1, v2 and SynthID. | Vendor: "near-100% recovery" against resampling, re-encoding, noise and time-stretch, and "No watermark is unconditionally unremovable" (primary) [S77][S78]. Independent tests (DeepMark, a competitor, so read with caution): a narrow notch or bandstop filter can push detection to 0%, or cause 100% false positives on clean audio, while keeping PESQ ≈4.29 (secondary) [S79]. |
| **Google SynthID (audio)** | Watermarks Lyria and NotebookLM audio. The SynthID Detector portal was opened to everyone on **7 Oct 2026** and also checks partner content (OpenAI, NVIDIA, Kakao; "soon" Apple). | Claimed to resist noise, MP3 compression and speed change (primary) [S80][S81]. |
| **Meta AudioSeal** | Open source (`facebookresearch/audioseal`). Localised, sample-level watermark with an optional 16-bit message. | Code is MIT. On 2 Apr 2024 the licence was changed to "full MIT license (including the license for the model weights)", so commercial use is OK. v0.2 (12 Dec 2024) added streaming. ICML 2024 paper (primary README) [S82]. |
| **C2PA Content Credentials** | Signed provenance *metadata*, not a watermark. Spec v2.4. | Audio support: WAV/BWF through a RIFF `C2PA` chunk; MP3/FLAC through an ID3v2 GEOB frame `application/c2pa`; M4A through a BMFF uuid box. Ogg Vorbis was added in recent versions (primary spec + secondary summaries) [S83][S84]. **The metadata is easily stripped** by re-encoding, which is why ElevenLabs wants SynthID listed as a C2PA "soft binding" [S76]. YouTube, TikTok and LinkedIn read C2PA. |
| **Azure Personal Voice watermark** | Automatic. Identifies Azure synthesis and the specific voice. | Detection is gated to eligible customers. Vendor claims >99.7% (primary) [S56][S57]. |

**Robustness caveats** (independent research):
- **SoK: How Robust is Audio Watermarking in Generative AI models?** (arXiv:2503.19176, 2025): 9 open-source schemes, 22 attack types / 109 configurations. "None of the surveyed watermarking schemes is robust enough to withstand all tested distortions in practice", and 8 new attacks were "highly effective against all watermarks" (primary paper) [S85].
- **RAW-Bench** (arXiv:2505.19663, INTERSPEECH 2025): "neural compression techniques pose the most significant challenge". None survived the Descript Audio Codec (DAC) attack. AudioSeal was relatively better against Encodec (primary paper) [S86].
- **AudioMarkBench** (arXiv:2406.06979, NeurIPS D&B 2024): removal is possible (for example via EnCodec), white-box forgery is possible, and robustness differs between sexes and languages (primary paper) [S87].
- Inference: watermarks help platforms and courts *attribute* honest content. They do **not** stop a determined impersonator. The Art. 50(4) visible or audible disclosure is still needed.

---

## 6. Security of your voice data

Mostly Inference and best practice, grounded where cited.

- **Why it matters**: modern zero-shot cloners need about **5–90 s** of clean audio (Azure Personal Voice) [S37], or about 10 s (Google, Fish, Cartesia) [S58][S65][S72]. Your raw training set, and above all a clean studio set, is a **ready-made impersonation kit**. So is a portable model artefact: an Azure `speakerProfileId`, a Google voice-cloning key [S58], or a local open-weights fine-tune or speaker embedding.
- **Store**:
  - Keep raw recordings and local model files encrypted at rest (BitLocker/FileVault/LUKS, or an encrypted archive such as age or 7-Zip AES-256). Keep them out of public or shared cloud folders and **out of git repos**.
  - Do not upload "clean voice datasets" to Hugging Face or GitHub.
- **Access**:
  - Use a separate vendor account with strong MFA (passkey or TOTP, not SMS). Treat API keys and voice-cloning keys as secrets (secret manager, rotation).
  - In a company, keep a written list of who may generate audio with the clone. Inference: the employer is the controller and must run a DPIA, given Art. 9 sensitivity.
- **Vendor settings**: opt out of training (ElevenLabs Data use toggle [S52]; Cartesia form [S71]). Keep clones private (Fish public slots). Ask about Zero Retention, which is Enterprise only and not available for cloning at Cartesia [S72].
- **Deletion**:
  - Delete the voice model in the account. Also delete the generation history and the uploaded samples.
  - Then send a GDPR Art. 17 erasure request if needed.
  - Expect backups for up to 30 days (ElevenLabs) [S53]. ElevenLabs keeps "data we generate about your voice" up to 3 years after your last interaction [S33]. Microsoft keeps consent and voice-signature data "as long as necessary" for security [S54].
  - Opt-outs and deletion do **not** reverse past training.
- **Leakage scenario**: a leaked clone or key lets someone call your family, colleagues or bank "as you" (see §7). Reports of large "ElevenLabs breaches" circulating in 2026 on low-quality sites were **not confirmed** by any primary source. ElevenLabs' status page only shows a 15 Oct 2025 support-form abuse incident linked to a wider Zendesk-targeted attack [S88][S89]. **Unverified; do not cite them as fact.**
- **Public footprint**: every published tutorial is itself training data for others. Inference: you cannot prevent third-party cloning from public videos, so focus on authentication hygiene (§7) and a family "safe word".

---

## 7. Voice-biometric bank authentication risk

- **Feb 2023, Vice/Motherboard**: journalist Joseph Cox cloned his own voice with ElevenLabs (free tier, about 5 min of audio). He bypassed **Lloyds Bank "Voice ID"** on phone banking and saw balances and transactions. It failed several times first and worked after tweaks. The system also asked for his date of birth (primary article 23 Feb 2023; secondary coverage) [S90][S91][S92].
- **HSBC UK Voice ID**: still offered (page accessed 2026-10-17). Users enrol by saying "My voice is my password". The page still claims fraudsters "can't replicate your voice" (primary) [S93]. In 2021 HSBC said Voice ID had prevented almost £249M of attempted fraud in a year and had 2.8M users (primary, undated press page) [S94].
- **Barclays "voice security"**: still offered. It builds a voiceprint from recorded calls; "it's free and you can switch it off at any time" (primary) [S95].
- **AWS Amazon Connect Voice ID**: support ended **20 May 2026**. AWS points customers to OTP alternatives (primary) [S96]. Secondary: Microsoft Nuance voice-biometric products were also retired (secondary) [S97].
- **Sam Altman, Federal Reserve conference, 22 Jul 2025** (official Fed transcript): "apparently there are still some financial institutions that will accept a voice print as authentication for you to move a lot of money ... That is a crazy thing to still be doing. AI has fully defeated that." He also said "significant impending fraud crisis" (primary) [S98].
- **FinCEN Alert FIN-2024-Alert004 (13 Nov 2024)**: rise in suspicious-activity reports involving deepfake media "beginning in 2023 and continuing in 2024", used to get around identity verification and authentication. SAR key term "FIN-2024-DEEPFAKEFRAUD" (primary) [S99].
- **FBI IC3 PSA, 15 May 2025 (I-051525-PSA)**: since April 2025, actors used "AI-generated voice messages" (vishing) to impersonate senior US officials. "Do not assume it is authentic" (primary) [S100].
- **Recommendation (Inference)**:
  - Once you publish a cloned voice, or simply a lot of clean audio, **turn off voice-ID at banks, telcos and employer helpdesks** (HSBC, Barclays, Lloyds and others). Use app-based or passkey authentication and phone-banking PINs instead.
  - Agree a **family/team verification phrase** or call-back rule.
  - Tell your company's IT and finance teams that your voice is now easy to synthesise. This matters for CEO-fraud style payment requests.

---

## 8. What is NOT allowed

- **Cloning other people without consent**:
  - Vendors forbid it. ElevenLabs: "without their explicit and informed consent" [S50]. Cartesia, Fish and MiniMax similarly [S70][S65][S67].
  - Azure, Google and Resemble enforce it technically with a recorded consent statement [S55][S58][S60].
  - It can infringe personality rights: LG Berlin II 2025 [S13]; Beijing Internet Court 2024 [S23]; ELVIS Act [S18].
  - It can breach GDPR: no Art. 6 and Art. 9 basis.
  - It may soon be criminal in Germany (draft § 201b StGB, if the content damages reputation and is distributed) [S16].
- **Vendor prohibited-use policy examples** (ElevenLabs, 9 Oct 2026) [S50]: impersonating candidates or officials without authorisation; political campaigning without prior written consent; fraud and scams; fake evidence or testimony; unlawful or unconsented automated calling; voice samples of minors; removing watermarks or provenance; circumventing Voice CAPTCHA. Microsoft forbids unapproved use cases [S37]. MiniMax forbids impersonation and defamation [S67].
- **US robocalls**:
  - The **FCC Declaratory Ruling FCC-24-17** (adopted 2 Feb 2024, released 8 Feb 2024) confirms that AI-generated voices are "artificial or prerecorded voice" under the **TCPA**. Such calls need prior express consent (primary) [S101].
  - Biden-voice New Hampshire robocall (Jan 2024): **FCC $6M forfeiture against Steve Kramer** (FCC-24-104, adopted 26 Sep 2024) [S102]. **Lingo Telecom $1M** consent decree (DA-24-790, 21 Aug 2024) (primary) [S103].
  - In **June 2025** a New Hampshire jury **acquitted** Kramer of the state voter-suppression and impersonation charges. He said he would not pay the FCC fine (secondary: AP via Courthouse News) [S104].
- **Colleagues' voices for company training**:
  - In Germany, employee consent must be **"schriftlich oder elektronisch"** (in writing or electronic), with a text-form notice of purpose and of the right to withdraw. Voluntariness is judged against the dependence inherent in employment, and consent must refer expressly to special-category data, under **§ 26(2)–(3) BDSG** (primary: gesetze-im-internet.de) [S105].
  - German DPAs (DSK Kurzpapier 14) say consent in employment "regelmäßig nicht in Betracht" (is regularly not an option) unless the employee gains a benefit or interests are aligned (primary DSK) [S106].
  - Works-council co-determination (§ 87(1) Nr. 6, § 98 BetrVG) may apply if the LMS tracks completion (secondary) [S107].
  - Consent can be **withdrawn** (Art. 7(3) GDPR). Plan what happens to the clone and the published videos then, and when the person leaves.
  - Microsoft additionally requires "explicit written permission from voice talent" covering "duration, use, and any content limitations" for CNV [S56].
  - Note: a validity question exists over § 26(1) BDSG after the CJEU's C-34/21 judgment (2023). That is not checked here, and it does not affect § 26(2) consent form requirements (**unverified**).
- **Your own voice, but your employer's content**: if the clone is made during work, on company accounts, for company training, the **company** is the deployer under the AI Act and the controller under GDPR. Inference: get a written agreement on scope, duration, deletion when you leave, and who may generate with the clone.

---

## 9. Practical checklist (for the tutorial)

1. **Decide the role**: is this your own channel or course (you are the deployer and controller), or company training (the employer is)? Get it in writing if it's company content.
2. **Pick a vendor with acceptable terms**: paid plan for commercial use; opt out of training on day 1; prefer vendors that don't train on your data (Azure, Resemble) or that offer self-hosting (open weights, with licence limits checked, e.g. Fish < USD 500k revenue).
3. **Read the licence you grant**: ElevenLabs, Cartesia and Fish take perpetual, irrevocable licences to your recordings. Decide whether you accept that.
4. **Record only for this purpose**, in a dedicated session. Do not reuse studio recordings someone else holds rights to (lesson of the Beijing case).
5. **Secure the data**: encrypted storage, no git or public cloud, MFA on the vendor account, treat voice keys and API keys as secrets.
6. **Disclose every time** (EU Art. 50(4), China, TikTok, Udemy, LinkedIn): a short spoken line at the start, plus a visible label (EU "AI" icon) on video, plus a line in the description.
   - Udemy: start the description with "This course contains the use of artificial intelligence."
   - YouTube: optionally switch "AI use" on even though own-voice dubs are exempt in YouTube's policy.
   - Mandarin or China-facing content: spoken notice with "人工智能/AI + 生成/合成", keep metadata labels, use the platform's 声明 function.
7. **Keep provenance**: don't strip vendor watermarks or C2PA. Optionally add your own (AudioSeal is MIT) and sign masters with C2PA.
8. **Never clone anyone else** without explicit, written, purpose-specific consent. For colleagues: § 26 BDSG written consent, check with the works council and DPO, plan for withdrawal and for the person leaving.
9. **Harden your identity**: turn off bank and telco voice-ID, use app or passkey auth, set a family/team safe word, and brief your company's finance and IT teams.
10. **Lifecycle**: when you stop, delete the model, history and samples at the vendor, send an Art. 17 erasure request, delete local copies, and note that past training can't be undone.
11. **Watch the law**: draft § 201b StGB (DE), the NO FAKES Act (US), the GDPR Digital Omnibus, and the Art. 50(2) marking deadline of 2 Dec 2026 (relevant to vendors, not to you).

---

## Key findings (top 10)

1. **EU AI Act Art. 50 has applied since 2 Aug 2026.** The Digital Omnibus (in force 27 Jul 2026) delayed only the **provider** marking duty (Art. 50(2)), to 2 Dec 2026, for systems already on the market. **Deployer deep-fake disclosure (Art. 50(4)) was not delayed.**
2. **A cloned-voice tutorial very likely counts as an Art. 50(4) "deep fake"** (Inference). The Commission Guidelines (20 Jul 2026) list "voice" under persons, classify a cloned-voice podcast and a synthetic CEO avatar for employees as deep fakes, use an objective test, and exclude informative or commercial content from the creative exception. Monetised or company use is "professional". **Consent to clone yourself doesn't remove the disclosure duty.**
3. **How to disclose**: the Code of Practice (final 10 Jun 2026) recommends a **short audible disclaimer at the start** for audio-only content and the "AI" icon for visual content. Machine-readable watermarks alone don't satisfy the deployer duty.
4. **Platforms disagree**: YouTube explicitly says own-voice clones for voiceovers or dubs **don't need disclosure**. TikTok requires labels on realistic AI audio. Udemy requires the exact sentence "This course contains the use of artificial intelligence." at the start of the description and bans fully AI-generated courses.
5. **China** (if Mandarin content goes on Chinese platforms or uses Chinese vendors): since 1 Sep 2025 AI audio needs an explicit label (spoken notice or the "短长 短短" rhythm cue) plus metadata labels, and **users must self-declare** (Art. 10). The 2023 Deep Synthesis rules require separate consent for editing someone's voice.
6. **Personality rights protect AI imitations of a voice**: Beijing Internet Court 23 Apr 2024 (¥250k, and a recording contract ≠ cloning licence) and LG Berlin II 20 Aug 2025 (AI imitation = human imitation; €4,000 licence fee). The Tennessee ELVIS Act has been in force since 1 Jul 2024. The **US NO FAKES Act is not law** (stalled after 30 Sep 2026).
7. **GDPR**: voice is personal data. The EDPB calls it "inherently biometric", and processing it to *identify* someone is Art. 9 special-category data. Treat clone data as sensitive. The proposed Art. 9(2)(l) verification exception is still a proposal.
8. **Vendor licences are broad**: ElevenLabs (terms of 9 Oct 2026) takes a **perpetual, irrevocable** licence to your voice recordings and voice model to improve and build products, though not to "commercialize your voice on a standalone basis". Cartesia and Fish train on content by default. Microsoft and Resemble say they don't train on customer voice data. Free tiers are generally non-commercial (Fish is inconsistent).
9. **Watermarks are useful but breakable**: SynthID (detector open to all since 7 Oct 2026), PerTh, AudioSeal (MIT incl. weights), the Azure Personal Voice watermark, and C2PA metadata (easily stripped). Academic benchmarks (SoK 2025, RAW-Bench 2025) found **no scheme survives all attacks**, and neural codecs are especially damaging.
10. **Voice-ID at banks is defeated**: the Lloyds bypass (Feb 2023), Altman's warning at the Fed (22 Jul 2025), FinCEN (Nov 2024) and the FBI (May 2025). HSBC and Barclays still offer voice ID, and Barclays lets you switch it off. **Turn off voice-ID once your clone exists, and protect samples and voice keys like passwords.**

---

## Conflicts & uncertainties

- **YouTube vs EU law**: YouTube exempts own-voice clones from disclosure, while the EU Guidelines' reading suggests Art. 50(4) disclosure is required. The legal duty prevails. The platform rule only governs YouTube enforcement.
- **"Deep fake" for your own voice**: the Guidelines have no example of a person cloning *themselves* to read their *own* script. The fictional-narrator example ("no deception as to the identity of the narrators") cuts the other way. My conclusion is Inference; there is no court or authority decision yet.
- **Resemble ownership**: the CEO's 2024 Senate testimony says "the user owns all rights to that voice", but the current ToS has no output-ownership clause (per a secondary review; not independently confirmed clause by clause).
- **Fish Audio**: the ToS says free = non-commercial, the pricing page says Free = "Commercial use allowed". The ToS fetched shows "Effective date: August 18, 2024" and may be stale.
- **Cartesia**: the ToS fetched shows "Last Revised on June 14, 2024". Plan-level commercial rights are on the pricing page, which I did not check.
- **MiniMax**: the Chinese ToS (2025-06-21) gives you output IP but a non-commercial base licence. The paid-plan commercial clause was not confirmed.
- **Google Chirp 3 Instant Custom Voice**: clone-specific data-use, retention and ownership terms were not found (general GCP terms apply). **Unverified.**
- **Coursera**: no instructor-facing disclosure rule for voice clones was found. **Unverified.**
- **NO FAKES Act details** ("70 years post-mortem", "$750k per work") come from secondary press, not checked in the bill text.
- **Draft § 201b StGB** may change in the Bundestag. It currently targets *reputation-damaging* deep fakes, not ordinary disclosed tutorials.
- **GDPR "biometric" status of a TTS voice model** (synthesis rather than identification) is unsettled. Vendors differ (Resemble: Art. 9; others: silent).
- **§ 26(1) BDSG** validity after CJEU C-34/21 was not checked here.
- **Watermark robustness claims** (Azure >99.7%, PerTh near-100%) are vendor claims. The critical PerTh tests come from a competitor (DeepMark). The academic papers support the general fragility conclusion.
- **Alleged 2026 ElevenLabs breach stories** on low-quality sites look unreliable and were not confirmed by any primary source. Excluded.
- The **Lloyds Voice ID** current status (whether it is still offered in 2026) was **not checked**.

---

## Sources

All accessed 2026-10-17.

1. [S1] EU AI Act Art. 50 text (mirror of Reg. (EU) 2024/1689) — https://artificialintelligenceact.eu/article/50/
2. [S2] AI Act Service Desk, "When does enforcement start?" — https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/when-does-enforcement-start
3. [S3] Commission Guidelines on Art. 50, C(2026) 5054 final, 20 Jul 2026 — https://ai-act-service-desk.ec.europa.eu/sites/default/files/2026-07/guidelines_on_the_implementation_of_the_transparency_obligations_for_certain_ai_systems_under_article_50_of_the_ai_act_bzptwqhk0ikg1dtlddap41psfy_131215.pdf
4. [S4] Commission, Quick Facts: Transparency rules — https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems
5. [S5] EDPB Guidelines 02/2021 on virtual voice assistants v2.0 (7 Jul 2021) — https://www.edpb.europa.eu/system/files/2021-07/edpb_guidelines_202102_on_vva_v2.0_adopted_en.pdf
6. [S6] GDPR Art. 9 (gdpr-info.eu mirror) — https://gdpr-info.eu/art-9-gdpr/
7. [S7] GDPR Recital 51 — https://gdpr-info.eu/recitals/no-51/
8. [S8] EUTechReg tracker, Digital Omnibus Art. 9 GDPR (ST 13886/26) (secondary) — https://research.eutechreg.com/trackers/digital-omnibus/dated-provisions/st-13886-2026.regulation-eu-2016-679.article-9/
9. [S9] Council doc ST-10729-2026-INIT — https://data.consilium.europa.eu/doc/document/ST-10729-2026-INIT/en/pdf
10. [S10] EDPB-EDPS Joint Opinion on Digital Omnibus (Feb 2026) — https://www.edpb.europa.eu/system/files/documents/2026-02/edpb_edps_jointopinion_202602_digitalomnibus_en.pdf
11. [S11] dejure.org, OLG Hamburg 3 W 45/89 — https://dejure.org/dienste/vernetzung/rechtsprechung?Aktenzeichen=3+W+45%2F89&Datum=08.05.1989&Gericht=OLG+Hamburg
12. [S12] LHR Rechtsanwälte, "Recht an der eigenen Stimme" (secondary) — https://www.lhr-law.de/thema/medienrecht-persoenlichkeitsrecht/recht-an-der-eigenen-stimme/
13. [S13] LTO, LG Berlin II 2 O 202/24 (secondary) — https://www.lto.de/recht/nachrichten/n/2o20224-lg-berlin-ii-manfred-lehmann-synchronsprecher-bruce-willis-recht-an-eigener-stimme
14. [S14] aufrecht.de, LG Berlin II 2 O 202/24 (secondary) — https://www.aufrecht.de/urteile/medienrecht-presserecht/urteile-2024-und-2025/ki-stimmen-immitation-und-das-persoehnlichkeitsrecht-lg-berlin-4-zivilkammer-urteil-vom-2082025-az-2-o-202/24
15. [S15] BMJV press release, 7 Oct 2026 — https://www.bmjv.de/SharedDocs/Pressemitteilungen/DE/2026/1007_Digitale_Gewalt.html
16. [S16] Draft law text (criminal part) incl. § 201b StGB-E — https://assets.ctfassets.net/mj324dykhxwi/7A07FyueaCF0nUTUplZ0Nq/62edfc61875ad0fc90269f31d309b3f8/Entwurf_eines_Gesetzes_zur_Sta%C3%8C_rkung_des_zivilrechtlichen_und_strafrechtlichen_Schutzes_vor_digitaler_Gewalt_-strafrechtlic.pdf
17. [S17] Bundesrat, Drs. 590/26 — https://www.bundesrat.de/SharedDocs/beratungsvorgaenge/2026/0501-0600/0590-26.html
18. [S18] Tennessee Public Chapter 588 (ELVIS Act) — https://publications.tnsosfiles.com/acts/113/pub/pc0588.pdf
19. [S19] Congress.gov S.4591 — https://www.congress.gov/bill/119th-congress/senate-bill/4591
20. [S20] Congress.gov H.R.8915 — https://www.congress.gov/bill/119th-congress/house-bill/8915
21. [S21] POLITICO, 30 Sep 2026 (secondary) — https://www.politico.com/live-updates/2026/09/30/congress/cruz-says-no-to-no-fakes-act-01100986
22. [S22] RBR, 9 Oct 2026 (secondary) — https://rbr.com/cruz-control-senator-delays-no-fakes-act-vote-on-concerns/
23. [S23] Beijing Internet Court (English), 24 Apr 2024 — https://english.bjinternetcourt.gov.cn/2024-04/24/c_706.htm
24. [S24] Shandong court, reference case 殷某桢 — https://www.sdcourt.gov.cn/wfzy/442541/442474/38014448/index.html
25. [S25] WIPO Lex summary — https://www.wipo.int/wipolex/zh/text/596035
26. [S26] 互联网信息服务深度合成管理规定 (gov.cn) — https://www.gov.cn/zhengce/zhengceku/2022-12/12/content_5731431.htm
27. [S27] 人工智能生成合成内容标识办法 (CAC) — https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm
28. [S28] Draft national standard 网络安全技术 人工智能生成合成内容标识方法 (secondary host) — https://maruyama-mitsuhiko.cocolog-nifty.com/security/files/20_wd_2024002646_e7bd91e7bb9ce5ae89e585a8e68a80e69caf20e4babae5b7a5e699bae883bde7949fe68890e59088e68890e58685e5aeb9e6a087e8af86e696b9.pdf
29. [S29] EP Legislative Train, Digital Omnibus on AI — https://www.europarl.europa.eu/legislative-train/theme-internal-market-and-consumer-protection-imco/file-digital-omnibus-on-ai
30. [S30] Commission FAQ, Transparency obligations under Art. 50 — https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act
31. [S31] Code of Practice on Transparency of AI-Generated Content (final text, hosted copy) — https://www.medianama.com/wp-content/uploads/2026/06/CoP_Transparency_of_AI_generated_content_jtHnEivPctLZtkoRFQrkbStffUY_129555-1.pdf ; official page: https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content
32. [S32] Commission, "Strong backing for the Code" — https://digital-strategy.ec.europa.eu/en/news/strong-backing-code-practice-transparency-ai-generated-content
33. [S33] ElevenLabs Privacy Policy — https://elevenlabs.io/privacy-policy
34. [S34] Praxikon, "AI voice clones under Article 50" (secondary) — https://www.praxikon.com/en/posts/ai-voice-clones-article-50-transparency
35. [S35] LinkedIn post, R. Schaffner (secondary, anecdotal) — https://www.linkedin.com/posts/robertschaffner_upps-eu-ai-act-article-50-applies-to-me-activity-7492475440138403840-OFCp
36. [S36] YouTube Help, Disclosing use of GenAI content — https://support.google.com/youtube/answer/14328491?hl=en
37. [S37] Microsoft Learn, What is personal voice? — https://learn.microsoft.com/en-us/azure/ai-services/speech-service/personal-voice-overview
38. [S38] TikTok Support, AI-generated content — https://support.tiktok.com/en/using-tiktok/creating-videos/ai-generated-content
39. [S39] TikTok, AI-generated content page — https://www.tiktok.com/tns-inapp/pages/ai-generated-content
40. [S40] Resemble AI Privacy Policy — https://www.resemble.ai/privacy-policy
41. [S41] Udemy, Course Quality Checklist: Use of AI — https://support.udemy.com/hc/en-us/articles/30999984483607-Course-Quality-Checklist-Use-of-AI
42. [S42] Udemy, Course description rules — https://support.udemy.com/hc/en-us/articles/33490280024087-Course-description-Rules-and-guidelines
43. [S43] Udemy, Audio Standards — https://support.udemy.com/hc/en-us/articles/229232367-Audio-Standards
44. [S44] LinkedIn Professional Community Policies — https://www.linkedin.com/legal/professional-community-policies
45. [S45] LinkedIn Help, False or misleading content — https://www.linkedin.com/help/linkedin/answer/a1340752
46. [S46] LinkedIn Help, Content credentials — https://www.linkedin.com/help/linkedin/answer/a6282984
47. [S47] Coursera, AI-dubbed courses — https://www.coursera.org/explore/ai-dubbed-courses
48. [S48] Coursera Support, 视频翻译 — https://www.coursera.support/s/article/learner-000001502?language=zh_CN
49. [S49] ElevenLabs Terms of Use (9 Oct 2026) — https://elevenlabs.io/terms-of-use
50. [S50] ElevenLabs Prohibited Use Policy (9 Oct 2026) — https://elevenlabs.io/use-policy
51. [S51] ElevenLabs Terms of Use EU (9 Oct 2026) — https://elevenlabs.io/terms-of-use-eu
52. [S52] ElevenLabs Help, Is my data used to improve models? — https://help.elevenlabs.io/hc/en-us/articles/29952728805393-Is-my-data-used-to-improve-ElevenLabs-AI-models
53. [S53] ElevenLabs Docs, Zero Retention Mode — https://elevenlabs.io/docs/eleven-api/resources/zero-retention-mode.mdx
54. [S54] Microsoft Learn, Data, privacy, and security for text to speech — https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/speech-service/text-to-speech/data-privacy-security
55. [S55] Microsoft Learn, Add user consent for personal voice — https://learn.microsoft.com/en-us/azure/ai-services/speech-service/personal-voice-create-consent ; Code of Conduct: https://learn.microsoft.com/en-us/legal/ai-code-of-conduct
56. [S56] Microsoft Learn, Text to speech transparency note — https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/speech-service/text-to-speech/transparency-note
57. [S57] Microsoft Tech Community, Create personalized voices — https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/create-personalized-voices-with-azure-ai-speech/4147073
58. [S58] Google Cloud, Chirp 3 Instant Custom Voice — https://docs.cloud.google.com/text-to-speech/docs/chirp3-instant-custom-voice
59. [S59] Google Cloud, Chirp Voice Cloning (consent) — https://cloud.google.com/text-to-speech/brand-voices/chirp-voice-cloning/docs
60. [S60] Resemble AI Terms of Service — https://www.resemble.ai/terms-of-service
61. [S61] bestaivoicegenerator.com, Resemble review (secondary) — https://bestaivoicegenerator.com/reviews/resemble-ai
62. [S62] Zohaib Ahmed Senate testimony, 16 Apr 2024 — https://www.judiciary.senate.gov/imo/media/doc/2024-04-16_pm_-_testimony_-_ahmed.pdf
63. [S63] Fish Audio Terms — https://fish.audio/terms/
64. [S64] Fish Audio pricing — https://fish.audio/plan/
65. [S65] Fish Speech LICENSE — https://raw.githubusercontent.com/fishaudio/fish-speech/main/LICENSE ; voice-clone page: https://fish.audio/voice-clone/
66. [S66] MiniMax 语音 用户协议 (CN, 2025-06-21) — https://www.minimax.cn/audio/doc/terms-of-service.html
67. [S67] MiniMax Audio terms (EN) — https://www.minimax.io/audio/doc/terms-of-service-music.html
68. [S68] MiniMax Audio Paid Service Terms — https://www.minimax.io/audio/doc/paid-service-terms.html
69. [S69] Cartesia Terms of Service — https://www.cartesia.ai/legal/terms
70. [S70] Cartesia Voice Cloning page — https://www.cartesia.ai/product/voice-cloning
71. [S71] Cartesia Privacy Policy — https://www.cartesia.ai/legal/privacy
72. [S72] Cartesia Zero Data Retention docs — https://docs.cartesia.ai/enterprise/zero-data-retention ; DPA: https://www.cartesia.ai/legal/dpa
73. [S73] ElevenLabs AI Speech Classifier — https://elevenlabs.io/ai-speech-classifier
74. [S74] ElevenLabs Docs, Audio detector — https://elevenlabs.io/docs/eleven-creative/audio-tools/audio-detector.md
75. [S75] ElevenLabs Help, Classifier vs Audio Detector — https://help.elevenlabs.io/hc/en-us/articles/48099674184465-What-is-the-difference-between-the-ElevenLabs-AI-Speech-Classifier-and-the-new-Audio-Detector-tool
76. [S76] ElevenLabs blog, SynthID — https://elevenlabs.io/blog/synthid
77. [S77] Resemble, PerTh model page — https://www.resemble.ai/learn/models/perth
78. [S78] Resemble Docs, Watermarking — https://docs.resemble.ai/detect/watermark.mdx
79. [S79] DeepMark, "DeepMark vs PerTh" (secondary, competitor) — https://www.deepmark.me/blog/deepmark-vs-perth-which-audio-watermark-actually-holds-up
80. [S80] Google DeepMind, SynthID — https://deepmind.google/models/synthid/
81. [S81] Google blog, SynthID Detector expansion, 7 Oct 2026 — https://blog.google/innovation-and-ai/models-and-research/google-deepmind/synth-id-ai-content/
82. [S82] Meta AudioSeal README — https://raw.githubusercontent.com/facebookresearch/audioseal/main/README.md ; repo: https://github.com/facebookresearch/audioseal
83. [S83] C2PA Technical Specification 2.4 — https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html
84. [S84] GAGE Content Provenance Checker (secondary summary of spec) — https://www.gage.academy/tools/content-provenance-checker
85. [S85] SoK: How Robust is Audio Watermarking (arXiv:2503.19176) — https://arxiv.org/abs/2503.19176
86. [S86] RAW-Bench (arXiv:2505.19663) — https://arxiv.org/abs/2505.19663
87. [S87] AudioMarkBench (arXiv:2406.06979) — https://arxiv.org/abs/2406.06979
88. [S88] ElevenLabs status incident, 15 Oct 2025 — https://status.elevenlabs.io/incidents/01K7JSKWFPNWNFSR4P1NGV0TZF
89. [S89] brieflyglobal.com "ElevenLabs TTS breach" (secondary, unreliable, cited only to flag it) — https://brieflyglobal.com/ai/elevenlabs-tts-breach-voice-clone-weaponized
90. [S90] Vice, "How I Broke Into a Bank Account With an AI-Generated Voice", 23 Feb 2023 — https://www.vice.com/en/article/how-i-broke-into-a-bank-account-with-an-ai-generated-voice/
91. [S91] Biometric Update, Feb 2023 (secondary) — https://www.biometricupdate.com/202302/journalist-uses-ai-voice-to-break-into-own-bank-account
92. [S92] Malwarebytes, 1 Mar 2023 (secondary) — https://www.malwarebytes.com/blog/news/2023/03/ai-generated-voice-recording-grants-access-to-telephone-banking
93. [S93] HSBC UK, Telephone banking / Voice ID — https://www.hsbc.co.uk/ways-to-bank/phone-banking/
94. [S94] HSBC UK, Voice ID prevents £249 million — https://www.about.hsbc.co.uk/news-and-media/hsbc-uks-voice-id-prevents-gbp249-million-of-attempted-fraud
95. [S95] Barclays, accessibility / voice security — https://www.barclays.co.uk/ways-to-bank/other-ways-to-get-in-touch/
96. [S96] AWS, Amazon Connect Customer Voice ID end of support — https://docs.aws.amazon.com/connect/latest/adminguide/amazonconnect-voiceid-end-of-support.html
97. [S97] Security Journal UK (secondary) — https://securityjournaluk.com/critical-gap-biometric-security-uk-banks/
98. [S98] Federal Reserve transcript, Bowman–Altman fireside chat, 22 Jul 2025 — https://www.federalreserve.gov/mediacenter/files/capital-framework-conference-fireside-chat-transcript.pdf
99. [S99] FinCEN FIN-2024-Alert004, 13 Nov 2024 — https://www.fincen.gov/system/files/shared/FinCEN-Alert-DeepFakes-Alert508FINAL.pdf
100. [S100] FBI IC3 PSA, 15 May 2025 — https://www.ic3.gov/PSA/2025/PSA250515
101. [S101] FCC Declaratory Ruling FCC-24-17 — https://www.fcc.gov/document/fcc-confirms-tcpa-applies-ai-technologies-generate-human-voices
102. [S102] FCC Forfeiture Order, Steve Kramer, FCC-24-104 — https://www.fcc.gov/document/fcc-issues-6m-fine-nh-robocalls
103. [S103] FCC Consent Decree, Lingo Telecom, DA-24-790 — https://www.fcc.gov/document/fcc-eb-settles-lingo-transmitting-illegal-robocalls
104. [S104] Courthouse News (AP), Kramer acquittal, Jun 2025 (secondary) — https://www.courthousenews.com/new-hampshire-jury-acquits-consultant-behind-ai-robocalls-mimicking-biden-on-all-charges/
105. [S105] § 26 BDSG — https://www.gesetze-im-internet.de/bdsg_2018/__26.html
106. [S106] DSK Kurzpapier Nr. 14 Beschäftigtendatenschutz — https://www.datenschutz-berlin.de/fileadmin/user_upload/pdf/publikationen/DSK/kurzpapiere/DSK_KPNr_14_Beschaeftigtendatenschutz.pdf
107. [S107] aidentical.de, KI-Avatare im Personalbereich (secondary) — https://aidentical.de/ki-avatare-anwendungsgebiete/ki-avatare-im-hr-personalwesen/
