from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "InspireDay AI service is running!"}