const axios = require("axios");

const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  },

  async update(request, response) {
    const { devId } = request.params;
    const { name, avatar_url, bio, techs, latitude, longitude } = request.body;

    const updateDev = {};

    if (name) updateDev.name = name;
    if (avatar_url) updateDev.avatar_url = avatar_url;
    if (bio) updateDev.bio = bio;
    if (techs) updateDev.techs = parseStringAsArray(techs);
    if (latitude && longitude)
      updateDev.location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

    const dev = await Dev.findByIdAndUpdate(
      devId,
      {
        $set: updateDev
      },
      {
        new: true
      }
    );

    return response.json(dev);
  },

  async destroy(request, response) {
    const { devId } = request.params;

    await Dev.findByIdAndDelete(devId);

    return response.json();
  }
};
