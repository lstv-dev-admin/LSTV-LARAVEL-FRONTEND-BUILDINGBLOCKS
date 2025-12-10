import { useMutation } from "@tanstack/react-query"
import { userApi } from "@features/utilities/user-files/api"
import { queryClient } from "@/config/reactQueryClient";
import { UserFormData } from "../../schema";

export const useUpdateUserMutation = () => {
    return useMutation({
        mutationFn: ({
            id,
            payload
        }: {
            id: number,
            payload: UserFormData;
        }) => userApi.updateUser(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-list"] });

            // ✅ Option 2 (optional optimization): update specific cached user manually
            // queryClient.setQueryData(["user-list"], (oldData: any) => {
            //   if (!oldData) return oldData;
            //   return {
            //     ...oldData,
            //     items: oldData.items.map((user) =>
            //       user.id === id ? { ...user, ...payload } : user
            //     ),
            //   };
            // });
        },
        onError: (error) => {
            console.error(error);
        }
    });
};