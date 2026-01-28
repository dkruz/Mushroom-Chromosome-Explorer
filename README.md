# 🍄 Mushroom Chromosome Explorer

An interactive, high-fidelity educational web application for exploring the genomic architecture of higher fungi. 

## 🎯 Project Purpose & Scope

The **Mushroom Chromosome Explorer** is a digital atlas designed for the mycological community, educators, and biology students. It serves as a bridge between high-level genomic data and visual biological education.

### Purpose
The primary goal of this application is to translate complex fungal karyotypes into a digestible, interactive format. By moving beyond static spreadsheets and raw sequence files, the Explorer allows users to visualize how the "blueprints of life" are physically organized within a mushroom's chromosomes.

### 🧪 Citizen Science Use Case
This app is specifically designed to support hobbyists and citizen scientists who are moving into **molecular mycology**:
- **Sequence Contextualization**: Users who have received FASTA data from labs (e.g., showing a 98% match to a known species) can use the Explorer to visualize the physical map of that reference genome.
- **Functional Mapping**: Transition from "raw letters" to biological understanding by seeing where functional clusters (like the *MAT* locus or *CAZyme* regions) are situated.
- **Comparative Analysis**: Identify whether genetic variations in a personal sample fall within stable "Core" regions or highly adaptive "Accessory" regions.

### Scope
- **Model Organisms**: Focused analysis of *Schizophyllum commune*, *Coprinopsis cinerea*, and *Agaricus bisporus*.
- **The Dikaryon Lifecycle**: Special emphasis on the unique `n+n` nuclear state of higher fungi.
- **Progressive Disclosure**: Three educational tiers (Beginner, Intermediate, Advanced) ensure the tool is useful for everyone from hobbyists to genomic researchers.

## 🚀 Deployment (Google Cloud Run)

This project is optimized for deployment to **Google Cloud Run** using the "No-Dockerfile" Buildpacks strategy.

1. **Connect to GitHub**: Push this repository to a GitHub account.
2. **Create Cloud Run Service**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/run).
   - Click **Create Service**.
   - Select **Continuously deploy from a repository**.
   - Choose this repository and the main branch.
3. **Build Configuration**:
   - When prompted for the Build Type, select **Google Cloud Buildpacks**.
   - Google will detect the `package.json` and automatically handle the Node.js environment.
4. **Environment Variables (Secrets)**:
   - Under the **Configuration** tab during setup, add an environment variable:
     - **Name**: `API_KEY`
     - **Value**: Your Google Gemini API Key.

## 🔐 Security & Secrets

This application utilizes the **Google Gemini API** for genomic analysis. 
- **The API Key is never hardcoded.** 
- The application retrieves the key from the environment via `process.env.API_KEY`.

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **AI Engine**: Google Gemini API (@google/genai)
- **Data Source**: Optimized karyotypes inspired by DOE JGI MycoCosm.
- **Hosting**: Google Cloud Run
- **Source Control**: GitHub

## 📁 Directory Structure

- `/components`: UI modules including the Karyotype Explorer and Genomic Terminal.
- `types.ts`: Strictly typed interfaces for genomic data structures.
- `constants.ts`: Authoritative species data and functional color mapping.
- `vite.config.ts`: Optimized build configuration for production assets.
- `package.json`: Defines the build pipeline and production entry point for Cloud Run.
