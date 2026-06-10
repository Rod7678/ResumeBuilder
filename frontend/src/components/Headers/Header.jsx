import siteLogo from "../../assets/Logo.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../ResumePdf";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router";
import Button from "../UI/Button";

// import { useUser } from "../../context/UserContext";

export default function Header() {
  // const { user } = useUser();

  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("//resumeCreate");
  };

  return (
    <header className="flex justify-between">
      <Link to="/">
        <div className="flex flex-col md:flex-row ">
          <img src={siteLogo} alt="Resume Builder" className="h-9 mr-2"/>
          <div className="flex flex-row md:flex-col md:text-start tracking-wide md:justify-center">
            <h4 className="resume-lo1 text-3xl font-bold">Resume</h4>
            <h4 className="text-3xl font-bold resume-lo2">Forge</h4>
          </div>
        </div>
      </Link>
      <PDFDownloadLink
        // document={<ResumePDF user={user} />}
        fileName="resume.pdf"
      >
        {({ loading }) => (
          <button className="btn-primary">
            {loading ? "Preparing..." : "Download Resume"}
          </button>
        )}
      </PDFDownloadLink>
      {location.pathname == "/" && (
        <button
          className="btn-ful text-xl flex-end w-fit py-3 px-5 font-semibold rounded-xl"
          onClick={handleClick}
        >
          Get Started
        </button>
      )}
    </header>
  );
}
