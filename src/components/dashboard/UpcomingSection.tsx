import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { UpcomingChecks } from './upcoming/UpcomingChecks';
import { UpcomingLCRs } from './upcoming/UpcomingLCRs';

interface DueItem {
  id: string;
  type: 'check' | 'lcr';
  number: string;
  amount: number;
  dueDate: string;
  entity: string;
  status: string;
  issuerName?: string;
  beneficiaryName?: string;
  bankName?: string;
  notes?: string;
  issueDate?: string;
}

interface UpcomingSectionProps {
  items: DueItem[];
}

export function UpcomingSection({ items }: UpcomingSectionProps) {
  const [openSection, setOpenSection] = useState<string>('received-checks');

  const receivedChecks = items.filter(item => item.type === 'check' && 'issuerName' in item);
  const issuedChecks = items.filter(item => item.type === 'check' && 'beneficiaryName' in item);
  const receivedLCRs = items.filter(item => item.type === 'lcr' && 'issuerName' in item);
  const issuedLCRs = items.filter(item => item.type === 'lcr' && 'beneficiaryName' in item);

  const sections = [
    { id: 'received-checks', title: 'Chèques Reçus', count: receivedChecks.length },
    { id: 'issued-checks', title: 'Chèques Émis', count: issuedChecks.length },
    { id: 'received-lcrs', title: 'LCRs Reçus', count: receivedLCRs.length },
    { id: 'issued-lcrs', title: 'LCRs Émis', count: issuedLCRs.length }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Échéances de la semaine
        </h2>

        <div className="space-y-4">
          {sections.map(section => (
            <div key={section.id} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenSection(openSection === section.id ? '' : section.id)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{section.title}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {section.count}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openSection === section.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {openSection === section.id && (
                <div className="p-4 border-t">
                  {section.id === 'received-checks' && (
                    <UpcomingChecks items={receivedChecks} type="received" />
                  )}
                  {section.id === 'issued-checks' && (
                    <UpcomingChecks items={issuedChecks} type="issued" />
                  )}
                  {section.id === 'received-lcrs' && (
                    <UpcomingLCRs items={receivedLCRs} type="received" />
                  )}
                  {section.id === 'issued-lcrs' && (
                    <UpcomingLCRs items={issuedLCRs} type="issued" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}