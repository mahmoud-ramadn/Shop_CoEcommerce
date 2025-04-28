// composables/useToast.ts
export const useToast = () => {
  const toastMessage = ref("");
  const showToast = ref(false);
  const toastType = ref<"success" | "error">("success");

  const triggerToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  };

  return {
    toastMessage,
    showToast,
    toastType,
    triggerToast,
  };
};
