import React, { useState, useEffect } from 'react';

// Define types for our data structures
interface SleepData {
  quality: number;
  bedTime?: string;
  wakeTime?: string;
}

interface HydrationData {
  waterIntake: number;
  otherLiquids?: number;
}

interface HeartRateData {
  average: number;
  resting?: number;
  peak?: number;
}

interface HealthMetric {
  date: string;
  sleepData: SleepData;
  hydrationData: HydrationData;
  heartRateData: HeartRateData;
  mood?: string;
  digestion?: string;
}

interface DoshaProfile {
  vata: number;
  pitta: number;
  kapha: number;
}

interface UserData {
  doshaProfile: DoshaProfile;
  healthMetrics: HealthMetric[];
}

interface Problem {
  problem: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

interface Recommendation {
  type: string;
  content: string;
}

interface DoshaDetailsProps {
  userData: UserData;
}

const DoshaDetails: React.FC<DoshaDetailsProps> = ({ userData }) => {
  const [dominantDosha, setDominantDosha] = useState<string>('');
  const [secondaryDosha, setSecondaryDosha] = useState<string>('');
  const [doshaProblems, setDoshaProblems] = useState<Problem[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Calculate dominant dosha based on userData
    if (userData && userData.doshaProfile) {
      const { vata, pitta, kapha } = userData.doshaProfile;
      const doshas = [
        { name: 'vata', value: vata },
        { name: 'pitta', value: pitta },
        { name: 'kapha', value: kapha }
      ].sort((a, b) => b.value - a.value);
      
      setDominantDosha(doshas[0].name);
      setSecondaryDosha(doshas[1].name);
      
      // Set problems based on dominant dosha
      setDoshaProblems(getDoshaProblems(doshas[0].name));
      
      // Generate recommendations
      setRecommendations(getRecommendations(doshas[0].name, userData));
    }
  }, [userData]);

  const getDoshaProblems = (dosha: string): Problem[] => {
    const problems: Record<string, Problem[]> = {
      vata: [
        { problem: 'Irregular sleep patterns', severity: 'high', description: 'Difficulty falling asleep or staying asleep, waking frequently during the night.' },
        { problem: 'Dry skin', severity: 'medium', description: 'Skin feels rough, flaky, or dehydrated.' },
        { problem: 'Anxiety and nervousness', severity: 'high', description: 'Racing thoughts, worry, and mental restlessness.' },
        { problem: 'Digestive irregularity', severity: 'medium', description: 'Gas, bloating, constipation, or irregular bowel movements.' },
        { problem: 'Poor circulation', severity: 'low', description: 'Cold hands and feet, poor blood flow to extremities.' }
      ],
      pitta: [
        { problem: 'Inflammation', severity: 'high', description: 'Skin rashes, acne, or inflammatory conditions.' },
        { problem: 'Excessive body heat', severity: 'medium', description: 'Feeling hot, sweating easily, discomfort in warm environments.' },
        { problem: 'Acid reflux', severity: 'medium', description: 'Heartburn, indigestion, or acid regurgitation.' },
        { problem: 'Irritability', severity: 'high', description: 'Quick to anger, impatience, or frustration.' },
        { problem: 'Eye sensitivity', severity: 'low', description: 'Sensitivity to light, eye redness or irritation.' }
      ],
      kapha: [
        { problem: 'Weight gain', severity: 'high', description: 'Difficulty losing weight, tendency to gain weight easily.' },
        { problem: 'Lethargy', severity: 'medium', description: 'Feeling sluggish, lacking energy or motivation.' },
        { problem: 'Respiratory congestion', severity: 'medium', description: 'Mucus buildup, sinus issues, or respiratory heaviness.' },
        { problem: 'Oversleeping', severity: 'low', description: 'Sleeping for long periods but still feeling tired.' },
        { problem: 'Water retention', severity: 'medium', description: 'Bloating, puffiness, or edema in tissues.' }
      ]
    };
    
    return problems[dosha] || [];
  };

  const getRecommendations = (dosha: string, userData: UserData): Recommendation[] => {
    // Analyze user data and provide personalized recommendations
    const recommendations: Record<string, Recommendation[]> = {
      vata: [
        { type: 'Diet', content: 'Favor warm, cooked, moist foods with healthy oils. Reduce raw vegetables and dry foods.' },
        { type: 'Lifestyle', content: 'Maintain a regular daily routine. Go to bed and wake up at consistent times.' },
        { type: 'Exercise', content: 'Practice gentle, grounding exercises like yoga, tai chi, or walking.' },
        { type: 'Hydration', content: 'Drink warm water throughout the day. Avoid ice cold beverages.' }
      ],
      pitta: [
        { type: 'Diet', content: 'Favor cooling foods like sweet fruits, vegetables, and grains. Reduce spicy and fermented foods.' },
        { type: 'Lifestyle', content: 'Avoid excessive heat and direct sunlight. Take time to relax and cool down.' },
        { type: 'Exercise', content: 'Exercise during cooler parts of the day. Swimming and moonlight walks are beneficial.' },
        { type: 'Hydration', content: 'Drink cool (not iced) water with mint or cucumber.' }
      ],
      kapha: [
        { type: 'Diet', content: 'Favor light, warm, and spicy foods. Reduce heavy, oily, and sweet foods.' },
        { type: 'Lifestyle', content: 'Rise early and avoid daytime naps. Keep your environment fresh and stimulating.' },
        { type: 'Exercise', content: 'Engage in vigorous, stimulating exercise like running, aerobics, or fast-paced yoga.' },
        { type: 'Hydration', content: 'Drink warm water with ginger, lemon, or honey to stimulate digestion.' }
      ]
    };
    
    // Add personalized recommendations based on user metrics
    const personalizedRecs: Recommendation[] = [];
    
    if (userData.healthMetrics && userData.healthMetrics.length > 0) {
      const latestMetrics = userData.healthMetrics[userData.healthMetrics.length - 1];
      
      // Sleep recommendations
      if (dosha === 'vata' && latestMetrics.sleepData.quality < 7) {
        personalizedRecs.push({ 
          type: 'Sleep', 
          content: 'Your sleep quality is low. Try a warm bath with lavender oil before bed and practice gentle breathing exercises.'
        });
      }
      
      // Hydration recommendations
      if (dosha === 'pitta' && latestMetrics.hydrationData.waterIntake < 2000) {
        personalizedRecs.push({ 
          type: 'Hydration', 
          content: 'Your water intake is below recommended levels. Try to drink at least 2 liters of water throughout the day.'
        });
      }
      
      // Heart rate recommendations
      if (dosha === 'kapha' && latestMetrics.heartRateData.average < 70) {
        personalizedRecs.push({ 
          type: 'Activity', 
          content: 'Your average heart rate indicates low activity levels. Try adding more movement throughout your day.'
        });
      }
    }
    
    return [...recommendations[dosha], ...personalizedRecs];
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDoshaColor = (dosha: string): string => {
    switch (dosha) {
      case 'vata': return 'bg-indigo-600'; // Purple
      case 'pitta': return 'bg-orange-500'; // Orange
      case 'kapha': return 'bg-emerald-500'; // Green
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className={`p-6 text-center text-white ${getDoshaColor(dominantDosha)}`}>
        <h2 className="text-2xl font-semibold mt-0">Your Dosha Profile</h2>
        <div className="flex justify-center gap-10 mt-4">
          <div className="text-center">
            <h3 className="font-medium mb-1">Primary: {dominantDosha.toUpperCase()}</h3>
            <p className="text-2xl font-bold">{userData?.doshaProfile?.[dominantDosha as keyof DoshaProfile]}%</p>
          </div>
          <div className="text-center">
            <h4 className="font-medium mb-1">Secondary: {secondaryDosha.toUpperCase()}</h4>
            <p className="text-lg font-bold">{userData?.doshaProfile?.[secondaryDosha as keyof DoshaProfile]}%</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-800 pb-2 border-b border-gray-200 mb-4">
            Potential Imbalances
          </h3>
          <p className="mb-4">Based on your {dominantDosha.toUpperCase()} dominance, you may experience these issues:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doshaProblems.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-sm p-4">
                <h4 className="text-lg font-medium text-gray-800 mb-2">{item.problem}</h4>
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-600 mr-2">Likelihood:</span>
                  <span className={`text-xs font-medium uppercase px-2 py-1 rounded-full ${getSeverityColor(item.severity)}`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-800 pb-2 border-b border-gray-200 mb-4">
            Personalized Recommendations
          </h3>
          <p className="mb-4">Follow these suggestions to balance your {dominantDosha.toUpperCase()} dosha:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-lg shadow-sm p-4">
                <h4 className="text-lg font-medium text-blue-800 mb-2">{item.type}</h4>
                <p className="text-gray-700">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoshaDetails;