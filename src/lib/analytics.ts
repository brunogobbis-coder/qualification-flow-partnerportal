import type { Objective, QualificationData } from '@/types/qualification';

// Analytics event types
export type AnalyticsEvent =
  | { type: 'page_view'; page: string }
  | { type: 'step_started'; step: string; objective?: Objective }
  | { type: 'step_completed'; step: string; objective?: Objective }
  | { type: 'objective_selected'; objective: Objective }
  | { type: 'track_changed'; from: Objective; to: Objective }
  | { type: 'form_submitted'; objective: Objective; status: string }
  | { type: 'form_abandoned'; step: string; objective?: Objective }
  | { type: 'merchant_redirect'; redirectedToService: boolean }
  | { type: 'high_potential_flagged'; objective: Objective }
  | { type: 'error'; message: string; step: string };

// Analytics tracker class
class AnalyticsTracker {
  private sessionId: string;
  private events: Array<AnalyticsEvent & { timestamp: number }> = [];
  private startTime: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Track an event
  track(event: AnalyticsEvent): void {
    const timestampedEvent = {
      ...event,
      timestamp: Date.now(),
    };
    
    this.events.push(timestampedEvent);
    
    // In production, send to analytics service
    console.log('[Analytics]', {
      sessionId: this.sessionId,
      ...timestampedEvent,
    });
  }

  // Get session duration
  getSessionDuration(): number {
    return Date.now() - this.startTime;
  }

  // Get all events
  getEvents(): Array<AnalyticsEvent & { timestamp: number }> {
    return [...this.events];
  }

  // Calculate metrics
  getMetrics(): SessionMetrics {
    const objectiveEvent = this.events.find(
      (e) => e.type === 'objective_selected'
    ) as { type: 'objective_selected'; objective: Objective } | undefined;

    const submissionEvent = this.events.find(
      (e) => e.type === 'form_submitted'
    ) as { type: 'form_submitted'; objective: Objective; status: string } | undefined;

    const trackChangeEvents = this.events.filter(
      (e) => e.type === 'track_changed'
    );

    const stepCompletedEvents = this.events.filter(
      (e) => e.type === 'step_completed'
    );

    const merchantRedirectEvent = this.events.find(
      (e) => e.type === 'merchant_redirect'
    ) as { type: 'merchant_redirect'; redirectedToService: boolean } | undefined;

    return {
      sessionId: this.sessionId,
      sessionDuration: this.getSessionDuration(),
      initialObjective: objectiveEvent?.objective,
      finalObjective: submissionEvent?.objective,
      completed: !!submissionEvent,
      stepsCompleted: stepCompletedEvents.length,
      trackChanges: trackChangeEvents.length,
      wasMerchantRedirect: !!merchantRedirectEvent,
      merchantConvertedToPartner: merchantRedirectEvent?.redirectedToService ?? false,
    };
  }

  // Reset tracker (for new session)
  reset(): void {
    this.sessionId = this.generateSessionId();
    this.events = [];
    this.startTime = Date.now();
  }
}

// Session metrics interface
export interface SessionMetrics {
  sessionId: string;
  sessionDuration: number;
  initialObjective?: Objective;
  finalObjective?: Objective;
  completed: boolean;
  stepsCompleted: number;
  trackChanges: number;
  wasMerchantRedirect: boolean;
  merchantConvertedToPartner: boolean;
}

// Aggregated metrics for dashboard
export interface AggregatedMetrics {
  conversionRate: number; // % of landing page visitors who complete a form
  correctRoutingRate: number; // % of applicants who don't need to switch tracks
  merchantRedirectRate: number; // % identified as merchants
  timeToApproval: number; // Average days from submission to decision
  onboardingCompletionRate: number; // % who complete onboarding steps by track
  partnerActivationRate: number; // % who become active within 90 days
}

// Metric descriptions for documentation
export const metricDescriptions = {
  conversionRate: {
    name: 'Conversion Rate',
    description: '% of landing page visitors who complete a form',
    target: '>= 15%',
    calculation: 'completedForms / landingPageVisitors * 100',
  },
  correctRoutingRate: {
    name: 'Correct Routing Rate',
    description: "% of applicants who don't need to switch tracks later",
    target: '>= 95%',
    calculation: '(totalApplicants - trackChanges) / totalApplicants * 100',
  },
  merchantRedirectRate: {
    name: 'Merchant Redirect Rate',
    description: '% identified as merchants (should decrease over time with clearer messaging)',
    target: '<= 5%',
    calculation: 'merchantRedirects / totalVisitors * 100',
  },
  timeToApproval: {
    name: 'Time to Approval',
    description: 'Average days from submission to decision',
    target: '<= 3 days for affiliates (auto), <= 7 days for others',
    calculation: 'avg(approvalDate - submissionDate)',
  },
  onboardingCompletionRate: {
    name: 'Onboarding Completion Rate',
    description: '% who complete onboarding steps by track',
    target: '>= 80%',
    calculation: 'completedOnboarding / approvedPartners * 100',
  },
  partnerActivationRate: {
    name: 'Partner Activation Rate',
    description: '% who become active within 90 days',
    target: '>= 60%',
    calculation: 'activePartners90d / approvedPartners * 100',
  },
};

// Singleton instance
export const analytics = new AnalyticsTracker();

// Helper functions for common tracking scenarios
export function trackStepChange(from: string, to: string, objective?: Objective): void {
  analytics.track({ type: 'step_completed', step: from, objective });
  analytics.track({ type: 'step_started', step: to, objective });
}

export function trackObjectiveSelection(objective: Objective): void {
  analytics.track({ type: 'objective_selected', objective });
}

export function trackFormSubmission(data: QualificationData, status: string): void {
  analytics.track({
    type: 'form_submitted',
    objective: data.objective,
    status,
  });

  // Check for high potential
  if (data.objective === 'affiliate' && data.affiliateData?.audienceSize === 'more_than_100k') {
    analytics.track({ type: 'high_potential_flagged', objective: 'affiliate' });
  }
  if (data.objective === 'tech_partner' && data.techPartnerData?.companySize === 'more_than_200') {
    analytics.track({ type: 'high_potential_flagged', objective: 'tech_partner' });
  }
}

export function trackMerchantRedirect(convertedToService: boolean): void {
  analytics.track({
    type: 'merchant_redirect',
    redirectedToService: convertedToService,
  });
}

export function trackError(message: string, step: string): void {
  analytics.track({ type: 'error', message, step });
}
