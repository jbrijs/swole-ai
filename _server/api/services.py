from openai import OpenAI

ASSISTANT_ID = 'asst_nsOkPsRMeUyS0T1c2cHZtQ76'
client = OpenAI()
thread = client.beta.threads.create()


def create_message(user_data):
    client.beta.threads.messages.create(
        thread_id=thread.id,
        role='user',
        content=user_data
    )

def run_assistant():
    run = client.beta.threads.runs.create(
    thread_id=thread.id,
    assistant_id=ASSISTANT_ID
    )   
    return run