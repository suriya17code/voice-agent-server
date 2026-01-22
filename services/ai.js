/**
 * Simple Mock AI Response logic to satisfy requirements without burning OpenAI tokens unless needed.
 * Can be easily swapped for real OpenAI call.
 */

const generateAIResponse = async (transcript, step) => {
    // Artificial delay to simulate "thinking" if needed, though frontend handles the mandatory pauses.
    // The instructions say: "Add a 500–1000 ms pause... AI response generated". 
    // We can just return the text instantly here, and let frontend handle the playback timing.
    
    // Conversation State Machine
    // 0: Start -> Greeting
    // 1: Asking Q1 (User just answered Q1?) -> No, flow is:
    //    Agent: Greeting + Q1? Or Greeting, then pause, then Q1?
    //    Instruction: "Start with a spoken greeting... Ask questions one at a time"
    //    Let's assume the frontend manages the "step" index.
    
    // We will assume 'step' passed here is the step we literally just finished or are currently on.
    // Let's define the steps clearly in the frontend, passing the *next* desired state or the current state.
    
    // Let's assume the client sends the *current* state and the transcript of what user just said.
    // State 0: Initial state. (Agent shouldn't be receiving text here, it should just speak). mechanism:
    //   If client triggers "start", agent sends Greeting.
    
    // But this API is "Generate AI Response" based on *User Speech*.
    
    // Flow:
    // 1. User clicks Start. Agent speaks Greeting. (Client handled or separate call? Let's say client has hardcoded greeting text, or requests it).
    //    Actually, "Hi, I’m an AI voice assistant..." is fixed.
    //    Then Agent asks Q1: "Can you briefly introduce yourself?"
    // 2. User answers Q1. Transcript sent here. Step = 'q1_answered'.
    //    AI should acknowledge and ask Q2.
    // 3. User answers Q2. Transcript sent here. Step = 'q2_answered'.
    //    AI should acknowledge and say Closing.
    
    // Let's make it more robust.
    
    if (!transcript) return "I didn't catch that. Could you repeat?";
    
    const lower = transcript.toLowerCase();
    
    switch (step) {
        case 'introduction': // User just answered the "Introduce yourself" question
            return "Thanks for that introduction. It's great to meet you. Now, what technologies or tools are you currently working with?";
            
        case 'technologies': // User just answered the "Tech stack" question
            return "That's an interesting stack. Thanks for sharing. This concludes the voice interaction. Have a great day.";
            
        default:
            return "I'm not sure where we are in the conversation, but let's continue.";
    }
};

module.exports = { generateAIResponse };
