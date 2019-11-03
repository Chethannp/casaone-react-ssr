import styled from "styled-components";

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  @media only screen and (max-width: 1199px) {
    width: 95%;
  }
`;

//Helper methods to extract the values
function getWidthString(span) {
  if (!span) return;

  let width = (span / 12) * 100;
  return `width: ${width}%`;
}

const addPaddingStyles = (a, props) => {
  let style =
    a.indexOf("pad") === 0 && props[a] && !isNaN(a.slice(3))
      ? `padding:${a.slice(3)}px;`
      : "";
  style +=
    a.indexOf("padT") === 0 && props[a] ? `padding-top:${a.slice(4)}px;` : "";
  style +=
    a.indexOf("padR") === 0 && props[a] ? `padding-right:${a.slice(4)}px;` : "";
  style +=
    a.indexOf("padB") === 0 && props[a]
      ? `padding-bottom:${a.slice(4)}px;`
      : "";
  style +=
    a.indexOf("padL") === 0 && props[a] ? `padding-left:${a.slice(4)}px;` : "";
  return style;
};

const addMarginStyles = (a, props) => {
  let style =
    a.indexOf("mar") === 0 && props[a] && !isNaN(a.slice(3))
      ? `margin:${a.slice(3)}px;`
      : "";
  style += a.indexOf("marAuto") === 0 ? "margin:0 auto;" : "";
  style +=
    a.indexOf("marT") === 0 && props[a] ? `margin-top:${a.slice(4)}px;` : "";
  style +=
    a.indexOf("marR") === 0 && props[a] ? `margin-right:${a.slice(4)}px;` : "";
  style +=
    a.indexOf("marB") === 0 && props[a] ? `margin-bottom:${a.slice(4)}px;` : "";
  style +=
    a.indexOf("marL") === 0 && props[a] ? `margin-left:${a.slice(4)}px;` : "";
  return style;
};

const Row = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

const Column = styled.div`
  float: left;
  ${({ xs }) => (xs ? getWidthString(xs) : "width: 100%")};
  @media screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
  }
  @media screen and (min-width: 992px) {
    ${({ md }) => md && getWidthString(md)};
  }
  @media screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
`;

const Div = styled.div`
  ${props => {
    let style = "";
    Object.keys(props).forEach(a => {
      style += addPaddingStyles(a, props);
      style += addMarginStyles(a, props);
    });
    /* Dimensions Properties */
    style += props.width ? `width:${props.width};` : "";
    style += props.height ? `height:${props.height};` : "";
    /* Text Properties */
    style += props.color ? `color: ${props.theme.colors[props.color]};` : "";
    style += props.fontSize
      ? `font-size: ${props.theme.fontSize[props.fontSize]};`
      : "";
    style += props.fontWeight
      ? `font-weight: ${props.theme.fontWeight[props.fontWeight]};`
      : "";
    style += props.textAlign
      ? `text-align: ${props.theme.textAlign[props.textAlign]};`
      : "";
    style += props.textCase
      ? `text-transform: ${props.theme.textTransform[props.textCase]};`
      : "";
    /* Position Properties */
    style += props.posAbs ? "position:absolute;" : "";
    style += props.posRel ? "position:relative;" : "";
    style += props.posFixed ? "position: fixed; top:0; left:0;" : "";
    style += props.posSticky ? "position: sticky; top:0; left:0;right:0;" : "";
    /* Overflow Properties */
    style += props.overflowX
      ? `overflow-x: ${props.overflowX};`
      : "overflow-x: inherit;";
    style += props.overflowY
      ? `overflow-y: ${props.overflowY};`
      : "overflow-y: inherit;";
    /* Background Properties */
    style += props.bg
      ? `background-color: ${props.theme.colors[props.bg]};`
      : "";
    style += props.boxShadow
      ? `box-shadow: 0 1px 3px 0 ${props.theme.colors[props.boxShadow]};`
      : "";
    style += props.borderStyle
      ? `border: 1px solid ${props.theme.colors[props.borderStyle]};`
      : "";
    style += props.borderRadius
      ? `border-radius: ${props.theme.baseRadius};`
      : "";
    /* Flex Properties */
    style += props.alignSelfStretch
      ? "align-self:stretch;"
      : props.alignSelfStart
      ? "align-self:flex-start;"
      : props.alignSelfEnd
      ? "align-self:flex-end;"
      : "";
    style += props.grow ? "flex-grow:1;" : "flex-grow:inherit;";
    style += props.flexReset ? "flex:0 0 auto;" : "";
    style += props.flexBasis ? `flex-basis:${props.flexBasis};` : "";
    style += props.zIndex ? `z-index: ${props.zIndex};` : 0;
    return style;
  }};
`;

const FlexBox = styled(Div)`
  display: flex;
  flex-grow: ${props => {
    if (props.flexGrow) return `${props.flexGrow}`;
    return 1;
  }};
  align-items: ${props => {
    if (props.alignStart) return "flex-start";
    if (props.alignStretch) return "stretch";
    if (props.alignCenter) return "center";
    return "flex-start";
  }};
  justify-content: ${props => {
    if (props.jcEnd) return "flex-end";
    if (props.jcStart) return "flex-start";
    if (props.jcSpaceBetween) return "space-between";
    if (props.jcSpaceAround) return "space-around";
    if (props.jcCenter) return "center";
    return "center";
  }};
  flex-flow: ${props => {
    if (props.flowWrap) return "wrap";
    if (props.flowCol) return "column";
    return "";
  }};
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors[props.bg]};
  border: 1px solid ${props => props.theme.colors[props.bg]};
  color: #fff;
  text-transform: uppercase;
  border-radius: 3px !important;
  padding: 5px 8px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.30196078431372547);
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
`;

export { Container, Row, Column, Div, FlexBox, Button };
