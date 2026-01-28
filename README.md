# 🍄 Mushroom Chromosome Explorer

An interactive, high-fidelity educational web application for exploring the genomic architecture of higher fungi. 

## 🎯 Project Purpose & Scope

The **Mushroom Chromosome Explorer** is a digital atlas designed for the mycological community, educators, and biology students. It serves as a bridge between high-level genomic data and visual biological education.

### 🧪 Citizen Science Use Case
This app is specifically designed to support hobbyists and citizen scientists who are moving into **molecular mycology**:
- **Sequence Contextualization**: Users who have received FASTA data from labs (e.g., showing a 98% match to a known species) can use the Explorer to visualize the physical map of that reference genome.
- **Functional Mapping**: Transition from "raw letters" to biological understanding by seeing where functional clusters (like the *MAT* locus or *CAZyme* regions) are situated.

## 🚀 Deployment & API Configuration

This project is optimized for deployment to **Google Cloud Run** using the "No-Dockerfile" Buildpacks strategy.

### 1. Initial Deployment Flow
When you click **"Create Service"** in the [Cloud Run Console](https://console.cloud.google.com/run), you are presented with a choice. **Choose the second option:**

**✅ Select: "Continuously deploy new revisions from a source repository"**
- **Action**: Click the **SET UP WITH CLOUD BUILD** button.
- **Action**: Link your GitHub repository and select the `main` branch.
- **Action**: Under "Build Type," strictly select **Google Cloud Buildpacks**.
- **Result**: Google will now automatically build and deploy your container every time you push code. You do **not** need to manually "Deploy Container."

### 2. How to add your API Key (Cloud Run Settings)
The app requires an environment variable named **`API_KEY`** to communicate with the Gemini models.

**During setup (at the bottom of the page) or after deployment:**
1. Find the **Container(s), Volumes, Networking, Security** configuration section.
2. Click the **Variables & Secrets** tab.
3. Click **Add Variable**.
4. **Name**: `API_KEY`
5. **Value**: [Paste your key from Google AI Studio]
6. Click **Create** or **Deploy**.

## 🔐 Security Note
- **Variable Name**: Ensure you use `API_KEY` exactly (not `GOOGLE_API_KEY`), as the application code specifically looks for this name.
- **Secrets**: In production environments, it is recommended to use "Secret Manager" rather than plain-text environment variables.

## 🛠 Tech Stack
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **AI Engine**: Google Gemini API (@google/genai)
- **Hosting**: Google Cloud Run
