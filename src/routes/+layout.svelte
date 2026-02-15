<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  import "../app.css";
  import { Toaster, toast } from "svelte-sonner";
  import { echo } from "$lib/echo";
  import { exit } from "@tauri-apps/plugin-process";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  onMount(() => {
    const handleKeydown = (e: any) => {
      const isInput =
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable;

      if (e.key === "Backspace" && !isInput) {
        e.preventDefault();
      }
      if (
        (e.ctrlKey && e.key === "r") ||
        e.key === "F5" ||
        (e.altKey && e.key === "ArrowLeft")
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  onMount(() => {
    if (echo) {
      echo
        .channel("close-exam-hall")
        .listen("CloseExamHallEvent", async (e) => {
          console.log(e);
          await exit(0);
        });
    }
  });
</script>

{@render children()}

<Toaster position="bottom-center" richColors />
