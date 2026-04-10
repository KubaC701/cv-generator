# Acme Corp

**Role:** Senior Backend Engineer
**Dates:** January 2021 - present

## Overview

Acme Corp is a B2B SaaS platform serving 500+ enterprise clients. I lead backend development for the billing and subscription management domain within a cross-functional team of 6.

## Key Achievements

- Redesigned the subscription billing pipeline, reducing failed payment retries by 35% and recovering ~$200K/year in previously lost revenue.
- Led migration from monolithic Django app to event-driven microservices (Python + Go), cutting average API response time from 800ms to 120ms.
- Introduced contract testing (Pact) across 4 service boundaries, catching 12 integration issues before they reached staging.
- Mentored 2 junior engineers through onboarding and their first production deployments.

## Skills & Technologies

- **Languages:** Python, Go, SQL
- **Frameworks:** Django, FastAPI, gRPC
- **Infrastructure:** AWS (ECS, SQS, RDS), Terraform, Docker
- **Practices:** Event-driven architecture, contract testing, CI/CD (GitHub Actions)

## Projects

### Billing Pipeline Redesign
- **Goal:** Replace the synchronous, failure-prone billing pipeline with an async, retry-aware system.
- **Role:** Designed the event-driven architecture, implemented the core retry logic, and coordinated with the payments team on Stripe webhook handling.
- **Outcome:** 35% reduction in failed payments. System handles 3x the transaction volume with no additional infrastructure cost.

### Monolith-to-Microservices Migration
- **Goal:** Break the Django monolith into domain-specific services to improve team autonomy and deployment speed.
- **Role:** Led the billing domain extraction. Defined service boundaries, data ownership, and the event contract with downstream consumers.
- **Outcome:** Billing team now deploys independently 4x/week (was 1x/week tied to monolith release train).
