'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../styles/index.scss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/ben/repos/raisinquery/components/Code.js';


function Code(props) {
  var data = props.data;
  var lines = data.lines,
      startIndex = data.startIndex,
      index = data.index;

  var color = function color(i) {
    return i === index - startIndex ? 'rgba(255,255,140,0.5)' : 'transparent';
  };

  var styles = function styles(i) {
    return {
      padding: 0,
      display: 'block',
      backgroundColor: color(i)
    };
  };

  return _react2.default.createElement('div', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: _index2.default }, __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }), _react2.default.createElement('pre', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, lines.map(function (line, i) {
    return _react2.default.createElement('code', {
      style: styles(i),
      key: 'code_' + i,
      dangerouslySetInnerHTML: { __html: line }, className: 'js', __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      }
    });
  })));
}

exports.default = Code;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ29kZS5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInN0eWxlc2hlZXQiLCJDb2RlIiwicHJvcHMiLCJkYXRhIiwibGluZXMiLCJzdGFydEluZGV4IiwiaW5kZXgiLCJjb2xvciIsImkiLCJzdHlsZXMiLCJwYWRkaW5nIiwiZGlzcGxheSIsImJhY2tncm91bmRDb2xvciIsIl9faHRtbCIsIm1hcCIsImxpbmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPLEFBQWdCOzs7Ozs7Ozs7QUFFdkIsU0FBQSxBQUFTLEtBQVQsQUFBYyxPQUFPO01BQUEsQUFFakIsT0FGaUIsQUFHZixNQUhlLEFBRWpCO01BRmlCLEFBS1gsUUFMVyxBQUtrQixLQUxsQixBQUtYO01BTFcsQUFLSixhQUxJLEFBS2tCLEtBTGxCLEFBS0o7TUFMSSxBQUtRLFFBTFIsQUFLa0IsS0FMbEIsQUFLUSxBQUMzQjs7TUFBTSxRQUFRLFNBQVIsQUFBUSxNQUFBLEFBQUMsR0FBRDtXQUFPLEFBQUMsTUFBUSxRQUFULEFBQWlCLGFBQWpCLEFBQ25CLDBCQURZLEFBQ2M7QUFENUIsQUFHQTs7TUFBTSxTQUFTLFNBQVQsQUFBUyxPQUFBLEFBQUMsR0FBRDs7ZUFBUSxBQUNaLEFBQ1Q7ZUFGcUIsQUFFWixBQUNUO3VCQUFpQixNQUhKLEFBQVEsQUFHSixBQUFNO0FBSEYsQUFDckI7QUFERixBQU1BOzt5QkFDRSxjQUFBOztnQkFBQTtrQkFBQSxBQUNFO0FBREY7QUFBQSxHQUFBLDJDQUNTLHlCQUF5QixFQUFoQyxBQUFnQyxBQUFFLEFBQVE7Z0JBQTFDO2tCQURGLEFBQ0UsQUFFQTtBQUZBO3NCQUVBLGNBQUE7O2dCQUFBO2tCQUFBLEFBQ0c7QUFESDtBQUFBLFdBQ0csQUFBTSxJQUFJLFVBQUEsQUFBQyxNQUFELEFBQU0sR0FBTjs7YUFDRixPQURjLEFBQ2QsQUFBTyxBQUNkO3FCQUZxQixBQUVSLEFBQ2I7K0JBQXlCLEVBQUMsUUFITCxBQUdJLEFBQVMsUUFBUSxXQUhyQixBQUcrQjtrQkFIL0I7b0JBQVosQUFBWTtBQUFBO0FBQ3JCLEtBRHFCO0FBTDdCLEFBQ0UsQUFHRSxBQUNHLEFBUVI7QUFFRDs7a0JBQUEsQUFBZSIsImZpbGUiOiJDb2RlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9iZW4vcmVwb3MvcmFpc2lucXVlcnkifQ==