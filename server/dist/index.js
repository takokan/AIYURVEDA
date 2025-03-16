"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const openai_1 = require("openai");
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize OpenAI
const token = process.env.GITHUB_TOKEN;
const openai = new openai_1.OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
});
// API endpoint for Ayurvedic analysis
app.post('/api/ayurvedic-analysis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield openai.chat.completions.create({
            model: "gpt-4o",
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
        const ayurvedicResult = JSON.parse(responseContent);
        // Send the response
        res.json(ayurvedicResult);
    }
    catch (error) {
        console.error('Error in Ayurvedic analysis:', error);
        res.status(500).json({ error: 'Failed to process health information' });
    }
}));
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
    app.get('*', (_req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../client/build', 'index.html'));
    });
}
// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
