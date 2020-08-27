import _extends from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "https://dev.jspm.io/react@16.13.1";
import { isFragment } from "https://cdn.skypack.dev/react-is";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import withStyles from "./styles/withStyles.js";
export var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: "flex",
      justifyContent: "center",
      height: 56,
      backgroundColor: theme.palette.background.paper,
    },
  };
};
var BottomNavigation = React.forwardRef(function BottomNavigation(props, ref) {
  var children = props.children,
    classes = props.classes,
    className = props.className,
    _props$component = props.component,
    Component = _props$component === void 0 ? "div" : _props$component,
    onChange = props.onChange,
    _props$showLabels = props.showLabels,
    showLabels = _props$showLabels === void 0 ? false : _props$showLabels,
    value = props.value,
    other = _objectWithoutProperties(
      props,
      [
        "children",
        "classes",
        "className",
        "component",
        "onChange",
        "showLabels",
        "value",
      ],
    );

  return /*#__PURE__*/ React.createElement(
    Component,
    _extends({
      className: clsx(classes.root, className),
      ref: ref,
    }, other),
    React.Children.map(children, function (child, childIndex) {
      if (!React.isValidElement(child)) {
        return null;
      }

      if (isFragment(child)) {
        console.error(
          [
            "Material-UI: the BottomNavigation component doesn't accept a Fragment as a child.",
            "Consider providing an array instead.",
          ].join("\n"),
        );
      }

      var childValue = child.props.value === undefined
        ? childIndex
        : child.props.value;
      return React.cloneElement(child, {
        selected: childValue === value,
        showLabel: child.props.showLabel !== undefined
          ? child.props.showLabel
          : showLabels,
        value: childValue,
        onChange: onChange,
      });
    }),
  );
});
BottomNavigation.propTypes = {
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {any} value We default to the index of the child.
   */
  onChange: PropTypes.func,

  /**
   * If `true`, all `BottomNavigationAction`s will show their labels.
   * By default, only the selected `BottomNavigationAction` will show its label.
   */
  showLabels: PropTypes.bool,

  /**
   * The value of the currently selected `BottomNavigationAction`.
   */
  value: PropTypes.any,
};
export default withStyles(styles, {
  name: "MuiBottomNavigation",
})(BottomNavigation);
