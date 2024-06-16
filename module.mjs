import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch your API_KEY
const API_KEY = "AIzaSyBV1Lo-hnl3gCKKZkFvIaUktFnIORIgygo";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

//console.log("Success");

export async function run() {
    const prompt = "Road to 100 Crore";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    //console.log(text);
}

export async function parseTextContentAndTokenize(jobRole, textContent) {
    //console.log(jobRole);
    let prompt = `You are given data extracted from a resume applied for a given job role by a candidate. You will be provided two inputs, one is job role and other is data extracted from pdf. You have to gather insights from the data and group similar insights together and summarise it. 
    
    Example of a grouping expected from you:


    Technical Skills
    Programming Languages: C++, C#, VB, ASP.Net, Pascal, BASIC, Assembler (Motorola 68000) (from Education section)
    Tools and Technologies: Microsoft Office Suite, Simply Accounting, Adobe Acrobat, JASC Aldus Photostyler, Dreamweaver, Corel Office, Matlab, Pro Engineer (from Education section)
    Techniques: Code Debugging, Circuit Debugging, Surface Patch Design, CAD Programming, System Optimization (from Education section), System Design


    Work Experience
    Student Software Engineer (Engineering Firm)
    Developed software applications (inferred from job title)


    Soft Skills
    Communication & Interpersonal: Collaboration, Communication, Public Speaking, Presentation
    Project Management & Organization: Project Management, Organization, Quality Assurance, Testing
    Research & Analytical: Research, Database Management

    Example ends here

    This was a sample breakup with 3 categories (Technical Skills, Work experience and Soft skills). You can choose other different categories. In general, you have to choose categories by aspects that would help judging whether a person is suitable for the given job role. So categories for a Backend Engineer job role have to be different as that of HR manager job role.

    Here's the input
    Job Role: ${jobRole}
    Extracted data from resume:
    ${textContent}

    Important: Get straight to the point. Don't include "Certainly, here's the categories....". Generate only the category breakup in a comprehensive manner. The same response in combination with an array of job openings will further serve as a prompt to LLM. Generate response considering that fact. You are using '*' characters for response formatting, which have no use here. So you have to avoid bolding out the text and all that stuff. There should not be any '*' character for formatting purpose in your response.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;

    // anuj api call will yield
}
