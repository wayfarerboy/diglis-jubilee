import React from 'react';
import { object, string, oneOfType, bool, func } from 'prop-types';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';

const Anchor = styled('a')({
  cursor: 'pointer',
});

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
  const {
    linkAs,
    href,
    prefetch = false,
    shallow,
    scroll,
    locale,
    ...other
  } = props;
  return (
    <NextLink
      href={href}
      passHref={!!href}
      prefetch={prefetch}
      as={linkAs}
      shallow={shallow}
      scroll={scroll}
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  linkAs: string,
  href: string,
  prefetch: bool,
  shallow: bool,
  scroll: bool,
  locale: string,
};

NextComposed.displayName = 'MuiLinkComposed';

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = ({
  activeClassName = 'active',
  className: _className,
  innerRef,
  naked,
  component: Component = MuiLink,
  external,
  componentProps = {},
  href = '',
  as,
  onClick: click,
  shallow,
  target,
  ...other
}) => {
  const router = useRouter() || {};
  let hrefProps = { href };
  const className = `${_className || ''} ${
    router.pathname === href ? activeClassName : ''
  }`;
  const onClick = (ev) => {
    const promise = click(ev);
    if (target !== '_blank') {
      if (promise?.then) {
        promise.then(() => {
          router?.push(href, as, { shallow });
        });
      } else {
        router?.push(href, as, { shallow });
      }
    }
  };
  if (external || click) {
    if (click) hrefProps = { onClick };
    return (
      <Component
        className={className}
        href={target === '_blank' ? href : null}
        target={target}
        {...other}
        {...componentProps}
        {...hrefProps}
      />
    );
  }
  if (naked)
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        linkAs={as}
        {...other}
        {...hrefProps}
      />
    );
  return (
    <Component
      component={NextComposed}
      className={className}
      ref={innerRef}
      target={target}
      onClick={click}
      linkAs={as}
      {...other}
      {...componentProps}
      {...hrefProps}
    />
  );
};

Link.propTypes = {
  activeClassName: string,
  as: string,
  className: string,
  href: string,
  innerRef: oneOfType([func, object]),
  naked: bool,
  onClick: func,
  prefetch: bool,
  component: oneOfType([func, object]),
  external: bool,
  shallow: bool,
  componentProps: object,
  target: string,
};

const Wrapper = React.forwardRef((props, ref) => (
  <Link {...props} innerRef={ref} />
));
Wrapper.displayName = 'MuiLinkWrapper';

export default Wrapper;
