import type { string } from "yup";

export const useProducts = async () => {
  const { data,pending,error ,refresh} = await useAPI<{data : TProduct[]}>("/products", {
    server: true,
    lazy: false,
    immediate:true
  });
  return { product:data.value?.products as TProduct[],pending,error,refresh };
};



export const useSingleProduct = (id: number) => {
  const { data, error, pending } = useAPI<TProduct>(`/products/${id}`,
    {
      server:false,
      lazy:true,
      immediate:true,
    }
  );
  return {data,
    error,
    pending,
  };
};

// composables/useSearchProduct.ts
// composables/useSearchProduct.ts
export const useSearchProduct = (query: Ref<string>) => {
  const abortController = ref<AbortController | null>(null);
  const minQueryLength = 3;
  
  const { data, pending, error, refresh } = useFetch<{ products: TProduct[] }>(
    'https://dummyjson.com/products/search',
    {
      server: false,
      lazy: true,
      immediate: false,
      query: {
        q: query
      },
      async beforeFetch({ options, cancel }) {
        // Cancel previous request if exists
        if (abortController.value) {
          abortController.value.abort();
        }
        
        // Create new abort controller
        abortController.value = new AbortController();
        options.signal = abortController.value.signal;
        
        // Skip if query is too short
        if (query.value.trim().length < minQueryLength && query.value.trim().length > 0) {
          cancel();
        }
      },
      transform: (response) => {
        return response.products || [];
      },
      onFetchError: (ctx) => {
        // Ignore abort errors
        if (ctx.error.name === 'AbortError') {
          ctx.error = null;
        }
        return ctx;
      }
    }
  );

  watch(query, (newQuery) => {
    if (newQuery.trim()) {
      refresh();
    } else {
      data.value = [];
    }
  });

  return { 
    searchResults: computed(() => data.value || []), 
    isSearching: pending, 
    error 
  };
};