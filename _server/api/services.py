from openai import OpenAI
import os


key = os.getenv("OPENAI_API_KEY")
ASSISTANT_ID = 'asst_nsOkPsRMeUyS0T1c2cHZtQ76'
client = OpenAI(api_key=key)

def create_thread():
    thread = client.beta.threads.create()
    return thread

def add_message(user_data, thread):
    client.beta.threads.messages.create(
        thread_id=thread.id,
        role='user',
        content=user_data
    )
    
def run_assistant(thread):
    run = client.beta.threads.runs.create(
    thread_id=thread.id,
    assistant_id=ASSISTANT_ID
    )   
    return run