export interface OnCallbacks<I> {
  onStartCallback?: () => void
  onSuccessCallback?: (result: I) => void
  onErrorCallback?: (e: unknown) => void
}
