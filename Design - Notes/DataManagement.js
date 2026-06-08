
/*
https://blog.ranveerkumar.com/articles/high-density-data-management-in-frontend-virtualization-pagination-caching-memory

High-Density Data Management in Frontend: Virtualization, Pagination, Caching, and Memory Discipline

Clarify:

Expected data volume: 
    rows, columns, nested entities, and retention window.

Interaction model: 
    scan, edit, compare, bulk select, drill down, export, approve, or monitor.

Query shape:
    filters, sorting, search, grouping, and aggregation.

Freshness requirement: 
    real time, near real time, refresh on action, or stable snapshot.

Consistency requirement: 
    latest state, point-in-time state, or auditable sequence.

Device constraints: 
    desktop-only, tablet, low-memory browser, or shared workstation.

Accessibility constraints: 
    table semantics, keyboard range selection, focus retention, and announcements.

Operational constraints: error recovery, rate limits, cache invalidation, and telemetry.

ARCHITECTURE:

Query Model (URL + controls) --> API Delegation --> Cache shape --> Virtualized View Port --> Row UI

-> Query boundary defines what the user is asking for: filters, search, sort, page cursor, column visibility, grouping, time range, and permission scope
    Remember the url should be sharable to others

-> API Delegation > expensive things GET /employees?search=john&page=1

-> Cache in frontend {
  "page=1": [...],
  "page=2": [...],
  "page=3": [...]
}

{
  "employees?page=3&sort=salary_desc&department=engineering":
      [...]
}
      Now every unique query has its own cache.


Advanced Cache Shape

Sometimes normalize:

{
  employeesById: {
    1: {...},
    2: {...},
    3: {...}
  },

  pages: {
    page1: [1,2,3],
    page2: [4,5,6]
  }
}

-> Virtualized view port
Suppose: 100000 rows 

Even if you have data cached:
    rows.length = 100000

    Do NOT render: rows.map(...)

because:

100000 DOM nodes

Browser dies.

Instead use virtualization.

Libraries:

react-window
react-virtualized
TanStack Virtual


Cache invalidation
Scenario

You have cached:

{
  "employees?page=1": [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Bob" }
  ]
}

User deletes:

id = 2

Backend successfully deletes it.

Now cache is stale.

Approach 1: Invalidate and Refetch (Most Common)

After delete:

await deleteEmployee(2);

queryClient.invalidateQueries(["employees"]);

React Query:

queryClient.invalidateQueries({
  queryKey: ["employees"]
});

Now:

employees?page=1
employees?page=2
employees?search=john
employees?department=engineering

all become stale.

Next access:

GET /employees?page=1

Fresh data comes from server.
==============================================
Approach 2: Optimistic Update

Instead of waiting:

queryClient.setQueryData(...)

Immediately remove row from cache.

Before:

[
 {id:1},
 {id:2},
 {id:3}
]

After:

[
 {id:1},
 {id:3}
]

UI updates instantly.

Backend call happens in background.

If backend fails:

rollback()

Restore previous cache.

Used heavily by:

Facebook
Twitter/X
Notion

for snappy UX.
==========================================================
Approach 3: Entity-Based Cache (Most Scalable)

Remember the normalized cache:

{
  employeesById: {
    1: {...},
    2: {...},
    3: {...}
  },

  pages: {
    page1: [1,2,3]
  }
}

Delete:

delete employeesById[2];

and

page1 = [1,3];

Every component automatically sees updated data.

This scales very well.


========================================================
So when you apply filter 

-------------------------------------------------------------
Case 1: Non-normalized cache

Suppose your cache is:

{
  "department=engineering": [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Bob" }
  ],

  "department=sales": [
    { id: 4, name: "Mike" },
    { id: 5, name: "Tom" }
  ]
}

Now you delete:

id = 2

and only update:

delete employeesById[2]

Wait...

There is no employeesById here.

The actual employee object is duplicated inside the filter cache.

So the cache still contains:

{
  "department=engineering": [
    { id: 1 },
    { id: 2 }, // stale
    { id: 3 }
  ]
}

If the user applies the Engineering filter again, yes:

✅ Deleted employee still appears.

This is the problem with denormalized caches.
-------------------------------------------------------------
Case 2: Normalized cache (Approach 3)

Instead of storing employee objects everywhere:

{
  employeesById: {
    1: { id: 1, name: "John" },
    2: { id: 2, name: "Alice" },
    3: { id: 3, name: "Bob" }
  },

  filters: {
    engineering: [1, 2, 3]
  }
}

Notice:

filters store IDs
actual data stored only once

Now delete:

delete employeesById[2];

Cache becomes:

{
  employeesById: {
    1: {...},
    3: {...}
  },

  filters: {
    engineering: [1,2,3]
  }
}

Now rendering happens like:

engineeringIds
  .map(id => employeesById[id])
  .filter(Boolean);

Step-by-step:

1 -> found
2 -> undefined
3 -> found

Result:

[
  { id: 1 },
  { id: 3 }
]

Employee 2 disappears automatically.

But...

There is still a stale ID:

engineering: [1,2,3]

So many systems also clean it:

engineering = engineering.filter(id => id !== 2);

Final:

engineering: [1,3]
*/