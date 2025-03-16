// DoshaPage.tsx
import React from 'react';
import DoshaDetails from '@/components/common/DoshaDetails';
// import { Header } from '@/components/common/Header';
// import { Footer } from '@/components/common/Footer';

const DoshaPage: React.FC = () => {
  // Sample data - replace with your actual data
  const userData = {
    doshaProfile: { vata: 55, pitta: 30, kapha: 15 },
    healthMetrics: [
      {
        date: '2025-03-15',
        sleepData: { quality: 6 },
        hydrationData: { waterIntake: 1500 },
        heartRateData: { average: 65 }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Dosha Analysis</h1>
      <DoshaDetails userData={userData} />
    </div>
  );
}

export default DoshaPage;