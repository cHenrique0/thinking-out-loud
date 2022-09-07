const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const Thought = require("../models/Thought");
const User = require("../models/User");
const EmojiController = require("./EmojiController");
const UserPictureController = require("./UserPictureController");

class ThoughtController {
  static async getAllThoughts(request, response) {
    const { search, order } = request.query;

    const condition = search
      ? { title: { [Op.iLike]: `%${search}%` } }
      : undefined;

    const orderBy = order === "old" ? "ASC" : "DESC";

    const thoughtsData = await Thought.findAll({
      where: condition,
      include: User,
      order: [["createdAt", orderBy]],
    });
    const thoughts = thoughtsData.map((element) =>
      element.get({ plain: true })
    );
    const noThoughts = thoughts.length === 0 ? true : false;
    const users = thoughts.map((thought) => thought.User.uuid);
    const userUuids = [...new Set(users)];
    const userPictures = await UserPictureController.getPicturesByUserId(
      userUuids
    );

    // Adding UserPicture in the Thought List
    thoughts.forEach((thought) => {
      userPictures.forEach((picture) => {
        if (thought.UserUuid === picture.UserUuid) {
          thought.UserPicture = { ...picture };
        }
      });
    });

    return response
      .status(StatusCodes.OK)
      .render("home", { thoughts, noThoughts, search });
  }

  static createThoughtView(request, response) {
    // const emojis = EmojiController.getAllEmojis();
    return response.status(StatusCodes.OK).render("thought/create");
  }

  static async createThought(request, response) {
    const { title } = request.body;
    const uuid = request.session.userid;

    const user = await User.findByPk(uuid, { raw: true });

    if (!user) {
      return response.status(StatusCodes.UNAUTHORIZED).redirect("/login");
    }

    if (!title) {
      request.flash("warning", "Please, write what you are thinking.");
      return response.status(StatusCodes.BAD_REQUEST).render("thought/create");
    }

    const newThought = { title, UserUuid: uuid };

    await Thought.create({ ...newThought }).catch((error) =>
      console.log(error)
    );

    request.flash("success", "Your thought was shared.");

    return request.session.save(() => {
      response.status(StatusCodes.CREATED).redirect("/user/profile");
    });
  }

  static async deleteThought(request, response) {
    const { uuid } = request.params;
    const user = request.session.userid;

    await Thought.destroy({ where: { uuid, UserUuid: user } });

    request.flash("success", "You have deleted one of your thoughts.");

    return request.session.save(() => {
      response.status(StatusCodes.OK).redirect("/user/profile");
    });
  }

  static async updateThoughtView(request, response) {
    const { uuid } = request.params;

    const thought = await Thought.findByPk(uuid, { raw: true });

    return response.status(StatusCodes.OK).render("thought/edit", { thought });
  }

  static async updateThought(request, response) {
    const { uuid } = request.params;
    const { title } = request.body;
    const updatedThought = { title };

    if (!title) {
      request.flash("warning", "Please, write what you are thinking.");
      return response.status(StatusCodes.BAD_REQUEST).render("thought/edit");
    }

    await Thought.update({ ...updatedThought }, { where: { uuid } });

    request.flash(
      "success",
      "Sometimes our mind changes. Your thought has been updated."
    );

    return request.session.save(() => {
      response.status(StatusCodes.OK).redirect("/user/profile");
    });
  }
}

module.exports = ThoughtController;
