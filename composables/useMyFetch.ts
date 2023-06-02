export const useMyFetch: typeof useFetch = (request, opts?) => {
  const { baseURL } = useRuntimeConfig().public

  return useFetch(request, { baseURL, ...opts })
}
