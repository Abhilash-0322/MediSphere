import React, { useEffect } from 'react';

const ChatbotComponent = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.defer = true;
    script.setAttribute('chatbotId', 'Y_z-UpNBpURErum7OwiFo');
    script.setAttribute('domain', 'www.chatbase.co');

    // Append the script to the document's body
    document.body.appendChild(script);

    // Clean up the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Any UI you want to render */}
    </div>
  );
};

export default ChatbotComponent;