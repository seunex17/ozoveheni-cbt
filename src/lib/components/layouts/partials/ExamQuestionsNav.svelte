<script lang="ts">
  let questions = new Array(50);
</script>

<div
  class="bg-base-100 rounded-2xl shadow-lg w-full h-full flex flex-col shadow-base-200/50 p-6"
>
  <div>
    <h3 class="text-lg font-bold text-slate-900 mb-4">Question Navigator</h3>
    <div class="mb-4 space-y-2 text-sm">
      <div class="flex items-center space-x-2">
        <div class="w-6 h-6 bg-indigo-600 rounded"></div>
        <span class="text-slate-600">Current</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-6 h-6 bg-green-500 rounded"></div>
        <span class="text-slate-600">Answered</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-6 h-6 bg-slate-200 rounded"></div>
        <span class="text-slate-600">Unanswered</span>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- Question Grid -->
  <div class="grid grid-cols-5 gap-2 grow overflow-y-auto scrollbar-hide">
    {#each questions as question, i}
      <button
        class="btn btn-square btn-base-300 transition-all hover:scale-105 focus:ring-2 focus:ring-base-200"
        >{i}</button
      >
    {/each}
  </div>
</div>
