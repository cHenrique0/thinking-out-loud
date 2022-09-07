const { emoji } = require("node-emoji");

class EmojiController {
  static getAllEmojis() {
    return emoji;
  }
}

module.exports = EmojiController;
