
export const useProducts = async () => {
  const { data,pending,error ,refresh} = await useAPI<{data : TProduct[]}>("/products", {
    server: false,
    lazy: true,
    immediate:true,
  });
  return { data,pending,error,refresh };
};



// export const useSingleArticles = async (id: number) => {
//   const { data } = await useAPI<{ data: TArticle }>(`articles/${id}`, {
//     server: true,
//     lazy: true,
//   });
//   return { data };
// };
// export const useDefferntsArticles = async () => {
//   const { data } = await useAPI<{ data: TArticle[] }>(`articles/random`, {
//     server: true,
//     lazy: true,
//   });
//   return { data };
// };
