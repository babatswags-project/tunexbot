import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        // If navigating to a new page (not using back/forward buttons), 
        // and there is no hash (anchor link target), scroll to top.
        if (navType !== 'POP' && !location.hash) {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash, navType]);

    return null;
};

export default ScrollToTop;
