import "./EditorTheme.css";

const exampleTheme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
  list: {
    listitem: "EditorTheme__listItem",
    listitemChecked: "EditorTheme__listItemChecked",
    listitemUnchecked: "EditorTheme__listItemUnchecked",
    nested: {
      listitem: "EditorTheme__nestedListItem"
    },
    olDepth: [
      "EditorTheme__ol1",
      "EditorTheme__ol2",
      "EditorTheme__ol3",
      "EditorTheme__ol4",
      "EditorTheme__ol5"
    ],
    ul: "EditorTheme__ul"
  }
};

export default exampleTheme;
