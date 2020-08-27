import _extends from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "https://cdn.skypack.dev/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "https://dev.jspm.io/react@16.13.1";
import PropTypes from "https://cdn.skypack.dev/prop-types@15.7.2";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import withStyles from "./styles/withStyles.js";
import { chainPropTypes } from "https://cdn.skypack.dev/@material-ui/utils@4.10.2";
export var styles = {
  /* Styles applied to the root element. */
  root: {
    display: "block",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },

  /* Styles applied to the root element if `component="video, audio, picture, iframe, or img"`. */
  media: {
    width: "100%",
  },

  /* Styles applied to the root element if `component="picture or img"`. */
  img: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover",
  },
};
var MEDIA_COMPONENTS = ["video", "audio", "picture", "iframe", "img"];
var CardMedia = React.forwardRef(function CardMedia(props, ref) {
  var children = props.children,
    classes = props.classes,
    className = props.className,
    _props$component = props.component,
    Component = _props$component === void 0 ? "div" : _props$component,
    image = props.image,
    src = props.src,
    style = props.style,
    other = _objectWithoutProperties(
      props,
      [
        "children",
        "classes",
        "className",
        "component",
        "image",
        "src",
        "style",
      ],
    );

  var isMediaComponent = MEDIA_COMPONENTS.indexOf(Component) !== -1;
  var composedStyle = !isMediaComponent && image
    ? _extends({
      backgroundImage: 'url("'.concat(image, '")'),
    }, style)
    : style;
  return /*#__PURE__*/ React.createElement(
    Component,
    _extends({
      className: clsx(
        classes.root,
        className,
        isMediaComponent && classes.media,
        "picture img".indexOf(Component) !== -1 && classes.img,
      ),
      ref: ref,
      style: composedStyle,
      src: isMediaComponent ? image || src : undefined,
    }, other),
    children,
  );
});
CardMedia.propTypes = {
  /**
   * The content of the component.
   */
  children: chainPropTypes(PropTypes.node, function (props) {
    if (!props.children && !props.image && !props.src && !props.component) {
      return new Error(
        "Material-UI: either `children`, `image`, `src` or `component` prop must be specified.",
      );
    }

    return null;
  }),

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
   * Component for rendering image.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: PropTypes.string,

  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src: PropTypes.string,

  /**
   * @ignore
   */
  style: PropTypes.object,
};
export default withStyles(styles, {
  name: "MuiCardMedia",
})(CardMedia);
