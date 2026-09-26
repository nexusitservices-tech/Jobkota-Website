import * as React from "react";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
}

type ToastAction =
  | { type: "ADD_TOAST"; toast: ToastProps }
  | { type: "DISMISS_TOAST"; toastId: string };

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const listeners: Array<(state: ToastProps[]) => void> = [];
let memoryState: ToastProps[] = [];

function dispatch(action: ToastAction) {
  if (action.type === "ADD_TOAST") {
    memoryState = [action.toast, ...memoryState].slice(0, 5);
  } else if (action.type === "DISMISS_TOAST") {
    memoryState = memoryState.filter((t) => t.id !== action.toastId);
  }
  listeners.forEach((listener) => listener(memoryState));
}

export function toast({
  title,
  description,
  variant = "default",
}: Omit<ToastProps, "id">) {
  const id = genId();
  const newToast: ToastProps = { id, title, description, variant };
  dispatch({ type: "ADD_TOAST", toast: newToast });

  const timeout = setTimeout(() => {
    dispatch({ type: "DISMISS_TOAST", toastId: id });
  }, 4000);
  toastTimeouts.set(id, timeout);

  return {
    id,
    dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
  };
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>(memoryState);

  React.useEffect(() => {
    listeners.push(setToasts);
    return () => {
      const index = listeners.indexOf(setToasts);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    toasts,
    toast,
    dismiss: (id: string) => dispatch({ type: "DISMISS_TOAST", toastId: id }),
  };
}
