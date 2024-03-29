import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeLayout, Landing, Register, Login, DashboardLayout,
 Error, FavoriteCharacters, AllCharacters, Profile, Admin} from './pages';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const checkDefaultTheme = () => {

  // It's possible to check OS preferences with this code
  // const defaultDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // const isDarkTheme = (localStorage.getItem('darkTheme') || String(defaultDarkMode)) === 'true';

  // But we want to set dark theme unless preferred otherwise:
  const isDarkTheme = true;
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction
      },
      {
        path: '/dashboard',
        element: <DashboardLayout/>,
        loader: dashboardLoader,
        children: [
          {
            path: 'all-characters',
            element: <AllCharacters />
          },
          {
            path: 'favorite-characters',
            element: <FavoriteCharacters />,
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'admin',
            element: <Admin />
          },
        ]
      },
    ],
  },
  
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App