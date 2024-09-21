# Markdown

## Introduction

**Markdown** is a dynamic, user-friendly **Markdown editor** with a split-pane interface. Users can write Markdown in one panel and instantly see the live preview in another. Built using **React** and **Next.js**, this project takes advantage of **Zustand** for state management, **Framer Motion** for animations, and **Next Themes** for dark mode functionality.

## Features

### 1. Real-Time Markdown Preview

- Edit Markdown in the left panel and see the live-rendered output in the right panel.
- Supports **GitHub Flavored Markdown** through `remark-gfm`.

### 2. Document Management

- Easily **create**, **update**, and **delete** Markdown documents with autosave functionality.
- Use the sidebar for quick access to documents and seamless switching.

### 3. Responsive Design

- Optimized for both desktop and mobile devices.
- On mobile, toggle between the editor and preview modes to maximize space.

### 4. Dark Mode

- Switch between light and dark themes with smooth transitions.

### 5. Adjustable Layout

- Drag the divider between the editor and preview to resize panels.
- Layout preferences are saved in cookies, ensuring a consistent experience across sessions.

## Installation

To install and run the project locally:

```bash
# Clone the repository
git clone https://github.com/blazeshomida/In-Browser-Markdown-Editor

# Navigate into the project directory
cd In-Browser-Markdown-Editor

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` in your browser to access the editor.

## Usage

Once the application is up and running:

1. **Write Markdown** in the left pane. The right pane will automatically render the formatted content.
2. **Resize the Layout** by dragging the divider between the panels.
3. **Manage Documents** using the sidebar to create, delete, or switch between documents.
4. **Dark Mode**: Toggle between light and dark modes via the sidebar switch.
5. **Mobile**: The app adapts to smaller screens by toggling between editor and preview views.

## Code Structure

This project is designed for modularity and ease of maintenance. Below is an overview of the main components and hooks:

### Components

- **RootLayout**: The main layout that wraps the app, integrating the header and theme provider.
- **MainContent**: The core component responsible for rendering the Markdown editor and preview, supporting the split-pane layout.
- **Header**: Handles document actions like saving, deleting, and renaming.
- **SidebarNav**: Manages navigation between documents and theme toggling.

### Custom Hooks

- **useDocumentStore**: Manages the creation, updating, and deletion of documents.
- **useMediaQuery**: Provides responsive design functionality based on screen size.
- **useMenuOpen**: Controls the opening and closing of the sidebar.
- **useMounted**: Ensures that certain actions are only executed after the component is mounted, preventing SSR/CSR issues.

## Example: Creating a New Document

This is an example of how the document store creates a new document using Zustand:

```tsx
createDocument: () =>
  set((state) => {
    const newDocument = createNewDocument();
    return {
      documents: [...state.documents, newDocument],
      currentDocument: newDocument,
    };
  }),
```

## Example: Responsive Design Hook

The `useMediaQuery` hook dynamically adjusts the layout based on the screen width:

```tsx
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [query]);
  return matches;
};
```

## Future Improvements

1. **Enhanced Markdown Features**: Add support for tables, task lists, and other advanced Markdown syntax.
2. **Cloud Sync**: Allow users to save and sync documents across devices via the cloud.
3. **Custom Themes**: Offer a range of customizable themes beyond light and dark mode.

## Contributing

Contributions are always welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request for review.

Please open an issue for any significant changes you'd like to discuss before implementation.

## Acknowledgments

Thanks to all contributors who have helped develop and improve **Markdown**.
