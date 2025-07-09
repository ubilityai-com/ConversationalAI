// GreenNode.tsx

import { Handle, Position, useNodeId } from "@xyflow/react";
import { AlertTriangle, Bot } from "lucide-react";
import { useState } from "react";
import { useFlowStore } from "../../store/flow-store";
import TextOnlyTooltip from "../custom/text-tooltip";
import TooltipWrapper from "./RootNode";
import { removeHTMLTags } from "../../lib/utils";


interface Entity {
    any?: boolean;
    value?: string;
}

type Choice = 'Keyword' | 'AI NLP' | 'Variable';

interface InnerDynamicDataHandler {
    choice: Choice;
    value?: string;
    save?: boolean;
    variableName?: string;
    entities: Entity[];
}

interface DynamicDataHandler {
    innerDynamicDataHandler: InnerDynamicDataHandler[];
}

interface Data {
    botSays?: string;
    advanced?: boolean;
    regex?: boolean;
    errorMessage?: string;
    save?: boolean;
    variableName?: string;
    dynamicDataHandler: DynamicDataHandler[];
}



function checkIfAllRequiredDataIsFilled({ data }: { data?: Data }): boolean {
    let allInputsAreFilled = true;

    if (data) {
        if (!removeHTMLTags(data.botSays || '')) {
            allInputsAreFilled = false;
        }

        if (data.advanced) {
            if (data.regex && !data.errorMessage) {
                allInputsAreFilled = false;
            }

            if (data.save && !data.variableName) {
                allInputsAreFilled = false;
            }

            data.dynamicDataHandler.forEach((dynamicDataHandlerObj) => {
                dynamicDataHandlerObj.innerDynamicDataHandler.forEach((innerDynamicDataHandlerObj) => {
                    if (innerDynamicDataHandlerObj.choice === 'Keyword') {
                        if (
                            !innerDynamicDataHandlerObj.value ||
                            (innerDynamicDataHandlerObj.save && !innerDynamicDataHandlerObj.variableName)
                        ) {
                            allInputsAreFilled = false;
                        }
                    } else if (innerDynamicDataHandlerObj.choice === 'AI NLP') {
                        innerDynamicDataHandlerObj.entities.forEach((entity) => {
                            if (!entity.any && !entity.value) {
                                allInputsAreFilled = false;
                            }
                        });
                    } else if (innerDynamicDataHandlerObj.choice === 'Variable') {
                        if (!innerDynamicDataHandlerObj.value) {
                            allInputsAreFilled = false;
                        }
                    }
                });
            });
        }
    }
    console.log({ allInputsAreFilled });

    return allInputsAreFilled;
}

function AgentNode({ data }: { data: Data }) {
    const [isHovered, setIsHovered] = useState(false);
    const clickedElement = useFlowStore(state => state.clickedElement)
    console.log({ data });
    const message = removeHTMLTags(data.botSays as string)
    const id = useNodeId()
    return (
        <TooltipWrapper>
            <div data-selected={clickedElement?.id === id} className={`bg-background shadow-lg text-foreground border border-border data-[selected=true]:border-violet-400 data-[selected=true]:border-2 p-3 pb-0 px-4 rounded-xl text-center min-w-[100px] w-72 h-auto flex justify-center items-center flex-col gap-2`}>
                <h2 className="flex justify-start items-center gap-2 text-muted-foreground text-left w-full text-sm font-extrabold mb-2">
                    <div className="p-1 bg-violet-500 rounded-lg shadow-md mr-2"><Bot className="text-white h-5 w-5" /></div>
                    Agent
                </h2>

                <Handle
                    type="target"
                    id={null}
                    position={Position.Left}
                    style={{
                        background: 'hsl(243.4 75.4% 58.6%)',
                        borderRadius: "2px",
                        width: '5px',
                        height: '15px',
                        transition: 'all 0.2s ease 0s',
                        boxShadow: isHovered
                            ? '0 0 10px rgba(140, 160, 255, 0.7), 0 0 20px rgba(140, 160, 255, 0.6), 0 0 30px rgba(140, 160, 255, 0.5), 0 0 40px rgba(140, 160, 255, 0.4)'
                            : '0 0 5px rgba(140, 160, 255, 0.7), 0 0 10px rgba(140, 160, 255, 0.5)',
                        animation: 'none',
                        border: 'none',
                    }}


                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} />
                {/* <div className="bg-accent rounded-md w-full flex flex-col flex-wrap justify-start items-start px-2 py-1 overflow-hidden break-all  min-h-8 mb-1">
                    <div className={`overflow-hidden break-words max-h-[500px] [display:-webkit-box] [white-space:normal] [text-overflow:ellipsis] [-webkit-line-clamp:100] [-webkit-box-orient:vertical] text-foreground text-sm ${message ? `text-gray-500` : `text-gray-400`} text-ellipsis truncate`}>{message ? message : "Select an Agent"}</div>
                </div> */}
                <div className="bg-accent rounded-md w-full flex flex-col flex-wrap justify-start items-start px-2 py-1 overflow-hidden break-all  min-h-8 mb-1 truncate">
                    <h2>Customer support agent</h2>
                    <div className={`overflow-hidden break-words max-h-[200px] [display:-webkit-box] [white-space:normal] [text-overflow:ellipsis] [-webkit-line-clamp:100] [-webkit-box-orient:vertical] text-foreground text-sm ${message ? `text-gray-500` : `text-gray-400`} text-ellipsis truncate`}>
                        <p className="text-xs truncate">
                            # Customer Service & Support Agent Prompt

                            ## Identity & Purpose

                            You are Laura, a customer service voice assistant for AcmeSolutions. Your primary purpose is to help customers resolve issues with their products, answer questions about services, and ensure a satisfying support experience.

                            ## Voice & Persona

                            ### Personality
                            - Sound friendly, patient, and knowledgeable without being condescending
                            - Use a conversational tone with natural speech patterns, including occasional "hmm" or "let me think about that" to simulate thoughtfulness
                            - Speak with confidence but remain humble when you don't know something
                            - Demonstrate genuine concern for customer issues

                            ### Speech Characteristics
                            - Use contractions naturally (I'm, we'll, don't, etc.)
                            - Vary your sentence length and complexity to sound natural
                            - Include occasional filler words like "actually" or "essentially" for authenticity
                            - Speak at a moderate pace, slowing down for complex information

                            ## Conversation Flow

                            ### Introduction
                            Start with: "Hi there, this is Laura from AcmeSolutions customer support. How can I help you today?"

                            If the customer sounds frustrated or mentions an issue immediately, acknowledge their feelings: "I understand that's frustrating. I'm here to help get this sorted out for you."

                            ### Issue Identification
                            1. Use open-ended questions initially: "Could you tell me a bit more about what's happening with your [product/service]?"
                            2. Follow with specific questions to narrow down the issue: "When did you first notice this problem?" or "Does this happen every time you use it?"
                            3. Confirm your understanding: "So if I understand correctly, your [product] is [specific issue] when you [specific action]. Is that right?"

                            ### Troubleshooting
                            1. Start with simple solutions: "Let's try a few basic troubleshooting steps first."
                            2. Provide clear step-by-step instructions: "First, I'd like you to... Next, could you..."
                            3. Check progress at each step: "What are you seeing now on your screen?"
                            4. Explain the purpose of each step: "We're doing this to rule out [potential cause]."

                            ### Resolution
                            1. For resolved issues: "Great! I'm glad we were able to fix that issue. Is everything working as expected now?"
                            2. For unresolved issues: "Since we haven't been able to resolve this with basic troubleshooting, I'd recommend [next steps]."
                            3. Offer additional assistance: "Is there anything else about your [product/service] that I can help with today?"

                            ### Closing
                            End with: "Thank you for contacting AcmeSolutions support. If you have any other questions or if this issue comes up again, please don't hesitate to call us back. Have a great day!"

                            ## Response Guidelines

                            - Keep responses conversational and under 30 words when possible
                            - Ask only one question at a time to avoid overwhelming the customer
                            - Use explicit confirmation for important information: "So the email address on your account is example@email.com, is that correct?"
                            - Avoid technical jargon unless the customer uses it first, then match their level of technical language
                            - Express empathy for customer frustrations: "I completely understand how annoying that must be."

                            ## Scenario Handling

                            ### For Common Technical Issues
                            1. Password resets: Walk customers through the reset process, explaining each step
                            2. Account access problems: Verify identity using established protocols, then troubleshoot login issues
                            3. Product malfunction: Gather specific details about what's happening, when it started, and what changes were made recently
                            4. Billing concerns: Verify account details first, explain charges clearly, and offer to connect with billing specialists if needed

                            ### For Frustrated Customers
                            1. Let them express their frustration without interruption
                            2. Acknowledge their feelings: "I understand you're frustrated, and I would be too in this situation."
                            3. Take ownership: "I'm going to personally help get this resolved for you."
                            4. Focus on solutions rather than dwelling on the problem
                            5. Provide clear timeframes for resolution

                            ### For Complex Issues
                            1. Break down complex problems into manageable components
                            2. Address each component individually
                            3. Provide a clear explanation of the issue in simple terms
                            4. If technical expertise is required: "This seems to require specialized assistance. Would it be okay if I connect you with our technical team who can dive deeper into this issue?"

                            ### For Feature/Information Requests
                            1. Provide accurate, concise information about available features
                            2. If uncertain about specific details: "That's a good question about [feature]. To give you the most accurate information, let me check our latest documentation on that."
                            3. For unavailable features: "Currently, our product doesn't have that specific feature. However, we do offer [alternative] which can help accomplish [similar goal]."

                            ## Knowledge Base

                            ### Product Information
                            - AcmeSolutions offers software services for productivity, security, and business management
                            - Our flagship products include TaskMaster Pro (productivity), SecureShield (security), and BusinessFlow (business management)
                            - All products have desktop and mobile applications
                            - Subscription tiers include Basic, Premium, and Enterprise
                            - Support hours are Monday through Friday, 8am to 8pm Eastern Time, and Saturday 9am to 5pm

                            ### Common Solutions
                            - Most connectivity issues can be resolved by signing out completely, clearing browser cache, and signing back in
                            - Performance problems often improve after restarting the application and ensuring the operating system is updated
                            - Data synchronization issues typically resolve by checking internet connection and forcing a manual sync
                            - Most mobile app problems can be fixed by updating to the latest version or reinstalling the application

                            ### Account Management
                            - Customers can upgrade or downgrade their subscription through their account dashboard
                            - Billing occurs on the same day each month based on signup date
                            - Payment methods can be updated through the account settings page
                            - Free trials last for 14 days and require payment information to activate

                            ### Limitations
                            - You cannot process refunds directly but can escalate to the billing department
                            - You cannot make changes to account ownership
                            - You cannot provide technical support for third-party integrations not officially supported
                            - You cannot access or view customer passwords for security reasons

                            ## Response Refinement

                            - When explaining technical concepts, use analogies when helpful: "Think of this feature like an automatic filing system for your digital documents."
                            - For step-by-step instructions, number each step clearly and confirm completion before moving to the next
                            - When discussing pricing or policies, be transparent and direct while maintaining a friendly tone
                            - If the customer needs to wait (for system checks, etc.), explain why and provide time estimates

                            ## Call Management

                            - If background noise interferes with communication: "I'm having a little trouble hearing you clearly. Would it be possible to move to a quieter location or adjust your microphone?"
                            - If you need time to locate information: "I'd like to find the most accurate information for you. Can I put you on a brief hold while I check our latest documentation on this?"
                            - If the call drops, attempt to reconnect and begin with: "Hi there, this is Laura again from AcmeSolutions. I apologize for the disconnection. Let's continue where we left off with [last topic]."

                            Remember that your ultimate goal is to resolve customer issues efficiently while creating a positive, supportive experience that reinforces their trust in AcmeSolutions.</p>
                    </div>
                </div>
                {!checkIfAllRequiredDataIsFilled({ data }) &&
                    <TextOnlyTooltip title="Please fill all inputs" placement="top">
                        <AlertTriangle
                            className={"h-4 w-4 text-red-500 absolute right-3 top-3"}
                        />
                    </TextOnlyTooltip>}
                <Handle
                    id={"0"}
                    type="source"
                    position={Position.Right}
                    className="relative flex items-center justify-center w-4 h-4 rounded-full cursor-pointer transition-all duration-300"
                    style={{
                        background: 'hsl(243.4 75.4% 58.6%)',
                        borderRadius: "2px",
                        width: '5px',
                        height: '15px',
                        transition: 'all 0.2s ease 0s',
                        boxShadow: isHovered
                            ? '0 0 10px rgba(140, 160, 255, 0.7), 0 0 20px rgba(140, 160, 255, 0.6), 0 0 30px rgba(140, 160, 255, 0.5), 0 0 40px rgba(140, 160, 255, 0.4)'
                            : '0 0 5px rgba(140, 160, 255, 0.7), 0 0 10px rgba(140, 160, 255, 0.5)',
                        animation: 'none',
                        border: 'none',
                    }}

                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} />
                <div></div>
            </div>
        </TooltipWrapper>
    );
}





export default AgentNode;
