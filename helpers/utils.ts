import { ColorListMap } from "@/types/constants";

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const [month, day] = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
    .format(date)
    .split(' ');

  return { month, day };
};

export const setRandomColor = (): keyof typeof ColorListMap => {
  const colorKeys = Object.keys(ColorListMap) as (keyof typeof ColorListMap)[];
  return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

export const isColorKey = (color: string): color is keyof typeof ColorListMap => {
  return Object.keys(ColorListMap).includes(color);
}

export const convertLexicalToHtml = (lexicalJson: string): string => {
  try {
    const parsed = JSON.parse(lexicalJson);
    const children = parsed.root.children || [];

    return children.map((block: any) => {
      if (block.type === 'paragraph') {
        return `<p>${block.children
          .map((child: any) => {
            let formattedText = child.text;
            if (child.format === 1) formattedText = `<b>${formattedText}</b>`; // Bold
            return formattedText;
          })
          .join(' ')}</p>`;
      }
      return '';
    }).join('');
  } catch (error) {
    console.error('Error parsing Lexical JSON:', error);
    return '<p>Error loading note</p>';
  }
};
