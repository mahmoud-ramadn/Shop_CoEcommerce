
export const useProductsByCategories = async (catgeory:string) => {
  const { data, pending, error, refresh } = await useAPI<{ data: TProduct[] }>(`products/category/${catgeory}`,
    {
      server: true,
      lazy: true,
      immediate: true,
    }
  );
  return { productByCatories:data.value?.products  as TProduct[], pending, error, refresh };
};

