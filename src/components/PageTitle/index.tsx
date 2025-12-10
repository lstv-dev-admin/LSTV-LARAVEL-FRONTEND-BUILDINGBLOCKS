import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface Props {
  title?: string;
}

const PageTitle = ({ title }: Props) => {

    const { pathname } = useLocation();

    const formatSegment = (segment: string) =>
        segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    const lastSegment = pathname.split("/").filter(Boolean).pop();
    const pageTitle = title || (lastSegment ? formatSegment(lastSegment) : "Application");

    return (
        <Helmet>
            <title>HR-Connect - {pageTitle}</title>
        </Helmet>
    );
};

export default PageTitle;
