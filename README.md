# React Frontend — Standard Coding Guide (Secure, Maintainable)

**Purpose:** A concise, opinionated standard for building secure, maintainable React frontend applications. Includes folder structure, conventions, security practices, and copy‑pasteable examples (TypeScript recommended).

---

## 1. Principles

* **Single Responsibility**: UI components render; hooks/services contain logic and side effects.

* **Small, composable components**: Prefer many small components over few large ones.

* **Separation of concerns**: Presentation (components) vs state/logic (hooks/services) vs persistence (API clients/repositories).

* **Explicit input validation**: Validate at the form level before sending to the API.

* **Secure by default**: Minimize client-side secret exposure, prefer HttpOnly cookies for tokens, use CSP, and sanitize/safeguard user input.

---

## 2. Project / Folder Structure (recommended)

```
src
|
+-- app                         # application layer containing:
|   |                           # this folder might differ based on the meta framework used
|   +-- routes                  # application routes / can also be pages
|   |   +-- AuthRoutes.tsx
|   |   +-- DashboardRoutes.tsx
|   |   +-- Layouts/            # AppLayout, ProtectedLayout, RootLayout, SuspenseLayout
|   |   +-- MasterfileRoutes/
|   +-- provider.tsx            # application provider that wraps the entire application with different global providers - this might also differ based on meta framework used
|   +-- router.tsx              # application router configuration
|
+-- assets                      # assets folder can contain all the static files such as images, fonts, etc.
|   +-- images/
|
+-- components                  # shared components used across the entire application
|   +-- DataTable/              # reusable data table components
|   +-- Fields/                 # InputField, SelectField, TextAreaField
|   +-- Forms/                  # form components
|   +-- ui/                     # Shadcn UI components
|
+-- config                      # global configurations, exported env variables etc.
|   +-- axiosInstance.ts
|   +-- reactQueryClient.ts
|
+-- features                    # feature based modules
|   +-- auth/
|   +-- masterfile/
|   +-- shared/
|   +-- utilities/
|
+-- hooks                       # shared hooks used across the entire application
|   +-- useAuth.tsx
|   +-- useGetMenuList.tsx
|
+-- integrations                # third-party integrations
|   +-- supabase/               # Supabase client configuration
|
+-- lib                         # reusable libraries preconfigured for the application
|   +-- validation.ts           # Zod validation helpers
|   +-- toast.ts                # toast notification utilities
|   +-- utils.ts                # general utilities
|
+-- pages                       # route-level page components
|   +-- auth/
|   +-- masterfile/
|
+-- providers                   # React context providers
|
+-- stores                      # global state stores
|   +-- useAuthStore.tsx
|   +-- useConfirmStore.tsx
|
+-- utils                       # shared utility functions
|   +-- exportTableExcel.ts
|   +-- printTablePdf.ts
|
+-- App.tsx                     # main application component
+-- main.tsx                    # application entry point
```

**Example Feature Structure:**

```
src/features/masterfile
|
+-- api/                    # API endpoints for masterfile operations
+-- components/             # MasterfileField, MasterfileForm, MasterfilePageWrapper
+-- hooks/
|   +-- queries/            # useGetMasterfilesQuery
|   +-- mutations/          # useCreateItemMutation, useUpdateItemMutation, useDeleteItemMutation
+-- types/                  # IMasterFileField, MasterfilePageWrapperProps, etc.
+-- utils/                  # feature-specific utilities
+-- company-details/        # sub-feature modules
+-- employees/              # sub-feature modules
+-- general-setup/          # sub-feature modules
+-- payroll/                # sub-feature modules
+-- recruitment/            # sub-feature modules
```

**Folder Structure Tutorial:** [https://www.youtube.com/watch?v=_bIJoOriBxA](https://www.youtube.com/watch?v=_bIJoOriBxA)

---

## 3. Tech Stack & Tooling

* **Language:** TypeScript (strict mode)

* **Bundler/Dev:** Vite with React

* **Routing:** React Router v6

* **Forms/Validation:** react-hook-form + Zod

* **HTTP client:** axios with interceptors

* **Auth:** Supabase Auth with role-based access control (RBAC)

* **State:** React Query (TanStack) for server state, Zustand for client state if needed

* **Styling:** Tailwind CSS + Shadcn UI (Radix UI primitives)

* **Linting & formatting:** ESLint + Prettier

* **Testing:** Jest + React Testing Library; MSW for API mocking

* **CI/CD:** GitHub Actions / GitLab CI for lint/test/build

---

## 4. Coding Standards

* Follow ESLint + Prettier and a consistent style (Airbnb + TypeScript rules)

* Use named exports for utilities, default exports for components

* Type everything (props, return types) where possible

* Keep components pure and free of side effects — use hooks for effects

* Prefer explicit prop interfaces over `React.FC`

* **No `any` or `unknown`**: Use explicit types or `JsonValue` for API responses


* **Avoid enums**: Use maps or objects instead

* **Tabs with 4-space width**: Consistent indentation

---

## 4.1. Import Organization

Imports should be organized into logical groups with comment separators. Follow this order:

1. **React** - React imports (if any, otherwise skip this section)
2. **Libs** - External libraries (react-hook-form, lucide-react, etc.)
3. **Features** - Feature-specific imports (using feature aliases)
4. **Components** - UI components and custom components (using component aliases)
5. **Utils** - Utility functions, shared hooks

Within each group, sort imports alphabetically by the import path.

**Note:** The examples below use generic fictional paths. Replace with your actual project structure and aliases.

### Examples

**Example 1: Page Component**
```tsx
import { useState } from "react";

// Features
import { useGetProducts } from '@features/products/hooks/useGetProducts';
import { useProductActions } from '@features/products/hooks/useProductActions';
import { IProduct } from '@features/products/types';

// Components
import ProductList from '@/components/ProductList';
import PageTitle from '@/components/PageTitle';
import AddButton from '@/components/AddButton';

// Utils
import useFilter from '@/utils/useFilter';

// Libs
import { Plus } from "lucide-react";
```

**Example 2: Feature Component**
```tsx
import { useCallback } from "react";

// Components
import ProductModal from '@/components/ProductModal';
import TextField from '@/components/TextField';
import FormWrapper from '@/components/FormWrapper';
import SaveButton from '@/components/SaveButton';

// Features
import { IProduct } from '@features/products/types';
import { useCreateProduct } from '@features/products/hooks/useCreateProduct';
import { productSchema } from '@features/products/schema';

// Libs
import { useForm } from 'react-hook-form';
```

**Example 3: Simple Component**
```tsx
// Components
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Form from '@/components/Form';

// Libs
import { useForm } from 'react-hook-form';
import { Check, X } from 'lucide-react';
```

---

## 5. Security Checklist (Frontend)

* Use HTTPS for all API calls.

* Prefer HttpOnly, Secure, SameSite=strict cookies for auth tokens (Supabase handles this).

* Implement CSRF protection if using cookies (double-submit cookie or backend-provided token).

* Sanitize any HTML rendered from user content (DOMPurify).

* Implement rate-limiting on the backend; show exponential backoff on 429 client-side.

* Avoid embedding secrets or API keys in JS — use backend proxies for privileged calls.

* Keep dependencies up to date and run `npm audit` in CI.

---

## 6. Routing & Auth (example)

```tsx
// src/app/router.tsx
import { BrowserRouter, Routes } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "@/hooks/useAuth";

export const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>{AppRoutes()}</Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};
```

```tsx
// src/components/ProtectedRoute.tsx
export function ProtectedRoute({ children, requireAdmin = false }) {
    const { user, userRole, loading } = useAuth();

    if (loading) return <PageLoader />;
    if (!user) return <Navigate to="/auth" replace />;
    if (requireAdmin && userRole !== "admin") return <Navigate to="/dashboard" replace />;

    return <>{children}</>;
}
```

---

## 7. API Client (axios with interceptors - optional)

```ts
// src/config/axiosInstance.ts
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: { 'Content-Type': 'application/json' },
    // withCredentials: true, // send cookies
});

export default axiosClient;
```

---

## 8. Components, Hooks & Services (examples)

### Presentational component

```tsx
// src/components/Button.tsx
const Button = ({ children, className ...props }: ComponentProps<"button">) => {
    return (
        <button {...props} className={cn("px-4 py-2 rounded shadow", className && className)}>
            {children}
        </button>
    );
}

export default Button;
```

### Service (business logic)

```ts
// src/features/masterfile/api/index.ts
import axiosClient from '@/config/axiosInstance';

export const getMasterfiles = (params: IListQueryParams) => {
    const { data } = axiosClient.get('/masterfiles', { params });
    return data;
};
```

### Hook (compose behavior)

```ts
// src/features/masterfile/hooks/queries/useGetMasterfilesQuery.ts
import { useQuery } from '@tanstack/react-query';
import { getMasterfiles } from '../api';

export const useGetMasterfilesQuery = (params: IListQueryParams) => {
    return useQuery({
        queryKey: ['masterfiles', params],
        queryFn: () => getMasterfiles(params),
    });
};
```

---

## 9. Forms & Validation Example

```tsx
// src/pages/Register.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from '@/lib/validation';

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
}).refine(data => data.password === data.passwordConfirm, { 
    message: 'Passwords must match', 
    path: ['passwordConfirm'] 
});

export default function Register() {
    const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });
    const mutation = useCreateUser();

    return (
        <form onSubmit={handleSubmit((vals) => mutation.mutate(vals))}>
            <input {...register('name')} />
            <input {...register('email')} />
            <input type="password" {...register('password')} />
            <input type="password" {...register('passwordConfirm')} />
            <button disabled={mutation.isLoading}>Create</button>
        </form>
    );
}
```

---

## 10. Error Handling & UX

* Centralize API error handling in axios interceptors; map known errors to friendly messages.

* Show inline field errors for validation failures.

* Global error boundary (React `ErrorBoundary`) for rendering fallback UI.

* Track errors in Sentry or similar.

```ts
// src/features/shared/utils/handleFormError.ts
import toast from '@/lib/toast';

export function handleFormError(err: unknown, setError: UseFormSetError, toastId?: string | number) {
    const maybeAxios = err as { response?: { data?: { message?: unknown } } };
    const payload = maybeAxios?.response?.data?.message as Record<string, unknown> | undefined;

    if (payload && typeof payload === 'object') {
        applyBackendErrorsToForm(setError, payload as Record<string, string[] | string>);
    }

    toast.error('Something went wrong', { id: toastId });
}
```

---

## 11. Authorization (client-side checks)

* Keep authorization checks on the **server**. Client only hides UI elements (optimistic UX).

* Use token scopes/claims and decode them if needed, but never trust client checks.

* Supabase RLS policies handle server-side authorization.

---

## 12. Performance & Best Practices

* Code-splitting with `React.lazy` and route-based splitting.

* Use React Query caching and background refresh for API data.

* Avoid unnecessary re-renders: memoize components and handlers (`useCallback`, `useMemo`) judiciously.


```ts
// src/config/reactQueryClient.ts
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,       // 5 minutes
            gcTime: 1000 * 60 * 10,         // 10 minutes
            refetchOnWindowFocus: false,
            retry: 1,
        }
    }
});
```

---

## 13. Accessibility

* Use semantic HTML.

* Use Helmet (react-helmet-async) to manage page titles and meta tags.

---

## 14. Testing

* Unit tests for hooks and utilities.

* Component tests with React Testing Library.

* Integration/feature tests simulating user flows with MSW for API responses.

---

## 15. Useful Commands

```bash
# create project
npm create vite@latest my-app -- --template react-ts

# add libs
npm i axios react-router-dom react-hook-form zod @hookform/resolvers @tanstack/react-query zustand

# dev
npm run dev

# build
npm run build

# lint
npm run lint

# format
npm run format:write

# test
npm test
```

---

## 16. Example Checklist Before Production

* HTTPS enforced and API base points to secure domain

* Token strategy documented (Supabase Auth handles tokens)

* Performance budgets and accessibility check

* Build succeeds without errors

* TypeScript compilation passes

---

**Last Updated:** 2025
