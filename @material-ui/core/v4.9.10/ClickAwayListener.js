import React from "https://dev.jspm.io/react@16.13.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@16.13.1";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import ownerDocument from "./utils/ownerDocument.js";
import useForkRef from "./utils/useForkRef.js";
import useEventCallback from "./utils/useEventCallback.js";
import {
  elementAcceptingRef,
  exactProp,
} from "https://cdn.skypack.dev/@material-ui/utils@4.10.2";

function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}
/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */

function ClickAwayListener(props) {
  var children = props.children,
    _props$disableReactTr = props.disableReactTree,
    disableReactTree = _props$disableReactTr === void 0
      ? false
      : _props$disableReactTr,
    _props$mouseEvent = props.mouseEvent,
    mouseEvent = _props$mouseEvent === void 0 ? "onClick" : _props$mouseEvent,
    onClickAway = props.onClickAway,
    _props$touchEvent = props.touchEvent,
    touchEvent = _props$touchEvent === void 0 ? "onTouchEnd"
    : _props$touchEvent;
  var movedRef = React.useRef(false);
  var nodeRef = React.useRef(null);
  var mountedRef = React.useRef(false);
  var syntheticEventRef = React.useRef(false);
  React.useEffect(function () {
    mountedRef.current = true;
    return function () {
      mountedRef.current = false;
    };
  }, []); // can be removed once we drop support for non ref forwarding class components

  var handleOwnRef = React.useCallback(function (instance) {
    // #StrictMode ready
    nodeRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  var handleRef = useForkRef(children.ref, handleOwnRef); // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviours like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.

  var handleClickAway = useEventCallback(function (event) {
    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    var insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false; // 1. IE 11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.

    if (!mountedRef.current || !nodeRef.current) {
      return;
    } // Do not act if user performed touchmove

    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    var insideDOM; // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js

    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      var doc = ownerDocument(nodeRef.current); // TODO v6 remove dead logic https://caniuse.com/#search=composedPath.
      // `doc.contains` works in modern browsers but isn't supported in IE 11:
      // https://github.com/timmywil/panzoom/issues/450
      // https://github.com/videojs/video.js/pull/5872

      insideDOM =
        !(doc.documentElement && doc.documentElement.contains(event.target)) ||
        nodeRef.current.contains(event.target);
    }

    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  }); // Keep track of mouse/touch events that bubbled up through the portal.

  var createHandleSynthetic = function createHandleSynthetic(handlerName) {
    return function (event) {
      syntheticEventRef.current = true;
      var childrenPropsHandler = children.props[handlerName];

      if (childrenPropsHandler) {
        childrenPropsHandler(event);
      }
    };
  };

  var childrenProps = {
    ref: handleRef,
  };

  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }

  React.useEffect(function () {
    if (touchEvent !== false) {
      var mappedTouchEvent = mapEventPropToEvent(touchEvent);
      var doc = ownerDocument(nodeRef.current);

      var handleTouchMove = function handleTouchMove() {
        movedRef.current = true;
      };

      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener("touchmove", handleTouchMove);
      return function () {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener("touchmove", handleTouchMove);
      };
    }

    return undefined;
  }, [handleClickAway, touchEvent]);

  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }

  React.useEffect(function () {
    if (mouseEvent !== false) {
      var mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      var doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return function () {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }

    return undefined;
  }, [handleClickAway, mouseEvent]);
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    React.cloneElement(children, childrenProps),
  );
}

ClickAwayListener.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The wrapped element.
   */
  children: elementAcceptingRef.isRequired,

  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  disableReactTree: PropTypes.bool,

  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: PropTypes.oneOf(["onClick", "onMouseDown", "onMouseUp", false]),

  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: PropTypes.func.isRequired,

  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: PropTypes.oneOf(["onTouchEnd", "onTouchStart", false]),
};

// eslint-disable-next-line
ClickAwayListener["propTypes" + ""] = exactProp(ClickAwayListener.propTypes);

export default ClickAwayListener;
