# OnionCrew Dashboard API Contract

> Crew dashboard flow only. Aggregator and cashier endpoints are outside this contract.
>
> Base URL: `/api/v1`
>
> The examples below are representative contracts. Dates use ISO 8601 UTC strings and monetary values are numeric amounts in the account currency.

## Conventions

### Authentication

All endpoints except login and password recovery require:

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Success envelope

Single resources and action responses use:

```json
{
  "data": {},
  "message": "Request completed successfully"
}
```

Collections use:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 25,
    "total": 100,
    "totalPages": 4
  }
}
```

### Error envelope

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid",
    "fields": {
      "email": "A valid email address is required"
    },
    "requestId": "req_01JABC123"
  }
}
```

Common status codes: `400` invalid input, `401` unauthenticated, `403` insufficient permission, `404` not found, `409` conflict, and `500` server error.

### Shared query parameters

Paginated collections accept `page` and `pageSize`. Unless otherwise stated, list filters may also include `search`, `dateFrom`, and `dateTo`.

---

## Authentication

### `POST /auth/login`

Request:

```json
{ "email": "manager@example.com", "password": "P@ssword123" }
```

Response `200`:

```json
{
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "expiresIn": 3600,
    "user": { "id": "usr_123", "name": "Ada Manager", "role": "crew_manager" }
  }
}
```

### `POST /auth/logout`

Request: no body. Response `204` with no body.

### `POST /auth/refresh`

Request:

```json
{ "refreshToken": "eyJ..." }
```

Response `200`:

```json
{ "data": { "accessToken": "eyJ...", "expiresIn": 3600 } }
```

### `POST /auth/forgot-password`

Request:

```json
{ "email": "manager@example.com" }
```

Response `202`:

```json
{
  "data": { "accepted": true },
  "message": "If the account exists, reset instructions have been sent"
}
```

### `POST /auth/reset-password`

Request:

```json
{ "token": "reset_token", "password": "NewP@ssword123" }
```

Response `200`:

```json
{ "data": { "reset": true }, "message": "Password reset successfully" }
```

### `GET /auth/session`

Request: no body. Response `200`:

```json
{
  "data": {
    "authenticated": true,
    "user": { "id": "usr_123", "name": "Ada Manager", "role": "crew_manager" }
  }
}
```

---

## Dashboard

### `GET /crew/dashboard/summary`

Request: no body. Response `200`:

```json
{
  "data": {
    "revenue": 48250.75,
    "transactionCount": 1284,
    "activeStaff": 18,
    "inventoryCount": 436,
    "outOfStockCount": 7,
    "currency": "NGN",
    "period": { "dateFrom": "2026-08-01", "dateTo": "2026-08-19" }
  }
}
```

### `GET /crew/dashboard/revenue?period=7days`

Request: query `period`: `7days`, `30days`, or `90days`. Response `200`:

```json
{
  "data": {
    "currency": "NGN",
    "period": "7days",
    "points": [{ "date": "2026-08-19", "amount": 48250.75 }]
  }
}
```

### `GET /crew/dashboard/recent-transactions`

Request: optional query `limit` (default `10`). Response `200`:

```json
{
  "data": [
    {
      "id": "txn_123",
      "reference": "ORD-10023",
      "amount": 12500,
      "status": "completed",
      "createdAt": "2026-08-19T10:30:00Z"
    }
  ]
}
```

### `GET /crew/dashboard/export`

Request: optional query `dateFrom`, `dateTo`, and `format` (`csv` or `xlsx`). Response `200`:

```json
{
  "data": {
    "downloadUrl": "https://files.example.com/exports/dashboard-123.csv",
    "expiresAt": "2026-08-19T11:30:00Z"
  }
}
```

---

## Transactions

### `GET /crew/transactions`

Request: query `search`, `status`, `dateFrom`, `dateTo`, `staffId`, `page`, and `pageSize`. Response `200`:

```json
{
  "data": [
    {
      "id": "txn_123",
      "reference": "ORD-10023",
      "amount": 12500,
      "paymentMethod": "card",
      "status": "completed",
      "staff": { "id": "stf_1", "name": "Sam Lee" },
      "createdAt": "2026-08-19T10:30:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 25, "total": 1284, "totalPages": 52 }
}
```

### `GET /crew/transactions/{transactionId}`

Request: path `transactionId`. Response `200`:

```json
{
  "data": {
    "id": "txn_123",
    "reference": "ORD-10023",
    "items": [
      {
        "productId": "prd_1",
        "name": "Lunch Bowl",
        "quantity": 2,
        "unitPrice": 6250
      }
    ],
    "subtotal": 12500,
    "total": 12500,
    "status": "completed",
    "createdAt": "2026-08-19T10:30:00Z"
  }
}
```

### `GET /crew/transactions/stats`

Request: optional query `dateFrom`, `dateTo`, `staffId`, and `status`. Response `200`:

```json
{
  "data": {
    "total": 1284,
    "completed": 1210,
    "pending": 42,
    "refunded": 32,
    "grossAmount": 48250.75,
    "averageAmount": 37.58,
    "currency": "NGN"
  }
}
```

### `GET /crew/transactions/export`

Request: query filters from the list endpoint plus `format` (`csv` or `xlsx`). Response `200`:

```json
{
  "data": {
    "downloadUrl": "https://files.example.com/exports/transactions-123.csv",
    "expiresAt": "2026-08-19T11:30:00Z"
  }
}
```

### `POST /crew/transactions/{transactionId}/refunds`

Request:

```json
{ "amount": 12500, "reason": "Customer cancellation" }
```

Response `201`:

```json
{
  "data": {
    "refundId": "ref_123",
    "transactionId": "txn_123",
    "amount": 12500,
    "status": "pending",
    "createdAt": "2026-08-19T10:40:00Z"
  },
  "message": "Refund requested"
}
```

---

## Sales and Staff Performance

### `GET /crew/sales`

Request: query `dateFrom`, `dateTo`, `staffId`, `productId`, `page`, and `pageSize`. Response `200`:

```json
{
  "data": [
    {
      "date": "2026-08-19",
      "staffId": "stf_1",
      "staffName": "Sam Lee",
      "orders": 42,
      "revenue": 125000
    }
  ],
  "meta": { "page": 1, "pageSize": 25, "total": 18, "totalPages": 1 }
}
```

### `GET /crew/sales/summary`

Request: query `dateFrom` and `dateTo`. Response `200`:

```json
{
  "data": {
    "orders": 1284,
    "revenue": 48250.75,
    "averageOrderValue": 37.58,
    "currency": "NGN"
  }
}
```

### `GET /crew/staff-performance`

Request: query `dateFrom`, `dateTo`, `staffId`, `page`, and `pageSize`. Response `200`:

```json
{
  "data": [
    {
      "staffId": "stf_1",
      "name": "Sam Lee",
      "orders": 142,
      "revenue": 542000,
      "conversionRate": 0.82
    }
  ],
  "meta": { "page": 1, "pageSize": 25, "total": 18, "totalPages": 1 }
}
```

### `GET /crew/staff/{staffId}/sales`

Request: path `staffId`; query `dateFrom`, `dateTo`, `page`, and `pageSize`. Response `200`:

```json
{
  "data": [
    {
      "id": "txn_123",
      "reference": "ORD-10023",
      "amount": 12500,
      "createdAt": "2026-08-19T10:30:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 25, "total": 142, "totalPages": 6 }
}
```

### `GET /crew/staff/{staffId}/orders`

Request: path `staffId`; query `status`, `dateFrom`, `dateTo`, `page`, and `pageSize`. Response `200`:

```json
{
  "data": [
    {
      "id": "ord_123",
      "reference": "ORD-10023",
      "status": "completed",
      "total": 12500,
      "createdAt": "2026-08-19T10:30:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 25, "total": 142, "totalPages": 6 }
}
```

---

## Reports

All report endpoints accept query `dateFrom`, `dateTo`, and optionally `locationId`. Report responses use the following shapes.

| Endpoint                                  | Response `200` data shape                                                                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET /crew/reports/summary`               | `{ "revenue": 48250.75, "transactions": 1284, "averageOrderValue": 37.58 }`                                                                                                    |
| `GET /crew/reports/revenue`               | `{ "points": [{ "date": "2026-08-19", "amount": 48250.75 }] }`                                                                                                                 |
| `GET /crew/reports/transaction-volume`    | `{ "points": [{ "date": "2026-08-19", "count": 1284 }] }`                                                                                                                      |
| `GET /crew/reports/sales-by-hour`         | `{ "points": [{ "hour": 10, "orders": 84, "revenue": 315000 }] }`                                                                                                              |
| `GET /crew/reports/transaction-breakdown` | `{ "items": [{ "status": "completed", "count": 1210, "amount": 45000 }] }`                                                                                                     |
| `GET /crew/reports/payment-methods`       | `{ "items": [{ "method": "card", "count": 720, "amount": 28000 }] }`                                                                                                           |
| `GET /crew/reports/top-selling-products`  | `{ "items": [{ "productId": "prd_1", "name": "Lunch Bowl", "quantity": 430, "revenue": 2687500 }] }`                                                                           |
| `GET /crew/reports/top-staff`             | `{ "items": [{ "staffId": "stf_1", "name": "Sam Lee", "orders": 142, "revenue": 542000 }] }`                                                                                   |
| `GET /crew/reports/staff-activity`        | `{ "items": [{ "staffId": "stf_1", "name": "Sam Lee", "lastActiveAt": "2026-08-19T10:30:00Z", "actions": 84 }] }`                                                              |
| `GET /crew/reports/transactions`          | `{ "items": [{ "id": "txn_123", "reference": "ORD-10023", "amount": 12500, "status": "completed" }], "meta": { "page": 1, "pageSize": 25, "total": 1284, "totalPages": 52 } }` |

Example response envelope:

```json
{
  "data": { "points": [{ "date": "2026-08-19", "amount": 48250.75 }] },
  "meta": {
    "dateFrom": "2026-08-01",
    "dateTo": "2026-08-19",
    "currency": "NGN"
  }
}
```

### `GET /crew/reports/export`

Request: report filters plus `report` and `format` (`csv` or `xlsx`). Response `200`:

```json
{
  "data": {
    "downloadUrl": "https://files.example.com/exports/revenue-123.xlsx",
    "expiresAt": "2026-08-19T11:30:00Z"
  }
}
```

---

## Inventory and Products

### `GET /crew/products`

Request: query `search`, `category`, `stockStatus`, `expiryDate`, `page`, and `pageSize`. Response `200`:

```json
{
  "data": [
    {
      "id": "prd_1",
      "name": "Lunch Bowl",
      "category": "Meals",
      "sku": "LB-001",
      "price": 6250,
      "stockQuantity": 24,
      "reorderLevel": 10,
      "stockStatus": "in_stock",
      "imageUrl": null
    }
  ],
  "meta": { "page": 1, "pageSize": 25, "total": 436, "totalPages": 18 }
}
```

### `POST /crew/products`

Request:

```json
{
  "name": "Lunch Bowl",
  "category": "Meals",
  "sku": "LB-001",
  "price": 6250,
  "stockQuantity": 24,
  "reorderLevel": 10,
  "expiryDate": "2026-08-25",
  "imageUrl": null
}
```

Response `201`: `data` is the created product in the `GET /crew/products` shape.

### `GET /crew/products/{productId}`

Request: path `productId`. Response `200`: `data` is one product in the product shape above, including `createdAt`, `updatedAt`, and stock history summary.

### `PATCH /crew/products/{productId}`

Request: path `productId`; body contains only changed fields, for example `{ "price": 7000, "reorderLevel": 12 }`. Response `200`: `data` is the updated product.

### `DELETE /crew/products/{productId}`

Request: path `productId`; no body. Response `200`:

```json
{ "data": { "id": "prd_1", "deleted": true }, "message": "Product deleted" }
```

### `GET /crew/products/low-stock`

Request: optional query `page`, `pageSize`, `category`. Response `200`: paginated product collection where `stockStatus` is `low_stock`.

### `GET /crew/products/out-of-stock`

Request: optional query `page`, `pageSize`, `category`. Response `200`: paginated product collection where `stockStatus` is `out_of_stock`.

### `GET /crew/inventory/summary`

Request: no body. Response `200`:

```json
{
  "data": {
    "totalProducts": 436,
    "inStock": 380,
    "lowStock": 49,
    "outOfStock": 7,
    "inventoryValue": 1825000,
    "currency": "NGN"
  }
}
```

### `POST /crew/inventory/stock-adjustments`

Request:

```json
{
  "productId": "prd_1",
  "quantity": -2,
  "reason": "Damaged stock",
  "note": "Packaging torn"
}
```

Response `201`:

```json
{
  "data": {
    "id": "adj_123",
    "productId": "prd_1",
    "quantity": -2,
    "balanceAfter": 22,
    "createdAt": "2026-08-19T10:30:00Z"
  },
  "message": "Stock adjusted"
}
```

### `GET /crew/inventory/export`

Request: query product filters plus `format` (`csv` or `xlsx`). Response `200`: `{ "data": { "downloadUrl": "https://files.example.com/exports/inventory-123.csv", "expiresAt": "2026-08-19T11:30:00Z" } }`.

### `POST /uploads/product-image`

Request: `multipart/form-data` with `file` and optional `productId`. Response `201`:

```json
{
  "data": {
    "url": "https://cdn.example.com/products/prd_1.jpg",
    "fileName": "prd_1.jpg",
    "contentType": "image/jpeg"
  }
}
```

---

## Staff Management

### `GET /crew/staff`

Request: query `search`, `status`, `role`, `page`, and `pageSize`. Response `200`:

```json
{
  "data": [
    {
      "id": "stf_1",
      "name": "Sam Lee",
      "email": "sam@example.com",
      "role": "cashier",
      "status": "active",
      "lastActiveAt": "2026-08-19T10:30:00Z"
    }
  ],
  "meta": { "page": 1, "pageSize": 25, "total": 18, "totalPages": 1 }
}
```

### `POST /crew/staff/invitations`

Request:

```json
{
  "email": "new.staff@example.com",
  "role": "cashier",
  "permissions": ["orders.read"]
}
```

Response `201`:

```json
{
  "data": {
    "id": "inv_123",
    "email": "new.staff@example.com",
    "role": "cashier",
    "status": "pending",
    "expiresAt": "2026-08-26T10:30:00Z"
  },
  "message": "Invitation sent"
}
```

### `GET /crew/staff/{staffId}`

Request: path `staffId`. Response `200`: `data` is one staff member in the staff list shape, including `permissions` and `createdAt`.

### `PATCH /crew/staff/{staffId}`

Request: path `staffId`; body contains changed fields, for example `{ "name": "Sam Lee", "role": "supervisor" }`. Response `200`: `data` is the updated staff member.

### `DELETE /crew/staff/{staffId}`

Request: path `staffId`; no body. Response `200`: `{ "data": { "id": "stf_1", "deleted": true }, "message": "Staff member removed" }`.

### `PATCH /crew/staff/{staffId}/status`

Request: `{ "status": "active" }` where status is `active`, `inactive`, or `suspended`. Response `200`: `{ "data": { "id": "stf_1", "status": "inactive" } }`.

### `GET /crew/staff/{staffId}/permissions`

Request: path `staffId`. Response `200`: `{ "data": { "staffId": "stf_1", "permissions": ["orders.read", "orders.create"] } }`.

### `PATCH /crew/staff/{staffId}/permissions`

Request: `{ "permissions": ["orders.read", "orders.create", "inventory.read"] }`. Response `200`: `data` contains `staffId` and the saved `permissions` array.

### `GET /crew/staff/summary`

Request: no body. Response `200`: `{ "data": { "total": 18, "active": 15, "inactive": 2, "pendingInvitations": 1 } }`.

---

## Leave Requests

### `GET /crew/leave-requests`

Request: query `status`, `staffId`, `dateFrom`, `dateTo`, `page`, and `pageSize`. Response `200`: paginated requests such as `{ "id": "leave_1", "staffId": "stf_1", "startDate": "2026-08-25", "endDate": "2026-08-27", "reason": "Personal", "status": "pending" }`.

### `POST /crew/leave-requests`

Request: `{ "startDate": "2026-08-25", "endDate": "2026-08-27", "reason": "Personal" }`. Response `201`: created leave request with `id`, `staffId`, `status: "pending"`, and timestamps.

### `GET /crew/leave-requests/{requestId}`

Request: path `requestId`. Response `200`: `data` is one leave request.

### `PATCH /crew/leave-requests/{requestId}`

Request: path `requestId`; body contains editable fields such as `{ "endDate": "2026-08-28", "reason": "Updated plan" }`. Response `200`: updated leave request.

### `PATCH /crew/leave-requests/{requestId}/status`

Request: `{ "status": "approved", "comment": "Coverage confirmed" }`. Response `200`: `{ "data": { "id": "leave_1", "status": "approved", "reviewedAt": "2026-08-19T10:30:00Z" } }`.

---

## Profile

### `GET /me`

Request: no body. Response `200`:

```json
{
  "data": {
    "id": "usr_123",
    "name": "Ada Manager",
    "email": "manager@example.com",
    "phone": "+2348000000000",
    "avatarUrl": null,
    "businessCategory": "Food and Beverage"
  }
}
```

### `PATCH /me`

Request: `{ "name": "Ada Manager", "phone": "+2348000000000" }`. Response `200`: updated profile resource.

### `POST /me/avatar`

Request: `multipart/form-data` with `file`. Response `201`: `{ "data": { "avatarUrl": "https://cdn.example.com/avatars/usr_123.jpg" } }`.

### `PATCH /me/business-category`

Request: `{ "businessCategory": "Food and Beverage" }`. Response `200`: `{ "data": { "businessCategory": "Food and Beverage" } }`.

### `PATCH /me/password`

Request: `{ "currentPassword": "OldP@ssword", "newPassword": "NewP@ssword123" }`. Response `200`: `{ "data": { "updated": true }, "message": "Password updated" }`.

---

## Permissions and Staff App Settings

### `GET /crew/roles`

Request: no body. Response `200`: `{ "data": [{ "id": "cashier", "name": "Cashier", "permissions": ["orders.read", "orders.create"] }] }`.

### `GET /crew/permissions`

Request: no body. Response `200`: `{ "data": { "permissions": ["orders.read", "orders.create", "inventory.read"], "overrides": {} } }`.

### `PATCH /crew/permissions`

Request: `{ "permissions": ["orders.read", "inventory.read"] }`. Response `200`: saved permissions resource.

### `GET /crew/staff-app-settings`

Request: no body. Response `200`: `{ "data": { "requirePin": true, "allowOfflineOrders": false, "defaultLandingPage": "orders" } }`.

### `PATCH /crew/staff-app-settings`

Request: `{ "requirePin": true, "allowOfflineOrders": false, "defaultLandingPage": "orders" }`. Response `200`: updated settings resource.

### `GET /crew/notification-preferences`

Request: no body. Response `200`: `{ "data": { "email": true, "push": true, "lowStock": true, "staffActivity": false } }`.

### `PATCH /crew/notification-preferences`

Request: `{ "email": true, "push": true, "lowStock": false, "staffActivity": true }`. Response `200`: updated preferences resource.

---

## Billing

### `GET /billing/plans`

Request: no body. Response `200`: `{ "data": [{ "id": "pro", "name": "Pro", "amount": 25000, "interval": "month", "currency": "NGN", "features": ["Reports", "Staff management"] }] }`.

### `GET /billing/subscription`

Request: no body. Response `200`: `{ "data": { "id": "sub_123", "planId": "pro", "status": "active", "currentPeriodEnd": "2026-09-19T00:00:00Z" } }`.

### `POST /billing/subscription`

Request: `{ "planId": "pro", "paymentMethodId": "pm_123" }`. Response `201`: created subscription resource.

### `PATCH /billing/subscription`

Request: `{ "planId": "enterprise" }` or `{ "cancelAtPeriodEnd": true }`. Response `200`: updated subscription resource.

### `GET /billing/invoices`

Request: query `status`, `dateFrom`, `dateTo`, `page`, and `pageSize`. Response `200`: paginated invoices such as `{ "id": "inv_123", "number": "INV-1001", "amount": 25000, "currency": "NGN", "status": "paid", "issuedAt": "2026-08-19T00:00:00Z" }`.

### `GET /billing/invoices/{invoiceId}/download`

Request: path `invoiceId`. Response `200`: `{ "data": { "downloadUrl": "https://files.example.com/invoices/inv_123.pdf", "expiresAt": "2026-08-19T11:30:00Z" } }`.

### `GET /billing/payment-methods`

Request: no body. Response `200`: `{ "data": [{ "id": "pm_123", "type": "card", "brand": "visa", "last4": "4242", "isDefault": true }] }`.

### `POST /billing/payment-methods`

Request: `{ "paymentMethodToken": "pm_token_from_payment_provider", "makeDefault": true }`. Response `201`: saved payment method resource. Do not send raw card numbers to the API.

### `DELETE /billing/payment-methods/{paymentMethodId}`

Request: path `paymentMethodId`; no body. Response `200`: `{ "data": { "id": "pm_123", "deleted": true } }`.

---

## Messages

### `GET /crew/conversations`

Request: query `search`, `status`, `page`, and `pageSize`. Response `200`: `{ "data": [{ "id": "cnv_1", "subject": "Order issue", "status": "open", "unreadCount": 2, "updatedAt": "2026-08-19T10:30:00Z" }], "meta": { "page": 1, "pageSize": 25, "total": 4, "totalPages": 1 } }`.

### `POST /crew/conversations`

Request: `{ "subject": "Order issue", "message": "Please help with order ORD-10023" }`. Response `201`: created conversation with `id`, `subject`, `status`, and first message.

### `GET /crew/conversations/{conversationId}`

Request: path `conversationId`. Response `200`: conversation resource including participants and latest message.

### `GET /crew/conversations/{conversationId}/messages`

Request: path `conversationId`; query `page` and `pageSize`. Response `200`: paginated messages such as `{ "id": "msg_1", "senderId": "usr_123", "body": "Please help", "attachments": [], "createdAt": "2026-08-19T10:30:00Z" }`.

### `POST /crew/conversations/{conversationId}/messages`

Request: `{ "body": "We are investigating this order." }`. Response `201`: created message resource.

### `POST /crew/conversations/{conversationId}/attachments`

Request: `multipart/form-data` with `file`. Response `201`: `{ "data": { "id": "att_1", "fileName": "receipt.jpg", "url": "https://cdn.example.com/messages/att_1.jpg", "contentType": "image/jpeg" } }`.

### `POST /crew/conversations/{conversationId}/read`

Request: no body. Response `200`: `{ "data": { "conversationId": "cnv_1", "unreadCount": 0 } }`.

---

## Notifications

### `GET /crew/notifications`

Request: query `read`, `type`, `page`, and `pageSize`. Response `200`: `{ "data": [{ "id": "ntf_1", "type": "low_stock", "title": "Low stock", "body": "Lunch Bowl is running low", "read": false, "createdAt": "2026-08-19T10:30:00Z" }], "meta": { "page": 1, "pageSize": 25, "total": 12, "totalPages": 1 } }`.

### `PATCH /crew/notifications/{notificationId}/read`

Request: no body. Response `200`: `{ "data": { "id": "ntf_1", "read": true, "readAt": "2026-08-19T10:35:00Z" } }`.

### `POST /crew/notifications/read-all`

Request: no body. Response `200`: `{ "data": { "updatedCount": 12 }, "message": "Notifications marked as read" }`.

---

## Help and Support

### `GET /support/faqs`

Request: optional query `search` and `category`. Response `200`: `{ "data": [{ "id": "faq_1", "question": "How do I adjust stock?", "answer": "...", "category": "inventory" }] }`.

### `GET /support/contact-options`

Request: no body. Response `200`: `{ "data": [{ "type": "live_chat", "label": "Live chat", "available": true }, { "type": "phone", "label": "Call support", "available": true }] }`.

### `GET /crew/support/tickets`

Request: query `status`, `search`, `page`, and `pageSize`. Response `200`: `{ "data": [{ "id": "tkt_1", "subject": "Payment issue", "status": "open", "priority": "normal", "updatedAt": "2026-08-19T10:30:00Z" }], "meta": { "page": 1, "pageSize": 25, "total": 2, "totalPages": 1 } }`.

### `POST /crew/support/tickets`

Request: `{ "subject": "Payment issue", "category": "billing", "priority": "normal", "message": "A payment is still pending." }`. Response `201`: created ticket with `id`, `status: "open"`, and first message.

### `GET /crew/support/tickets/{ticketId}`

Request: path `ticketId`. Response `200`: ticket resource including messages, attachments, and timestamps.

### `PATCH /crew/support/tickets/{ticketId}`

Request: `{ "subject": "Updated payment issue", "priority": "high" }`. Response `200`: updated ticket resource.

### `POST /crew/support/tickets/{ticketId}/messages`

Request: `{ "body": "Here is additional context." }`. Response `201`: created ticket message resource.

### `POST /crew/support/tickets/{ticketId}/attachments`

Request: `multipart/form-data` with `file`. Response `201`: `{ "data": { "id": "att_1", "fileName": "receipt.pdf", "url": "https://cdn.example.com/support/att_1.pdf", "contentType": "application/pdf" } }`.

### `POST /crew/support/tickets/{ticketId}/close`

Request: optional `{ "reason": "Issue resolved" }`. Response `200`: `{ "data": { "id": "tkt_1", "status": "closed", "closedAt": "2026-08-19T10:40:00Z" }, "message": "Support ticket closed" }`.
