import React from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import DoshaDetails from '@/components/common/DoshaDetails';

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
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-20">
                <DoshaDetails userData={userData} />
            </div>
            <Footer />
        </div>
    );
}

export default DoshaPage;