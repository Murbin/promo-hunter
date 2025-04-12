# ConnectBuy - E-commerce Product Grid

A modern, high-performance React application showcasing an optimized product grid with advanced features and real-time performance metrics.

## 🚀 Key Features

- **Virtualized Grid Layout**: Implemented using `react-window` and `react-virtualized-auto-sizer` for efficient rendering of large product lists
- **Responsive Design**: Adaptive grid layout that adjusts columns based on screen size:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Large Desktop: 4 columns
- **Performance Optimizations**:
  - Real-time performance metrics (FPS, render time, memory usage)
  - Lazy loading of images with blur effect
  - Component memoization for reduced re-renders
  - Virtualized scrolling for handling large datasets
- **Modern UI/UX**:
  - Material UI components
  - Smooth hover animations
  - Responsive layout
  - Clean and intuitive interface
- **Advanced Features**:
  - Product filtering system
  - Store distance indicators
  - Rating system
  - Real-time WebSocket simulation for live updates

## 🛠️ Technical Stack

- React 19
- TypeScript
- Material UI v7
- Redux Toolkit
- React Window (virtualization)
- Jest & Testing Library
- Vite
- ESLint

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Murbin/promo-hunter.git
cd connectbuy
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🧪 Running Tests

```bash
# Run all tests
npm run test:all

```

## 🔧 Code Quality

The project maintains high code quality standards through:

- TypeScript for type safety
- ESLint for code style consistency
- Jest for unit testing
- Component-based architecture
- Performance monitoring

## 💡 Optimizations Implemented

1. **Virtual Scrolling**

   - Implemented `FixedSizeGrid` for efficient rendering of large product lists
   - Only renders visible items, reducing memory usage and improving performance

2. **Image Optimization**

   - Lazy loading with blur effect placeholder
   - Optimized image sizing and caching
   - Memory-efficient image loading

3. **Performance Monitoring**

   - Real-time FPS tracking
   - Render time measurements
   - Memory usage monitoring
   - API response time tracking

4. **Code Splitting**

   - Lazy loading of components
   - Dynamic imports for better initial load time
   - Optimized bundle size

5. **State Management**
   - Efficient Redux implementation
   - Memoized selectors
   - Optimized re-render prevention

## 📈 Performance Metrics

The application includes a performance metrics panel showing:

- Current FPS
- Render time
- Product count
- API response time
- Memory usage (Chrome only)
