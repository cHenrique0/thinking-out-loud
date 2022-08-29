const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const Thought = require("../models/Thought");
const User = require("../models/User");

class ThoughtController {
  static async getAllThoughts(request, response) {
    const { search } = request.query;
    const condition = search
      ? { title: { [Op.iLike]: `%${search}%` } }
      : undefined;
    const thoughtsData = await Thought.findAll({
      where: condition,
      include: User,
    });
    const thoughts = thoughtsData.map((element) =>
      element.get({ plain: true })
    );
    const noThoughts = thoughts.length === 0 ? true : false;

    return response
      .status(StatusCodes.OK)
      .render("thought/home", { thoughts, noThoughts, search });
  }

  static async dashboard(request, response) {
    const uuid = request.session.userid;
    const user = await User.findByPk(uuid, {
      include: Thought,
    });

    if (!user) {
      return response.status(StatusCodes.UNAUTHORIZED).redirect("/login");
    }

    const userThoughts = user.Thoughts.map((thoughts) => thoughts.dataValues);

    const userNoThoughts = userThoughts.length === 0 ? true : false;

    return response
      .status(StatusCodes.OK)
      .render("thought/dashboard", { thoughts: userThoughts, userNoThoughts });
  }

  static createThoughtView(request, response) {
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
      request.flash("message", "Please, write what you are thinking.");
      return response.status(StatusCodes.BAD_REQUEST).render("thought/create");
    }

    const newThought = { title, UserUuid: uuid };

    await Thought.create({ ...newThought }).catch((error) =>
      console.log(error)
    );

    request.flash("message", "Your thought was shared.");

    request.session.save(() => {
      return response
        .status(StatusCodes.CREATED)
        .redirect("/thoughts/dashboard");
    });
  }

  static async deleteThought(request, response) {
    const { uuid } = request.params;
    const user = request.session.userid;

    await Thought.destroy({ where: { uuid, UserUuid: user } });

    request.flash("message", "You have deleted one of your thoughts.");

    request.session.save(() => {
      return response.status(StatusCodes.OK).redirect("/thoughts/dashboard");
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

    await Thought.update({ ...updatedThought }, { where: { uuid } });

    request.flash(
      "message",
      "Sometimes our mind changes. Your thought has been updated."
    );

    request.session.save(() => {
      return response.status(StatusCodes.OK).redirect("/thoughts/dashboard");
    });
  }
}

module.exports = ThoughtController;
