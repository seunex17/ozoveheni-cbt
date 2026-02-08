import appConfig from "$lib/configs/app-config";
import { examState } from "$lib/states/exam-states.svelte";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  if (examState.studentID === 0) {
    redirect(302, "/auth/login");
  }

  let student = examState.student;

  const response = await fetch(
    `${appConfig.base_url}load-questions/${student.department_id}/${student.set}/${examState.attemptD}`,
  );

  if (!response.ok) {
    redirect(302, "/auth/login");
  }

  const data = await response.json();

  return { output: data };
}) satisfies PageLoad;
