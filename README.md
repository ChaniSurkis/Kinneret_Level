# Kinneret Level
### Water Data Visualization Project

**Kinneret Level** is a data-driven application that retrieves and presents public water-level information from official government data sources via [data.gov.il](https://data.gov.il). The project focuses on displaying up-to-date and historical water data in a clear and accessible way, combining a modern frontend with a structured backend.

> 🚧 **This project is currently under active development.**

---

## Overview

The purpose of this project is to provide a simple and transparent view of water-related data — specifically water level measurements of the Kinneret (Sea of Galilee) — based on open government datasets. The system fetches raw data from public APIs and processes it for clean, user-friendly presentation.

---

## Data Source

- 🌐 Public open data from official Israeli government platforms ([data.gov.il](https://data.gov.il))
- 📏 Water level measurements and related environmental data
- 🔒 Read-only consumption of public datasets — no private or sensitive data is used

---

## Features

- 📡 **Live Data Fetching** — Retrieves up-to-date water level data directly from a public government API.
- ⚙️ **Backend Processing** — Server-side data handling, parsing, and validation for reliable data delivery.
- 🖥️ **Frontend Visualization** — Clear and accessible display of water level information on the client side.
- 🔀 **Client-Server Separation** — Clean architectural separation between frontend and backend logic.
- 📈 **Extensible Design** — Built with future analytics, charts, and enhanced visualizations in mind.

---

## Technologies Used

| Layer | Technology |
|---|---|
| Frontend | Angular |
| Backend | C# (.NET) |
| Data Source | Public Government API (data.gov.il) |
| Communication | RESTful API |

---

## Getting Started

> ⚠️ Full setup instructions will be provided as the project matures. The steps below outline the general setup flow.

### Prerequisites

- [Node.js](https://nodejs.org/) & Angular CLI
- [.NET SDK](https://dotnet.microsoft.com/)
- Internet access to consume the public data API

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/kinneret-level.git
cd kinneret-level
```

#### Frontend
```bash
cd client
npm install
ng serve
```

#### Backend
```bash
cd server
dotnet restore
dotnet run
```

---

## Development Status

This project is in its **early development stage**. Current focus areas include:

- 🔄 Stabilizing data fetching from the public API
- 🧹 Improving data parsing and validation logic
- 🎨 Enhancing data presentation and visualization on the client side

Contributions, suggestions, and feedback are welcome as the project evolves.

---

## License

This project was developed for **educational and learning purposes**. Feel free to explore the codebase, and reach out if you're interested in collaborating.
