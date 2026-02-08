<script lang="ts">
  import NumberFlow from "./../../../node_modules/@number-flow/svelte/dist/NumberFlow.svelte";
  import ExamLayout from "$lib/components/layouts/ExamLayout.svelte";
  import type { PageData } from "./$types";
  import {
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Loader,
  } from "lucide-svelte";
  import { examState } from "$lib/states/exam-states.svelte";
  import { goto } from "$app/navigation";
  import appConfig from "$lib/configs/app-config";

  let { data }: { data: PageData } = $props();

  let submitExamModal: HTMLDialogElement;
  let questions = data.output.questions;
  let currentQuestion = $derived(questions[examState.currentIndex]);
  let totalAnswered = $derived(Object.keys(examState.answers).length);
  let totalUnanswered = $derived(questions.length - totalAnswered);
  let saveTimeout: any;
  let isSaving: boolean = $state(false);
  let lastSaved = $state("");
  let attemptId = $state(examState.attemptD);
  let isSubmitting: boolean = $state(false);

  const submitExam = async () => {
    isSubmitting = true;

    setTimeout(async () => {
      try {
        await fetch(`${appConfig.base_url}submit-exam`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ attempt_id: attemptId }),
        });
        lastSaved = new Date().toLocaleTimeString();
      } catch (e) {
        console.error("Submit failed");
      } finally {
        isSubmitting = false;
        goto("/exam-summery");
        examState.showSubmitModal = false;
      }
    }, 6000);
  };

  const handleAnswer = (optionId: number) => {
    examState.answers[currentQuestion.id] = optionId;
  };

  const syncWithServer = async (data: any) => {
    if (Object.keys(data).length === 0) return;

    isSaving = true;
    try {
      await fetch(`${appConfig.base_url}save-answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: data, attempt_id: attemptId }),
      });
      lastSaved = new Date().toLocaleTimeString();
    } catch (e) {
      console.error("Auto-save failed");
    } finally {
      isSaving = false;
    }
  };

  $effect(() => {
    if (examState.showSubmitModal) {
      submitExamModal.showModal();
    } else {
      submitExamModal.close();
    }
  });

  $effect(() => {
    const data = $state.snapshot(examState.answers);

    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      syncWithServer(data);
    }, 5000);
  });
</script>

<ExamLayout exam={data.output.singleExam} questions={data.output.questions}>
  <div
    class="card w-full h-full flex flex-col bg-base-100 shadow-xl shadow-base-200/50 p-6"
  >
    <div class="card-title">
      <div class="w-full flex justify-between items-center">
        <h2 class="text-xl font-bold text-slate-900">
          Question <span id="currentQuestionNum"
            ><NumberFlow value={examState.currentIndex + 1} />
          </span>
          of {data.output.questions.length}
        </h2>
      </div>
    </div>
    <div class="divider my-0"></div>
    <div class="card-body grow overflow-auto scrollbar-hide">
      <!-- Question Text -->
      <div class="mb-8">
        <p class="text-lg text-slate-800 leading-relaxed" id="questionText">
          {questions[examState.currentIndex].question_text}
        </p>
      </div>
      <!-- Options -->
      <div class="space-y-3" id="optionsContainer">
        {#each questions[examState.currentIndex].options as option}
          <button
            onclick={() => handleAnswer(option.id)}
            class={{
              "flex items-start p-4 w-full border-2 rounded-xl cursor-pointer transition-all group": true,
              "hover:border-indigo-300 hover:bg-indigo-50/50 border-slate-200":
                examState.answers[currentQuestion.id] !== option.id,
              "border-indigo-300 bg-indigo-50/50":
                examState.answers[currentQuestion.id] === option.id,
            }}
          >
            <input
              type="radio"
              class="radio radio-primary"
              checked={examState.answers[currentQuestion.id] === option.id}
            />
            <span class="ml-3 text-slate-800 group-hover:text-slate-900"
              >{option.option_text}</span
            >
          </button>
        {/each}
      </div>
    </div>
    <div class="divider"></div>
    <div class=" card-actions mt-auto w-full flex justify-between items-center">
      <button
        onclick={() => examState.currentIndex--}
        class="btn"
        disabled={examState.currentIndex === 0}
      >
        <ChevronLeft size="18" /> Previous</button
      >
      <button
        onclick={() => examState.currentIndex++}
        class="btn btn-primary"
        disabled={examState.currentIndex === questions.length - 1}
        >Next <ChevronRight size="18" /></button
      >
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
          <span id="modalAnsweredCount" class="font-semibold text-success"
            >{totalAnswered}</span
          >
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Skipped:</span>
          <span id="modalSkippedCount" class="font-semibold text-warning"
            >{totalUnanswered}</span
          >
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Total Questions:</span>
          <span id="modalNotAnsweredCount" class="font-semibold text-primary"
            >{questions.length}</span
          >
        </div>
      </div>
    </div>
    <div class="w-full flex space-x-3">
      <div class="w-full">
        <button
          onclick={() => (examState.showSubmitModal = false)}
          disabled={isSubmitting}
          class="btn btn-block">Close</button
        >
      </div>
      <div class="w-full">
        <button
          onclick={submitExam}
          class="btn btn-success btn-block"
          disabled={isSubmitting}
        >
          {#if isSubmitting}
            <span class="animate-spin">
              <Loader size="18" />
            </span>
            Submitting...
          {:else}
            Submit
          {/if}
        </button>
      </div>
    </div>
  </div>
</dialog>
