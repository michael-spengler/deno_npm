import _extends from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "https://dev.jspm.io/react@16.13.1";
import { isFragment } from "https://cdn.skypack.dev/react-is";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import ReactDOM from "https://cdn.skypack.dev/react-dom@16.13.1";
import ownerDocument from "./utils/ownerDocument.js";
import List from "./List.js";
import getScrollbarSize from "./utils/getScrollbarSize.js";
import useForkRef from "./utils/useForkRef.js";

function nextItem(list, item, disableListWrap) {
  if (list === item) {
    return list.firstChild;
  }

  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }

  return disableListWrap ? null : list.firstChild;
}

function previousItem(list, item, disableListWrap) {
  if (list === item) {
    return disableListWrap ? list.firstChild : list.lastChild;
  }

  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }

  return disableListWrap ? null : list.lastChild;
}

function textCriteriaMatches(nextFocus, textCriteria) {
  if (textCriteria === undefined) {
    return true;
  }

  var text = nextFocus.innerText;

  if (text === undefined) {
    // jsdom doesn't support innerText
    text = nextFocus.textContent;
  }

  text = text.trim().toLowerCase();

  if (text.length === 0) {
    return false;
  }

  if (textCriteria.repeating) {
    return text[0] === textCriteria.keys[0];
  }

  return text.indexOf(textCriteria.keys.join("")) === 0;
}

function moveFocus(
  list,
  currentFocus,
  disableListWrap,
  disabledItemsFocusable,
  traversalFunction,
  textCriteria,
) {
  var wrappedOnce = false;
  var nextFocus = traversalFunction(
    list,
    currentFocus,
    currentFocus ? disableListWrap : false,
  );

  while (nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return;
      }

      wrappedOnce = true;
    } // Same logic as useAutocomplete.js

    var nextFocusDisabled = disabledItemsFocusable
      ? false
      : nextFocus.disabled ||
        nextFocus.getAttribute("aria-disabled") === "true";

    if (
      !nextFocus.hasAttribute("tabindex") ||
      !textCriteriaMatches(nextFocus, textCriteria) || nextFocusDisabled
    ) {
      // Move to the next element.
      nextFocus = traversalFunction(list, nextFocus, disableListWrap);
    } else {
      nextFocus.focus();
      return;
    }
  }
}

var useEnhancedEffect = typeof window === "undefined"
  ? React.useEffect
  : React.useLayoutEffect;
/**
 * A permanently displayed menu following https://www.w3.org/TR/wai-aria-practices/#menubutton.
 * It's exposed to help customization of the [`Menu`](/api/menu/) component. If you
 * use it separately you need to move focus into the component manually. Once
 * the focus is placed inside the component it is fully keyboard accessible.
 */

var MenuList = React.forwardRef(function MenuList(props, ref) {
  var actions = props.actions,
    _props$autoFocus = props.autoFocus,
    autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
    _props$autoFocusItem = props.autoFocusItem,
    autoFocusItem = _props$autoFocusItem === void 0
      ? false
      : _props$autoFocusItem,
    children = props.children,
    className = props.className,
    _props$disabledItemsF = props.disabledItemsFocusable,
    disabledItemsFocusable = _props$disabledItemsF === void 0
      ? false
      : _props$disabledItemsF,
    _props$disableListWra = props.disableListWrap,
    disableListWrap = _props$disableListWra === void 0 ? false
    : _props$disableListWra,
    onKeyDown = props.onKeyDown,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? "selectedMenu" : _props$variant,
    other = _objectWithoutProperties(
      props,
      [
        "actions",
        "autoFocus",
        "autoFocusItem",
        "children",
        "className",
        "disabledItemsFocusable",
        "disableListWrap",
        "onKeyDown",
        "variant",
      ],
    );

  var listRef = React.useRef(null);
  var textCriteriaRef = React.useRef({
    keys: [],
    repeating: true,
    previousKeyMatched: true,
    lastTime: null,
  });
  useEnhancedEffect(function () {
    if (autoFocus) {
      listRef.current.focus();
    }
  }, [autoFocus]);
  React.useImperativeHandle(actions, function () {
    return {
      adjustStyleForScrollbar: function adjustStyleForScrollbar(
        containerElement,
        theme,
      ) {
        // Let's ignore that piece of logic if users are already overriding the width
        // of the menu.
        var noExplicitWidth = !listRef.current.style.width;

        if (
          containerElement.clientHeight < listRef.current.clientHeight &&
          noExplicitWidth
        ) {
          var scrollbarSize = "".concat(getScrollbarSize(true), "px");
          listRef.current.style[
            theme.direction === "rtl"
              ? "paddingLeft"
              : "paddingRight"
          ] = scrollbarSize;
          listRef.current.style.width = "calc(100% + ".concat(
            scrollbarSize,
            ")",
          );
        }

        return listRef.current;
      },
    };
  }, []);

  var handleKeyDown = function handleKeyDown(event) {
    var list = listRef.current;
    var key = event.key;
    /**
     * @type {Element} - will always be defined since we are in a keydown handler
     * attached to an element. A keydown event is either dispatched to the activeElement
     * or document.body or document.documentElement. Only the first case will
     * trigger this specific handler.
     */

    var currentFocus = ownerDocument(list).activeElement;

    if (key === "ArrowDown") {
      // Prevent scroll of the page
      event.preventDefault();
      moveFocus(
        list,
        currentFocus,
        disableListWrap,
        disabledItemsFocusable,
        nextItem,
      );
    } else if (key === "ArrowUp") {
      event.preventDefault();
      moveFocus(
        list,
        currentFocus,
        disableListWrap,
        disabledItemsFocusable,
        previousItem,
      );
    } else if (key === "Home") {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, nextItem);
    } else if (key === "End") {
      event.preventDefault();
      moveFocus(
        list,
        null,
        disableListWrap,
        disabledItemsFocusable,
        previousItem,
      );
    } else if (key.length === 1) {
      var criteria = textCriteriaRef.current;
      var lowerKey = key.toLowerCase();
      var currTime = performance.now();

      if (criteria.keys.length > 0) {
        // Reset
        if (currTime - criteria.lastTime > 500) {
          criteria.keys = [];
          criteria.repeating = true;
          criteria.previousKeyMatched = true;
        } else if (criteria.repeating && lowerKey !== criteria.keys[0]) {
          criteria.repeating = false;
        }
      }

      criteria.lastTime = currTime;
      criteria.keys.push(lowerKey);
      var keepFocusOnCurrent = currentFocus && !criteria.repeating &&
        textCriteriaMatches(currentFocus, criteria);

      if (
        criteria.previousKeyMatched &&
        (keepFocusOnCurrent ||
          moveFocus(
            list,
            currentFocus,
            false,
            disabledItemsFocusable,
            nextItem,
            criteria,
          ))
      ) {
        event.preventDefault();
      } else {
        criteria.previousKeyMatched = false;
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  var handleOwnRef = React.useCallback(function (instance) {
    // #StrictMode ready
    listRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  var handleRef = useForkRef(handleOwnRef, ref);
  /**
   * the index of the item should receive focus
   * in a `variant="selectedMenu"` it's the first `selected` item
   * otherwise it's the very first item.
   */

  var activeItemIndex = -1; // since we inject focus related props into children we have to do a lookahead
  // to check if there is a `selected` item. We're looking for the last `selected`
  // item and use the first valid item as a fallback

  React.Children.forEach(children, function (child, index) {
    if (!React.isValidElement(child)) {
      return;
    }

    if (isFragment(child)) {
      console.error(
        [
          "Material-UI: the Menu component doesn't accept a Fragment as a child.",
          "Consider providing an array instead.",
        ].join("\n"),
      );
    }

    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });
  var items = React.Children.map(children, function (child, index) {
    if (index === activeItemIndex) {
      var newChildProps = {};

      if (autoFocusItem) {
        newChildProps.autoFocus = true;
      }

      if (child.props.tabIndex === undefined && variant === "selectedMenu") {
        newChildProps.tabIndex = 0;
      }

      return React.cloneElement(child, newChildProps);
    }

    return child;
  });
  return /*#__PURE__*/ React.createElement(
    List,
    _extends({
      role: "menu",
      ref: handleRef,
      className: className,
      onKeyDown: handleKeyDown,
      tabIndex: autoFocus ? 0 : -1,
    }, other),
    items,
  );
});
MenuList.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   */
  autoFocus: PropTypes.bool,

  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   */
  autoFocusItem: PropTypes.bool,

  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: PropTypes.node,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * If `true`, will allow focus on disabled items.
   */
  disabledItemsFocusable: PropTypes.bool,

  /**
   * If `true`, the menu items will not wrap focus.
   */
  disableListWrap: PropTypes.bool,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   */
  variant: PropTypes.oneOf(["menu", "selectedMenu"]),
};
export default MenuList;