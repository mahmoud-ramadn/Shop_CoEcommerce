// composables/useNetworkStatus.ts
import { ref, onMounted, onBeforeUnmount } from "vue";

type ToastType = "success" | "error" | "";

export default function useNetworkStatus() {
  const isOnline = ref(true); // Default to true
  const showToast = ref(false);
  const toastMessage = ref("");
  const toastType = ref<ToastType>("");

  const updateNetworkStatus = () => {
    // Check if running in browser
    if (typeof window === "undefined") return;

    const wasOnline = isOnline.value;
    isOnline.value = navigator.onLine;

    // Only show toast if status changed
    if (wasOnline !== isOnline.value) {
      showToast.value = true;
      toastMessage.value = isOnline.value
        ? "Internet connection restored"
        : "Internet connection lost";
      toastType.value = isOnline.value ? "success" : "error";

      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    }
  };

  onMounted(() => {
    if (typeof window === "undefined") return;

    // Initial check
    updateNetworkStatus();

    // Setup event listeners
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
  });

  onBeforeUnmount(() => {
    if (typeof window === "undefined") return;
    window.removeEventListener("online", updateNetworkStatus);
    window.removeEventListener("offline", updateNetworkStatus);
  });

  return {
    isOnline,
    showToast,
    toastMessage,
    toastType,
  };
}
