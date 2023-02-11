import { UseFetchOptions } from 'nuxt/dist/app/composables'

/**
 * Performs an authenticated fetch of an API endpoint
 */
export function useAuthenticatedFetch(request: any, options: UseFetchOptions<any> = {}) {
  const headers = useRequestHeaders(['cookie']) as HeadersInit
  options.headers = { ...options.headers, ...headers }

  return useFetch(request, options)
}
