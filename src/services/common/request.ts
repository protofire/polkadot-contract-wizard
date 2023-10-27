import { URL } from 'whatwg-url'

export async function request<TResponse>(
  url: string,
  config: RequestInit
): Promise<TResponse> {
  const response = await fetch(url, config)

  return await response.json()
}

export function createUrl(basePath: string, pathName: string): string {
  const _url = new URL(pathName, basePath)
  return _url.toString()
}

export function createSuffix(key: string, value?: string | number): string {
  if (!value) return ''
  return `&${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`
}
