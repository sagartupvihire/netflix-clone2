import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";
import moment from "moment-timezone";
export async function searchPerson(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`
            https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) {
            return res.status(404).json({ success: false, message: "No results found" });
        }
        res.status(200).json({ success: true, people: response.results });

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: moment().tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm A'),
                }
            }
        });
    } catch (error) {
        console.log("error in searchperson", error.message);

        res.status(500).json({ success: false, message: "Internal Server Error" });

    }
}
export async function searchTv(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`
           https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.length === 0) {
            return res.status(404).json({ success: false, message: "No results found" });
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "tv",
                    createdAt: moment().tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm A'),
                }
            }
        })
        res.status(200).json({ success: true, movies: response.results });
    } catch (e) {
        console.log("error in searchmovie", e.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}
export async function searchMovie(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`
           https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.length === 0) {
            return res.status(404).json({ success: false, message: "No results found" });
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: moment().tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm A'),
                }
            }
        })
        res.status(200).json({ success: true, movies: response.results });
    } catch (e) {
        console.log("error in searchmovie", e);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function getSearchHistory(req, res) {

    try {
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch (error) {
        console.log("error in getSearchHistory", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });

    }
}

export async function removeItemFromSearchHistory(req, res) {
    let { id } = req.params;
    id = parseInt(id)
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id }
            }
        });
        res.status(200).json({ success: true, content: "item removd form search history" });
    } catch (error) {
        console.log("error in removeItemFromSearchHistory", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });

    }


}