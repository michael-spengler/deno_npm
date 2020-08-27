import _extends from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "https://dev.jspm.io/react@16.13.1";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import { Transition } from "https://cdn.skypack.dev/react-transition-group@v4.4.1";
import useTheme from "./styles/useTheme.js";
import { reflow, getTransitionProps } from "./transitions/utils.js";
import useForkRef from "./utils/useForkRef.js";

function getScale(value) {
  return "scale(".concat(value, ", ").concat(Math.pow(value, 2), ")");
}

var styles = {
  entering: {
    opacity: 1,
    transform: getScale(1),
  },
  entered: {
    opacity: 1,
    transform: "none",
  },
};
/**
 * The Grow transition is used by the [Tooltip](/components/tooltips/) and
 * [Popover](/components/popover/) components.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

var Grow = React.forwardRef(function Grow(props, ref) {
  var children = props.children,
    inProp = props.in,
    onEnter = props.onEnter,
    onExit = props.onExit,
    style = props.style,
    _props$timeout = props.timeout,
    timeout = _props$timeout === void 0 ? "auto" : _props$timeout,
    other = _objectWithoutProperties(
      props,
      ["children", "in", "onEnter", "onExit", "style", "timeout"],
    );

  var timer = React.useRef();
  var autoTimeout = React.useRef();
  var handleRef = useForkRef(children.ref, ref);
  var theme = useTheme();

  var handleEnter = function handleEnter(node, isAppearing) {
    reflow(node); // So the animation always start from the start.

    var _getTransitionProps = getTransitionProps({
        style: style,
        timeout: timeout,
      }, {
        mode: "enter",
      }),
      transitionDuration = _getTransitionProps.duration,
      delay = _getTransitionProps.delay;

    var duration;

    if (timeout === "auto") {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }

    node.style.transition = [
      theme.transitions.create("opacity", {
        duration: duration,
        delay: delay,
      }),
      theme.transitions.create("transform", {
        duration: duration * 0.666,
        delay: delay,
      }),
    ].join(",");

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  var handleExit = function handleExit(node) {
    var _getTransitionProps2 = getTransitionProps({
        style: style,
        timeout: timeout,
      }, {
        mode: "exit",
      }),
      transitionDuration = _getTransitionProps2.duration,
      delay = _getTransitionProps2.delay;

    var duration;

    if (timeout === "auto") {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }

    node.style.transition = [
      theme.transitions.create("opacity", {
        duration: duration,
        delay: delay,
      }),
      theme.transitions.create("transform", {
        duration: duration * 0.666,
        delay: delay || duration * 0.333,
      }),
    ].join(",");
    node.style.opacity = "0";
    node.style.transform = getScale(0.75);

    if (onExit) {
      onExit(node);
    }
  };

  var addEndListener = function addEndListener(_, next) {
    if (timeout === "auto") {
      timer.current = setTimeout(next, autoTimeout.current || 0);
    }
  };

  React.useEffect(function () {
    return function () {
      clearTimeout(timer.current);
    };
  }, []);
  return /*#__PURE__*/ React.createElement(
    Transition,
    _extends({
      appear: true,
      in: inProp,
      onEnter: handleEnter,
      onExit: handleExit,
      addEndListener: addEndListener,
      timeout: timeout === "auto" ? null : timeout,
    }, other),
    function (state, childProps) {
      return React.cloneElement(
        children,
        _extends({
          style: _extends(
            {
              opacity: 0,
              transform: getScale(0.75),
              visibility: state === "exited" && !inProp ? "hidden" : undefined,
            },
            styles[state],
            {},
            style,
            {},
            children.props.style,
          ),
          ref: handleRef,
        }, childProps),
      );
    },
  );
});
Grow.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A single child content element.
   */
  children: PropTypes.element,

  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in: PropTypes.bool,

  /**
   * @ignore
   */
  onEnter: PropTypes.func,

  /**
   * @ignore
   */
  onExit: PropTypes.func,

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout: PropTypes.oneOfType(
    [
      PropTypes.oneOf(["auto"]),
      PropTypes.number,
      PropTypes.shape({
        appear: PropTypes.number,
        enter: PropTypes.number,
        exit: PropTypes.number,
      }),
    ],
  ),
};
Grow.muiSupportAuto = true;
export default Grow;
