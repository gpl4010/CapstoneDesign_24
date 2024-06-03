from g4f.client import Client
import io
import sys

client = Client()

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8')


userMessage= sys.argv[1]

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": userMessage}],
)


print(response.choices[0].message.content)