/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold
  } = require('@google/generative-ai')
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
  const genAI = new GoogleGenerativeAI(apiKey)
  
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash'
  })
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json'
  }
  
  export const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'Create kids story on description for 5-8 year kids, educational story with nice moral lesson. and all images in paper cut style: story of boy and magic school, give me 5 chapter, with detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format.'
          }
        ]
      },
      {
        role: 'model',
        parts: [
          {
            text: '```json\n{\n  "story_cover": {\n    "image_prompt": "A paper cut style illustration of a boy with bright, curious eyes, wearing a backpack with stars and a book sticking out. Behind him, a whimsical, magical school with swirling clouds and a rainbow archway. The title of the book is \'The Boy and the Magic School\' written in a playful, handwritten font.",\n    "description": "The cover shows a boy with a curious look on his face, ready to embark on an adventure. He\'s holding a book about magic, which makes it clear that this is going to be a magical story. In the background, a colorful, magical school with swirling clouds and a rainbow archway awaits."\n  },\n  "chapters": [\n    {\n      "chapter_title": "A Curious Boy",\n      "image_prompt": "A paper cut style illustration of a boy sitting in his room, surrounded by books and a telescope pointing at the night sky. He has a book in his hand, open to a page with a picture of a magical castle.",\n      "description": "The boy, Toby, is shown sitting in his room, surrounded by books. He\'s fascinated by magic and loves reading about it. The image of the magical castle in his book sparks his imagination and makes him dream of attending a school of magic.",\n      "text": "Toby loved books. He loved learning about everything, especially magic. Every night, he would gaze at the stars through his telescope, dreaming of a world filled with wonder and spells. One day, he found a dusty old book about a school of magic hidden in his attic.  The book spoke of a hidden school, nestled amidst clouds, where students learned to conjure rainbows and talk to animals. Toby knew he had to find this school, and he had to go!"\n    },\n    {\n      "chapter_title": "The Magic Key",\n      "image_prompt": "A paper cut style illustration of Toby standing in front of a shimmering, magical door. He\'s holding a key with a glowing star on it. Behind him, a path of shimmering stars leads towards the door.",\n      "description": "Toby stands before a magical door that shimmers with an enchanting glow. He\'s holding a key with a glowing star, which is the key to unlocking the magic school. The path leading towards the door is made of shimmering stars, symbolizing the magical journey he\'s about to embark on.",\n      "text": "Toby spent days searching for the magic school. He followed clues from the old book, which led him to a hidden clearing in the woods. In the center of the clearing, a door shimmered like a thousand stars. It was the entrance to the magic school!  The book mentioned a key, a key shaped like a star, and Toby realized he had one, a small, forgotten gift from his grandmother. It fit perfectly into the lock on the door. With a click, the door swung open."\n    },\n    {\n      "chapter_title": "Inside the Magic School",\n      "image_prompt": "A paper cut style illustration of a magical classroom filled with students from different fantastical creatures. A wizard with a long white beard is teaching them about magic spells. The classroom is decorated with floating books, stars, and a magical chalkboard.",\n      "description": "This image shows a magical classroom where students from various fantastical creatures are learning magic. The wizard teaching them has a long, white beard and is pointing at a magical chalkboard filled with swirling symbols. The classroom itself is adorned with floating books, stars, and other magical elements.",\n      "text": "Toby stepped inside the school and gasped. The walls were made of sparkling crystals, and magical creatures were everywhere. There were fairies with shimmering wings, friendly goblins, and even a wise old owl. A kind-looking wizard with a long white beard greeted Toby. He explained that the school was meant for children with special gifts, and Toby was chosen because of his love for learning and his kind heart.  The wizard led Toby to the classroom, where other children were learning about spells and potions. Toby couldn\'t wait to learn magic too!"\n    },\n    {\n      "chapter_title": "Learning to Fly",\n      "image_prompt": "A paper cut style illustration of Toby trying to fly on a magic broom. He\'s giggling and having a lot of fun, but the broom is wobbling a bit. In the background, other children are soaring through the air, giggling and waving at Toby.",\n      "description": "Toby is shown trying to fly on a magic broom, giggling and enjoying the experience. He\'s still learning, and the broom is a bit wobbly, but he\'s having a blast. In the background, other students are soaring through the air, showing Toby how it\'s done.",\n      "text": "At the magic school, Toby learned all sorts of wonderful things. He learned how to make flowers bloom with a snap of his fingers, how to talk to animals, and even how to fly on a magic broom.  It wasn\'t easy at first. Toby kept bumping into things and falling off the broom. But with practice and encouragement from his classmates, he got the hang of it.  The feeling of flying through the air with the wind in his hair was amazing! Toby knew he had found a place where he truly belonged."\n    },\n    {\n      "chapter_title": "The Power of Kindness",\n      "image_prompt": "A paper cut style illustration of Toby using a magic spell to help a lost puppy find its way home. The puppy is wagging its tail happily, and Toby is smiling with pride.  In the background, a worried-looking family is searching for their lost puppy.",\n      "description": "This image shows Toby using a magic spell to help a lost puppy find its way home. The puppy is wagging its tail happily, and Toby is smiling with pride.  In the background, a worried-looking family is searching for their lost puppy, highlighting the kindness and helpfulness of Toby.",\n      "text": "One day, Toby found a lost puppy wandering around the school. The puppy was scared and alone.  Toby knew he had to help. He remembered a spell he had learned that could help him find the puppy\'s home.  With a whisper of the magic words, Toby created a trail of glowing flowers leading to the puppy\'s house. The puppy followed the flowers, wagging its tail happily, until it found its family.  The family was overjoyed to see their puppy again, and they thanked Toby for his kindness.  Toby realized that magic wasn\'t just about spells and potions, it was about using his skills to help others. That was the real magic!"\n    }\n  ]\n}\n```'
          }
        ]
      }
    ]
  })
  