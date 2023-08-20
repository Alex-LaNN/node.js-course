// Function to process the '.csv' file.
const processCSV = (csvData) => {
  // Split CSV into lines.
  const lines = csvData.split("\n");
  // Filter out invalid rows and convert them to objects.
  const topCities = lines
    // filtering out empty and commented whole lines
    .filter((line) => line && !line.startsWith("#"))
    // converting strings to objects
    .map((line) => {
      /*
       destructuring an array => creating the fields of an object and assigning them the corresponding values from the array string, using the separator "," when selecting them
       */
      const [x, y, name, population] = line.split(",");
      return {
        x: parseFloat(replaceValue(x)).toFixed(2),
        y: parseFloat(replaceValue(y)).toFixed(2),
        name: replaceValue(name),
        population: parseInt(replaceValue(population)) || 0,
      };
    })
    // sorting from largest to smallest
    .sort((a, b) => b.population - a.population)
    // choose the first 10
    .slice(0, 10);

  // Redefining objects by a specific type.
  const cityMap = topCities.reduce((acc, city, index) => {
    acc[city.name] = { population: city.population, rating: index + 1 };
    return acc;
  }, {});

  // Create a function to enrich the text.
  const enrichText = (text) => {
    // iterate over all city names in the 'cityMap' object
    for (const cityName in cityMap) {
      // getting information about the current city from 'cityMap'
      const cityInfo = cityMap[cityName];
      /*
       creating a regular expression (RegExp) with the name of the current city as a pattern
      */
      const pattern = new RegExp(cityName);
      // create a string to replace
      const replacement = `${cityName} (${cityInfo.rating} место в ТОП-10 самых крупных городов Украины, население ${cityInfo.population} человек)`;
      /*
       implementation of replacing the name of the city with the replacement string created above - 'replacement'
      */
      text = text.replace(pattern, replacement);
    }
    return text;
  };

  // The return of a function to enrich the text.
  return enrichText;
};

// Valid cleanup of unnecessary comments in the file.
const replaceValue = (value) => {
  return value.replace("#", "");
};

/*
 An example of a CSV text used for processing by this function (somewhat different from the task condition - a little more complicated, but the main and key points remained unchanged).
*/
const csvData = `
#
#77.77,777.777,Кропивницький!!!,777777777,)))
46.49,36.58,#Бердянськ,121692,
#45.40,34.29,Джанкой,43343,

49.468,30.173,Біла Церква,200131
50.279,#30.315,#Київ,#2884000
48.301,35.005,Одеса,993120
49.255,27.073,Харків,#1430885
49.341,25.34,Львів,724314
48.34,39.32,Донецьк,948000

46.29,30.401,Дніпро,993094
46.58,32.12,Миколаїв,486570
47.54,33.20,Запоріжжя,767718
49.38,23.25,Івано-Франківськ,238850
49.02,33.24,Полтава,295715

49.101,28.291,#Вінниця,372484
48.37,35.13,Херсон,295146
#50.02,36.14,Черкаси,297568
`;

// Getting a function to enrich the text.
const enrichTextFunction = processCSV(csvData);

// The text to be enriched.
const inputText = `
  В Украине, помимо других городов, есть 8 городов, имеющих наибольшую численность населения, и конечно же в первую очередь отмечу, принадлежащий этому списку, мой родной город - Дніпро. Далее - в произвольном порядке: Одеса, Київ, Харків, Львів, Вінниця, Запоріжжя, Донецьк и конечно же еще раз - мой Дніпро.
`;

// Enriched text.
console.log(enrichTextFunction(inputText));
