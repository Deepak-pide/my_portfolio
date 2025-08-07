'use server';

/**
 * @fileOverview Generates a dynamic 'About Me' section tailored to the visitor's role.
 *
 * - generateAboutMe - A function that generates the 'About Me' content.
 * - GenerateAboutMeInput - The input type for the generateAboutMe function.
 * - GenerateAboutMeOutput - The return type for the generateAboutMe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAboutMeInputSchema = z.object({
  visitorRole: z
    .string()
    .describe(
      'The role of the visitor (e.g., potential client, employer, collaborator).' + 
      'This will be used to tailor the content to the visitor\'s interests and needs.'
    ),
});
export type GenerateAboutMeInput = z.infer<typeof GenerateAboutMeInputSchema>;

const GenerateAboutMeOutputSchema = z.object({
  aboutMeContent: z
    .string()
    .describe('The dynamically generated About Me content tailored to the visitor.'),
});
export type GenerateAboutMeOutput = z.infer<typeof GenerateAboutMeOutputSchema>;

export async function generateAboutMe(input: GenerateAboutMeInput): Promise<GenerateAboutMeOutput> {
  return generateAboutMeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAboutMePrompt',
  input: {schema: GenerateAboutMeInputSchema},
  output: {schema: GenerateAboutMeOutputSchema},
  prompt: `You are a professional personal branding expert. Generate an "About Me" section for a portfolio website.

The content should be tailored to the visitor's role: {{{visitorRole}}}.
Focus on the skills and experience most relevant to them.  Make it concise and engaging.

About Me Section:`, // Provide clear context and instructions
});

const generateAboutMeFlow = ai.defineFlow(
  {
    name: 'generateAboutMeFlow',
    inputSchema: GenerateAboutMeInputSchema,
    outputSchema: GenerateAboutMeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
