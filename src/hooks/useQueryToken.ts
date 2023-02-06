import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { isOfTypeTokens, TokenType } from '@types';

const DEFAULT_TOKEN: TokenType = 'psp22';
const KEY_NAME = 'token';

export function useQueryToken() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let tokenSelected = DEFAULT_TOKEN;
  const value = searchParams.get(KEY_NAME);
  if (isOfTypeTokens(value)) {
    tokenSelected = value;
  }

  function setTokenType(value: TokenType) {
    const params = new URLSearchParams(searchParams);
    params.set(KEY_NAME, value);
    router.replace(`${pathname}?${params}`);
  }

  return { tokenSelected, setTokenType, };
}
