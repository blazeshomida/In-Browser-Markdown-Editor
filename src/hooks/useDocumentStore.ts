import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

const markdownDefault = `# Welcome to Markdown

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

## How to use this?

1. Write markdown in the markdown editor window
2. See the rendered markdown in the preview window

### Features

- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists
- Name and save the document to access again later
- Choose between Light or Dark mode depending on your preference

> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).

#### Headings

To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.

##### Lists

You can see examples of ordered and unordered lists above.

###### Code Blocks

This markdown editor allows for inline-code snippets, like this: <p>I'm inline</p>. It also allows for larger code blocks like this:

\`\`\`
<main>
  <h1>This is a larger code block</h1>
</main>
\`\`\`
`;

export type DocumentType = {
  id: string;
  title: string;
  content: string;
  lastUpdated: Date;
  _createdAt: Date;
};

type DocumentStore = {
  currentDocument: DocumentType;
  updateCurrentDocument: (
    type: keyof DocumentType,
    value: DocumentType[keyof DocumentType],
  ) => void;
  setCurrentDocument: (document: DocumentType) => void;
  documents: DocumentType[];
  resetCurrentDocument: () => void;
  createDocument: () => void;
  deleteDocument: () => void;
  updateDocument: () => void;
};
const useDocumentStore = create(
  persist<DocumentStore>(
    (set) => {
      const createNewDocument = () => ({
        id: uuidv4(),
        title: "New Document",
        content: markdownDefault,
        lastUpdated: new Date(),
        _createdAt: new Date(),
      });

      const initialDocument = createNewDocument();

      return {
        currentDocument: initialDocument,
        updateCurrentDocument: (type, value) =>
          set((state) => ({
            currentDocument: { ...state.currentDocument, [type]: value },
          })),
        setCurrentDocument: (document) =>
          set(() => ({ currentDocument: document })),
        resetCurrentDocument: () =>
          set(() => ({
            currentDocument: createNewDocument(),
          })),
        documents: [initialDocument],
        createDocument: () =>
          set((state) => {
            const newDocument = createNewDocument();
            return {
              documents: [...state.documents, newDocument],
              currentDocument: newDocument,
            };
          }),
        deleteDocument: () =>
          set((state) => {
            const newDocument = createNewDocument();
            let filteredDocs = state.documents.filter(
              (document) => document.id !== state.currentDocument.id,
            );
            if (!filteredDocs.length) {
              filteredDocs = [newDocument];
            }
            return {
              documents: [...filteredDocs],
              currentDocument: filteredDocs.at(-1) || newDocument,
            };
          }),
        updateDocument: () =>
          set((state) => ({
            documents: state.documents.map((document) =>
              document.id === state.currentDocument.id
                ? { ...state.currentDocument, lastUpdated: new Date() }
                : document,
            ),
          })),
      };
    },
    {
      name: "document-storage", // unique name
    },
  ),
);

export const useCurrentDocument = () =>
  useDocumentStore((state) => state.currentDocument);
export const useUpdateCurrentDocument = () =>
  useDocumentStore((state) => state.updateCurrentDocument);
export const useSetCurrentDocument = () =>
  useDocumentStore((state) => state.setCurrentDocument);
export const useResetCurrentDocument = () =>
  useDocumentStore((state) => state.resetCurrentDocument);
export const useDocuments = () => useDocumentStore((state) => state.documents);
export const useCreateDocument = () =>
  useDocumentStore((state) => state.createDocument);
export const useDeleteDocument = () =>
  useDocumentStore((state) => state.deleteDocument);
export const useUpdateDocument = () =>
  useDocumentStore((state) => state.updateDocument);
