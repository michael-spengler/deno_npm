import _defineProperty from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/defineProperty";
import _extends from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "https://dev.jspm.io/react@16.13.1";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import withStyles from "../styles/withStyles.js";
import useTheme from "../styles/useTheme.js";
import capitalize from "../utils/capitalize.js";
export var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: "absolute",
      bottom: 0,
      right: 0,
      top: -5,
      left: 0,
      margin: 0,
      padding: 0,
      paddingLeft: 8,
      pointerEvents: "none",
      borderRadius: "inherit",
      borderStyle: "solid",
      borderWidth: 1,
    },

    /* Styles applied to the legend element when `labelWidth` is provided. */
    legend: {
      textAlign: "left",
      padding: 0,
      lineHeight: "11px",
      // sync with `height` in `legend` styles
      transition: theme.transitions.create("width", {
        duration: 150,
        easing: theme.transitions.easing.easeOut,
      }),
    },

    /* Styles applied to the legend element. */
    legendLabelled: {
      display: "block",
      width: "auto",
      textAlign: "left",
      padding: 0,
      height: 11,
      // sync with `lineHeight` in `legend` styles
      fontSize: "0.75em",
      visibility: "hidden",
      maxWidth: 0.01,
      transition: theme.transitions.create("max-width", {
        duration: 50,
        easing: theme.transitions.easing.easeOut,
      }),
      "& > span": {
        paddingLeft: 5,
        paddingRight: 5,
        display: "inline-block",
      },
    },

    /* Styles applied to the legend element is notched. */
    legendNotched: {
      maxWidth: 1000,
      transition: theme.transitions.create("max-width", {
        duration: 100,
        easing: theme.transitions.easing.easeOut,
        delay: 50,
      }),
    },
  };
};
/**
 * @ignore - internal component.
 */

var NotchedOutline = React.forwardRef(function NotchedOutline(props, ref) {
  var children = props.children,
    classes = props.classes,
    className = props.className,
    label = props.label,
    labelWidthProp = props.labelWidth,
    notched = props.notched,
    style = props.style,
    other = _objectWithoutProperties(
      props,
      [
        "children",
        "classes",
        "className",
        "label",
        "labelWidth",
        "notched",
        "style",
      ],
    );

  var theme = useTheme();
  var align = theme.direction === "rtl" ? "right" : "left";

  if (label !== undefined) {
    return /*#__PURE__*/ React.createElement(
      "fieldset",
      _extends({
        "aria-hidden": true,
        className: clsx(classes.root, className),
        ref: ref,
        style: style,
      }, other), /*#__PURE__*/
      React.createElement(
        "legend",
        {
          className: clsx(
            classes.legendLabelled,
            notched && classes.legendNotched,
          ),
        },
        label
          ? /*#__PURE__*/ React.createElement("span", null, label)
          : /*#__PURE__*/ React.createElement("span", {
            dangerouslySetInnerHTML: {
              __html: "&#8203;",
            },
          }),
      ),
    );
  }

  var labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 8 : 0.01;
  return /*#__PURE__*/ React.createElement(
    "fieldset",
    _extends({
      "aria-hidden": true,
      style: _extends(
        _defineProperty({}, "padding".concat(capitalize(align)), 8),
        style,
      ),
      className: clsx(classes.root, className),
      ref: ref,
    }, other), /*#__PURE__*/
    React.createElement(
      "legend",
      {
        className: classes.legend,
        style: {
          // IE 11: fieldset with legend does not render
          // a border radius. This maintains consistency
          // by always having a legend rendered
          width: notched ? labelWidth : 0.01,
        },
      }, /*#__PURE__*/
      React.createElement("span", {
        dangerouslySetInnerHTML: {
          __html: "&#8203;",
        },
      }),
    ),
  );
});
NotchedOutline.propTypes = {
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
   * The label.
   */
  label: PropTypes.node,

  /**
   * The width of the label.
   */
  labelWidth: PropTypes.number.isRequired,

  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: PropTypes.bool.isRequired,

  /**
   * @ignore
   */
  style: PropTypes.object,
};
export default withStyles(styles, {
  name: "PrivateNotchedOutline",
})(NotchedOutline);
