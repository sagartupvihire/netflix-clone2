import mongoose from "mongoose";

const similarMovieSaveInDb =  mongoose.Schema({
  adult: {
    type: Boolean,
    required: true,
  },
  backdrop_path: {
    type: String,
    required: true,
  },
  genre_ids: {
    type: [Number],
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  original_language: {
    type: String,
    required: true,
  },
  original_title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  video: {
    type: Boolean,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  vote_count: {
    type: Number,
    required: true,
  },
});

export const MovieSaveInDb = mongoose.model("MovieSaveInDb", similarMovieSaveInDb);
