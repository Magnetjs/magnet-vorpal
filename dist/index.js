'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('magnet-core/dist/base');

var _base2 = _interopRequireDefault(_base);

var _vorpal = require('vorpal');

var _vorpal2 = _interopRequireDefault(_vorpal);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _vorpal3 = require('./config/vorpal');

var _vorpal4 = _interopRequireDefault(_vorpal3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VorpalMagnet = function (_Base) {
  _inherits(VorpalMagnet, _Base);

  function VorpalMagnet() {
    _classCallCheck(this, VorpalMagnet);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VorpalMagnet).apply(this, arguments));
  }

  _createClass(VorpalMagnet, [{
    key: 'setup',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var folderPath, commands, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.app.vorpal = (0, _vorpal2.default)();

                folderPath = _path2.default.resolve(process.cwd(), this.config.commandPath || 'server/commands');
                commands = (0, _requireAll2.default)(folderPath);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 6;

                _loop = function _loop() {
                  var key = _step.value;

                  if (!(0, _isEmpty2.default)(commands[key]) && commands[key].default) {
                    commands[key] = commands[key].default;
                    var name = commands[key].command || key;

                    // Apply vorpal config
                    // https://github.com/dthree/vorpal/wiki/api-%7C-vorpal.command#api
                    var command = _this2.app.vorpal.command(name);

                    if (commands[key].options) {
                      var _iteratorNormalCompletion2 = true;
                      var _didIteratorError2 = false;
                      var _iteratorError2 = undefined;

                      try {
                        for (var _iterator2 = commands[key].options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                          var option = _step2.value;

                          command.option.apply(command, option);
                        }
                      } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                      } finally {
                        try {
                          if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                          }
                        } finally {
                          if (_didIteratorError2) {
                            throw _iteratorError2;
                          }
                        }
                      }
                    }

                    var commonCommands = ['alias', 'autocomplete', 'description', 'help', 'hidden', 'types', 'validate'];
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                      for (var _iterator3 = commonCommands[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var commonCommand = _step3.value;

                        if (commands[key][commonCommand]) {
                          command[commonCommand](commands[key][commonCommand]);
                        }
                      }
                    } catch (err) {
                      _didIteratorError3 = true;
                      _iteratorError3 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                          _iterator3.return();
                        }
                      } finally {
                        if (_didIteratorError3) {
                          throw _iteratorError3;
                        }
                      }
                    }

                    var functionCommands = ['action', 'cancel'];
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                      var _loop2 = function _loop2() {
                        var functionCommand = _step4.value;

                        if (commands[key][functionCommand]) {
                          command[functionCommand](function () {
                            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(args) {
                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      _context.next = 2;
                                      return commands[key][functionCommand].call(_this2, _this2.app, args);

                                    case 2:
                                      return _context.abrupt('return', _context.sent);

                                    case 3:
                                    case 'end':
                                      return _context.stop();
                                  }
                                }
                              }, _callee, _this2);
                            }));

                            return function (_x) {
                              return ref.apply(this, arguments);
                            };
                          }());
                        }
                      };

                      for (var _iterator4 = functionCommands[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        _loop2();
                      }
                    } catch (err) {
                      _didIteratorError4 = true;
                      _iteratorError4 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                          _iterator4.return();
                        }
                      } finally {
                        if (_didIteratorError4) {
                          throw _iteratorError4;
                        }
                      }
                    }
                  }
                };

                for (_iterator = Object.keys(commands)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _loop();
                }
                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](6);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 15:
                _context2.prev = 15;
                _context2.prev = 16;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 18:
                _context2.prev = 18;

                if (!_didIteratorError) {
                  _context2.next = 21;
                  break;
                }

                throw _iteratorError;

              case 21:
                return _context2.finish(18);

              case 22:
                return _context2.finish(15);

              case 23:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 11, 15, 23], [16,, 18, 22]]);
      }));

      function setup() {
        return ref.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: 'start',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.app.vorpal.delimiter('$').show();

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function start() {
        return ref.apply(this, arguments);
      }

      return start;
    }()
  }]);

  return VorpalMagnet;
}(_base2.default);

exports.default = VorpalMagnet;
//# sourceMappingURL=index.js.map