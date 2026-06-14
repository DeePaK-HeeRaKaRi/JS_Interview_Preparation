/*
Pagination (News Feed)
Why Not Offset Pagination?

Example:

GET /feed?page=5&limit=20

Problems:

Slow for large datasets (OFFSET 100000)
Duplicate records if new posts are inserted
Missing records if posts are deleted
Not suitable for real-time feeds

Example:

User loads page 1

Post A
Post B
Post C

New post inserted

User loads page 2

Duplicate or skipped posts possible
Cursor-Based Pagination (Preferred)

API:

GET /feed?cursor=abc123&limit=20

Response:

{
  "posts": [...],
  "nextCursor": "xyz789",
  "hasMore": true
}

Frontend stores:

{
  pages: [...],
  nextCursor: "xyz789"
}

------------------------------------------------------
Data Model

type Post = {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthState = {
  currentUser: User | null;
  roles: string[];
  permissions: string[];
  entitlements: string[];
};

type FeatureFlagState = {
  newFeedEnabled: boolean;
  enableVideoAutoplay: boolean;
  enableAiSummary: boolean;
};

type FeedUIState = {
 scrollPosition: number;
  theme: "light" | "dark";
  locale: string;
  selectedPostId: string | null;
  isImageViewerOpen: boolean;
};

type ImageViewerState = {
  isOpen: boolean;
  currentImageIndex: number;
  images: string[];
};

type FeedResponse = {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
};

 
type FeedResponse = {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
};

Domain Models define the frontend view models.
Server State is managed using React Query. > [Caching, Refetching, Pagination, Cache Invalidation]
Client State is managed using Zustand.
Roles, Entitlements, Permissions and Feature Flags are initialized from APIs and stored in Client State for fast access across the application.

------------------------------------------------------
Virtualization

Problem:

10000 Feed Items

Don't render all.

Use:

react-window
react-virtual

Flow:

Feed Data
      ↓
Virtualized List
      ↓
Render Visible Items Only

Benefits:

Lower memory usage
Faster rendering
Better scrolling performance
------------------------------------------------------
All the social media posts have to be SEO-heavy; thus, 
we will have to make use of server-side rendering for generating the HTML boilerplate of the homepage and the individual post page.

News Feed is SEO-sensitive, so I would use SSR to generate the initial HTML and improve LCP and search engine indexing.

After the page loads, React hydrates the application and takes over on the client side.

To reduce bundle size, I would use code splitting.
 For heterogeneous feed items such as Photo Posts and Video Posts, GraphQL @module directives (or React.lazy) allow loading only the components required for the content currently being rendered.
*/