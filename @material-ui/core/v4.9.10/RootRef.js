import _classCallCheck from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/slicedToArray";
import _createClass from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/inherits";

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else result = Super.apply(this, arguments);
    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

import React from "https://dev.jspm.io/react@16.13.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@16.13.1";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import {
  exactProp,
  refType,
} from "https://cdn.skypack.dev/@material-ui/utils@4.10.2";
import setRef from "./utils/setRef.js";
/**
 * ⚠️⚠️⚠️
 * If you want the DOM element of a Material-UI component check out
 * [FAQ: How can I access the DOM element?](/getting-started/faq/#how-can-i-access-the-dom-element)
 * first.
 *
 * This component uses `findDOMNode` which is deprecated in React.StrictMode.
 *
 * Helper component to allow attaching a ref to a
 * wrapped element to access the underlying DOM element.
 *
 * It's highly inspired by https://github.com/facebook/react/issues/11401#issuecomment-340543801.
 * For example:
 * ```jsx
 * import React from 'https://dev.jspm.io/react@16.13.1';
 * import RootRef from '@material-ui/core/RootRef';
 *
 * function MyComponent() {
 *   const domRef = React.useRef();
 *
 *   React.useEffect(() => {
 *     console.log(domRef.current); // DOM node
 *   }, []);
 *
 *   return (
 *     <RootRef rootRef={domRef}>
 *       <SomeChildComponent />
 *     </RootRef>
 *   );
 * }
 * ```
 */

var RootRef = /*#__PURE__*/ function (_React$Component) {
  _inherits(RootRef, _React$Component);

  var _super = _createSuper(RootRef);

  function RootRef() {
    _classCallCheck(this, RootRef);

    return _super.apply(this, arguments);
  }

  _createClass(RootRef, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ref = ReactDOM.findDOMNode(this);
      setRef(this.props.rootRef, this.ref);
    },
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var ref = ReactDOM.findDOMNode(this);

      if (prevProps.rootRef !== this.props.rootRef || this.ref !== ref) {
        if (prevProps.rootRef !== this.props.rootRef) {
          setRef(prevProps.rootRef, null);
        }

        this.ref = ref;
        setRef(this.props.rootRef, this.ref);
      }
    },
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.ref = null;
      setRef(this.props.rootRef, null);
    },
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    },
  }]);

  return RootRef;
}(React.Component);

RootRef.propTypes = {
  /**
   * The wrapped element.
   */
  children: PropTypes.element.isRequired,

  /**
   * A ref that points to the first DOM node of the wrapped element.
   */
  rootRef: refType.isRequired,
};

RootRef.propTypes = exactProp(RootRef.propTypes);

export default RootRef;
