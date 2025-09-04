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

class AnalyzeRequest(BaseModel):
    prompt: str
    response: str

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
            {"role": "system", "content": f"You are a reflective prompt generator. Create a concise question (max 15 words) with the niche '{data.niche}' and tone '{data.tone}'."},
            {"role": "user", "content": "Generate a reflective question."},
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

@app.post("/analyze")
async def analyze(data: AnalyzeRequest):
    logging.info(f"Request: {data.dict()}")
    try:
        logging.info("Calling OpenAI API for analysis and advice...")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": (
                    "You are an expert in analyzing reflective journal responses. "
                    "If the response is relevant to the prompt, provide: "
                    "1. A brief analysis (max 50 words). "
                    "2. One positive aspect. "
                    "3. One area for improvement. "
                    "If the response is irrelevant, reply with: "
                    "'Please provide a relevant response that addresses the prompt to receive accurate feedback.'"
                )},
                {"role": "user", "content": f"prompt: {data.prompt} response: {data.response}"},
            ],
            max_tokens=200,
            n=1
        )
        logging.info(f"OpenAI API raw response: {response}")

        output = response.choices[0].message.content

        logging.info(f"Analysis & Advice Output: {output}")
        return {"output": output}
    except Exception as e:
        logging.error(f"Error during analysis: {str(e)}")
        return {"error": "AI service error. Please try again later."}


