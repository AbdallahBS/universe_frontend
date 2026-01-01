import React, { useEffect } from 'react';
import { Users, ArrowRight, Code2, Share2, Facebook, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TransText from '@components/TransText';

const developers = [
  {
    id: 1,
    name: 'Mazen Jebali',
    position: 'Software Developer and a Hobbyist',
    avatar: `https://corsproxy.io/?url=${encodeURIComponent("https://media.licdn.com/dms/image/v2/D4D03AQEW1D-kzawCsw/profile-displayphoto-crop_800_800/B4DZsjqIcRJkAM-/0/1765829818572?e=1769040000&v=beta&t=dv6jQyWC_8ozwdVZVvBmlKOfvKuNO9GiHm1QkHjHYTY")}`,
    contactLink: 'https://www.linkedin.com/in/jebali-mazen/'
  },
  {
    id: 2,
    name: 'Abdallah Ben Salem',
    position: 'Full Stack Developer and a Hobbyist',
    avatar: `https://corsproxy.io/?url=${encodeURIComponent("https://media.licdn.com/dms/image/v2/D4D03AQEv22YCKwLafA/profile-displayphoto-crop_800_800/B4DZsPjsWMH4AI-/0/1765492611119?e=1769040000&v=beta&t=ko4oP3rS_BpoFbDAnai2wM8ZNDaefkH1DYm8n-TyKJI")}`,
    contactLink: 'https://www.linkedin.com/in/abdallahbensalem/'
  },
];

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'Universe | About';
  }, []);

  const {t} = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24 pb-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 dark:bg-teal-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/30 dark:bg-blue-500/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-200/20 dark:bg-cyan-500/15 rounded-full blur-xl animate-float animation-delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/50 rounded-full px-4 py-2 shadow-lg">
            <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <TransText className="text-sm font-medium text-slate-700 dark:text-slate-200">{t('team.title')}</TransText>
          </div>

          <TransText as='h1' className="text-5xl font-bold text-slate-900 dark:text-white">
            {t('team.subtitle1')}{' '}
            <TransText className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-600 dark:from-teal-400 dark:via-blue-400 dark:to-cyan-400">
              {t('team.subtitle2')}
            </TransText>
          </TransText>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
           
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-16 justify-items-center">
          {developers.map((developer, index) => (
            <div
              key={developer.id}
              className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <a href={developer.contactLink} target='_blank'>
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-teal-100 dark:ring-teal-900/50 group-hover:ring-teal-200 dark:group-hover:ring-teal-700 transition-all duration-300">
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

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {developer.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {developer.position}
                </p>
              </a>
            </div>
          ))}
        </div>

        <div className="relative mt-20 animate-fade-in-up">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 via-red-400/20 to-rose-400/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/30 dark:to-green-900/30 border-2 border-teal-200 dark:border-teal-700 rounded-3xl p-12 overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-20">
              <Share2 className="w-40 h-40 text-teal-400 fill-teal-400" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <Share2 className="w-6 h-6 text-teal-600 dark:text-teal-400 fill-teal-600 dark:fill-teal-400" />
                <TransText className="text-sm font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">{t('support.title')}</TransText>
              </div>

              <TransText as='h2' className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
                {t('support.subtitle')}
              </TransText>

              <TransText as='p' className="text-lg text-slate-700 dark:text-slate-300 mb-6">
                {t('support.description')}
              </TransText>
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
