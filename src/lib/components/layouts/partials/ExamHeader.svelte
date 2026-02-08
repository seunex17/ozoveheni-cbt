<script lang="ts">
  import { examState } from "$lib/states/exam-states.svelte";
  import { Newspaper } from "lucide-svelte";

  let { exam } = $props();
</script>

<div class="bg-base-100 border-b border-base-200 sticky top-0 z-50 shadow-sm">
  <div class="container mx-auto">
    <div class="w-full px-8 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"
          >
            <Newspaper class="text-primary-content" size="18" />
          </div>
          <div>
            <h1 class="text-lg font-bold">{exam.course.name}</h1>
            <p class="text-sm text-slate-600">{exam.course.code}</p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Submit Button -->
          <button
            onclick={() => (examState.showSubmitModal = true)}
            class="btn btn-primary"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
