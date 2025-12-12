# Historical AI Chatbot (Frontend)

A modern, React-based chat interface that allows users to converse with historical figures like Cleopatra, Ramesses II, and Tutankhamun. 

## Features

-   **Interactive Chat**: Real-time conversation with typing indicators and optimistic UI updates.
-   **Conversation History**: Sidebar with paginated chat history and management (save/delete).
-   **Dialogue Trees**: Support for structured, branching conversations.
-   **Context Management**: Global `SidebarContext` for managing application state across components.
-   **Optimized Performance**: Custom hooks (`useChatLogic`) for separation of concerns and efficient re-renders.
-   **Rich Text**: Renders markdown in chat messages.

## Tech Stack

-   **Framework**: React 18+ (Vite)
-   **Styling**: CSS Modules (Scoped styling)
-   **State Management**: React Context + Hooks
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

### Configuration

Create a `.env` file in the root directory:

```env
VITE_APP_API_URL=http://localhost:3000
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Access the app at `http://localhost:5173`.
> **Note**: Ensure the **Backend** is running on port 3000.

## Project Structure

-   `src/components`: Reusable UI components (Buttons, Layouts).
-   `src/features`: Feature modules (Chat, Home).
    -   `hooks`: Custom logic (e.g., `useChatLogic.js`).
    -   `components`: Feature-specific UI.
-   `src/services`: Clean API layer (`chatMessageService`, `chatHistoryService`).
-   `src/context`: Global state providers (`SidebarContext`).
-   `src/data`: Static data (Default Personas).

## Testing

### Unit Tests
```bash
npm test
```

### End-to-End Tests
```bash
npm run cy:open # Interactive
npm run cy:run  # Headless
```
