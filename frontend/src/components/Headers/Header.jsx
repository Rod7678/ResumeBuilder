// import siteLogo from "../../assets/Logo.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../ResumePdf";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router";
import Button from "../UI/Button";
import { useEffect, useState } from "react";

import { useUser } from "../../context/UserContext";

export default function Header() {
  const { user } = useUser();
  const [mobileScreen, setMobileScreen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("//resumeCreate");
  };

  useEffect(() => {
    if (window.innerWidth < 600) {
      setMobileScreen(true);
    }
    return;
  }, []);

  return (
    <header className="flex justify-between">
      <Link to="/">
        <div className="flex flex-col md:flex-row ">
          {!mobileScreen ? (
            <img src="/resumeforge-navbar-logo.svg" alt="Resume Builder" />
          ) : (
            <img
              src="/resumeforge-logo-icon.svg"
              alt="Resume Builder"
              className="h-9 mr-2"
            />
          )}
        </div>
      </Link>
      {location.pathname == "/resumeCreate" && (
        <PDFDownloadLink
          document={<ResumePDF user={user} />}
          fileName="resume.pdf"
        >
          {({ loading }) => (
            <button className="btn-ful text-lg flex-end w-fit py-2 px-4 font-semibold rounded-xl">
              {loading ? "Preparing..." : "Download Resume"}
            </button>
          )}
        </PDFDownloadLink>
      )}
      {location.pathname == "/" && (
        <div className="navigation  flex flex-row gap-4 items-center">
          <ul className="navigator flex flex-row gap-4">
            <li>
              <a href="#templates">Templates</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href=""></a>
            </li>
          </ul>
          <button
            className="btn-ful text-lg flex-end w-fit py-2 px-4 font-semibold rounded-xl"
            onClick={handleClick}
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
