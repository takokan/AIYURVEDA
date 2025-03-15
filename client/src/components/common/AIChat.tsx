
import { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

type AIChatProps = {
  className?: string;
  placeholder?: string;
  welcomeMessage?: string;
};

// Mock responses for the demo
const mockResponses = [
  "Based on your pulse reading, I'm noticing a slight imbalance in your Pitta dosha. Would you like some recommendations to bring it back to balance?",
  "Your sleep patterns suggest Vata imbalance. I recommend a warm sesame oil massage before bed, and avoiding screen time 1 hour before sleep.",
  "Your recent readings indicate excellent progress. Your digestive fire (Agni) has improved significantly compared to last month.",
  "According to Ayurveda, the symptoms you describe align with 'Ama' accumulation. This often occurs when digestion is incomplete. Let me suggest some simple dietary adjustments.",
  "I notice you've been consistent with your morning routine. The improvements in your biomarkers are evidence that this consistency is benefiting your Kapha balance."
];

export function AIChat({
  className,
  placeholder = "Ask about your health...",
  welcomeMessage = "Hello! I'm your Ayurvedic AI assistant. How can I help you today?",
}: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: welcomeMessage,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI thinking and typing
    setIsTyping(true);
    
    setTimeout(() => {
      // Get random response
      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn('flex h-full flex-col rounded-2xl border', className)}>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                )}
              >
                <p>{message.text}</p>
                <div
                  className={cn(
                    'mt-1 text-xs',
                    message.sender === 'user'
                      ? 'text-primary-foreground/80'
                      : 'text-secondary-foreground/80'
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] items-center rounded-2xl bg-secondary px-4 py-3 text-secondary-foreground">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <p>Thinking...</p>
              </div>
            </div>
          )}
          
          <div ref={messageEndRef} />
        </div>
      </div>
      
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              className="w-full resize-none rounded-2xl border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim().length}
            className="rounded-full bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
