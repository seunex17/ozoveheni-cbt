<script lang="ts">
  import { examState } from "$lib/states/exam-states.svelte";

  // your script goes here
</script>

<div
  class="card w-full h-full flex flex-col bg-base-100 shadow-lg shadow-base-200/50 p-6"
>
  <div class="avatar flex justify-center">
    <div
      class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg"
    >
      <img src="/images/student.png" alt="Student Passport" />
    </div>
  </div>

  <div class="card-body items-center text-center pt-2">
    <h2 class="card-title text-xl font-bold">John Doe</h2>
    <p class="text-xm text-gray-500 uppercase tracking-tight">Student ID</p>

    <div class="divider my-0"></div>

    <div class="bg-base-200 w-full rounded-lg p-3 flex flex-col gap-1">
      <span class="text-[10px] font-bold opacity-60 uppercase text-center"
        >Exam Session Verified</span
      >
      <div class="flex justify-between text-xs">
        <span>Session:</span>
        <span class="font-semibold">Harmattan 2026</span>
      </div>
    </div>

    <div class="divider my-0"></div>

    <div class="card-actions mt-auto w-full">
      <button
        onclick={() => (examState.showSubmitModal = true)}
        class="btn btn-primary btn-outline btn-block">Submit Exam</button
      >
    </div>
  </div>
</div>
