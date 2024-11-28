const exportedMethods = {
    // Function to count and sort place values by frequency
    getSortedPlaceFrequencies(recipes) {
        const placeCount = {};

        // Count occurrences of each place
        recipes.forEach(recipe => {
            const place = recipe.place;
            if (placeCount[place]) {
                placeCount[place]++;
            } else {
                placeCount[place] = 1;
            }
        });

        // Convert the count object to an array of [place, count] pairs
        const placeCountArray = Object.entries(placeCount);

        // Sort the array by frequency in descending order
        placeCountArray.sort((a, b) => b[1] - a[1]);

        // Map the sorted array to only return the place names
        return placeCountArray.map(entry => entry[0]);
    },

    // Function to count and sort allergy values by frequency
    getSortedAllergyFrequencies(recipes) {
        const allergyCount = {};

        // Count occurrences of each allergy
        recipes.forEach(recipe => {
            recipe.allergens_free.forEach(allergy => {
                if (allergyCount[allergy]) {
                    allergyCount[allergy]++;
                } else {
                    allergyCount[allergy] = 1;
                }
            });
        });

        // Convert the count object to an array of [allergy, count] pairs
        const allergyCountArray = Object.entries(allergyCount);

        // Sort the array by frequency in descending order
        allergyCountArray.sort((a, b) => b[1] - a[1]);

        // Map the sorted array to only return the allergy names
        return allergyCountArray.map(entry => {
            const allergy = entry[0];
            return allergy.charAt(0).toUpperCase() + allergy.slice(1); //Capitalized the first letter of the allergen
        });
    }
};

export default exportedMethods;