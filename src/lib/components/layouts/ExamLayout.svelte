<script lang="ts">
  import type { Snippet } from "svelte";
  import CountDownTimer from "../utils/CountDownTimer.svelte";
  import StudentCard from "../utils/StudentCard.svelte";
  import ExamHeader from "./partials/ExamHeader.svelte";
  import ExamQuestionsNav from "./partials/ExamQuestionsNav.svelte";

  let {
    children,
    exam,
    questions,
    onTimeUp,
  }: { children: Snippet; exam: any; questions: any; onTimeUp?: () => void } =
    $props();
</script>

<div class="w-screen h-screen bg-base-200 flex flex-col overflow-hidden">
  <ExamHeader {exam} />
  <div class="grow container mx-auto px-6 py-8 overflow-hidden">
    <div class="flex gap-6 h-full">
      <div class="w-3/12">
        <ExamQuestionsNav {questions} />
      </div>
      <div class="w-6/12 h-full overflow-y-auto">
        {@render children()}
      </div>
      <div class="w-3/12 flex flex-col gap-3 h-full">
        <div class="card w-full bg-base-100 shadow-lg shadow-base-200/50 p-6">
          <div class="card-bod flex justify-center">
            <CountDownTimer durationSeconds={exam.duration * 60} {onTimeUp} />
          </div>
        </div>
        <div class="grow h-full">
          <StudentCard {exam} />
        </div>
      </div>
    </div>
  </div>
</div>
