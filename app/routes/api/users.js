"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _keys = _interopRequireDefault(require("../../keys/keys"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _passport = _interopRequireDefault(require("passport"));

var _register = _interopRequireDefault(require("../../validation/register"));

var _login = _interopRequireDefault(require("../../validation/login"));

var _default = function _default(app, db) {
  app.post('/api/v1/signup', function (req, res) {
    console.log("=====================");
    console.log("=====================");
    console.log("=====================");
    console.log("HIT SIGN UP");
    console.log("=====================");
    console.log("=====================");
    console.log("=====================");

    var _validateRegisterInpu = (0, _register["default"])(req.body),
        errors = _validateRegisterInpu.errors,
        isValid = _validateRegisterInpu.isValid;

    if (!isValid) {
      return res.status(400).json(errors);
    }

    db.user.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      if (user) {
        errors.username = "User already exists.";
        return res.status(400).json(errors);
      } else {
        var userInfo = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        };

        _bcryptjs["default"].genSalt(10, function (err, salt) {
          _bcryptjs["default"].hash(userInfo.password, salt, function (err, hash) {
            if (err) throw err;
            userInfo.password = hash;
            db.user.create(userInfo).then(function (user) {
              jwtSign(res, user);
            })["catch"](function (err) {
              return console.log(err);
            });
          });
        });
      }
    });
  });
  app.post('/api/v1/login', function (req, res) {
    var _validateLoginInput = (0, _login["default"])(req.body),
        errors = _validateLoginInput.errors,
        isValid = _validateLoginInput.isValid;

    if (!isValid) {
      return res.status(400).json(errors);
    }

    var username = req.body.username;
    var password = req.body.password;
    db.user.findOne({
      username: username
    }).then(function (user) {
      if (!user) {
        errors.username = "Incorrect username or password";
        return res.status(400).json(errors);
      }

      _bcryptjs["default"].compare(password, user.password).then(function (isMatch) {
        if (isMatch) {
          jwtSign(res, user);
        } else {
          errors.password = "Incorrect username or password";
          return res.status(400).json(errors);
        }
      });
    });
  });
  app.put('/api/v1/users/:userId', function (req, res) {
    var errors = {};

    if (!req.body.id) {
      errors.userId = "User ID is required";
      return res.status(400).json(errors);
    }

    db.user.findByPk(req.body.id).then(function (user) {
      if (!user) {
        errors.user = "User doesn't exist";
        return res.status(400).json(errors);
      }

      var _req$body = req.body,
          username = _req$body.username,
          email = _req$body.email,
          personalBoardIds = _req$body.personalBoardIds;
      user.update({
        username: username,
        email: email,
        personalBoardIds: personalBoardIds
      });
      delete user.dataValues.password;
      return res.json({
        user: user
      });
    });
  });
};

exports["default"] = _default;

var jwtSign =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(res, user) {
    var payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              id: user.id
            };

            _jsonwebtoken["default"].sign(payload, _keys["default"].secretOrKey, {
              expiresIn: 7200
            }, function (err, token) {
              if (err) throw err;
              res.json({
                token: 'Bearer ' + token
              });
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function jwtSign(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();