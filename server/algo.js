const generatePlaces = (object, cities) => {
  const resultArray = [];

  const userTemp = object.temperature;
  const userCityExpenses = object.city_expenses;
  const userLandscape = object.landscape;
  const userCityType = object.city_type;
  const userProximity = object.proximity;
  const userGroupAge = object.group_age;
  const userGroupRelationship = object.group_relationship;

  cities.forEach((place) => {
    const tempScore = Math.abs(place.temperature - userTemp);

    const cityExpensesScore = Math.abs(place.city_expenses - userCityExpenses);

    const landscapeScore = Math.abs(place.landscape - userLandscape);

    const cityTypeScore = Math.abs(place.city_type - userCityType);

    const proximityScore = Math.abs(place.proximity - userProximity);

    const groupAgeScore = Math.abs(place.group_age - userGroupAge);

    const groupRelationshipScore = Math.abs(
      place.group_relationship - userGroupRelationship,
    );

    // // add up score
    const finalScore =
      tempScore +
      cityExpensesScore +
      landscapeScore +
      cityTypeScore +
      proximityScore +
      groupAgeScore +
      groupRelationshipScore;

    resultArray.push({ city: place.city, score: finalScore });
  });

  const sorted = resultArray.sort((a, b) => a.score - b.score);

  return [sorted[0].city, sorted[1].city, sorted[2].city];
};

module.exports = {
  generatePlaces,
};
