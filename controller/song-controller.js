const mongoose = require("mongoose");
const Song = mongoose.model("song");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const storeSong = async(req, res) => {
    const{ name, singer, composer} = req.body;
    const song = new Song ({name, singer, composer});
    await song.save();
    delete song.password;
    res.status(201).json(song);
};

const getAllSong = async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
  };

  const getSongById = async (req, res) => {
    const song = await Song.findById(req.params.id);
    res.json(song);
  };
  const updateSong = async (req, res) => {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: "Data not found" });
    }
    song.name = req.body.name;
    song.singer = req.body.singer;
    song.composer = req.body.composer;

    await song.save();
    return res.status(200).json(song);
  };
  
  const destroySong = async (req, res) => {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: "Data not found" });
    }
    await song.remove();
    return res.status(204).json({});
  };

  module.exports = {
      storeSong,
      getAllSong,
      getSongById,
      updateSong,
      destroySong
  };