import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Portrait, embedded directly so the page needs no image hosting.
   To swap it: replace this whole string with a URL, e.g.
   const PORTRAIT = "https://res.cloudinary.com/.../photo.jpg";
   ------------------------------------------------------------------ */
/* ------------------------------------------------------------------
   IMAGES — these are low-resolution previews, deliberately small so the
   page stays light enough to load. The full-quality versions are in
   portfolio-images.zip.

   To use them properly: upload the files to Cloudinary / ImageKit (both
   free), then replace each long "data:image/webp;base64,..." string below
   with its URL. Nothing else needs to change. For example:

     const IK_HERO = "https://res.cloudinary.com/you/ikigai-hero-logo.jpg";

   These constants MUST stay above PROJECTS.
   ------------------------------------------------------------------ */
const PORTRAIT = "assets/nidhi-portrait.jpg";

/* Carlsbad Caverns card image, embedded. Replace with a URL to host it
   externally, e.g. const CARLSBAD = "https://.../mockup.jpg"; */
const CARLSBAD = "assets/carlsbad-hero.jpg";


/* That Ikigai Project — image slots, waiting on files.
   Each one shows a placeholder until it has a value. */
const IK_HERO = "assets/ikigai-hero.jpg"; // hero — the logo box, widened on its own red
const IK_LOGO_BW = "assets/ikigai-logo-bw.jpg"; // final logo, black & white
const IK_LOGO_C = "assets/ikigai-logo-colour.jpg"; // final logo, colour
const IK_OLD = "assets/ikigai-oldlogo.png"; // previous logo
const IK_BOARD = "assets/ikigai-moodboard.jpg"; // mood board — full, uncropped
const IK_SKETCH = "assets/ikigai-sketches.jpg"; // logo sketches — ground whitened so they stand out
const IK_APRON = "assets/ikigai-apron.png"; // apron
const IK_CARDS = "assets/ikigai-cards.png"; // business cards
const IK_ST1 = "assets/ikigai-sticker1.png"; // stickers — logo & fragile
const IK_ST2 = "assets/ikigai-sticker2.png"; // stickers — happy sips & QR
const IK_ST3 = "assets/ikigai-sticker3.png"; // stickers — hollow inside

/* ------------------------------------------------------------------
   HERO IMAGES — one per project, still to come. Each shows the
   placeholder graphic until it has a value; drop in a path like
   "Class Pulse/classpulse-hero.jpg" and nothing else needs to change.

   A note on the card colour that sits behind each one: it should CONTRAST
   with the hero, not match it. That Ikigai Project was red-on-red and the
   card and image dissolved into each other, so its colour is now the sage
   from the sticker range instead. Pick the project's secondary colour, not
   the one that dominates the image.
   ------------------------------------------------------------------ */
const HERO_CLASSPULSE = "assets/classpulse-hero.jpg";
const HERO_MOHA       = "assets/moha-hero.jpg";
const HERO_WHYAXIS    = "assets/whyaxis-hero.jpg";
const HERO_MOTION     = "assets/motion-hero.jpg";
const HERO_CROCHET    = "assets/crochet-hero.jpg";
const HERO_PAINTING   = "assets/painting-hero.jpg";

/* ClassPulse — local files, paths relative to the page.
   The recordings were remuxed from .mov to .mp4 so they play outside Safari. */
const CP_JOURNEY  = "assets/classpulse-userjourney.jpg";
const CP_PRINCIPLES = "assets/classpulse-principles.jpg";
const CP_CHECKIN  = "Class Pulse/classpulse-checkins.mp4";
const CP_JOURNAL  = "Class Pulse/classpulse-journal.mp4";
const CP_TRACK    = "Class Pulse/classpulse-trackengagement.mp4";
const CP_FORUM    = "Class Pulse/classpulse-forums.mp4";

/* MOHA — local files. The artist clip runs on through personalising the
   merchandise, so it covers flow steps 2 and 3 between them. */
const MO_BOARD   = "assets/moha-moodboard.jpg";
const MO_LANDING = "MOHA/moha-landingpage.mp4";
const MO_MERCH   = "MOHA/moha-artisitandmerch.mp4";
const MO_CHECKOUT = "MOHA/moha-checkout.mp4";

/* Archive Fever */
const AF_HERO = "assets/archivefever-hero.jpg";
const AF_YELLOW = "assets/archivefever-yellowposter.jpg";
const AF_YELLOW_B = "assets/archivefever-yellowposterback.jpg";
const AF_MINT = "assets/archivefever-mintposter.jpg";
const AF_MINT_B = "assets/archivefever-mintposterback.jpg";
const AF_PURPLE = "assets/archivefever-purpleposter.jpg";
const AF_PURPLE_B = "assets/archivefever-purpleposterback.jpg";
const AF_TOTE_F = "assets/archivefever-totebagfront.jpg";
const AF_TOTE_B = "assets/archivefever-totebagback.jpg";
const AF_TSHIRT = "assets/archivefever-tshirt.jpg";
const AF_STICKER = "assets/archivefever-sticker.jpg";
const AF_LABELS = "assets/archivefever-lables.jpg";

/* Why Axis */
const WA_AMAZON1 = "assets/whyaxis-nuessentialsamazon1.jpg";
const WA_AMAZON2 = "assets/whyaxis-nuessentialsamazon2.jpg";
const WA_INSTA = "assets/whyaxis-nuessentialsinstagram.jpg";
const WA_BLUESTONE = "assets/whyaxis-bluestone.jpg";

/* Motion & animation — the Sundae folder */
const MOT_SUNDAE = "Sundae/aftereffectsexperimentation-sundae.mp4";
const MOT_INFO = "Sundae/aftereffectsexperimentation-dynamicinfographics.mp4";

/* Crochet */
const CR = [
  "assets/crochet-purplevest1.jpg", "assets/crochet-purplevest3.jpg",
  "assets/crochet-pinksleeves1.jpg", "assets/crochet-pinksleeves2.jpg",
  "assets/crochet-pinksleeves3.jpg", "assets/crochet-pinksleeves4.jpg",
  "assets/crochet-blueandwhitestripesweater1.jpg", "assets/crochet-blueandwhitestripesweater2.jpg",
  "assets/crochet-blueandwhitestripesweater3.jpg",
  "assets/crochet-shoulderbag.jpg", "assets/crochet-keychains.jpg",
  "Crochet/bluestraplesstop.mp4", "Crochet/grannysquaretop.mp4",
  "Crochet/fronttievest.mp4", "Crochet/laptopcover.mp4",
  "Crochet/purplevest2.mp4", "Crochet/purplevest4.mp4",
];

/* ==================================================================
   EDIT THIS BLOCK ONLY
   ================================================================== */

const YOUR_NAME = "Nidhi Joseph";
const EMAIL = "nidhijoseph09@gmail.com";
const LOCATION = "Based in Melbourne";
const RESUME_URL = "#"; // paste a link to your CV (Google Drive, PDF, etc.)

// Hero background. Leave empty for the animated fallback.
const HERO_VIDEO = "";

// The three giant lines.
const BIG_LINES = ["A visual", "communication &", "interaction designer"];

// About section — heading sits left, copy sits right.
const ABOUT = [
  "Hi, I'm Nidhi, a designer based in Melbourne. Originally from India and raised in Abu Dhabi, growing up between different cultures has shaped the way I see the world and influences how I approach design.",
  "I recently completed my Master of Design at Monash University, specialising in Interaction Design, after previously studying Visual Communication. I enjoy creating thoughtful, user-focused experiences that combine creativity with problem-solving, whether through branding, digital products, or visual communication.",
  "I've always been drawn to art and making things. From drawing and crafting as a kid to crocheting today, creating has always been a big part of who I am. That same curiosity and attention to detail continue to inspire the way I design and approach new challenges.",
];

const STRENGTHS = ["Time management", "Creative problem solving", "Communication", "Team collaboration", "Attention to detail"];

// Resume section. Edit freely.
const RESUME = {
  experience: [
    { role: "Graphic Designer", org: "Why Axis, Bangalore", year: "2024",
      note: "Designed Amazon content and social media posts for Nuessentials Skincare, and developed weekly promotional designs for Bluestone Jewellery to support ongoing campaigns." },
    { role: "Customer Service & Operations Assistant", org: "Flexiflo Corporation, Jebel Ali", year: "2023",
      note: "Managed customer follow-ups and issue resolution while supporting operations through invoicing, stock control, and assisting with a smooth software system rollout." },
    { role: "Customer Relations & Quality Control", org: "Kaddas Oil Fields, Abu Dhabi", year: "2023",
      note: "Maintained client relationships through satisfaction checks and communication, supported quality control processes, and contributed to branding by designing brochures and business cards." },
    { role: "Intern", org: "Foley Designs, Bangalore", year: "2022",
      note: "Assisted in designing an installation for the Indian Music Experience Museum and contributed to merchandise design for the museum gift shop, enhancing visitor engagement." },
  ],
  partTime: [
    { role: "Barista / Service Crew Member", org: "Cha Cha Hawthorn, Melbourne", year: "2025",
      note: "Managed customer orders and prepared beverages in a high-volume setting, maintaining efficiency and accuracy during peak hours." },
    { role: "Customer Service", org: "Shegan, Bangalore", year: "2022",
      note: "Delivered customer service in a fast-paced environment, using feedback to improve service consistency and coordinating with staff to maintain standards." },
  ],
  volunteering: [
    { role: "Saturday in Design Volunteer", org: "Melbourne", year: "2025",
      note: "Guided attendees between exhibition venues and supported event operations while engaging with designers and industry professionals." },
    { role: "Film Club Activities Coordinator", org: "American University of Sharjah", year: "2023",
      note: "Planned and executed monthly events and campus-wide programs to increase student engagement." },
    { role: "TEDx Decor Co-Head", org: "The Lawrence School, Lovedale", year: "2019",
      note: "Designed and coordinated event décor to create a cohesive and engaging visual experience." },
    { role: "Media Club Coordinator", org: "The Lawrence School, Lovedale", year: "2019",
      note: "Supported event organization and contributed to yearbook and student film production." },
  ],
  education: [
    { role: "Master of Design, Specialising in Interaction Design", org: "Monash University", year: "2024 – 2026" },
    { role: "Bachelor of Science in Visual Communication", org: "American University of Sharjah", year: "2019 – 2023" },
  ],
  certifications: [
    { role: "Responsible Service of Alcohol Certificate", org: "", year: "Sep 2024" },
    { role: "Certificate in Leading with Finance", org: "Harvard Business School Online", year: "Sep 2023" },
  ],
  skills: ["Graphic design", "Advertising design", "Brand identity", "Digital content design", "User-centred design", "Customer relations"],
  software: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Adobe After Effects", "Figma"],
};

// The rolling line.
const ROTATING = [
  "user-centred design",
  "immersive storytelling",
  "brand-focused digital content",
  "creative problem solving",
];

const PROJECTS = [
  {
    title: "ClassPulse",
    category: "UX/UI design",
    year: "2026",
    color: "#5FDCEF",
    ink: "#04252C",
    image: HERO_CLASSPULSE,
    detail: {
      tools: "Figma",
      skills: "UX Research, UI/UX Design, Interaction Design, Prototyping, User Testing",
      team: "Madhav Mohan Jolly, Zheng Wang",
      headline: "A student engagement platform designed to help students recognise their learning patterns and stay connected throughout the semester.",
      challenge: [
        "University learning management systems are effective at organising coursework, deadlines, and resources, but they often focus on what has already happened rather than helping students understand their engagement in the moment.",
        "Student disengagement can happen gradually and silently. By the time attendance or academic performance shows a problem, opportunities to intervene may have already passed. Our challenge was to explore how engagement could be made more visible and actionable for both students and educators, without turning it into another task for students to manage.",
      ],
      approach: [
        "We designed ClassPulse as a lightweight engagement layer that works alongside existing university systems rather than replacing them.",
        "The experience was built around a continuous feedback loop: students check in after class, reflect on their experience, view their engagement patterns, and communicate through an anonymous forum. Educators can use the resulting engagement information to identify broader patterns and potential areas of concern.",
        "The interface was designed around short interactions and clear visual feedback, reducing the effort required to participate while keeping the experience useful throughout the semester.",
      ],
      research: {
        label: "Research & insights",
        body: [
          "To understand how engagement breaks down throughout a semester, we conducted student interviews, surveys, and secondary research exploring learning behaviour, workload, and engagement patterns.",
          "Our research showed that students were already using multiple tools to manage their university experience, while existing learning management systems provided limited insight into how they were actually engaging with their learning.",
        ],
        stats: [
          { value: "10/13", label: "Students use external tools to stay organised." },
          { value: "80%", label: "Of students attend classes but miss at least one class within the first three weeks." },
        ],
        insight: "Engagement can begin to drop early, but existing systems often only make these patterns visible after the problem has already developed.",
      },
      /* Condensed: each need is a claim and the answer to it, nothing more. */
      needs: {
        label: "Needs",
        groups: [
          {
            title: "Students",
            items: [
              { title: "One place, not five",
                answer: "Engagement, reflection, and academic information brought together." },
              { title: "Visibility with a personal payoff",
                answer: "Transparent feedback that shows students their own patterns." },
              { title: "Low-friction support",
                answer: "Simple ways to reflect and ask for help before engagement drops." },
            ],
          },
          {
            title: "Educators",
            items: [
              { title: "Earlier signals",
                answer: "Indicators of changing engagement while there is still time to act." },
              { title: "No manual tracking",
                answer: "Patterns surfaced from data, without extra administrative work." },
              { title: "Measurable outcomes",
                answer: "A system that makes engagement easier to understand and evaluate." },
            ],
          },
        ],
        combined: {
          title: "Combined user & client need",
          body: [
            "Both sides need a clearer view of engagement, from opposite ends: students to manage their own learning, educators to spot patterns early. That pointed to one feedback system serving both.",
          ],
        },
        image: CP_PRINCIPLES,
        caption: "The principles that framed the solution: participation over detachment, guidance over surveillance.",
      },
      solution: {
        label: "The solution",
        body: [
          "Four connected features carry the loop, each designed to be finished in a moment rather than added to a student's workload.",
        ],
        image: CP_JOURNEY,
        caption: "A continuous feedback loop that helps students stay engaged, enables early support, and improves learning outcomes for all.",
        items: [
          { n: 1, kicker: "Reflect", title: "Post-class check-in", src: CP_CHECKIN,
            body: "A quick check-in gives students an opportunity to reflect on how they experienced a class while it is still fresh. The interaction is intentionally short to make regular participation realistic." },
          { n: 2, kicker: "Record", title: "Journal", src: CP_JOURNAL,
            body: "Everything logged in the check-in collects here: the notes, images and reflections attached to each class, building a personal record of the semester a student can look back through." },
          { n: 3, kicker: "See the pattern", title: "Track engagement", src: CP_TRACK,
            body: "Students can view their attendance and participation patterns, making their engagement more visible. Educators can also identify broader patterns that may indicate a need for support." },
          { n: 4, kicker: "Ask freely", title: "Anonymous forum", src: CP_FORUM,
            body: "Students can ask questions and participate without attaching their identity to the discussion, creating a lower-pressure space for communication." },
        ],
      },
      meta: [],
      outcomes: [
        "The final ClassPulse prototype creates a continuous feedback loop between students and educators. Rather than simply recording attendance or completed work, the platform helps students understand their own engagement while giving educators earlier visibility into emerging patterns.",
        "The project demonstrates how research into student behaviour can be translated into a digital experience that makes engagement more transparent, actionable, and easier to maintain throughout the semester.",
      ],
      shots: [],
    },
  },
  {
    title: "MOHA",
    category: "UX/UI design",
    year: "2025",
    color: "#C9A96A",
    ink: "#241A08",
    image: HERO_MOHA,
    detail: {
      tools: "Figma",
      skills: "UI/UX Design, User Flow, Prototyping, Interaction Design, E-commerce",
      headline: "Designing a museum experience that connects visitors with artists, artworks, and personalised merchandise through a simple and intuitive user flow.",
      challenge: [
        "Museums often offer visitors multiple ways to engage with an exhibition, from discovering artists and viewing their work to purchasing merchandise. The challenge was to bring these experiences together within a single app while keeping the journey simple and easy to understand.",
        "The project required five artists to be represented within the app, while focusing on one artist to demonstrate the complete user journey. Beyond the visual design, the goal was to create a clear flow that could be easily understood by a wide range of museum visitors, from discovering an artist through to purchasing and personalising merchandise.",
      ],
      approach: [
        "I designed the app around a straightforward journey: discover an artist, explore their work, find related merchandise, personalise a product, and complete the purchase. I chose Frida Kahlo as the featured artist and developed a personalised tote bag as the main merchandise experience.",
        "The interface was structured to guide users naturally between each stage without overwhelming them with information. I used clear navigation, image-led content, and simple interactions to make the experience feel intuitive. The merchandise flow also included colour selection and personalisation, allowing users to add their name to the tote bag strap before moving through shipping and payment.",
      ],
      story: {
        label: "Direction",
        image: MO_BOARD,
        caption: "Mood board: the visual direction for the museum app.",
      },
      flow: {
        label: "The user flow",
        body: [
          "Four stages carry the visitor from the museum's featured artists through to a personalised order.",
        ],
        /* One row per recording. Stages 2 and 3 share a row because the artist
           clip runs straight on through personalising the tote. */
        rows: [
          {
            src: MO_LANDING,
            caption: "Discovering the featured artists",
            steps: [
              { n: 1, title: "Discover the artists",
                body: "The landing page introduces the five artists currently featured by the museum, giving users a clear starting point for exploring the collection." },
            ],
          },
          {
            src: MO_MERCH,
            caption: "Exploring Frida Kahlo's work, then personalising the tote",
            steps: [
              { n: 2, title: "Explore the artist",
                body: "The artist page brings together Frida Kahlo's artworks and related merchandise, using a carousel to make browsing the collection simple and interactive." },
              { n: 3, title: "Personalise the merchandise",
                body: "Users can select their preferred tote bag colour (yellow, blue, red, or white) and add their name to the strap before purchasing." },
            ],
          },
          {
            src: MO_CHECKOUT,
            caption: "Shipping and payment",
            steps: [
              { n: 4, title: "Complete the purchase",
                body: "The checkout flow guides users through shipping and payment, keeping the final stages of the experience clear and straightforward." },
            ],
          },
        ],
      },
      meta: [],
      outcomes: [
        "The final prototype demonstrates a complete museum-to-purchase journey, combining exhibition discovery, artwork exploration, product personalisation, and checkout within one cohesive experience. The project focused on making the interface visually engaging while ensuring that each interaction had a clear purpose and the overall user flow remained easy to follow.",
      ],
      shots: [],
    },
  },
  {
    title: "Carlsbad Caverns",
    category: "Editorial design",
    year: "2022",
    color: "#F05A1A",
    ink: "#140800",
    image: CARLSBAD, // defined at the foot of this file
    detail: {
      tools: "Adobe InDesign & Adobe Photoshop",
      skills: "Editorial Design, Material Exploration, Typography, Data Visualisation",
      headline: "Transforming scientific research into a tactile editorial experience through material experimentation and typography.",
      challenge: [
        "Scientific information about natural landmarks is often difficult to connect with through traditional reports and diagrams.",
        "The goal was to transform geological research into an experience that felt tactile, immersive, and visually engaging.",
      ],
      approach: [
        "Rather than relying on conventional infographics, I explored materiality as a storytelling tool. Soap, wax, plaster and clay were used to create experimental letterforms inspired by the textures and geological formations of Carlsbad Caverns.",
        "These physical experiments were photographed and refined in Photoshop before being combined into a zine and infographic that translated scientific information into a more accessible visual language.",
      ],
      embed: {
        label: "Read the zine",
        src: "https://heyzine.com/flip-book/269c90491c.html",
        height: 600,
      },
      meta: [
        { label: "Materials", value: "Soap, Wax, Clay, Plaster" },
        { label: "Techniques", value: "Material Typography, Photography, Photoshop Manipulation, Editorial Layout, Information Design" },
      ],
      outcomes: [
        "The final publication brings together material experimentation, photography, and editorial design to tell the story of Carlsbad Caverns. Through handcrafted typography, geological research, and visual storytelling, the zine transforms scientific information into a tactile and engaging reading experience.",
      ],
      shots: [], // paste image URLs here for the gallery at the bottom
    },
  },
  {
    title: "That Ikigai Project",
    category: "Brand identity",
    year: "2022",
    color: "#80343F",
    accent: "#F05554", // side notes + headings keep the original logo red
    ink: "#F7C9C2", // pale clay from the palette, still legible on the plum
    image: IK_HERO,
    detail: {
      tools: "Adobe Illustrator, Adobe Photoshop, Adobe InDesign & Procreate",
      skills: "Brand Identity, Logo Design, Visual Identity, Branding, Collateral Design",
      headline: "A comprehensive rebranding project that translates the rhythmic, handcrafted nature of pottery into a cohesive visual identity for a local small business.",
      challenge: [
        "That Ikigai Project is a ceramic studio started out of a love for the art of ceramics. It produces a diverse range of handmade pieces, takes custom orders, and runs regular workshops that let people take part in the making.",
        "The existing identity didn't carry any of that. It needed to communicate the handmade, playful and intentional nature of the process, and reflect the one-of-a-kind experience behind each piece.",
      ],
      approach: [
        "I drew directly from the art and process of pottery (the raw materials, the tools, the ceramic forms, and the movement involved in shaping each piece) and experimented with ways to translate those into a visual identity.",
        "The core of the new identity is an abstract spiral inspired by the rhythmic motion of the wheel and the circular movement of shaping clay. Rather than depicting the wheel literally, the abstract form lets the viewer intuitively connect the logo to the process.",
      ],
      /* Research: mood board plus the story behind the studio */
      story: {
        label: "Research",
        image: IK_BOARD,
        caption: "Mood board: imagery curated from the studio's own work alongside external references.",
        body: [
          "The business aims to translate the unrepeatable process of ceramics into both products and experiences. By offering handmade pieces alongside hands-on workshops, it lets clients engage directly with the making and connect with the joy of craft.",
          "After understanding the owner's values and mission, I built a mood board to guide the visual direction, curating imagery from her own account as well as external sources so the references reflected both her identity and the essence of her ceramic art.",
        ],
        facts: [
          { k: "Primary audience", v: "Artistic individuals" },
          { k: "Secondary audience", v: "Mid 20s – early 40s" },
        ],
      },
      /* Iterations, with the brand attributes running alongside */
      iterations: {
        label: "Iterations",
        image: IK_SKETCH,
        caption: "A scan of the hand-drawn iterations, from first exploration through to three refined directions.",
        body: [
          "I developed sketches informed by the brand research and mood board, focused on expressing the handmade quality at the core of the business, so that even someone unfamiliar with ceramics could sense the uniqueness and unrepeatable nature of the craft through the logo alone.",
          "From those sketches I tried a number of directions, testing which part of the process carried the brand best: the unpredictable but controlled nature of clay on the wheel, forms that read directly as thrown ceramics, and the movement of the wheel expressed more abstractly.",
        ],
        attributes: [
          { k: "Brand attributes", v: "Handmade · Playful · Quirky · Versatile" },
          { k: "Primary typeface", v: "Gloria Hallelujah" },
        ],
      },
      /* Final marks, side by side, plus the palette */
      logos: {
        label: "Final logo",
        body: [
          "We went with the spiral, taken from the pattern the wheel leaves in the clay. It communicated the craft most directly, stayed legible at small sizes, and held up across every application.",
          "The palette reflects the natural tones of certain clays while still feeling contemporary and eye-catching.",
        ],
        marks: [
          { src: IK_LOGO_BW, caption: "Black & white" },
          { src: IK_LOGO_C, caption: "Colour" },
        ],
        palette: [
          { hex: "#F05554", name: "Clay red" },
          { hex: "#821D30", name: "Deep maroon" },
          { hex: "#80343F", name: "Muted plum" },
        ],
      },
      /* Collateral collage — every tile opens larger */
      collage: {
        label: "Supporting collateral",
        body: [
          "I designed supporting brand materials including aprons, business cards, and stickers, selecting a typeface that reflected the handmade quality of the ceramics and kept the applications consistent with the brand's artisanal identity.",
        ],
        items: [
          { src: IK_APRON, caption: "Studio apron", span: 3 },
          { src: IK_CARDS, caption: "Business cards", span: 3 },
          { src: IK_ST1, caption: "Stickers: logo & fragile" },
          { src: IK_ST2, caption: "Stickers: happy sips & QR" },
          { src: IK_ST3, caption: "Stickers: hollow inside" },
        ],
      },
      meta: [],
      outcomes: [
        "The final rebrand captures the handcrafted and experiential nature of That Ikigai Project through an identity rooted in the movement and process of pottery. The abstract spiral creates a direct connection between the brand and the potter's wheel, while the supporting collateral brings the identity into the physical world, together celebrating the rhythm, individuality, and simple joy of handmade ceramics.",
      ],
      shots: [],
    },
  },
  {
    title: "Archive Fever",
    category: "Exhibition identity",
    year: "2021",
    /* mint from the poster set — the hero is the yellow colourway, so the card
       reads against it rather than merging into it */
    color: "#F5F1E9",
    ink: "#16181D",
    image: AF_HERO,
    detail: {
      tools: "Adobe Illustrator, Adobe InDesign & Adobe Photoshop",
      skills: "Branding, Art Direction, Typography, Bilingual Design, Exhibition Design, Visual Identity",
      team: "Areen Eid",
      headline: "A bilingual branding project that translates the abstract concept of “Archive Fever” into a dynamic visual identity for a graduating exhibition.",
      challenge: [
        "The graduating cohort's final exhibition required a visual identity based on the theme “Archive Fever.” The challenge was to interpret two abstract and seemingly unrelated concepts (archive and fever) without relying on literal imagery or obvious visual metaphors.",
        "The identity needed to communicate the theme in a way that felt contemporary, engaging, and meaningful, while also creating a cohesive visual system that could be applied across the exhibition. Working with both English and Arabic introduced an additional challenge of balancing visual hierarchy, readability, and consistency across two distinct writing systems.",
      ],
      approach: [
        "Working as part of a team, we explored the theme through abstraction, using the visual language of archival folders as a starting point. Simplified vector forms were developed to represent the idea of an archive, while their quantity, density, and movement were manipulated to express the intensity associated with fever.",
        "As the forms accumulated and compressed, they created a growing sense of pressure, movement, and momentum, visually representing the escalating nature of a fever. This visual language was then adapted into a bilingual identity, allowing the English and Arabic typography to work together as part of the overall composition rather than functioning as separate translations.",
      ],
      collage: [
        {
          label: "Posters",
          wide: true,
          body: [
            "Three colourways, each shown front then back, with the English and Arabic set as one composition rather than two translations.",
          ],
          items: [
            { src: AF_YELLOW, caption: "Yellow, front", span: 2 },
            { src: AF_MINT, caption: "Mint, front", span: 2 },
            { src: AF_PURPLE, caption: "Purple, front", span: 2 },
            { src: AF_YELLOW_B, caption: "Yellow, back", span: 2 },
            { src: AF_MINT_B, caption: "Mint, back", span: 2 },
            { src: AF_PURPLE_B, caption: "Purple, back", span: 2 },
          ],
        },
        {
          label: "Collateral",
          body: [],
          items: [
            { src: AF_TOTE_F, caption: "Tote, front", span: 3 },
            { src: AF_TOTE_B, caption: "Tote, back", span: 3 },
            { src: AF_TSHIRT, caption: "T-shirt", span: 3 },
            { src: AF_STICKER, caption: "Sticker", span: 3 },
            { src: AF_LABELS, caption: "Exhibition labels", span: 6 },
          ],
        },
      ],
      meta: [],
      outcomes: [
        "The final identity transforms the abstract concept of “Archive Fever” into a dynamic and flexible visual system. By combining archival-inspired forms with a sense of movement and accumulation, the branding communicates the tension between preservation and intensity. The bilingual approach extends this identity across English and Arabic, creating a cohesive exhibition language that reflects the diversity of the graduating cohort.",
      ],
      shots: [],
    },
  },
  {
    title: "Why Axis",
    category: "Internship",
    year: "2024",
    color: "#D8C0A8",
    ink: "#2B1C12",
    image: HERO_WHYAXIS,
    detail: {
      tools: "Adobe Photoshop, Adobe Illustrator & Adobe InDesign",
      skills: "Graphic Design, Social Media Design, E-commerce Design, Visual Communication, Advertising",
      agency: "Why Axis, Bangalore",
      headline: "A multidisciplinary design internship creating digital, social media, and promotional content for brands across e-commerce, skincare, and jewellery.",
      challengeLabel: "The Experience",
      challenge: [
        "During my internship at Why Axis, I worked across a range of commercial design projects, creating visual content for different brands and platforms. My work included e-commerce graphics, social media content, product communication, and promotional artwork, giving me experience adapting design for different audiences, purposes, and brand identities.",
        "One of my main projects was supporting NuEssentials as the supplement brand expanded into skincare. I also worked on promotional content for Bluestone Jewellery towards the end of my internship.",
        "Working across different brands meant adapting to different audiences, purposes, and visual identities while communicating information clearly. For NuEssentials, the challenge was to support the brand's move into skincare and appeal to a new customer group through both e-commerce and social media. For Bluestone, the focus was on communicating weekly jewellery promotions in a polished and attention-grabbing format.",
      ],
      approach: [
        "For NuEssentials, I created a range of Amazon product page graphics covering ingredients, benefits, usage instructions, and other key product information, as well as Instagram posts introducing the skincare range and building awareness among new customers. I focused on making information easy to understand while keeping the products visually prominent and the content consistent across platforms.",
        "For Bluestone, I designed the weekly deals poster, working with product imagery and promotional information to create a clear composition that balanced the offer with the jewellery and maintained the brand's premium feel. Together, these projects gave me experience designing for both informative and promotional purposes across different commercial brands.",
      ],
      collage: [
        {
          label: "NuEssentials on Amazon",
          body: [
            "Clear visual layouts communicate ingredients, benefits, usage, and key product information to help customers make informed purchasing decisions. Information was organised into digestible sections, making product benefits easier to understand while maintaining a consistent visual language across the Amazon page.",
          ],
          items: [
            { src: WA_AMAZON1, caption: "Screenshot of the Amazon product page: ingredients, benefits and usage.", span: 6 },
            { src: WA_AMAZON2, caption: "Screenshot of the Amazon product page: benefits broken into digestible sections.", span: 6 },
          ],
        },
        {
          label: "NuEssentials on Instagram",
          body: [
            "Social media graphics introduced the new skincare range to potential customers through product-focused and educational content designed for a new target audience.",
          ],
          items: [
            { src: WA_INSTA, caption: "Screenshot of the NuEssentials Instagram feed: introducing the skincare range." },
          ],
        },
        {
          label: "Bluestone weekly deals",
          body: [
            "Towards the end of my internship, I designed the weekly deals poster for Bluestone Jewellery, using product imagery and promotional information to create a clear and polished advertisement while maintaining the brand's premium feel.",
          ],
          items: [
            { src: WA_BLUESTONE, caption: "Screenshot of the Bluestone weekly deals poster as published.", span: 6 },
          ],
        },
      ],
      meta: [],
      outcomes: [
        "The internship gave me experience working across multiple commercial design needs, from detailed e-commerce communication and social media content to promotional advertising. The final work supported NuEssentials' skincare launch and created promotional content for Bluestone, while helping me develop a more flexible approach to designing for different audiences, platforms, and brand identities.",
      ],
      shots: [],
    },
  },
  {
    title: "Motion & Animation Experimentation",
    category: "Motion design",
    year: "2022",
    color: "#E0453A",
    ink: "#1C0605",
    image: HERO_MOTION,
    detail: {
      tools: "Adobe After Effects, Adobe Illustrator & Adobe Photoshop",
      skills: "Motion Design, Animation, Storytelling, Visual Communication",
      headline: "Early experiments in motion design exploring animation, advertising, and visual storytelling through Adobe After Effects.",
      challenge: [
        "These projects were my first introduction to Adobe After Effects, completed before choosing my design specialisation. The brief was to experiment with motion as a way of communicating an idea, while learning the fundamentals of animation, timing, transitions, and visual storytelling.",
        "Although I was still finding my way around the software, I enjoyed the challenge of translating static design ideas into moving visuals and exploring a medium that was very different from the graphic design work I was used to.",
      ],
      approach: [
        "For the first project, I created a fictional lip balm brand and developed a 20-second advertisement around three different flavours. I wanted the video to have a bright, summery feeling, using colour, product imagery, and movement to create an energetic advertisement. This project became an opportunity to experiment with basic animation and learn how movement could change the way a product is presented.",
        "For the second project, we were asked to choose a social issue and communicate information through an infographic video, including an AI-generated voice-over. I chose a more serious visual direction, using black, grey, and red to create a sense of urgency and reinforce the subject matter. I experimented with combining typography, graphics, information, and movement to make the content easier to follow as a short-form video.",
      ],
      reels: {
        label: "The projects",
        items: [
          { title: "Project 01: Lip balm advertisement", kicker: "20-second product advertisement", src: MOT_SUNDAE,
            body: "A fictional lip balm brand with three flavours, designed around a bright and summery visual direction. The project focused on experimenting with product animation, transitions, and timing to create a short promotional video." },
          { title: "Project 02: Social issue infographic", kicker: "Animated information video", src: MOT_INFO,
            body: "An infographic video exploring a social issue through motion, typography, and visual information. A darker colour palette of black, grey, and red was used to reinforce the seriousness of the topic, alongside an AI-generated voice-over to guide the viewer through the information." },
        ],
      },
      meta: [],
      outcomes: [
        "These projects were an early exploration of motion design and my first experience working with After Effects. While I was still developing my technical skills, the projects helped me understand how movement, timing, colour, and sound can influence the way information and ideas are communicated.",
        "More than polished animation pieces, these projects represent my experimentation with a new medium and the process of learning through making.",
      ],
      shots: [],
    },
  },
  {
    title: "Crochet",
    category: "Personal work",
    color: "#C9A5C7",
    ink: "#241623",
    image: HERO_CROCHET,
    detail: {
      skills: "Patience, Precision, Problem solving, Following and adapting complex patterns",
      headline: "A hobby that has taught me patience, an eye for detail, and how to keep going when a piece has to be pulled back and started again.",
      intro: [
        "Outside of design, I enjoy trying different crafts and making things by hand, but crochet is the one that has stuck with me the most. It started as a hobby and a way to pass the time, and has gradually become what I spend most of my free time doing.",
        "I enjoy experimenting with different colours, patterns, and projects, and this is a small collection of some of the things I've made over time.",
      ],
      collage: [
        { label: "Lilac stripe vest", body: [], items: [
          { src: "assets/crochet-purplevest1.jpg" }, { src: "assets/crochet-purplevest3.jpg" },
          { src: "Crochet/purplevest2.mp4", silent: true },
          { src: "Crochet/purplevest4.mp4", silent: true } ] },
        { label: "Bubblegum mesh sleeves", body: [], items: [
          { src: "assets/crochet-pinksleeves1.jpg" }, { src: "assets/crochet-pinksleeves2.jpg" },
          { src: "assets/crochet-pinksleeves3.jpg" }, { src: "assets/crochet-pinksleeves4.jpg" } ] },
        { label: "Tidal stripe sweater", body: [], items: [
          { src: "assets/crochet-blueandwhitestripesweater1.jpg" },
          { src: "assets/crochet-blueandwhitestripesweater2.jpg" },
          { src: "assets/crochet-blueandwhitestripesweater3.jpg" } ] },
        { label: "Patchwork granny squares", body: [], items: [ { src: "Crochet/grannysquaretop.mp4" } ] },
        { label: "Cobalt strapless, tied at the back", body: [], items: [ { src: "Crochet/bluestraplesstop.mp4" } ] },
        { label: "Front-tie vest", body: [], items: [ { src: "Crochet/fronttievest.mp4" } ] },
        { label: "Laptop sleeve", body: [], items: [ { src: "Crochet/laptopcover.mp4" } ] },
        { label: "Checkered shoulder bag", body: [], items: [ { src: "assets/crochet-shoulderbag.jpg" } ] },
        { label: "Keychains", body: [], items: [ { src: "assets/crochet-keychains.jpg" } ] },
      ],
      meta: [],
      shots: [],
    },
  },
  {
    title: "Painting",
    category: "Personal work",
    color: "#7FA8C9",
    ink: "#0E1B26",
    image: HERO_PAINTING,
    detail: {
      skills: "Colour, Composition",
      headline: "The first place I learned that colour could carry a feeling, and where making things began for me.",
      intro: [
        "Painting has been part of my life since I was young and was one of the things that first drew me towards design. I've always enjoyed experimenting with colour, composition, and different ways of creating an image.",
        "Although my interests have grown into other areas of design over time, painting is where my interest in making and visual creativity began.",
      ],
      collage: [
        { label: "A few pieces", body: [], items: [
          { src: "assets/painting1.jpg", span: 6 },
          { src: "assets/painting2.jpg", span: 3 },
          { src: "assets/painting3.jpg", span: 3 },
          { src: "assets/painting4.jpg", span: 3 },
          { src: "assets/painting5.jpg", span: 3 },
        ] },
      ],
      meta: [],
      shots: [],
    },
  },
];

const ROLL_MS = 3000;

/* ==================================================================
   You can stop reading here.
   ================================================================== */

const CSS = `
/* One typeface throughout. Labels earn their difference from size, letter-spacing
   and colour rather than from a second family, and only the four weights the
   stylesheet actually uses are requested. */
@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500;600&display=swap');

.pf { --ease: cubic-bezier(.32,.72,0,1); font-family: 'Readex Pro', system-ui, -apple-system, sans-serif; background: #000; color: #fff; -webkit-font-smoothing: antialiased; }
.pf * { box-sizing: border-box; }
/* keep line lengths even and stop single-word last lines at every width */
.pf h1, .pf h2, .pf h3, .pf .pf-d-headline, .pf .pf-card-title, .pf .pf-cv-role, .pf .pf-foot-mail { text-wrap: balance; }
.pf p, .pf li, .pf .pf-d-note-v, .pf .pf-cv-note { text-wrap: pretty; }
/* A word is never split. If it will not fit it moves down whole, and it is
   never hyphenated — which matters most on a phone, where the measure is
   narrow enough that the browser would otherwise break words apart. */
.pf, .pf * { hyphens: none; -webkit-hyphens: none; overflow-wrap: normal; word-break: normal; }
.pf a { color: inherit; text-decoration: none; }
/* Form elements do not inherit the page font on their own, so any button that
   ever gains a label would otherwise render in the browser's default face. */
.pf button, .pf input, .pf select, .pf textarea { font-family: inherit; }
.pf :focus-visible { outline: 2px solid #fff; outline-offset: 3px; border-radius: 4px; }

.pf-shell { max-width: 1160px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 2; }

/* ---------- navbar ---------- */
.pf-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; padding: 18px 20px; }
.pf-nav-inner { max-width: 1160px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
/* liquid-glass edge, borrowed from the Aura brief and softened */
.pf-glass { position: relative; overflow: hidden; background: rgba(255,255,255,0.02); backdrop-filter: blur(14px); box-shadow: inset 0 1px 1px rgba(255,255,255,0.09); }
.pf-glass::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1.2px; pointer-events: none;
  background: linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.10) 22%, rgba(255,255,255,0) 42%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.10) 80%, rgba(255,255,255,0.34) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
}

.pf-pill { display: flex; align-items: center; gap: 8px; background: rgba(23,23,23,0.72); backdrop-filter: blur(14px); border-radius: 999px; }
.pf-brand { padding: 12px 24px; border: 0; cursor: pointer; font: inherit; color: inherit; }
.pf-brand:hover .pf-brand-name { color: #fff; }
.pf-brand-name { transition: color .2s; }
.pf-brand-name { font-size: 14px; letter-spacing: -0.01em; }
.pf-links { padding: 8px; gap: 2px; }
.pf-links a { font-size: 14px; color: rgb(212,212,212); padding: 8px 20px; border-radius: 999px; transition: color .35s var(--ease), background .35s var(--ease); }
.pf-links a:hover { color: #fff; background: rgba(255,255,255,0.08); }
.pf-links a.on { color: #fff; background: rgba(255,255,255,0.14); }
@media (max-width: 560px) { .pf-links a { padding: 8px 14px; font-size: 13px; } }

/* ---------- hero ---------- */
.pf-hero { position: relative; min-height: 100vh; min-height: 100dvh; overflow: hidden; background: transparent; }
.pf-hero-media { position: absolute; inset: 0; }
.pf-hero-media video { width: 100%; height: 100%; object-fit: cover; }
.pf-ambient {
  position: absolute; inset: -25%;
  background:
    radial-gradient(40% 44% at 26% 26%, rgba(255,255,255,0.16), transparent 70%),
    radial-gradient(36% 40% at 74% 58%, rgba(255,255,255,0.10), transparent 70%),
    radial-gradient(46% 40% at 50% 92%, rgba(255,255,255,0.06), transparent 70%);
  filter: blur(34px); animation: drift 26s ease-in-out infinite alternate;
}
@keyframes drift {
  0%   { transform: translate3d(0,0,0) scale(1); }
  50%  { transform: translate3d(3%,-4%,0) scale(1.1); }
  100% { transform: translate3d(-3%,3%,0) scale(1.03); }
}
.pf-scrim { position: absolute; inset: 0; background: rgba(0,0,0,0.22); }
/* the wash drifts against the cursor */
.pf-parallax { position: absolute; inset: 0; transition: transform .9s cubic-bezier(0.16,1,0.3,1); will-change: transform; }

/* strand field — a canvas of many thin curves, sits behind everything */
.pf-flow { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }

.pf-hero-inner {
  position: relative; z-index: 2; min-height: 100vh; min-height: 100dvh;
  max-width: 1160px; margin: 0 auto;
  padding: clamp(88px, 13vh, 120px) 20px clamp(16px, 3vh, 32px);
  display: flex; flex-direction: column;
}
.pf-hero-mid { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: clamp(28px, 5vh, 52px); }

/* giant type */
.pf-headline { margin: 0; font-weight: 500; letter-spacing: -0.04em; line-height: 0.94; font-size: clamp(1.6rem, 7.4vw, 6.1rem); text-align: left; color: #fff; }
.pf-line { display: block; white-space: nowrap; }

/* small description block, straight from the brief */
.pf-desc { max-width: 620px; }
.pf-desc-label { font-size: 14px; color: rgba(255,255,255,0.55); margin: 0 0 8px; }
.pf-roll { position: relative; display: block; overflow: hidden; height: 1.5em; font-size: clamp(1.45rem, 4vw, 2.6rem); letter-spacing: -0.035em; line-height: 1.15; font-weight: 500; }
.pf-roll-item { position: absolute; left: 0; top: 0; width: 100%; white-space: nowrap; color: #FF6A1F; text-shadow: 0 0 34px rgba(255,106,31,0.35); will-change: transform, opacity; }
.pf-enter { animation: rollIn 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
.pf-exit  { animation: rollOut 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes rollIn  { from { transform: translate3d(0,105%,0); opacity: 0; } 45% { opacity: 1; } to { transform: translate3d(0,0,0); opacity: 1; } }
@keyframes rollOut { from { transform: translate3d(0,0,0); opacity: 1; } 55% { opacity: 0; } to { transform: translate3d(0,-105%,0); opacity: 0; } }

/* hero foot */
.pf-hero-foot { position: relative; z-index: 2; display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
.pf-scroll { display: flex; align-items: center; gap: 10px; font-size: 12px; color: rgba(255,255,255,0.7); }
.pf-scroll svg { animation: nudge 2s ease-in-out infinite; }
@keyframes nudge { 0%,100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
.pf-place { font-size: 11px; color: rgba(255,255,255,0.7); }

.pf-rise { opacity: 0; transform: translateY(28px); animation: rise 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes rise { to { opacity: 1; transform: none; } }

/* ---------- work ---------- */
.pf-work { padding: clamp(28px, 4vw, 56px) 0 clamp(64px, 10vw, 120px); display: flex; flex-direction: column; gap: clamp(32px, 4vw, 52px); }
.pf-work-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-bottom: 6px; }
.pf-eyebrow { color: rgba(255,255,255,0.5); margin: 0; }
.pf-card { position: relative; display: block; width: 100%; padding: 0; margin: 0; border: 0; text-align: left; font: inherit; color: inherit; cursor: pointer; overflow: hidden; border-radius: 3px; background: #000; transition: transform .6s cubic-bezier(.22,1,.36,1), box-shadow .6s cubic-bezier(.22,1,.36,1); }
.pf-card:hover { transform: translateY(-8px) scale(1.004); box-shadow: 0 22px 50px rgba(0,0,0,0.55); }

/* light that follows the pointer across a card */
.pf-sheen { position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .5s ease; background: radial-gradient(320px circle at var(--cx, 50%) var(--cy, 50%), rgba(255,255,255,0.14), transparent 62%); }
.pf-card:hover .pf-sheen { opacity: 1; }

.pf-rail {
  position: fixed; left: clamp(10px, 1.8vw, 22px); top: 50%; transform: translateY(-50%);
  display: flex; flex-direction: column; gap: 2px; z-index: 45;
  opacity: 0; pointer-events: none; transition: opacity .5s var(--ease);
}
.pf-rail.on { opacity: 1; pointer-events: auto; }
.pf-rail button {
  display: flex; align-items: center; gap: 9px; background: none; border: 0; cursor: pointer;
  padding: 5px 6px; color: rgba(255,255,255,0.34); font: inherit; font-size: 10.5px;
  letter-spacing: 0.02em; text-align: left; transition: color .3s var(--ease);
}
.pf-rail button i { width: 14px; height: 1px; flex: none; background: currentColor; transition: width .3s var(--ease); }
.pf-rail button:hover { color: rgba(255,255,255,0.72); }
.pf-rail button.on { color: #fff; }
.pf-rail button.on i { width: 26px; }
/* Below ~1240px the content shell leaves no margin for labels, so the rail
   collapses to its tick marks and reveals the label on hover. It only leaves
   entirely on narrow screens, where there is no room at all. */
@media (max-width: 1240px) {
  /* The label takes the tick's place on hover rather than sitting beside it. */
  .pf-rail button { position: relative; padding: 6px 4px; min-height: 22px; }
  .pf-rail button span {
    position: absolute; left: 4px; top: 50%; transform: translateY(-50%) translateX(-3px);
    opacity: 0; pointer-events: none; white-space: nowrap;
    transition: opacity .22s var(--ease), transform .22s var(--ease);
  }
  .pf-rail button i { transition: opacity .22s var(--ease), width .3s var(--ease); }
  .pf-rail button:hover i, .pf-rail button:focus-visible i { opacity: 0; }
  .pf-rail button:hover span, .pf-rail button:focus-visible span {
    opacity: 1; transform: translateY(-50%);
  }
}
@media (max-width: 760px) { .pf-rail { display: none; } }

.pf-totop {
  position: fixed; right: clamp(16px, 2.4vw, 30px); bottom: clamp(16px, 2.4vw, 30px);
  width: 42px; height: 42px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.16);
  background: rgba(20,20,20,0.72); backdrop-filter: blur(14px); color: #fff;
  display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 70;
  opacity: 0; transform: translateY(10px); pointer-events: none;
  transition: opacity .45s var(--ease), transform .45s var(--ease), background .25s var(--ease);
}
.pf-totop.on { opacity: 1; transform: none; pointer-events: auto; }
.pf-totop:hover { background: rgba(38,38,38,0.9); }

/* fixed film grain over the whole page */
.pf-grain { position: fixed; inset: 0; z-index: 60; pointer-events: none; opacity: 0.045; mix-blend-mode: overlay; }

/* radial glow behind the contact block */
.pf-glow { position: absolute; inset: 0; pointer-events: none; opacity: 0.3; background: radial-gradient(600px circle at 30% 0%, rgba(255,255,255,0.15), transparent 70%); }
.pf-card-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: clamp(15px, 1.7vw, 21px) clamp(18px, 2.1vw, 28px); }
.pf-card-bar .meta { display: flex; align-items: center; gap: 14px; opacity: 0.7; font-size: 12px; }
.pf-card-title { font-size: clamp(15px, 2.1vw, 21px); letter-spacing: -0.02em; font-weight: 500; }
.pf-chev { transition: transform .4s cubic-bezier(0.16,1,0.3,1); flex: none; }
.pf-card:hover .pf-chev-right { transform: translateX(4px); }
.pf-d-close:hover .pf-chev-left { transform: translateX(-3px); }
.pf-canvas { aspect-ratio: 16 / 9.5; width: 100%; padding: clamp(18px, 2.1vw, 28px); padding-top: 0; }
.pf-canvas-in { width: 100%; height: 100%; overflow: hidden; border-radius: 2px; background: transparent; }
.pf-canvas img, .pf-canvas video { width: 100%; height: 100%; object-fit: contain; display: block; transition: transform .6s var(--ease); }
.pf-card:hover .pf-canvas img, .pf-card:hover .pf-canvas video { transform: scale(1.03); }

/* ---------- card flip ---------- */
.pf-flip-wrap { perspective: 2000px; perspective-origin: 50% 40%; }
/* separate layer so the hover tilt can react fast while the flip stays slow */
.pf-tilt { transform-style: preserve-3d; transition: transform .6s var(--ease); will-change: transform; }
.pf-flip { position: relative; transform-style: preserve-3d; overflow-anchor: none; }
.pf-flip.clipped { overflow: hidden; }
.pf-flip.ready { transition: transform .95s var(--ease), height .95s var(--ease); }
.pf-flip.open { transform: rotateY(180deg); }
.pf-face { position: absolute; top: 0; left: 0; width: 100%; backface-visibility: hidden; -webkit-backface-visibility: hidden; contain: layout paint; }
.pf-back { transform: rotateY(180deg); pointer-events: none; }
.pf-flip.open .pf-back { pointer-events: auto; }
.pf-flip.open .pf-front { pointer-events: none; }

/* the card lifts off the page while it turns */
.pf-card, .pf-d { transition: box-shadow .6s ease; }
.pf-flip.turning { will-change: transform, height; }
.pf-flip.turning .pf-card, .pf-flip.turning .pf-d { box-shadow: 0 40px 90px rgba(0,0,0,0.75); }
.pf-flip.open .pf-d { box-shadow: 0 26px 60px rgba(0,0,0,0.55); }

/* case study contents settle in just after the card lands */
.pf-d-body { opacity: 0; transform: translateY(14px); transition: opacity .6s var(--ease), transform .7s var(--ease); }
.pf-flip.open .pf-d-body { opacity: 1; transform: none; transition-delay: .46s; }
.pf-d-bar { opacity: 0; transition: opacity .4s ease; }
.pf-flip.open .pf-d-bar { opacity: 1; transition-delay: .34s; }

/* ---------- case study, on the back of the card ---------- */
.pf-d { position: relative; background: #0b0b0b; border-radius: 3px; overflow: hidden; }
.pf-d-bar { cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: clamp(15px, 1.7vw, 21px) clamp(18px, 2.1vw, 28px); }
.pf-d-bar-title { font-size: clamp(15px, 2.1vw, 21px); letter-spacing: -0.02em; font-weight: 500; }
.pf-d-close {
  width: 28px; height: 28px; border-radius: 999px; border: 0; cursor: pointer; flex: none;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.16); color: inherit; transition: background .2s;
}
.pf-d-close:hover { background: rgba(0,0,0,0.32); }
.pf-d-body { padding: clamp(30px, 4.5vw, 56px) clamp(20px, 3.5vw, 48px) clamp(34px, 5vw, 64px); }
.pf-d-top { display: grid; grid-template-columns: clamp(92px, 20vw, 230px) 1fr; gap: clamp(16px, 3.5vw, 60px); align-items: center; }
.pf-d-notes { display: flex; flex-direction: column; gap: 15px; }
/* ------------------------------------------------------------------
   One label treatment, shared by every small heading on the page: the
   rail labels, the meta keys, the section headings inside a case study,
   the step numbers and the eyebrows. Only the colour changes with
   context. The footer is deliberately left out of this.
   ------------------------------------------------------------------ */
.pf-d-note-k, .pf-d-sec-label, .pf-d-h3, .pf-step-n, .pf-eyebrow, .pf-cv-label {
  font-size: 10.5px; font-weight: 400; letter-spacing: 0.09em;
  text-transform: uppercase; line-height: 1.45;
}
.pf-d-note-k { color: rgba(255,255,255,0.42); margin: 0 0 5px; }
.pf-d-note-v { font-weight: 300; font-size: clamp(12.5px, 1.3vw, 13.5px); line-height: 1.55; margin: 0; }
.pf-d-headline {
  line-height: 1.16; letter-spacing: -0.035em;
  font-weight: 500; color: #fff; margin: 0;
  font-size: clamp(21px, 3.5vw, 42px);
  text-wrap: initial;
}
.pf-d-headline span { display: block; }
.pf-d-embed { margin-top: clamp(32px, 5vw, 60px); }
.pf-d-embed-head { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.pf-d-embed-out { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: rgba(255,255,255,0.6); transition: color .2s; }
.pf-d-embed-out:hover { color: #fff; }
.pf-d-embed iframe { display: block; border-radius: 3px; background: #111; }
.pf-d-meta {
  margin-top: clamp(28px, 4vw, 46px); padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px, 3.5vw, 56px);
}
.pf-d-hero { margin: clamp(30px, 4.5vw, 56px) 0; border-radius: 3px; overflow: hidden; }
.pf-d-hero img, .pf-d-hero svg, .pf-d-hero video { width: 100%; display: block; }
.pf-d-intro { max-width: 62ch; margin-top: clamp(28px, 4vw, 44px); }
.pf-d-cols { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px, 3.5vw, 56px); }
.pf-d-h3 { margin: 0 0 13px; }
.pf-d-cols p:not([class]), .pf-d-out p:not([class]), .pf-d-intro p:not([class]), .pf-d-sec p:not([class]) { font-size: clamp(14.5px, 1.02vw, 15.5px); line-height: 1.72; color: rgba(255,255,255,0.72); margin: 0 0 clamp(13px, 1.1vw, 17px); }
.pf-d-cols p:not([class]):last-child, .pf-d-out p:not([class]):last-child, .pf-d-intro p:not([class]):last-child, .pf-d-sec p:not([class]):last-child { margin-bottom: 0; }
.pf-d-out { margin-top: clamp(30px, 4.5vw, 56px); }
.pf-d-shots { display: grid; gap: 20px; margin-top: clamp(32px, 5vw, 60px); }
.pf-d-shot { border-radius: 3px; overflow: hidden; }
.pf-d-shot img { width: 100%; display: block; }
.pf-d-soon { margin-top: 22px; font-size: 14px; color: rgba(255,255,255,0.55); }

/* ---------- extended case-study blocks ---------- */
.pf-d-sec { margin-top: clamp(34px, 5vw, 62px); padding-top: clamp(26px, 3.5vw, 40px); border-top: 1px solid rgba(255,255,255,0.11); }
.pf-d-sec-grid { display: grid; grid-template-columns: clamp(92px, 20vw, 230px) 1fr; gap: clamp(16px, 3.5vw, 60px); align-items: start; }
.pf-d-sec-label { color: rgba(255,255,255,0.42); margin: 0 0 18px; }
.pf-d-side { display: flex; flex-direction: column; gap: 15px; }
.pf-d-figure { margin: clamp(22px, 3vw, 34px) 0 0; }
/* a figure with its reading sat alongside rather than underneath */
.pf-figure-aside {
  margin-top: clamp(22px, 3vw, 34px); border-radius: 4px; overflow: hidden;
  background: rgba(255,255,255,0.05);
}
.pf-figure-aside > .pf-tileimg { background: #fff; }
.pf-figure-aside > div { padding: clamp(18px, 2.4vw, 30px) clamp(20px, 2.8vw, 34px); }
.pf-figure-aside .pf-aside-b { font-size: clamp(14px, 1.7vw, 17px); color: rgba(255,255,255,0.86); max-width: none; }
.pf-aside-b { font-size: clamp(13.5px, 1.4vw, 14.5px); font-weight: 300; color: rgba(255,255,255,0.62); line-height: 1.65; margin: 0; }
@media (max-width: 700px) { .pf-figure-aside { grid-template-columns: 1fr; gap: 16px; } }
.pf-d-cap { font-size: clamp(13px, 1.3vw, 14px); color: rgba(255,255,255,0.68); margin: 10px 0 0; line-height: 1.6; }

/* logo pair */
.pf-d-marks { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(14px, 2.5vw, 30px); margin-top: clamp(22px, 3vw, 34px); align-items: start; }
.pf-d-marks .pf-tileimg { background: transparent; }
.pf-swatches { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.pf-swatch { display: flex; align-items: center; gap: 9px; font-size: 11.5px; color: rgba(255,255,255,0.62); }
.pf-swatch i { width: 17px; height: 17px; border-radius: 3px; display: block; flex: none; }
.pf-swatch b { font-weight: 400; letter-spacing: 0.04em; color: rgba(255,255,255,0.82); }

/* collage */
.pf-collage { display: grid; grid-template-columns: repeat(6, 1fr); gap: clamp(12px, 1.9vw, 24px); margin-top: clamp(22px, 3vw, 34px); align-items: start; }
.pf-collage > * { min-width: 0; }
.pf-collage .pf-tileimg img, .pf-collage .pf-tileimg video { aspect-ratio: auto; height: auto; object-fit: contain; width: 100%; }
/* Group = copy in the left column, media across the middle and right. */
.pf-collage-group { display: grid; grid-template-columns: 1fr 2fr; gap: clamp(20px, 3.5vw, 56px); align-items: start; }
/* full-bleed variant: label above, media across the whole width */
.pf-collage-group.wide { display: block; }
.pf-collage-group.wide .pf-group-copy { margin-bottom: clamp(16px, 2.2vw, 26px); max-width: 62ch; }
.pf-collage-group + .pf-collage-group { margin-top: clamp(46px, 6.5vw, 88px); }
.pf-collage-group .pf-collage { margin-top: 0; }
.pf-collage-group .pf-group-copy .pf-d-sec-label { line-height: 1; margin-top: 2px; }
.pf-group-b { font-size: clamp(13.5px, 0.92vw, 14.5px); font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.65; margin: 12px 0 0; }
@media (max-width: 700px) { .pf-collage-group { grid-template-columns: 1fr; gap: 18px; } }

/* clip tile with transport controls */
.pf-cliptile { position: relative; border-radius: 3px; overflow: hidden; background: transparent; }
.pf-cliptile video { width: 100%; display: block; }
.pf-clipbar { position: absolute; right: 8px; bottom: 8px; display: flex; gap: 6px; }
.pf-clipbar button {
  width: 26px; height: 26px; border-radius: 999px; border: 0; cursor: pointer; padding: 0;
  display: flex; align-items: center; justify-content: center; color: #fff;
  background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); transition: background .2s;
}
.pf-clipbar button:hover { background: rgba(0,0,0,0.8); }
.pf-collage-t { font-size: clamp(13.5px, 1vw, 15px); font-weight: 500; margin: 0 0 8px; letter-spacing: -0.01em; }
.pf-tileimg { position: relative; border-radius: 3px; overflow: hidden; background: transparent; border: 0; padding: 0; cursor: zoom-in; display: block; width: 100%; }
.pf-tileimg.wide { grid-column: span 3; }
.pf-tileimg img, .pf-tileimg video { width: 100%; display: block; aspect-ratio: 4 / 3.2; object-fit: cover; transition: transform .6s var(--ease); }
.pf-tileimg.wide img, .pf-tileimg.wide video { aspect-ratio: 16 / 10; }
/* A figure shows the whole artwork — no forced ratio, nothing cut off. Only the
   small collage tiles still crop, where a uniform grid is the point. */
/* A "free" tile shows the whole image: no forced ratio, no cropping, and never
   scaled past its own pixels. Declared !important because .wide/.tall carry the
   same specificity and would otherwise win on source order. */
.pf-tileimg.free img, .pf-tileimg.free video {
  aspect-ratio: auto !important; height: auto !important; object-fit: contain !important;
  width: auto; max-width: 100%; margin: 0 auto; display: block;
}
.pf-tileimg:hover img, .pf-tileimg:hover video { transform: scale(1.035); }
.pf-zoom {
  position: absolute; right: 8px; bottom: 8px; width: 24px; height: 24px; border-radius: 4px;
  display: flex; align-items: center; justify-content: center; color: #fff;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(6px); transition: background .2s, transform .3s;
}
.pf-tileimg:hover .pf-zoom { background: rgba(0,0,0,0.75); transform: translate(-1px,-1px); }
@media (max-width: 620px) { .pf-collage > * { grid-column: span 3 !important; } }

/* ---------- video ---------- */
/* Screen recordings are portrait phone captures, so a tile that holds one
   shows the whole frame rather than cropping it to the collage ratio. */
.pf-tileimg.tall img, .pf-tileimg.tall video { aspect-ratio: 1206 / 2622; object-fit: contain; background: transparent; }

/* a phone shell for the portrait prototype recordings */
.pf-phones { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: clamp(18px, 3vw, 40px); margin-top: clamp(24px, 3.5vw, 40px); }
.pf-phone { margin: 0; }
/* iPhone: titanium rail, thin even bezel, Dynamic Island, side buttons. The
   19.5:9 ratio is the handset's, and the recordings were captured at it. */
.pf-phone-shell {
  position: relative; width: 100%; aspect-ratio: 1206 / 2622;
  border-radius: clamp(26px, 4.6vw, 46px); padding: clamp(3px, 0.6vw, 5px);
  background: linear-gradient(145deg, #4a4a4f 0%, #232327 12%, #0d0d0f 34%, #08080a 54%, #1c1c20 78%, #3d3d42 100%);
  box-shadow:
    0 2px 4px rgba(0,0,0,0.7),
    0 10px 20px rgba(0,0,0,0.5),
    0 24px 40px rgba(0,0,0,0.45),
    inset 0 0 0 1px rgba(255,255,255,0.10);
}
/* inner black bezel between rail and screen */
.pf-phone-shell::before {
  content: ''; position: absolute; inset: clamp(3px, 0.6vw, 5px); border-radius: clamp(23px, 4.1vw, 41px);
  background: #050506; pointer-events: none;
}
.pf-phone-screen {
  position: relative; z-index: 1; width: 100%; height: 100%; overflow: hidden;
  border-radius: clamp(23px, 4.1vw, 41px); background: #000;
}
.pf-phone-screen img, .pf-phone-screen video { width: 100%; height: 100%; object-fit: cover; display: block; }
/* Dynamic Island */
.pf-phone-shell::after {
  content: ''; position: absolute; top: clamp(9px, 1.7vw, 17px); left: 50%; transform: translateX(-50%);
  width: 30%; height: clamp(11px, 1.9vw, 19px); border-radius: 999px; background: #000;
  pointer-events: none; z-index: 2;
}
/* side buttons */
.pf-phone-btn { position: absolute; background: linear-gradient(180deg, #3c3c41, #17171a); pointer-events: none; z-index: 0; }
.pf-phone-btn.l { left: -2px; width: 2px; border-radius: 2px 0 0 2px; }
.pf-phone-btn.r { right: -2px; width: 2px; border-radius: 0 2px 2px 0; }
.pf-phone-btn.b1 { top: 17%; height: 4%; }
.pf-phone-btn.b2 { top: 24%; height: 7%; }
.pf-phone-btn.b3 { top: 33%; height: 7%; }
.pf-phone-btn.b4 { top: 23%; height: 11%; }
.pf-phone figcaption { position: relative; z-index: 3; font-size: clamp(12.5px, 1.35vw, 14px); color: rgba(255,255,255,0.86); margin: 30px 0 0; line-height: 1.5; text-align: center; }

/* a plain 16:9 frame for landscape motion work */
.pf-reel { position: relative; border-radius: 3px; overflow: hidden; background: #000; }
.pf-reel video { width: 100%; display: block; aspect-ratio: 16 / 9; object-fit: contain; background: #000; }
.pf-reels { display: flex; flex-direction: column; margin-top: clamp(26px, 3.5vw, 40px); }
.pf-reel-item + .pf-reel-item { margin-top: clamp(48px, 7vw, 92px); padding-top: clamp(48px, 7vw, 92px); border-top: 1px solid rgba(255,255,255,0.12); }
.pf-reel-b { font-size: clamp(12.5px, 1.4vw, 14px); font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.6; margin: 0 0 clamp(20px, 2.6vw, 30px); max-width: 68ch; }

/* ---------- research: stat row ---------- */
/* Two standalone figures, so proportional (not tabular) numerals — tabular
   widths make a value like 10/13 look loose at display size. */
.pf-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: clamp(16px, 2.5vw, 34px); margin-top: clamp(24px, 3.5vw, 38px); }
.pf-stat { border-top: 1px solid rgba(255,255,255,0.14); padding-top: 15px; }
.pf-stat-v { font-size: clamp(30px, 5vw, 46px); font-weight: 600; letter-spacing: -0.03em; line-height: 1; margin: 0 0 10px; }
.pf-stat-l { font-size: clamp(13px, 1.3vw, 13.5px); font-weight: 300; line-height: 1.55; color: rgba(255,255,255,0.62); margin: 0; }

/* callout for a key insight or a combined finding */
.pf-insight { margin-top: clamp(24px, 3.5vw, 38px); padding: clamp(16px, 2.2vw, 24px) clamp(18px, 2.6vw, 28px); border-radius: 3px; background: rgba(255,255,255,0.045); }
.pf-ins-body { font-size: clamp(14px, 1.45vw, 15px); line-height: 1.62; font-weight: 300; margin: 0 0 11px; }
.pf-ins-body:last-child { margin-bottom: 0; }

/* ---------- user & client needs ---------- */
.pf-needs { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(22px, 4vw, 56px); margin-top: clamp(26px, 3.5vw, 40px); }
@media (max-width: 720px) { .pf-needs { grid-template-columns: 1fr; } }
.pf-need { padding: 15px 0; border-top: 1px solid rgba(255,255,255,0.09); }
.pf-need:first-of-type { border-top-color: rgba(255,255,255,0.18); }
.pf-need-t { font-size: clamp(13.5px, 1vw, 15.5px); font-weight: 500; margin: 0 0 7px; letter-spacing: -0.01em; }
.pf-need-p { font-size: clamp(12.5px, 0.92vw, 14px); font-weight: 300; color: rgba(255,255,255,0.58); margin: 0 0 9px; line-height: 1.5; }
.pf-need-a { font-size: clamp(12.5px, 0.92vw, 14px); font-weight: 300; line-height: 1.5; margin: 0; display: flex; gap: 8px; align-items: baseline; }
.pf-need-a i { font-style: normal; flex: none; }

/* ---------- numbered user flow ----------
   Named .pf-steps, not .pf-flow — that one is already the background canvas. */
/* One stage per row: the copy on the left, its recording on the right, with
   enough space between rows that the sequence reads as steps rather than a grid. */
.pf-stages { display: flex; flex-direction: column; gap: clamp(54px, 7.5vw, 104px); margin-top: clamp(38px, 5vw, 62px); }
.pf-stage { display: grid; grid-template-columns: 1fr clamp(132px, 30%, 300px); gap: clamp(22px, 4.5vw, 72px); align-items: center; }
.pf-stage-copy { display: flex; flex-direction: column; gap: clamp(24px, 3vw, 38px); }
/* a feature's copy starts level with the top of its screen */
.pf-stage.top { align-items: start; }
.pf-stage.top .pf-stage-copy { padding-top: 4px; }
.pf-step-n { margin: 0 0 10px; }
.pf-step-t { font-size: clamp(15px, 1.7vw, 19px); font-weight: 500; margin: 0 0 9px; letter-spacing: -0.02em; }
.pf-step-b { font-size: clamp(12.5px, 1.4vw, 14px); font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.6; margin: 0; }
/* The phone narrows rather than dropping under the copy — a stage should read
   as one row at almost every width. */
@media (max-width: 430px) {
  .pf-stage { grid-template-columns: 1fr; gap: 26px; }
  .pf-stage .pf-phone { max-width: 230px; margin-inline: auto; }
}

/* ---------- solution: a feature beside its recording ---------- */
.pf-sol { display: grid; grid-template-columns: repeat(auto-fit, minmax(196px, 1fr)); gap: clamp(20px, 3vw, 40px); margin-top: clamp(26px, 3.5vw, 40px); }
.pf-sol-t { font-size: clamp(13.5px, 1vw, 15.5px); font-weight: 500; margin: 15px 0 7px; letter-spacing: -0.01em; }
.pf-sol-b { font-size: clamp(12.5px, 0.92vw, 14px); font-weight: 300; color: rgba(255,255,255,0.58); line-height: 1.5; margin: 0; }

/* marks the tile as playable, mirrors .pf-zoom on the opposite corner */
.pf-playcue {
  position: absolute; right: 9px; top: 9px; width: 26px; height: 26px; border-radius: 999px;
  display: flex; align-items: center; justify-content: center; color: #fff;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(6px); pointer-events: none;
  box-shadow: 0 1px 6px rgba(0,0,0,0.4);
}

/* lightbox */
.pf-lb { position: fixed; inset: 0; z-index: 120; display: flex; align-items: center; justify-content: center;
         background: rgba(0,0,0,0.9); padding: 28px; cursor: zoom-out; animation: lbIn .25s ease both; }
@keyframes lbIn { from { opacity: 0 } to { opacity: 1 } }
.pf-lb img, .pf-lb video { max-width: 100%; max-height: 84vh; display: block; border-radius: 3px; animation: lbPop .45s cubic-bezier(.22,1,.36,1) both; }
@keyframes lbPop { from { transform: scale(.94); opacity: 0 } to { transform: none; opacity: 1 } }
.pf-lb-cap { position: absolute; left: 0; right: 0; bottom: 22px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.6); }
.pf-lb-x { position: absolute; top: 20px; right: 20px; width: 40px; height: 40px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.15);
           background: rgba(23,23,23,0.8); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }

/* ---------- section headings ---------- */
.pf-section-title { font-size: clamp(1.05rem, 2vw, 1.45rem); letter-spacing: -0.025em; font-weight: 500; color: #fff; margin: 0; }

/* ---------- about ---------- */
.pf-about { padding: clamp(56px, 9vw, 110px) 0 clamp(20px, 4vw, 40px); }
.pf-about .pf-cv-block { grid-template-columns: 1fr 2fr; gap: clamp(20px, 3.5vw, 56px); align-items: start; }
.pf-about-title { margin-bottom: clamp(18px, 2.4vw, 30px); }
.pf-about-left { display: flex; flex-direction: column; gap: 20px; }
.pf-portrait { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; display: block; border-radius: 3px; filter: saturate(0.92) contrast(1.02); }
.pf-about p.body { font-size: clamp(14.5px, 1.75vw, 17px); line-height: 1.68; color: rgba(255,255,255,0.78); margin: 0 0 18px; max-width: 66ch; }
.pf-about p.body:last-child { margin-bottom: 0; }

/* ---------- resume ---------- */
.pf-cv { padding: 0 0 clamp(64px, 10vw, 120px); }
.pf-cv-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; flex-wrap: wrap; margin-bottom: 34px; }
.pf-dl { font-size: 12px; color: rgba(255,255,255,0.8); display: inline-flex; align-items: center; gap: 8px; padding: 9px 18px; border-radius: 999px; transition: background .25s, color .25s; }
.pf-dl:hover { background: rgba(255,255,255,0.09); color: #fff; }
.pf-cv-block { display: grid; grid-template-columns: clamp(88px, 17vw, 190px) 1fr; gap: clamp(16px, 3vw, 34px); padding: clamp(20px, 3vw, 28px) 0; border-top: 1px solid rgba(255,255,255,0.11); }
.pf-cv-label { color: rgba(255,255,255,0.62); }
.pf-cv-item { margin-bottom: 22px; }
.pf-cv-item:last-child { margin-bottom: 0; }
.pf-cv-top { display: flex; justify-content: space-between; align-items: baseline; gap: 14px; flex-wrap: wrap; }
.pf-cv-role { font-size: clamp(15px, 1.9vw, 18px); letter-spacing: -0.015em; font-weight: 500; }
.pf-cv-year { font-size: 12px; color: rgba(255,255,255,0.45); white-space: nowrap; }
.pf-cv-org { font-size: 13px; color: #FF8A45; margin-top: 3px; }
.pf-cv-note { font-size: 13px; line-height: 1.55; color: rgba(255,255,255,0.55); margin-top: 8px; max-width: 62ch; }
.pf-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.pf-chip { font-size: 12px; color: rgba(255,255,255,0.72); padding: 7px 14px; border-radius: 999px; background: rgba(255,255,255,0.05); }

/* ---------- footer ---------- */
.pf-foot { position: relative; padding: 44px 0 64px; overflow: hidden; }
.pf-foot-mail { font-size: clamp(1.4rem, 4.6vw, 3rem); letter-spacing: -0.04em; display: inline-block; transition: opacity .2s; }
.pf-foot-mail:hover { opacity: 0.6; }
.pf-foot-row { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-top: 34px; font-size: 12px; color: rgba(255,255,255,0.45); }
.pf-avail { display: flex; align-items: center; }
.pf-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ADE80; margin-right: 8px; }

.pf-reveal { opacity: 0; transform: translateY(22px); transition: opacity .9s var(--ease), transform .9s var(--ease); }
.pf-reveal.in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .pf-reveal, .pf-card, .pf-canvas img, .pf-canvas video, .pf-chev { transition: none !important; }
  .pf-reveal, .pf-rise { opacity: 1; transform: none; animation: none; }
  .pf-ambient, .pf-scroll svg { animation: none; }
  .pf-flow { opacity: 0.55; }
  .pf-sheen, .pf-grain { display: none; }
  .pf-parallax { transition: none; }
  .pf-enter { animation: fadeIn .45s ease both; }
  .pf-exit { animation: fadeOut .45s ease both; }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes fadeOut { from { opacity: 1 } to { opacity: 0 } }
}

/* ------------------------------------------------------------------
   PHONES
   The case study is built on a two-column grid: a narrow label rail on
   the left, content on the right. Below ~760px that rail has nowhere to
   go — it collapses to about 92px, which is too narrow to set type in,
   so paragraphs rag badly and long words get pushed apart. Every one of
   those grids becomes a single column here, and the label sits above
   its content instead of beside it.
   ------------------------------------------------------------------ */
@media (max-width: 760px) {
  .pf-d-top,
  .pf-d-sec-grid,
  .pf-d-cols,
  .pf-d-meta { grid-template-columns: 1fr; }

  .pf-d-top { gap: 20px; align-items: start; }
  .pf-d-sec-grid { gap: 4px; }
  .pf-d-cols { gap: 26px; }
  .pf-d-meta { gap: 22px; }
  .pf-d-sec-label { margin-bottom: 10px; }

  /* The notes read as a compact two-up block rather than a tall stack,
     which is what left so much empty space beside the headline. */
  .pf-d-notes { flex-direction: row; flex-wrap: wrap; gap: 16px 24px; }
  .pf-d-notes > * { flex: 1 1 40%; min-width: 128px; }

  /* Comfortable measure and a slightly looser line for reading at arm's length. */
  .pf-d-cols p:not([class]), .pf-d-out p:not([class]), .pf-d-intro p:not([class]), .pf-d-sec p:not([class]) {
    line-height: 1.72;
  }
  .pf-d-headline { font-size: clamp(23px, 6.2vw, 30px); }
  /* The headline is written as one line per phrase; on a phone those
     phrases are free to run together and wrap naturally. */
  .pf-d-headline span { display: inline; }
}

/* Navigation. At 375px the bar wanted 424px of pill, so "Contact" fell off
   the end and the name broke onto a second line. Everything tightens until
   the whole bar fits, and the name is held on one line. */
@media (max-width: 560px) {
  .pf-nav { padding: 12px 10px; }
  .pf-nav-inner { gap: 7px; }
  .pf-brand { padding: 9px 13px; }
  .pf-brand-name { font-size: 12px; white-space: nowrap; }
  .pf-links { padding: 5px; gap: 0; }
  .pf-links a { font-size: 11.5px; padding: 6px 9px; white-space: nowrap; }
}
@media (max-width: 400px) {
  .pf-brand { padding: 8px 11px; }
  .pf-brand-name { font-size: 11.5px; }
  .pf-links a { font-size: 11px; padding: 6px 7px; }
}

/* Hero. The three headline lines are held on one line each at desktop
   sizes, which on a phone forced the type down to about 27px and left a
   large empty field around it. Here the lines may wrap, so the type can
   be set at a size that fills the space it is given. */
@media (max-width: 700px) {
  .pf-line { white-space: normal; }
  .pf-headline { font-size: clamp(2rem, 8.4vw, 3.4rem); line-height: 1.0; }
  .pf-hero-mid { gap: clamp(22px, 3.6vh, 36px); }
  .pf-roll { font-size: clamp(1.15rem, 5.6vw, 1.7rem); height: 1.45em; }
  .pf-desc-label { font-size: 13px; }
}

/* The flip-book shows a two-page spread only when its frame is landscape.
   In a phone-width frame it falls back to a single page, so the frame is
   rendered wide and scaled down to fit — both pages, just smaller. The
   sizing itself is measured in Flipbook, since it depends on the width the
   card actually gives it. */
.pf-d-embed-fit { position: relative; width: 100%; margin-top: 14px; }
`;

/* A flip-book only lays out as a two-page spread when its frame is landscape.
   A phone-width frame is portrait, so the book falls back to a single page and
   you see just the right-hand one. Instead the frame is built at a fixed
   landscape size — wide enough that the spread opens — and then scaled down to
   whatever width the card actually has. Both pages, simply smaller. Above the
   breakpoint nothing changes and the frame fills its box as before. */
const FLIP_W = 900;
const FLIP_H = 560;

function Flipbook({ src, title, height }) {
  const wrap = useRef(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (!w) return;
      setScale(window.innerWidth > 760 ? 0 : w / FLIP_W);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const shrunk = scale > 0;
  return (
    <div ref={wrap} className="pf-d-embed-fit">
      <iframe
        className="fp-iframe"
        title={title}
        src={src}
        scrolling="no"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        allow="autoplay; fullscreen; clipboard-write"
        style={
          /* zoom rather than transform: it re-lays the frame out at the smaller
             size, so taps land where they look like they should. A transform
             would only paint it smaller and leave hit-testing to the browser. */
          shrunk
            ? { border: 0, width: FLIP_W, height: FLIP_H, zoom: scale }
            : { border: 0, width: "100%", height }
        }
      />
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // threshold 0, not a fraction: the ratio is visible-area ÷ element-area, so
    // anything taller than 10x the viewport could never reach 0.1 and would sit
    // at opacity 0 forever — a tall open case study reads as a blank page.
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), {
      threshold: 0,
      rootMargin: "0px 0px -8% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`pf-reveal${seen ? " in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* Drifts the ambient wash gently against the cursor. The strand field does its
   own cursor tracking, so nothing here reports whether a pointer is present.
   Skipped on touch devices and when reduced motion is requested. */
function usePointerField(heroRef, washRef) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    let frame = 0;
    let target = { x: 0, y: 0 };

    const apply = () => {
      frame = 0;
      if (washRef.current) {
        const dx = (target.x / hero.offsetWidth - 0.5) * -26;
        const dy = (target.y / hero.offsetHeight - 0.5) * -26;
        washRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    };

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      target = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (washRef.current) washRef.current.style.transform = "translate3d(0,0,0)";
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [heroRef, washRef]);
}

function Roller({ items }) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setI((cur) => {
        setPrev(cur);
        return (cur + 1) % items.length;
      });
      setTick((t) => t + 1);
    }, ROLL_MS);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <span className="pf-roll" aria-live="polite">
      {prev !== null && (
        <span className="pf-roll-item pf-exit" key={`out-${tick}`} aria-hidden="true">{items[prev]}</span>
      )}
      <span className={`pf-roll-item${tick > 0 ? " pf-enter" : ""}`} key={`in-${tick}`}>{items[i]}</span>
    </span>
  );
}

function Placeholder({ color, ink }) {
  return (
    <svg viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="420" fill={color} />
      <g opacity="0.18" fill={ink}>
        <rect x="64" y="70" width="188" height="280" />
        <rect x="296" y="126" width="188" height="168" />
        <rect x="528" y="70" width="188" height="280" />
      </g>
      <g opacity="0.5" stroke={ink} strokeWidth="1.2" fill="none">
        <circle cx="390" cy="210" r="118" /><circle cx="390" cy="210" r="86" /><circle cx="390" cy="210" r="54" />
      </g>
      <text x="400" y="216" textAnchor="middle" fill={ink} opacity="0.72"
            style={{ font: "500 13px 'Readex Pro', sans-serif", letterSpacing: "0.1em" }}>
        Your image here
      </text>
    </svg>
  );
}

/* One continuous ribbon running down the whole document. Strand positions are
   computed in page space, so scrolling travels along the ribbon rather than
   moving it. Never starts or ends on screen. */
const STRANDS = 30;
const STEP = 24;             // sampling distance in page pixels
const GATHER_RADIUS = 360;   // how far the cursor's influence reaches
const GATHER_PULL = 0.34;    // how strongly strands are drawn in (0-1)
const FOLLOW = 0.075;        // easing on the cursor, so the wave lags gently

function FlowField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1, docH = 1;
    // cx/cy are the eased position the wave actually reacts to; tx/ty is the
    // raw cursor; on fades the whole effect in and out
    const pointer = { cx: 0, cy: 0, tx: -9999, ty: -9999, on: 0, want: 0 };
    let scrollTop = 0;
    let raf = 0;
    let t = 0;

    const measure = () => {
      dpr = 1;   // decorative blur — a retina buffer here quadrupled the fill cost
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = Math.floor(W * dpr);
      cv.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      docH = Math.max(document.documentElement.scrollHeight, H);
    };

    const onPointer = (e) => {
      if (pointer.want === 0) { pointer.cx = e.clientX; pointer.cy = e.clientY; }
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.want = 1;
    };
    const onLeave = () => { pointer.want = 0; };

    const onScroll = () => {
      scrollTop = window.scrollY;
      docH = Math.max(document.documentElement.scrollHeight, H);
    };

    // smooth 0->1 ramp, no hard corners
    const ease = (v) => {
      const c = Math.min(1, Math.max(0, v));
      return c * c * (3 - 2 * c);
    };

    /* Strength of the ribbon at a given page depth. It grows in over the first
       stretch of the page and thins away over the last, so neither end of the
       ribbon terminates abruptly. */
    const envelopeAt = (pageY) => {
      const inRamp = ease(pageY / (H * 0.75));
      const outRamp = ease((docH - pageY) / (H * 1.5));
      return inRamp * outRamp;
    };

    /* Horizontal centre of the ribbon at a given page depth. The band is wider
       than the viewport, so strands always overflow both edges — the densest
       core is what drifts. */
    const centreAt = (pageY) =>
      W * (0.4 + 0.2 * (pageY / docH)) +
      Math.sin(pageY / 700) * W * 0.13 +
      Math.sin(pageY / 1560 + 1.2) * W * 0.07;

    let lastDraw = 0;
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (now - lastDraw < 32) return;   // ~30fps is plenty for a slow drift
      lastDraw = now;
      ctx.clearRect(0, 0, W, H);
      if (!still) t += 0.0022;

      // ease the cursor position and the effect's strength
      if (pointer.tx > -9000) {
        pointer.cx += (pointer.tx - pointer.cx) * FOLLOW;
        pointer.cy += (pointer.ty - pointer.cy) * FOLLOW;
      }
      pointer.on += (pointer.want - pointer.on) * 0.06;

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      const band = W * 1.3;
      const from = scrollTop - 160;
      const to = scrollTop + H + 160;

      for (let s = 0; s < STRANDS; s++) {
        const u = s / (STRANDS - 1);
        const mid = 1 - Math.abs(u - 0.5) * 2;   // 1 at the core, 0 at the edges
        const offset = (u - 0.5) * band;
        const phase = u * 6.2;
        const amp = 26 + mid * 74;

        const pts = [];
        for (let pageY = from; pageY <= to; pageY += STEP) {
          let x =
            centreAt(pageY) +
            offset +
            Math.sin(pageY / 380 + phase + t * 2.1) * amp +
            Math.sin(pageY / 176 - phase * 0.6 + t * 1.3) * amp * 0.32;
          const y = pageY - scrollTop;

          if (pointer.on > 0.01) {
            const dx = x - pointer.cx;
            const dy = y - pointer.cy;
            const d = Math.hypot(dx, dy);
            if (d < GATHER_RADIUS) {
              const f = Math.pow(1 - d / GATHER_RADIUS, 2) * pointer.on;
              // draw the strand toward the cursor, so lines gather and the
              // additive blending does the brightening for us
              x += (pointer.cx - x) * f * GATHER_PULL;
            }
          }
          pts.push(x, y);
        }

        const trace = (rgb, a, width) => {
          // a vertical gradient carries the taper, so the strand fades along
          // its length rather than stopping
          const g = ctx.createLinearGradient(0, 0, 0, H);
          for (let k = 0; k <= 8; k++) {
            const y = (k / 8) * H;
            const e = envelopeAt(scrollTop + y);
            g.addColorStop(k / 8, `rgba(${rgb}, ${(a * e).toFixed(4)})`);
          }
          ctx.strokeStyle = g;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(pts[0], pts[1]);
          for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]);
          ctx.stroke();
        };

        // warm grey, barely tinted
        const tone = `${196 + Math.round(mid * 24)}, ${192 + Math.round(mid * 22)}, ${186 + Math.round(mid * 18)}`;

        trace(tone, 0.016 + mid * 0.034, 6 + mid * 7);   // halo
        trace(tone, 0.045 + mid * 0.115, 0.65 + mid * 0.5); // the line itself
      }

      ctx.globalCompositeOperation = "source-over";
    };

    measure();
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas className="pf-flow" ref={canvasRef} aria-hidden="true" />;
}

/* Smooth-scrolls to a section instead of jumping. */
/* One place that decides how the page travels, so every jump feels the same. */
function toTop() {
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
}

function goTo(e, id) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - 92;   // clear the nav
  window.scrollTo({ top, behavior: still ? "auto" : "smooth" });
}

function onCardMove(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--cx", `${e.clientX - r.left}px`);
  el.style.setProperty("--cy", `${e.clientY - r.top}px`);
}

/* Fixed film grain, using the feTurbulence approach from the Aura brief. */
/* Full-screen view for any collage tile. */
function Lightbox({ shot, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="pf-lb" onClick={onClose} role="dialog" aria-modal="true" aria-label={shot.caption || "Enlarged image"}>
      <button className="pf-lb-x" onClick={onClose} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
      {isVideo(shot.src)
        ? <video src={shot.src} muted loop playsInline autoPlay controls onClick={(e) => e.stopPropagation()} />
        : <img src={shot.src} alt={shot.caption || ""} onClick={(e) => e.stopPropagation()} />}
      {shot.caption ? <p className="pf-lb-cap">{shot.caption}</p> : null}
    </div>
  );
}

/* A media slot can hold a still or a clip; which one is decided by the file
   extension, so the project data never has to say. */
const VIDEO_RE = /\.(mp4|webm|mov|m4v)(\?|#|$)/i;
const isVideo = (src) => typeof src === "string" && VIDEO_RE.test(src);

/* Clips play only while they're on screen. Nine prototype recordings all
   autoplaying at once would fight over bandwidth and decoders, so each one
   waits its turn and pauses again once it scrolls away. */
function useInViewPlayback(ref, enabled) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const played = el.play();
          // a browser declining to autoplay is expected, not a failure
          if (played && played.catch) played.catch(() => {});
        } else {
          el.pause();
          el.muted = true;   // audio must not outlive the section it belongs to
        }
      },
      { threshold: 0.15, rootMargin: "40px 0px 40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled]);
}

/* Only one clip is ever audible. Starting a second stops the first, and a clip
   that scrolls out of view is muted as well as paused, so unmuted audio can
   never follow the reader down the page. */
function silenceOthers(me) {
  document.querySelectorAll("video").forEach((v) => {
    if (v !== me && !v.muted) { v.pause(); v.muted = true; }
  });
}

function Vid({ src, className, onError, controls }) {
  const ref = useRef(null);
  // With reduced motion asked for, nothing plays on its own — the clip gets
  // controls instead so it stays watchable on request.
  const [still] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useInViewPlayback(ref, !still);
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      controls={controls || still}
      onError={onError}
      onPlay={(e) => { if (!e.currentTarget.muted) silenceOthers(e.currentTarget); }}
    />
  );
}

/* Media that degrades to the placeholder graphic if the file can't load —
   so a blocked or broken path never shows as a black rectangle. */
function Img({ src, alt, color, ink, className }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <Placeholder color={color || "#D2504E"} ink={ink || "#2A0B0A"} />;
  if (isVideo(src)) return <Vid src={src} className={className} onError={() => setFailed(true)} />;
  return <img className={className} src={src} alt={alt || ""} onError={() => setFailed(true)} />;
}

/* A portrait screen recording shown in a handset shell. */
function Phone({ src, caption }) {
  return (
    <figure className="pf-phone">
      <div className="pf-phone-shell">
        <span className="pf-phone-btn l b1" aria-hidden="true" />
        <span className="pf-phone-btn l b2" aria-hidden="true" />
        <span className="pf-phone-btn l b3" aria-hidden="true" />
        <span className="pf-phone-btn r b4" aria-hidden="true" />
        <div className="pf-phone-screen">
          {isVideo(src) ? <Vid src={src} /> : <img src={src} alt={caption || ""} />}
        </div>
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/* A collage tile with the corner cue that marks it as enlargeable.
   Falls back to the placeholder graphic while a slot is still empty. */
const Tile = ({ shot, wide, tall, free, tone, onOpen }) => {
  const clip = isVideo(shot.src);
  return (
    <button className={`pf-tileimg${wide ? " wide" : ""}${tall ? " tall" : ""}${free ? " free" : ""}`} type="button"
            disabled={!shot.src}
            onClick={() => shot.src && onOpen(shot)}
            style={shot.src ? undefined : { cursor: "default" }}
            aria-label={shot.src
              ? `${clip ? "Play" : "Enlarge"} ${shot.caption || (clip ? "clip" : "image")}`
              : `${shot.caption || "Image"} (not added yet)`}>
      <Img src={shot.src} alt={shot.caption || ""}
           color={(tone && tone.color) || "#D2504E"} ink={(tone && tone.ink) || "#2A0B0A"} />
      {shot.src ? (
        <span className="pf-zoom" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 4 20 4 20 9" /><polyline points="9 20 4 20 4 15" />
            <line x1="20" y1="4" x2="13.5" y2="10.5" /><line x1="4" y1="20" x2="10.5" y2="13.5" />
          </svg>
        </span>
      ) : null}
      {clip ? (
        <span className="pf-playcue" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="7 4 20 12 7 20" /></svg>
        </span>
      ) : null}
    </button>
  );
};

/* Group layout: one piece sits in the rightmost column, three go in a row,
   four break into two and two — so every group fills the grid evenly. */
function gridCell(group, item) {
  if (item.span) return `span ${item.span}`;
  const n = group.items.length;
  if (n === 1) return "4 / span 3";
  const span = n === 2 || n === 4 ? 3 : 2;
  return `span ${span}`;
}

/* A clip in a gallery, with its own transport: play/pause, sound, and enlarge.
   Buttons sit alongside the video rather than wrapping it, so none of them ends
   up nested inside another button. */
function ClipTile({ shot, onOpen }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  useInViewPlayback(ref, true);

  const togglePlay = () => {
    const v = ref.current; if (!v) return;
    if (v.paused) { const q = v.play(); if (q && q.catch) q.catch(() => {}); } else v.pause();
  };
  const toggleSound = () => {
    const v = ref.current; if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) silenceOthers(v);
    setMuted(v.muted);
  };

  return (
    <div className="pf-cliptile">
      <video
        ref={ref} src={shot.src} muted loop playsInline preload="metadata"
        onPlay={(e) => { setPlaying(true); if (!e.currentTarget.muted) silenceOthers(e.currentTarget); }}
        onPause={() => setPlaying(false)}
      />
      <span className="pf-clipbar">
        <button type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
          {playing
            ? <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            : <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="7 4 20 12 7 20" /></svg>}
        </button>
        {shot.silent ? null : (
        <button type="button" onClick={toggleSound} aria-label={muted ? "Unmute" : "Mute"}>
          {muted
            ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="4 9 8 9 12 5 12 19 8 15 4 15" fill="currentColor" stroke="none" /><line x1="16" y1="9" x2="21" y2="15" /><line x1="21" y1="9" x2="16" y2="15" /></svg>
            : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="4 9 8 9 12 5 12 19 8 15 4 15" fill="currentColor" stroke="none" /><path d="M16 8.5a5 5 0 0 1 0 7" /></svg>}
        </button>
        )}
        <button type="button" onClick={() => onOpen(shot)} aria-label="Enlarge clip">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 4 20 4 20 9" /><polyline points="9 20 4 20 4 15" />
            <line x1="20" y1="4" x2="13.5" y2="10.5" /><line x1="4" y1="20" x2="10.5" y2="13.5" />
          </svg>
        </button>
      </span>
    </div>
  );
}

/* Binds the final two words with a non-breaking space so a paragraph can
   never end on a single word, however narrow the column gets. */
function noOrphan(text) {
  if (typeof text !== "string") return text;
  const t = text.trimEnd();
  const i = t.lastIndexOf(" ");
  return i === -1 ? t : t.slice(0, i) + "\u00A0" + t.slice(i + 1);
}

const P = ({ children, ...rest }) => <p {...rest}>{noOrphan(children)}</p>;

/* Measures the real text and works out where the lines should break, rather
   than leaving it to the browser. Always lands on three or four lines, with
   the lines evened out — which is what removes orphans at the source. */
const measureCanvas = typeof document !== "undefined" ? document.createElement("canvas") : null;

function widthsAt100(words) {
  const ctx = measureCanvas.getContext("2d");
  ctx.font = '500 100px "Readex Pro", system-ui, sans-serif';
  const w = (s) => ctx.measureText(s).width - 3.5 * s.length; // allow for -0.035em tracking
  const cache = new Map();
  return (a, b) => {
    const key = a + ":" + b;
    if (!cache.has(key)) cache.set(key, w(words.slice(a, b).join(" ")));
    return cache.get(key);
  };
}

/* Split words into exactly `lines` rows, keeping the rows as close to equal
   width as possible. */
function partition(words, lines, span) {
  const n = words.length;
  const target = span(0, n) / lines;
  const dp = Array.from({ length: lines + 1 }, () => new Array(n + 1).fill(Infinity));
  const from = Array.from({ length: lines + 1 }, () => new Array(n + 1).fill(0));
  dp[0][0] = 0;
  for (let l = 1; l <= lines; l++) {
    for (let i = l; i <= n; i++) {
      for (let j = l - 1; j < i; j++) {
        if (dp[l - 1][j] === Infinity) continue;
        const diff = span(j, i) - target;
        const cost = dp[l - 1][j] + diff * diff;
        if (cost < dp[l][i]) { dp[l][i] = cost; from[l][i] = j; }
      }
    }
  }
  const out = [];
  let i = n;
  for (let l = lines; l > 0; l--) {
    const j = from[l][i];
    out.unshift(words.slice(j, i).join(" "));
    i = j;
  }
  return out;
}

function BalancedHeadline({ text, color }) {
  const ref = useRef(null);
  const [set, setSet] = useState({ lines: [text], size: null });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !text || !measureCanvas) return;

    const run = () => {
      const W = el.clientWidth;
      if (!W) return;
      const words = text.split(/\s+/).filter(Boolean);
      if (words.length < 4) { setSet({ lines: [text], size: null }); return; }

      const span = widthsAt100(words);
      // mirrors clamp(21px, 3.5vw, 42px)
      const base = Math.min(42, Math.max(21, window.innerWidth * 0.035));

      let best = null;
      for (const l of [3, 4]) {
        if (words.length < l) continue;
        const rows = partition(words, l, span);
        const widest = Math.max(...rows.map((r) => {
          const ctx = measureCanvas.getContext("2d");
          ctx.font = '500 100px "Readex Pro", system-ui, sans-serif';
          return ctx.measureText(r).width - 3.5 * r.length;
        }));
        const fits = (W / widest) * 100;          // size at which the widest row fills the column
        const size = Math.min(base, fits * 0.995);
        if (!best || size > best.size + 0.5) best = { lines: rows, size };
        if (size >= base) break;                  // fits at full size, no need for more lines
      }
      if (best) setSet(best);
    };

    run();
    const ro = new ResizeObserver(run);
    ro.observe(el);
    // re-measure once the webfont has actually loaded
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
    return () => ro.disconnect();
  }, [text]);

  return (
    <p className="pf-d-headline" ref={ref} style={set.size ? { fontSize: `${set.size.toFixed(1)}px` } : undefined}>
      {set.lines.map((l, i) => <span key={i}>{l}</span>)}
    </p>
  );
}

/* A project card that flips in place. The front is the preview, the back is
   the case study. The wrapper's height animates between the two faces, so the
   list reflows around it and the other cards stay on screen. */
function ProjectCard({ p, open, onToggle }) {
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const boxRef = useRef(null);
  const [h, setH] = useState(null);
  const [ready, setReady] = useState(false);
  const [turning, setTurning] = useState(false);
  const [shot, setShot] = useState(null);
  const tiltRef = useRef(null);

  /* Gentle 3D tilt toward the cursor while the card is closed. Written straight
     to the node and coalesced into one frame — going through React state here
     re-rendered the entire case study on every pointer move. */
  const tiltFrame = useRef(0);
  const onTilt = (e) => {
    if (open || !tiltRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    if (tiltFrame.current) return;
    tiltFrame.current = requestAnimationFrame(() => {
      tiltFrame.current = 0;
      if (tiltRef.current) {
        tiltRef.current.style.transform =
          `rotateX(${(-ny * 5).toFixed(2)}deg) rotateY(${(nx * 6).toFixed(2)}deg)`;
      }
    });
  };
  const clearTilt = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  // flag the moment of the turn, so the card can lift while it moves
  useLayoutEffect(() => {
    setTurning(true);
    // decoding several clips while a 5000px card animates is what drops frames
    const box = boxRef.current;
    if (box) box.querySelectorAll("video").forEach((v) => v.pause());
    const id = setTimeout(() => setTurning(false), 940);
    return () => clearTimeout(id);
  }, [open]);

  const firstRun = useRef(true);
  useLayoutEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    const el = boxRef.current;
    if (!el) return;
    const NAV = 92;
    /* Hold the card's top under the nav for the whole turn. The page height
       changes continuously while the card opens or closes, so asserting the
       scroll at a few moments always left a case that landed wrong. Pinning it
       every frame is direction-independent and needs no guesses about timing. */
    let raf = 0;
    const startedAt = performance.now();
    const pin = (now) => {
      const top = el.getBoundingClientRect().top;
      if (Math.abs(top - NAV) > 0.5) window.scrollTo({ top: top + window.scrollY - NAV, behavior: "auto" });
      if (now - startedAt < 1150) raf = requestAnimationFrame(pin);
    };
    pin(startedAt);
    raf = requestAnimationFrame(pin);
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // The wrapper's height follows whichever face is showing, so the list reflows
  // around the card as it opens and closes.
  useLayoutEffect(() => {
    const measure = () => {
      const f = frontRef.current;
      const b = backRef.current;
      if (!f || !b) return;
      setH(open ? b.offsetHeight : f.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (frontRef.current) ro.observe(frontRef.current);
    if (backRef.current) ro.observe(backRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [open]);

  // let the first measurement land before transitions switch on
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onToggle(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onToggle]);

  // Some cards run a dark colour (Ikigai's plum), which is fine behind the hero
  // but unreadable as text on black — those projects carry a separate accent.
  const tone = p.accent || p.color;
  const d = p.detail;
  const notes = [
    p.year && { k: "Year", v: p.year },
    d && { k: "Tools", v: d.tools },
    d && { k: "Skills", v: d.skills },
    d && d.team && { k: "Team", v: d.team },
    d && d.client && { k: "Client", v: d.client },
    d && d.agency && { k: "Agency", v: d.agency },
  ].filter(Boolean);

  return (
    <div
      className="pf-flip-wrap"
      ref={boxRef}
      style={{ scrollMarginTop: 96 }}
      onPointerMove={onTilt}
      onPointerLeave={clearTilt}
    >
      <div className="pf-tilt" ref={tiltRef}>
        <div
          className={`pf-flip${open ? " open" : ""}${ready ? " ready" : ""}${turning ? " turning" : ""}${!open && !turning ? " clipped" : ""}`}
          style={{ height: h === null ? undefined : `${h}px` }}
        >
        {/* front — the preview */}
        <div className="pf-face pf-front" ref={frontRef} aria-hidden={open}>
          <button
            className="pf-card"
            type="button"
            style={{ background: p.color }}
            onPointerMove={onCardMove}
            onClick={onToggle}
            tabIndex={open ? -1 : 0}
            aria-label={`Open ${p.title} case study`}
          >
            <div className="pf-card-bar" style={{ background: p.color, color: p.ink }}>
              <span className="pf-card-title">{p.title}</span>
              <span className="meta"><span>{p.category}</span><span>{p.year}</span><Chevron dir="right" /></span>
            </div>
            <div className="pf-canvas">
              <div className="pf-canvas-in">
                <Img src={p.image} alt={p.title} color={p.color} ink={p.ink} />
              </div>
            </div>
            <span className="pf-sheen" aria-hidden="true" />
          </button>
        </div>

        {/* back — the case study */}
        <div className="pf-face pf-back" ref={backRef} aria-hidden={!open}>
          <div className="pf-d">
            <div
              className="pf-d-bar"
              style={{ background: p.color, color: p.ink }}
              onClick={onToggle}
              role="button"
              tabIndex={open ? 0 : -1}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
              aria-label="Close case study"
            >
              <span className="pf-d-bar-title">{p.title}</span>
              <span className="pf-d-close" aria-hidden="true"><Chevron dir="left" /></span>
            </div>

            <div className="pf-d-body">
              <div className="pf-d-top">
                <div className="pf-d-notes">
                  {notes.map((n) => (
                    <div key={n.k}>
                      <p className="pf-d-note-k">{n.k}</p>
                      <P className="pf-d-note-v" style={{ color: tone }}>{n.v}</P>
                    </div>
                  ))}
                </div>
                {d
                  ? <BalancedHeadline text={d.headline} />
                  : <p className="pf-d-headline"><span>Case study coming soon.</span></p>}
              </div>

              <div className="pf-d-hero">
                <Img src={p.image} alt={p.title} color={p.color} ink={p.ink} />
              </div>

              {d ? (
                <>
                  {d.challenge && (
                    <div className="pf-d-cols">
                      <div>
                        <h3 className="pf-d-h3" style={{ color: tone }}>{d.challengeLabel || "The Challenge"}</h3>
                        {d.challenge.map((t, n) => <P key={n}>{t}</P>)}
                      </div>
                      <div>
                        <h3 className="pf-d-h3" style={{ color: tone }}>Design Approach</h3>
                        {(d.approach || []).map((t, n) => <P key={n}>{t}</P>)}
                      </div>
                    </div>
                  )}
                  {d.intro && <div className="pf-d-intro">{d.intro.map((t, n) => <P key={n}>{t}</P>)}</div>}

                  {d.embed && (
                    <div className="pf-d-embed">
                      <div className="pf-d-embed-head">
                        <h3 className="pf-d-h3" style={{ color: tone }}>{d.embed.label}</h3>
                        <a className="pf-d-embed-out" href={d.embed.src} target="_blank" rel="noreferrer">
                          Open in new tab
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="6" y1="18" x2="18" y2="6" /><polyline points="9 6 18 6 18 15" />
                          </svg>
                        </a>
                      </div>
                      {/* only mounted once the card is open, so the flip-book
                          isn't fetched for every visitor on page load */}
                      {open ? (
                        <Flipbook src={d.embed.src} title={`${p.title} flipbook`} height={d.embed.height || 600} />
                      ) : (
                        <div style={{ width: "100%", height: d.embed.height || 600, background: "#111", borderRadius: 3 }} />
                      )}
                    </div>
                  )}

                  {(d.meta || []).length > 0 && (
                    <div className="pf-d-meta">
                      {d.meta.map((m) => (
                        <div key={m.label}>
                          <p className="pf-d-note-k">{m.label}</p>
                          <P className="pf-d-note-v" style={{ color: tone }}>{m.value}</P>
                        </div>
                      ))}
                    </div>
                  )}

                  {d.story && (
                    <div className="pf-d-sec">
                      <div className="pf-d-sec-grid">
                        <div>
                          <p className="pf-d-sec-label">{d.story.label}</p>
                          <div className="pf-d-side">
                            {(d.story.facts || []).map((f) => (
                              <div key={f.k}>
                                <p className="pf-d-note-k">{f.k}</p>
                                <P className="pf-d-note-v" style={{ color: tone }}>{f.v}</P>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          {(d.story.body || []).map((t, n) => <P key={n}>{t}</P>)}
                        </div>
                      </div>
                      <figure className="pf-d-figure">
                        <Tile shot={{ src: d.story.image, caption: d.story.caption }} wide free tone={p} onOpen={setShot} />
                        <figcaption className="pf-d-cap">{d.story.caption}</figcaption>
                      </figure>
                    </div>
                  )}

                  {d.iterations && (
                    <div className="pf-d-sec">
                      <div className="pf-d-sec-grid">
                        <div>
                          <p className="pf-d-sec-label">{d.iterations.label}</p>
                          <div className="pf-d-side">
                            {(d.iterations.attributes || []).map((f) => (
                              <div key={f.k}>
                                <p className="pf-d-note-k">{f.k}</p>
                                <P className="pf-d-note-v" style={{ color: tone }}>{f.v}</P>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          {(d.iterations.body || []).map((t, n) => <P key={n}>{t}</P>)}
                        </div>
                      </div>
                      <figure className="pf-d-figure">
                        <Tile shot={{ src: d.iterations.image, caption: d.iterations.caption }} wide free tone={p} onOpen={setShot} />
                        <figcaption className="pf-d-cap">{d.iterations.caption}</figcaption>
                      </figure>
                    </div>
                  )}

                  {d.logos && (
                    <div className="pf-d-sec">
                      <div className="pf-d-sec-grid">
                        <div>
                          <p className="pf-d-sec-label">{d.logos.label}</p>
                          <div className="pf-swatches" style={{ flexDirection: "column", marginTop: 0 }}>
                            {d.logos.palette.map((c) => (
                              <span className="pf-swatch" key={c.hex}>
                                <i style={{ background: c.hex }} /><b>{c.hex}</b>
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          {d.logos.body.map((t, n) => <P key={n}>{t}</P>)}
                        </div>
                      </div>
                      <div className="pf-d-marks">
                        {d.logos.marks.map((m) => (
                          <figure key={m.caption} style={{ margin: 0 }}>
                            <Tile shot={m} free tone={p} onOpen={setShot} />
                            <figcaption className="pf-d-cap">{m.caption}</figcaption>
                          </figure>
                        ))}
                      </div>
                    </div>
                  )}

                  {d.collage && (
                    <div className="pf-d-sec">
                      {(Array.isArray(d.collage) ? d.collage : [d.collage]).map((g, gi) => (
                        <div className={`pf-collage-group${g.wide ? " wide" : ""}`} key={g.label || gi}>
                          <div className="pf-group-copy">
                            <p className="pf-d-sec-label">{g.label}</p>
                            {(g.body || []).map((t, n) => <P className="pf-group-b" key={n}>{t}</P>)}
                          </div>
                          <div className="pf-collage">
                            {g.items.map((it) => (
                              <div key={it.src} style={{ gridColumn: gridCell(g, it) }}>
                                {isVideo(it.src)
                                  ? <ClipTile shot={it} onOpen={setShot} />
                                  : <Tile shot={it} tone={p} onOpen={setShot} />}
                                {it.caption ? <p className="pf-d-cap">{it.caption}</p> : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {d.research && (
                    <div className="pf-d-sec">
                      <div className="pf-d-sec-grid">
                        <div><p className="pf-d-sec-label">{d.research.label}</p></div>
                        <div>{d.research.body.map((t, n) => <P key={n}>{t}</P>)}</div>
                      </div>
                      {d.research.stats && (
                        <div className="pf-stats">
                          {d.research.stats.map((s) => (
                            <div className="pf-stat" key={s.value}>
                              <p className="pf-stat-v" style={{ color: tone }}>{s.value}</p>
                              <P className="pf-stat-l">{s.label}</P>
                            </div>
                          ))}
                        </div>
                      )}
                      {d.research.insight && (
                        <div className="pf-insight">
                          <p className="pf-d-note-k">Key insight</p>
                          <P className="pf-ins-body">{d.research.insight}</P>
                        </div>
                      )}
                    </div>
                  )}

                  {d.needs && (
                    <div className="pf-d-sec">
                      <div className="pf-d-sec-grid">
                        <div><p className="pf-d-sec-label">{d.needs.label}</p></div>
                        <div>{(d.needs.body || []).map((t, n) => <P key={n}>{t}</P>)}</div>
                      </div>
                      <div className="pf-needs">
                        {d.needs.groups.map((g) => (
                          <div key={g.title}>
                            <p className="pf-d-note-k">{g.title}</p>
                            {g.items.map((it) => (
                              <div className="pf-need" key={it.title}>
                                <p className="pf-need-t">{it.title}</p>
                                {it.problem ? <P className="pf-need-p">{it.problem}</P> : null}
                                <p className="pf-need-a">
                                  <i style={{ color: tone }} aria-hidden="true">→</i>
                                  <span>{it.answer}</span>
                                </p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      {d.needs.combined && (
                        <div className="pf-insight">
                          <p className="pf-d-note-k">{d.needs.combined.title}</p>
                          {d.needs.combined.body.map((t, n) => <P className="pf-ins-body" key={n}>{t}</P>)}
                        </div>
                      )}
                      {d.needs.image && (
                        <figure className="pf-d-figure">
                          <Tile shot={{ src: d.needs.image, caption: d.needs.caption }} wide free tone={p} onOpen={setShot} />
                          {d.needs.caption ? <figcaption className="pf-d-cap">{d.needs.caption}</figcaption> : null}
                        </figure>
                      )}
                    </div>
                  )}

                  {d.flow && (
                    <div className="pf-d-sec">
                      <div className="pf-d-sec-grid">
                        <div><p className="pf-d-sec-label">{d.flow.label}</p></div>
                        <div>{(d.flow.body || []).map((t, n) => <P key={n}>{t}</P>)}</div>
                      </div>
                      <div className="pf-stages">
                        {d.flow.rows.map((row) => (
                          <div className="pf-stage top" key={row.caption}>
                            <div className="pf-stage-copy">
                              {row.steps.map((s) => (
                                <div key={s.title}>
                                  <p className="pf-step-n" style={{ color: tone }}>{String(s.n).padStart(2, "0")}</p>
                                  <p className="pf-step-t">{s.title}</p>
                                  <P className="pf-step-b">{s.body}</P>
                                </div>
                              ))}
                            </div>
                            <Phone src={row.src} caption={row.caption} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {d.reels && (
                    <div className="pf-d-sec">
                      <div className="pf-d-sec-grid">
                        <div><p className="pf-d-sec-label">{d.reels.label}</p></div>
                        <div>{(d.reels.body || []).map((t, n) => <P key={n}>{t}</P>)}</div>
                      </div>
                      <div className="pf-reels">
                        {d.reels.items.map((it) => (
                          <div className="pf-reel-item" key={it.title}>
                            <p className="pf-step-n" style={{ color: tone }}>{it.kicker}</p>
                            <p className="pf-step-t">{it.title}</p>
                            <P className="pf-reel-b">{it.body}</P>
                            <div className="pf-reel"><Vid src={it.src} controls /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {d.solution && (
                    <div className="pf-d-sec">
                      <div className="pf-d-sec-grid">
                        <div><p className="pf-d-sec-label">{d.solution.label}</p></div>
                        <div>{(d.solution.body || []).map((t, n) => <P key={n}>{t}</P>)}</div>
                      </div>
                      {d.solution.image && (
                        <div className="pf-figure-aside">
                          <Tile shot={{ src: d.solution.image, caption: d.solution.caption }} wide free tone={p} onOpen={setShot} />
                          {d.solution.caption ? (
                            <div>
                              <p className="pf-d-note-k">Outcome</p>
                              <P className="pf-aside-b">{d.solution.caption}</P>
                            </div>
                          ) : null}
                        </div>
                      )}
                      <div className="pf-stages">
                        {d.solution.items.map((it, si) => (
                          <div className="pf-stage top" key={it.title}>
                            <div className="pf-stage-copy">
                              <div>
                                <p className="pf-step-n" style={{ color: tone }}>
                                  {String(it.n || si + 1).padStart(2, "0")}{it.kicker ? ` · ${it.kicker}` : ""}
                                </p>
                                <p className="pf-step-t">{it.title}</p>
                                <P className="pf-step-b">{it.body}</P>
                              </div>
                            </div>
                            <Phone src={it.src} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {d.outcomes && (
                    <div className="pf-d-sec pf-d-out">
                      <div className="pf-d-sec-grid">
                        <div><p className="pf-d-sec-label">Outcomes</p></div>
                        <div>{d.outcomes.map((t, n) => <P key={n}>{t}</P>)}</div>
                      </div>
                    </div>
                  )}

                  {(d.shots || []).length > 0 && (
                    <div className="pf-d-shots">
                      {(d.shots || []).map((src, n) => (
                        <div className="pf-d-shot" key={n}><Img src={src} alt={`${p.title} ${n + 1}`} color={p.color} ink={p.ink} /></div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="pf-d-soon">The write-up for this project isn't ready yet.</p>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
      {shot ? <Lightbox shot={shot} onClose={() => setShot(null)} /> : null}
    </div>
  );
}

function CvBlock({ label, items }) {
  return (
    <Reveal>
      <div className="pf-cv-block">
        <div className="pf-cv-label">{label}</div>
        <div>
          {items.map((e) => (
            <div className="pf-cv-item" key={e.role + e.year}>
              <div className="pf-cv-top">
                <span className="pf-cv-role">{e.role}</span>
                <span className="pf-cv-year">{e.year}</span>
              </div>
              {e.org ? <div className="pf-cv-org">{e.org}</div> : null}
              {e.note ? <P className="pf-cv-note">{e.note}</P> : null}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* Tracks which section the reader is in, so the nav can mark it. Uses the
   section nearest the top of the viewport rather than raw intersection, so
   short sections and tall ones behave the same. */
function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    let frame = 0;
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; pick(); }); };
    const pick = () => {
      const line = window.innerHeight * 0.32;   // just under the nav
      let best = "", bestTop = -Infinity;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > bestTop) { bestTop = top; best = id; }
      });
      // past the end of the page the last section wins, whatever the maths says
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) best = ids[ids.length - 1];
      setActive(best);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);
  return active;
}

/* A quiet index of the kinds of work in the list. Consecutive projects sharing
   a category collapse into one entry, and the entry lights as you reach it. */
function CategoryRail({ projects }) {
  const groups = [];
  projects.forEach((p, i) => {
    const last = groups[groups.length - 1];
    if (last && last.category === p.category) last.count += 1;
    else groups.push({ category: p.category, index: i, count: 1 });
  });

  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const cards = document.querySelectorAll(".pf-flip-wrap");
      const line = window.innerHeight * 0.4;
      let current = 0;
      cards.forEach((el, i) => { if (el.getBoundingClientRect().top <= line) current = i; });
      let g = 0;
      groups.forEach((grp, gi) => { if (current >= grp.index) g = gi; });
      setActive(g);
      const work = document.getElementById("work");
      if (work) {
        const r = work.getBoundingClientRect();
        setShow(r.top < window.innerHeight * 0.5 && r.bottom > 160);
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [projects.length]);

  const jump = (i) => {
    const el = document.querySelectorAll(".pf-flip-wrap")[i];
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top, behavior: still ? "auto" : "smooth" });
  };

  return (
    <nav className={`pf-rail${show ? " on" : ""}`} aria-label="Project categories">
      {groups.map((g, i) => (
        <button key={g.category} type="button" onClick={() => jump(g.index)}
                className={i === active ? "on" : undefined}
                aria-current={i === active ? "true" : undefined}
                tabIndex={show ? 0 : -1}>
          <i aria-hidden="true" />
          <span>{g.category}</span>
        </button>
      ))}
    </nav>
  );
}

/* A quiet way back to the top, once there's something to go back up past. */
function ToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let frame = 0;
    const check = () => { frame = 0; setShow(window.scrollY > window.innerHeight * 0.9); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);
  return (
    <button className={`pf-totop${show ? " on" : ""}`} onClick={toTop} aria-label="Back to top" tabIndex={show ? 0 : -1}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
           strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="19" x2="12" y2="6" /><polyline points="6 12 12 6 18 12" />
      </svg>
    </button>
  );
}

const Grain = () => (
  <svg className="pf-grain" width="100%" height="100%" aria-hidden="true">
    <filter id="pf-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#pf-noise)" />
  </svg>
);

/* Tail-less chevron. Points right to open, left to close. */
const Chevron = ({ dir = "right" }) => (
  <svg className={`pf-chev pf-chev-${dir}`} width="17" height="17" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === "right"
      ? <polyline points="9 5 16 12 9 19" />
      : <polyline points="15 5 8 12 15 19" />}
  </svg>
);

const NAV = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];
const NAV_IDS = NAV.map((n) => n.id);

export default function Portfolio() {
  const active = useActiveSection(NAV_IDS);
  const heroRef = useRef(null);
  const washRef = useRef(null);
  usePointerField(heroRef, washRef);
  const [open, setOpen] = useState(null);

  return (
    <div className="pf">
      <style>{CSS}</style>
      <FlowField />
      <Grain />
      <ToTop />
      <CategoryRail projects={PROJECTS} />

      <header className="pf-nav pf-rise" style={{ animationDelay: "80ms" }}>
        <nav className="pf-nav-inner" aria-label="Main">
          <button
            className="pf-pill pf-glass pf-brand"
            type="button"
            onClick={toTop}
            aria-label="Back to top"
          >
            <span className="pf-brand-name">{YOUR_NAME}</span>
          </button>
          <div className="pf-pill pf-glass pf-links">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e) => goTo(e, n.id)}
                 className={active === n.id ? "on" : undefined}
                 aria-current={active === n.id ? "true" : undefined}>
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section className="pf-hero" ref={heroRef}>
        <div className="pf-hero-media" aria-hidden="true">
          {HERO_VIDEO
            ? <video src={HERO_VIDEO} autoPlay loop muted playsInline />
            : <div className="pf-parallax" ref={washRef}><div className="pf-ambient" /></div>}
        </div>
        <div className="pf-scrim" aria-hidden="true" />

        <div className="pf-hero-inner">
          <div className="pf-hero-mid">
            <h1 className="pf-headline">
              {BIG_LINES.map((line, n) => (
                <span className="pf-line pf-rise" key={line} style={{ animationDelay: `${200 + n * 120}ms` }}>
                  {line}
                </span>
              ))}
            </h1>

            <div className="pf-desc pf-rise" style={{ animationDelay: "580ms" }}>
              <p className="pf-desc-label">With a focus on</p>
              <Roller items={ROTATING} />
            </div>
          </div>

          <div className="pf-hero-foot pf-rise" style={{ animationDelay: "820ms" }}>
            <a className="pf-scroll" href="#work" onClick={(e) => goTo(e, "work")}>
              <svg width="13" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="4" x2="12" y2="19" /><polyline points="6 13 12 19 18 13" />
              </svg>
              <span>Scroll for work</span>
            </a>
            <div className="pf-place">{LOCATION}</div>
          </div>
        </div>
      </section>

      <main className="pf-shell">
        <section className="pf-work" id="work">
          <Reveal>
            <div className="pf-work-head">
              <h2 className="pf-section-title">Work</h2>
            </div>
          </Reveal>

          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <ProjectCard
                p={p}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </Reveal>
          ))}
        </section>

        <section className="pf-about" id="about">
          <Reveal>
            <h2 className="pf-section-title pf-about-title">About me</h2>
            <div className="pf-cv-block" style={{ borderTop: "none" }}>
              <div className="pf-about-left">
                <Img className="pf-portrait" src={PORTRAIT} alt="Nidhi Joseph" color="#2A2422" ink="#0E0C0B" />
              </div>
              <div>
                {ABOUT.map((t, i) => <P className="body" key={i}>{t}</P>)}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="pf-cv" id="resume">
          <Reveal>
            <div className="pf-cv-head">
              <h2 className="pf-section-title">Resume</h2>

            </div>
          </Reveal>

          <CvBlock label="Professional experience" items={RESUME.experience} />
          <CvBlock label="Part-time experience" items={RESUME.partTime} />
          <CvBlock label="Volunteering" items={RESUME.volunteering} />
          <CvBlock label="Education" items={RESUME.education} />
          <CvBlock label="Certifications" items={RESUME.certifications} />

          <Reveal>
            <div className="pf-cv-block">
              <div className="pf-cv-label">Strengths</div>
              <div className="pf-chips">
                {STRENGTHS.map((s) => <span className="pf-chip" key={s}>{s}</span>)}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="pf-cv-block">
              <div className="pf-cv-label">Design skills</div>
              <div className="pf-chips">
                {RESUME.skills.map((s) => <span className="pf-chip" key={s}>{s}</span>)}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="pf-cv-block">
              <div className="pf-cv-label">Software</div>
              <div className="pf-chips">
                {RESUME.software.map((s) => <span className="pf-chip" key={s}>{s}</span>)}
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="pf-foot" id="contact">
          <div className="pf-glow" aria-hidden="true" />
          <Reveal>
            <h2 className="pf-section-title" style={{ marginBottom: 22 }}>Let’s work together</h2>
            <a className="pf-foot-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <div className="pf-foot-row">
              <span className="pf-avail"><i className="pf-dot" />Available for work</span>
              <span>{YOUR_NAME} · {LOCATION}</span>
              <span>© 2026</span>
            </div>
          </Reveal>
        </footer>
      </main>
    </div>
  );
}