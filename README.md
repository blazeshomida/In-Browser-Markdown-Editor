# In-Browser Markdown Editor

## Introduction

This project is a Markdown editor with a split view interface. Users can write Markdown syntax in one panel and see the rendered Markdown in the other. It's built using React and Next.js for the front-end, Zustand for state management, and Framer Motion for animations.

## Installation

To install the project, follow these steps:

```bash

# Clone the repository

git clone https://github.com/blazeshomida/In-Browser-Markdown-Editor



# Navigate into the directory

cd In-Browser-Markdown-Editor



# Install dependencies

npm install



# Start the development server

npm run dev

```

## Usage

After starting the development server, navigate to `localhost:3000` in your browser. You'll see two panels. The left panel is the Markdown editor, where you can write your content. The right panel is the preview panel, where you can see the rendered content.

You can adjust the width of the panels by clicking and dragging the divider between them. The panels will snap to predefined positions. You can also hide one panel to focus on the other.

## Code Structure

The project is structured into several React components and custom hooks:

### Components

1. `SplitPane`: This is the main component that renders the split view interface. It uses the Framer Motion library for smooth animations during resizing.

2. `Header`: This component renders a header with controls for saving and deleting documents. It also contains the `TitleCard` for editing the document title.

3. `TitleCard`: This is a sub-component within the `Header`. It allows users to view and edit the title of the current document, demonstrating the reusability of components in React.

4. `SidebarNav`: This is the component responsible for rendering the navigation menu. It allows users to switch between different documents and create new ones. It also contains a switch for toggling between light and dark modes.

### Hooks

1. `useAppStore`, `useDocumentStore`: These are Zustand stores for managing the state of the application.

2. `useMenuOpen`, `useToggleMenu`, `useResizing`, `useSetResizing`, `useDarkMode`, `useToggleDarkMode`, `useActivePanel`, `useSetActivePanel`, `useCurrentLocale`, `useSetCurrentLocale`: These are custom hooks for reading and manipulating the state of the application.

3. `useCurrentDocument`, `useUpdateCurrentDocument`, `useUpdateDocument`, `useDeleteDocument`: These are custom hooks for managing the state of the document.

4. `useMounted`: This custom hook returns a Boolean indicating whether the component is mounted.

5. `useMediaQuery`: This custom hook provides a simple interface for responsive design.

## Features

Here are some of the key features of the project:

- Split view interface: This allows users to edit Markdown on one side and see the rendered output on the other. It's a user-friendly feature that offers real-time feedback.

Here's how the split view is implemented:

```jsx
// Inside App component

<SplitPane
  range={10}
  defaultSplit={50}
  splitPoints={[30, 50, 70]}
  collapseThreshold={5}
>
  <form className="mx-auto h-full w-full max-w-2xl pb-32 font-mono text-preview-paragraph text-neutral-700 dark:text-neutral-400">
    <textarea
      name=""
      id=""
      className=" h-full w-full resize-none overflow-clip bg-[inherit] px-6 pt-8"
      autoFocus
      onChange={handleChange}
      value={document?.content}
    />
  </form>

  <div className="h-full w-full overflow-y-auto">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="_markdown-preview mx-auto h-full max-w-2xl overscroll-contain p-6 font-serif text-neutral-700 prose-a:text-[inherit] prose-li:text-neutral-500 dark:text-neutral-100"
      components={PreviewComponents}
    >
      {document?.content}
    </ReactMarkdown>
  </div>
</SplitPane>
```

- Document management: Users can create, update, and delete documents.

Here's how a new document is created:

```jsx

// Inside useDocumentStore

createDocument: () =>

set((state) => {

const newDocument = createNewDocument();

return {

documents: [...state.documents, newDocument],

currentDocument: newDocument,

};

}),

```

- Responsive design: The interface adjusts depending on the screen size. This is achieved using media queries and the `useMediaQuery` hook.

```jsx
import { useState, useEffect } from "react";



const useMediaQuery = (query: string) => {

const [matches, setMatches] = useState(false);



useEffect(() => {

const media = window.matchMedia(query);

if (media.matches !== matches) {

setMatches(media.matches);

}

const listener = () => setMatches(media.matches);

window.addEventListener("resize", listener);

return () => window.removeEventListener("resize", listener);

}, [matches, query]);



return matches;

};



export default useMediaQuery;
```

- Dark mode: Users can switch between light and dark mode.

Here's how the dark mode is toggled:

```jsx

// Inside useAppStore

toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

```

- Navigation menu: Users can switch between different documents and create new ones. They can also toggle between light and dark modes.

Here's how a new document is selected in the navigation menu:

```jsx
// Inside SidebarNav

<Button
  key={document.id}
  className="duration-250 flex w-full items-center justify-start gap-4 rounded-lg p-3 text-neutral-100 transition-all hover:bg-neutral-800"
  onPress={() => handleSetCurrent(document)}
>
  <DocumentIcon />

  <div className="text-left">
    <p className="text-body-m text-neutral-500">
      {Intl.DateTimeFormat(currentLocale, {
        dateStyle: "long",
      }).format(new Date(document.lastUpdated))}
    </p>

    <p className="text-heading-m ">{document.title}</p>
  </div>
</Button>
```

## Documentation

For more details about the project, please refer to the source code and inline comments. The source code is organized into components and hooks, each in its own file. Additional documentation on how to use Markdown can be found in the placeholder text of the Markdown editor.

## Contributing

Contributions to the project are welcome. Please create an issue to discuss your feature or bug fix before submitting a pull request.

## Acknowledgments

Thanks to all contributors who helped in the development of this project.
