// src/server/index.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai';
import path from 'path';

// Load environment variables
dotenv.config();

// Define interfaces
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

interface AyurvedicResult {
    constitution: string;
    imbalances: string[];
    recommendations: {
        diet: string[];
        lifestyle: string[];
        herbs: Array<{ name: string, dosage: string, purpose: string }>;
        remedies: string[];
    };
}

// Create Express app
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const token = process.env.GITHUB_TOKEN;

const openai = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
});

// API endpoint for Ayurvedic analysis
app.post('/api/ayurvedic-analysis', async (req: Request<{}, {}, HealthFormData>, res: Response) => {
    try {

        console.log('Request received:', req.body);
        const healthData = req.body;

        // Prepare prompt for OpenAI
        const prompt = `
    Based on the following health information, provide a comprehensive Ayurvedic analysis including dosha constitution (prakriti), current imbalances (vikriti), dietary recommendations, lifestyle adjustments, specific herbal remedies with dosages, and home remedies. Format the response as a JSON object.

    Patient Information:
    Name: ${healthData.name}
    Age: ${healthData.age}
    Gender: ${healthData.gender}
    Weight: ${healthData.weight} kg
    Height: ${healthData.height} cm
    
    Current Symptoms: ${healthData.symptoms}
    Medical History: ${healthData.medicalHistory}
    Current Medications: ${healthData.currentMedications}
    
    Lifestyle: ${healthData.lifestyle}
    Dietary Habits: ${healthData.dietaryHabits}
    Sleep Pattern: ${healthData.sleepPattern}
    Stress Level: ${healthData.stressLevel}
    Exercise: ${healthData.exercise}
    
    Provide a structured JSON response with the following format:
    {
      "constitution": "Detailed description of the person's Ayurvedic constitution (prakriti)",
      "imbalances": ["List of current dosha imbalances"],
      "recommendations": {
        "diet": ["List of specific dietary recommendations"],
        "lifestyle": ["List of lifestyle adjustments"],
        "herbs": [
          {"name": "Herb name", "dosage": "Specific dosage", "purpose": "Purpose of this herb"}
        ],
        "remedies": ["List of home remedies"]
      }
    }
    `;

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            temperature: 1,
            max_tokens: 4096,
            top_p: 1,
            messages: [
                {
                    role: "system",
                    content: "You are an expert Ayurvedic practitioner with deep knowledge of traditional Ayurvedic medicine, herbs, treatments, and dosha balancing. Provide detailed, comprehensive and accurate Ayurvedic recommendations based on the information provided. Return results in valid JSON format only."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: { type: "json_object" }
        });

        // Parse the response
        const responseContent = response.choices[0].message.content;
        if (!responseContent) {
            throw new Error('Empty response from OpenAI');
        }

        const ayurvedicResult: AyurvedicResult = JSON.parse(responseContent);

        // Send the response
        res.json(ayurvedicResult);

    } catch (error) {
        console.error('Error in Ayurvedic analysis:', error);
        res.status(500).json({ error: 'Failed to process health information' });
    }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/build')));

    app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});