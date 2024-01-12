import time
from openai import OpenAI
import os


key = os.getenv("OPENAI_API_KEY")
ASSISTANT_ID = 'asst_nsOkPsRMeUyS0T1c2cHZtQ76'
client = OpenAI(api_key=key)

def create_thread():
    thread = client.beta.threads.create()
    return thread

def add_message(user_data, thread_id):
    client.beta.threads.messages.create(
        thread_id=thread_id,
        role='user',
        content=user_data
    )
    
def run_assistant(thread_id):
    run = client.beta.threads.runs.create(
    thread_id=thread_id,
    assistant_id=ASSISTANT_ID
    )   
    return run

def get_run_status(thread_id, run_id):
    try:
        run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id)
        return run.status
    except Exception as e:
        print(f"Error retrieving run status: {e}")
        return None

def check_run_status(thread_id, run_id, timeout=300):
    start_time = time.time()
    while time.time() - start_time < timeout:
        status = get_run_status(thread_id, run_id)
        if status in ["completed","failed", "cancelled", "expired"]:
            return status
        time.sleep(3) 
    return "timeout"

def get_last_message(thread_id):
    messages = client.beta.threads.messages.list(thread_id=thread_id)
    return (messages.data[0].content[0].text.value)

