import _extends from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "https://dev.jspm.io/react@16.13.1";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import Paper from "./Paper.js";
import withStyles from "./styles/withStyles.js";
export var styles = {
  /* Styles applied to the root element. */
  root: {
    overflow: "hidden",
  },
};
var Card = React.forwardRef(function Card(props, ref) {
  var classes = props.classes,
    className = props.className,
    _props$raised = props.raised,
    raised = _props$raised === void 0 ? false : _props$raised,
    other = _objectWithoutProperties(props, ["classes", "className", "raised"]);

  return /*#__PURE__*/ React.createElement(
    Paper,
    _extends({
      className: clsx(classes.root, className),
      elevation: raised ? 8 : 1,
      ref: ref,
    }, other),
  );
});
Card.propTypes = {
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
   * If `true`, the card will use raised styling.
   */
  raised: PropTypes.bool,
};
export default withStyles(styles, {
  name: "MuiCard",
})(Card);
