// src/data/houseSignifications.js

export const HOUSE_SIGNIFICATIONS = {
    1: "Self, personality, physical body, appearance, health, vitality, general well-being. This is how you show up in the world.",
    2: "Wealth, family, speech, food, accumulated resources, values, early childhood. This is how you build comfort and security.",
    3: "Siblings, courage, communication, short travels, skills, efforts, neighbors. This is how you learn, try, and express yourself.",
    4: "Mother, home, land, property, vehicles, education, inner peace, happiness. This is where you seek emotional safety.",
    5: "Children, creativity, intelligence, education, romance, speculation, past life merit. This is how you play, create, and fall in love.",
    6: "Enemies, diseases, debts, obstacles, service, daily work, maternal relatives. This is how you handle problems and duties.",
    7: "Spouse, marriage, partnerships, business relationships, foreign travels, public life. This is how you meet and commit to others.",
    8: "Longevity, transformation, secrets, inheritance, occult, sudden events, research. This is where life pushes you to transform deeply.",
    9: "Father, guru, dharma, religion, fortune, higher learning, long journeys, spirituality. This is how you search for meaning and faith.",
    10: "Career, reputation, authority, father, public image, achievements, government. This is where you are seen in the outer world.",
    11: "Gains, income, friends, elder siblings, desires, large networks, aspirations. This is how your wishes and rewards show up.",
    12: "Losses, expenses, foreign lands, isolation, spirituality, moksha, hidden enemies. This is where you let go and go inward."
};


export const RASHI_LORDS = {
    "Aries": "Mars",
    "Taurus": "Venus",
    "Gemini": "Mercury",
    "Cancer": "Moon",
    "Leo": "Sun",
    "Virgo": "Mercury",
    "Libra": "Venus",
    "Scorpio": "Mars",
    "Sagittarius": "Jupiter",
    "Capricorn": "Saturn",
    "Aquarius": "Saturn",
    "Pisces": "Jupiter"
};

export const getHouseSignification = (houseNumber) => {
    return HOUSE_SIGNIFICATIONS[houseNumber] || "Unknown house";
};

export const getRashiLord = (rashiName) => {
    return RASHI_LORDS[rashiName] || "Unknown";
};
