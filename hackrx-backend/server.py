from fastapi import FastAPI, File, UploadFile
import os
from main import *
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse