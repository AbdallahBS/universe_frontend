import React from 'react';
import { FileText, Download, CheckCircle, AlertTriangle, Clock, Users } from 'lucide-react';

const CandidatureGuide: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Vérification d\'éligibilité',
      description: 'Calculez votre Score E et vérifiez que vous atteignez le minimum requis (10.00)',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Préparation des documents',
      description: 'Rassemblez tous les documents nécessaires: relevé de notes, pièce d\'identité, photos',
      icon: <FileText className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 3,
      title: 'Inscription en ligne',
      description: 'Créez votre compte sur le site officiel et remplissez le formulaire de candidature',
      icon: <Users className="w-5 h-5" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      id: 4,
      title: 'Paiement des frais',
      description: 'Réglez les frais d\'inscription selon les modalités indiquées',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const documents = [
    'Relevé de notes du Baccalauréat (original + copie)',
    'Pièce d\'identité (CIN ou passeport)',
    '4 photos d\'identité récentes',
    'Certificat de scolarité',
    'Fiche de renseignements (à télécharger)',
    'Justificatif de paiement des frais'
  ];

  const importantDates = [
    { event: 'Ouverture des inscriptions', date: '15 Mars 2024', status: 'completed' },
    { event: 'Clôture des inscriptions', date: '30 Avril 2024', status: 'upcoming' },
    { event: 'Date du concours', date: '15 Mai 2024', status: 'upcoming' },
    { event: 'Publication des résultats', date: '30 Mai 2024', status: 'upcoming' }
  ];

  return (
    <div className="space-y-8">
      {/* Guide Steps */}
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Guide de Candidature</h3>
            <p className="text-slate-600">Étapes pour déposer votre candidature</p>
          </div>
        </div>

        <div className="grid gap-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className={`w-10 h-10 ${step.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <div className={step.color}>
                  {step.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-slate-500">ÉTAPE {step.id}</span>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h4>
                <p className="text-slate-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Required Documents */}
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Documents Requis</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-slate-700">{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Important Dates */}
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Dates Importantes</h3>
        <div className="space-y-4">
          {importantDates.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                }`}></div>
                <span className="font-medium text-slate-800">{item.event}</span>
              </div>
              <span className="text-slate-600 font-medium">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-200">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Documents à Télécharger</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="/documents/fiche-renseignements-2024.pdf"
            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-slate-200"
            download
          >
            <Download className="w-5 h-5 text-indigo-600" />
            <div>
              <div className="font-medium text-slate-800">Fiche de Renseignements</div>
              <div className="text-sm text-slate-600">À remplir et joindre au dossier</div>
            </div>
          </a>
          <a
            href="/documents/guide-complet-candidature.pdf"
            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-slate-200"
            download
          >
            <Download className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="font-medium text-slate-800">Guide Complet</div>
              <div className="text-sm text-slate-600">Toutes les informations détaillées</div>
            </div>
          </a>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-amber-800 mb-2">Conseils Importants</h4>
            <ul className="space-y-1 text-amber-700">
              <li>• Vérifiez tous vos documents avant la soumission</li>
              <li>• Respectez scrupuleusement les délais</li>
              <li>• Gardez une copie de tous vos documents</li>
              <li>• Contactez l'établissement en cas de doute</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatureGuide;