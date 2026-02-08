<script lang="ts">
  import { goto } from "$app/navigation";
  import appConfig from "$lib/configs/app-config";
  import { toast } from "svelte-sonner";
  import type { PageData } from "./$types";
  import { GraduationCap, Loader, Lock, User } from "lucide-svelte";
  import { examState } from "$lib/states/exam-states.svelte";

  let { data }: { data: PageData } = $props();

  let regNo = $state("");
  let isLoading: boolean = $state(false);

  // Functions
  const login = async () => {
    isLoading = true;
    const resp = await fetch(`${appConfig.base_url}student-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ reg_no: regNo }),
    });

    const data = await resp.json();

    if (data.type === "error") {
      toast.error(data.message);
    }

    if (data.type === "start") {
      examState.studentID = data.student.id;
      examState.student = data.student;
      examState.attemptD = data.attempt_id;

      goto("/exam");
    }

    isLoading = false;
  };
</script>

<main class="w-screen h-screen flex flex-col justify-center items-center">
  <div
    class="w-full max-w-md flex flex-col justify-center items-center space-y-2"
  >
    <div>
      <img src="/images/logo.jpg" class="w-20" alt="" />
    </div>
    <h1 class="text-3xl font-bold text-slate-900">CBT Platform</h1>
    <p class="text-slate-600">Sign in to access your exams</p>
  </div>
  <div class="card w-96 bg-base-100 shadow-sm">
    <div class="card-body">
      <form class="space-y-5">
        <div>
          <label for="id" class="input">
            <GraduationCap class="opacity-50" />
            <input
              type="text"
              bind:value={regNo}
              placeholder="Registration No"
            />
          </label>
        </div>
        <div>
          <button
            type="button"
            onclick={login}
            disabled={!regNo || isLoading}
            class="btn btn-primary btn-block"
          >
            {#if isLoading}
              <span class="animate-spin">
                <Loader size="18" />
              </span>
              Please Wait...
            {:else}
              Login
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
</main>
