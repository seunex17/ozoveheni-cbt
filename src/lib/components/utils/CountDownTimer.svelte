<script lang="ts">
  let {
    durationSeconds = 60,
    onTimeUp,
  }: { durationSeconds: number; onTimeUp?: () => void } = $props();
  import NumberFlow from "@number-flow/svelte";

  let remaining = $state(durationSeconds);

  // Calculate percentage for DaisyUI (0 to 100)
  let percentage = $derived(Math.round((remaining / durationSeconds) * 100));

  let minutes = $derived(Math.floor(remaining / 60));
  let seconds = $derived(remaining % 60);

  $effect(() => {
    console.log(percentage);

    const interval = setInterval(() => {
      if (remaining > 0) {
        remaining -= 1;
      } else {
        clearInterval(interval);
        onTimeUp?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<div
  class="radial-progress bg-primary text-primary-content border-primary border-4"
  style="--value:{percentage}; --size:10rem; --thickness: 12px;"
  role="progressbar"
>
  <div class="flex flex-col items-center">
    <span class="text-3xl font-mono font-bold tabular-nums">
      <NumberFlow
        value={minutes}
        format={{ minimumIntegerDigits: 2 }}
      />:<NumberFlow value={seconds} format={{ minimumIntegerDigits: 2 }} />
    </span>
    <span class="text-xs opacity-70 font-bold uppercase">Remaining</span>
  </div>
</div>

<style>
  /* Optional: Smooth the transition so the bar doesn't "jump" every second */
  .radial-progress {
    transition: --value 1s linear;
  }
</style>
