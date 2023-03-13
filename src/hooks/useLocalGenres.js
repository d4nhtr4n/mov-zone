import tmdbApi from "~/api/tmdbApi";

function filterGenres(genresList = [], genresId = []) {
    const result = genresList
        .filter((genre) => genresId.includes(genre.id))
        .map((genre) => genre.name);
    return result;
}

function useLocalGenres(cate, genre_ids = []) {
    const storedGenres = localStorage.getItem(`genres_${cate}`);
    let genresList = [];
    if (storedGenres) {
        genresList = JSON.parse(storedGenres);
        return filterGenres(genresList, genre_ids);
    } else {
        async function handleGetRemoteGenres() {
            const response = await tmdbApi.getGenres(cate);
            return response.genres;
        }
        handleGetRemoteGenres().then((newGenresList) => {
            localStorage.setItem(
                `genres_${cate}`,
                JSON.stringify(newGenresList)
            );
            return filterGenres(newGenresList, genre_ids);
        });
    }
    return [];
}

export default useLocalGenres;
