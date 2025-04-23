
export const useProducts = async () => {
  const { data,pending,error ,refresh} = await useAPI<{data : TProduct[]}>("/products", {
    server: true,
    lazy: false,
    immediate:true,
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

// export const useDefferntsArticles = async () => {
//   const { data } = await useAPI<{ data: TArticle[] }>(`articles/random`, {
//     server: true,
//     lazy: true,
//   });
//   return { data };
// };
