"use client";
import { PropsWithChildren, useState } from "react";
import { useCreateStore } from "@/hooks/queries/stores/useCreateStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { IStoreCreate } from "@/shared/types/store.interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form-elements/Form";
import { Input } from "@/components/ui/form-elements/Input";
import { Button } from '@/components/ui/Button'

export function CreateStoreModal({ children }: PropsWithChildren<unknown>) {
  const [isOpen, setIsOpen] = useState(false);

  const { createStore, isLoadingCreate } = useCreateStore();

  const form = useForm<IStoreCreate>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IStoreCreate> = (data) => {
    createStore(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>To create store</DialogTitle>
          <DialogDescription>Please, add store name</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "The title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      type="text"
                      disabled={isLoadingCreate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end'>
              <Button className='cursor-pointer' variant='primary' disabled={isLoadingCreate}>To Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
