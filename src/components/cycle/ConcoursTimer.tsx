import React from 'react';
import { LinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TransText from '@components/TransText';

const ConcoursTimer: React.FC = () => {
  const {t} = useTranslation();
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">



      <div className="mt-4 bg-amber-100/50 dark:bg-amber-800/30 rounded-lg p-4">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
          <LinkIcon className="w-5 h-5" />
          <TransText as='p' className="font-medium">{t("notice.officialLink")}</TransText>
        </div>
        <a
          href="https://csingenieur.inscription.tn/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium break-all"
        >
          https://csingenieur.inscription.tn/
        </a>
      </div>

    </div>
  );
};

export default ConcoursTimer;