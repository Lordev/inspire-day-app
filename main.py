from fastapi import FastAPI

from pydantic import BaseModel
import os
import logging
from dotenv import load_dotenv
from openai import OpenAI

os.makedirs("logs", exist_ok=True)  # Ensure logs directory exists

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Set up custom logging to a file
logging.basicConfig(
    filename="logs/ai_service.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)

app = FastAPI()

class GenerateRequest(BaseModel):
    niche: str = "general"
    tone: str = "neutral"
    prompt: str = "Give me a motivational message."

@app.get("/")
def read_root():
    return {"message": "InspireDay AI service is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/generate")
async def generate(data: GenerateRequest):
    logging.info(f"Request: {data.dict()}")
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"Generate a reflective prompt for the user. The niche is '{data.niche}' and the tone is '{data.tone}'. Respond in one concise sentence."},
                {"role": "user", "content": "Generate a reflective prompt."},
            ],
            max_tokens=35,
            n=1
        )
        output = response.choices[0].message.content
        logging.info(f"Response: {output}")
        return {"output": output}
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return {"error": "AI service error. Please try again later."}
    
