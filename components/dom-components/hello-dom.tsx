"use dom";
import "./styles.css";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";

import EditorTheme from "./themes/EditorTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";

import { $getRoot, EditorState, LexicalEditor } from "lexical";

const placeholder = "";

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [ListNode, ListItemNode],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: EditorTheme,
};
export default function Editor({
  setPlainText,
  setEditorState,
}: {
  setPlainText: React.Dispatch<React.SetStateAction<string>>;
  setEditorState: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">

          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  aria-placeholder={placeholder}
                  placeholder={
                    <div className="editor-placeholder">{placeholder}</div>
                  }
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin
              onChange={(editorState, editor, tags) => {
                editorState.read(() => {
                  const root = $getRoot();
                  const textContent = root.getTextContent();
                  setPlainText(textContent);
                });
                setEditorState(JSON.stringify(editorState.toJSON()));
              }}
              ignoreHistoryMergeTagChange
              ignoreSelectionChange
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CheckListPlugin />
            {/* <TreeViewPlugin /> */}
          </div>

          <ToolbarPlugin />
        </div>
      </LexicalComposer>
    </>
  );
}
