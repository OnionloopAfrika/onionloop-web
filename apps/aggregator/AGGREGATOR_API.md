# Onion Aggregator API Contract

This document describes the API requests and representative JSON responses required by the Aggregator flow:

```text
/ -> /aggregator/auth/login -> /aggregator -> /aggregator/dashboard
```

The examples are implementation contracts for the frontend and backend teams. Field names and values may be extended without breaking existing clients, but existing fields should retain their meaning.

## Conventions

- Base URL: `https://api.example.com`
- Content type: `application/json`
- Protected endpoints use `Authorization: Bearer <accessToken>`.
- Timestamps use ISO 8601 UTC strings.
- Successful single-resource responses use `{ "data": { ... } }`.
- Successful collection responses use `{ "data": [ ... ], "meta": { ... } }`.
- Mutating endpoints return the updated resource where practical.
- `page` starts at `1`; `pageSize` defaults to `20` and is capped at `100`.

### Common error response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid.",
    "details": [
      { "field": "email", "message": "Enter a valid email address." }
    ],
    "requestId": "req_01J8EXAMPLE"
  }
}
```

Common status codes: `400` invalid input, `401` unauthenticated or expired token, `403` insufficient permission, `404` resource not found, `409` conflicting state, `422` business-rule validation failure, and `500` unexpected server error.

### Common pagination metadata

```json
{
  "page": 1,
  "pageSize": 20,
  "totalItems": 125,
  "totalPages": 7
}
```

## 1. Authentication

### POST `/api/v1/auth/login`

Request:

```json
{
  "email": "aggregator@example.com",
  "password": "correct-horse-battery-staple"
}
```

Response `200`:

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "rt_01J8EXAMPLE",
    "expiresIn": 3600,
    "user": {
      "id": "usr_001",
      "firstName": "Ada",
      "lastName": "Okafor",
      "email": "aggregator@example.com",
      "role": "aggregator",
      "avatarUrl": null
    }
  }
}
```

### POST `/api/v1/auth/logout`

Request: no body. The refresh token may be sent as an HttpOnly cookie or in the request body:

```json
{ "refreshToken": "rt_01J8EXAMPLE" }
```

Response `204`: no body.

### POST `/api/v1/auth/refresh`

Request:

```json
{ "refreshToken": "rt_01J8EXAMPLE" }
```

Response `200`:

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "rt_01J8NEWTOKEN",
    "expiresIn": 3600
  }
}
```

### POST `/api/v1/auth/forgot-password`

Request:

```json
{ "email": "aggregator@example.com" }
```

Response `202`:

```json
{
  "data": {
    "message": "If the account exists, reset instructions have been sent."
  }
}
```

### POST `/api/v1/auth/reset-password`

Request:

```json
{
  "token": "reset_01J8EXAMPLE",
  "password": "new-secure-password",
  "passwordConfirmation": "new-secure-password"
}
```

Response `200`:

```json
{ "data": { "message": "Password reset successfully." } }
```

### GET `/api/v1/auth/session`

Request: no body.

Response `200`:

```json
{
  "data": {
    "authenticated": true,
    "user": {
      "id": "usr_001",
      "firstName": "Ada",
      "lastName": "Okafor",
      "email": "aggregator@example.com",
      "role": "aggregator"
    }
  }
}
```

Unauthenticated sessions return `200` with `{ "data": { "authenticated": false, "user": null } }`.

## 2. Dashboard

Dashboard filters are optional query parameters: `period`, `range` (`7days`, `30days`, `90days`), `dateFrom`, `dateTo`, `search`, `page`, and `pageSize`. Dates are inclusive and formatted as `YYYY-MM-DD`.

### GET `/api/v1/aggregator/dashboard/summary`

Request: `GET /api/v1/aggregator/dashboard/summary?range=30days&dateFrom=2026-07-20&dateTo=2026-08-19`

Response `200`:

```json
{
  "data": {
    "period": {
      "range": "30days",
      "dateFrom": "2026-07-20",
      "dateTo": "2026-08-19"
    },
    "totalBusinesses": 248,
    "activeBusinesses": 211,
    "dormantBusinesses": 37,
    "totalTransactionVolume": 18425000,
    "totalTransactionCount": 9342,
    "totalEarnings": 412500,
    "currency": "NGN",
    "volumeChangePercent": 12.4,
    "businessChangePercent": 5.1
  }
}
```

### GET `/api/v1/aggregator/dashboard/network-growth`

Request: `GET /api/v1/aggregator/dashboard/network-growth?range=30days`

Response `200`:

```json
{
  "data": {
    "currency": "NGN",
    "points": [
      {
        "date": "2026-07-20",
        "businesses": 228,
        "activeBusinesses": 196,
        "volume": 512000
      },
      {
        "date": "2026-08-19",
        "businesses": 248,
        "activeBusinesses": 211,
        "volume": 684000
      }
    ]
  }
}
```

### GET `/api/v1/aggregator/dashboard/dormant-rate`

Request: `GET /api/v1/aggregator/dashboard/dormant-rate?period=monthly&range=90days`

Response `200`:

```json
{
  "data": {
    "dormantRatePercent": 14.9,
    "activeRatePercent": 85.1,
    "period": "monthly",
    "points": [
      { "period": "2026-06", "dormant": 31, "active": 184 },
      { "period": "2026-07", "dormant": 35, "active": 202 },
      { "period": "2026-08", "dormant": 37, "active": 211 }
    ]
  }
}
```

### GET `/api/v1/aggregator/dashboard/business-performance`

Request: `GET /api/v1/aggregator/dashboard/business-performance?range=30days&search=market&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "businessId": "biz_001",
      "businessName": "Market Square",
      "status": "active",
      "transactionCount": 842,
      "transactionVolume": 2480000,
      "earnings": 52100,
      "currency": "NGN",
      "changePercent": 18.2
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### GET `/api/v1/aggregator/dashboard/activities`

Request: `GET /api/v1/aggregator/dashboard/activities?range=7days&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "id": "act_001",
      "type": "business_approved",
      "message": "Market Square was approved.",
      "actor": { "id": "usr_001", "name": "Ada Okafor" },
      "businessId": "biz_001",
      "createdAt": "2026-08-19T09:30:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

## 3. Targets

### GET `/api/v1/aggregator/targets`

Request: `GET /api/v1/aggregator/targets?range=30days`

Response `200`:

```json
{
  "data": {
    "period": "30days",
    "targets": [
      {
        "id": "target_001",
        "name": "Transaction volume",
        "target": 25000000,
        "actual": 18425000,
        "unit": "NGN",
        "progressPercent": 73.7
      },
      {
        "id": "target_002",
        "name": "Active businesses",
        "target": 250,
        "actual": 211,
        "unit": "businesses",
        "progressPercent": 84.4
      }
    ]
  }
}
```

### GET `/api/v1/aggregator/targets/daily-volume`

Request: `GET /api/v1/aggregator/targets/daily-volume?dateFrom=2026-08-13&dateTo=2026-08-19`

Response `200`:

```json
{
  "data": {
    "currency": "NGN",
    "dailyTarget": 850000,
    "points": [{ "date": "2026-08-19", "target": 850000, "actual": 684000 }]
  }
}
```

### GET `/api/v1/aggregator/targets/businesses`

Request: `GET /api/v1/aggregator/targets/businesses?range=30days&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "businessId": "biz_001",
      "businessName": "Market Square",
      "target": 1000000,
      "actual": 1240000,
      "progressPercent": 124,
      "status": "exceeded",
      "currency": "NGN"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

## 4. Businesses

### GET `/api/v1/aggregator/businesses`

Request: `GET /api/v1/aggregator/businesses?search=market&status=active&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "id": "biz_001",
      "name": "Market Square",
      "registrationNumber": "RC123456",
      "status": "active",
      "ownerName": "Chidi Eze",
      "email": "owner@marketsquare.example",
      "phone": "+2348000000000",
      "createdAt": "2026-06-01T10:00:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### POST `/api/v1/aggregator/businesses/merchant-invites`

Request:

```json
{
  "businessName": "Market Square",
  "email": "owner@marketsquare.example",
  "phone": "+2348000000000",
  "message": "Join our network."
}
```

Response `201`:

```json
{
  "data": {
    "id": "invite_001",
    "status": "sent",
    "email": "owner@marketsquare.example",
    "expiresAt": "2026-08-26T10:00:00Z"
  }
}
```

### POST `/api/v1/aggregator/businesses/agents`

Request:

```json
{ "businessId": "biz_001", "agentId": "agt_001", "role": "manager" }
```

Response `201`:

```json
{
  "data": {
    "businessId": "biz_001",
    "agentId": "agt_001",
    "role": "manager",
    "status": "active",
    "assignedAt": "2026-08-19T10:00:00Z"
  }
}
```

### GET `/api/v1/aggregator/businesses/{businessId}`

Request: `GET /api/v1/aggregator/businesses/biz_001`

Response `200`:

```json
{
  "data": {
    "id": "biz_001",
    "name": "Market Square",
    "status": "active",
    "ownerName": "Chidi Eze",
    "email": "owner@marketsquare.example",
    "phone": "+2348000000000",
    "address": "12 Main Street",
    "agentsCount": 4,
    "createdAt": "2026-06-01T10:00:00Z",
    "updatedAt": "2026-08-19T10:00:00Z"
  }
}
```

### PATCH `/api/v1/aggregator/businesses/{businessId}`

Request:

```json
{
  "name": "Market Square Ltd",
  "phone": "+2348111111111",
  "address": "14 Main Street"
}
```

Response `200`: same business object as the GET response, with updated fields.

### GET `/api/v1/aggregator/businesses/{businessId}/performance`

Request: `GET /api/v1/aggregator/businesses/biz_001/performance?range=30days`

Response `200`:

```json
{
  "data": {
    "businessId": "biz_001",
    "transactionCount": 842,
    "transactionVolume": 2480000,
    "earnings": 52100,
    "averageTransaction": 2945.37,
    "currency": "NGN",
    "points": [{ "date": "2026-08-19", "volume": 684000, "count": 211 }]
  }
}
```

### GET `/api/v1/aggregator/businesses/{businessId}/transactions`

Request: `GET /api/v1/aggregator/businesses/biz_001/transactions?dateFrom=2026-08-01&dateTo=2026-08-19&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "id": "txn_001",
      "reference": "TXN-001",
      "amount": 12500,
      "currency": "NGN",
      "status": "successful",
      "type": "payment",
      "createdAt": "2026-08-19T09:20:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### GET `/api/v1/aggregator/businesses/{businessId}/tickets`

Request: `GET /api/v1/aggregator/businesses/biz_001/tickets?status=open&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "id": "ticket_001",
      "subject": "Settlement question",
      "status": "open",
      "priority": "normal",
      "createdAt": "2026-08-19T08:00:00Z",
      "updatedAt": "2026-08-19T08:30:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

## 5. Verification and Approval

### GET `/api/v1/aggregator/business-verifications`

Request: `GET /api/v1/aggregator/business-verifications?status=pending&search=market&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "id": "verification_001",
      "businessId": "biz_001",
      "businessName": "Market Square",
      "status": "pending",
      "submittedAt": "2026-08-19T07:00:00Z",
      "documentsCount": 4
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### GET `/api/v1/aggregator/business-verifications/{verificationId}`

Request: `GET /api/v1/aggregator/business-verifications/verification_001`

Response `200`:

```json
{
  "data": {
    "id": "verification_001",
    "businessId": "biz_001",
    "status": "pending",
    "documents": [
      {
        "id": "doc_001",
        "type": "certificate",
        "fileName": "certificate.pdf",
        "url": "https://files.example/doc_001"
      }
    ],
    "review": null,
    "submittedAt": "2026-08-19T07:00:00Z"
  }
}
```

### POST `/api/v1/aggregator/business-verifications/{verificationId}/review`

Request:

```json
{ "decision": "approve", "comment": "All submitted documents are valid." }
```

Response `200`:

```json
{
  "data": {
    "verificationId": "verification_001",
    "decision": "approve",
    "comment": "All submitted documents are valid.",
    "reviewedBy": "usr_001",
    "reviewedAt": "2026-08-19T10:00:00Z"
  }
}
```

### POST `/api/v1/aggregator/business-verifications/{verificationId}/evidence`

Request: `multipart/form-data` with `file` and `type` fields, for example `type=certificate`.

Response `201`:

```json
{
  "data": {
    "id": "doc_002",
    "verificationId": "verification_001",
    "type": "certificate",
    "fileName": "certificate.pdf",
    "url": "https://files.example/doc_002",
    "uploadedAt": "2026-08-19T10:01:00Z"
  }
}
```

### PATCH `/api/v1/aggregator/business-verifications/{verificationId}/status`

Request:

```json
{ "status": "in_review", "reason": "Additional evidence requested." }
```

Response `200`:

```json
{
  "data": {
    "verificationId": "verification_001",
    "status": "in_review",
    "updatedAt": "2026-08-19T10:02:00Z"
  }
}
```

### GET `/api/v1/aggregator/business-approvals`

Request: `GET /api/v1/aggregator/business-approvals?status=pending&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "id": "approval_001",
      "businessId": "biz_001",
      "businessName": "Market Square",
      "status": "pending",
      "submittedAt": "2026-08-19T07:00:00Z",
      "submittedBy": "usr_002"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### POST `/api/v1/aggregator/business-approvals/{approvalId}/approve`

Request:

```json
{ "comment": "Approved for onboarding." }
```

Response `200`:

```json
{
  "data": {
    "approvalId": "approval_001",
    "status": "approved",
    "comment": "Approved for onboarding.",
    "approvedBy": "usr_001",
    "approvedAt": "2026-08-19T10:05:00Z"
  }
}
```

### POST `/api/v1/aggregator/business-approvals/{approvalId}/reject`

Request:

```json
{ "reason": "Proof of address is incomplete." }
```

Response `200`:

```json
{
  "data": {
    "approvalId": "approval_001",
    "status": "rejected",
    "reason": "Proof of address is incomplete.",
    "rejectedBy": "usr_001",
    "rejectedAt": "2026-08-19T10:05:00Z"
  }
}
```

## 6. Business Transfers

### GET `/api/v1/aggregator/business-transfers`

Request: `GET /api/v1/aggregator/business-transfers?status=pending&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "referenceId": "TRF-001",
      "businessId": "biz_001",
      "businessName": "Market Square",
      "fromAgentId": "agt_001",
      "toAgentId": "agt_002",
      "status": "pending",
      "reason": "Territory update",
      "createdAt": "2026-08-19T08:00:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### GET `/api/v1/aggregator/business-transfers/{referenceId}`

Request: `GET /api/v1/aggregator/business-transfers/TRF-001`

Response `200`: same transfer object as the list response, including `timeline` with status changes.

### POST `/api/v1/aggregator/business-transfers`

Request:

```json
{
  "businessId": "biz_001",
  "toAgentId": "agt_002",
  "reason": "Territory update"
}
```

Response `201`:

```json
{
  "data": {
    "referenceId": "TRF-001",
    "businessId": "biz_001",
    "toAgentId": "agt_002",
    "status": "pending",
    "createdAt": "2026-08-19T10:10:00Z"
  }
}
```

### POST `/api/v1/aggregator/business-transfers/{referenceId}/approve`

Request: `{ "comment": "Transfer approved." }`

Response `200`:

```json
{
  "data": {
    "referenceId": "TRF-001",
    "status": "approved",
    "approvedBy": "usr_001",
    "approvedAt": "2026-08-19T10:15:00Z"
  }
}
```

### POST `/api/v1/aggregator/business-transfers/{referenceId}/reject`

Request: `{ "reason": "Receiving agent is not available." }`

Response `200`:

```json
{
  "data": {
    "referenceId": "TRF-001",
    "status": "rejected",
    "reason": "Receiving agent is not available.",
    "rejectedBy": "usr_001",
    "rejectedAt": "2026-08-19T10:15:00Z"
  }
}
```

### POST `/api/v1/aggregator/business-transfers/{referenceId}/cancel`

Request: `{ "reason": "Requester changed territory." }`

Response `200`:

```json
{
  "data": {
    "referenceId": "TRF-001",
    "status": "cancelled",
    "reason": "Requester changed territory.",
    "cancelledBy": "usr_001",
    "cancelledAt": "2026-08-19T10:15:00Z"
  }
}
```

## 7. Earnings and Reports

### GET `/api/v1/aggregator/earnings`

Request: `GET /api/v1/aggregator/earnings?dateFrom=2026-08-01&dateTo=2026-08-19&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "id": "earning_001",
      "businessId": "biz_001",
      "businessName": "Market Square",
      "transactionCount": 842,
      "grossVolume": 2480000,
      "amount": 52100,
      "currency": "NGN",
      "status": "paid",
      "period": "2026-08"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### GET `/api/v1/aggregator/earnings/summary`

Request: `GET /api/v1/aggregator/earnings/summary?range=30days`

Response `200`:

```json
{
  "data": {
    "grossEarnings": 412500,
    "paidEarnings": 380000,
    "pendingEarnings": 32500,
    "transactionVolume": 18425000,
    "currency": "NGN",
    "changePercent": 12.4
  }
}
```

### GET `/api/v1/aggregator/earnings/businesses`

Request: `GET /api/v1/aggregator/earnings/businesses?range=30days&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "businessId": "biz_001",
      "businessName": "Market Square",
      "earnings": 52100,
      "transactionVolume": 2480000,
      "transactionCount": 842,
      "currency": "NGN"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### GET `/api/v1/aggregator/reports/overview`

Request: `GET /api/v1/aggregator/reports/overview?dateFrom=2026-08-01&dateTo=2026-08-19`

Response `200`:

```json
{
  "data": {
    "transactionCount": 9342,
    "transactionVolume": 18425000,
    "earnings": 412500,
    "activeBusinesses": 211,
    "dormantBusinesses": 37,
    "currency": "NGN"
  }
}
```

### GET `/api/v1/aggregator/reports/transactions`

Request: `GET /api/v1/aggregator/reports/transactions?status=successful&dateFrom=2026-08-01&dateTo=2026-08-19&page=1&pageSize=20`

Response `200`: a paginated collection of transaction objects containing `id`, `reference`, `businessId`, `businessName`, `amount`, `currency`, `status`, `type`, and `createdAt`.

### GET `/api/v1/aggregator/reports/top-businesses`

Request: `GET /api/v1/aggregator/reports/top-businesses?range=30days&limit=10`

Response `200`:

```json
{
  "data": [
    {
      "rank": 1,
      "businessId": "biz_001",
      "businessName": "Market Square",
      "transactionVolume": 2480000,
      "transactionCount": 842,
      "earnings": 52100,
      "currency": "NGN"
    }
  ]
}
```

### GET `/api/v1/aggregator/reports/activities`

Request: `GET /api/v1/aggregator/reports/activities?dateFrom=2026-08-01&dateTo=2026-08-19&page=1&pageSize=20`

Response `200`: a paginated collection of activity objects containing `id`, `type`, `message`, `actor`, related resource IDs, and `createdAt`.

### GET `/api/v1/aggregator/reports/export`

Request: `GET /api/v1/aggregator/reports/export?format=csv&dateFrom=2026-08-01&dateTo=2026-08-19`

Response `200`: `Content-Type: text/csv` with `Content-Disposition: attachment; filename="aggregator-report-2026-08-01-2026-08-19.csv"` and the report rows in the response body. For asynchronous exports, return `202` with `{ "data": { "exportId": "export_001", "status": "processing" } }`.

## 8. Accounts and Balances

### GET `/api/v1/aggregator/accounts`

Request: `GET /api/v1/aggregator/accounts?page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "id": "acc_001",
      "name": "Primary settlement account",
      "accountNumber": "******1234",
      "currency": "NGN",
      "status": "active",
      "balance": 1250000
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### GET `/api/v1/aggregator/accounts/{accountId}`

Request: `GET /api/v1/aggregator/accounts/acc_001`

Response `200`: `{ "data": { "id": "acc_001", "name": "Primary settlement account", "accountNumber": "******1234", "currency": "NGN", "status": "active", "balance": 1250000, "createdAt": "2026-01-01T10:00:00Z" } }`.

### GET `/api/v1/aggregator/accounts/{accountId}/balances`

Request: `GET /api/v1/aggregator/accounts/acc_001/balances`

Response `200`:

```json
{
  "data": {
    "accountId": "acc_001",
    "available": 1250000,
    "ledger": 1300000,
    "pending": 50000,
    "currency": "NGN",
    "asOf": "2026-08-19T10:20:00Z"
  }
}
```

### GET `/api/v1/aggregator/accounts/{accountId}/transactions`

Request: `GET /api/v1/aggregator/accounts/acc_001/transactions?dateFrom=2026-08-01&dateTo=2026-08-19&page=1&pageSize=20`

Response `200`: a paginated collection of account transactions with `id`, `reference`, `direction`, `amount`, `currency`, `description`, `status`, and `createdAt`.

### GET `/api/v1/aggregator/accounts/{accountId}/revenue`

Request: `GET /api/v1/aggregator/accounts/acc_001/revenue?range=30days`

Response `200`:

```json
{
  "data": {
    "accountId": "acc_001",
    "currency": "NGN",
    "totalRevenue": 412500,
    "points": [{ "date": "2026-08-19", "amount": 52100 }]
  }
}
```

### GET `/api/v1/aggregator/accounts/{accountId}/onion-balance`

Request: `GET /api/v1/aggregator/accounts/acc_001/onion-balance`

Response `200`:

```json
{
  "data": {
    "accountId": "acc_001",
    "balance": 1250000,
    "available": 1200000,
    "pending": 50000,
    "currency": "ONION",
    "asOf": "2026-08-19T10:20:00Z"
  }
}
```

## 9. Profile and Settings

### GET `/api/v1/me`

Request: no body.

Response `200`: `{ "data": { "id": "usr_001", "firstName": "Ada", "lastName": "Okafor", "email": "aggregator@example.com", "phone": "+2348000000000", "role": "aggregator", "avatarUrl": null } }`.

### PATCH `/api/v1/me`

Request: `{ "firstName": "Ada", "lastName": "Okafor", "phone": "+2348111111111" }`

Response `200`: updated user object in `{ "data": { ... } }`.

### POST `/api/v1/me/avatar`

Request: `multipart/form-data` with a required `file` image field.

Response `201`: `{ "data": { "avatarUrl": "https://files.example/avatar_usr_001.jpg" } }`.

### PATCH `/api/v1/me/password`

Request: `{ "currentPassword": "old-password", "newPassword": "new-secure-password", "passwordConfirmation": "new-secure-password" }`

Response `200`: `{ "data": { "message": "Password updated successfully." } }`.

### GET `/api/v1/aggregator/notification-preferences`

Request: no body.

Response `200`:

```json
{
  "data": {
    "email": true,
    "push": true,
    "sms": false,
    "businessUpdates": true,
    "transactionUpdates": true,
    "marketing": false
  }
}
```

### PATCH `/api/v1/aggregator/notification-preferences`

Request: `{ "email": true, "push": false, "sms": false, "businessUpdates": true, "transactionUpdates": true, "marketing": false }`

Response `200`: updated preference object in `{ "data": { ... } }`.

### GET `/api/v1/aggregator/two-factor`

Request: no body.

Response `200`: `{ "data": { "enabled": true, "method": "authenticator", "phoneMasked": "+234******0000" } }`.

### PATCH `/api/v1/aggregator/two-factor`

Request: `{ "enabled": true, "method": "authenticator", "code": "123456" }`

Response `200`: `{ "data": { "enabled": true, "method": "authenticator", "updatedAt": "2026-08-19T10:30:00Z" } }`.

## 10. Billing

### GET `/api/v1/billing/plans`

Request: no body.

Response `200`:

```json
{
  "data": [
    {
      "id": "plan_pro",
      "name": "Pro",
      "amount": 25000,
      "currency": "NGN",
      "interval": "monthly",
      "features": ["Advanced reports", "Priority support"]
    }
  ]
}
```

### GET `/api/v1/billing/subscription`

Request: no body.

Response `200`: `{ "data": { "id": "sub_001", "planId": "plan_pro", "status": "active", "currentPeriodStart": "2026-08-01T00:00:00Z", "currentPeriodEnd": "2026-08-31T23:59:59Z", "cancelAtPeriodEnd": false } }`.

### POST `/api/v1/billing/checkout`

Request: `{ "planId": "plan_pro", "successUrl": "https://app.example/billing?success=1", "cancelUrl": "https://app.example/billing?cancelled=1" }`

Response `201`: `{ "data": { "checkoutId": "checkout_001", "checkoutUrl": "https://payments.example/checkout_001", "expiresAt": "2026-08-19T11:00:00Z" } }`.

### PATCH `/api/v1/billing/subscription`

Request: `{ "planId": "plan_business", "cancelAtPeriodEnd": false }`

Response `200`: updated subscription object in `{ "data": { ... } }`.

### GET `/api/v1/billing/invoices`

Request: `GET /api/v1/billing/invoices?page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "id": "inv_001",
      "number": "INV-2026-001",
      "amount": 25000,
      "currency": "NGN",
      "status": "paid",
      "issuedAt": "2026-08-01T00:00:00Z",
      "dueAt": "2026-08-01T00:00:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### GET `/api/v1/billing/invoices/{invoiceId}/download`

Request: `GET /api/v1/billing/invoices/inv_001/download`

Response `200`: `Content-Type: application/pdf` with `Content-Disposition: attachment; filename="INV-2026-001.pdf"` and the PDF bytes in the response body. A short-lived signed URL may be returned instead as `{ "data": { "downloadUrl": "https://files.example/inv_001?signature=...", "expiresAt": "2026-08-19T11:00:00Z" } }`.

## 11. Messages and Notifications

### GET `/api/v1/aggregator/conversations`

Request: `GET /api/v1/aggregator/conversations?search=settlement&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "id": "conv_001",
      "subject": "Settlement support",
      "participant": { "id": "usr_003", "name": "Support Team" },
      "lastMessage": "We are reviewing this.",
      "unreadCount": 1,
      "updatedAt": "2026-08-19T09:00:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### POST `/api/v1/aggregator/conversations`

Request: `{ "participantId": "usr_003", "subject": "Settlement support", "message": "Please review this settlement." }`

Response `201`: `{ "data": { "id": "conv_001", "subject": "Settlement support", "status": "open", "createdAt": "2026-08-19T10:40:00Z" } }`.

### GET `/api/v1/aggregator/conversations/{conversationId}`

Request: `GET /api/v1/aggregator/conversations/conv_001`

Response `200`: `{ "data": { "id": "conv_001", "subject": "Settlement support", "status": "open", "participant": { "id": "usr_003", "name": "Support Team" }, "createdAt": "2026-08-19T10:40:00Z" } }`.

### GET `/api/v1/aggregator/conversations/{conversationId}/messages`

Request: `GET /api/v1/aggregator/conversations/conv_001/messages?page=1&pageSize=50`

Response `200`:

```json
{
  "data": [
    {
      "id": "msg_001",
      "conversationId": "conv_001",
      "sender": { "id": "usr_001", "name": "Ada Okafor" },
      "body": "Please review this settlement.",
      "readAt": "2026-08-19T10:41:00Z",
      "createdAt": "2026-08-19T10:40:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 50, "totalItems": 1, "totalPages": 1 }
}
```

### POST `/api/v1/aggregator/conversations/{conversationId}/messages`

Request: `{ "body": "The settlement reference is SET-001." }`

Response `201`: `{ "data": { "id": "msg_002", "conversationId": "conv_001", "body": "The settlement reference is SET-001.", "createdAt": "2026-08-19T10:42:00Z" } }`.

### POST `/api/v1/aggregator/conversations/{conversationId}/read`

Request: no body.

Response `204`: no body.

### GET `/api/v1/aggregator/notifications`

Request: `GET /api/v1/aggregator/notifications?read=false&page=1&pageSize=20`

Response `200`:

```json
{
  "data": [
    {
      "id": "notification_001",
      "type": "business_approved",
      "title": "Business approved",
      "body": "Market Square is now active.",
      "read": false,
      "createdAt": "2026-08-19T09:30:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "totalItems": 1, "totalPages": 1 }
}
```

### PATCH `/api/v1/aggregator/notifications/{notificationId}/read`

Request: no body.

Response `200`: `{ "data": { "id": "notification_001", "read": true, "readAt": "2026-08-19T10:45:00Z" } }`.

### POST `/api/v1/aggregator/notifications/read-all`

Request: no body.

Response `200`: `{ "data": { "updatedCount": 4 } }`.

## 12. Help and Support

### GET `/api/v1/support/faqs`

Request: `GET /api/v1/support/faqs?search=verification&category=businesses`

Response `200`:

```json
{
  "data": [
    {
      "id": "faq_001",
      "question": "How do I verify a business?",
      "answer": "Open Business Verification and review the submitted evidence.",
      "category": "businesses",
      "updatedAt": "2026-08-01T10:00:00Z"
    }
  ]
}
```

### GET `/api/v1/support/contact-options`

Request: no body.

Response `200`:

```json
{
  "data": [
    {
      "type": "live_chat",
      "label": "Live chat",
      "available": true,
      "responseTime": "Within 5 minutes"
    },
    {
      "type": "email",
      "label": "Email support",
      "available": true,
      "address": "support@example.com"
    }
  ]
}
```

### GET `/api/v1/aggregator/support/tickets`

Request: `GET /api/v1/aggregator/support/tickets?status=open&search=settlement&page=1&pageSize=20`

Response `200`: a paginated collection of ticket objects containing `id`, `subject`, `status`, `priority`, `category`, `createdAt`, and `updatedAt`.

### POST `/api/v1/aggregator/support/tickets`

Request:

```json
{
  "subject": "Settlement question",
  "category": "payments",
  "priority": "normal",
  "message": "Please explain settlement SET-001."
}
```

Response `201`:

```json
{
  "data": {
    "id": "ticket_001",
    "reference": "SUP-001",
    "subject": "Settlement question",
    "status": "open",
    "priority": "normal",
    "createdAt": "2026-08-19T10:50:00Z"
  }
}
```

### GET `/api/v1/aggregator/support/tickets/{ticketId}`

Request: `GET /api/v1/aggregator/support/tickets/ticket_001`

Response `200`:

```json
{
  "data": {
    "id": "ticket_001",
    "reference": "SUP-001",
    "subject": "Settlement question",
    "status": "open",
    "priority": "normal",
    "category": "payments",
    "messages": [],
    "createdAt": "2026-08-19T10:50:00Z",
    "updatedAt": "2026-08-19T10:50:00Z"
  }
}
```

### POST `/api/v1/aggregator/support/tickets/{ticketId}/messages`

Request: `{ "body": "The settlement reference is SET-001." }`

Response `201`: `{ "data": { "id": "ticket_msg_001", "ticketId": "ticket_001", "body": "The settlement reference is SET-001.", "senderId": "usr_001", "createdAt": "2026-08-19T10:52:00Z" } }`.

### POST `/api/v1/aggregator/support/tickets/{ticketId}/attachments`

Request: `multipart/form-data` with a required `file` field and optional `message` field.

Response `201`: `{ "data": { "id": "attachment_001", "ticketId": "ticket_001", "fileName": "settlement.pdf", "mimeType": "application/pdf", "size": 18342, "url": "https://files.example/attachment_001" } }`.

### POST `/api/v1/aggregator/support/tickets/{ticketId}/close`

Request: `{ "comment": "Issue resolved." }`

Response `200`: `{ "data": { "id": "ticket_001", "status": "closed", "closedBy": "usr_001", "closedAt": "2026-08-19T10:55:00Z" } }`.

## Frontend integration notes

1. Call `GET /api/v1/auth/session` when the Aggregator app loads.
2. Redirect unauthenticated users to `/aggregator/auth/login`.
3. After login, load the dashboard requests in parallel using the selected `range` and date filters.
4. On `401`, refresh once through `/api/v1/auth/refresh`; if refresh fails, clear the session and return to login.
5. Treat `204` responses as successful responses with no JSON parsing.
6. Escape user-provided `search` values when constructing query strings and use `URLSearchParams`.
7. Do not expose refresh tokens to client-side JavaScript when the backend supports HttpOnly cookies.
