<script lang="ts">
  import type { PageData } from "./$types";
  import { speak } from "tauri-plugin-tts-api";
  import { onMount } from "svelte";
  import { CheckCheck } from "lucide-svelte";

  let { data }: { data: PageData } = $props();

  onMount(async () => {
    try {
      await speak({
        text: "Your exam has been submitted successfully. Please quietly leave the hall. I wish you Good luck!",
        volume: 1.0,
        rate: 1.0,
        language: "en",
        pitch: 1.0,
        voiceId: "",
        queueMode: null,
      });
    } catch (err) {
      console.error("TTS failed:", err);
    }
  });
</script>

<main
  class="h-screen w-screen flex flex-col justify-center items-center bg-base-300"
>
  <div
    class="card w-full max-w-lg bg-base-100 shadow-xl shadow-base-200/50 p-6"
  >
    <div class="card-title w-full flex flex-col justify-center items-center">
      <div
        class="inline-flex items-center justify-center size-20 bg-success/40 rounded-full mb-3 animate-bounce"
      >
        <CheckCheck class="text-success-content" size="40" />
      </div>
      <div>
        <h1 class="text-2xl text-center font-bold mb-1">
          Exam Submitted Successfully!
        </h1>
        <p class="text-success text-center text-md">
          Your answers have been recorded
        </p>
      </div>
    </div>
    <div class="card-body">
      <div class="w-full p-4 bg-base-200">
        <div class="text-center mb-4">
          <h6 class="text-lg font-bold">Submission Details</h6>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <p class="text-sm text-gray-600 mb-1">Student Name</p>
            <p class="font-semibold">John Doe</p>
          </div>

          <div>
            <p class="text-sm text-gray-600 mb-1">Student ID</p>
            <p class="font-semibold">1234567890</p>
          </div>

          <div>
            <p class="text-sm text-gray-600 mb-1">Course</p>
            <p class="font-semibold">Mathematics</p>
          </div>

          <div>
            <p class="text-sm text-gray-600 mb-1">Submitted Time</p>
            <p class="font-semibold">Time Here</p>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-4 text-center">
        <div class="bg-success/40 rounded-xl p-3">
          <p class="text-2xl font-bold">44</p>
          <p class="text-sm">Answered</p>
        </div>
        <div class="bg-warning/40 rounded-xl p-3">
          <p class="text-2xl font-bold">6</p>
          <p class="text-sm">Skipped</p>
        </div>
        <div class="bg-base-200 rounded-xl p-3">
          <p class="text-2xl font-bold">50</p>
          <p class="text-sm">Un-answered</p>
        </div>
      </div>
    </div>
    <div class="card-action text-center">
      <p class="text-sm font-semibold">All done, please leave teh hall</p>
    </div>
  </div>
</main>
