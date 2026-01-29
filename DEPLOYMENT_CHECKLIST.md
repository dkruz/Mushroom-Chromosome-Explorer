# 🚀 Google Cloud Run & Gemini API: Deployment Checklist

This document summarizes the technical requirements and "gotchas" discovered during the development of the Mushroom Chromosome Explorer. Use this as a template for future high-fidelity AI web apps.

## 📦 1. Dependency Management
*   **The "Lockfile Trap"**: Google Cloud Buildpacks use `npm ci` if a `package-lock.json` is present. This is extremely strict and often fails in cloud environments due to version mismatches or CDN-based imports.
*   **Action**: Add `package-lock.json` to `.gitignore`.
*   **Result**: Forces the builder to use `npm install`, which is more resilient.

## 🛠 2. Vite Configuration (`vite.config.ts`)
For Google Cloud Run "No-Dockerfile" deployments, your preview server must be open to the platform's dynamic routing.
*   **Port**: Must be set to `8080` (the standard Cloud Run port).
*   **Allowed Hosts**: Set `preview.allowedHosts: true`. Without this, you will see "Blocked Request" errors because the platform's URL won't match Vite's internal security list.
*   **Host**: Use `0.0.0.0` in your start script (`vite preview --host 0.0.0.0`) to ensure the container listens on all interfaces.

## 🌐 3. HTML & Build Integrity (`index.html`)
*   **No Importmaps**: If using a Vite-based build (React/TypeScript), remove all `<script type="importmap">` blocks. Vite manages dependencies via the `package.json` bundle. Keeping an importmap leads to "Multiple versions of React" errors.
*   **Tag Integrity**: Ensure all `<style>` and `<script>` tags are closed. Truncated files cause `eof-in-element-that-can-contain-only-text` build failures.
*   **Root Pathing**: Use absolute paths for the entry point: `<script type="module" src="/index.tsx"></script>`.

## 🤖 4. Gemini API (@google/genai)
*   **Initialization**: Always use `const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });`.
*   **Naming**: The environment variable in Cloud Run must be exactly `API_KEY`.
*   **Response Extraction**:
    *   **Correct**: `const text = response.text;` (It is a getter property).
    *   **Incorrect**: `const text = response.text();` (Calling it as a function will crash).
*   **Safety**: Never include UI for API keys. The app must rely entirely on the injected environment variable for security.

## ☁️ 5. Google Cloud Run Setup
1.  **Service Type**: Choose "Continuously deploy from a source repository".
2.  **Build Type**: Select **Google Cloud Buildpacks** (do NOT use Dockerfile if the repo doesn't have a custom one).
3.  **Variables**: Add `API_KEY` in the "Variables & Secrets" tab *before* the first deployment or immediately after.
4.  **Region**: `us-central1` or `us-west1` generally have the best availability for newer AI features.

## 🔍 6. Troubleshooting Common Errors
*   **403/Blocked Request**: Check `allowedHosts: true` in `vite.config.ts`.
*   **White Screen / Console Error "Hooks can only be called inside..."**: You have two versions of React. Delete the `importmap` in `index.html`.
*   **Build Failure "eof-in-element..."**: Check for unclosed tags in `index.html`.
*   **Build Failure "npm ci failed"**: Delete `package-lock.json` and push again.