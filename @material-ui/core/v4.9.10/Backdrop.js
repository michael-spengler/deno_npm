import _extends from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "https://dev.jspm.io/react@16.13.1";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import withStyles from "./styles/withStyles.js";
import Fade from "./Fade.js";
export var styles = {
  /* Styles applied to the root element. */
  root: {
    // Improve scrollable dialog support.
    zIndex: -1,
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    WebkitTapHighlightColor: "transparent",
  },

  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: "transparent",
  },
};
var Backdrop = React.forwardRef(function Backdrop(props, ref) {
  var children = props.children,
    classes = props.classes,
    className = props.className,
    _props$invisible = props.invisible,
    invisible = _props$invisible === void 0 ? false : _props$invisible,
    open = props.open,
    transitionDuration = props.transitionDuration,
    other = _objectWithoutProperties(
      props,
      [
        "children",
        "classes",
        "className",
        "invisible",
        "open",
        "transitionDuration",
      ],
    );

  return /*#__PURE__*/ React.createElement(
    Fade,
    _extends({
      in: open,
      timeout: transitionDuration,
    }, other), /*#__PURE__*/
    React.createElement("div", {
      className: clsx(classes.root, className, invisible && classes.invisible),
      "aria-hidden": true,
      ref: ref,
    }, children),
  );
});
Backdrop.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible: PropTypes.bool,

  /**
   * If `true`, the backdrop is open.
   */
  open: PropTypes.bool.isRequired,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};
export default withStyles(styles, {
  name: "MuiBackdrop",
})(Backdrop);