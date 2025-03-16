// src/components/HealthForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';

interface HealthFormData {
    name: string;
    age: string;
    gender: string;
    weight: string;
    height: string;
    symptoms: string;
    medicalHistory: string;
    currentMedications: string;
    lifestyle: string;
    dietaryHabits: string;
    sleepPattern: string;
    stressLevel: string;
    exercise: string;
}

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

const HealthForm: React.FC = () => {
    const [formData, setFormData] = useState<HealthFormData>({
        name: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        symptoms: '',
        medicalHistory: '',
        currentMedications: '',
        lifestyle: '',
        dietaryHabits: '',
        sleepPattern: '',
        stressLevel: '',
        exercise: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5001/api/ayurvedic-analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit health information');
            }

            const data: ApiResponse = await response.json();

            // Store recommendations in localStorage to access in results page
            localStorage.setItem('ayurvedic-results', JSON.stringify(data));

            // Navigate to results page
            navigate('/results');
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-green-700">Ayurvedic Health Assessment</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Full Name
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Age
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    max="120"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Gender
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Weight (kg)
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                    step="0.1"
                                    min="1"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Height (cm)
                                <input
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    required
                                    min="50"
                                    max="250"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Stress Level
                                <select
                                    name="stressLevel"
                                    value={formData.stressLevel}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                                >
                                    <option value="">Select</option>
                                    <option value="low">Low</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="high">High</option>
                                    <option value="severe">Severe</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Current Symptoms
                            <textarea
                                name="symptoms"
                                value={formData.symptoms}
                                onChange={handleChange}
                                required
                                rows={3}
                                placeholder="Describe any symptoms you're experiencing"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                            ></textarea>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Medical History
                            <textarea
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Any previous conditions or surgeries"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                            ></textarea>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Current Medications
                            <textarea
                                name="currentMedications"
                                value={formData.currentMedications}
                                onChange={handleChange}
                                rows={2}
                                placeholder="List any medications you're currently taking"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                            ></textarea>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Dietary Habits
                                <textarea
                                    name="dietaryHabits"
                                    value={formData.dietaryHabits}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="Describe your typical diet"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                                ></textarea>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Sleep Pattern
                                <textarea
                                    name="sleepPattern"
                                    value={formData.sleepPattern}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="Describe your sleep habits"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                                ></textarea>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Exercise Routine
                                <textarea
                                    name="exercise"
                                    value={formData.exercise}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="Describe your exercise routine"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                                ></textarea>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Lifestyle
                                <textarea
                                    name="lifestyle"
                                    value={formData.lifestyle}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="Describe your daily routine and work environment"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                                ></textarea>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Get Ayurvedic Recommendations'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HealthForm;