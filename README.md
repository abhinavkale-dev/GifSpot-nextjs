README.md

# GifSpot

A fun and interactive GIF discovery application built with **React** and **Next.js**, allowing users to search, browse, and explore an infinite collection of GIFs using the **Giphy API**.

## 🚀 Features

- **Search GIFs**: Search for your favorite GIFs with a user-friendly search bar.
- **Infinite Scrolling**: Browse through an endless collection of GIFs using `useInfiniteQuery`.
- **Responsive Design**: Optimized for devices of all screen sizes.
- **Theme Toggle**: Switch between light and dark modes seamlessly.
- **Key Bindings**: Press `/` to instantly focus on the search bar for a smooth user experience.

## 🛠️ Technologies Used

- **Next.js**: Framework for building the app.
- **React Query (TanStack Query)**: For API handling and state management.
- **Tailwind CSS**: For styling.
- **Giphy API**: Source of all the GIFs.
- **Lodash**: For debouncing the search functionality.
- **Next Themes**: For theme toggling functionality.

## 📚 What I Learned

This project was an incredible learning experience, helping me dive deeper into the following:

1. **API Handling with TanStack Query**:
   - Implemented efficient API fetching with caching, error handling, and query key management.
   - Mastered `useQuery` for basic data fetching and `useInfiniteQuery` for paginated requests.

2. **Infinite Scrolling with `useInfiniteQuery`**:
   - Learned how to manage dynamic pagination and fetch the next set of data on user interaction (scroll).
   - Handled edge cases such as loading states, errors, and no more data.

3. **Optimized User Experience**:
   - Used `debounce` to improve search performance by reducing redundant API calls.

## 🛠️ Setup

To run the project locally:

1. Clone this repository:

```bash
git clone https://github.com/abhinavkale-dev/GifSpot-nextjs.git
```

2.	Navigate to the project directory:

```bash
cd giphy-clone
```

3.	Install dependencies:

```bash
npm install
```


4.	Create a .env file in the root directory and add your Giphy API key:

```bash
NEXT_PUBLIC_GIPHY_API=YOUR_GIPHY_API_KEY
```

5.	Start the development server:

```bash
npm run dev
```

