# User management

By [Priyanshu Ranjan](https://knotters.org/@ranjanistic)

- Flask backend [hosted here](https://flassignment.onrender.com/)
- ReactJS frontend [hosted here](https://flassign.onrender.com/)

## Prerequisites

- MongoDB server 5+
- NodeJS 14+, npm
- Python 3.8+, pip

## Setup

Backend and frontend setups are independent.

> For frontend commands, always move in `frontend` folder (using `cd frontend`) before anything. Similarly for backend, always be in the project's root folder.

### Environment

Use the following command to create a `config.toml` file for backend.

```bash
python3 setup.py
```
You can also manually create this config file using `config.example.toml` as reference.

Set appropriate values according to your environment.

### Dependencies

- Backend

All dependencies are mentioned in `[requirements.txt](requirements.txt)`.

Use the follwing steps to install them.

```bash
python3 -m venv env
pip install -r requirements.txt
```

- Frontend

```bash
npm install
```

## Run

- Backend

Run in development mode

```bash
python3 server.py
```

Run in production mode

```bash
gunicorn -c prod.py
```

- Frontend

Run in development mode

```bash
npm start
```

Run in production mode

```bash
npm run build
npm i -g serve
serve -s build
```
