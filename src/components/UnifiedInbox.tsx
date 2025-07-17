import { Search } from 'lucide-react';
import { useState } from 'react';
import ConversationDetail from './ConversationDetail';

const mockConversations = [
  {
    id: 1,
    service: 'ChatGPT',
    avatar: '🤖',
    title: 'Brainstorming session for a new project',
    excerpt: 'Sure, let\'s start with the core features. What are the must-haves for the MVP?',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    service: 'Claude',
    avatar: '📚',
    title: 'Drafting a blog post about AI ethics',
    excerpt: 'That\'s a great point. How can we ensure fairness and mitigate bias in our models?',
    timestamp: 'Yesterday',
  },
  {
    id: 3,
    service: 'Gemini',
    avatar: '✨',
    title: 'Summarizing a long research paper',
    excerpt: 'The key findings suggest a strong correlation between the two variables, but more research is needed...',
    timestamp: '3 days ago',
  },
];

const UnifiedInbox = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'ChatGPT', 'Claude', 'Gemini', 'Grok'];

  const filteredConversations = mockConversations.filter(convo => 
    activeFilter === 'All' || convo.service === activeFilter
  );

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {filters.map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === filter ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-primary/10'}`}>
              {filter}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="bg-secondary rounded-full pl-10 pr-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="bg-secondary rounded-lg">
        <ul className="divide-y divide-border">
          {filteredConversations.map((convo) => (
            <li key={convo.id} className="p-6 hover:bg-primary/10 cursor-pointer" onClick={() => setSelectedConversation(convo)}>
              <div className="flex items-start gap-4">
                <div className="text-2xl">{convo.avatar}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{convo.title}</h3>
                    <p className="text-sm text-muted-foreground">{convo.timestamp}</p>
                  </div>
                  <p className="text-muted-foreground mt-1">{convo.excerpt}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedConversation && <ConversationDetail conversation={selectedConversation} onClose={() => setSelectedConversation(null)} />}
    </section>
  );
};

export default UnifiedInbox;