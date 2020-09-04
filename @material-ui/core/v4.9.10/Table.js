import _objectWithoutProperties from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/extends";
import React from "https://dev.jspm.io/react@16.13.1";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import withStyles from "./styles/withStyles.js";
import TableContext from "./Table/TableContext.js";
export var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: "table",
      width: "100%",
      borderCollapse: "collapse",
      borderSpacing: 0,
      "& caption": _extends({}, theme.typography.body2, {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        textAlign: "left",
        captionSide: "bottom",
      }),
    },

    /* Styles applied to the root element if `stickyHeader={true}`. */
    stickyHeader: {
      borderCollapse: "separate",
    },
  };
};
var defaultComponent = "table";
var Table = React.forwardRef(function Table(props, ref) {
  var classes = props.classes,
    className = props.className,
    _props$component = props.component,
    Component = _props$component === void 0
      ? defaultComponent
      : _props$component,
    _props$padding = props.padding,
    padding = _props$padding === void 0 ? "default" : _props$padding,
    _props$size = props.size,
    size = _props$size === void 0 ? "medium" : _props$size,
    _props$stickyHeader = props.stickyHeader,
    stickyHeader = _props$stickyHeader === void 0 ? false : _props$stickyHeader,
    other = _objectWithoutProperties(
      props,
      ["classes", "className", "component", "padding", "size", "stickyHeader"],
    );

  var table = React.useMemo(function () {
    return {
      padding: padding,
      size: size,
      stickyHeader: stickyHeader,
    };
  }, [padding, size, stickyHeader]);
  return /*#__PURE__*/ React.createElement(
    TableContext.Provider,
    {
      value: table,
    }, /*#__PURE__*/
    React.createElement(
      Component,
      _extends({
        role: Component === defaultComponent ? null : "table",
        ref: ref,
        className: clsx(
          classes.root,
          className,
          stickyHeader && classes.stickyHeader,
        ),
      }, other),
    ),
  );
});
Table.propTypes = {
  /**
   * The content of the table, normally `TableHead` and `TableBody`.
   */
  children: PropTypes.node.isRequired,

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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Allows TableCells to inherit padding of the Table.
   */
  padding: PropTypes.oneOf(["default", "checkbox", "none"]),

  /**
   * Allows TableCells to inherit size of the Table.
   */
  size: PropTypes.oneOf(["small", "medium"]),

  /**
   * Set the header sticky.
   *
   * ⚠️ It doesn't work with IE 11.
   */
  stickyHeader: PropTypes.bool,
};
export default withStyles(styles, {
  name: "MuiTable",
})(Table);