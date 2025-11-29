import React from 'react';
import { LinkIcon } from 'lucide-react';

const ConcoursTimer: React.FC = () => {

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
    

      
      <div className="mt-4 bg-amber-100/50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-amber-800">
          <LinkIcon className="w-5 h-5" />
          <p className="font-medium">Official website link:</p>
        </div>
        <a 
          href="https://csingenieur.inscription.tn/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-2 block text-indigo-600 hover:text-indigo-700 font-medium break-all"
        >
          https://csingenieur.inscription.tn/
        </a>
      </div>

    </div>
  );
};

export default ConcoursTimer;