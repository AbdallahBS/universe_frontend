import React from 'react';
import { Users, ArrowRight, Code2, Share2, Facebook, Linkedin } from 'lucide-react';

const developers = [
  {
    id: 1,
    name: 'Mazen Jebali',
    position: 'Software Developer and a Hobbyist',
    avatar: 'https://scontent.ftun15-1.fna.fbcdn.net/v/t39.30808-1/583041894_2741764159488504_1699209473446557789_n.jpg?stp=c144.155.662.663a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=ZPnGMoIMnnkQ7kNvwFkwE7d&_nc_oc=AdlRRlR54v5XAJ4TodIU07AXaZ2mYPC-AnF-OjwLIojmc0Od0kATg3HEjbmj-xfHFKg&_nc_zt=24&_nc_ht=scontent.ftun15-1.fna&_nc_gid=qp-Dwf_FEcGgMagUn3Z4DA&oh=00_AfivkzGB7Ywuy_SFlntDngdrFrYcH7VtlPnR30yQR8z_Lg&oe=692F6483',
    contactLink : 'https://www.linkedin.com/in/jebali-mazen/'
},
  {
    id: 2,
    name: 'Abdallah Ben Salem',
    position: 'Full Stack Developer and a Hobbyist',
    avatar: 'https://scontent.ftun15-1.fna.fbcdn.net/v/t39.30808-1/454653576_1179075560098607_3859578595552595962_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=O9d0P-_oRsIQ7kNvwEDuplO&_nc_oc=AdksS6uOwPro0skNC7fswV-DE0zEQKh_R2s3a_XoO6ZwYCKH-Xm5M0vZW6ncN5vuXIw&_nc_zt=24&_nc_ht=scontent.ftun15-1.fna&_nc_gid=rU82rYGmpFcHlv-hohVmXw&oh=00_AfjgrqcsWWJKNS4z9RWcFpZW2KGmNEJHOX8AatS6bOfeyQ&oe=692F8793',
    contactLink : 'https://www.linkedin.com/in/abdallahbensalem/' 
},
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 pt-24 pb-16">
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 rounded-full blur-xl animate-float"></div>
    <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/30 rounded-full blur-xl animate-float animation-delay-1000"></div>
    <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-200/20 rounded-full blur-xl animate-float animation-delay-500"></div>
  </div>

  <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center space-y-4 mb-16 animate-fade-in-up">
      <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-teal-200/50 rounded-full px-4 py-2 shadow-lg">
        <Users className="w-4 h-4 text-teal-600" />
        <span className="text-sm font-medium text-slate-700">Our Team</span>
      </div>

      <h1 className="text-5xl font-bold text-slate-900">
        Universe{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-600">
          Developers
        </span>
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto">
        The talented individuals behind this amazing platform
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 justify-items-center">
        {developers.map((developer, index) => (
          <div
            key={developer.id}
            className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
           <a href={developer.contactLink} target='_blank'>
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-teal-100 group-hover:ring-teal-200 transition-all duration-300">
                <img
                  src={developer.avatar}
                  alt={developer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-5 h-5 text-white" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {developer.name}
            </h3>
            <p className="text-slate-600 font-medium">
              {developer.position}
            </p>
           </a>
          </div>
        ))}
      </div>

    <div className="relative mt-20 animate-fade-in-up">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 via-red-400/20 to-rose-400/20 rounded-3xl blur-2xl"></div>
      <div className="relative bg-gradient-to-r from-teal-50 to-green-50 border-2 border-teal-200 rounded-3xl p-12 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-20">
          <Share2 className="w-40 h-40 text-teal-400 fill-teal-400" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <Share2 className="w-6 h-6 text-teal-600 fill-teal-600" />
            <span className="text-sm font-bold text-teal-700 uppercase tracking-wider">Support Our Development Mission</span>
          </div>

          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            Love what we do?
          </h2>

          <p className="text-lg text-slate-700 mb-6">
            Your could share our platform with your friends to make it more diverse and accessible for everyone. Every share and recommandation helps to fuels and maintain our passion for this platform development process.
          </p>
          <div className='flex gap-2'>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("universe.tn")}`} target='_blank'
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-teal-600 to-teal-600 hover:from-teal-700 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Facebook className="w-5 h-5 fill-white" />
              <span>Share</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
        
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("universe.tn")}`} target='_blank'
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-teal-600 to-teal-600 hover:from-teal-700 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Linkedin className="w-5 h-5 fill-white" />
              <span>Share</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default About;
