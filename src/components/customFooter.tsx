import fbIcon from '../assets/fb.png';
import twitterIcon from '../assets/twitter.png';
import linkedinIcon from '../assets/linkedin.png';
import instaIcon from '../assets/insta.png';

const CustomFooter = () => {
  return (
    <footer className="bg-yellow-100 text-brown-900 mt-24">
      <div className="container mx-auto py-8 px-4">
        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-6 text-sm md:text-base">
          <div>
            <h3 className="font-bold text-2xl mb-4">Quick Links</h3>
            <ul>
              <li><a target="_blank" href="https://jnec.org/" className="hover:underline">Home</a></li>
              <li><a target="_blank" href="https://jnec.org/admissions" className="hover:underline">JNEC Admissions</a></li>
              <li><a target="_blank" href="https://jnec.org/admissions/#FirstYear" className="hover:underline">FY Admissions</a></li>
              <li><a target="_blank" href="https://jnec.org/admissions/#DirectSecondYear" className="hover:underline">Direct SY Admissions</a></li>
              <li><a target="_blank" href="https://jnec.org/admissions/#PostGradAdmissions" className="hover:underline">PG Admissions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-2xl mb-4">Programs</h3>
            <ul>
              <li><a target="_blank" href="https://jnec.org/programs/" className="hover:underline">Undergraduate Programs</a></li>
              <li><a target="_blank" href="https://jnec.org/programs/#ExplorePrograms" className="hover:underline">Postgraduate Programs</a></li>
              <li><a target="_blank" href="https://jnec.org/programs/#AcademicCalendar" className="hover:underline">Academic Calendar</a></li>
              <li><a target="_blank" href="https://jnec.org/programs/#IndustryInstituteInteractionCell" className="hover:underline">IIIC</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-2xl mb-4">More Links</h3>
            <ul>
              <li><a target="_blank" href="https://jnec.org/placement" className="hover:underline">Placements</a></li>
              <li><a target="_blank" href="https://jnec.org/alumni" className="hover:underline">Alumni</a></li>
              <li><a target="_blank" href="https://jnec.org/research/#ResearchCenter" className="hover:underline">Research</a></li>
              <li><a target="_blank" href="https://jnec.org/library" className="hover:underline">Library</a></li>
              <li><a target="_blank" href="https://jnec.org/gallery" className="hover:underline">Gallery</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold">Jawaharlal Nehru Engineering College</p>
              <p className="text-sm">
                Conducted College of MGM University, Chhatrapati Sambhajinagar, Maharashtra.
              </p>
              <p className="text-xs mt-1">Copyright 2024 © Jawaharlal Nehru Engineering College</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="https://www.facebook.com/mgmjnec/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brown-700"
              >
                <img src={fbIcon} alt="Facebook" className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/jnecAurangabad?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brown-700"
              >
                <img src={twitterIcon} alt="Twitter" className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/school/mgmujnec/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brown-700"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/jnec_Aurangabad/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brown-700"
              >
                <img src={instaIcon} alt="Instagram" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;