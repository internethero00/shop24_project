import { ICartItem } from "@/shared/types/cart.interface";
import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";
import styles from "../HeaderCart.module.css";
import { Button } from "@/components/ui/Button";
import { Minus, Plus } from "lucide-react";

interface CartActionsProps {
  item: ICartItem;
}

export function CartActions({ item }: CartActionsProps) {
  const { changeQuantity } = useActions();

  const { items } = useCart();
  const quantity = items.find((cartItem) => cartItem.id === item.id)?.quantity;
  return (
    <div className={styles.actions}>
      <Button
        onClick={() => changeQuantity({ id: item.id, type: "minus" })}
        variant="ghost"
        size="icon"
        disabled={quantity === 1}
      >
        <Minus />
      </Button>
        <div className='text-center'>{quantity}</div>
      <Button
        onClick={() => changeQuantity({ id: item.id, type: "plus" })}
        variant="ghost"
        size="icon"
      >
        <Plus />
      </Button>
    </div>
  );
}
