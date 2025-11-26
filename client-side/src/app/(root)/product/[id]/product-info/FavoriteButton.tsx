import { IProduct } from "@/shared/types/product.interface";
import { useProfile } from "@/hooks/useProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { Button } from "@/components/ui/Button";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface FavoriteButtonProps {
  product: IProduct;
}

export function FavoriteButton({ product }: FavoriteButtonProps) {
  const { user } = useProfile();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["toggle favorites"],
    mutationFn: () => userService.toggleFavorite(product.id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });

  if (!user) return null;

  const isExist = user.favorites.some((favorite) => favorite.id === product.id);

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => mutate()}
      disabled={isPending}
    >
      {isExist ? (
        <AiFillHeart color="#F43F5E" className="size-5" />
      ) : (
        <AiOutlineHeart className="size-5" />
      )}
    </Button>
  );
}
