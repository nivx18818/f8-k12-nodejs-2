const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hash = (plainPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRounds, (err, encrypted) => {
      if (err) reject(err);
      resolve(encrypted);
    });
  });
};

exports.compare = (providedPassword, storedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(providedPassword, storedPassword, (err, same) => {
      if (err) reject(err);
      resolve(same);
    });
  });
};
