// Script to parse French HTML and extract questions
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../public/Réponses complètes à l\'examen final CCNA 1 v7.0 - Introduction aux réseaux.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const questions = [];

// Find all question patterns: <p><strong>N. Question text</strong></p>
const questionRegex = /<p><strong>[\s\S]*?(\d+)\.\s*([\s\S]*?)<\/strong><\/p>/g;

// Simple text cleaner - remove HTML tags and font tags
function cleanText(text) {
    return text
        .replace(/<font[^>]*>/g, '')
        .replace(/<\/font>/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

// Split HTML by question markers
const parts = htmlContent.split(/<p><strong>[\s\S]*?\d+\./);

let questionId = 0;
for (let i = 1; i < parts.length && questionId < 170; i++) {
    const part = parts[i];

    // Extract question text (before </strong></p>)
    const questionMatch = part.match(/([\s\S]*?)<\/strong><\/p>/);
    if (!questionMatch) continue;

    const questionText = cleanText(questionMatch[1]);
    if (!questionText || questionText.length < 10) continue;

    questionId++;

    // Find options (in <ul><li>...</li></ul>)
    const optionsMatch = part.match(/<ul>([\s\S]*?)<\/ul>/);
    const options = [];
    const correctAnswers = [];

    if (optionsMatch) {
        const optionsHtml = optionsMatch[1];
        const optionMatches = optionsHtml.matchAll(/<li>([\s\S]*?)<\/li>/g);

        let optionIndex = 0;
        for (const match of optionMatches) {
            const optionHtml = match[1];
            const optionText = cleanText(optionHtml);

            // Check if this is a correct answer (has red color or strong)
            if (optionHtml.includes('color: #ff0000') || optionHtml.includes('color:#ff0000') ||
                optionHtml.includes('color: red') || optionHtml.includes('class="correct"')) {
                correctAnswers.push(optionIndex);
            }

            if (optionText && optionText.length > 0) {
                options.push(optionText);
                optionIndex++;
            }
        }
    }

    // Find image if exists
    let imageUrl = null;
    const imageMatch = part.match(/<img[^>]+src="([^"]+)"[^>]*>/);
    if (imageMatch) {
        let src = imageMatch[1];
        // Convert local paths to URLs
        if (src.startsWith('./')) {
            src = 'https://itexamanswers.net/wp-content/uploads/' + src.split('/wp-content/uploads/')[1]?.split('"')[0] || '';
        }
        if (src.includes('itexamanswers.net')) {
            imageUrl = src;
        }
    }

    // Find explanation
    let explanation = '';
    const explainMatch = part.match(/<div class="message_box success">([\s\S]*?)<\/div>/);
    if (explainMatch) {
        explanation = cleanText(explainMatch[1]).replace(/^(Explication|Expliquer|Explanation):?\s*/i, '');
    }

    if (options.length >= 2 && correctAnswers.length > 0) {
        questions.push({
            id: questionId,
            question: questionText,
            options: options,
            correctAnswers: correctAnswers,
            type: correctAnswers.length > 1 ? 'multiple' : 'single',
            explanation: explanation || 'Voir le cours CCNA pour plus de détails.',
            ...(imageUrl && { imageUrl })
        });
    }
}

console.log(`Extracted ${questions.length} questions`);

// Generate TypeScript output
let output = `// CCNA 1 v7.0 Questions de Quiz - Version Française
// Extrait de l'examen final CCNA Introduction aux Réseaux

export interface CCNAQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswers: number[];
    type: 'single' | 'multiple';
    explanation: string;
    imageUrl?: string;
}

export const ccnaQuestions: CCNAQuestion[] = [
`;

questions.forEach((q, idx) => {
    output += `    {
        id: ${q.id},
        question: ${JSON.stringify(q.question)},
        options: ${JSON.stringify(q.options, null, 12).replace(/\n/g, '\n        ')},
        correctAnswers: ${JSON.stringify(q.correctAnswers)},
        type: '${q.type}',
        explanation: ${JSON.stringify(q.explanation)}${q.imageUrl ? `,\n        imageUrl: ${JSON.stringify(q.imageUrl)}` : ''}
    }${idx < questions.length - 1 ? ',' : ''}
`;
});

output += `];

export const totalQuestions = ccnaQuestions.length;

export function getRandomQuestions(count: number): CCNAQuestion[] {
    const shuffled = [...ccnaQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, ccnaQuestions.length));
}
`;

// Write output
const outputPath = path.join(__dirname, 'ccnaQuizData.ts');
fs.writeFileSync(outputPath, output, 'utf-8');
console.log(`Written to ${outputPath}`);
