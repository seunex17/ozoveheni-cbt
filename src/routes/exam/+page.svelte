<script lang="ts">
  import NumberFlow from "./../../../node_modules/@number-flow/svelte/dist/NumberFlow.svelte";
  import ExamLayout from "$lib/components/layouts/ExamLayout.svelte";
  import type { PageData } from "./$types";
  import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-svelte";
  import { examState } from "$lib/states/exam-states.svelte";
  import { goto } from "$app/navigation";

  let { data }: { data: PageData } = $props();

  let options = new Array(4);
  let submitExamModal: HTMLDialogElement;

  const submitExam = () => {
    goto("/exam-summery");
  };

  $effect(() => {
    if (examState.showSubmitModal) {
      submitExamModal.showModal();
    } else {
      submitExamModal.close();
    }
  });
</script>

<ExamLayout>
  <div
    class="card w-full h-full flex flex-col bg-base-100 shadow-xl shadow-base-200/50 p-6"
  >
    <div class="card-title">
      <div class="w-full flex justify-between items-center">
        <h2 class="text-xl font-bold text-slate-900">
          Question <span id="currentQuestionNum"
            ><NumberFlow value={1} />
          </span> of 50
        </h2>
      </div>
    </div>
    <div class="divider my-0"></div>
    <div class="card-body grow overflow-auto">
      <!-- Question Text -->
      <div class="mb-8">
        <p class="text-lg text-slate-800 leading-relaxed" id="questionText">
          What is the derivative of the function f(x) = 3x² + 2x - 5?
        </p>
      </div>
      <!-- Options -->
      <div class="space-y-3" id="optionsContainer">
        {#each options as item}
          <label
            class="flex items-start p-4 border-2 border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all group"
          >
            <input type="radio" name="radio-4" class="radio radio-primary" />
            <span class="ml-3 text-slate-800 group-hover:text-slate-900"
              >f'(x) = 6x + 2</span
            >
          </label>
        {/each}
      </div>
    </div>
    <div class="divider"></div>
    <div class=" card-actions mt-auto w-full flex justify-between items-center">
      <button class="btn"> <ChevronLeft size="18" /> Previous</button>
      <button class="btn btn-primary">Next <ChevronRight size="18" /></button>
    </div>
  </div>
</ExamLayout>

<dialog bind:this={submitExamModal} class="modal">
  <div class="modal-box max-w-md ring-1 ring-primary">
    <div class="text-center mb-6">
      <div
        class="size-14 bg-warning/40 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <AlertCircle class="text-warning-content" size="24" />
      </div>
      <h3 class="text-2xl font-bold text-gray-800 mb-2">Submit Exam?</h3>
      <p class="text-gray-600 mb-4">
        Are you sure you want to submit your exam? You cannot make changes after
        submission.
      </p>
    </div>

    <div class="bg-gray-50 rounded-lg p-4 mb-6">
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">Answered:</span>
          <span id="modalAnsweredCount" class="font-semibold text-green-600"
            >0</span
          >
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Skipped:</span>
          <span id="modalSkippedCount" class="font-semibold text-yellow-600"
            >0</span
          >
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Not Answered:</span>
          <span id="modalNotAnsweredCount" class="font-semibold text-red-600"
            >50</span
          >
        </div>
      </div>
    </div>
    <div class="w-full flex space-x-3">
      <div class="w-full">
        <button
          onclick={() => (examState.showSubmitModal = false)}
          class="btn btn-block">Close</button
        >
      </div>
      <div class="w-full">
        <button onclick={submitExam} class="btn btn-success btn-block"
          >Submit</button
        >
      </div>
    </div>
  </div>
</dialog>
