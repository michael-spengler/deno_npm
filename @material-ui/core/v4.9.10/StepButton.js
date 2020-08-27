import _extends from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "https://dev.jspm.io/react@16.13.1";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import withStyles from "./styles/withStyles.js";
import ButtonBase from "./ButtonBase.js";
import StepLabel from "./StepLabel.js";
import isMuiElement from "./utils/isMuiElement.js";
export var styles = {
  /* Styles applied to the root element. */
  root: {
    width: "100%",
    padding: "24px 16px",
    margin: "-24px -16px",
    boxSizing: "content-box",
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    justifyContent: "flex-start",
    padding: "8px",
    margin: "-8px",
  },

  /* Styles applied to the `ButtonBase` touch-ripple. */
  touchRipple: {
    color: "rgba(0, 0, 0, 0.3)",
  },
};
var StepButton = React.forwardRef(function StepButton(props, ref) {
  var active = props.active,
    alternativeLabel = props.alternativeLabel,
    children = props.children,
    classes = props.classes,
    className = props.className,
    completed = props.completed,
    disabled = props.disabled,
    expanded = props.expanded,
    icon = props.icon,
    last = props.last,
    optional = props.optional,
    orientation = props.orientation,
    other = _objectWithoutProperties(
      props,
      [
        "active",
        "alternativeLabel",
        "children",
        "classes",
        "className",
        "completed",
        "disabled",
        "expanded",
        "icon",
        "last",
        "optional",
        "orientation",
      ],
    );

  var childProps = {
    active: active,
    alternativeLabel: alternativeLabel,
    completed: completed,
    disabled: disabled,
    icon: icon,
    optional: optional,
    orientation: orientation,
  };
  var child = isMuiElement(children, ["StepLabel"])
    ? React.cloneElement(children, childProps)
    : /*#__PURE__*/ React.createElement(StepLabel, childProps, children);
  return /*#__PURE__*/ React.createElement(
    ButtonBase,
    _extends({
      disabled: disabled,
      TouchRippleProps: {
        className: classes.touchRipple,
      },
      className: clsx(classes.root, classes[orientation], className),
      ref: ref,
    }, other),
    child,
  );
});
StepButton.propTypes = {
  /**
   * @ignore
   * Passed in via `Step` - passed through to `StepLabel`.
   */
  active: PropTypes.bool,

  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: PropTypes.bool,

  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * @ignore
   * Sets completed styling. Is passed to StepLabel.
   */
  completed: PropTypes.bool,

  /**
   * @ignore
   * Disables the button and sets disabled styling. Is passed to StepLabel.
   */
  disabled: PropTypes.bool,

  /**
   * @ignore
   * potentially passed from parent `Step`
   */
  expanded: PropTypes.bool,

  /**
   * The icon displayed by the step label.
   */
  icon: PropTypes.node,

  /**
   * @ignore
   */
  last: PropTypes.bool,

  /**
   * The optional node to display.
   */
  optional: PropTypes.node,

  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
};
export default withStyles(styles, {
  name: "MuiStepButton",
})(StepButton);
