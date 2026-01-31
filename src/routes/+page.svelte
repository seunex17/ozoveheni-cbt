<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => {
      goto("/auth/login");
    }, 5000);
  });
</script>

<main class="flex flex-col w-full h-screen py-10">
  <div class="grow flex flex-col justify-center items-center">
    <div class="avatar">
      <div class="w-36 rounded-xl">
        <img src="/images/logo.jpg" alt="" />
      </div>
    </div>
  </div>
  <div class="w-full flex-col justify-center items-center">
    <div class="flex justify-center">
      <progress class="progress progress-primary w-56"></progress>
    </div>
  </div>
</main>
