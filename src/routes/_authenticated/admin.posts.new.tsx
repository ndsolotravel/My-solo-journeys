import { createFileRoute } from "@tanstack/react-router";
import { PostEditor } from "@/components/admin/PostEditor";

export const Route = createFileRoute("/_authenticated/admin/posts/new")({
});

export default function NewPostPage() {
  return <PostEditor asDialog={false} />;
}
