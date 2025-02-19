import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <Footer container>
      <div className="w-full">
        {/* <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Link to={"/"}>
              <img
                src="/lsmLogo.png"
                className="mr-3 w-16"
                alt="Flowbite React Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Flowbite</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div> */}
          
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Link to={"/"}>
              <img
                src="/lsmLogo.png"
                className="mr-3 w-16"
                alt="Flowbite React Logo"
              />
            </Link>
         
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/meet.chauhan.330?mibextid=wwXIfr&rdid=brPsHWvfmfITljBN&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AjCSYxieV%2F%3Fmibextid%3DwwXIfr"
              icon={BsFacebook}
              target="_blank"
            />
            <Footer.Icon
              href="https://www.instagram.com/meet_224/profilecard/?igsh=Z3Y3b2h3ejBnbGVw"
              icon={BsInstagram}
              target="_blank"
            />
            <Footer.Icon
              href="https://x.com/meet_224?s=21"
              icon={BsTwitter}
              target="_blank"
            />
            <Footer.Icon
              href="https://github.com/meetchauhan"
              icon={BsGithub}
              target="_blank"
            />
            <Footer.Icon
              href="https://www.linkedin.com/in/meet-chauhan-00812317b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              icon={BsLinkedin}
              target="_blank"
            />
          </div>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="/" by="LMS™" year={2025} />
      </div>
    </Footer>
  );
};

export default FooterComponent;
