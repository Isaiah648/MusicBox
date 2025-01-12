import os
from dotenv import load_dotenv
import google.generativeai as genai
import time
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# pip install fastapi uvicorn
# pip install python-dotenv
# pip install google-generativeai
# uvicorn geminiy:app --reload
# --user to override lack of permission

# Load environment variables from .env file
load_dotenv()

# Access the variables
gemini_api_key = os.getenv("GEMINI_API_KEY")

# initialize FastAPI server
# http://127.0.0.1:8000/docs
app = FastAPI()

# Enable CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL or "*" to allow all origins (use cautiously)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods, or specify ["GET", "POST", etc.]
    allow_headers=["*"],  # Allows all headers, or specify ["Content-Type", "Authorization", etc.]
)

# check configuration of model
@app.on_event("startup")
async def startup_event():
    if not gemini_api_key:
        raise RuntimeError("Gemini API Key missing from environment.")
    genai.configure(api_key=gemini_api_key)

# get the content
@app.get("/generate-content/")
async def generate_content(prompt: str):
    genai.configure(api_key=gemini_api_key)


    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        system_instruction="You are a music legend. You have great music taste and can suggest the perfect song recommendations, explaing briefly why."
        response = model.generate_content(prompt)

        if response and hasattr(response, 'text'):
            return JSONResponse(content={"generated_text": response.text})
        else:
            raise HTTPException(status_code=500, detail="No content returned from the model.")

        #print(response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Welcome to Gemini API"}