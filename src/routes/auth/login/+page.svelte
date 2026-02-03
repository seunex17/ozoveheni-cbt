<script lang="ts">
  import type { PageData } from "./$types";
  import { Lock, User } from "lucide-svelte";

  let { data }: { data: PageData } = $props();
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
      <form action="" class="space-y-5">
        <div>
          <label for="id" class="input">
            <User class="opacity-50" />
            <input type="text" placeholder="Student ID" />
          </label>
        </div>
        <div>
          <label for="cource_code" class="input">
            <Lock class="opacity-50" />
            <input type="text" placeholder="Course Code" />
          </label>
        </div>
        <div>
          <button class="btn btn-primary btn-block">Login</button>
        </div>
      </form>
    </div>
  </div>
</main>
