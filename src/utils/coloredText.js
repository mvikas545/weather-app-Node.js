const chalk = require("chalk");

const coloredText = {
  successBg: chalk.green.inverse.bold,
  warningBg: chalk.yellow.inverse.bold,
  errorBg: chalk.red.inverse.bold,
  infoBg: chalk.cyan.inverse.bold,
  success: chalk.green.bold,
  warning: chalk.yellow.bold,
  error: chalk.red.bold,
  info: chalk.cyan.bold,
};

module.exports = coloredText;
