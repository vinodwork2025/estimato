type EventName =
  | "planner_started"
  | "planner_step_completed"
  | "planner_abandoned"
  | "planner_completed"
  | "result_viewed"
  | "scenario_compared"
  | "pdf_form_opened"
  | "pdf_form_submitted"
  | "partner_card_clicked"
  | "whatsapp_cta_clicked"
  | "optional_addition_toggled"
  | "architect_intro_requested";

type EventProps = Record<string, string | number | boolean>;

export function track(event: EventName, props?: EventProps): void {
  if (typeof window === "undefined") return;
  (window as unknown as { plausible?: (e: string, opts?: { props?: EventProps }) => void }).plausible?.(event, { props });
}
