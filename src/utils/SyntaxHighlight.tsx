import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

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
