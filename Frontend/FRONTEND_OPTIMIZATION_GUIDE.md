# Frontend Performance Optimization Guide

## 📊 Current Issues

### 1. Sequential API Calls
**Problem**: Multiple API calls happening one after another instead of in parallel

**Location**: Dashboard pages, booking pages, admin pages
```javascript
// ❌ BAD: Sequential (slow)
const bookings = await fetch('/api/bookings');
const rooms = await fetch('/api/rooms');
const payments = await fetch('/api/payments');
// Total time: T1 + T2 + T3 (e.g., 300ms + 300ms + 300ms = 900ms)

// ✅ GOOD: Parallel (3x faster)
const [bookings, rooms, payments] = await Promise.all([
    fetch('/api/bookings'),
    fetch('/api/rooms'),
    fetch('/api/payments')
]);
// Total time: max(T1, T2, T3) (e.g., 300ms)
```

### 2. No Component Memoization
**Problem**: Components re-render unnecessarily

```javascript
// ❌ BAD: Always re-renders
function RoomCard({ room }) {
    return <div>{room.name}</div>;
}

// ✅ GOOD: Only re-renders if room changes
import { memo } from 'react';
const RoomCard = memo(function RoomCard({ room }) {
    return <div>{room.name}</div>;
});
```

### 3. Large Bundle Size
**Problem**: All code loaded at once

```javascript
// ❌ BAD: Load everything upfront
import AdminPanel from './pages/AdminPanel';
import UserDashboard from './pages/UserDashboard';

// ✅ GOOD: Lazy load (code splitting)
import { lazy, Suspense } from 'react';
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
    <AdminPanel />
</Suspense>
```

### 4. No Image Optimization
**Problem**: Large images not compressed or lazy-loaded

```javascript
// ❌ BAD: Always download full size
<img src="/images/hotel-room.jpg" alt="Room" />

// ✅ GOOD: Lazy load + responsive images
<img 
    src="/images/hotel-room-small.jpg" 
    srcSet="/images/hotel-room-medium.jpg 800w, /images/hotel-room-large.jpg 1600w"
    alt="Room"
    loading="lazy"
/>
```

### 5. Inefficient State Management
**Problem**: Entire component tree re-renders on state change

```javascript
// ❌ BAD: Context causes all subscribers to re-render
const BookingContext = createContext();

// ✅ GOOD: Split context and memoize
const BookingDataContext = createContext();
const BookingUpdateContext = createContext();
```

### 6. No Request Debouncing/Throttling
**Problem**: Too many API calls on user input

```javascript
// ❌ BAD: API call on every keystroke
const handleSearch = (e) => {
    fetch(`/api/search?q=${e.target.value}`);
};

// ✅ GOOD: Debounce
import { debounce } from 'lodash';
const debouncedSearch = debounce((query) => {
    fetch(`/api/search?q=${query}`);
}, 300);

const handleSearch = (e) => {
    debouncedSearch(e.target.value);
};
```

## 🚀 Optimization Tasks

### Priority 1: Parallel API Calls (Quick Win - 30 min)
**Impact**: 40% page load time reduction

```javascript
// In Dashboard.jsx - BEFORE
useEffect(() => {
    const fetchData = async () => {
        const b = await fetchBookings();
        const r = await fetchRooms();
        const p = await fetchPayments();
        setData({bookings: b, rooms: r, payments: p});
    };
    fetchData();
}, []);

// In Dashboard.jsx - AFTER
useEffect(() => {
    const fetchData = async () => {
        const [b, r, p] = await Promise.all([
            fetchBookings(),
            fetchRooms(),
            fetchPayments()
        ]);
        setData({bookings: b, rooms: r, payments: p});
    };
    fetchData();
}, []);
```

### Priority 2: Memoize Components (Quick Win - 30 min)
**Impact**: Unnecessary re-renders eliminated

```javascript
// In RoomCard.jsx - BEFORE
export default function RoomCard({ room }) {
    // Component re-renders every time parent renders
    return <div className="room-card">{room.name}</div>;
}

// In RoomCard.jsx - AFTER
import { memo } from 'react';
export default memo(function RoomCard({ room }) {
    // Component only re-renders if room prop changes
    return <div className="room-card">{room.name}</div>;
});
```

### Priority 3: Add Response Interceptor with Caching (1 hour)
**Impact**: Reduce duplicate API calls by 60%

```javascript
// In api/axios.js
const responseCache = new Map();

api.interceptors.response.use(
    response => {
        // Cache GET responses
        if (response.config.method === 'get') {
            responseCache.set(response.config.url, {
                data: response.data,
                timestamp: Date.now()
            });
        }
        return response;
    }
);

// Check cache before making request
api.interceptors.request.use(config => {
    if (config.method === 'get') {
        const cached = responseCache.get(config.url);
        if (cached && Date.now() - cached.timestamp < 300000) { // 5 min cache
            return { ...config, cached: cached.data };
        }
    }
    return config;
});
```

### Priority 4: Implement Code Splitting (1 hour)
**Impact**: Initial bundle 40% smaller

```javascript
// In App.jsx - routes using lazy loading
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Booking = lazy(() => import('./pages/Booking'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className="loading">Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
```

### Priority 5: Optimize Vite Config (30 min)
**Impact**: Faster builds and better performance

```javascript
// vite.config.js - AFTER optimization
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Split vendor code
                    'vendor': ['react', 'react-dom', 'react-router-dom'],
                    'ui': ['@mui/material', '@mui/icons-material'],
                    'utils': ['axios', 'dayjs'],
                }
            }
        },
        // Increase chunk size threshold
        chunkSizeWarningLimit: 1000,
        // Minify aggressively
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Remove console logs in production
            }
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            }
        }
    }
});
```

## 📈 Expected Performance Improvements

| Optimization | Impact | Time to Implement |
|---|---|---|
| Parallel API Calls | 40% faster page load | 30 min |
| Component Memoization | 30% less re-renders | 30 min |
| Code Splitting | 40% smaller initial bundle | 1 hour |
| Response Caching | 60% less API calls | 1 hour |
| Image Optimization | 50% smaller images | 1 hour |
| Vite Optimization | 20% faster builds | 30 min |

**Total Expected Improvement**: 60-70% faster page load time, 50% smaller bundle

## 🔧 Implementation Checklist

- [ ] Enable parallel API calls in all dashboard pages
- [ ] Memoize all card components (RoomCard, BookingCard, etc.)
- [ ] Implement code splitting with React.lazy()
- [ ] Add request/response caching in axios
- [ ] Optimize images (WebP format, lazy loading)
- [ ] Update vite.config.js for better builds
- [ ] Remove unused dependencies
- [ ] Enable production builds with optimizations
- [ ] Test with DevTools Lighthouse
- [ ] Monitor bundle size with webpack-bundle-analyzer

## 📊 Performance Monitoring

Use Lighthouse in Chrome DevTools:
1. Open DevTools (F12)
2. Click "Lighthouse" tab
3. Run audit
4. Target: 90+ score

Monitor with React DevTools:
1. Install React DevTools extension
2. Check "Highlight updates"
3. Watch for unnecessary re-renders

---

*Last Updated: 2026-07-21*
