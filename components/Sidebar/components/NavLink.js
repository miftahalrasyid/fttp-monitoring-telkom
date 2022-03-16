import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';

export { NavLink };

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    passHref: PropTypes.bool,
    exact: PropTypes.bool
};

NavLink.defaultProps = {
    exact: false
};

function NavLink({ href, exact,passHref, children, ...props }) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += ' active';
    }

    return (
        <Link href={href} {...passHref}>
            <a {...props}>
                {children}
            </a>
        </Link>
    );
}