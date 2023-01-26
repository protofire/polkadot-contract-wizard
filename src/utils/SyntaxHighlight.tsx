import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// ==============================|| CODE HIGHLIGHTER ||============================== //

export default function SyntaxHighlight({
  children,
  ...others
}: {
  children: string | string[];
}) {
  return (
    <SyntaxHighlighter language="javacript" showLineNumbers {...others}>
      {children}
    </SyntaxHighlighter>
  );
}
