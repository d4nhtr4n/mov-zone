import tmdbApi from "~/api/tmdbApi";

function useLocalGenres(cate, genre_ids = []) {
    const storedGenres = localStorage.getItem(`genres_${cate}`);
    let genresList;
    if (storedGenres) {
        genresList = JSON.parse(storedGenres);
    } else {
        (async function handleGetGenres() {
            const response = await tmdbApi.getGenres(cate);
            genresList = response.genres;
            localStorage.setItem(`genres_${cate}`, JSON.stringify(genresList));
        })();
    }
    const result = genresList
        .filter((genre) => genre_ids.includes(genre.id))
        .map((genre) => genre.name);
    return result;
}

export default useLocalGenres;
