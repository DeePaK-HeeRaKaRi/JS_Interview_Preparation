
/*
schema -> resolver context -> field registry -> renderer contract -> validation and submit

schema - > what to render
const schema = {
  title: "Create Employee",
  fields: [
    {
      type: "text",
      name: "firstName"
    },
    {
      type: "email",
      name: "email"
    }
  ]
};
----------------------------------
resolver context:

{
  "type": "select",
  "name": "department",
  "optionsSource": "/api/departments"
}

The actual options aren't present. Need to fetch them.

A resolver resolves missing data.

async function departmentResolver() {
   const res = await api.get("/departments");

   return res.data;
}

Now we maintain:

const resolverContext = {
   departments: [...]
}

Schema:

{
  "type": "select",
  "name": "department",
  "resolver": "departments"
}

Schema = What I need
Resolver = Fetch it
Context = Store resolved data

Another example is feature flags tosow the field or not 

const schema = {
  fields: [
    {
      type: "text",
      name: "employeeName",
      label: "Employee Name"
    },
    {
      type: "number",
      name: "salary",
      label: "Salary"
    },
    {
      type: "text",
      name: "taxId",
      label: "Tax ID",
      featureFlag: "newPayroll"
    }
  ]
};

Maybe frontend fetches:

GET /feature-flags

Response:

{
  newPayroll: true
}

or

{
  newPayroll: false
}
3. Build Resolver Context
const resolverContext = {
  featureFlags: {
    newPayroll: false
  }
};
4. Rule Evaluation

Before rendering:

function isVisible(field, context) {
  if (!field.featureFlag) {
    return true;
  }

  return context.featureFlags[field.featureFlag];
}
5. Renderer
schema.fields
  .filter(field => isVisible(field, resolverContext))
  .map(field => {
    const Component = registry[field.type];

    return (
      <Component
        key={field.name}
        schema={field}
      />
    );
  });
----------------------------------
Field Registry

This is the heart of scalable systems.

Without registry:

if(type === "text") ...
if(type === "email") ...
if(type === "select") ...
if(type === "date") ...

Becomes ugly.

Instead:

const registry = {
   text: TextField,
   email: EmailField,
   select: SelectField,
   date: DateField
};

Now schema:

{
  "type": "text"
}

Lookup:

const Component = registry[field.type];
return <Component />

Think:

Registry = Dictionary

"text" -> TextField
"select" -> SelectField
"date" -> DateField

Adding a new field:

registry.rating = RatingField;

No renderer changes.

This is why registries are powerful.
--------------------------------------------------------

Renderer Contract

Every field component must obey a contract.

Bad:

<TextField value={x} />

<SelectField selected={x} />

<DateField currentValue={x} />

Different APIs.

Renderer becomes messy.

Instead define contract:

interface FieldProps {
   value: any;
   onChange(value:any): void;
   schema: FieldSchema;
   error?: string;
}

Every field follows it.

<TextField
   value={value}
   onChange={onChange}
   schema={schema}
/>
<SelectField
   value={value}
   onChange={onChange}
   schema={schema}
/>

export const fieldRegistry = {
  text: textFieldRenderer,
  select: selectFieldRenderer,
  date: dateFieldRenderer,
  money: moneyFieldRenderer,
  textarea: textareaFieldRenderer,
  checkbox: checkboxFieldRenderer
} satisfies Record<FieldSchema["type"], FieldRenderer>;

Renderer doesn't care what component it renders.

This is called a renderer contract.

Think:

Every field plugs into the renderer
through the same socket.

Now renderer becomes tiny.

function FormRenderer({ schema }) {
   return schema.fields.map(field => {
      const Component = registry[field.type];

      return (
         <Component
             key={field.name}
             schema={field}
         />
      );
   });
}

Renderer doesn't know:

text
date
select

It just delegates.

---------------------------------------------------------

Validation Layer 3 validations [ sync rules -> cross-field validators -> Async Validators ]


Sync Rules - Required Min Length, Max Length, Regex, Numeric Range, Date Range
Schema can contain rules.

{
  "type": "text",
  "name": "firstName",
  "required": true,
  "minLength": 3
}

Validation engine:

function validate(field, value) {
   if(field.required && !value) {
      return "Required";
   }

   if(field.minLength &&
      value.length < field.minLength) {
      return "Too short";
   }
}

Cross Field Validators - Start Date < End Date, Password = Confirm Password
{
  "name": "confirmPassword",
  "validations": [
    {
      "type": "matchesField",
      "field": "password"
    }
  ]
}

Async Validators - Username already exists?, Email already exists?, Employee ID already exists?, Coupon code valid?, Tax ID valid?
{
  "name": "username",
  "validations": [
    {
      "type": "async",
      "resolver": "checkUsername"
    }
  ]
}
  const validationResolvers = {
  checkUsername: async (value) => {
    const res =
      await api.get(`/users/check?username=${value}`);

    return res.available;
  }
};





Renderer:

const error = validate(field, value);

Now validation comes from schema.

Backend can change rules without redeploying frontend.

-----------------------------------------------------------
Submit Pipeline

After filling form:

{
   firstName: "Deepak",
   email: "abc@test.com",
   department: "eng"
}

Submit:

async function submit(values) {
   await api.post(
      "/employees",
      values
   );
}

-----------------------------------

Complete Flow
Backend
   │
   ▼
Schema
   │
   ▼
Resolvers
(fetch async data)
   │
   ▼
Resolver Context
   │
   ▼   {
      featureFlags,
      permissions,
      user,
      entitlements
   }
   ↓
Rule Engine
   │
   ▼
Field Registry
(type -> component)
   │
   ▼
Renderer
   │
   ▼
User Input
   │
   ▼
Validation Engine
   │
   ▼
Transform Values
   │
   ▼
Submit API

---------------------------------------------------

SCHEMA

type VisibilityRules {
    operator: AND | OR,
    conditions : Condition[]
}

type Condition =
  | {
      type: "featureFlag";
      key: string;
    }
  | {
      type: "permission";
      key: string;
    }
  | {
      type: "role";
      value: string[];
    };

{  
  "type": "text",
  "name": "taxId",
  "label": "Tax ID",
  "visibility": {
    "operator": "AND",
    "conditions": [
      {
        "type": "featureFlag",
        "key": "newPayroll"
      },
      {
        "type": "permission",
        "key": "canEditSalary"
      }
    ]
  }
}

Show field only if:

newPayroll enabled
AND
canEditSalary granted

Validation Rules

type ValidationRule =
  | {
      type: "required";
      message: string;
    }
  | {
      type: "minLength";
      value: number;
      message: string;
    }
  | {
      type: "maxLength";
      value: number;
      message: string;
    }
  | {
      type: "pattern";
      value: string;
      message: string;
    };

{
  "name": "firstName",
  "type": "text",
  "validations": [
    {
      "type": "required",
      "message": "First name required"
    },
    {
      "type": "minLength",
      "value": 3,
      "message": "Minimum 3 chars"
    }
  ]
}

interface FieldSchema {
  name: string;
  label: string;
  type: text | select | date | textarea | checkbox | button;

  defaultValue?: unknown;

  visibility?: VisibilityRule;

  validations?: ValidationRule[];

  props?: Record<string, unknown>;
}

--------------------------------------------------------------

Handle Failures

What can be the Faliure Mode and recovery design ?

When designing a schema-driven form system, always think: What can fail?, How do we recover?

=> Schema Fetch Failure

Failure GET /form-schema/employee

500 Network Error Timeout

Without schema:

No UI can be rendered

Recovery :  Retry retry(3)

Cached Schema : CDN Memory Cache LocalStorage, IndexedDB

Render last known schema.

Graceful Error
Unable to load form.
Retry

Architecture:

Schema API
    ↓
Cache
    ↓
Renderer

Cached Schema → Schema Drift / Version Mismatch
Failure Mode
Schema API fails
↓
Use cached schema (v1)
↓
User fills form
↓
Backend now has schema v2
↓
Payload may be invalid

Example:

Cached Schema (v1):
- name
- salary

Server Schema (v2):
- name
- salary
- department (required)

User submits:

{
  "name": "Deepak",
  "salary": 100000
}

Backend rejects because department is missing.

Recovery

✅ Schema Versioning

{
  "schemaVersion": 1
}

Submit:

{
  "schemaVersion": 1,
  "data": {...}
}

Backend detects:

Client Version != Server Version

Returns:

SCHEMA_OUTDATED

Frontend:

Refetch Schema
↓
Revalidate
↓
Rerender Form
↓
Resubmit

Key Takeaway

Cached schema is only a temporary fallback.
Always detect schema drift before or during submit.

----------------------------
2. Resolver Failure

2. Dropdown Resolver Failure
Failure Mode
Department Dropdown
↓
GET /departments fails
↓
Options unavailable
Recovery Decision

Ask:

Can the business operation still be completed?
Case A: Non-Critical Field

Example:

Preferred Language

API fails.

Show field error
Allow form submission
Case B: Critical Field

Example:

Department (Required)

API fails.

User cannot choose a valid department

Recovery:

Show Retry
Disable Submit
Block Workflow
Resolver Criticality
{
  resolver: "departments",
  critical: true
}

Rule:

Critical Resolver Failed
↓
Submission Blocked

Non-Critical Resolver Failed
↓
Degrade Gracefully
---------
If fature flag service fails or permission api fails
Sensitive features:

Hide field
Hide button
Hide action
-----------------
Validation API Failure

Example:

Check Username Availability

Failure:

POST /validate-username

500

Recovery Options

Soft Warning=> Could not verify username., Try again., Retry, Retry validation, Submit anyway

Sometimes allowed.

Depends on business.
-----------------------------------
6. Submit Failure

Most common.

POST /employees 500 or Network disconnected

Recovery : Preserve Form State

Never lose: 50 fields user entered

Keep values. Retry Submission failed. Retry Draft Save

Enterprise products often:

Auto Save Draft

before submission.
--------------------------------------------------
Schema Version Mismatch

Frontend:

supports: text, select date

Backend suddenly sends:

{
  "type": "richEditor"
}

Failure registry["richEditor"]

returns: undefined > UI Crash.

Recovery

Fallback Component: <UnsupportedField />

Display: Field type not supported.

Log telemetry or add any alert
--------------------------------------------------
For every stage:

Schema
→ Resolver
→ Context
→ Validation
→ Submit

I identify failure modes,
contain failures to the smallest scope possible,
degrade gracefully,
preserve user input,
and ensure security-sensitive failures fail closed.
------------------------------------
=====================================================
Performance

Avoid unnecessary re-renders

Bad: Entire form rerenders when one field changes

Good: Field-level subscriptions

Memoized fields

Example: firstName changes -> Only firstName rerenders

Not:

200 fields rerender
Lazy-load heavy components

Example:

Rich Text Editor, Code Editor, File Upload, Map Picker
const RichEditor = lazy(...)

Load only when visible.

Parallelize resolvers

Bad: Departments, Managers, Countries

Good: Promise.all([
  fetchDepartments(),
  fetchManagers(),
  fetchCountries()
])
Cache resolver results

Example: Departments, Countries, Roles

These rarely change.

Cache:

Memory
React Query, SWR, IndexedDB, Virtualization

Example:
1000-field dynamic form, Render only visible fields.

--------------------------------
Accessible Registry Contract

Every field component must support:

id
aria-label
aria-describedby
disabled
required

Accessibility should be enforced through the renderer contract so every field automatically gets 
    labels, keyboard support, focus management, and screen-reader announcements.

--------------------------------------

Security

Never Trust Schema

Backend sends:

{
  "label": "<script>alert(1)</script>"
}

Bad: dangerouslySetInnerHTML XSS.

Sanitize: Labels, Descriptions,Help Text

Never Trust Client Validation

Bad:

Frontend validated, therefore safe

No.

Backend validates again.

Client Validation
+
Server Validation

The UI may hide controls based on permissions, but authorization must always be enforced server-side. 
I would also sanitize schema-driven content and prevent sensitive data from reaching telemetry systems.

----------------------------------------
Observability

Resolver Metrics

Track:

Resolver Success Rate
Resolver Failure Rate
Resolver Latency

Example:

Departments Resolver

95th percentile = 3 sec

Now you know what's slow.

Example Telemetry Events
form_loaded
field_rendered
field_changed
resolver_failed
validation_failed
submit_clicked
submit_success
submit_failed

I would instrument the platform with telemetry around schema loading, resolver execution, validation failures, 
and submission funnels so we can measure reliability and user drop-offs.

   - Resolver latency and failures
   - Validation metrics
   - Submission success rates
   - User funnel tracking


----------------------------------------------------------------
How would you optimize rendering for a large dynamic form?

I would avoid storing the entire form in a state that causes global rerenders.

Instead, I'd use field-level subscriptions where each field subscribes only to its own value and validation state.

This ensures that changing firstName only rerenders the firstName field rather than all 100+ fields in the form.

Visual Comparison

Without Field Subscriptions
firstName changes
        ↓
Form rerenders
        ↓
100 fields rerender

With Field Subscriptions
firstName changes
        ↓
Store updates
        ↓
Only FirstNameField rerenders

Zustand Example

Store:

const useFormStore = create(() => ({
   firstName: "",
   email: ""
}));

Field:

const firstName =
  useFormStore(
    state => state.firstName
  );

Field subscribes only to:

state.firstName

User changes:

email

Result:

Email rerenders

FirstName does NOT rerender

This is one of the biggest performance wins in enterprise forms and is exactly why libraries like:

React Hook Form
Final Form
Zustand

rely heavily on subscription-based updates instead of rerendering the whole form tree.
----------------------------------------------------------------
Internationalization (I18n)

Most candidates forget this.

Bad:

{
  "label": "Department"
}

Better:

{
  "labelKey": "employee.department"
}

Frontend:

labelKey
    ↓
Translation Service
    ↓
Localized Text
*/