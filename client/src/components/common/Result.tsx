// src/components/Results.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';

interface ApiResponse {
    constitution: string;
    imbalances: string[];
    recommendations: {
        diet: string[];
        lifestyle: string[];
        herbs: Array<{ name: string, dosage: string, purpose: string }>;
        remedies: string[];
    };
}

const Results: React.FC = () => {
    const [results, setResults] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedResults = localStorage.getItem('ayurvedic-results');
        if (storedResults) {
            try {
                setResults(JSON.parse(storedResults));
            } catch (error) {
                console.error('Failed to parse stored results', error);
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-500">Loading results...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4 text-red-600">No Results Found</h1>
                        <p className="text-gray-500 mb-6">We couldn't find your ayurvedic analysis results.</p>
                        <Link to="/" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                            Return to Assessment
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
                <h1 className="text-2xl font-bold mb-6 text-center text-green-700">Your Ayurvedic Analysis</h1>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3 text-green-600">Your Constitution (Prakriti)</h2>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p>{results.constitution}</p>
                    </div>
                </div>

                {results.imbalances.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-3 text-green-600">Current Imbalances (Vikriti)</h2>
                        <div className="bg-amber-50 p-4 rounded-lg">
                            <ul className="list-disc list-inside space-y-1">
                                {results.imbalances.map((imbalance, index) => (
                                    <li key={index}>{imbalance}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-3 text-green-600">Dietary Recommendations</h2>
                        <div className="bg-green-50 p-4 rounded-lg h-full">
                            <ul className="list-disc list-inside space-y-1">
                                {results.recommendations.diet.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-3 text-green-600">Lifestyle Recommendations</h2>
                        <div className="bg-green-50 p-4 rounded-lg h-full">
                            <ul className="list-disc list-inside space-y-1">
                                {results.recommendations.lifestyle.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {results.recommendations.herbs.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-3 text-green-600">Herbal Recommendations</h2>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900">Herb</th>
                                            <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900">Dosage</th>
                                            <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900">Purpose</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {results.recommendations.herbs.map((herb, index) => (
                                            <tr key={index}>
                                                <td className="px-3 py-2 text-sm text-gray-900">{herb.name}</td>
                                                <td className="px-3 py-2 text-sm text-gray-900">{herb.dosage}</td>
                                                <td className="px-3 py-2 text-sm text-gray-900">{herb.purpose}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {results.recommendations.remedies.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-3 text-green-600">Home Remedies</h2>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <ul className="list-disc list-inside space-y-1">
                                {results.recommendations.remedies.map((remedy, index) => (
                                    <li key={index}>{remedy}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="flex justify-center mt-8">
                    <Link to="/" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Take Assessment Again
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Results;