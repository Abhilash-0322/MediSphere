## streamer.py

import requests

api_url = 'https://www.chatbase.co/api/v1/chat'
api_key = '<Your-Secret-Key>'
chat_id = 'Y_z-UpNBpURErum7OwiFo'

messages = [
    { 'content': '<Your query here>', 'role': 'user' }
]

authorization_header = f'Bearer {api_key}'

def read_chatbot_reply():
    try:
        headers = {
            'Authorization': authorization_header,
            'Content-Type': 'application/json'
        }
        
        data = {
            'messages': messages,
            'chatId': chat_id,
            'stream': True,
            'temperature': 0
        }
        
        response = requests.post(api_url, json=data, headers=headers, stream=True)
        response.raise_for_status()
        
        decoder = response.iter_content(chunk_size=None)
        for chunk in decoder:
            chunk_value = chunk.decode('utf-8')
            print(chunk_value, end='', flush=True)
        
    except requests.exceptions.RequestException as error:
        print('Error:', error)

read_chatbot_reply()