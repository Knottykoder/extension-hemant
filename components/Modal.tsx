import RegenerateIcon from '../assets/regenerateIcon.svg';
import GenerateIcon from '../assets/generateIcon.svg';
import ArrowIcon from '../assets/arrow.svg';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (text: string) => void;
    onInsert: (text: string) => void;
}

interface Message {
    text: string;
    sender: 'user' | 'ai';
  }

const Modal = ({ isOpen, onClose, onSubmit,onInsert }:ModalProps) => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [hasGenerated, setHasGenerated] = useState(false);
  
    if (!isOpen) return null;

    const handleSubmit = () => {
        if (inputText.trim()) {
            const aiReply = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
          setMessages([
            ...messages,
            { text: inputText, sender: 'user' },
            { text: aiReply, sender: 'ai' }
          ]);
          onSubmit(inputText);
          setInputText('');
          setHasGenerated(true);
    }
        }
        const handleRegenerate = () => {
            // handleSubmit();
          };

          const handleInsert = () => {
            const aiMessage = messages.find(m => m.sender === 'ai');
            if (aiMessage) {
              onInsert(aiMessage.text);
              setInputText('');
              setMessages([]);
              setHasGenerated(false);
            }
          };

  
    return (
        <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[10000]"
        onClick={onClose}
      >
        <div
          className="bg-white p-5 rounded-lg w-[500px] max-h-[400px] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '10px' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2.5`}
              >
                <div
             className={`${message.sender === 'user' ? 'bg-[#DFE1E7]' : 'bg-[#DBEAFE]'} px-3 py-2 rounded-xl max-w-[70%]`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={inputText}
              placeholder="Enter your prompt"
              onChange={(e) => setInputText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
           
              <div className="flex justify-end gap-5">
              {hasGenerated && (
          <div>
            <button 
            onClick={handleInsert} 
            className="flex items-center justify-center gap-2 border-2 border-[#666D80] text-[#666D80] text-2xl font-bold p-3 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <img src={ArrowIcon} alt="arrow icon" className='w-5 h-5'/>
              Insert</button>
          </div>
        )}
            <button 
              onClick={hasGenerated ? handleRegenerate : handleSubmit}
              className="flex justify-center items-center gap-[10px] p-3 bg-blue-500 text-white text-2xl font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img src={hasGenerated ? RegenerateIcon : GenerateIcon} alt="generate icon" />
              {hasGenerated ? 'Regenerate' : 'Generate'}
            </button>
          </div>
          </div>
        </div>
      </div>
    );
  };

  export default Modal;