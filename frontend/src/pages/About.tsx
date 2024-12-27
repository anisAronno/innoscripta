import AboutMe from '../components/AboutMe';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Profile from '../components/Profile';
import Skills from '../components/Skills';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About Me</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Profile Section */}
          <div className="md:col-span-4">
            <Profile />
          </div>

          {/* Bio Section */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 space-y-4 md:space-y-8">
              <AboutMe />
              <Experience />
              <Skills />
              <Education />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
