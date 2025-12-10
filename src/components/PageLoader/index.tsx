import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useLocation } from "react-router-dom";

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

const PageLoader = () => {
    const location = useLocation();

    useEffect(() => {
        NProgress.start();
        NProgress.done();
        return () => {
            NProgress.done();
        };
    }, [location.pathname]);

    return null;
};

export default PageLoader;