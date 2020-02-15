import json
import os
from multiprocessing import freeze_support
import uvicorn
from starlette.middleware.cors import CORSMiddleware

from minter_push.api.minter_api import app

origins = json.loads(os.environ.get("ORIGINS", '["*"]'))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    freeze_support()
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("API_PORT")))
