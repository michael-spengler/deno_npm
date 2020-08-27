import _extends from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "https://dev.jspm.io/react@16.13.1";
import { isFragment } from "https://cdn.skypack.dev/react-is";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import withStyles from "./styles/withStyles.js";
import Typography from "./Typography.js";
import BreadcrumbCollapsed from "./Breadcrumbs/BreadcrumbCollapsed.js";
export var styles = {
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the ol element. */
  ol: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    padding: 0,
    margin: 0,
    listStyle: "none",
  },

  /* Styles applied to the li element. */
  li: {},

  /* Styles applied to the separator element. */
  separator: {
    display: "flex",
    userSelect: "none",
    marginLeft: 8,
    marginRight: 8,
  },
};

function insertSeparators(items, className, separator) {
  return items.reduce(function (acc, current, index) {
    if (index < items.length - 1) {
      acc = acc.concat(
        current, /*#__PURE__*/
        React.createElement("li", {
          "aria-hidden": true,
          key: "separator-".concat(index),
          className: className,
        }, separator),
      );
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
}

var Breadcrumbs = React.forwardRef(function Breadcrumbs(props, ref) {
  var children = props.children,
    classes = props.classes,
    className = props.className,
    _props$component = props.component,
    Component = _props$component === void 0 ? "nav" : _props$component,
    _props$expandText = props.expandText,
    expandText = _props$expandText === void 0 ? "Show path" : _props$expandText,
    _props$itemsAfterColl = props.itemsAfterCollapse,
    itemsAfterCollapse = _props$itemsAfterColl === void 0
      ? 1
      : _props$itemsAfterColl,
    _props$itemsBeforeCol = props.itemsBeforeCollapse,
    itemsBeforeCollapse = _props$itemsBeforeCol === void 0
      ? 1
      : _props$itemsBeforeCol,
    _props$maxItems = props.maxItems,
    maxItems = _props$maxItems === void 0 ? 8 : _props$maxItems,
    _props$separator = props.separator,
    separator = _props$separator === void 0 ? "/" : _props$separator,
    other = _objectWithoutProperties(
      props,
      [
        "children",
        "classes",
        "className",
        "component",
        "expandText",
        "itemsAfterCollapse",
        "itemsBeforeCollapse",
        "maxItems",
        "separator",
      ],
    );

  var _React$useState = React.useState(false),
    expanded = _React$useState[0],
    setExpanded = _React$useState[1];

  var renderItemsBeforeAndAfter = function renderItemsBeforeAndAfter(allItems) {
    var handleClickExpand = function handleClickExpand(event) {
      setExpanded(true); // The clicked element received the focus but gets removed from the DOM.
      // Let's keep the focus in the component after expanding.

      var focusable = event.currentTarget.parentNode.querySelector(
        "a[href],button,[tabindex]",
      );

      if (focusable) {
        focusable.focus();
      }
    }; // This defends against someone passing weird input, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem

    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      console.error(
        [
          "Material-UI: you have provided an invalid combination of props to the Breadcrumbs.",
          "itemsAfterCollapse={".concat(
            itemsAfterCollapse,
            "} + itemsBeforeCollapse={",
          ).concat(itemsBeforeCollapse, "} >= maxItems={").concat(
            maxItems,
            "}",
          ),
        ].join("\n"),
      );

      return allItems;
    }

    return [].concat(
      _toConsumableArray(allItems.slice(0, itemsBeforeCollapse)),
      [/*#__PURE__*/ React.createElement(BreadcrumbCollapsed, {
        "aria-label": expandText,
        key: "ellipsis",
        onClick: handleClickExpand,
      })],
      _toConsumableArray(
        allItems.slice(allItems.length - itemsAfterCollapse, allItems.length),
      ),
    );
  };

  var allItems = React.Children.toArray(children).filter(function (child) {
    if (isFragment(child)) {
      console.error(
        [
          "Material-UI: the Breadcrumbs component doesn't accept a Fragment as a child.",
          "Consider providing an array instead.",
        ].join("\n"),
      );
    }

    return React.isValidElement(child);
  }).map(function (child, index) {
    return /*#__PURE__*/ React.createElement("li", {
      className: classes.li,
      key: "child-".concat(index),
    }, child);
  });
  return /*#__PURE__*/ React.createElement(
    Typography,
    _extends({
      ref: ref,
      component: Component,
      color: "textSecondary",
      className: clsx(classes.root, className),
    }, other), /*#__PURE__*/
    React.createElement(
      "ol",
      {
        className: classes.ol,
      },
      insertSeparators(
        expanded || maxItems && allItems.length <= maxItems
          ? allItems
          : renderItemsBeforeAndAfter(allItems),
        classes.separator,
        separator,
      ),
    ),
  );
});
Breadcrumbs.propTypes = {
  /**
   * The breadcrumb children.
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
   * By default, it maps the variant to a good default headline component.
   */
  component: PropTypes.elementType,

  /**
   * Override the default label for the expand button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  expandText: PropTypes.string,

  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   */
  itemsAfterCollapse: PropTypes.number,

  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   */
  itemsBeforeCollapse: PropTypes.number,

  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more
   * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
   * will be shown, with an ellipsis in between.
   */
  maxItems: PropTypes.number,

  /**
   * Custom separator node.
   */
  separator: PropTypes.node,
};
export default withStyles(styles, {
  name: "MuiBreadcrumbs",
})(Breadcrumbs);
