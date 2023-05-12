const mockUser1 = {
  "data": {
    "user": {
      "id": "123",
      "name": "Azhar Zoya",
      "email": "email@email.com",
      "dreams": [
        {
          "id": "0",
          "date": "01/01/2023",
          "title": "Dream Title",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "emotions": [
              "Happy",
              "Sad",
              "Afraid"
          ],
          "tags": [
              "Adventure",
              "The Beach",
              "Hot Air Balloon"
          ],
          "lucidityLevel": 3
        },
        {
          "id": "1",
          "date": "02/02/2023",
          "title": "Dream Title",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "emotions": [
              "Scared"
          ],
          "tags": [
              "Clowns",
              "Monsters"
          ],
          "lucidityLevel": 0
        }
      ]
    }
  }
};

const mockUser2 = {
  "data": {
    "user": {
        "id": "456",
        "name": "Clementia Samir",
        "email": "anotheremail@email.com",
        "dreams": []
    }
  }
};

const mockEmotions = {
  "data": {
    "emotions": [
      "Happy",
      "Sad",
      "Angry",
      "Scared",
      "Excited",
      "Confused",
      "Relaxed",
      "Hopeful",
      "Content",
      "Anxious",
      "Curious",
      "Overwhelmed",
      "Frustrated",
      "Nostalgic",
      "Empathetic",
      "Contentment",
      "Enthusiasm",
      "Boredom",
      "Confused",
      "Inspired",
      "Grateful",
      "Miserable"
    ]
  }
};

const mockTags = {
  "data": {
    "tags": [
      "Flying",
      "Falling",
      "Being chased",
      "Being lost",
      "Being late",
      "Losing teeth",
      "Being naked",
      "Being in school",
      "Being at work",
      "Being in a car accident",
      "Being in a fire",
      "Being in water",
      "Tornadoes",
      "Meeting someone famous",
      "Seeing a deceased loved one",
      "Being in a strange place",
      "Nature",
      "Science Fiction",
      "Travel",
      "Relationships",
      "Self-discovery",
      "Nightmares",
      "Night Terrors",
      "Food",
      "Music",
      "Supernatural",
      "Sleep Paralysis",
      "Dreams within Dreams"
    ]
  }
};

export { mockUser1, mockUser2, mockEmotions, mockTags };