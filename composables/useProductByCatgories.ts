
export const useProductsByCategories = async (catgeory: string, AllCatgories: string[],) => {
  const { data, pending, error, refresh } = await useAPI<{ data: TProduct[] }>(`products/category/${catgeory}`,
    {
      server: true,
      immediate: true,
    }
  );
  return { productByCatories:data.value?.products  as TProduct[], pending, error, refresh };
};

