'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('isomorphic-fetch');

var _highlight = require('highlight.js');

var hljs = _interopRequireWildcard(_highlight);

var _index = require('../styles/index.scss');

var _index2 = _interopRequireDefault(_index);

var _Code = require('../components/Code');

var _Code2 = _interopRequireDefault(_Code);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/ben/repos/raisinquery/pages/index.js?entry';


function RelatedPages(props) {
  var all = props.all;

  if (!all || all.length < 1) return false;

  return _react2.default.createElement('div', { style: { display: 'flex', flexDirection: 'column' }, __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, all.map(function (page) {
    return _react2.default.createElement('div', { key: 'div_' + page.title, __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      }
    }, _react2.default.createElement('a', {
      key: 'a_' + page.title,
      href: 'http://localhost:3000/' + page.id, __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      }
    }, page.repoName + ' > ' + page.message));
  }));
}

function stackOverflowApi(query) {
  var q = encodeURIComponent(query.split('/').join('-').split('-').join(' '));
  var url = 'https://api.stackexchange.com/2.2/search/advanced?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=relevance&q=' + q + '&filter=default';

  return fetch(url).then(function (resp) {
    return resp.json();
  });
}

var App = function (_React$Component) {
  (0, _inherits3.default)(App, _React$Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = App.__proto__ || (0, _getPrototypeOf2.default)(App)).call.apply(_ref, [this].concat(args))), _this), _this.highlightCode = function () {
      var domNode = _reactDom2.default.findDOMNode(_this);
      var nodes = domNode.querySelectorAll('pre code');

      var i = void 0;
      for (i = 0; i < nodes.length; i++) {
        hljs.highlightBlock(nodes[i]);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.highlightCode();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          all = _props.all,
          answers = _props.answers;

      console.log(this.props.answers);

      if (!data.lines) {
        return _react2.default.createElement('div', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 79
          }
        });
      }
      return _react2.default.createElement('div', { style: { maxWidth: '660px', margin: '20px auto' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        }
      }, _react2.default.createElement('h1', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, data && data.message), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        }
      }, data && data.repoName), data && _react2.default.createElement(_Code2.default, (0, _extends3.default)({}, this.props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      })), _react2.default.createElement(RelatedPages, (0, _extends3.default)({}, this.props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      })), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, answers && answers.map(function (ans) {
        return _react2.default.createElement('div', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 87
          }
        }, ans.title);
      })));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
        var req = _ref2.req,
            query = _ref2.query;

        var params, url, resp, _ref4, items, resp2;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = {};

                if (!(query['0'] && query['0'] !== '/favicon.ico')) {
                  _context.next = 15;
                  break;
                }

                url = 'https://8d448wxqy3.execute-api.us-east-1.amazonaws.com/dev/api?id=';

                url += query['0'].replace('/', '');
                _context.next = 6;
                return fetch(url);

              case 6:
                resp = _context.sent;
                _context.next = 9;
                return resp.json();

              case 9:
                params.data = _context.sent;
                _context.next = 12;
                return stackOverflowApi(query['0']);

              case 12:
                _ref4 = _context.sent;
                items = _ref4.items;

                params.answers = items;

              case 15:
                _context.next = 17;
                return fetch('https://8d448wxqy3.execute-api.us-east-1.amazonaws.com/dev/api?all=true');

              case 17:
                resp2 = _context.sent;
                _context.next = 20;
                return resp2.json();

              case 20:
                params.all = _context.sent;
                return _context.abrupt('return', params);

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref3.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUmVhY3RET00iLCJobGpzIiwic3R5bGVzaGVldCIsIkNvZGUiLCJSZWxhdGVkUGFnZXMiLCJwcm9wcyIsImFsbCIsImxlbmd0aCIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwibWFwIiwicGFnZSIsInRpdGxlIiwiaWQiLCJyZXBvTmFtZSIsIm1lc3NhZ2UiLCJzdGFja092ZXJmbG93QXBpIiwicXVlcnkiLCJxIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic3BsaXQiLCJqb2luIiwidXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcCIsImpzb24iLCJBcHAiLCJoaWdobGlnaHRDb2RlIiwiZG9tTm9kZSIsImZpbmRET01Ob2RlIiwibm9kZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaSIsImhpZ2hsaWdodEJsb2NrIiwiZGF0YSIsImFuc3dlcnMiLCJjb25zb2xlIiwibG9nIiwibGluZXMiLCJtYXhXaWR0aCIsIm1hcmdpbiIsImFucyIsInJlcSIsInBhcmFtcyIsInJlcGxhY2UiLCJpdGVtcyIsInJlc3AyIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1A7O0FBQ0EsQUFBTzs7SUFBUCxBQUFZOztBQUNaLEFBQU8sQUFBZ0I7Ozs7QUFDdkIsQUFBTyxBQUFVOzs7Ozs7Ozs7OztBQUVqQixTQUFBLEFBQVMsYUFBVCxBQUFzQixPQUFPO01BQUEsQUFDbkIsTUFEbUIsQUFDWCxNQURXLEFBQ25CLEFBRVI7O01BQUcsQ0FBQSxBQUFDLE9BQU8sSUFBQSxBQUFJLFNBQWYsQUFBd0IsR0FBRyxPQUFBLEFBQU8sQUFFbEM7O3lCQUNFLGNBQUEsU0FBSyxPQUFPLEVBQUMsU0FBRCxBQUFVLFFBQVEsZUFBOUIsQUFBWSxBQUFpQztnQkFBN0M7a0JBQUEsQUFDRztBQURIO0dBQUEsTUFDRyxBQUFJLElBQUksZ0JBQUE7MkJBQ1AsY0FBQSxTQUFLLGNBQVksS0FBakIsQUFBc0I7a0JBQXRCO29CQUFBLEFBQ0E7QUFEQTtLQUFBLGtCQUNBLGNBQUE7a0JBQ1ksS0FEWixBQUNpQixBQUNmO3VDQUErQixLQUZqQyxBQUVzQztrQkFGdEM7b0JBQUEsQUFFNkM7QUFGN0M7QUFDRSxZQUMyQyxBQUFLLFdBQUwsQUFBZ0IsUUFBUSxLQUo5RCxBQUNQLEFBQ0EsQUFFMEU7QUFOaEYsQUFDRSxBQUNHLEFBU047OztBQUVELFNBQUEsQUFBUyxpQkFBVCxBQUEyQixPQUFPLEFBQ2hDO01BQUksSUFBSSxtQkFDTixNQUFBLEFBQU0sTUFBTixBQUFZLEtBQVosQUFBaUIsS0FBakIsQUFBc0IsS0FBdEIsQUFBMkIsTUFBM0IsQUFBaUMsS0FBakMsQUFBc0MsS0FEeEMsQUFBUSxBQUNOLEFBQTJDLEFBRTdDO01BQUkseUlBQUEsQUFBdUksSUFBM0ksQUFFQTs7ZUFBTyxBQUFNLEtBQU4sQUFDSixLQUFLLGdCQUFBO1dBQVEsS0FBUixBQUFRLEFBQUs7QUFEckIsQUFBTyxBQUVSLEdBRlE7OztJQUlZLEE7Ozs7Ozs7Ozs7Ozs7O3NNQXdCbkIsQSxnQkFBZ0IsWUFBTSxBQUNwQjtVQUFNLFVBQVUsbUJBQUEsQUFBUyxZQUF6QixBQUNBO1VBQU0sUUFBUSxRQUFBLEFBQVEsaUJBQXRCLEFBQWMsQUFBeUIsQUFFdkM7O1VBQUksU0FBSixBQUNBO1dBQUssSUFBTCxBQUFTLEdBQUcsSUFBSSxNQUFoQixBQUFzQixRQUF0QixBQUE4QixLQUFLLEFBQ2pDO2FBQUEsQUFBSyxlQUFlLE1BQXBCLEFBQW9CLEFBQU0sQUFDM0I7QUFDRjtBOzs7Ozt3Q0FFbUIsQUFDbEI7V0FBQSxBQUFLLEFBQ047Ozs7NkJBRVE7bUJBQ3NCLEtBRHRCLEFBQzJCO1VBRDNCLEFBQ0QsY0FEQyxBQUNEO1VBREMsQUFDSyxhQURMLEFBQ0s7VUFETCxBQUNVLGlCQURWLEFBQ1UsQUFDakI7O2NBQUEsQUFBUSxJQUFJLEtBQUEsQUFBSyxNQUFqQixBQUF1QixBQUV2Qjs7VUFBRyxDQUFDLEtBQUosQUFBUyxPQUFPLEFBQ2Q7OztzQkFBTzt3QkFBUCxBQUFPLEFBQ1I7QUFEUTtBQUFBLFNBQUE7QUFFVDs2QkFDRSxjQUFBLFNBQUssT0FBTyxFQUFDLFVBQUQsQUFBVyxTQUFTLFFBQWhDLEFBQVksQUFBNEI7b0JBQXhDO3NCQUFBLEFBQ0U7QUFERjtPQUFBLGtCQUNFLGNBQUE7O29CQUFBO3NCQUFBLEFBQUs7QUFBTDtBQUFBLGlCQUFhLEtBRGYsQUFDRSxBQUFrQixBQUNsQiwwQkFBQSxjQUFBOztvQkFBQTtzQkFBQSxBQUFJO0FBQUo7QUFBQSxpQkFBWSxLQUZkLEFBRUUsQUFBaUIsQUFDaEIsbUNBQVEsQUFBQyx5REFBUyxLQUFWLEFBQWU7O29CQUFmO3NCQUhYLEFBR1csQUFDVDtBQURTO0FBQUEsUUFBQSxpQ0FDVCxBQUFDLHlDQUFpQixLQUFsQixBQUF1Qjs7b0JBQXZCO3NCQUpGLEFBSUUsQUFDQTtBQURBO0FBQUEsMkJBQ0EsY0FBQTs7b0JBQUE7c0JBQUEsQUFBTTtBQUFOO0FBQUEsNEJBQWlCLEFBQVEsSUFBSSxlQUFBOytCQUFPLGNBQUE7O3NCQUFBO3dCQUFBLEFBQU07QUFBTjtBQUFBLFNBQUEsTUFBUCxBQUFPLEFBQVU7QUFObEQsQUFDRSxBQUtFLEFBQWlCLEFBR3RCLE9BSHNCOzs7Ozs7WUFqRFEsQSxZLEFBQUE7WSxBQUFLLGMsQUFBQTs7Ozs7OzttQkFDOUI7QSx5QkFBUyxBOztzQkFFVixNQUFBLEFBQU0sUUFBUSxNQUFBLEFBQU0sU0FBUyxBOzs7QUFDMUI7O0Esc0JBQU0sQSxBQUVWOzt1QkFBTyxNQUFBLEFBQU0sS0FBTixBQUFXLFFBQVgsQUFBbUIsS0FBMUIsQUFBTyxBQUF3Qjs7dUJBQ2QsTUFBQSxBQUFNLEE7O21CQUFuQjtBOzt1QkFDZ0IsS0FBQSxBQUFLLEE7O21CQUF6Qjt1QkFBTyxBOzt1QkFFZSxpQkFBaUIsTSxBQUFqQixBQUFpQixBQUFNOzs7aUNBQXZDO0EsOEIsQUFBQSxBQUNOOzt1QkFBQSxBQUFPLFVBQVAsQUFBaUI7Ozs7dUJBR0QsTUFBQSxBQUFNLEE7O21CQUFwQjtBOzt1QkFFZSxNQUFBLEEsQUFBTTs7bUJBQXpCO3VCQUFPLEE7aURBRUEsQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXBCc0IsZ0JBQU0sQTs7a0JBQWxCLEEiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jlbi9yZXBvcy9yYWlzaW5xdWVyeSJ9