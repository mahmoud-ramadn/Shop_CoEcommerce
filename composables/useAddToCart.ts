// composables/useCart.ts

interface CartItem extends TProduct {
  quantity: number;
}

export default () => {
  const cart = useState<CartItem[]>("cart", () => {
    if (process.client) {
      const savedCart = localStorage.getItem("nuxt-cart");
      return savedCart ? (JSON.parse(savedCart) as CartItem[]) : [];
    }
    return [];
  });

  const addToCart = (product: TProduct): void => {
    const existingItem = cart.value.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }

    saveCartToLocalStorage();
  };

  const removeFromCart = (productId: number | string): void => {
    cart.value = cart.value.filter((item) => item.id !== productId);
    saveCartToLocalStorage();
  };

  const updateQuantity = (
    productId: number | string,
    newQuantity: number
  ): void => {
    const item = cart.value.find((item) => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      }
    }
    saveCartToLocalStorage();
  };

  const saveCartToLocalStorage = (): void => {
    if (process.client) {
      localStorage.setItem("nuxt-cart", JSON.stringify(cart.value));
    }
  };

  const totalItems = computed<number>(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  return {
    cart: readonly(cart), // Make cart read-only to prevent direct modifications
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
  };
};
