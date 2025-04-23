
export const useProductsByCategories = async (catgeory:string) => {
  const { data, pending, error, refresh } = await useAPI<{ data: TProduct[] }>(`products/category/${catgeory}`,
    {
      server: false,
      lazy: false,
      immediate: true,
    }
  );
  return { productByCatories:data.value?.products  as TProduct[], pending, error, refresh };
};

