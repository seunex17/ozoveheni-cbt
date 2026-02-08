<script lang="ts">
  import { examState } from "$lib/states/exam-states.svelte";

  let { questions } = $props();

  // Logic for the color of the navigation buttons
  const getButtonClass = (index: number, questionId: any) => {
    if (examState.currentIndex === index) return "btn-info";
    if (examState.answers[questionId]) return "btn-success";
    return "bg-base-300";
  };
</script>

<div
  class="bg-base-100 rounded-2xl shadow-lg w-full h-full flex flex-col shadow-base-200/50 p-6"
>
  <div>
    <h3 class="text-lg font-bold text-slate-900 mb-4">Question Navigator</h3>
    <div class="mb-4 space-y-2 text-sm">
      <div class="flex items-center space-x-2">
        <div class="w-6 h-6 bg-info rounded"></div>
        <span class="text-slate-600">Current</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-6 h-6 bg-success rounded"></div>
        <span class="text-slate-600">Answered</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-6 h-6 bg-base-300 rounded"></div>
        <span class="text-slate-600">Unanswered</span>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- Question Grid -->
  <div class="grid grid-cols-5 gap-2 grow overflow-y-auto scrollbar-hide">
    {#each questions as question, i}
      <button
        onclick={() => (examState.currentIndex = i)}
        class="btn btn-square transition-all hover:scale-105 focus:ring-2 focus:ring-base-200 {getButtonClass(
          i,
          question.id,
        )}">{i + 1}</button
      >
    {/each}
  </div>
</div>
