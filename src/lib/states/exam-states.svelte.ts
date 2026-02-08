export const examState = $state<{
  showSubmitModal: boolean;
  answers: Record<string, number>;
  currentIndex: number;
  studentID: number;
  student: any;
  attemptD?: number | undefined;
}>({
  showSubmitModal: false,
  answers: {},
  currentIndex: 0,
  studentID: 0,
  student: {},
  attemptD: undefined,
});
