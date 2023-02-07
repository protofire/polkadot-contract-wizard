const tokenTypes = ['psp22', 'psp34', 'psp37'] as const;
export type TokenType = (typeof tokenTypes)[number];

export function isOfTypeTokens(value: string | null): value is TokenType {
  if (!value) return false;
    
  return (tokenTypes as readonly string[]).includes(value);
}

 