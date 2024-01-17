import apiService from "../app/apiService";

const apiKey = "18f8661b3ab6033ea111c50a44f591bb";

const getMoviesAndTVList = async (category, movieOrTV) => {
  try {
    const response = await apiService.get(
      `https://api.themoviedb.org/3/${movieOrTV}/${category}?api_key=${apiKey}`
    );
    console.log(`${category}:`, response.data);
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getMoviesAndTVList };
