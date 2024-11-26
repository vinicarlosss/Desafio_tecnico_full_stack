import { toast } from "react-toastify";

export function useNotify(){

    const notify = (text: string) => {
        toast.dismiss();
        toast(text);
    };
    return {
        notify,
    };
};
