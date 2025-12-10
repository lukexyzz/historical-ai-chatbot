# Historical AI Chatbot (Frontend)

A modern, React-based chat interface that allows users to converse with historical figures powered by AI.

## Features

-   **Interactive Chat**: Real-time conversation with personas like Cleopatra, Ramesses II, and Tutankhamun.
-   **Dialogue Trees**: Structured conversation paths for specific scenarios (e.g., strategic councils).
-   **Dynamic Avatars**: Visual representation of personas and the user.
-   **Rich Text Support**: Renders markdown in chat messages.
-   **Responsive Design**: Optimized for both desktop and mobile viewing.

## Tech Stack

-   **Framework**: React 18+
-   **Build Tool**: Vite
-   **Styling**: CSS Modules
-   **Icons**: Lucide React
-   **Testing**: Vitest (Unit), Cypress (E2E)

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm

### Installation

1.  Clone the repository.
2.  Navigate to the frontend directory:
    ```bash
    cd historical-ai-chatbot
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

> **Note**: Ensure the backend server is running on port 3000 for the chat to function.

## Testing

### Unit Tests

Run unit tests with Vitest:

```bash
npm test
```

### End-to-End Tests

Run Cypress E2E tests:

```bash
# Open interactive runner
npm run cy:open

# Run headless
npm run cy:run
```

## Project Structure

-   `src/components`: Reusable UI components.
-   `src/features`: Feature-specific logic (e.g., chat, home).
-   `src/pages`: Top-level page components.
-   `src/services`: API communication services.
-   `src/context`: React context providers (e.g., SidebarContext).
