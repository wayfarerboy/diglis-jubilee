/* eslint-disable react/display-name,react/prop-types */
import React from 'react';
import { oneOf, string, object, oneOfType, func, bool } from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

import { sizes } from '../helpers/markdown';

const ParagraphNode =
  (size, style, align, component, className) =>
  ({ children }) =>
    (
      <Typography
        style={{
          ...style,
          whiteSpace: 'pre-line',
          lineHeight: 1.5,
          fontWeight: 400,
        }}
        paragraph
        variant={sizes.body[size]}
        align={align}
        component={component}
        className={className}
      >
        {children}
      </Typography>
    );

const HeaderNode =
  (size, style, align, component) =>
  ({ children, level }) =>
    (
      <Typography
        style={{ ...style, whiteSpace: 'pre-line' }}
        paragraph
        variant={sizes.header[size][`h${level}`]}
        align={align}
        component={component || `h${level}`}
      >
        {children}
      </Typography>
    );

const ListNode =
  (size, style = { paddingLeft: 40 }, align, component, className) =>
  ({ children, ordered }) =>
    (
      <Typography
        paragraph
        component={ordered ? 'ol' : 'ul'}
        variant={sizes.body[size]}
        style={style}
        align={align}
        className={className}
      >
        {children}
      </Typography>
    );

const LinkNode = ({ href, title, children }) => (
  <Link href={href} title={title} style={{ cursor: 'pointer' }}>
    {children}
  </Link>
);

const StrippedNode = ({ children }) => (
  <>
    {children &&
      React.Children.map(children, (child) =>
        typeof child === 'string' ? child.split('\n') : child,
      ).map((c, index) => (
        <React.Fragment key={`part-${index}`}>{c} </React.Fragment>
      ))}
  </>
);

const DividerNode = (size, style, component, className) => () =>
  <Divider className={className} style={{ marginBottom: 16, ...style }} />;

const renderers = (size, style = {}, align, component, classes = {}) => {
  const header = HeaderNode(size, style, align, component);
  const headings = {};
  Array.from(Array(6)).forEach((_, i) => {
    headings[`h${i + 1}`] = header;
  });
  const list = ListNode(size, style, align, component, classes.li);
  return {
    p: ParagraphNode(size, style, align, component, classes.p),
    hr: DividerNode(size, style, component, classes.hr),
    a: LinkNode,
    ul: list,
    ol: list,
    ...headings,
  };
};

const Markdown = ({
  className,
  classes,
  component,
  align,
  style = {},
  size = 'medium',
  strip,
  text,
}) => {
  const opts = {
    unwrapDisallowed: true,
    allowedElements: [
      'em',
      'strong',
      'b',
      'a',
      'li',
      'p',
      'hr',
      ...Array.from(Array(6)).map((_, i) => `h${i + 1}`),
      'ul',
      'ol',
      'span',
      'div',
    ],
  };
  let newRenderers = {};
  if (strip) {
    opts.allowedElements.forEach((type) => (newRenderers[type] = StrippedNode));
  } else {
    newRenderers = renderers(size, style, align, component, classes);
  }
  opts.components = newRenderers;
  return (
    <ReactMarkdown className={className} style={style} {...opts}>
      {text}
    </ReactMarkdown>
  );
};

Markdown.displayName = 'Markdown';
Markdown.propTypes = {
  className: string,
  classes: object,
  component: oneOfType([string, func]),
  align: string,
  style: object,
  size: oneOf(['small', 'medium', 'large', 'xs', 'sm', 'md', 'lg', 'xl']),
  strip: bool,
  text: string,
  children: string,
};

export default Markdown;
