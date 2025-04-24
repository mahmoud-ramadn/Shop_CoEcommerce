export const useAddToCart = () => {
  const CartData = useState<TProduct[]>("productsData", () => []);

  const setProductData = (data: TProduct[]) => {
    CartData.value = data;
  };

  const removeFromCart = (productId: number | string) => {
    CartData.value = CartData.value.filter((item) => item.id !== productId);
  };

  onMounted(() => {
    const stored = localStorage.getItem("cart-products");
    if (stored) {
      CartData.value = JSON.parse(stored);
    }
  });

  watch(
    CartData,
    (newCart) => {
      if (process.client) {
        localStorage.setItem("cart-products", JSON.stringify(newCart));
      }
    },
    { deep: true }
  );

  return {
    CartData,
    setProductData,
    removeFromCart,
  };
};
