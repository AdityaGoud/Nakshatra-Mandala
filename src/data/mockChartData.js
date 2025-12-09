// src/data/mockChartData.js

export const MOCK_CHART_DATA = {
    statusCode: 200,
    output: {
        Ascendant: {
            current_sign: 5,
            fullDegree: 124.88125403997319,
            normDegree: 4.881254039973186,
            isRetro: "false",
            degrees: 4,
            minutes: 52,
            seconds: 52.514543903469075,
            house_number: 1,
            localized_name: "Ascendant",
            zodiac_sign_name: "Leo",
            zodiac_sign_lord: "Sun",
            nakshatra_number: 10,
            nakshatra_name: "Makha",
            nakshatra_pada: 2,
            nakshatra_vimsottari_lord: "Ketu"
        },
        Sun: {
            current_sign: 2,
            house_number: 10,
            fullDegree: 55.94243834021972,
            normDegree: 25.942438340219717,
            isRetro: "false",
            degrees: 25,
            minutes: 56,
            seconds: 32.77802479097943,
            localized_name: "Sun",
            zodiac_sign_name: "Taurus",
            zodiac_sign_lord: "Venus",
            nakshatra_number: 5,
            nakshatra_name: "Mrigasira",
            nakshatra_pada: 1,
            nakshatra_vimsottari_lord: "Mars"
        },
        Moon: {
            current_sign: 7,
            house_number: 3,
            fullDegree: 208.64642093769868,
            normDegree: 28.64642093769868,
            isRetro: "false",
            degrees: 28,
            minutes: 38,
            seconds: 47.11537571524332,
            localized_name: "Moon",
            zodiac_sign_name: "Libra",
            zodiac_sign_lord: "Venus",
            nakshatra_number: 16,
            nakshatra_name: "Visakha",
            nakshatra_pada: 3,
            nakshatra_vimsottari_lord: "Jupiter"
        },
        Mars: {
            current_sign: 4,
            house_number: 12,
            fullDegree: 110.62046117683758,
            normDegree: 20.62046117683758,
            isRetro: "false",
            degrees: 20,
            minutes: 37,
            seconds: 13.660236615287431,
            localized_name: "Mars",
            zodiac_sign_name: "Cancer",
            zodiac_sign_lord: "Moon",
            nakshatra_number: 9,
            nakshatra_name: "Aaslesha",
            nakshatra_pada: 2,
            nakshatra_vimsottari_lord: "Mercury"
        },
        Mercury: {
            current_sign: 2,
            house_number: 10,
            fullDegree: 33.89956760465726,
            normDegree: 3.899567604657257,
            isRetro: "false",
            degrees: 3,
            minutes: 53,
            seconds: 58.44337676612497,
            localized_name: "Mercury",
            zodiac_sign_name: "Taurus",
            zodiac_sign_lord: "Venus",
            nakshatra_number: 3,
            nakshatra_name: "Krittika",
            nakshatra_pada: 3,
            nakshatra_vimsottari_lord: "Sun"
        },
        Jupiter: {
            current_sign: 1,
            house_number: 9,
            fullDegree: 24.223142882520122,
            normDegree: 24.223142882520122,
            isRetro: "false",
            degrees: 24,
            minutes: 13,
            seconds: 23.314377072439356,
            localized_name: "Jupiter",
            zodiac_sign_name: "Aries",
            zodiac_sign_lord: "Mars",
            nakshatra_number: 2,
            nakshatra_name: "Bharani",
            nakshatra_pada: 4,
            nakshatra_vimsottari_lord: "Venus"
        },
        Venus: {
            current_sign: 2,
            house_number: 10,
            fullDegree: 53.77706362802696,
            normDegree: 23.77706362802696,
            isRetro: "false",
            degrees: 23,
            minutes: 46,
            seconds: 37.42906089705059,
            localized_name: "Venus",
            zodiac_sign_name: "Taurus",
            zodiac_sign_lord: "Venus",
            nakshatra_number: 5,
            nakshatra_name: "Mrigasira",
            nakshatra_pada: 1,
            nakshatra_vimsottari_lord: "Mars"
        },
        Saturn: {
            current_sign: 4,
            house_number: 12,
            fullDegree: 97.00945882520148,
            normDegree: 7.009458825201477,
            isRetro: "false",
            degrees: 7,
            minutes: 0,
            seconds: 34.05177072531842,
            localized_name: "Saturn",
            zodiac_sign_name: "Cancer",
            zodiac_sign_lord: "Moon",
            nakshatra_number: 8,
            nakshatra_name: "Pushyami",
            nakshatra_pada: 2,
            nakshatra_vimsottari_lord: "Saturn"
        },
        Rahu: {
            current_sign: 7,
            house_number: 3,
            fullDegree: 197.20188515374542,
            normDegree: 17.201885153745422,
            isRetro: "true",
            degrees: 17,
            minutes: 12,
            seconds: 6.786553483520947,
            localized_name: "Rahu",
            zodiac_sign_name: "Libra",
            zodiac_sign_lord: "Venus",
            nakshatra_number: 15,
            nakshatra_name: "Swati",
            nakshatra_pada: 4,
            nakshatra_vimsottari_lord: "Rahu"
        },
        Ketu: {
            current_sign: 1,
            house_number: 9,
            fullDegree: 17.201885153745415,
            normDegree: 17.201885153745415,
            isRetro: "true",
            degrees: 17,
            minutes: 12,
            seconds: 6.786553483495368,
            localized_name: "Ketu",
            zodiac_sign_name: "Aries",
            zodiac_sign_lord: "Mars",
            nakshatra_number: 2,
            nakshatra_name: "Bharani",
            nakshatra_pada: 2,
            nakshatra_vimsottari_lord: "Venus"
        }
    }
};

// Transform API data to mandala format
export const transformChartData = (apiData) => {
    const planets = Object.entries(apiData.output)
        .filter(([key]) => key !== 'Ascendant')
        .map(([name, data]) => ({
            name: name,
            degree: data.fullDegree,
            house: data.house_number,
            rashi: data.zodiac_sign_name,
            nakshatra: data.nakshatra_name,
            nakshatraPada: data.nakshatra_pada,
            isRetro: data.isRetro === "true",
            fullData: data
        }));

    return {
        ascendant: apiData.output.Ascendant.fullDegree,
        planets: planets
    };
};

// Create mock chart from form data (for OnboardingContainer)
export const createMockChartFromForm = (formData) => {
    const base = transformChartData(MOCK_CHART_DATA);  // { ascendant, planets }

    return {
        rasi: {
            ascendantDeg: base.ascendant,
            planets: base.planets,
        },
        // you can add navamsa later
    };
};
