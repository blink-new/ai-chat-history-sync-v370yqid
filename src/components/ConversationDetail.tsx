const ConversationDetail = ({ conversation, onClose }) => {
  if (!conversation) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-10">
      <div className="bg-secondary w-1/3 min-h-full p-6 animate-slide-in flex flex-col">
        <div>
          <button onClick={onClose} className="mb-6 text-muted-foreground hover:text-foreground">
            &larr; Back to Inbox
          </button>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-3xl">{conversation.avatar}</div>
            <div>
              <h2 className="text-2xl font-bold">{conversation.title}</h2>
              <p className="text-muted-foreground">{conversation.service}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto pr-4">
          <div className="p-4 rounded-lg bg-primary/10">
            <p className="font-bold">You</p>
            <p>What are the latest trends in AI development?</p>
          </div>
          <div className="p-4 rounded-lg bg-primary/20">
            <p className="font-bold">{conversation.service}</p>
            <p>{conversation.excerpt}</p>
          </div>
        </div>
        <div className="mt-auto pt-6">
          <div className="relative">
            <textarea
              placeholder={`Message ${conversation.service}...`}
              className="bg-background w-full rounded-lg p-4 pr-16 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={2}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;