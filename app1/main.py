from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

app = FastAPI()








app.mount("/", StaticFiles(directory="static", html=True), name="static")