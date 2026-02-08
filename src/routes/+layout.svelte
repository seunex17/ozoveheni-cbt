<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  import "../app.css";
  import { Toaster, toast } from "svelte-sonner";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

{@render children()}

<Toaster position="bottom-center" richColors />
